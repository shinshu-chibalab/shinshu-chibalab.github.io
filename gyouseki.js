// researchmap の公開 API から業績を読み込んで表示する
// researchmap を更新すれば、このページも自動で最新になる
// 補正したいときは gyouseki-overrides.js を編集する

const RESEARCHMAP_ID = "ryosuke_chiba";
const API = `https://api.researchmap.jp/${RESEARCHMAP_ID}`;

// 太字にする本人の表記
const SELF_NAME = /千葉\s*龍介|Ryou?suke\s+Chiba|Chiba,?\s*Ryou?suke|R\.\s*Chiba/i;

// 国内講演会で、最初から開いておく年数（それより前は折りたたむ）
const RECENT_YEARS = 5;

// 出典名（掲載誌名・会議名）から分類を決めるルール。上から順に当てはめる
//   journal: 雑誌論文 / intl: 国際会議・シンポジウム / domestic: 国内講演会・シンポジウム
//   （review: 解説・総説 は classify() で決める）
const RULES = [
  ["journal", /Journal|Transactions|CIRP Annals/i],
  ["intl", /International|IEEE|ASME|ACM|IROS|ICRA|ROBIO|Annual Conference of the Society of Instrument|Micro-?NanoMechatronics|ICINCO|IECON|Intelligent Autonomous Systems|Distributed Autonomous|DESIGN 20\d\d|Procedia|Advances in Intelligent Systems|Lecture Notes|Biosystems|Functional Thinking|Engineering in Medicine and Biology/i],
  ["domestic", /講演|予稿|抄録|要旨|シンポジ|研究会|大会|発表会|コンファレンス/],
  ["journal", /Frontiers|PLoS|Robotics|Neuroscience|Gait|Brain and nerve|Science China|Ageing|論文集|論文誌|学会誌|雑誌|計測と制御|日本臨床/i],
];

// ルールに当てはまらないときの分類（researchmap の区分ごと）
const FALLBACK = {
  published_papers: "journal",
  presentations: "domestic",
  misc: "domestic",
};

// 重複をまとめるときに、どの区分の登録を優先して表示するか
const SOURCE_ORDER = ["published_papers", "misc", "presentations"];

async function load(type) {
  const res = await fetch(`${API}/${type}?limit=1000`);
  if (!res.ok) throw new Error(`${type}: ${res.status}`);
  const data = await res.json();
  return (data.items || [])
    .filter(item => item.display === "disclosed")
    .filter(item => !HIDE_IDS.includes(item["rm:id"]));
}

// researchmap のデータには "&amp;" のような文字参照がそのまま入っていることがあるので、元の文字に戻す
const decoder = document.createElement("textarea");
function decode(text) {
  if (!text.includes("&")) return text;
  decoder.innerHTML = text;
  return decoder.value;
}

// 日本語があれば日本語、なければ英語
function pick(field) {
  if (!field) return "";
  return decode(field.ja || field.en || "").trim();
}

function pickList(field) {
  if (!field) return [];
  return field.ja || field.en || [];
}

