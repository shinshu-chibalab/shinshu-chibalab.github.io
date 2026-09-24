// ニュース一覧（ここに追記すると HOME と News & Topics の両方に反映される）
// date: "YYYY-MM-DD"、text: 本文、url: リンク先（任意）
const NEWS = [
  { date: "2026-09-25", text: "HPを開設しました。" },
];

// data-limit を指定した一覧は新しい順にその件数だけ表示する
document.querySelectorAll(".news-list").forEach(list => {
  const limit = Number(list.dataset.limit) || NEWS.length;
  const items = [...NEWS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);

  items.forEach(item => {
    const li = document.createElement("li");

    const time = document.createElement("time");
    time.dateTime = item.date;
    time.textContent = item.date.replaceAll("-", ".");

    const body = document.createElement(item.url ? "a" : "span");
    body.textContent = item.text;
    if (item.url) {
      body.href = item.url;
    }

    li.append(time, body);
    list.appendChild(li);
  });
});
