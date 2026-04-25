import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";

const port = Number(process.env.PORT || 3000);
const root = process.cwd();

const nav = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Insights", "/insights"],
  ["Media", "/youtube-media"],
  ["Speaking", "/speaking-workshops"],
  ["Contact", "/contact"]
];

const services = [
  "Fractional CTO/CIO/CISO Advisory",
  "AI Strategy and Governance",
  "Cybersecurity Program Assessment",
  "IT Operating Model Transformation",
  "Cloud and Infrastructure Modernization",
  "M&A Technology Due Diligence",
  "Executive Technology Coaching",
  "Speaking, Workshops, and Webinars"
];

const posts = [
  ["Building AI-Ready Organizations Without Losing Governance", "AI Strategy", "/insights/ai-ready-organizations"],
  ["Cybersecurity Culture Beyond Compliance", "Cybersecurity Leadership", "/insights/security-culture-beyond-compliance"],
  ["From IT Cost Center to Growth Engine", "Executive Leadership", "/insights/it-growth-engine"]
];

const pageCopy = {
  "/": {
    eyebrow: "Techfluence Signals",
    title: "Technology Leadership for Growth, Security, and Scale",
    text: "Helping executives, growth-stage companies, and technology teams turn IT, cybersecurity, cloud, and AI into measurable business advantage."
  },
  "/about": {
    eyebrow: "About Dr. Fadiran",
    title: "Executive technology leadership shaped by service, scholarship, and scale.",
    text: "Dr. Oluseye Fadiran is a senior IT executive, technology strategist, cybersecurity leader, AI adoption advisor, doctoral researcher, U.S. Army veteran, and Owner/CTO of CompTech Consulting LLC."
  },
  "/services": {
    eyebrow: "Services",
    title: "Advisory services for leaders who need technology to perform.",
    text: "Engagements are sized for practical outcomes, from executive advisory and board support to program assessments, workshops, and leadership coaching."
  },
  "/booking": {
    eyebrow: "Booking",
    title: "Request an advisory conversation.",
    text: "Select a service, share your context, and choose a preferred time. The production Next.js API generates an .ics invite and sends notifications."
  },
  "/contact": {
    eyebrow: "Contact",
    title: "Start a conversation with CompTech Consulting LLC.",
    text: "Use the secure production form for general inquiries, partnerships, recruiting conversations, and media requests."
  },
  "/insights": {
    eyebrow: "Insights",
    title: "Strategic perspective for technology leaders.",
    text: "Practical writing for executives, IT leaders, and growth-stage organizations navigating AI, cybersecurity, transformation, and career reinvention."
  },
  "/youtube-media": {
    eyebrow: "Techfluence Signals",
    title: "Clear signals for leaders working through technology change.",
    text: "Videos, conversations, and short-form commentary on AI adoption, cybersecurity culture, IT leadership, and career growth."
  },
  "/speaking-workshops": {
    eyebrow: "Speaking and workshops",
    title: "Boardroom-ready sessions for leaders navigating technology change.",
    text: "Sessions for executive audiences, IT leadership teams, professional groups, and organizations that want grounded technology conversations."
  },
  "/privacy-policy": {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    text: "CompTech Consulting LLC collects only the information needed to respond to inquiries, evaluate booking requests, and provide consulting services."
  },
  "/terms-of-use": {
    eyebrow: "Terms",
    title: "Terms of Use",
    text: "This website provides general information about Dr. Oluseye Fadiran, Techfluence Signals, and related consulting services."
  },
  "/security": {
    eyebrow: "Security",
    title: "Security and Anti-Spam Posture",
    text: "The production site includes validation, rate limiting, bot checks, CSRF protection, honeypots, secure headers, and privacy-conscious logging."
  }
};

const css = `
  :root{--navy:#071527;--teal:#1b8a8f;--line:#d9e2ec;--muted:#667085;--bg:#f7f8fb}
  *{box-sizing:border-box} body{margin:0;background:var(--bg);color:#101828;font-family:Inter,Segoe UI,Arial,sans-serif}
  a{text-decoration:none;color:inherit}.wrap{max-width:1180px;margin:auto;padding:0 24px}.header{position:sticky;top:0;z-index:5;background:rgba(7,21,39,.96);color:white;border-bottom:1px solid rgba(255,255,255,.1)}
  .bar{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand strong{display:block}.brand span,.nav a{color:rgba(255,255,255,.72);font-size:14px}.nav{display:flex;gap:20px;flex-wrap:wrap}
  .btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;border-radius:6px;padding:12px 18px;background:var(--teal);color:white;font-weight:700;font-size:14px}.btn.light{background:white;color:var(--navy);border:1px solid var(--line)}
  .hero{background:linear-gradient(135deg,rgba(7,21,39,.98),rgba(16,24,40,.94));color:white}.heroGrid{min-height:620px;display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:center;padding-top:60px;padding-bottom:60px}
  .eyebrow{color:#8fd4d7;text-transform:uppercase;font-weight:800;font-size:13px}.hero h1{font-size:64px;line-height:1.02;margin:18px 0 0}.hero p{font-size:19px;line-height:1.7;color:rgba(255,255,255,.76)}
  .heroImg{position:relative;min-height:390px;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 80px rgba(0,0,0,.35)}.heroImg img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
  section{padding:72px 0}.sectionTitle{max-width:760px}.sectionTitle h2{font-size:38px;line-height:1.15;margin:12px 0;color:var(--navy)}.sectionTitle p,.card p{color:#475467;line-height:1.7}
  .grid{display:grid;gap:20px}.cards{grid-template-columns:repeat(4,1fr)}.three{grid-template-columns:repeat(3,1fr)}.two{grid-template-columns:repeat(2,1fr)}
  .card{background:white;border:1px solid var(--line);border-radius:8px;padding:24px;box-shadow:0 1px 2px rgba(16,24,40,.04)}.card h3{margin:0 0 10px;color:var(--navy);font-size:20px}
  .dark{background:var(--navy);color:white}.dark .sectionTitle h2,.dark h2{color:white}.dark p{color:rgba(255,255,255,.72)}
  label{display:block;font-weight:700;color:var(--navy);font-size:14px;margin-top:16px}input,select,textarea{width:100%;margin-top:8px;border:1px solid var(--line);border-radius:6px;padding:12px 14px;font:inherit}textarea{min-height:130px}
  footer{background:var(--navy);color:white;padding:40px 0;color:rgba(255,255,255,.72)}
  @media(max-width:900px){.heroGrid,.cards,.three,.two{grid-template-columns:1fr}.hero h1{font-size:44px}.nav{display:none}.heroGrid{min-height:auto}}
`;

