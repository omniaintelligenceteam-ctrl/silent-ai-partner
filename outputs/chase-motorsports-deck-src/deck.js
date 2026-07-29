// Chase Motorsports × OIOS pitch deck
const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5

// ---- design tokens ----
const BG = "0D0D0D"; // matte black
const CARD = "1A1A1C"; // charcoal card
const CARD2 = "222226"; // lighter card
const WHITE = "F2F2F0";
const GRAY = "9A9A9E";
const DIM = "5A5A5E";
const ORANGE = "FF5A00";
const LINE = "3A3A3E";
const FONT = "Arial";

const W = 13.333;
const H = 7.5;
const MX = 0.75;

const ICONS = (n) => path.join(__dirname, "icons", `${n}.png`);

function baseSlide() {
  const s = pres.addSlide();
  s.background = { color: BG };
  return s;
}

function kicker(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? MX, y: opts.y ?? 0.5, w: opts.w ?? 8, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: ORANGE,
    charSpacing: 4, margin: 0, align: opts.align ?? "left",
  });
}

function title(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? MX, y: opts.y ?? 0.82, w: opts.w ?? W - 2 * MX, h: opts.h ?? 0.85,
    fontFace: FONT, fontSize: opts.size ?? 34, bold: true, color: opts.color ?? WHITE,
    margin: 0, align: opts.align ?? "left",
  });
}

// icon inside a thin orange ring — the deck's repeating motif
function ring(s, icon, cx, cy, d = 0.72, ringColor = ORANGE) {
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - d / 2, y: cy - d / 2, w: d, h: d,
    fill: { color: BG }, line: { color: ringColor, width: 1.25 },
  });
  const id = d * 0.44;
  s.addImage({ path: ICONS(icon), x: cx - id / 2, y: cy - id / 2, w: id, h: id });
}

function connect(s, x1, y1, x2, y2, color = LINE, width = 1) {
  const x = Math.min(x1, x2), y = Math.min(y1, y2);
  const w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
  const flipV = (x1 < x2 && y1 > y2) || (x2 < x1 && y2 > y1);
  s.addShape(pres.ShapeType.line, { x, y, w, h: Math.max(h, 0.001), flipV, line: { color, width } });
}

function pageNum(s, n) {
  s.addText(String(n).padStart(2, "0"), {
    x: W - 1.05, y: H - 0.52, w: 0.6, h: 0.3, fontFace: FONT, fontSize: 9,
    color: DIM, align: "right", margin: 0,
  });
}

// =====================================================================
// SLIDE 1 — TITLE
// =====================================================================
{
  const s = baseSlide();
  ring(s, "flag-orange", MX + 0.42, 1.5, 0.84);
  s.addText([
    { text: "CHASE MOTORSPORTS", options: { color: WHITE, breakLine: true } },
    { text: "× ", options: { color: ORANGE } },
    { text: "OIOS", options: { color: WHITE } },
  ], {
    x: MX, y: 2.55, w: 11.8, h: 2.2, fontFace: FONT, fontSize: 54, bold: true,
    margin: 0, lineSpacing: 62,
  });
  s.addText("Your AI operations layer.", {
    x: MX, y: 4.95, w: 9, h: 0.5, fontFace: FONT, fontSize: 20, color: GRAY, margin: 0,
  });
  s.addText("Wes Overstreet  ·  getoios.com  ·  July 2026", {
    x: MX, y: H - 0.85, w: 9, h: 0.35, fontFace: FONT, fontSize: 12, color: DIM, margin: 0,
  });
  s.addNotes(
    "Thanks for making time. This isn't a canned demo — it's a conversation about how your deals actually run, both sides of the building: the bikes and the coaches.\n\n" +
    "Frame it up front: I'm not here to sell you a chatbot or replace anybody. I'm here because I think you're carrying half-million-dollar deals in your head and your text messages, and there's a better way.\n\n" +
    "Stop me anywhere. This works best as a back-and-forth."
  );
}

