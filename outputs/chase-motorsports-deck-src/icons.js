const ReactDOMServer = require("react-dom/server");
const React = require("react");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const fa = require("react-icons/fa");

const OUT = path.join(__dirname, "icons");
fs.mkdirSync(OUT, { recursive: true });

const ICONS = {
  flag: fa.FaFlagCheckered,
  moto: fa.FaMotorcycle,
  hauler: fa.FaTruckMoving,
  wrench: fa.FaWrench,
  facebook: fa.FaFacebookF,
  mic: fa.FaMicrophone,
  brain: fa.FaBrain,
  bolt: fa.FaBolt,
  chart: fa.FaChartLine,
  phone: fa.FaPhoneAlt,
  stopwatch: fa.FaStopwatch,
  pin: fa.FaMapMarkerAlt,
  handshake: fa.FaHandshake,
  question: fa.FaQuestion,
  clipboard: fa.FaClipboardList,
  swap: fa.FaExchangeAlt,
  calculator: fa.FaCalculator,
  tag: fa.FaTag,
  inbox: fa.FaInbox,
  eye: fa.FaEye,
};

const COLORS = { orange: "#FF5A00", white: "#F2F2F0", gray: "#9A9A9E", black: "#0D0D0D" };

(async () => {
  for (const [name, Comp] of Object.entries(ICONS)) {
    for (const [cname, hex] of Object.entries(COLORS)) {
      const svg = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Comp, { color: hex, size: 512 })
      );
      const buf = await sharp(Buffer.from(svg)).resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
      fs.writeFileSync(path.join(OUT, `${name}-${cname}.png`), buf);
    }
  }
  console.log("icons rendered:", fs.readdirSync(OUT).length);
})();
