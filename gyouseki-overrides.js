// researchmap の登録内容を、このサイトの表示だけ補正するための設定
// 各業績の ID は、researchmap の業績ページの URL の最後の数字
//   例: https://researchmap.jp/ryosuke_chiba/published_papers/53348584 → "53348584"
// researchmap 側を直したら、ここに書いた補正は消してよい

// 表示しない業績の ID
const HIDE_IDS = [
  // "12345678",
];

// 分類を補正する（gyouseki.js の出典名による自動判定が合わないとき）
//   "journal"  → 雑誌論文
//   "review"   → 解説・総説
//   "intl"     → 国際会議・シンポジウム
//   "domestic" → 国内講演会・シンポジウム
// MISC に登録された雑誌掲載の業績は自動で「解説・総説」になる
// 論文として登録した総説は出典名では見分けられないので、ここで指定する
const CATEGORY = {
  "53348584": "review",  // One Health シンポジウムのまとめ（J. Physiol. Sci.）
  "40043637": "review",  // 大脳基底核による姿勢と歩行の制御（Brain and Nerve）
  "31426488": "review",  // Brainstem control of locomotion and muscle tone（J. Neural Transm.）
  "31426493": "review",  // HSAN types 4 and 5: Review（Neurosci. Res.）
  "31426492": "review",  // Human upright posture control models（Neurosci. Res.）
  "31426499": "journal", // CIRP Annals（MISC に登録されているが査読付きの雑誌論文）
};

// 査読の有無を補正する（true: 査読有、false: 査読無）
const REFEREE = {
  // "12345678": true,
};
