const CHECKED_SRC = 'public/check-checked.svg';
const UNCHECKED_SRC = 'public/check-unchecked.svg';

const card = document.getElementById('card');
const panel = document.getElementById('panel');

card.addEventListener('click', () => {
  panel.classList.toggle('panel--visible');
});

const tasks = document.querySelectorAll('.task');
const progressFill = document.querySelector('.panel-progress-fill');
const progressLabel = document.querySelector('.panel-progress-label');
const cardFill = document.querySelector('.progress-fill');
const cardThumb = document.querySelector('.progress-thumb');
const cardSubtitle = document.querySelector('.subtitle');
const TRACK_WIDTH = 168;

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#2883df', '#f5a623', '#7ed321', '#ff6b6b', '#bd10e0', '#50e3c2'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: Math.random() * 8 + 4,
    h: Math.random() * 14 + 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 4 + 2,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.2,
  }));

  const start = performance.now();

  function draw(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    const elapsed = now - start;
    if (elapsed < 2500) {
      requestAnimationFrame(draw);
    } else if (elapsed < 3000) {
      canvas.style.opacity = 1 - (elapsed - 2500) / 500;
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}

function updateProgress() {
  const completed = document.querySelectorAll('.task.task--completed').length;
  const percent = Math.round((completed / tasks.length) * 100);

  progressFill.style.width = percent + '%';
  progressLabel.textContent = percent + '% completed';

  const fillPx = (percent / 100) * TRACK_WIDTH;
  cardFill.style.width = fillPx + 'px';
  cardThumb.style.left = (fillPx - 8) + 'px';
  cardSubtitle.textContent = percent + '% completed';

  if (percent === 100) launchConfetti();
}

updateProgress();

document.querySelectorAll('.task').forEach((task) => {
  task.addEventListener('click', (e) => {
    e.stopPropagation();
    const label = task.querySelector('.task-label');
    const img = task.querySelector('.task-check');
    const isCompleted = task.classList.toggle('task--completed');
    label.classList.toggle('task-label--completed', isCompleted);
    img.src = isCompleted ? CHECKED_SRC : UNCHECKED_SRC;
    updateProgress();
  });
});