// =====================================================================
// SLIDE 2 — THE SETUP (homework)
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "THE SETUP");
  title(s, "I DID MY HOMEWORK.");
  pageNum(s, 2);

  // left: big number callout
  s.addText("76.5K", {
    x: MX, y: 2.2, w: 4.1, h: 1.5, fontFace: FONT, fontSize: 72, bold: true,
    color: ORANGE, margin: 0,
  });
  s.addText("Facebook followers.\nMostly untapped.", {
    x: MX, y: 3.75, w: 4.0, h: 0.9, fontFace: FONT, fontSize: 16, color: WHITE, margin: 0, lineSpacing: 22,
  });
  s.addText("Source: facebook.com/chasecoach", {
    x: MX, y: 6.35, w: 4.0, h: 0.3, fontFace: FONT, fontSize: 10, color: DIM, margin: 0,
  });

  // right: 2x2 fact cards
  const facts = [
    { icon: "moto-orange", h: "Powersports", t: "Honda · Suzuki · Kawasaki · Yamaha" },
    { icon: "hauler-orange", h: "Coach & Trailer", t: "Haulers listed to $699K" },
    { icon: "wrench-orange", h: "Service", t: "Most major brands" },
    { icon: "pin-orange", h: "Out-of-state buyers", t: "Sight-unseen deals, five-star reviews" },
  ];
  const gx = 5.35, gy = 2.15, cw = 3.55, ch = 2.05, gap = 0.3;
  facts.forEach((f, i) => {
    const x = gx + (i % 2) * (cw + gap);
    const y = gy + Math.floor(i / 2) * (ch + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: cw, h: ch, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.06,
    });
    ring(s, f.icon, x + 0.62, y + 0.62, 0.6);
    s.addText(f.h, {
      x: x + 0.3, y: y + 1.05, w: cw - 0.6, h: 0.35, fontFace: FONT, fontSize: 15,
      bold: true, color: WHITE, margin: 0,
    });
    s.addText(f.t, {
      x: x + 0.3, y: y + 1.42, w: cw - 0.6, h: 0.5, fontFace: FONT, fontSize: 11.5,
      color: GRAY, margin: 0,
    });
  });

  s.addNotes(
    "Walk him through what I already know — this earns the rest of the meeting.\n\n" +
    "Two businesses under one roof: the powersports store (Honda, Suzuki, Kawasaki, Yamaha, plus Thor, Moose, ITP, Dunlop on the parts wall) and Coach & Trailer — the race haulers and custom coaches. I've seen the listings: Renegade SportDeck, ShowHauler LoneStar, Renegade Classic — $389K to $699K range. By-appointment, certified funds only. That's a serious operation.\n\n" +
    "Service department running most major brands, Monday–Friday 8–5, Saturday mornings.\n\n" +
    "76,500 Facebook followers — that's a real audience most dealers would kill for, and I'd bet it's mostly sitting there.\n\n" +
    "And the reviews: buyer after buyer talking about purchasing sight-unseen from out of state — extra photos on request, a coach delivered eight hours to a guy's driveway. That reputation is the family-business brand equity. Everything I'm about to show you protects that; nothing replaces it."
  );
}

// =====================================================================
// SLIDE 3 — THE REAL PROBLEM
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "THE REAL PROBLEM");
  title(s, "EVERY DEAL RUNS THROUGH ONE PERSON.");
  pageNum(s, 3);

  // funnel diagram: channels -> Dylan -> every deal
  const channels = ["Phone", "Facebook", "Website", "RV Trader", "Walk-ins"];
  const cy = 3.85, cx = 6.55, r = 0.78;
  channels.forEach((c, i) => {
    const ly = 2.15 + i * 0.72;
    s.addText(c, {
      x: 0.95, y: ly - 0.16, w: 1.7, h: 0.32, fontFace: FONT, fontSize: 13,
      color: GRAY, align: "right", margin: 0,
    });
    connect(s, 2.8, ly, cx - r - 0.08, cy, LINE, 1);
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: BG }, line: { color: ORANGE, width: 2 },
  });
  s.addText("DYLAN", {
    x: cx - r, y: cy - 0.2, w: r * 2, h: 0.4, fontFace: FONT, fontSize: 15, bold: true,
    color: ORANGE, align: "center", margin: 0,
  });
  connect(s, cx + r + 0.08, cy, 9.15, cy, ORANGE, 1.5);
  s.addShape(pres.ShapeType.triangle, {
    x: 9.15, y: cy - 0.08, w: 0.16, h: 0.16, rotate: 90, fill: { color: ORANGE }, line: { type: "none" },
  });
  s.addText("EVERY\nDEAL", {
    x: 9.5, y: cy - 0.5, w: 2.6, h: 1.0, fontFace: FONT, fontSize: 20, bold: true,
    color: WHITE, margin: 0, lineSpacing: 24,
  });

  s.addText([
    { text: "Not a people problem. ", options: { color: WHITE } },
    { text: "A systems problem.", options: { color: ORANGE } },
  ], {
    x: MX, y: 6.15, w: 11.8, h: 0.6, fontFace: FONT, fontSize: 24, bold: true, margin: 0,
  });

  s.addNotes(
    "This is the heart of it. Talk, don't read:\n\n" +
    "\"Right now, you're managing half-million-dollar deals in your head and in your text messages. A buyer in Texas calls Tuesday about a Renegade, asks for six specific photos, mentions his budget and his trade. By Friday you've had thirty other conversations. What he said is gone — or it's in your head and nowhere else.\n\n" +
    "That's not a discipline problem. You're not doing anything wrong. That's a systems problem. Every serious inquiry, every photo request, every trade question — it all funnels to you, because you're the guy who knows the inventory and closes the deals. The cost isn't the work you do. It's the deals that quietly leak out while you're doing it.\""
  );
}

