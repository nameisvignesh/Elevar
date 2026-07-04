const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('[data-route]'));
const cursor = document.getElementById('cursor');
const themeToggle = document.getElementById('themeToggle');
const installButton = document.getElementById('installButton');
const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const customBundleBtn = document.getElementById('customBundleBtn');
const bookingForm = document.getElementById('bookingForm');
const confirmation = document.getElementById('confirmation');
const queuePill = document.getElementById('queuePill');
const dayRow = document.getElementById('dayRow');
const slotGrid = document.getElementById('slotGrid');
const videoButtons = document.querySelectorAll('.video-toggle');

let currentPage = 'home';
let currentTheme = localStorage.getItem('elevar-theme') || 'system';
let currentDay = 0;
let currentSlot = '';
let deferredPrompt = null;
let queueCount = 3;

function setTheme(theme) {
  const resolvedTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  document.documentElement.dataset.theme = resolvedTheme;
  themeToggle.textContent = resolvedTheme === 'dark' ? '☾' : '☀';
  localStorage.setItem('elevar-theme', theme);
}

function navigateTo(page) {
  currentPage = page;
  pages.forEach((pageEl) => {
    pageEl.classList.toggle('is-active', pageEl.dataset.page === page);
  });
  history.pushState({ page }, '', `#${page}`);
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('is-visible');
      }
    });
  });
}

function attachReveal() {
  const revealItems = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealItems.forEach((item) => io.observe(item));
}

function updateCursor(event) {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
}

function updateCursorMode(target) {
  const modes = {
    'a': 'circle',
    '.btn': 'circle',
    '.video-toggle': 'square',
    '.day-chip': 'triangle',
    '.slot-btn': 'triangle',
    '.icon-btn': 'circle'
  };
  let mode = 'circle';
  if (target?.closest('.video-toggle')) mode = 'square';
  if (target?.closest('.day-chip') || target?.closest('.slot-btn')) mode = 'triangle';
  if (target?.closest('a, button, .btn, .icon-btn')) mode = 'circle';
  cursor.classList.remove('cursor--circle', 'cursor--square', 'cursor--triangle');
  cursor.classList.add(`cursor--${mode}`);
}

function buildCalendar() {
  const days = ['Today', 'Tomorrow', 'Next day'];
  const slots = ['06:30', '07:15', '08:00', '17:30', '18:15', '19:00'];
  dayRow.innerHTML = '';
  slotGrid.innerHTML = '';

  days.forEach((day, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `day-chip${index === currentDay ? ' is-selected' : ''}`;
    btn.textContent = day;
    btn.addEventListener('click', () => {
      currentDay = index;
      buildCalendar();
    });
    dayRow.appendChild(btn);
  });

  slots.forEach((slot, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `slot-btn${currentSlot === slot ? ' is-selected' : ''}`;
    button.textContent = slot;
    button.addEventListener('click', () => {
      currentSlot = slot;
      buildCalendar();
    });
    slotGrid.appendChild(button);
  });
}

function toggleVideo(button) {
  const targetId = button.getAttribute('data-video-target');
  const video = document.getElementById(targetId);
  const muted = video.muted;
  video.muted = !muted;
  button.textContent = video.muted ? 'Unmute' : 'Mute';
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get('name') || 'A founder';
  const timeText = currentSlot ? ` at ${currentSlot}` : ' soon';
  queueCount += 1;
  queuePill.textContent = `Queue: ${queueCount}`;
  confirmation.innerHTML = `Thanks, ${name}! Your call request has been queued and we’ll reach out within the next business day${timeText}.`;
  bookingForm.reset();
  currentSlot = '';
  buildCalendar();
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '');
  const route = hash || 'home';
  navigateTo(route);
}

window.addEventListener('popstate', handleRoute);
window.addEventListener('load', () => {
  setTheme(currentTheme);
  attachReveal();
  buildCalendar();
  handleRoute();
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
});

window.addEventListener('mousemove', updateCursor);
window.addEventListener('mousedown', () => cursor.classList.add('is-active'));
window.addEventListener('mouseup', () => cursor.classList.remove('is-active'));

window.addEventListener('mouseover', (event) => updateCursorMode(event.target));
window.addEventListener('mouseout', () => updateCursorMode(null));

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const route = link.getAttribute('data-route');
    if (route) {
      event.preventDefault();
      navigateTo(route);
    }
  });
});

themeToggle.addEventListener('click', () => {
  const nextTheme = currentTheme === 'dark' ? 'light' : currentTheme === 'light' ? 'system' : 'dark';
  currentTheme = nextTheme;
  setTheme(currentTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentTheme === 'system') setTheme('system');
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'inline-flex';
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  if (result.outcome === 'accepted') {
    installButton.textContent = '✓';
  }
});

chatToggle.addEventListener('click', () => chatPanel.classList.toggle('is-open'));
chatClose.addEventListener('click', () => chatPanel.classList.remove('is-open'));

customBundleBtn.addEventListener('click', () => {
  localStorage.setItem('elevar-needs-booking', 'true');
  navigateTo('book-call');
});

bookingForm.addEventListener('submit', handleBookingSubmit);
videoButtons.forEach((button) => button.addEventListener('click', () => toggleVideo(button)));
