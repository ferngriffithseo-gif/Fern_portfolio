(() => {
  if (document.documentElement.dataset.portfolioReady) return;
  document.documentElement.dataset.portfolioReady = 'true';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('[data-motion-toggle]');
  let paused = reducedMotion.matches;

  function updateMotion() {
    document.documentElement.dataset.motionPaused = String(paused);
    motionButton?.setAttribute('aria-pressed', String(paused));
    if (motionButton) motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
  }
  motionButton?.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reducedMotion.addEventListener('change', event => { paused = event.matches; updateMotion(); });
  updateMotion();

  document.querySelectorAll('[data-work-gallery]').forEach(gallery => {
    const showProject = id => {
      gallery.querySelectorAll('[data-work-image]').forEach(image => {
        image.dataset.active = String(image.dataset.workImage === id);
      });
    };
    gallery.querySelectorAll('[data-project]').forEach(button => {
      button.addEventListener('pointerenter', () => showProject(button.dataset.project));
      button.addEventListener('focus', () => showProject(button.dataset.project));
    });
  });

  document.querySelectorAll('[data-open-dialog]').forEach(button => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.openDialog);
      if (!dialog || dialog.open) return;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    const close = () => dialog.close();
    dialog.querySelector('[data-close-dialog]')?.addEventListener('click', close);
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      dialog.querySelectorAll('video').forEach(video => video.pause());
    });
  });

  const spotlight = document.querySelector('[data-spotlight]');
  const titles = [...document.querySelectorAll('[data-service-title]')].map(heading => heading.textContent);
  let spotlightVisible = false;
  let spotlightIndex = 0;
  if (spotlight && titles.length) {
    const visibility = new IntersectionObserver(entries => {
      spotlightVisible = entries[0].isIntersecting;
    });
    visibility.observe(spotlight);
    window.setInterval(() => {
      if (paused || reducedMotion.matches || !spotlightVisible || document.hidden) return;
      spotlightIndex = (spotlightIndex + 1) % titles.length;
      const title = spotlight.querySelector('[data-spotlight-title]');
      const number = spotlight.querySelector('[data-spotlight-number]');
      title.textContent = titles[spotlightIndex];
      number.textContent = String(spotlightIndex + 1).padStart(2, '0');
      [title, number].forEach(element => element.animate(
        [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 450, easing: 'ease-out' }
      ));
    }, 5000);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.dataset.visible = 'true';
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    element.dataset.revealReady = 'true';
    observer.observe(element);
  });
})();