// =====================================================================
// SLIDE 4 — WHAT IT COSTS TODAY
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "WHAT IT COSTS TODAY");
  title(s, "THREE QUIET LEAKS.");
  pageNum(s, 4);

  const rows = [
    { tag: "SLOW RESPONSE", txt: "Leads that arrive nights and weekends", ph: "[ x / mo ]" },
    { tag: "LOST CONTEXT", txt: "Hours re-gathering what buyers already told you", ph: "[ x hrs / wk ]" },
    { tag: "NO FOLLOW-UP", txt: "Quotes that never get a second touch", ph: "[ x % ]" },
  ];
  const ry = 2.15, rh = 1.3, rgap = 0.22;
  rows.forEach((r, i) => {
    const y = ry + i * (rh + rgap);
    s.addShape(pres.ShapeType.roundRect, {
      x: MX, y, w: W - 2 * MX, h: rh, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.06,
    });
    s.addText(r.tag, {
      x: MX + 0.45, y: y + 0.3, w: 3.2, h: 0.3, fontFace: FONT, fontSize: 12, bold: true,
      color: GRAY, charSpacing: 2, margin: 0,
    });
    s.addText(r.txt, {
      x: MX + 0.45, y: y + 0.62, w: 7.2, h: 0.5, fontFace: FONT, fontSize: 17,
      color: WHITE, margin: 0,
    });
    s.addText(r.ph, {
      x: W - MX - 3.5, y: y + 0.33, w: 3.05, h: 0.7, fontFace: FONT, fontSize: 30, bold: true,
      color: ORANGE, align: "right", margin: 0,
    });
  });
  s.addText("Your numbers, not mine — we fill these in together.", {
    x: MX, y: 6.75, w: 11.8, h: 0.35, fontFace: FONT, fontSize: 13, italic: true, color: GRAY, margin: 0,
  });

  s.addNotes(
    "IMPORTANT: the brackets are deliberate. I don't have his numbers and I'm not going to pretend I do. That honesty is the pitch.\n\n" +
    "Ask, live, and write the answers on the slide if presenting from a laptop:\n" +
    "— Roughly how many inquiries a month, all channels?\n" +
    "— What share get an answer inside an hour? Inside a day?\n" +
    "— How many quotes go out and never get a second touch?\n\n" +
    "The point to land: whatever the numbers are, all three leaks exist in every dealership that runs on one person's phone. Speed-to-lead research across industries says the first responder usually wins the deal — and on a $500K coach, losing even one a year to response lag pays for this system many times over. Say that as a benchmark, not as his number."
  );
}

// =====================================================================
// SLIDE 5 — THE IDEA
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "THE IDEA", { x: 0, w: W, align: "center", y: 2.35 });
  s.addText([
    { text: "Every conversation becomes\n", options: { color: WHITE } },
    { text: "structured, actionable data.", options: { color: ORANGE } },
  ], {
    x: 0.9, y: 2.9, w: W - 1.8, h: 1.9, fontFace: FONT, fontSize: 44, bold: true,
    align: "center", margin: 0, lineSpacing: 54,
  });
  pageNum(s, 5);
  s.addNotes(
    "One line. Let it sit.\n\n" +
    "\"Here's the whole idea. Every conversation your business has — phone, Facebook, in person on the lot — gets captured, gets structured, and triggers the right next action. Automatically.\n\n" +
    "You don't get a chatbot. You get an operating layer that already knows everything your business has heard.\""
  );
}

// =====================================================================
// SLIDE 6 — HOW IT WORKS
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "HOW IT WORKS");
  title(s, "CAPTURE. UNDERSTAND. ACT. SEE.");
  pageNum(s, 6);

  const cards = [
    { icon: "mic-orange", h: "CAPTURE", items: ["Phone calls", "Wearable recorder", "Web forms", "Facebook DMs"] },
    { icon: "brain-orange", h: "UNDERSTAND", items: ["Transcription", "Key details", "Deal scoring"] },
    { icon: "bolt-orange", h: "ACT", items: ["Follow-ups", "Quotes", "Scheduling", "Service reminders"] },
    { icon: "eye-orange", h: "SEE", items: ["Live dashboard", "Risk flags", "Weekly brief"] },
  ];
  const cw = 2.68, ch = 4.15, agap = 0.42, cy0 = 2.15;
  const total = 4 * cw + 3 * agap;
  const x0 = (W - total) / 2;
  cards.forEach((c, i) => {
    const x = x0 + i * (cw + agap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: cy0, w: cw, h: ch, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.07,
    });
    ring(s, c.icon, x + cw / 2, cy0 + 0.75, 0.78);
    s.addText(c.h, {
      x, y: cy0 + 1.3, w: cw, h: 0.4, fontFace: FONT, fontSize: 16, bold: true,
      color: WHITE, align: "center", charSpacing: 2, margin: 0,
    });
    const items = c.items.map((t, j) => ({
      text: t, options: { breakLine: j < c.items.length - 1 },
    }));
    s.addText(items, {
      x: x + 0.2, y: cy0 + 1.85, w: cw - 0.4, h: 2.1, fontFace: FONT, fontSize: 13.5,
      color: GRAY, align: "center", margin: 0, lineSpacing: 26,
    });
    if (i < 3) {
      s.addShape(pres.ShapeType.chevron, {
        x: x + cw + 0.1, y: cy0 + ch / 2 - 0.11, w: 0.24, h: 0.22,
        fill: { color: ORANGE }, line: { type: "none" },
      });
    }
  });
  s.addText("You buy outcomes. The plumbing is our job.", {
    x: MX, y: 6.65, w: 11.8, h: 0.35, fontFace: FONT, fontSize: 13, italic: true, color: GRAY, margin: 0,
  });

  s.addNotes(
    "Keep this non-technical on the slide; the detail lives here if he asks.\n\n" +
    "Under the hood: a voice-agent layer answers live inbound calls. A Plaud wearable recorder (or equivalent) captures in-person and mobile conversations — its API feeds transcripts straight in. Transcripts go through structured extraction — budget, timeline, must-haves, hesitations, trade details — into a persistent database, so patterns compound over time. An agent layer reads that structured data and executes: drafts follow-ups, builds quotes, books service, updates the pipeline, fires alerts. The dashboard surfaces it all.\n\n" +
    "The honest framing if he pushes: the plumbing is the easy part. The hard part — the part OIOS actually does — is defining which signals matter for THIS business. Generic AI gives generic output. A hauler buyer mentioning 'certified funds ready' means something specific here; we build for that."
  );
}

