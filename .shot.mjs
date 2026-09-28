import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [1024, 1280, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto("http://localhost:3000/impact", { waitUntil: "networkidle" });
  await p.waitForSelector("header .shell nav");
  await p.waitForTimeout(300);
  const m = await p.evaluate(() => {
    const nav = document.querySelector("header .shell nav");
    // Measure the actual text nodes, not the padded boxes.
    const labels = [...nav.children].map((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const n = walker.nextNode();
      const rng = document.createRange(); rng.selectNodeContents(n);
      const r = rng.getBoundingClientRect();
      return { t: n.textContent.trim(), x: r.x, w: r.width };
    });
    return labels.slice(1).map((l, i) => `${labels[i].t}|${Math.round(l.x - (labels[i].x + labels[i].w))}px|${l.t}`);
  });
  console.log(`${w}px  ${m.join("   ")}`);
  await p.close();
}
await b.close();
