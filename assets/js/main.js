// Mobile nav toggle and small enhancements
(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme toggle with localStorage
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') root.classList.add('light');
  if (themeToggle) {
    const applyIcon = () => {
      if (!themeToggle) return;
      themeToggle.textContent = root.classList.contains('light') ? '☀️' : '🌙';
    };
    applyIcon();
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('light');
      const isLight = root.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      applyIcon();
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          obs.unobserve(e.target);
        }
      })
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('show'));
  }
})();