// =====================================================================
// SLIDES 7-10 — PILLARS
// =====================================================================
function pillarSlide(num, icon, heading, statement, points, notes) {
  const s = baseSlide();
  kicker(s, `PILLAR ${num}`);
  title(s, heading);
  pageNum(s, 6 + num);

  ring(s, icon, MX + 0.55, 2.75, 1.1);
  s.addText(statement, {
    x: MX, y: 3.65, w: 4.5, h: 2.4, fontFace: FONT, fontSize: 22, bold: true,
    color: WHITE, margin: 0, lineSpacing: 30,
  });

  const py0 = 2.3, ph = 1.02, pgap = 0.18;
  points.forEach((p, i) => {
    const y = py0 + i * (ph + pgap);
    s.addShape(pres.ShapeType.roundRect, {
      x: 5.7, y, w: 6.9, h: ph, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
    });
    s.addShape(pres.ShapeType.rect, {
      x: 6.02, y: y + ph / 2 - 0.05, w: 0.1, h: 0.1, fill: { color: ORANGE }, line: { type: "none" },
    });
    s.addText(p, {
      x: 6.35, y: y + 0.14, w: 6.05, h: ph - 0.28, fontFace: FONT, fontSize: 15,
      color: WHITE, margin: 0, valign: "middle",
    });
  });
  s.addNotes(notes);
  return s;
}

pillarSlide(1, "phone-orange", "NEVER LOSE A LEAD.",
  "Answered 24/7.\nQualified instantly.\nRouted to you\nwith a full brief.",
  [
    "Every channel — phone, web, Facebook, RV Trader",
    "Nights, Sundays, other time zones",
    "Budget, timeline, trade, financing — captured up front",
    "You never start a conversation from zero",
  ],
  "Every inbound channel gets captured and answered — including 9pm on a Sunday when you're closed and a buyer in Arizona is scrolling race-haulers.com.\n\n" +
  "The AI handles the easy questions instantly — specs, availability, hours, financing basics. It qualifies: budget, timeline, trade, financing need, buying window. Tire-kickers get patient, thorough answers without costing you a minute. Serious buyers get routed to you WITH a complete brief — you pick up the phone already knowing his budget, his trade, and what he asked about.\n\n" +
  "The out-of-state angle matters most: your own reviews prove sight-unseen buyers convert. Those buyers need fast, detailed, patient responses — six photos, a walk-around video, a spec sheet. That's exactly what an AI layer does best, and exactly the work that eats your day.\n\n" +
  "76K Facebook followers: right now Messenger inquiries land wherever they land. Captured and worked, that audience becomes a real pipeline."
);

pillarSlide(2, "wrench-orange", "SERVICE IS THE SUBSCRIPTION.",
  "Sales are lumpy.\nService is\nrecurring revenue\nin disguise.",
  [
    "Intake off the sales line — booked, routed, history pulled",
    "Proactive outreach by unit and age",
    "Post-service follow-up, upsell, referral ask",
  ],
  "Right now the service department competes for the same phone line as a $500K coach sale. That's backwards.\n\n" +
  "AI handles service intake end to end: what's wrong, which unit, pulls the history, books the slot, routes to the right tech. Nobody waits on hold behind a coach buyer.\n\n" +
  "Then the part nobody does manually: proactive outreach. A customer bought a hauler two years ago — the system reaches out with a maintenance package for that specific model, at the right interval. Post-service: satisfaction check, related-work upsell, referral ask. All automatic.\n\n" +
  "Land the framing: sales are lumpy — a great month, then a quiet one. Service and parts are the margin business, and worked systematically they behave like a subscription. This pillar usually pays for the whole system on its own."
);

