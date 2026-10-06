const CONTACT = {
    addressJa:[
        "千葉研究室",
        "信州大学 工学部",
        "〒380-8553",
        "長野県長野市若里4-17-1",
        "E3棟 3階 307号室",
    ],

    mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.7832076352324!2d138.18758527579445!3d36.631604677185194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d869ccaf0154d%3A0x7a8d02acc956e937!2z5L-h5bee5aSn5a2mIOW3peWtpumDqA!5e0!3m2!1sja!2sjp!4v1791190781313!5m2!1sja!2sjp",
    email:"rchiba[at]shinshu-u.ac.jp",
};

// 要素を作る関数
function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

// 複数行の住所を <br> で区切って1つの <p> にする
function addressBlock(lines, lang) {
  const p = el("p", "contact-address-text");
  if (lang) p.lang = lang;
  lines.forEach((line, i) => {
    if (i > 0) p.appendChild(document.createElement("br"));
    p.append(line);
  });
  return p;
}

// 住所
const addressSection = document.getElementById("contact-address");
if (addressSection) {
  addressSection.appendChild(el("h2", "contact-heading", "住所"));
  const wrap = el("div", "contact-address");
  wrap.appendChild(addressBlock(CONTACT.addressJa, "ja"));
  addressSection.appendChild(wrap);
}

// 地図
const mapSection = document.getElementById("contact-map");
if (mapSection && CONTACT.mapURL) {
  mapSection.appendChild(el("h2", "contact-heading", "地図"));
  const iframe = el("iframe", "contact-map-frame");
  iframe.src = CONTACT.mapURL;
  iframe.title = "信州大学工学部（長野キャンパス）の地図";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  mapSection.appendChild(iframe);
}

// 連絡先
const infoSection = document.getElementById("contact-info");
if (infoSection) {
  infoSection.appendChild(el("h2", "contact-heading", "連絡先"));
  const dl = el("dl", "member-details");
  dl.append(el("dt", "", "E-mail"), el("dd", "", CONTACT.email));
  infoSection.appendChild(dl);
}