function layout(path, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Dr. Oluseye Fadiran</title><style>${css}</style></head><body>
  <header class="header"><div class="wrap bar"><a class="brand" href="/"><strong>Dr. Oluseye Fadiran</strong><span>Techfluence Signals</span></a><nav class="nav">${nav.map(([l,h])=>`<a href="${h}">${l}</a>`).join("")}</nav><a class="btn" href="/booking">Book</a></div></header>
  ${body}
  <footer><div class="wrap">CompTech Consulting LLC. Local dependency-free preview. The full Next.js app and secure APIs are in the project files.</div></footer>
  </body></html>`;
}

function hero(path) {
  const copy = pageCopy[path] || pageCopy["/"];
  return `<section class="hero"><div class="wrap heroGrid"><div><div class="eyebrow">${copy.eyebrow}</div><h1>${copy.title}</h1><p>${copy.text}</p><p><a class="btn" href="/booking">Book a Consultation</a> <a class="btn light" href="/insights">Explore Insights</a></p></div><div class="heroImg"><img src="/images/executive-technology-hero.png" alt="Executive technology consulting visual"/></div></div></section>`;
}

function cards(title, items) {
  return `<section><div class="wrap"><div class="sectionTitle"><div class="eyebrow">${title}</div><h2>Focused, executive-ready content and services</h2><p>Previewing the public-facing site design while the production Next.js dependencies are not installed in this runtime.</p></div><div class="grid cards">${items.map(i=>`<article class="card"><h3>${Array.isArray(i)?i[0]:i}</h3><p>${Array.isArray(i)?i[1]:"Strategic advisory copy is drafted in the Next.js project and ready for production build."}</p></article>`).join("")}</div></div></section>`;
}

function formPage(path) {
  const isBooking = path === "/booking";
  return `${hero(path)}<section><div class="wrap"><div class="sectionTitle"><div class="eyebrow">${isBooking ? "Request details" : "General inquiry"}</div><h2>${isBooking ? "Booking form preview" : "Contact form preview"}</h2><p>The production Next.js route handles validation, CSRF, rate limiting, Turnstile, email, and ICS invites.</p></div><form class="card" onsubmit="alert('Preview only. Run the Next.js app to submit.');return false;"><label>Name<input required></label><label>Email<input type="email" required></label><label>Company<input></label>${isBooking ? "<label>Service<select><option>Fractional CTO/CIO/CISO Advisory</option><option>AI Strategy and Governance</option></select></label><label>Preferred date<input type='date'></label><label>Preferred time<input type='time'></label>" : "<label>Subject<input required></label>"}<label>Message<textarea required></textarea></label><p><button class="btn">Submit Preview</button></p></form></div></section>`;
}

function render(path) {
  if (path === "/booking" || path === "/contact") return layout(path, formPage(path));
  if (path.startsWith("/insights/")) {
    return layout(path, `${hero("/insights")}<section><div class="wrap"><article class="card"><h2>${posts.find(p=>path.endsWith(p[2].split("/").pop()))?.[0] || "Insight Article"}</h2><p>This website-native article is stored as MDX in the content folder. The production Next.js app renders the full content with article schema metadata.</p></article></div></section>`);
  }
  const extra = path === "/" || path === "/services" ? cards("Services", services) : cards("Highlights", posts);
  return layout(path, `${hero(pageCopy[path] ? path : "/")}${extra}<section class="dark"><div class="wrap"><h2>Technology leadership for growth, security, and scale.</h2><p>Book an advisory conversation or explore the production project files for the complete Next.js implementation.</p><p><a class="btn" href="/booking">Book a Consultation</a></p></div></section>`);
}

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);
  if (url.pathname.startsWith("/images/")) {
    const file = join(root, "public", url.pathname);
    if (existsSync(file)) {
      const type = extname(file) === ".png" ? "image/png" : "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(readFileSync(file));
      return;
    }
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(render(url.pathname.replace(/\/$/, "") || "/"));
}).listen(port, () => {
  console.log(`Local preview server running at http://localhost:${port}`);
});