pillarSlide(3, "stopwatch-orange", "COMPRESS TIME-TO-CLOSE.",
  "Speed wins\nremote deals.",
  [
    "Spec quotes in minutes, not days",
    "Photo, spec, and video requests handled for you",
    "Stalled buyers stay warm on a cadence",
    "Trades and consignments never go quiet",
  ],
  "Custom build and spec quotes: today that's you, after hours, building it by hand. The system drafts it in minutes from the conversation — you review and send.\n\n" +
  "Photo/spec/video requests are the huge unglamorous time sink on remote deals — six specific photos of a Renegade, a video of the generator running. The system manages the request, tracks what was sent, follows up.\n\n" +
  "Clean customer data captured up front means financing gets structured faster — no chasing paperwork basics.\n\n" +
  "And the buyer who doesn't close on the first call doesn't vanish. Automated nurture on a cadence — answers his objections, keeps him warm, tells you the moment he re-engages. Same for trade and consignment inquiries, which today go quiet the moment things get busy."
);

pillarSlide(4, "chart-orange", "KNOW WHAT'S ACTUALLY HAPPENING.",
  "Not automation.\nIntelligence.",
  [
    "Deals at risk — gone quiet, tone shift, stalled",
    "What buyers keep asking for that you don't stock",
    "Which inventory drives conversation — and which sits",
    "A Monday brief: what happened, what needs you",
  ],
  "This is the differentiator — slow down here. Everybody sells automation. This is the CEO layer.\n\n" +
  "The dashboard is built from real conversations — not from CRM fields somebody was supposed to fill in and didn't. It flags deals at risk: a buyer whose tone shifted, a follow-up that stalled, a hot lead gone quiet.\n\n" +
  "It shows you demand you can't see today: what buyers keep asking for that you don't stock. Which features people pay up for versus what's become commodity. Which units generate conversation versus which sit dead — while they're sitting, not at year-end.\n\n" +
  "And every Monday, a drafted brief: what happened last week, what needs attention, what to do today. You run the business from one page instead of from memory."
);

// =====================================================================
// SLIDE 11 — THE OUT-OF-STATE PLAY
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "THE OUT-OF-STATE PLAY");
  title(s, "YOUR BUYERS AREN'T LOCAL.", { w: 7.5 });
  pageNum(s, 11);

  s.addText([
    { text: "Your reviews already prove it: ", options: { color: WHITE } },
    { text: "buyers purchase sight-unseen.", options: { color: ORANGE } },
  ], {
    x: MX, y: 2.4, w: 5.9, h: 1.5, fontFace: FONT, fontSize: 24, bold: true, margin: 0, lineSpacing: 32,
  });
  s.addText("Remote buyers need fast, detailed, patient answers — around the clock. That's the layer.", {
    x: MX, y: 4.15, w: 5.6, h: 1.1, fontFace: FONT, fontSize: 16, color: GRAY, margin: 0, lineSpacing: 24,
  });

  // radius rings graphic
  const cx = 9.85, cy = 4.15;
  [2.9, 2.05, 1.2].forEach((r) => {
    s.addShape(pres.ShapeType.ellipse, {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2, fill: { color: BG }, line: { color: LINE, width: 1 },
    });
  });
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - 0.09, y: cy - 0.09, w: 0.18, h: 0.18, fill: { color: ORANGE }, line: { type: "none" },
  });
  s.addText("PADUCAH", {
    x: cx - 0.8, y: cy + 0.14, w: 1.6, h: 0.28, fontFace: FONT, fontSize: 11, bold: true,
    color: ORANGE, align: "center", margin: 0,
  });
  const cities = [
    { t: "Nashville · BNA ~2 hrs", x: cx + 0.15, y: cy - 1.62 },
    { t: "St. Louis", x: cx - 2.75, y: cy - 0.95 },
    { t: "Memphis", x: cx - 2.3, y: cy + 1.05 },
    { t: "Anyone with a phone", x: cx + 0.25, y: cy + 2.0 },
  ];
  cities.forEach((c) => {
    s.addText(c.t, {
      x: c.x, y: c.y, w: 2.4, h: 0.3, fontFace: FONT, fontSize: 11.5, color: GRAY, margin: 0,
    });
  });

  s.addNotes(
    "They already market to fly-in buyers — two hours from Nashville International is on their own site. The reviews show it works: extra photos on request, a coach delivered eight hours away, sight-unseen wires from out of state.\n\n" +
    "So the growth market isn't Paducah — it's every serious hauler buyer in the country. And what does a remote buyer need to wire $500K to someone they've never met? Fast answers. Detailed answers. Photos and videos on request, without waiting until you're free. Patience with fifty questions. Responsiveness at 9pm their time.\n\n" +
    "Every one of those is what this layer does best. Today that trust gets built by Dylan personally, one buyer at a time, as bandwidth allows. With the system, it's built the same way for every inquiry — and Dylan steps in exactly when it matters."
  );
}