// 記号や空白を除いたタイトル（重複の判定用）
function titleKey(title) {
  return title.toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

// 論文・発表・MISC を共通の形にそろえる
function normalize(item, source) {
  const isPresentation = source === "presentations";
  return {
    ids: [item["rm:id"]],
    source,
    title: pick(isPresentation ? item.presentation_title : item.paper_title),
    authors: pickList(isPresentation ? item.presenters : item.authors),
    venue: pick(isPresentation ? item.event : item.publication_name),
    volume: item.volume,
    number: item.number,
    startPage: item.starting_page,
    endPage: item.ending_page,
    date: item.publication_date || item.from_event_date || "",
    doi: item.identifiers && item.identifiers.doi && item.identifiers.doi[0],
    referee: item.referee,
    invited: Boolean(item.invited),
  };
}

// 同じタイトルの登録を 1 件にまとめる（優先する区分の登録を表示に使う）
function merge(records) {
  const groups = new Map();
  records
    .sort((a, b) => SOURCE_ORDER.indexOf(a.source) - SOURCE_ORDER.indexOf(b.source))
    .forEach(record => {
      const key = titleKey(record.title) || record.ids[0];
      const main = groups.get(key);
      if (!main) {
        groups.set(key, record);
        return;
      }
      main.ids.push(...record.ids);
      main.doi = main.doi || record.doi;
      main.invited = main.invited || record.invited;
      if (main.referee == null) main.referee = record.referee;
    });
  return [...groups.values()];
}

function classify(record) {
  const fixed = record.ids.find(id => id in CATEGORY);
  if (fixed) return CATEGORY[fixed];
  const rule = RULES.find(([, pattern]) => pattern.test(record.venue));
  const category = rule ? rule[0] : FALLBACK[record.source];
  // MISC に登録された雑誌掲載の業績は「解説・総説」とみなす
  return category === "journal" && record.source === "misc" ? "review" : category;
}

function applyReferee(record) {
  const fixed = record.ids.find(id => id in REFEREE);
  if (fixed) record.referee = REFEREE[fixed];
}

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

// "2025-08-07" や "2026-03" → "2025年8月"
function formatDate(date) {
  if (!date) return "";
  const [y, m] = date.split("-");
  return m ? `${y}年${Number(m)}月` : `${y}年`;
}

function yearOf(record) {
  return record.date.slice(0, 4);
}

function byDateDesc(a, b) {
  return b.date.localeCompare(a.date);
}

// 著者一覧。本人の名前は太字にする
function authors(names) {
  const span = el("span", "pub-authors");
  names.forEach((person, i) => {
    if (i > 0) span.append(", ");
    const name = decode(person.name);
    if (SELF_NAME.test(name)) {
      span.appendChild(el("strong", "", name));
    } else {
      span.append(name);
    }
  });
  return span;
}

function tag(text) {
  return el("span", "pub-tag", text);
}

// 業績 1 件
function recordItem(record) {
  const li = el("li", "pub-item");
  li.appendChild(authors(record.authors));

  const title = el("span", "pub-title", record.title);
  if (record.invited) title.prepend(tag("招待講演"), " ");
  li.appendChild(title);

  const venue = [record.venue];
  if (record.volume) venue.push(record.number ? `${record.volume}(${record.number})` : record.volume);
  if (record.startPage) {
    venue.push(record.endPage && record.endPage !== record.startPage
      ? `${record.startPage}-${record.endPage}`
      : record.startPage);
  }
  venue.push(formatDate(record.date));
  li.appendChild(el("span", "pub-venue", venue.filter(Boolean).join(", ")));

  const meta = el("span", "pub-meta");
  if (record.referee) meta.appendChild(tag("査読有"));
  if (record.doi) {
    const a = el("a", "pub-doi", `DOI: ${record.doi}`);
    a.href = `https://doi.org/${record.doi}`;
    a.target = "_blank";
    a.rel = "noopener";
    meta.appendChild(a);
  }
  if (meta.childNodes.length) li.appendChild(meta);
  return li;
}

// 研究課題 1 件
function projectItem(item) {
  const li = el("li", "pub-item");
  li.appendChild(el("span", "pub-title", pick(item.research_project_title)));
  const period = [item.from_date, item.to_date].filter(Boolean).map(formatDate).join(" 〜 ");
  li.appendChild(el("span", "pub-venue",
    [pick(item.system_name), pick(item.category), period].filter(Boolean).join(" ／ ")));
  const members = pickList(item.investigators);
  if (members.length) li.appendChild(authors(members));
  return li;
}

function setCount(section, n) {
  section.querySelector(".pub-count").textContent = `（${n}件）`;
  section.hidden = false;
}

function fillList(id, items, render) {
  const section = document.getElementById(id);
  if (!items.length) return;
  const list = section.querySelector(".pub-list");
  items.forEach(item => list.appendChild(render(item)));
  setCount(section, items.length);
}

// 年ごとにまとめ、openYears 年分より前は折りたたむ
function fillByYear(id, records, openYears) {
  const section = document.getElementById(id);
  if (!records.length) return;
  const box = section.querySelector(".pub-years");
  const years = [...new Set(records.map(yearOf))].sort().reverse();
  const newest = Number(years[0]);
  years.forEach(year => {
    const yearRecords = records.filter(record => yearOf(record) === year);
    const details = el("details", "pub-year");
    details.open = newest - Number(year) < openYears;
    details.appendChild(el("summary", "", `${year || "年不明"}（${yearRecords.length}件）`));
    const list = el("ol", "pub-list");
    yearRecords.forEach(record => list.appendChild(recordItem(record)));
    details.appendChild(list);
    box.appendChild(details);
  });
  setCount(section, records.length);
}

(async () => {
  const status = document.getElementById("pub-status");
  try {
    const [papers, presentations, misc, projects] = await Promise.all([
      load("published_papers"),
      load("presentations"),
      load("misc"),
      load("research_projects"),
    ]);

    const records = merge([
      ...papers.map(item => normalize(item, "published_papers")),
      ...misc.map(item => normalize(item, "misc")),
      ...presentations.map(item => normalize(item, "presentations")),
    ]);
    records.forEach(record => {
      record.category = classify(record);
      applyReferee(record);
    });
    records.sort(byDateDesc);

    const of = category => records.filter(record => record.category === category);
    fillList("journal", of("journal"), recordItem);
    fillList("review", of("review"), recordItem);
    fillList("intl", of("intl"), recordItem);
    fillByYear("domestic", of("domestic"), RECENT_YEARS);
    fillList("projects", projects.sort((a, b) => (b.from_date || "").localeCompare(a.from_date || "")), projectItem);

    status.hidden = true;
  } catch (error) {
    console.error(error);
    status.textContent = "";
    status.append("業績一覧を読み込めませんでした。お手数ですが ");
    const a = el("a", "", "researchmap");
    a.href = `https://researchmap.jp/${RESEARCHMAP_ID}`;
    status.append(a, " をご覧ください。");
  }
})();
