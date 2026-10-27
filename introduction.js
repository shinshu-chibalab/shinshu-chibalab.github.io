// 研究テーマの動画は、画面に入ったときだけ読み込んで再生する
const themeVideos = document.querySelectorAll("video.theme-media");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  // 自動再生しない代わりに、再生ボタンを出して自分で再生できるようにする
  themeVideos.forEach(video => {
    video.controls = true;
  });
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {
          video.controls = true;
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  themeVideos.forEach(video => observer.observe(video));
}