// =====================================================================
// SLIDE 12 — WHAT CHANGES IN 90 DAYS
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "WHAT CHANGES");
  title(s, "90 DAYS, BEFORE AND AFTER.");
  pageNum(s, 12);

  const pairs = [
    ["Leads die in voicemail", "Every inquiry answered in seconds"],
    ["Deals live in your head", "Every conversation captured, searchable"],
    ["Follow-up when you remember", "Follow-up on a system"],
    ["Monday starts with guesswork", "Monday starts with a brief"],
  ];
  const colW = 5.55, lx = MX, rx = W - MX - colW;
  s.addText("TODAY", {
    x: lx, y: 2.0, w: colW, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: DIM,
    charSpacing: 3, margin: 0,
  });
  s.addText("DAY 90", {
    x: rx, y: 2.0, w: colW, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: ORANGE,
    charSpacing: 3, margin: 0,
  });
  const ry0 = 2.5, rh = 0.92, rgap = 0.18;
  pairs.forEach(([a, b], i) => {
    const y = ry0 + i * (rh + rgap);
    s.addShape(pres.ShapeType.roundRect, {
      x: lx, y, w: colW, h: rh, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
    });
    s.addText(a, {
      x: lx + 0.3, y: y + 0.12, w: colW - 0.6, h: rh - 0.24, fontFace: FONT, fontSize: 14.5,
      color: GRAY, margin: 0, valign: "middle",
    });
    s.addShape(pres.ShapeType.chevron, {
      x: 6.56, y: y + rh / 2 - 0.09, w: 0.2, h: 0.18, fill: { color: ORANGE }, line: { type: "none" },
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: rx, y, w: colW, h: rh, fill: { color: CARD2 }, line: { type: "none" }, rectRadius: 0.05,
    });
    s.addText(b, {
      x: rx + 0.3, y: y + 0.12, w: colW - 0.6, h: rh - 0.24, fontFace: FONT, fontSize: 14.5, bold: true,
      color: WHITE, margin: 0, valign: "middle",
    });
  });

  s.addNotes(
    "Deliberately operational, not financial — I'm not promising revenue numbers I can't stand behind. I'm promising how the business runs.\n\n" +
    "Day 90 looks like: every inquiry, every channel, answered in seconds — around the clock. Every conversation captured and searchable — 'what did that Texas buyer say about his trade?' is a lookup, not a memory test. Follow-up happens on a system, not when someone remembers. And Monday morning starts with a one-page brief instead of piecing the week together from your phone.\n\n" +
    "The revenue follows from those four — but the promise I'll put my name on is these four."
  );
}

// =====================================================================
// SLIDE 13 — ROLLOUT
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "ROLLOUT");
  title(s, "LIVE IN TWO WEEKS. FULL SYSTEM IN EIGHT.");
  pageNum(s, 13);

  const phases = [
    { wk: "WEEKS 1–2", h: "Capture + inbound", t: "Phones, forms, and Messenger answered and logged" },
    { wk: "WEEKS 3–4", h: "Service workflows", t: "Intake, scheduling, and history off the sales line" },
    { wk: "WEEKS 5–8", h: "Outreach + dashboard", t: "Proactive campaigns and the Monday brief" },
  ];
  const ty = 3.0;
  connect(s, 1.1, ty, 11.7, ty, LINE, 1.25);
  const px = [1.1, 5.5, 9.9];
  phases.forEach((p, i) => {
    const x = px[i];
    s.addShape(pres.ShapeType.ellipse, {
      x: x - 0.12, y: ty - 0.12, w: 0.24, h: 0.24, fill: { color: ORANGE }, line: { type: "none" },
    });
    s.addText(p.wk, {
      x: x - 0.1, y: ty - 0.75, w: 2.6, h: 0.3, fontFace: FONT, fontSize: 12, bold: true,
      color: ORANGE, charSpacing: 2, margin: 0,
    });
    s.addText(p.h, {
      x: x - 0.1, y: ty + 0.35, w: 3.05, h: 0.45, fontFace: FONT, fontSize: 18, bold: true,
      color: WHITE, margin: 0,
    });
    s.addText(p.t, {
      x: x - 0.1, y: ty + 0.85, w: 2.8, h: 1.0, fontFace: FONT, fontSize: 13,
      color: GRAY, margin: 0, lineSpacing: 19,
    });
  });
  s.addText("No rip-and-replace. Your phone number, your process — with a layer under it.", {
    x: MX, y: 6.15, w: 11.8, h: 0.4, fontFace: FONT, fontSize: 14, italic: true, color: GRAY, margin: 0,
  });

  s.addNotes(
    "Phase 1, weeks one and two: capture and inbound. Phones, web forms, Facebook Messenger — answered, logged, qualified. He sees value in week one, before he's paid for much of anything.\n\n" +
    "Phase 2, weeks three and four: service workflows — intake, scheduling, history, routing. Service stops competing with coach sales for the phone line.\n\n" +
    "Phase 3, weeks five through eight: proactive outreach and the dashboard. Maintenance campaigns, stalled-buyer nurture, the Monday brief.\n\n" +
    "Emphasize: nothing about his current process gets ripped out. Same phone number, same people, same way of doing business — with a layer underneath catching what currently falls through."
  );
}

