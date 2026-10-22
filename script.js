/* ====== عدّل النصوص من هنا ====== */
const CONFIG = {
  name: "يا روحي",                // اسمها
  heroSub: "سوّيتلچ شي بسيط… بس مسوّيه بكل حب",
  letter: [
    "كل عام وإنتي بخير يا أحلى شي بحياتي 💙",
    "اليوم مو بس عيد ميلادچ، اليوم الدنيا كلها صارت أحلى لأن إنتي بيها.",
    "شكراً لأنچ دتفرحيني، وتسمعيني، وتبقين وياي بكل شي.",
    "أتمنى هالسنة تجيبلچ كل اللي تتمناه وأكثر، وأكون أني وياچ بكل لحظة.",
    "أحبچ أكثر مما أعرف أكتب."
  ],
  photoCaption: "الورد هذا إلچ 🌹",
  sign: "— أحبچ، محمد 💙",
  wish: "إن شاء الله كل أمنياتچ تتحقق 💙 كل عام وإنتي بخير يا قلبي 🎂"
};
/* ================================= */

const $ = s => document.querySelector(s);
document.querySelectorAll('[data-name]').forEach(e => e.textContent = CONFIG.name);
document.querySelectorAll('[data-text]').forEach(e => e.textContent = CONFIG[e.dataset.text]);

/* confetti */
const cv = $('#confetti'), cx = cv.getContext('2d');
let W, H, parts = [];
const COLORS = ['#FEE5AC', '#2B71AC', '#ffffff', '#ffd27a', '#6fb1e6'];
function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
addEventListener('resize', resize); resize();
function burst(n = 140, x = W / 2, y = H * .35) {
  const start = parts.length === 0;
  for (let i = 0; i < n; i++) parts.push({
    x, y, vx: (Math.random() - .5) * 12, vy: Math.random() * -12 - 2,
    s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
    c: COLORS[(Math.random() * COLORS.length) | 0], life: 160 + Math.random() * 80
  });
  if (start) loop();
}
function loop() {
  cx.clearRect(0, 0, W, H);
  parts = parts.filter(p => p.life-- > 0 && p.y < H + 20);
  for (const p of parts) {
    p.vy += .28; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
    cx.globalAlpha = Math.min(1, p.life / 40);
    cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore();
  }
  if (parts.length) requestAnimationFrame(loop);
}

/* hero page: confetti */
if (document.body.classList.contains('p-hero')) setTimeout(() => burst(120), 600);

/* letter page: lines appear one by one */
const lt = $('#letterText');
if (lt) {
  lt.innerHTML = CONFIG.letter.map(t => `<p>${t}</p>`).join('');
  lt.querySelectorAll('p').forEach((p, i) => setTimeout(() => p.classList.add('show'), 900 + i * 900));
}

/* cake page: blow the candles */
const candles = [...document.querySelectorAll('.candle')];
function blow(c) {
  if (!c || c.classList.contains('out')) return;
  c.classList.add('out');
  if (candles.every(x => x.classList.contains('out'))) {
    $('#hint').hidden = true;
    const f = $('#final'); f.textContent = CONFIG.wish; f.hidden = false;
    burst(220, W / 2, H * .5); setTimeout(() => burst(160), 500);
  }
}
candles.forEach(c => c.addEventListener('click', e => { e.stopPropagation(); blow(c); }));
const svg = $('.cake-svg');
if (svg) svg.addEventListener('click', () => blow(candles.find(x => !x.classList.contains('out'))));
