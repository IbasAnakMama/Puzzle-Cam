// Puzzle Cam — efek interaktif tambahan (recode by Ibas). Tidak menyentuh logika puzzle di app.js.
(() => {
  const COLORS = ['#7c3aed', '#ec4899', '#22d3ee', '#a3e635', '#fbbf24', '#fb7185'];
  const cv = document.createElement('canvas');
  cv.id = 'fxCanvas';
  const g = cv.getContext('2d');
  const bar = document.createElement('div');
  bar.id = 'fxScroll';
  const parts = [];
  const rand = (a, b) => a + Math.random() * (b - a);
  const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };

  function spawn(x, y, o) {
    parts.push({ x, y, vx: o.vx, vy: o.vy, g: o.g, life: 1, decay: o.decay, size: o.size,
      color: o.color || COLORS[(Math.random() * COLORS.length) | 0], rot: rand(0, 6.28), vr: rand(-.3, .3), shape: o.shape });
  }
  function confetti(x, y, n = 28) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.28), s = rand(3, 9);
      spawn(x, y, { vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, g: .22, decay: rand(.008, .016), size: rand(5, 10), shape: 'rect' });
    }
  }
  function rain(n = 90) {
    for (let i = 0; i < n; i++)
      setTimeout(() => spawn(rand(0, innerWidth), -10, { vx: rand(-1.5, 1.5), vy: rand(2, 5), g: .05, decay: .005, size: rand(6, 11), shape: 'rect' }), i * 18);
  }
  window.PuzzleFX = { confetti, rain };

  function loop() {
    g.clearRect(0, 0, cv.width, cv.height);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
      if (p.life <= 0 || p.y > cv.height + 30) { parts.splice(i, 1); continue; }
      g.save(); g.globalAlpha = Math.max(p.life, 0); g.translate(p.x, p.y); g.rotate(p.rot); g.fillStyle = p.color;
      if (p.shape === 'star') { g.font = p.size * 2 + 'px sans-serif'; g.fillText('\u2726', -p.size, p.size); }
      else g.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      g.restore();
    }
    requestAnimationFrame(loop);
  }

  // jejak kilau kursor
  let last = 0;
  addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - last < 28) return;
    last = now;
    spawn(e.clientX, e.clientY, { vx: rand(-.8, .8), vy: rand(-.8, .8), g: .03, decay: .035, size: rand(4, 8), shape: 'star' });
  });
  // klik = ledakan kecil
  addEventListener('pointerdown', (e) => confetti(e.clientX, e.clientY, 14));
  // tekan P = hujan konfeti
  addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'p' && !/INPUT|TEXTAREA/.test(e.target.tagName)) rain(70); });

  // efek magnet + angkat saat hover
  const HOVER = '.polaroid, .sticker-btn, .print, #photoStrip, .border-btn';
  let cur = null;
  const clear = () => { if (cur) { cur.classList.remove('fx-hover'); cur.style.translate = ''; cur = null; } };
  addEventListener('pointermove', (e) => {
    const el = e.target.closest && e.target.closest(HOVER);
    if (el !== cur) { clear(); cur = el; if (cur) cur.classList.add('fx-hover'); }
    if (cur) {
      const r = cur.getBoundingClientRect();
      cur.style.translate = ((e.clientX - r.left - r.width / 2) * .08).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .08 - 4).toFixed(1) + 'px';
    }
  });
  document.addEventListener('pointerleave', clear);

  // sticker pop + ripple tombol
  document.addEventListener('click', (e) => {
    const s = e.target.closest('.sticker-btn');
    if (s) { s.classList.remove('sticker-pop'); void s.offsetWidth; s.classList.add('sticker-pop'); const r = s.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, 22); }
  });
  document.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('button, .gallery-action-btn');
    if (!b) return;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.style.overflow = 'hidden';
    const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), sp = document.createElement('span');
    sp.className = 'fx-ripple';
    sp.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(sp); setTimeout(() => sp.remove(), 650);
  });

  function init() {
    document.body.append(cv, bar);
    fit(); addEventListener('resize', fit); loop();

    // progress scroll + reveal di landing page
    const lp = document.getElementById('landingPage');
    if (lp) {
      lp.addEventListener('scroll', () => { bar.style.width = (lp.scrollTop / Math.max(1, lp.scrollHeight - lp.clientHeight) * 100) + '%'; });
      const targets = lp.querySelectorAll('section:not(#hero) > div, section:not(#hero) > h2');
      targets.forEach((t) => t.classList.add('fx-reveal'));
      document.documentElement.classList.add('fx-ready');
      const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('fx-in'); io.unobserve(x.target); } }), { root: lp, threshold: 0.12 });
      targets.forEach((t) => io.observe(t));
    }

    // puzzle solved -> pesta konfeti
    const banner = document.getElementById('puzzleSolvedBanner');
    if (banner) new MutationObserver(() => {
      if (!banner.classList.contains('hidden')) {
        rain(120);
        [.25, .5, .75].forEach((k, i) => setTimeout(() => confetti(innerWidth * k, innerHeight * .4, 40), i * 250));
      }
    }).observe(banner, { attributes: true, attributeFilter: ['class'] });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();