// =====================================================================
// SLIDE 14 — CLOSE
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "THE CLOSE");
  title(s, "WHAT I NEED FROM YOU.");
  pageNum(s, 14);

  const asks = [
    { n: "01", t: "One hour to map your phones, inboxes, and channels" },
    { n: "02", t: "Access to what we're capturing" },
    { n: "03", t: "A yes" },
  ];
  const ay0 = 2.3, ah = 1.05, agap2 = 0.22;
  asks.forEach((a, i) => {
    const y = ay0 + i * (ah + agap2);
    s.addText(a.n, {
      x: MX, y: y + 0.14, w: 1.0, h: 0.75, fontFace: FONT, fontSize: 34, bold: true,
      color: ORANGE, margin: 0, valign: "middle",
    });
    s.addText(a.t, {
      x: MX + 1.2, y: y + 0.14, w: 7.6, h: 0.75, fontFace: FONT, fontSize: 19, bold: true,
      color: WHITE, margin: 0, valign: "middle",
    });
  });

  ring(s, "handshake-orange", 11.35, 3.35, 1.3);

  s.addText("Wes Overstreet   ·   OIOS   ·   getoios.com   ·   wesoverstreet@gmail.com", {
    x: MX, y: 6.45, w: 11.8, h: 0.4, fontFace: FONT, fontSize: 14, color: GRAY, margin: 0,
  });

  s.addNotes(
    "Keep the close simple — this is a friend, not a procurement committee.\n\n" +
    "Three things to start: one working hour together to map how calls, forms, and messages flow today. Access to the channels we're capturing — phone forwarding, the Facebook page, the website form. And a yes.\n\n" +
    "Then stop talking. Let him ask. If he wants pricing, the appendix slide is blank on purpose — scope it live based on which phases he wants. If he hesitates, offer Phase 1 alone as the proving ground: two weeks, inbound only, judge it on what it catches."
  );
}

// =====================================================================
// SLIDE 15 — APPENDIX: ROI CALCULATOR
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "APPENDIX · ROI");
  title(s, "THE MATH — WITH YOUR NUMBERS.");
  pageNum(s, 15);

  const inputs = ["[ inquiries / mo ]", "[ % missed or slow ]", "[ close rate ]", "[ avg gross / unit ]"];
  const ops = ["×", "×", "×"];
  const bw = 2.42, bh = 1.15, by = 2.7, bgap = 0.52;
  const totalW = 4 * bw + 3 * bgap;
  const bx0 = (W - totalW) / 2;
  inputs.forEach((t, i) => {
    const x = bx0 + i * (bw + bgap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: by, w: bw, h: bh, fill: { color: CARD }, line: { color: ORANGE, width: 1, dashType: "dash" }, rectRadius: 0.06,
    });
    s.addText(t, {
      x, y: by, w: bw, h: bh, fontFace: FONT, fontSize: 14, bold: true,
      color: ORANGE, align: "center", valign: "middle", margin: 0,
    });
    if (i < 3) {
      s.addText(ops[i], {
        x: x + bw, y: by + 0.28, w: bgap, h: 0.6, fontFace: FONT, fontSize: 24, bold: true,
        color: GRAY, align: "center", margin: 0,
      });
    }
  });
  s.addText("=", {
    x: 0, y: 4.25, w: W, h: 0.5, fontFace: FONT, fontSize: 24, bold: true, color: GRAY,
    align: "center", margin: 0,
  });
  s.addText("[ recovered revenue / mo ]", {
    x: 0, y: 4.8, w: W, h: 0.8, fontFace: FONT, fontSize: 30, bold: true, color: WHITE,
    align: "center", margin: 0,
  });
  s.addText("Dashed boxes are inputs — we fill them in together, live. No benchmark stands in for your books.", {
    x: MX, y: 6.35, w: 11.8, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: GRAY,
    align: "center", margin: 0,
  });

  s.addNotes(
    "Only pull this up if he wants the math. The inputs are dashed and bracketed on purpose — everything comes from him, live.\n\n" +
    "Walk it: inquiries per month, times the share that get missed or answered slow, times his close rate on the ones he does work, times average gross per unit. Even conservative inputs usually make the point on their own — one recovered coach deal a year typically clears the cost of the system by a wide margin. Let HIS numbers say that; don't say it for them.\n\n" +
    "If he doesn't know an input, that's not a failure — that's Pillar 4. Today he can't know it. In 90 days the dashboard tells him."
  );
}

// =====================================================================
// SLIDE 16 — APPENDIX: PRICING (blank by design)
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "APPENDIX · PRICING");
  title(s, "SCOPED TO WHAT WE SWITCH ON.");
  pageNum(s, 16);

  const rows = ["Phase 1 — Capture + inbound", "Phase 2 — Service workflows", "Phase 3 — Outreach + dashboard"];
  const ry0 = 2.5, rh2 = 1.05, rgap2 = 0.3;
  rows.forEach((r, i) => {
    const y = ry0 + i * (rh2 + rgap2);
    s.addShape(pres.ShapeType.roundRect, {
      x: MX, y, w: W - 2 * MX, h: rh2, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
    });
    s.addText(r, {
      x: MX + 0.4, y: y + 0.15, w: 6.8, h: rh2 - 0.3, fontFace: FONT, fontSize: 16, bold: true,
      color: WHITE, margin: 0, valign: "middle",
    });
    connect(s, 9.6, y + rh2 - 0.32, 12.25, y + rh2 - 0.32, DIM, 1);
  });
  s.addText("Written together, once scope is clear.", {
    x: MX, y: 6.5, w: 11.8, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: GRAY, margin: 0,
  });

  s.addNotes(
    "Blank on purpose — price it live, in the room, based on which phases he wants and what the discovery hour surfaces.\n\n" +
    "Anchor on the phases, not on a number: Phase 1 alone is a legitimate starting point if he wants to prove it before committing to the full system."
  );
}

