// ════════════════════════════════════════════════════════
//  DropQuiz — Game Engine
// ════════════════════════════════════════════════════════

// ── State ──────────────────────────────────────────────
let currentTopic = null;
let questions = [];
let qIdx = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;
let lives = 3;
let correct = 0;
let answered = false;
let gameOn = false;
let paused = false;
let drops = [];
let animId = null;
let timerInterval = null;
const TIMER_MS = 9000;
const DROP_SPEED = 1.05;
const FONT_SIZE = 22;
const PAD_X = 18;
const PAD_Y = 13;
const STARS = [];

// ── Canvas refs ─────────────────────────────────────────
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
const gameCanvas = document.getElementById('game-canvas');
const ctx = gameCanvas.getContext('2d');

// ── Boot ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildTopicGrid();
  initBgCanvas();
  animateBg();
});

window.addEventListener('resize', () => {
  initBgCanvas();
  if (gameOn) resizeGameCanvas();
});

// ════════════════════════════════════════════════════════
//  HOME SCREEN
// ════════════════════════════════════════════════════════

function buildTopicGrid() {
  const grid = document.getElementById('topic-grid');
  TOPICS.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.style.borderColor = topic.color + '44';
    card.style.setProperty('--hover-color', topic.color + '18');
    card.innerHTML = `
      <style>.topic-card:hover { border-color: ${topic.color}88 !important; box-shadow: 0 0 0 1px ${topic.color}22; }</style>
      <span class="tc-icon">${topic.icon}</span>
      <div class="tc-label" style="color:${topic.color}">${topic.label}</div>
      <div class="tc-desc">${topic.description}</div>
      <span class="tc-count" style="background:${topic.colorLight};color:${topic.color}">${topic.questions.length} questions</span>
    `;
    card.addEventListener('click', () => launchTopic(topic));
    grid.appendChild(card);
  });
}

