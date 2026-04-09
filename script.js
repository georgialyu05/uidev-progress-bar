const CHECKED_SRC = 'https://www.figma.com/api/mcp/asset/3aeb7ab8-b899-4e6e-ba46-a0827d618bfc';
const UNCHECKED_SRC = 'https://www.figma.com/api/mcp/asset/1c39b5b7-3a47-4e18-a9cc-feaedab19480';

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

function updateProgress() {
  const completed = document.querySelectorAll('.task.task--completed').length;
  const percent = Math.round((completed / tasks.length) * 100);

  progressFill.style.width = percent + '%';
  progressLabel.textContent = percent + '% completed';

  const fillPx = (percent / 100) * TRACK_WIDTH;
  cardFill.style.width = fillPx + 'px';
  cardThumb.style.left = (fillPx - 8) + 'px';
  cardSubtitle.textContent = percent + '% completed';
}

updateProgress();

document.querySelectorAll('.task-check').forEach((img) => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    const task = img.closest('.task');
    const label = task.querySelector('.task-label');
    const isCompleted = task.classList.toggle('task--completed');
    label.classList.toggle('task-label--completed', isCompleted);
    img.src = isCompleted ? CHECKED_SRC : UNCHECKED_SRC;
    updateProgress();
  });
});
