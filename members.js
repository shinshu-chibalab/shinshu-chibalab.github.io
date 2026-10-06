// メンバー一覧（ここを編集すると members.html に反映される）
// photo: images/photos/ 内の画像（なければ空欄にすると頭文字のアイコンを表示）
// message: 個性を示すひとこと（空欄なら表示しない）

const FACULTY = [
  {
    name: "千葉 龍介",
    kana: "ちば りょうすけ",
    message: "趣味：温泉 ／ 好物：旭川の醤油ラーメン ／ 特技：早起き",
    title: "教授（特定雇用）",
    affiliation: "信州大学 大学院 総合理工学研究科 工学専攻 情報数理・融合システム分野",
    field: "生体医工学・姿勢制御・運動シミュレーション",
    hometown: "東京都大田区",
    email: "rchiba[at]shinshu-u.ac.jp",
    links: [
      { label: "researchmap", url: "https://researchmap.jp/ryosuke_chiba" },
    ],
    photo: "images/photos/chiba_photo.jpg",
  },
];

// 学生は 1人につき { ... }, のかたまりを1つ書く（下のひな形をコピーして書き換える）
//   grade:   学年。下の GRADES にある "D3" "D2" "D1" "M2" "M1" "B4" "B3" のいずれか
//   name:    氏名（姓と名の間に半角スペース）
//   kana:    読み仮名（ひらがな）
//   message: ひとこと。「 ／ 」（前後に半角スペース）で区切ると、項目の途中で改行されない
//   theme:   研究テーマ
//   photo:   写真。images/photos/ に置いたファイル名を書く。載せない場合は "" のまま
//            表示は直径120pxの丸なので、顔を中心に240px四方程度へ縮小したものを
//            images/photos/thumbs/ に置いてそちらを指定する（元の写真は images/photos/ に残す）
// 並び順は学年ごとに自動で整理されるので、どこに書き足してもよい
// 学生が1人もいない間は「学生」欄ごと表示されない
//
// ---- ひな形（架空の人物。先頭の // を外さずにコピーして、下の STUDENTS の中に貼る）----
//  {
//    grade: "M1",
//    name: "信州 太郎",
//    kana: "しんしゅう たろう",
//    message: "趣味：北アルプス登山 ／ 好物：戸隠そば ／ 特技：けん玉",
//    theme: "MuJoCoを用いたパーキンソン病の前傾姿勢の筋骨格シミュレーション",
//    photo: "images/photos/shinshu_photo.jpg",
//  },
// ---------------------------------------------------------------------------
const STUDENTS = [
  {
  grade: "M1",
  name: "越智 雅宏",
  kana: "おち まさひろ",
  message: "趣味：深夜徘徊 ／ 好物：美味しいモノ ／ 特技：ゲーム全般",
  theme: "高齢者における姿勢保持戦略の機序解明",
  photo: "images/photos/thumbs/masahiroochi_int.jpg",
 },
 {
  grade: "M1",
  name: "加藤 芙麻",
  kana: "かとう ふうま",
  message: "趣味：アーケードゲーム ／ 好物：スイカ ／ 特技：誰とでも話せる",
  theme: "視覚と体性感覚の変容に伴う筋緊張の変容が立位姿勢へ及ぼす影響についてのモデル化",
  photo: "images/photos/thumbs/fumakato_int.jpg",
 },
  {
  grade: "M1",
  name: "川崎 敦史",
  kana: "かわさき あつし",
  message: "趣味：サッカー、スノーボード ／ 好物：パイナップル ／ 特技：全踏破迷路",
  theme: "3次元筋骨格モデルを用いた歩行開始動作の構築手法の提案",
  photo: "images/photos/thumbs/atsushikawasaki_int.jpg",
 },
  {
  grade: "M1",
  name: "有賀 巧",
  kana: "あるが たくみ",
  message: "趣味：温泉、散歩 ／ 好物：チーズバーガー ／ 特技：大食い",
  theme: "筋骨格モデルを用いた歩行停止動作の構築手法の提案",
  photo: "images/photos/thumbs/takumiaruga_int.jpg",
 },
  {
  grade: "B4",
  name: "尾澤 彪吾",
  kana: "おざわ ひょうご",
  message: "趣味：YouTube ／ 好物：さけるチーズ ／ 特技：カラオケ",
  theme: "視覚的補助キューが立位姿勢制御に与える影響の解明",
  photo: "images/photos/icon.jpeg",
 },
  {
  grade: "B4",
  name: "小林 駿太",
  kana: "こばやし しゅんた",
  message: "趣味：サッカー観戦、読書 ／ 好物：肉 ／ 特技：顔と名前を覚える",
  theme: "筋骨格モデルを用いた異常姿勢要因評価手法の提案",
  photo: "images/photos/icon.jpeg",
 },
  {
  grade: "B4",
  name: "阪田 優之介",
  kana: "さかた ゆうのすけ",
  message: "趣味：ボードゲーム、テレビゲーム ／ 好物：チーズインハンバーグ ／ 特技：楽器演奏(打楽器、マンドロンチェロ)",
  theme: "計算機モデルを用いた転倒恐怖を考慮した立位姿勢の検討",
  photo: "images/photos/icon.jpeg",
 }
];