// =====================================================================
// SLIDE 17 — APPENDIX: FAQ
// =====================================================================
{
  const s = baseSlide();
  kicker(s, "APPENDIX · STRAIGHT ANSWERS");
  title(s, "THE THREE QUESTIONS EVERYONE ASKS.");
  pageNum(s, 17);

  const faqs = [
    { q: "Does this replace my people?", a: "No. It removes the work they hate." },
    { q: "What about customers who hate AI?", a: "A human is one word away — escalation is instant and built-in." },
    { q: "Who owns the data?", a: "You do. All of it, always." },
  ];
  const fy0 = 2.25, fh = 1.32, fgap = 0.25;
  faqs.forEach((f, i) => {
    const y = fy0 + i * (fh + fgap);
    s.addShape(pres.ShapeType.roundRect, {
      x: MX, y, w: W - 2 * MX, h: fh, fill: { color: CARD }, line: { type: "none" }, rectRadius: 0.05,
    });
    s.addText(f.q, {
      x: MX + 0.45, y: y + 0.2, w: 11, h: 0.42, fontFace: FONT, fontSize: 17, bold: true,
      color: WHITE, margin: 0,
    });
    s.addText(f.a, {
      x: MX + 0.45, y: y + 0.68, w: 11, h: 0.45, fontFace: FONT, fontSize: 15,
      color: ORANGE, margin: 0,
    });
  });

  s.addNotes(
    "\"Does this replace my people?\" — No. It removes the work they hate: repeating specs, chasing photo requests, phone tag, data entry. The humans do more of what humans are for. His reviews say 'family business' — this protects that by taking the grunt work off the people who built the reputation.\n\n" +
    "\"What about customers who hate AI?\" — Escalation to a human is instant and built-in. Anyone who wants a person gets a person — faster than today, because the request lands with context instead of in voicemail.\n\n" +
    "\"Who owns the data?\" — You do. Every transcript, every contact, every pattern. It's your business's memory; we build it, you own it."
  );
}

// =====================================================================
// SLIDE 18 — INTERNAL (not presented)
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: "16161A" };
  s.addShape(pres.ShapeType.roundRect, {
    x: MX, y: 0.5, w: 3.6, h: 0.42, fill: { color: ORANGE }, line: { type: "none" }, rectRadius: 0.05,
  });
  s.addText("INTERNAL — DO NOT PRESENT", {
    x: MX, y: 0.5, w: 3.6, h: 0.42, fontFace: FONT, fontSize: 12, bold: true, color: "0D0D0D",
    align: "center", valign: "middle", margin: 0, charSpacing: 1,
  });
  title(s, "ASK DYLAN — FOR DECK V2 WITH REAL NUMBERS.", { y: 1.15, size: 26 });
  pageNum(s, 18);

  const qs = [
    "Inbound inquiries per month, all channels?",
    "What % get a response within an hour?",
    "How many people touch a deal, first contact to delivery?",
    "Service department — booked out, or hunting for work?",
    "The 76K Facebook followers — working, or dormant?",
    "Most annoying repetitive task in your week?",
    "How do you track a lead from first call to close?",
  ];
  const qy0 = 2.15, qh = 0.62, qgap = 0.14;
  const half = 4;
  qs.forEach((q, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const x = MX + col * 6.1;
    const y = qy0 + row * (qh + qgap);
    s.addText(String(i + 1).padStart(2, "0"), {
      x, y: y + 0.06, w: 0.55, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: ORANGE, margin: 0,
    });
    s.addText(q, {
      x: x + 0.6, y, w: 5.3, h: qh, fontFace: FONT, fontSize: 13.5, color: WHITE,
      margin: 0, valign: "middle",
    });
  });
  s.addText("Bet on Q7: the answer is \"my phone.\" That's slide 3.", {
    x: MX, y: 5.6, w: 11.8, h: 0.4, fontFace: FONT, fontSize: 13, italic: true, color: GRAY, margin: 0,
  });

  s.addNotes(
    "Never show this slide. It's the discovery checklist — the answers turn every bracket in this deck into a real number for version two.\n\n" +
    "Work the questions into conversation naturally across the meeting; slide 4 (the three leaks) is the natural place for most of them."
  );
}

// ---- write ----
pres.writeFile({ fileName: path.join(__dirname, "chase-motorsports-oios-pitch.pptx") }).then((f) => {
  console.log("written:", f);
});
