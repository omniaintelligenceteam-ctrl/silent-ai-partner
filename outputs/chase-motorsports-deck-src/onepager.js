// One-page leave-behind — letter portrait, same design system as the deck
const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.defineLayout({ name: "LETTER_P", width: 8.5, height: 11 });
pres.layout = "LETTER_P";

const BG = "0D0D0D", CARD = "1A1A1C", WHITE = "F2F2F0", GRAY = "9A9A9E",
  DIM = "5A5A5E", ORANGE = "FF5A00", LINE = "3A3A3E", FONT = "Arial";
const W = 8.5, MX = 0.6;
const ICONS = (n) => path.join(__dirname, "icons", `${n}.png`);

const s = pres.addSlide();
s.background = { color: BG };

function ring(icon, cx, cy, d) {
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: BG }, line: { color: ORANGE, width: 1 },
  });
  const id = d * 0.44;
  s.addImage({ path: ICONS(icon), x: cx - id / 2, y: cy - id / 2, w: id, h: id });
}

// header
s.addText([
  { text: "CHASE MOTORSPORTS ", options: { color: WHITE } },
  { text: "× ", options: { color: ORANGE } },
  { text: "OIOS", options: { color: WHITE } },
], { x: MX, y: 0.5, w: 6.6, h: 0.45, fontFace: FONT, fontSize: 22, bold: true, margin: 0 });
s.addText("Your AI operations layer.", {
  x: MX, y: 0.98, w: 6, h: 0.3, fontFace: FONT, fontSize: 13, color: GRAY, margin: 0,
});
ring("flag-orange", W - MX - 0.33, 0.85, 0.66);

// the idea
s.addShape(pres.ShapeType.roundRect, {
  x: MX, y: 1.55, w: W - 2 * MX, h: 0.85, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.06,
});
s.addText([
  { text: "Every conversation becomes ", options: { color: WHITE } },
  { text: "structured, actionable data.", options: { color: ORANGE } },
], {
  x: MX + 0.3, y: 1.55, w: W - 2 * MX - 0.6, h: 0.85, fontFace: FONT, fontSize: 16, bold: true,
  margin: 0, valign: "middle",
});

// flow
s.addText("HOW IT WORKS", {
  x: MX, y: 2.7, w: 4, h: 0.25, fontFace: FONT, fontSize: 10, bold: true, color: ORANGE,
  charSpacing: 3, margin: 0,
});
const steps = ["CAPTURE", "UNDERSTAND", "ACT", "SEE"];
const subs = ["Calls, recorder,\nforms, Facebook", "Transcribe, extract,\nscore the deal", "Follow-ups, quotes,\nscheduling", "Dashboard, flags,\nweekly brief"];
const sw = 1.62, sgap = 0.22, sx0 = MX, sy = 3.05;
steps.forEach((t, i) => {
  const x = sx0 + i * (sw + sgap);
  s.addShape(pres.ShapeType.roundRect, {
    x, y: sy, w: sw, h: 1.05, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
  });
  s.addText(t, {
    x, y: sy + 0.12, w: sw, h: 0.25, fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE,
    align: "center", charSpacing: 1, margin: 0,
  });
  s.addText(subs[i], {
    x: x + 0.06, y: sy + 0.42, w: sw - 0.12, h: 0.55, fontFace: FONT, fontSize: 8.5, color: GRAY,
    align: "center", margin: 0, lineSpacing: 11,
  });
  if (i < 3) {
    s.addShape(pres.ShapeType.chevron, {
      x: x + sw + 0.045, y: sy + 0.47, w: 0.13, h: 0.12, fill: { color: ORANGE }, line: { type: "none" },
    });
  }
});

// pillars
s.addText("FOUR PILLARS", {
  x: MX, y: 4.4, w: 4, h: 0.25, fontFace: FONT, fontSize: 10, bold: true, color: ORANGE,
  charSpacing: 3, margin: 0,
});
const pillars = [
  { icon: "phone-orange", h: "Never lose a lead", t: "Every channel answered 24/7. Serious buyers reach Dylan with a complete brief." },
  { icon: "wrench-orange", h: "Service as recurring revenue", t: "Intake off the sales line. Proactive maintenance outreach by unit and age." },
  { icon: "stopwatch-orange", h: "Compress time-to-close", t: "Quotes in minutes. Photo requests handled. Stalled buyers stay warm." },
  { icon: "chart-orange", h: "Know what's happening", t: "Deals at risk, demand signals, dead inventory — and a Monday brief." },
];
const pw = 3.55, ph = 1.5, pgap = 0.2, py0 = 4.75;
pillars.forEach((p, i) => {
  const x = MX + (i % 2) * (pw + pgap);
  const y = py0 + Math.floor(i / 2) * (ph + pgap);
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w: pw, h: ph, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
  });
  ring(p.icon, x + 0.42, y + 0.42, 0.48);
  s.addText(p.h, {
    x: x + 0.75, y: y + 0.22, w: pw - 0.95, h: 0.45, fontFace: FONT, fontSize: 11.5, bold: true,
    color: WHITE, margin: 0, valign: "middle",
  });
  s.addText(p.t, {
    x: x + 0.25, y: y + 0.78, w: pw - 0.5, h: 0.62, fontFace: FONT, fontSize: 9.5, color: GRAY,
    margin: 0, lineSpacing: 13,
  });
});

// rollout
s.addText("ROLLOUT", {
  x: MX, y: 8.2, w: 4, h: 0.25, fontFace: FONT, fontSize: 10, bold: true, color: ORANGE,
  charSpacing: 3, margin: 0,
});
const phases = [
  ["WEEKS 1–2", "Capture + inbound"],
  ["WEEKS 3–4", "Service workflows"],
  ["WEEKS 5–8", "Outreach + dashboard"],
];
const phw = 2.3, phgap = 0.2, phy = 8.55;
phases.forEach(([wk, h], i) => {
  const x = MX + i * (phw + phgap);
  s.addShape(pres.ShapeType.roundRect, {
    x, y: phy, w: phw, h: 0.85, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
  });
  s.addText(wk, {
    x: x + 0.18, y: phy + 0.15, w: phw - 0.36, h: 0.22, fontFace: FONT, fontSize: 9, bold: true,
    color: ORANGE, charSpacing: 2, margin: 0,
  });
  s.addText(h, {
    x: x + 0.18, y: phy + 0.4, w: phw - 0.36, h: 0.35, fontFace: FONT, fontSize: 11, bold: true,
    color: WHITE, margin: 0,
  });
});
s.addText("No rip-and-replace. Your phone number, your process — with a layer under it that never forgets.", {
  x: MX, y: 9.6, w: W - 2 * MX, h: 0.35, fontFace: FONT, fontSize: 10.5, italic: true, color: GRAY, margin: 0,
});

// footer
s.addShape(pres.ShapeType.line, { x: MX, y: 10.15, w: W - 2 * MX, h: 0.001, line: { color: LINE, width: 0.75 } });
s.addText("Wes Overstreet   ·   OIOS   ·   getoios.com   ·   wesoverstreet@gmail.com", {
  x: MX, y: 10.3, w: W - 2 * MX, h: 0.3, fontFace: FONT, fontSize: 10, color: GRAY, margin: 0,
});

pres.writeFile({ fileName: path.join(__dirname, "onepager.pptx") }).then((f) => console.log("written:", f));
