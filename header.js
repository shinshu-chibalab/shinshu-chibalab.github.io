// 共通ヘッダーを読み込み、現在のページに対応するメニューを強調表示する
fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    // "/" や "index.html" は HOME、それ以外は "nav-ファイル名" に対応
    const page = window.location.pathname.split("/").pop() || "index.html";
    const id = page === "index.html"
      ? "nav-home"
      : "nav-" + page.replace(/\.html$/, "");

    const link = document.getElementById(id);
    if (link) {
      link.classList.add("active");
    }
  });
