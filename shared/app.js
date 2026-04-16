// Capstone Package — Shared Behaviors

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// Active nav (only when nav exists)
const sects = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav a');
if (navAs.length > 0) {
  window.addEventListener('scroll', () => {
    let cur = '';
    sects.forEach(s => { if (window.scrollY >= s.offsetTop - 160) cur = s.id; });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });
}

// Quiz selection
document.querySelectorAll('.quiz-q .choice').forEach(c => {
  c.addEventListener('click', function() {
    this.closest('.quiz-q').querySelectorAll('.choice').forEach(x => x.classList.remove('selected','correct','wrong'));
    this.classList.add('selected');
  });
});

function checkQuiz() {
  let score = 0;
  const qs = document.querySelectorAll('.quiz-q');
  qs.forEach(q => {
    const correct = parseInt(q.dataset.correct);
    const sel = q.querySelector('.choice.selected');
    q.querySelectorAll('.choice').forEach(c => c.classList.remove('correct','wrong'));
    if (sel) {
      const idx = parseInt(sel.dataset.idx);
      if (idx === correct) { sel.classList.add('correct'); score++; }
      else { sel.classList.add('wrong'); q.querySelectorAll('.choice')[correct].classList.add('correct'); }
    } else {
      q.querySelectorAll('.choice')[correct].classList.add('correct');
    }
    q.querySelector('.answer-reveal').classList.add('show');
  });
  const b = document.getElementById('scoreBanner');
  if (b) {
    b.innerHTML = `<div class="score-num">${score}/${qs.length}</div><div class="score-label">${Math.round(score/qs.length*100)}% Correct</div>`;
    b.classList.add('show');
    b.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function resetQuiz() {
  document.querySelectorAll('.quiz-q .choice').forEach(c => c.classList.remove('selected','correct','wrong'));
  document.querySelectorAll('.answer-reveal').forEach(a => a.classList.remove('show'));
  const b = document.getElementById('scoreBanner');
  if (b) b.classList.remove('show');
}

// Forms — defensive bindings
const evalForm = document.getElementById('evalForm');
if (evalForm) {
  evalForm.addEventListener('submit', e => {
    e.preventDefault();
    const s = document.getElementById('evalSuccess');
    if (s) {
      s.style.display = 'block';
      setTimeout(() => s.style.display = 'none', 4000);
    }
  });
}

const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const s = document.getElementById('feedbackSuccess');
    if (s) {
      s.style.display = 'block';
      e.target.reset();
      setTimeout(() => s.style.display = 'none', 4000);
    }
  });
}