// 表示する学年の順番と見出し
const GRADES = [
  { key: "D3", label: "博士課程 3年" },
  { key: "D2", label: "博士課程 2年" },
  { key: "D1", label: "博士課程 1年" },
  { key: "M2", label: "修士課程 2年" },
  { key: "M1", label: "修士課程 1年" },
  { key: "B4", label: "学部 4年" },
  { key: "B3", label: "学部 3年" },
];

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

// 写真があれば画像、なければ氏名の頭文字のアイコン
function avatar(person, className) {
  if (person.photo) {
    const img = el("img", className);
    img.src = person.photo;
    img.alt = person.name;
    img.loading = "lazy";
    return img;
  }
  return el("div", className + " avatar-initial", person.name.charAt(0));
}

// ひとこと。「 ／ 」で区切った項目は途中で改行しない
function message(text) {
  const p = el("p", "member-message");
  text.split(" ／ ").forEach((part, i) => {
    if (i > 0) p.append(" ／ ");
    p.appendChild(el("span", "message-item", part));
  });
  return p;
}

const facultyList = document.getElementById("faculty-list");
FACULTY.forEach(person => {
  const card = el("article", "member-card");
  card.appendChild(avatar(person, "faculty-photo"));

  const info = el("div", "member-info");
  info.appendChild(el("p", "member-title", person.title));
  info.appendChild(el("h3", "member-name", person.name));
  info.appendChild(el("p", "member-kana", person.kana));
  if (person.message) {
    info.appendChild(message(person.message));
  }

  const dl = el("dl", "member-details");
  [["所属", person.affiliation], ["専門", person.field], ["出身地", person.hometown], ["E-mail", person.email]]
    .filter(([, value]) => value)
    .forEach(([label, value]) => {
      dl.append(el("dt", "", label), el("dd", "", value));
    });
  info.appendChild(dl);

  if (person.links.length) {
    const links = el("p", "faculty-links");
    person.links.forEach(link => {
      const a = el("a", "more-link", link.label);
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    });
    info.appendChild(links);
  }

  card.appendChild(info);
  facultyList.appendChild(card);
});

const studentList = document.getElementById("student-list");
const studentSection = document.getElementById("student-section");
if (studentSection && !STUDENTS.length) {
  studentSection.hidden = true;
}
GRADES.forEach(grade => {
  const members = STUDENTS.filter(s => s.grade === grade.key);
  if (!members.length) return;

  studentList.appendChild(el("h3", "grade-heading", grade.label));

  members.forEach(person => {
    const card = el("article", "member-card student-card");
    card.appendChild(avatar(person, "student-photo"));

    const info = el("div", "member-info");
    info.appendChild(el("h4", "member-name", person.name));
    info.appendChild(el("p", "member-kana", person.kana));
    if (person.message) {
      info.appendChild(message(person.message));
    }
    if (person.theme) {
      const dl = el("dl", "member-details");
      dl.append(el("dt", "", "研究テーマ"), el("dd", "", person.theme));
      info.appendChild(dl);
    }

    card.appendChild(info);
    studentList.appendChild(card);
  });
});
