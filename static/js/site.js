/* ViTeX-Bench project page.
 * - Hero: a real ViTeX-Edit-14B clip split by a sweeping line (edit | source),
 *   with the source word turning into the target word as the line crosses it.
 * - Comparator: every method's output on the same scene, cropped live from the
 *   composite grid videos, as a wipe or as a synced grid.
 * - Failures, protocol axes, and the 3-D Pareto space (same drawing as the
 *   leaderboard), fed by the leaderboard's submissions.jsonl. */
(function () {
  'use strict';

  var LB_DATA = 'https://vitex-bench.github.io/ViTeX-Bench-Leaderboard/data/submissions.jsonl';

  // ---------- Helpers ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function reduced() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  var ARROW = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5"/></svg>';
  var SYM = {
    front: '<svg class="sym--front" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" class="sym-ring"/><circle cx="8" cy="8" r="3.4" class="sym-fill"/></svg>',
    editor: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="2.8" class="sym-fill"/></svg>',
    unranked: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="4.2" class="sym-ring"/></svg>'
  };
  var FRONT_PILL = '<span class="pill"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="3.4" fill="currentColor"/></svg>Pareto front</span>';

  // Visibility: run loops only while their element is on screen.
  function watch(el, cb, margin) {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { cb(e.isIntersecting); }); }, { rootMargin: margin || '0px' }).observe(el);
  }

  // =====================================================================
  // Scenes and methods. The composite grid videos (1920×810) hold a 4×3 grid
  // of 480×270 cells; each cell's label sits in its top 28 rows, so every
  // crop starts below it and keeps 16:9 (430×242).
  // =====================================================================
  var SCENES = [
    { id: '0004547_00000', src: 'First', tgt: 'Last', x: 0.5 },
    { id: '0006286_00000', src: 'COLLIER', tgt: 'WASHING', x: 0.74 },
    { id: '0005186_00000', src: 'ONLY', tgt: 'STOP', x: 0.6 },
    { id: '0001942_00000', src: 'BULB?', tgt: 'LAMP?', x: 0.16 },
    { id: '0000229_00000', src: 'SOC', tgt: 'COC', x: 0.18 }
  ];
  var CROP = { dx: 25, dy: 28, w: 430, h: 242 };
  function cell(c, r) { return { x: 480 * c + CROP.dx, y: 270 * r + CROP.dy, w: CROP.w, h: CROP.h }; }
  var SOURCE_CELL = cell(0, 0);
  var METHODS = [
    { name: 'ViTeX-Edit-14B', cell: cell(1, 0), g: 'ref' },
    { name: 'ViTeX-Edit-14B (Composite)', cell: cell(2, 0), g: 'ref' },
    { name: 'AnyText2', cell: cell(3, 0), g: 'A' },
    { name: 'TextCtrl', cell: cell(0, 1), g: 'A' },
    { name: 'FLUX-Text', cell: cell(1, 1), g: 'A' },
    { name: 'RS-STE', cell: cell(2, 1), g: 'A' },
    { name: 'TextCtrl + AnyV2V', cell: cell(3, 1), g: 'B' },
    { name: 'Wan2.1-VACE-14B', cell: cell(0, 2), g: 'C' },
    { name: 'VideoPainter', cell: cell(1, 2), g: 'C' },
    { name: 'Kling Video 3.0 Omni', cell: cell(2, 2), g: 'D' }
  ];
  var GROUPS = [
    { g: 'ref', label: 'Reference editor' },
    { g: 'A', label: 'A · Per-frame image editing' },
    { g: 'B', label: 'B · First-frame edit + propagation' },
    { g: 'C', label: 'C · Mask-conditioned inpainting' },
    { g: 'D', label: 'D · Instruction-guided editing' }
  ];
  function methodByName(n) { for (var i = 0; i < METHODS.length; i++) if (METHODS[i].name === n) return METHODS[i]; return null; }

  // =====================================================================
  // Wipe: one media source, two rects, split at p (0..1).
  // Left of the line shows rect a (the edit), right shows rect b (the source).
  // =====================================================================
  function Wipe(root, opts) {
    var self = this;
    this.root = root; this.canvas = root.querySelector('canvas'); this.ctx = this.canvas.getContext('2d');
    this.handle = root.querySelector('.wipe__handle');
    this.p = opts.p == null ? 0.5 : opts.p; this.getMedia = opts.getMedia; this.onMove = opts.onMove || function () {};
    this.visible = false; this.raf = 0; this.touched = 0; this.label = opts.label || 'edit';
    this.sweep = opts.sweep && !reduced(); this.sweepT0 = performance.now();
    function setFromEvent(e) {
      var b = root.getBoundingClientRect();
      self.set(clamp((e.clientX - b.left) / b.width, 0, 1), true);
    }
    var drag = null;
    root.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, active: e.pointerType === 'mouse' || e.target === self.handle };
      if (drag.active) { try { root.setPointerCapture(e.pointerId); } catch (err) {} root.classList.add('is-dragging'); setFromEvent(e); }
    });
    root.addEventListener('pointermove', function (e) {
      if (!drag || drag.id !== e.pointerId) return;
      if (!drag.active) {
        // touch: only take over when the gesture is clearly horizontal
        var dx = Math.abs(e.clientX - drag.x), dy = Math.abs(e.clientY - drag.y);
        if (dx > 8 && dx > dy) { drag.active = true; try { root.setPointerCapture(e.pointerId); } catch (err) {} root.classList.add('is-dragging'); }
        else if (dy > 8) { drag = null; return; }
      }
      if (drag.active) setFromEvent(e);
    });
    function end(e) {
      if (!drag || drag.id !== e.pointerId) return;
      if (!drag.active && e.type === 'pointerup') setFromEvent(e); // a tap moves the line there
      drag = null; root.classList.remove('is-dragging');
    }
    root.addEventListener('pointerup', end); root.addEventListener('pointercancel', end);
    this.handle.addEventListener('keydown', function (e) {
      var k = e.key, step = e.shiftKey ? 0.2 : 0.05;
      if (k === 'ArrowLeft' || k === 'ArrowDown') self.set(self.p - step, true);
      else if (k === 'ArrowRight' || k === 'ArrowUp') self.set(self.p + step, true);
      else if (k === 'Home') self.set(0, true);
      else if (k === 'End') self.set(1, true);
      else return;
      e.preventDefault();
    });
    watch(root, function (v) { self.visible = v; if (v) self.loop(); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) self.loop(); });
    window.addEventListener('resize', function () { self.size(); self.draw(); });
    this.size(); this.set(this.p, false);
  }
  Wipe.prototype.size = function () {
    var b = this.canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = b.width; this.H = b.height;
    this.canvas.width = Math.max(1, Math.round(b.width * dpr)); this.canvas.height = Math.max(1, Math.round(b.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.imageSmoothingQuality = 'high';
  };
  Wipe.prototype.set = function (p, byUser) {
    this.p = clamp(p, 0, 1);
    if (byUser) this.touched = performance.now();
    this.root.style.setProperty('--p', this.p.toFixed(4));
    var pc = Math.round(this.p * 100);
    this.handle.setAttribute('aria-valuenow', pc);
    this.handle.setAttribute('aria-valuetext', pc + '% ' + this.label);
    this.onMove(this.p);
    if (!this.raf) this.draw();
  };
  Wipe.prototype.draw = function () {
    var m = this.getMedia(); if (!m || !m.el || !this.W) return;
    var ctx = this.ctx, W = this.W, H = this.H, x = Math.round(W * this.p), a = m.a, b = m.b;
    try {
      if (x > 0) ctx.drawImage(m.el, a.x, a.y, a.w * this.p, a.h, 0, 0, x, H);
      if (x < W) ctx.drawImage(m.el, b.x + b.w * this.p, b.y, b.w * (1 - this.p), b.h, x, 0, W - x, H);
    } catch (err) { /* media not decodable yet */ }
  };
  // Auto sweep: hold on the source, sweep across, hold on the edit, sweep back.
  var HOLD_A = 1100, MOVE = 2600, HOLD_B = 1800, CYCLE = HOLD_A + MOVE + HOLD_B + MOVE;
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  Wipe.prototype.sweepAt = function (now) {
    var t = (now - this.sweepT0) % CYCLE, lo = 0.03, hi = 0.97;
    if (t < HOLD_A) return lo;
    t -= HOLD_A; if (t < MOVE) return lo + (hi - lo) * easeInOut(t / MOVE);
    t -= MOVE; if (t < HOLD_B) return hi;
    t -= HOLD_B; return hi - (hi - lo) * easeInOut(t / MOVE);
  };
  Wipe.prototype.loop = function () {
    var self = this;
    if (this.raf) return;
    this.raf = requestAnimationFrame(function tick(now) {
      self.raf = 0;
      if (!self.visible || document.hidden) return;
      // the sweep stops for good once the visitor takes the line
      if (self.sweep && !self.touched) self.set(self.sweepAt(now), false);
      self.draw();
      if (self.after) self.after(now);
      self.raf = requestAnimationFrame(tick);
    });
  };

  // Scene chips (hero and comparator share the markup).
  function renderScenes(el, current, onPick) {
    el.innerHTML = SCENES.map(function (s, i) {
      return '<button type="button" role="radio" aria-checked="' + (i === current) + '" tabindex="' + (i === current ? 0 : -1) + '" data-i="' + i + '"' +
        ' aria-label="' + esc(s.src) + ' to ' + esc(s.tgt) + '">' + esc(s.src) + ARROW + esc(s.tgt) + '</button>';
    }).join('');
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]'); if (b) onPick(+b.getAttribute('data-i'));
    });
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var btns = el.querySelectorAll('button'), cur = Array.prototype.findIndex.call(btns, function (b) { return b.getAttribute('aria-checked') === 'true'; });
      var n = (cur + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length;
      onPick(n); btns[n].focus(); e.preventDefault();
    });
  }
  function markScenes(el, i) {
    el.querySelectorAll('button').forEach(function (b) {
      var on = +b.getAttribute('data-i') === i;
      b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1;
    });
  }

  // Poster images keep the canvas filled until the video has frames.
  function loadImage(src) { var im = new Image(); im.decoding = 'async'; im.src = src; return im; }
  function ready(v) { return v.readyState >= 2 && v.videoWidth > 0; }

  // =====================================================================
  // Hero
  // =====================================================================
  var hero = { i: 0, video: $('hero-video'), poster: null, state: null };
  var ambient = $('hero-ambient'), actx = ambient.getContext('2d');
  ambient.width = 48; ambient.height = 27;
  var HERO_A = { x: 0, y: 242, w: 430, h: 242 }, HERO_B = { x: 0, y: 0, w: 430, h: 242 };

  function splitWord(w) {
    return Array.prototype.map.call(w, function (c, i) { return '<span class="ch" style="--i:' + i + '">' + (c === ' ' ? '&nbsp;' : esc(c)) + '</span>'; }).join('');
  }
  function fitWord() {
    var word = $('hero-word'), box = word.parentNode, maxPx = window.innerWidth < 600 ? 104 : window.innerWidth < 1000 ? 136 : Math.min(184, window.innerWidth * 0.12);
    word.style.fontSize = '100px';
    var w = Math.max($('hero-src').offsetWidth, $('hero-tgt').offsetWidth) || 1;
    word.style.fontSize = Math.min(maxPx, Math.floor(100 * (box.clientWidth - 4) / w)) + 'px';
  }
  var ADVANCE = 2; // full sweeps per scene before the teaser moves on
  function setHeroScene(i, auto) {
    hero.i = i; var s = SCENES[i];
    markScenes($('hero-scenes'), i);
    $('hero-src').innerHTML = splitWord(s.src); $('hero-tgt').innerHTML = splitWord(s.tgt);
    $('hero-say').textContent = s.src + ' to ' + s.tgt;
    fitWord();
    hero.state = null; heroWord(heroWipe ? heroWipe.p : 0.03);
    hero.poster = loadImage('static/images/posters/hero_' + s.id + '.jpg');
    hero.poster.onload = function () { if (heroWipe) heroWipe.draw(); drawAmbient(); };
    hero.video.src = 'static/videos/hero/' + s.id + '.mp4';
    hero.video.load();
    playHero();
    if (heroWipe && heroWipe.sweep && !heroWipe.touched) { heroWipe.sweepT0 = performance.now(); heroWipe.set(0.03, false); }
    // choosing a scene by hand pauses the rotation; the sweep keeps going
    if (!auto && heroWipe) hero.manual = true;
    setProgress(0);
  }
  function setProgress(f) {
    var b = $('hero-scenes').querySelector('[aria-checked="true"]');
    $('hero-scenes').querySelectorAll('button').forEach(function (x) { if (x !== b) x.style.removeProperty('--prog'); });
    if (b) b.style.setProperty('--prog', f.toFixed(3));
  }
  function playHero() {
    var pr = hero.video.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  function heroMedia() {
    var v = hero.video;
    if (ready(v)) return { el: v, a: HERO_A, b: HERO_B };
    if (hero.poster && hero.poster.complete && hero.poster.naturalWidth) return { el: hero.poster, a: HERO_A, b: HERO_B };
    return null;
  }
  function heroWord(p) {
    var st = p > SCENES[hero.i].x ? 'tgt' : 'src';
    if (st !== hero.state) { hero.state = st; $('hero-word').setAttribute('data-state', st); }
  }
  var ambientTick = 0;
  function drawAmbient() {
    var m = heroMedia(); if (!m) return;
    try { actx.drawImage(m.el, HERO_A.x, HERO_A.y, HERO_A.w, HERO_A.h, 0, 0, 48, 27); } catch (e) {}
  }

  var heroWipe = new Wipe($('hero-wipe'), {
    p: reduced() ? 0.5 : 0.03, sweep: true, label: 'edit', getMedia: heroMedia,
    onMove: function (p) { heroWord(p); }
  });
  heroWipe.after = function (now) {
    if ((ambientTick++ % 8) === 0) drawAmbient();
    // time spent off screen does not count towards the rotation
    if (hero.last && now - hero.last > 250) heroWipe.sweepT0 += now - hero.last;
    hero.last = now;
    if (!heroWipe.sweep || heroWipe.touched || hero.manual) { setProgress(0); return; }
    var f = (now - heroWipe.sweepT0) / (CYCLE * ADVANCE);
    if (f >= 1) setHeroScene((hero.i + 1) % SCENES.length, true); else setProgress(f);
  };
  renderScenes($('hero-scenes'), 0, function (i) { setHeroScene(i, false); });
  watch($('hero-wipe'), function (v) { if (v) playHero(); else hero.video.pause(); });
  hero.video.addEventListener('loadeddata', function () { heroWipe.draw(); drawAmbient(); });
  setHeroScene(0, true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWord);
  window.addEventListener('resize', fitWord);

  // =====================================================================
  // Comparator
  // =====================================================================
  var cmp = { scene: 0, method: METHODS[0], mode: 'compare', video: $('cmp-video'), poster: null, wanted: false };
  function cmpMedia(rect) {
    var v = cmp.video;
    if (ready(v)) return { el: v, a: rect, b: SOURCE_CELL };
    if (cmp.poster && cmp.poster.complete && cmp.poster.naturalWidth) return { el: cmp.poster, a: rect, b: SOURCE_CELL };
    return null;
  }
  var cmpWipe = new Wipe($('cmp-wipe'), {
    p: 0.5, label: 'output', getMedia: function () { return cmpMedia(cmp.method.cell); }
  });
  cmpWipe.after = function () { if (cmp.mode === 'grid') drawGrid(); };

  function loadCmpScene() {
    var s = SCENES[cmp.scene];
    cmp.poster = loadImage('static/images/posters/grid_' + s.id + '.jpg');
    cmp.poster.onload = function () { cmpWipe.draw(); drawGrid(); };
    if (!cmp.wanted) return;
    $('cmp-status').hidden = false;
    cmp.video.preload = 'auto';
    cmp.video.src = 'static/videos/showcase_v2/' + s.id + '.mp4';
    cmp.video.load();
    var pr = cmp.video.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  loadCmpScene();
  cmp.video.addEventListener('loadeddata', function () { $('cmp-status').hidden = true; cmpWipe.draw(); drawGrid(); });
  watch($('compare'), function (v) {
    if (v && !cmp.wanted) { cmp.wanted = true; loadCmpScene(); }
    if (cmp.wanted) { if (v) { var pr = cmp.video.play(); if (pr && pr.catch) pr.catch(function () {}); } else cmp.video.pause(); }
  }, '400px 0px');

  function renderMethods() {
    $('cmp-methods').innerHTML = GROUPS.map(function (g) {
      var ms = METHODS.filter(function (m) { return m.g === g.g; });
      return '<div class="mgroup"><p class="mgroup__label">' + esc(g.label) + '</p><div class="mgroup__list">' +
        ms.map(function (m) {
          var r = byName[m.name], sym = !r || r.kind !== 'editor' ? 'unranked' : r.layer === 1 ? 'front' : 'editor';
          if (r && !r.temporal_comparable) sym = 'editor';
          var on = m === cmp.method;
          return '<button type="button" class="mbtn" role="radio" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-m="' + esc(m.name) + '">' + SYM[sym] + '<span>' + esc(m.name) + '</span></button>';
        }).join('') + '</div></div>';
    }).join('');
  }
  $('cmp-methods').addEventListener('click', function (e) {
    var b = e.target.closest('[data-m]'); if (b) pickMethod(methodByName(b.getAttribute('data-m')));
  });
  $('cmp-methods').addEventListener('keydown', function (e) {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) < 0) return;
    var i = METHODS.indexOf(cmp.method), n = (i + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : METHODS.length - 1)) % METHODS.length;
    pickMethod(METHODS[n]); var b = $('cmp-methods').querySelector('[data-m="' + METHODS[n].name + '"]'); if (b) b.focus(); e.preventDefault();
  });
  function pickMethod(m) {
    if (!m) return;
    cmp.method = m;
    $('cmp-methods').querySelectorAll('[data-m]').forEach(function (b) {
      var on = b.getAttribute('data-m') === m.name; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1;
      if (on && b.scrollIntoView && window.innerWidth <= 1000) {
        var list = $('cmp-methods'); list.scrollTo({ left: b.offsetLeft - list.clientWidth / 2 + b.clientWidth / 2, behavior: reduced() ? 'auto' : 'smooth' });
      }
    });
    $('cmp-tag').textContent = m.name;
    cmpWipe.draw(); renderReadout();
  }
  renderScenes($('cmp-scenes'), 0, function (i) { cmp.scene = i; markScenes($('cmp-scenes'), i); loadCmpScene(); if (cmp.mode === 'grid') sizeGrid(); });
  document.querySelectorAll('[data-mode]').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
  });
  function setMode(mode) {
    cmp.mode = mode;
    $('cmp').setAttribute('data-mode', mode);
    document.querySelectorAll('[data-mode]').forEach(function (b) { b.setAttribute('aria-checked', b.getAttribute('data-mode') === mode); });
    $('cmp-wipe').hidden = mode === 'grid'; $('cmp-grid').hidden = mode !== 'grid';
    if (mode === 'grid') { sizeGrid(); drawGrid(); gridLoop(); } else { cmpWipe.size(); cmpWipe.draw(); }
    renderReadout();
  }

  // Grid view: the source plus every method, drawn from the one composite video.
  var gcanvas = $('grid-canvas'), gctx = gcanvas.getContext('2d'), grid = { cols: 4, W: 0, H: 0, gap: 6, cells: [] };
  var GRID_ITEMS = [{ name: 'Source + mask', cell: SOURCE_CELL, src: true }].concat(METHODS);
  function sizeGrid() {
    var w = gcanvas.parentNode.clientWidth; if (!w) return;
    grid.cols = w < 640 ? 3 : 4;
    var rows = Math.ceil(GRID_ITEMS.length / grid.cols), gap = grid.gap, cw = (w - gap * (grid.cols - 1)) / grid.cols, ch = cw * 9 / 16;
    grid.W = w; grid.H = rows * ch + gap * (rows - 1); grid.cw = cw; grid.ch = ch;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    gcanvas.style.height = grid.H + 'px';
    gcanvas.width = Math.round(w * dpr); gcanvas.height = Math.round(grid.H * dpr);
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    $('grid-cells').innerHTML = GRID_ITEMS.map(function (m, i) {
      var c = i % grid.cols, r = Math.floor(i / grid.cols);
      var style = 'left:' + (c * (cw + gap)) + 'px;top:' + (r * (ch + gap)) + 'px;width:' + cw + 'px;height:' + ch + 'px';
      return m.src ? '<div class="gcell gcell--src" style="' + style + '"><span>Source + mask</span></div>'
        : '<button type="button" class="gcell" style="' + style + '" data-g="' + esc(m.name) + '" aria-label="Compare ' + esc(m.name) + ' with the source"><span>' + esc(m.name) + '</span></button>';
    }).join('') + (function () {
      var i = GRID_ITEMS.length, c = i % grid.cols, r = Math.floor(i / grid.cols), sc = SCENES[cmp.scene];
      if (r >= rows) return '';
      return '<div class="gcell gcell--pair" style="left:' + (c * (cw + gap)) + 'px;top:' + (r * (ch + gap)) + 'px;width:' + cw + 'px;height:' + ch + 'px" aria-label="' + esc(sc.src) + ' to ' + esc(sc.tgt) + '">' +
        '<p>' + esc(sc.src) + '</p>' + ARROW + '<p>' + esc(sc.tgt) + '</p></div>';
    })();
  }
  $('grid-cells').addEventListener('click', function (e) {
    var b = e.target.closest('[data-g]'); if (!b) return;
    pickMethod(methodByName(b.getAttribute('data-g'))); setMode('compare');
  });
  function drawGrid() {
    if (cmp.mode !== 'grid' || !grid.W) return;
    var m = cmpMedia(SOURCE_CELL); if (!m) return;
    gctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#000';
    gctx.fillRect(0, 0, grid.W, grid.H);
    GRID_ITEMS.forEach(function (it, i) {
      var c = i % grid.cols, r = Math.floor(i / grid.cols), x = c * (grid.cw + grid.gap), y = r * (grid.ch + grid.gap);
      try { gctx.drawImage(m.el, it.cell.x, it.cell.y, it.cell.w, it.cell.h, x, y, grid.cw, grid.ch); } catch (e) {}
    });
  }
  var gridRaf = 0, gridVisible = false;
  watch($('cmp-grid'), function (v) { gridVisible = v; if (v) gridLoop(); });
  function gridLoop() {
    if (gridRaf || cmp.mode !== 'grid') return;
    gridRaf = requestAnimationFrame(function t() {
      gridRaf = 0;
      if (cmp.mode !== 'grid' || document.hidden) return;
      drawGrid();
      gridRaf = requestAnimationFrame(t);
    });
  }
  window.addEventListener('resize', function () { if (cmp.mode === 'grid') { sizeGrid(); drawGrid(); } });

  // =====================================================================
  // Leaderboard data (live, with the paper's numbers as a fallback)
  // =====================================================================
  var FALLBACK = [{"method":"TextCtrl","kind":"editor","family":"A — per-frame image editing","temporal_comparable":true,"SeqAcc":0.47475,"CharAcc":0.7335,"TTS":0.51078,"Flicker_full":3.80403,"Flicker_crop":4.28705,"Warp_full":1.58836,"Warp_crop":2.08761,"MUSIQ_full":70.32217,"MUSIQ_crop":42.77287,"PSNR_loc":41.14345,"SSIM_loc":0.99441,"LPIPS_loc":0.00797,"DreamSim_loc":0.00429},{"method":"ViTeX-Edit-14B (Composite)","kind":"postprocessed","family":"Reference editor","temporal_comparable":true,"SeqAcc":0.3449,"CharAcc":0.68921,"TTS":0.66602,"Flicker_full":3.73042,"Flicker_crop":3.82673,"Warp_full":1.50609,"Warp_crop":1.55914,"MUSIQ_full":70.27119,"MUSIQ_crop":44.94476,"PSNR_loc":42.95077,"SSIM_loc":0.99251,"LPIPS_loc":0.00592,"DreamSim_loc":0.00233},{"method":"ViTeX-Edit-14B","kind":"editor","family":"Reference editor","temporal_comparable":true,"SeqAcc":0.34121,"CharAcc":0.68798,"TTS":0.64782,"Flicker_full":3.27393,"Flicker_crop":3.42467,"Warp_full":1.55152,"Warp_crop":1.53042,"MUSIQ_full":69.635,"MUSIQ_crop":43.52962,"PSNR_loc":29.07743,"SSIM_loc":0.95122,"LPIPS_loc":0.06031,"DreamSim_loc":0.02352},{"method":"VideoPainter","kind":"editor","family":"C — mask-conditioned video inpainting","temporal_comparable":false,"SeqAcc":0.3645,"CharAcc":0.6188,"TTS":0.60583,"Flicker_full":2.3834,"Flicker_crop":2.61942,"Warp_full":2.92762,"Warp_crop":3.34526,"MUSIQ_full":67.16001,"MUSIQ_crop":40.58771,"PSNR_loc":28.55596,"SSIM_loc":0.91516,"LPIPS_loc":0.10402,"DreamSim_loc":0.02391},{"method":"FLUX-Text","kind":"editor","family":"A — per-frame image editing","temporal_comparable":true,"SeqAcc":0.52837,"CharAcc":0.73677,"TTS":0.32555,"Flicker_full":5.11433,"Flicker_crop":14.81407,"Warp_full":3.02676,"Warp_crop":13.00985,"MUSIQ_full":70.25922,"MUSIQ_crop":43.8544,"PSNR_loc":31.48887,"SSIM_loc":0.97469,"LPIPS_loc":0.02857,"DreamSim_loc":0.01204},{"method":"RS-STE","kind":"editor","family":"A — per-frame image editing","temporal_comparable":true,"SeqAcc":0.35397,"CharAcc":0.62586,"TTS":0.53366,"Flicker_full":3.72818,"Flicker_crop":3.66286,"Warp_full":1.60507,"Warp_crop":1.81479,"MUSIQ_full":69.57173,"MUSIQ_crop":34.26485,"PSNR_loc":37.00242,"SSIM_loc":0.98309,"LPIPS_loc":0.02355,"DreamSim_loc":0.00732},{"method":"AnyText2","kind":"editor","family":"A — per-frame image editing","temporal_comparable":true,"SeqAcc":0.27973,"CharAcc":0.63322,"TTS":0.38187,"Flicker_full":3.33988,"Flicker_crop":4.95455,"Warp_full":2.04254,"Warp_crop":3.95164,"MUSIQ_full":66.67552,"MUSIQ_crop":41.65317,"PSNR_loc":25.55582,"SSIM_loc":0.90474,"LPIPS_loc":0.09149,"DreamSim_loc":0.0431},{"method":"TextCtrl + AnyV2V","kind":"editor","family":"B — first-frame editing + propagation","temporal_comparable":true,"SeqAcc":0.05679,"CharAcc":0.3078,"TTS":0.25666,"Flicker_full":4.98029,"Flicker_crop":4.97705,"Warp_full":4.10777,"Warp_crop":3.96745,"MUSIQ_full":69.41088,"MUSIQ_crop":33.85113,"PSNR_loc":21.08435,"SSIM_loc":0.78467,"LPIPS_loc":0.22498,"DreamSim_loc":0.07322},{"method":"Source video","kind":"reference","family":"","temporal_comparable":true,"SeqAcc":0.0,"CharAcc":0.31654,"TTS":0.75987,"Flicker_full":3.72255,"Flicker_crop":3.68119,"Warp_full":1.46411,"Warp_crop":1.26902,"MUSIQ_full":70.32923,"MUSIQ_crop":45.12224,"PSNR_loc":null,"SSIM_loc":1.0,"LPIPS_loc":0.0,"DreamSim_loc":0.0},{"method":"Wan2.1-VACE-14B","kind":"editor","family":"C — mask-conditioned video inpainting","temporal_comparable":true,"SeqAcc":0.0,"CharAcc":0.29843,"TTS":0.68949,"Flicker_full":3.77738,"Flicker_crop":3.8411,"Warp_full":1.68765,"Warp_crop":1.56097,"MUSIQ_full":70.53707,"MUSIQ_crop":45.25671,"PSNR_loc":35.21164,"SSIM_loc":0.97619,"LPIPS_loc":0.02184,"DreamSim_loc":0.00706},{"method":"Kling Video 3.0 Omni","kind":"editor","family":"D — instruction-guided video editing","temporal_comparable":true,"SeqAcc":0.0,"CharAcc":0.20753,"TTS":0.64089,"Flicker_full":4.24768,"Flicker_crop":4.08125,"Warp_full":3.11891,"Warp_crop":2.90209,"MUSIQ_full":72.23268,"MUSIQ_crop":47.74585,"PSNR_loc":21.18163,"SSIM_loc":0.84303,"LPIPS_loc":0.17595,"DreamSim_loc":0.06078}];

  var M = {
    SeqAcc:       { html: 'SeqAcc', dir: 'up', digits: 3, scale: 'lin', def: 'share of readable frames where OCR finds the exact target string' },
    CharAcc:      { html: 'CharAcc', dir: 'up', digits: 3, scale: 'lin' },
    TTS:          { html: 'TTS', dir: 'up', digits: 3, scale: 'lin' },
    Flicker_full: { html: 'Flicker<sub>f</sub>', dir: 'down', digits: 2, scale: 'log', temporal: true },
    Flicker_crop: { html: 'Flicker<sub>c</sub>', dir: 'down', digits: 2, scale: 'log', temporal: true },
    Warp_full:    { html: 'Warp<sub>f</sub>', dir: 'down', digits: 2, scale: 'log', temporal: true },
    Warp_crop:    { html: 'Warp<sub>c</sub>', dir: 'down', digits: 2, scale: 'log', temporal: true, def: 'motion-compensated frame-to-frame error inside the text crop' },
    MUSIQ_full:   { html: 'MUSIQ<sub>f</sub>', dir: 'up', digits: 2, scale: 'lin' },
    MUSIQ_crop:   { html: 'MUSIQ<sub>c</sub>', dir: 'up', digits: 2, scale: 'lin' },
    PSNR_loc:     { html: 'PSNR<sub>loc</sub>', dir: 'up', digits: 2, scale: 'lin' },
    SSIM_loc:     { html: 'SSIM<sub>loc</sub>', dir: 'up', digits: 3, scale: 'lin' },
    LPIPS_loc:    { html: 'LPIPS<sub>loc</sub>', dir: 'down', digits: 3, scale: 'log' },
    DreamSim_loc: { html: 'DreamSim<sub>loc</sub>', dir: 'down', digits: 3, scale: 'log', def: 'learned perceptual distance to the source outside the mask' }
  };
  var AXES = [
    { name: 'Text correctness', q: 'Does the edited region read as the target string, frame after frame?', keys: ['SeqAcc', 'CharAcc', 'TTS'], primary: 'SeqAcc' },
    { name: 'Visual and temporal quality', q: 'Is the edited video natural and stable over time?', keys: ['Flicker_full', 'Flicker_crop', 'Warp_full', 'Warp_crop', 'MUSIQ_full', 'MUSIQ_crop'], primary: 'Warp_crop' },
    { name: 'Edit locality', q: 'Does the scene outside the mask stay unchanged?', keys: ['PSNR_loc', 'SSIM_loc', 'LPIPS_loc', 'DreamSim_loc'], primary: 'DreamSim_loc' }
  ];
  var PRIMARIES = ['SeqAcc', 'Warp_crop', 'DreamSim_loc'];
  var LOG_FLOOR = { DreamSim_loc: 0.001, LPIPS_loc: 0.002 };
  function arrow(k) { return M[k].dir === 'up' ? '↑' : '↓'; }
  function isRanked(r) { return r.kind === 'editor'; }
  function comparable(r, k) { return !(M[k] && M[k].temporal && !r.temporal_comparable); }
  function val(r, k) { var v = r[k]; if (k === 'PSNR_loc' && r.kind === 'reference' && v == null) return Infinity; return v == null ? null : v; }
  function better(k, a, b) { return M[k].dir === 'up' ? a > b : a < b; }
  function fmt(r, k) { var v = val(r, k); return v === Infinity ? '∞' : v == null ? '–' : Number(v).toFixed(M[k].digits).replace(/^-(0\.0+)$/, '$1'); }
  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function familyLabel(r) {
    if (r.kind === 'reference') return 'Reference, not ranked';
    if (r.kind === 'postprocessed') return 'Post-processed, not ranked';
    var f = r.family || '', m = /^([A-Z])\s+—\s+(.*)$/.exec(f);
    if (m) return m[1] + ' · ' + m[2].charAt(0).toUpperCase() + m[2].slice(1);
    return f;
  }

  var rows = [], byName = {}, ranks = {};
  function prepare(list) {
    rows = list.map(function (r) { var o = {}; for (var k in r) o[k] = r[k]; o.id = r.method; return o; });
    byName = {}; rows.forEach(function (r) { byName[r.method] = r; });
    Object.keys(M).forEach(function (k) {
      var pool = rows.filter(function (r) { return isRanked(r) && comparable(r, k) && val(r, k) != null; });
      ranks[k] = {};
      pool.forEach(function (r) { ranks[k][r.id] = { rank: pool.filter(function (o) { return better(k, val(o, k), val(r, k)); }).length + 1, of: pool.length }; });
    });
    function dominates(o, r) {
      return PRIMARIES.every(function (k) { return !better(k, val(r, k), val(o, k)); }) && PRIMARIES.some(function (k) { return better(k, val(o, k), val(r, k)); });
    }
    rows.forEach(function (r) { r.layer = null; r.pareto = false; });
    var left = rows.filter(function (r) { return isRanked(r) && r.temporal_comparable && PRIMARIES.every(function (k) { return val(r, k) != null; }); });
    for (var layer = 1; left.length; layer++) {
      var front = left.filter(function (r) { return !left.some(function (o) { return o !== r && dominates(o, r); }); });
      front.forEach(function (r) { r.layer = layer; r.pareto = layer === 1; });
      left = left.filter(function (r) { return front.indexOf(r) < 0; });
    }
  }

  function renderAxes() {
    $('axes').innerHTML = AXES.map(function (a) {
      return '<div class="ax"><h3>' + esc(a.name) + '</h3><p>' + esc(a.q) + '</p><ul>' +
        a.keys.map(function (k) { return '<li' + (k === a.primary ? ' class="prim"' : '') + '>' + M[k].html + ' ' + arrow(k) + '</li>'; }).join('') +
        '</ul><p class="ax__prim">Primary: <b>' + M[a.primary].html + ' ' + arrow(a.primary) + '</b>, ' + esc(M[a.primary].def) + '.</p></div>';
    }).join('');
  }

  function metricBlock(r, k, cls) {
    var rk = ranks[k] && ranks[k][r.id], note;
    if (!comparable(r, k)) note = '† not compared';
    else if (!isRanked(r)) note = 'not ranked';
    else note = rk ? ordinal(rk.rank) + ' of ' + rk.of : '';
    return '<dl class="' + cls + '"><dt>' + M[k].html + ' ' + arrow(k) + '</dt><dd>' + fmt(r, k) + (comparable(r, k) ? '' : '†') + '<small>' + note + '</small></dd></dl>';
  }
  function renderReadout() {
    var el = $('cmp-readout');
    if (cmp.mode === 'grid') { el.innerHTML = '<p class="readout__note">All outputs play in sync from one video. Select a tile to compare that method with the source.</p>'; return; }
    var r = byName[cmp.method.name];
    if (!r) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="readout__id"><p class="readout__name">' + esc(r.method) + (r.pareto ? FRONT_PILL : '') + '</p><p class="readout__meta">' + esc(familyLabel(r)) + '</p></div>' +
      PRIMARIES.map(function (k) { return metricBlock(r, k, 'readout__m'); }).join('') +
      '<p class="readout__note">Scores are means over the 157-clip frozen split, not this one clip. Ranks are among raw editors.</p>';
  }

  // =====================================================================
  // 3-D star space (the leaderboard's drawing, centred for this page).
  // x = correctness (SeqAcc), y = temporal (Warp_c), z = locality (DreamSim_loc);
  // every axis runs from worst (-1) to best (+1), so the ideal is (1, 1, 1).
  // =====================================================================
  var VIEWS = {
    '3d': { yaw: 0.52, pitch: 0.34, persp: 0.18, zoom: 1 },
    ct: { yaw: 0, pitch: 0, persp: 0, zoom: 1.36 },
    cl: { yaw: 0, pitch: -Math.PI / 2, persp: 0, zoom: 1.36 },
    tl: { yaw: Math.PI / 2, pitch: 0, persp: 0, zoom: 1.36 }
  };
  var AX3 = [{ key: 'SeqAcc', name: 'Correctness' }, { key: 'Warp_crop', name: 'Temporal' }, { key: 'DreamSim_loc', name: 'Locality' }];
  var sky = { view: '3d', sel: null };
  var canvas = $('sky'), ctx = canvas.getContext('2d');
  var cam = { yaw: VIEWS['3d'].yaw, pitch: VIEWS['3d'].pitch, persp: VIEWS['3d'].persp, zoom: 1 };
  var W = 0, H = 0, colors = {}, scales = [], stars = [], mesh = { tris: [], pts: [] };
  var hover = null, drag = null, interacted = false, tween = null, skyVisible = false, rafId = 0, t0 = performance.now();

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    function rgb(name) {
      var m = /^#([0-9a-f]{6})$/i.exec(cs.getPropertyValue(name).trim());
      if (!m) return [240, 240, 240];
      var n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    colors = { fg: rgb('--fg'), fg3: rgb('--fg-3'), bg: rgb('--bg'), acc: rgb('--accent'), glow: parseFloat(cs.getPropertyValue('--glow')) || 0 };
  }
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function makeScale(k, pts) {
    var vals = pts.map(function (r) { return val(r, k); }).filter(function (v) { return v != null && isFinite(v); });
    var floor = LOG_FLOOR[k] || 1e-3, lo, hi, tf;
    if (M[k].scale === 'log') {
      tf = function (v) { return Math.log10(Math.max(v, floor)); };
      lo = Math.min.apply(null, vals.map(tf)); hi = Math.max.apply(null, vals.map(tf));
      var pad = (hi - lo) * 0.06; lo -= pad; hi += pad;
    } else {
      tf = function (v) { return v; };
      lo = Math.min(0, Math.min.apply(null, vals)); hi = Math.max.apply(null, vals);
      hi = Math.ceil(hi * 10 + 0.3) / 10; lo -= (hi - lo) * 0.04;
    }
    var f = function (v) { var t = (tf(v) - lo) / (hi - lo); t = M[k].dir === 'up' ? t : 1 - t; return t * 2 - 1; };
    f.ticks = function () {
      if (M[k].scale === 'log') {
        var cands = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 1, 1.5, 2, 3, 5, 10, 20];
        return cands.filter(function (v) { var t = tf(v); return t >= lo && t <= hi; }).filter(function (v, i, a) { return a.length <= 4 || i % 2 === 0; });
      }
      var out = []; for (var v = 0; v <= hi + 1e-9; v += 0.2) out.push(+v.toFixed(2)); return out;
    };
    return f;
  }
  function buildStars() {
    var pts = rows.filter(function (r) { return AX3.every(function (a) { return comparable(r, a.key) && val(r, a.key) != null; }); });
    scales = AX3.map(function (a) { return makeScale(a.key, pts); });
    stars = pts.map(function (r) { return { r: r, p: [scales[0](val(r, 'SeqAcc')), scales[1](val(r, 'Warp_crop')), scales[2](val(r, 'DreamSim_loc'))] }; });
    var fp = stars.filter(function (s) { return isRanked(s.r) && s.r.pareto; });
    var uv = fp.map(function (s) { var p = s.p; return [(p[0] - p[1]) / Math.SQRT2, (p[0] + p[1] - 2 * p[2]) / Math.sqrt(6)]; });
    var tris = [];
    for (var i = 0; i < uv.length; i++) for (var j = i + 1; j < uv.length; j++) for (var k = j + 1; k < uv.length; k++) {
      var A = uv[i], B = uv[j], Cc = uv[k];
      var d = 2 * (A[0] * (B[1] - Cc[1]) + B[0] * (Cc[1] - A[1]) + Cc[0] * (A[1] - B[1]));
      if (Math.abs(d) < 1e-9) continue;
      var a2 = A[0] * A[0] + A[1] * A[1], b2 = B[0] * B[0] + B[1] * B[1], c2 = Cc[0] * Cc[0] + Cc[1] * Cc[1];
      var ux = (a2 * (B[1] - Cc[1]) + b2 * (Cc[1] - A[1]) + c2 * (A[1] - B[1])) / d;
      var uy = (a2 * (Cc[0] - B[0]) + b2 * (A[0] - Cc[0]) + c2 * (B[0] - A[0])) / d;
      var r2 = (A[0] - ux) * (A[0] - ux) + (A[1] - uy) * (A[1] - uy);
      var empty = uv.every(function (P, m) { return m === i || m === j || m === k || (P[0] - ux) * (P[0] - ux) + (P[1] - uy) * (P[1] - uy) > r2 * (1 + 1e-9); });
      if (empty) tris.push([fp[i].p, fp[j].p, fp[k].p]);
    }
    mesh = { tris: tris, pts: fp.map(function (s) { return s.p; }) };
  }
  function layoutSize() {
    var b = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = b.width; H = b.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function frame() {
    var small = W < 700;
    var r3 = small ? Math.min(W * 0.24, (H * 0.5 - 60) / 1.5) : Math.min(W * 0.2, (H * 0.5 - 70) / 1.45);
    var rF = small ? Math.min(W * 0.34, H * 0.5 - 56) : Math.min(W * 0.24, H * 0.5 - 70);
    var t = (cam.zoom - 1) / 0.36;
    return { cx: W / 2, cy: H * 0.5, R: r3 + (rF - r3) * t };
  }
  function projector() {
    var F = frame(), cyw = Math.cos(cam.yaw), syw = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    function rot(p) { var x1 = p[0] * cyw + p[2] * syw, z1 = -p[0] * syw + p[2] * cyw; return [x1, p[1] * cp - z1 * sp, p[1] * sp + z1 * cp]; }
    var fn = function (p) { var q = rot(p), f = 1 / (1 - cam.persp * q[2] * 0.33); return { x: F.cx + q[0] * F.R * f, y: F.cy - q[1] * F.R * f, z: q[2], f: f }; };
    fn.F = F; return fn;
  }
  function line(P, a, b, style, width, dash) {
    var p = P(a), q = P(b);
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
    ctx.strokeStyle = style; ctx.lineWidth = width || 1; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
  }
  function text(str, x, y, font, color, align, halo) {
    ctx.font = font; ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    if (halo) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = rgba(colors.bg, 0.85); ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }
  var SANS = '"Atkinson Hyperlegible Next", system-ui, sans-serif', MONO = '"Atkinson Hyperlegible Mono", ui-monospace, monospace';
  function metricParts(key) { var m = /^(.*?)<sub>(.*?)<\/sub>$/.exec(M[key].html); return { base: m ? m[1] : M[key].html, sub: m ? m[2] : '', tail: ' ' + arrow(key) }; }
  function metricWidth(key, size) {
    var p = metricParts(key);
    ctx.font = '400 ' + size + 'px ' + MONO; var w = ctx.measureText(p.base + p.tail).width;
    ctx.font = '400 ' + (size * 0.75) + 'px ' + MONO; return w + (p.sub ? ctx.measureText(p.sub).width + 1 : 0);
  }
  function metricText(key, x, y, size, color, align) {
    var p = metricParts(key), w = metricWidth(key, size), x0 = align === 'left' ? x : align === 'right' ? x - w : x - w / 2;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = color;
    ctx.font = '400 ' + size + 'px ' + MONO; ctx.fillText(p.base, x0, y); x0 += ctx.measureText(p.base).width;
    if (p.sub) { ctx.font = '400 ' + (size * 0.75) + 'px ' + MONO; ctx.fillText(p.sub, x0 + 0.5, y + size * 0.3); x0 += ctx.measureText(p.sub).width + 1; }
    ctx.font = '400 ' + size + 'px ' + MONO; ctx.fillText(p.tail, x0, y);
  }
  function hit(box, list) { return list.some(function (b) { return box.x < b.x + b.w && b.x < box.x + box.w && box.y < b.y + b.h && b.y < box.y + box.h; }); }

  function draw() {
    if (!W || !stars.length) return;
    var P = projector(), F = P.F, fg = colors.fg, is3d = cam.persp > 0.02;
    ctx.clearRect(0, 0, W, H);
    var corners = [], cb = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    [-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { [-1, 1].forEach(function (c) { corners.push(P([a, b, c])); }); }); });
    corners.forEach(function (c) { cb.x0 = Math.min(cb.x0, c.x); cb.y0 = Math.min(cb.y0, c.y); cb.x1 = Math.max(cb.x1, c.x); cb.y1 = Math.max(cb.y1, c.y); });

    var ticks = scales.map(function (s) { return s.ticks().map(function (v) { return { v: v, t: s(v) }; }); });
    var wall = rgba(fg, 0.08), edge = rgba(fg, 0.22);
    ticks[0].forEach(function (k) { line(P, [k.t, -1, -1], [k.t, 1, -1], wall); line(P, [k.t, -1, -1], [k.t, -1, 1], wall); });
    ticks[1].forEach(function (k) { line(P, [-1, k.t, -1], [1, k.t, -1], wall); line(P, [-1, k.t, -1], [-1, k.t, 1], wall); });
    ticks[2].forEach(function (k) { line(P, [-1, -1, k.t], [1, -1, k.t], wall); line(P, [-1, -1, k.t], [-1, 1, k.t], wall); });
    var box = rgba(fg, 0.13);
    [[[-1, 1, -1], [1, 1, -1]], [[1, -1, -1], [1, 1, -1]], [[1, -1, -1], [1, -1, 1]], [[-1, 1, -1], [-1, 1, 1]], [[-1, -1, 1], [-1, 1, 1]], [[-1, -1, 1], [1, -1, 1]],
     [[1, 1, -1], [1, 1, 1]], [[-1, 1, 1], [1, 1, 1]], [[1, -1, 1], [1, 1, 1]]].forEach(function (e) { line(P, e[0], e[1], box); });

    var small = W < 560, axisBoxes = [], C = P([0, 0, 0]);
    AX3.forEach(function (a, i) {
      var o = [0, 0, 0], e = [0, 0, 0]; o[i] = -1; e[i] = 1.12;
      var so = P(o), se = P(e), len = Math.hypot(se.x - so.x, se.y - so.y);
      if (len < F.R * 0.35) return;
      var ux = (se.x - so.x) / len, uy = (se.y - so.y) / len, nx = -uy, ny = ux;
      if (-nx + ny < 0) { nx = -nx; ny = -ny; }
      var j = (i + 1) % 3, k2 = (i + 2) % 3, bestEdge = null, bestS = -Infinity;
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
        var m = [0, 0, 0]; m[j] = c[0]; m[k2] = c[1];
        var pm = P(m), sc = (pm.x - C.x) * nx + (pm.y - C.y) * ny;
        if (sc > bestS + 0.5) { bestS = sc; bestEdge = c; }
      });
      function at(t) { var q = [0, 0, 0]; q[i] = t; q[j] = bestEdge[0]; q[k2] = bestEdge[1]; return q; }
      line(P, at(-1), at(1.12), edge, 1);
      var tip = P(at(1.12));
      ctx.beginPath(); ctx.moveTo(tip.x, tip.y);
      ctx.lineTo(tip.x - ux * 7 - uy * 3.5, tip.y - uy * 7 + ux * 3.5);
      ctx.lineTo(tip.x - ux * 7 + uy * 3.5, tip.y - uy * 7 - ux * 3.5);
      ctx.closePath(); ctx.fillStyle = edge; ctx.fill();
      var tickFont = '400 ' + (small ? 11 : 11.5) + 'px ' + MONO, tickCol = rgba(colors.fg3, 1);
      ctx.font = tickFont;
      ticks[i].forEach(function (k) {
        var p = P(at(k.t)), label = String(k.v), tw0 = ctx.measureText(label).width;
        var bx = { x: p.x + nx * 17 - tw0 / 2 - 3, y: p.y + ny * 17 - 8, w: tw0 + 6, h: 16 };
        if (hit(bx, axisBoxes)) return;
        text(label, p.x + nx * 17, p.y + ny * 17, tickFont, tickCol, 'center');
        ctx.font = tickFont; axisBoxes.push(bx);
      });
      var nameFont = '500 ' + (small ? 12 : 13) + 'px ' + SANS, metSize = small ? 11 : 12;
      ctx.font = nameFont; var tw = Math.max(ctx.measureText(a.name).width, metricWidth(a.key, metSize));
      var lx, ly, align, left, lb, tries = 0;
      do {
        var push = tries * 14;
        if (Math.abs(uy) < 0.3) { lx = tip.x; ly = tip.y + ny * (40 + push); align = 'right'; }
        else if (Math.abs(ux) < 0.3) { lx = tip.x; ly = tip.y - 36 - push; align = 'center'; }
        else { lx = tip.x + ux * (16 + push) + nx * 12; ly = tip.y + uy * (16 + push) + ny * 12 - (uy < 0 ? 18 : 0); align = ux > 0 ? 'left' : 'right'; }
        left = align === 'left' ? lx : align === 'right' ? lx - tw : lx - tw / 2;
        if (left < 6) { lx += 6 - left; left = 6; } else if (left + tw > W - 6) { lx -= left + tw - (W - 6); left = W - 6 - tw; }
        ly = Math.max(12, Math.min(H - 24, ly));
        lb = { x: left - 2, y: ly - 9, w: tw + 4, h: 32 };
        tries++;
      } while (hit(lb, axisBoxes) && tries < 5);
      text(a.name, lx, ly, nameFont, rgba(fg, 0.92), align);
      metricText(a.key, lx, ly + 16, metSize, tickCol, align);
      axisBoxes.push(lb);
    });

    var meshA = Math.max(0, Math.min(1, (cam.persp - 0.02) / 0.14));
    if (meshA > 0 && mesh.tris.length) {
      mesh.tris.map(function (t) { var q = t.map(P); return { q: q, z: (q[0].z + q[1].z + q[2].z) / 3 }; })
        .sort(function (a, b) { return a.z - b.z; })
        .forEach(function (t) {
          ctx.beginPath(); ctx.moveTo(t.q[0].x, t.q[0].y); ctx.lineTo(t.q[1].x, t.q[1].y); ctx.lineTo(t.q[2].x, t.q[2].y); ctx.closePath();
          ctx.fillStyle = rgba(colors.acc, (colors.glow ? 0.12 : 0.1) * meshA); ctx.fill();
          ctx.strokeStyle = rgba(colors.acc, (colors.glow ? 0.6 : 0.7) * meshA); ctx.lineWidth = 1; ctx.stroke();
        });
    } else if (meshA > 0 && mesh.pts.length === 2) {
      line(P, mesh.pts[0], mesh.pts[1], rgba(colors.acc, 0.6 * meshA), 1);
    }

    var I = P([1, 1, 1]), spike = small ? 22 : 30;
    if (colors.glow) {
      var gR = small ? 46 : 70, gl = ctx.createRadialGradient(I.x, I.y, 0, I.x, I.y, gR);
      gl.addColorStop(0, rgba(fg, 0.55)); gl.addColorStop(0.12, rgba(fg, 0.28)); gl.addColorStop(0.4, rgba(fg, 0.08)); gl.addColorStop(1, rgba(fg, 0));
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(I.x, I.y, gR, 0, 6.2832); ctx.fill();
    }
    [[1, 0, spike], [0, 1, spike], [0.7071, 0.7071, spike * 0.45], [0.7071, -0.7071, spike * 0.45]].forEach(function (d) {
      var sg = ctx.createLinearGradient(I.x - d[0] * d[2], I.y - d[1] * d[2], I.x + d[0] * d[2], I.y + d[1] * d[2]);
      sg.addColorStop(0, rgba(fg, 0)); sg.addColorStop(0.5, rgba(fg, colors.glow ? 0.95 : 0.7)); sg.addColorStop(1, rgba(fg, 0));
      ctx.strokeStyle = sg; ctx.lineWidth = d[2] === spike ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(I.x - d[0] * d[2], I.y - d[1] * d[2]); ctx.lineTo(I.x + d[0] * d[2], I.y + d[1] * d[2]); ctx.stroke();
    });
    ctx.beginPath(); ctx.arc(I.x, I.y, small ? 4.5 : 5.5, 0, 6.2832); ctx.fillStyle = rgba(fg, 1); ctx.fill();
    ctx.beginPath(); ctx.arc(I.x, I.y, small ? 9 : 11, 0, 6.2832); ctx.strokeStyle = rgba(fg, 0.5); ctx.lineWidth = 1; ctx.stroke();
    ctx.font = '500 ' + (small ? 12 : 13.5) + 'px ' + SANS;
    var iw = ctx.measureText('Ideal').width, ix = I.x + 14, iy = I.y - 16;
    if (ix + iw > W - 6) ix = I.x - 14 - iw;
    text('Ideal', ix, iy, '500 ' + (small ? 12 : 13.5) + 'px ' + SANS, rgba(fg, 0.95), 'left', true);
    var idealBox = { x: Math.min(ix, I.x - spike) - 2, y: I.y - spike, w: Math.max(ix + iw, I.x + spike) - Math.min(ix, I.x - spike) + 4, h: spike * 2 };

    var proj = stars.map(function (s) { var q = P(s.p); return { s: s, x: q.x, y: q.y, z: q.z, f: q.f }; }).sort(function (a, b) { return a.z - b.z; });
    var depth = function (z) { return is3d ? 0.55 + 0.45 * (z + 1.8) / 3.6 : 1; };
    var focus = sky.sel || (hover && hover.s.r.id);
    proj.forEach(function (q) {
      if (!is3d || q.s.r.id !== focus) return;
      var base = [q.s.p[0], -1, q.s.p[2]];
      line(P, q.s.p, base, rgba(fg, 0.4), 1, [3, 4]);
      var b = P(base); ctx.beginPath(); ctx.arc(b.x, b.y, 2.2, 0, 6.2832); ctx.fillStyle = rgba(fg, 0.4); ctx.fill();
    });
    proj.forEach(function (q) {
      var r = q.s.r, a = depth(q.z), k = q.f;
      if (!isRanked(r)) {
        ctx.beginPath(); ctx.arc(q.x, q.y, 4.2 * k, 0, 6.2832); ctx.strokeStyle = rgba(fg, 0.75 * a); ctx.lineWidth = 1.1; ctx.stroke();
      } else if (r.pareto) {
        if (colors.glow) {
          var g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 20 * k);
          g.addColorStop(0, rgba(colors.acc, 0.45 * a)); g.addColorStop(1, rgba(colors.acc, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, 20 * k, 0, 6.2832); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(q.x, q.y, 4.4 * k, 0, 6.2832); ctx.fillStyle = rgba(colors.acc, Math.min(1, a + 0.15)); ctx.fill();
        ctx.beginPath(); ctx.arc(q.x, q.y, 8.5 * k, 0, 6.2832); ctx.strokeStyle = rgba(colors.acc, 0.6 * a); ctx.lineWidth = 1; ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(q.x, q.y, 2.8 * k * (is3d ? 0.7 + 0.3 * a : 1), 0, 6.2832); ctx.fillStyle = rgba(fg, 0.62 * a); ctx.fill();
      }
      if (r.id === focus) { ctx.beginPath(); ctx.arc(q.x, q.y, 13 * k, 0, 6.2832); ctx.strokeStyle = rgba(fg, 0.9); ctx.lineWidth = 1.2; ctx.stroke(); }
      q.a = a;
    });

    var placed = axisBoxes.concat([idealBox]), order = proj.slice().sort(function (a, b) {
      var pa = a.s.r.id === focus ? 0 : a.s.r.pareto ? 1 : isRanked(a.s.r) ? 2 : 3;
      var pb = b.s.r.id === focus ? 0 : b.s.r.pareto ? 1 : isRanked(b.s.r) ? 2 : 3;
      return pa - pb;
    });
    var font = '500 ' + (small ? 11.5 : 12.5) + 'px ' + SANS;
    function nearestIsOwn(bx, q) {
      var cx = bx.x + bx.w / 2, cy = bx.y + bx.h / 2, dOwn = Math.hypot(q.x - cx, q.y - cy);
      return !proj.some(function (o) {
        if (o === q || Math.hypot(o.x - q.x, o.y - q.y) <= 8) return false;
        var ox = Math.max(bx.x - o.x, 0, o.x - bx.x - bx.w), oy = Math.max(bx.y - o.y, 0, o.y - bx.y - bx.h);
        var qx = Math.max(bx.x - q.x, 0, q.x - bx.x - bx.w), qy = Math.max(bx.y - q.y, 0, q.y - bx.y - bx.h);
        return Math.hypot(o.x - cx, o.y - cy) < dOwn + 6 || Math.hypot(ox, oy) < Math.hypot(qx, qy) + 8;
      });
    }
    order.forEach(function (q) {
      var r = q.s.r, on = r.id === focus, must = on || (isRanked(r) && r.pareto) || (!is3d && isRanked(r));
      if (!on && is3d && !r.pareto) return;
      var name = r.method;
      ctx.font = font;
      var w = ctx.measureText(name).width, h = 14, g = (r.pareto ? 13 : 9) * q.f, d = g * 0.75;
      var cands = [[g, 0, 'left'], [-g, 0, 'right'], [d, -d - 4, 'left'], [d, d + 4, 'left'], [-d, -d - 4, 'right'], [-d, d + 4, 'right'], [0, -g - 4, 'center'], [0, g + 6, 'center']];
      var chosen = null;
      function boxFor(c) { var x0 = c[2] === 'left' ? q.x + c[0] : c[2] === 'right' ? q.x + c[0] - w : q.x - w / 2; return { x: x0 - 2, y: q.y + c[1] - h / 2, w: w + 4, h: h }; }
      function free(bx) {
        if (bx.x < 4 || bx.x + bx.w > W - 4 || bx.y < 4 || bx.y + bx.h > H - 4) return false;
        if (!is3d && (bx.x < cb.x0 + 3 || bx.x + bx.w > cb.x1 + 70)) return false;
        if (hit(bx, placed)) return false;
        return !proj.some(function (o) { return o !== q && o.x > bx.x - 5 && o.x < bx.x + bx.w + 5 && o.y > bx.y - 5 && o.y < bx.y + bx.h + 5; });
      }
      for (var i = 0; i < cands.length && !chosen; i++) { var bx = boxFor(cands[i]); if (free(bx) && nearestIsOwn(bx, q)) chosen = { c: cands[i], box: bx }; }
      if (!chosen && must) {
        for (var ring = 30; ring <= 90 && !chosen; ring += 15) {
          for (var ang = 0; ang < 8 && !chosen; ang++) {
            var t = ang * Math.PI / 4 - Math.PI / 8, dx = Math.cos(t) * ring, dy = Math.sin(t) * ring * 0.7;
            var c = [dx, dy, dx >= 0 ? 'left' : 'right'], bx2 = boxFor(c);
            if (free(bx2)) chosen = { c: c, box: bx2, leader: true };
          }
        }
        if (!chosen) { var c0 = [g, 0, 'left']; chosen = { c: c0, box: boxFor(c0) }; }
      }
      if (!chosen) return;
      placed.push(chosen.box);
      if (chosen.leader) {
        var ex = chosen.c[2] === 'left' ? chosen.box.x : chosen.box.x + chosen.box.w;
        var ang2 = Math.atan2(chosen.c[1], chosen.c[0]), r0 = (r.pareto ? 10 : 6) * q.f;
        ctx.beginPath(); ctx.moveTo(q.x + Math.cos(ang2) * r0, q.y + Math.sin(ang2) * r0); ctx.lineTo(ex, q.y + chosen.c[1]);
        ctx.strokeStyle = rgba(colors.fg3, 1); ctx.lineWidth = 1; ctx.stroke();
      }
      var col = on ? rgba(fg, 1) : isRanked(r) ? rgba(fg, 0.86 * (q.a || 1)) : rgba(colors.fg3, 1);
      text(name, chosen.c[2] === 'center' ? q.x : q.x + chosen.c[0], q.y + chosen.c[1], font, col, chosen.c[2], true);
    });
    canvas._proj = proj;
  }

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function pressView(view) { document.querySelectorAll('.views [data-view]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-view') === view ? 'true' : 'false'); }); }
  function goTo(view) {
    sky.view = view; pressView(view);
    var to = VIEWS[view];
    if (reduced()) { cam.yaw = to.yaw; cam.pitch = to.pitch; cam.persp = to.persp; cam.zoom = to.zoom; tween = null; draw(); }
    else { tween = { from: { yaw: cam.yaw, pitch: cam.pitch, persp: cam.persp, zoom: cam.zoom }, to: to, start: performance.now(), dur: 1100 }; skyLoop(); }
    $('sky-note').textContent = view === '3d' ? 'Drag to rotate. Select a star for its scores.'
      : 'A two-axis view of the same space. The front is judged in three dimensions, so a front member can look beaten here.';
  }
  function skyLoop() {
    if (rafId) return;
    rafId = requestAnimationFrame(function (now) {
      rafId = 0;
      var more = false;
      if (tween) {
        var t = Math.min(1, (now - tween.start) / tween.dur), e = ease(t);
        ['yaw', 'pitch', 'persp', 'zoom'].forEach(function (k) { cam[k] = tween.from[k] + (tween.to[k] - tween.from[k]) * e; });
        if (t >= 1) tween = null; else more = true;
      } else if (sky.view === '3d' && !interacted && !drag && !reduced()) {
        cam.yaw = VIEWS['3d'].yaw + Math.sin((now - t0) / 9000) * 0.32; more = true;
      }
      draw();
      if (more && skyVisible) skyLoop();
    });
  }
  function pickStar(x, y) {
    var proj = canvas._proj || [], bestQ = null, bestD = 20;
    proj.forEach(function (q) { var d = Math.hypot(q.x - x, q.y - y); if (d < bestD) { bestD = d; bestQ = q; } });
    return bestQ;
  }
  function select(id) {
    sky.sel = id; draw();
    var el = $('sky-pick'), r = id && byName[id];
    if (!r) { el.innerHTML = ''; return; }
    var m = methodByName(r.method);
    el.innerHTML = '<div class="pick__row"><div class="pick__id"><p class="pick__name">' + esc(r.method) + (r.pareto ? FRONT_PILL : '') + '</p><p class="pick__meta">' + esc(familyLabel(r)) + (r.layer > 1 ? ' · front ' + r.layer : '') + '</p></div>' +
      PRIMARIES.map(function (k) {
        var rk = ranks[k][r.id];
        return '<dl><dt>' + M[k].html + ' ' + arrow(k) + '</dt><dd>' + fmt(r, k) + '<small>' + (rk ? ordinal(rk.rank) + '/' + rk.of : isRanked(r) ? '' : 'not ranked') + '</small></dd></dl>';
      }).join('') +
      '<div class="pick__act">' + (m ? '<button type="button" class="linkbtn" data-watch="' + esc(r.method) + '">Watch its output<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/></svg></button>' : '') + '</div></div>';
  }
  $('sky-pick').addEventListener('click', function (e) {
    var b = e.target.closest('[data-watch]'); if (!b) return;
    setMode('compare'); pickMethod(methodByName(b.getAttribute('data-watch')));
    $('compare').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  });
  function initSky() {
    canvas.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, yaw: cam.yaw, pitch: cam.pitch, moved: false, id: e.pointerId }; });
    canvas.addEventListener('pointermove', function (e) {
      var b = canvas.getBoundingClientRect();
      if (drag && drag.id === e.pointerId) {
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) > 4) {
          if (e.pointerType !== 'mouse' && Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // let touch scroll the page
          drag.moved = true; interacted = true; tween = null;
          try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
          canvas.classList.add('is-dragging');
          if (sky.view !== '3d') { sky.view = '3d'; cam.persp = VIEWS['3d'].persp; cam.zoom = 1; pressView('3d'); }
        }
        if (drag.moved) {
          cam.yaw = Math.max(-1.8, Math.min(1.8, drag.yaw + dx * 0.008));
          if (e.pointerType === 'mouse') cam.pitch = Math.max(-Math.PI / 2, Math.min(1.25, drag.pitch + dy * 0.008));
          draw(); return;
        }
      }
      var q = pickStar(e.clientX - b.left, e.clientY - b.top);
      if ((q && q.s) !== (hover && hover.s)) { hover = q; canvas.classList.toggle('is-hover', !!q); if (!rafId) draw(); }
    });
    function end(e) {
      if (!drag || drag.id !== e.pointerId) return;
      var wasDrag = drag.moved; drag = null; canvas.classList.remove('is-dragging');
      if (!wasDrag && e.type === 'pointerup') {
        var b = canvas.getBoundingClientRect(), q = pickStar(e.clientX - b.left, e.clientY - b.top);
        select(q ? (sky.sel === q.s.r.id ? null : q.s.r.id) : null);
      }
    }
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('pointerleave', function () { if (hover) { hover = null; canvas.classList.remove('is-hover'); if (!rafId) draw(); } });
    document.querySelectorAll('.views [data-view]').forEach(function (b) { b.addEventListener('click', function () { goTo(b.getAttribute('data-view')); }); });
    watch(canvas, function (v) { skyVisible = v; if (v) skyLoop(); });
    window.addEventListener('resize', function () { layoutSize(); draw(); });
  }

  function useRows(list) {
    prepare(list);
    renderMethods(); renderReadout();
    var front = rows.filter(function (r) { return r.layer === 1; }).map(function (r) { return r.method; });
    if (front.length > 1) $('front-names').textContent = front.slice(0, -1).join(', ') + ' and ' + front[front.length - 1];
    buildStars(); layoutSize(); readColors(); draw();
    $('sky-status').hidden = true;
    if (sky.sel) select(sky.sel);
  }

  renderAxes();
  initSky();
  useRows(FALLBACK);
  fetch(LB_DATA, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(function (t) {
      var list = t.split('\n').filter(function (l) { return l.trim(); }).map(function (l) { return JSON.parse(l); });
      if (list.length) useRows(list);
    })
    .catch(function () { /* keep the paper's numbers */ });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });

  // =====================================================================
  // Failure videos: load and play only while on screen
  // =====================================================================
  document.querySelectorAll('.fail__media video').forEach(function (v) {
    if (reduced()) { v.controls = true; }
    watch(v, function (vis) {
      if (vis) {
        if (!v.getAttribute('src')) { v.src = v.getAttribute('data-src'); v.preload = 'auto'; }
        if (!reduced()) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      } else if (!v.paused) v.pause();
    }, '120px 0px');
  });

  // =====================================================================
  // Theme, citation
  // =====================================================================
  $('theme-toggle').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('vtx-theme', next); } catch (e) {}
    readColors(); draw(); drawGrid();
  });
  $('copy-bib').addEventListener('click', function () {
    var btn = this, label = btn.querySelector('span'), txt = Array.prototype.map.call($('bib').querySelectorAll('.bl'), function (l) { return l.textContent; }).join('\n');
    function done(ok) { label.textContent = ok ? 'Copied' : 'Select and copy'; setTimeout(function () { label.textContent = 'Copy BibTeX'; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { done(true); }, function () { done(false); });
    else done(false);
  });
})();