// ─── Background particle animation ──────────────────────
function initBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  STARS.length = 0;
  for (let i = 0; i < 80; i++) {
    STARS.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      r: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.6 + 0.1
    });
  }
}

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  STARS.forEach(s => {
    s.y += s.speed;
    if (s.y > bgCanvas.height) { s.y = 0; s.x = Math.random() * bgCanvas.width; }
    bgCtx.beginPath();
    bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(180,160,255,${s.opacity})`;
    bgCtx.fill();
  });
  requestAnimationFrame(animateBg);
}

// ════════════════════════════════════════════════════════
//  GAME LAUNCH
// ════════════════════════════════════════════════════════

function launchTopic(topic) {
  currentTopic = topic;
  questions = shuffleArray(topic.questions).slice(0, 10);
  qIdx = 0; score = 0; streak = 0; bestStreak = 0; lives = 3; correct = 0;

  document.getElementById('screen-home').classList.remove('active');
  document.getElementById('screen-game').classList.add('active');
  document.getElementById('game-topic-label').textContent = topic.icon + ' ' + topic.label;
  document.getElementById('result-overlay').style.display = 'none';
  document.getElementById('pause-overlay').style.display = 'none';

  updateUI();
  resizeGameCanvas();
  gameOn = true; paused = false;
  loadQuestion();
  gameLoop();
}

function goHome() {
  gameOn = false; paused = false;
  cancelAnimationFrame(animId);
  clearInterval(timerInterval);
  document.getElementById('screen-game').classList.remove('active');
  document.getElementById('screen-home').classList.add('active');
}

function restartGame() { launchTopic(currentTopic); }

function resumeGame() {
  paused = false;
  document.getElementById('pause-overlay').style.display = 'none';
  loadQuestion();
  gameLoop();
}

// ════════════════════════════════════════════════════════
//  CANVAS SETUP
// ════════════════════════════════════════════════════════

function resizeGameCanvas() {
  const wrap = document.querySelector('.arena-wrap');
  gameCanvas.width = wrap.clientWidth;
  gameCanvas.height = wrap.clientHeight;
}

// ════════════════════════════════════════════════════════
//  QUESTION LOGIC
// ════════════════════════════════════════════════════════

function loadQuestion() {
  if (qIdx >= questions.length || lives <= 0) { endGame(); return; }
  const q = questions[qIdx];
  answered = false;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-meta').textContent = `Q ${qIdx + 1} of ${questions.length}`;
  document.getElementById('progress-fill').style.width = (qIdx / questions.length * 100) + '%';
  drops = makeDrops(q);
  startTimer();
}

function makeDrops(q) {
  resizeGameCanvas();
  const opts = shuffleArray(q.options);
  const cols = Math.min(opts.length, 2);
  const colW = gameCanvas.width / cols;

  return opts.map((text, i) => {
    ctx.font = `500 ${FONT_SIZE}px 'Space Grotesk', system-ui`;
    const tw = ctx.measureText(text).width;
    const w = tw + PAD_X * 2;
    const h = FONT_SIZE + PAD_Y * 2;
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * colW + (colW - w) / 2;
    const y = -(row * (h + 30)) - h - 40;
    return {
      x, y, w, h, text,
      speed: DROP_SPEED + Math.random() * 0.4,
      correct: text === q.correct,
      state: 'falling',
      pulse: 0
    };
  });
}

// ════════════════════════════════════════════════════════
//  TIMER
// ════════════════════════════════════════════════════════

function startTimer() {
  clearInterval(timerInterval);
  const fill = document.getElementById('timer-fill');
  fill.style.width = '100%';
  const start = Date.now();
  timerInterval = setInterval(() => {
    if (!gameOn || paused) return;
    const pct = Math.max(0, 100 - (Date.now() - start) / TIMER_MS * 100);
    fill.style.width = pct + '%';
    fill.style.background = pct > 50 ? currentTopic.color : pct > 25 ? '#EF9F27' : '#E24B4A';
    if (pct <= 0) { clearInterval(timerInterval); if (!answered) onTimeout(); }
  }, 80);
}

function onTimeout() {
  answered = true; streak = 0; lives--;
  drops.forEach(d => { if (d.correct) d.state = 'reveal'; });
  showFeedback('⏱ Time!', '#EF9F27');
  updateUI();
  setTimeout(nextQ, 1100);
}

function nextQ() {
  if (!gameOn) return;
  qIdx++;
  if (qIdx >= questions.length || lives <= 0) { endGame(); return; }
  loadQuestion();
}

// ════════════════════════════════════════════════════════
//  CLICK HANDLER
// ════════════════════════════════════════════════════════

function handleCanvasClick(e) {
  if (!gameOn || answered || paused) return;
  const rect = gameCanvas.getBoundingClientRect();
  const scaleX = gameCanvas.width / rect.width;
  const scaleY = gameCanvas.height / rect.height;
  const mx = (e.clientX - rect.left) * scaleX;
  const my = (e.clientY - rect.top) * scaleY;
  for (const d of drops) {
    if (mx >= d.x && mx <= d.x + d.w && my >= d.y && my <= d.y + d.h) {
      onAnswer(d); break;
    }
  }
}

gameCanvas.addEventListener('click', handleCanvasClick);
gameCanvas.addEventListener('touchstart', e => {
  e.preventDefault();
  const t = e.touches[0];
  handleCanvasClick({ clientX: t.clientX, clientY: t.clientY });
}, { passive: false });

function onAnswer(d) {
  answered = true;
  clearInterval(timerInterval);
  if (d.correct) {
    d.state = 'correct'; d.pulse = 1;
    const bonus = Math.min(streak * 3, 30);
    score += 10 + bonus;
    streak++; correct++;
    if (streak > bestStreak) bestStreak = streak;
    const msg = streak >= 5 ? '🔥 On fire! +' + (10 + bonus)
               : streak >= 3 ? '⚡ Streak! +' + (10 + bonus)
               : '✓ Correct! +' + (10 + bonus);
    showFeedback(msg, '#1D9E75');
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: streak >= 3 ? 90 : 50,
        spread: 55,
        origin: { x: 0.5, y: 0.55 },
        colors: [currentTopic.color, '#e0aaff', '#fff', '#1D9E75'],
        scalar: 0.85
      });
    }
  } else {
    d.state = 'wrong';
    lives--; streak = 0;
    drops.forEach(dd => { if (dd.correct) dd.state = 'reveal'; });
    showFeedback('✗ Wrong!', '#E24B4A');
  }
  updateUI();
  setTimeout(nextQ, 1100);
}

// ════════════════════════════════════════════════════════
//  RENDER LOOP
// ════════════════════════════════════════════════════════

function gameLoop() {
  cancelAnimationFrame(animId);
  function frame() {
    if (!gameOn || paused) return;
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawArenaBackground();
    drops.forEach(d => {
      if (d.state === 'falling') d.y += d.speed;
      if (d.pulse > 0) d.pulse -= 0.08;
      drawPill(d);
    });
    animId = requestAnimationFrame(frame);
  }
  frame();
}

function drawArenaBackground() {
  ctx.fillStyle = '#0b0b18';
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  // subtle grid
  ctx.strokeStyle = 'rgba(127,119,221,0.05)';
  ctx.lineWidth = 1;
  const gSize = 60;
  for (let x = 0; x < gameCanvas.width; x += gSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, gameCanvas.height); ctx.stroke();
  }
  for (let y = 0; y < gameCanvas.height; y += gSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(gameCanvas.width, y); ctx.stroke();
  }
}

function drawPill(d) {
  const r = 12;
  let bg, border, textColor, glow;
  if (d.state === 'correct') {
    bg = '#1D9E75'; border = '#0F6E56'; textColor = '#fff'; glow = '#1D9E75';
  } else if (d.state === 'wrong') {
    bg = '#E24B4A'; border = '#A32D2D'; textColor = '#fff'; glow = '#E24B4A';
  } else if (d.state === 'reveal') {
    bg = currentTopic.color; border = currentTopic.color; textColor = '#fff'; glow = currentTopic.color;
  } else {
    bg = 'rgba(127,119,221,0.12)';
    border = 'rgba(127,119,221,0.45)';
    textColor = '#e0aaff'; glow = null;
  }

  if (glow) {
    ctx.shadowColor = glow;
    ctx.shadowBlur = 16 + d.pulse * 20;
  }

  // pill shape
  ctx.beginPath();
  ctx.moveTo(d.x + r, d.y);
  ctx.lineTo(d.x + d.w - r, d.y);
  ctx.quadraticCurveTo(d.x + d.w, d.y, d.x + d.w, d.y + r);
  ctx.lineTo(d.x + d.w, d.y + d.h - r);
  ctx.quadraticCurveTo(d.x + d.w, d.y + d.h, d.x + d.w - r, d.y + d.h);
  ctx.lineTo(d.x + r, d.y + d.h);
  ctx.quadraticCurveTo(d.x, d.y + d.h, d.x, d.y + d.h - r);
  ctx.lineTo(d.x, d.y + r);
  ctx.quadraticCurveTo(d.x, d.y, d.x + r, d.y);
  ctx.closePath();

  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = d.state !== 'falling' ? 2 : 1;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = textColor;
  ctx.font = `500 ${FONT_SIZE}px 'Space Grotesk', system-ui`;
  ctx.textBaseline = 'middle';
  ctx.fillText(d.text, d.x + PAD_X, d.y + d.h / 2);
}

// ════════════════════════════════════════════════════════
//  FEEDBACK
// ════════════════════════════════════════════════════════

let feedbackTimeout = null;
function showFeedback(msg, color) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.style.color = color;
  el.style.textShadow = `0 0 24px ${color}`;
  el.style.opacity = 1;
  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => {
    el.style.opacity = 0;
    el.style.textShadow = 'none';
  }, 750);
}

// ════════════════════════════════════════════════════════
//  UI UPDATES
// ════════════════════════════════════════════════════════

function updateUI() {
  document.getElementById('stat-score').textContent = score;
  document.getElementById('stat-streak').textContent = streak > 0 ? 'x' + streak : '0';
  for (let i = 1; i <= 3; i++) {
    const h = document.getElementById('h' + i);
    h.className = i <= lives ? 'heart' : 'heart dead';
  }
}

// ════════════════════════════════════════════════════════
//  END GAME
// ════════════════════════════════════════════════════════

function endGame() {
  gameOn = false;
  cancelAnimationFrame(animId);
  clearInterval(timerInterval);

  const won = lives > 0 && qIdx >= questions.length;
  const pct = Math.round((correct / questions.length) * 100);

  if (won && typeof confetti !== 'undefined') {
    confetti({ particleCount: 200, spread: 90, origin: { x: 0.5, y: 0.4 },
      colors: [currentTopic.color, '#e0aaff', '#1D9E75', '#fff'] });
  }

  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '📚' : '💪';
  const title = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Well done!' : pct >= 40 ? 'Keep going!' : 'Practice more!';

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-score').textContent = score;
  document.getElementById('result-stats').innerHTML = `
    <div>Correct &nbsp;<span>${correct} / ${questions.length}</span></div>
    <div>Accuracy &nbsp;<span>${pct}%</span></div>
    <div>Best streak &nbsp;<span>${bestStreak}</span></div>
    <div>Lives left &nbsp;<span>${lives}</span></div>
  `;

  const overlay = document.getElementById('result-overlay');
  overlay.style.display = 'flex';
}

// ════════════════════════════════════════════════════════
//  UTILS
// ════════════════════════════════════════════════════════

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
