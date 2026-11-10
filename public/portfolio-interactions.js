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

  const contactForm = document.querySelector('[data-contact-form]');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(contactForm);
    const topics = values.getAll('topic');
    const subject = 'Portfolio enquiry';
    const body = [
      'Name: ' + values.get('name'),
      'Email: ' + values.get('email'),
      ...(topics.length ? ['Interested in: ' + topics.join(', ')] : []),
      '',
      String(values.get('details')),
    ].join('\n');
    window.location.href = 'mailto:' + contactForm.dataset.recipient
      + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  const playground = document.querySelector('[data-contact-playground]');
  if (playground) {
    const pieces = [...playground.querySelectorAll('.contact-piece')].map(element => ({
      element, x: 0, y: 0, width: 0, height: 0, vx: 0, vy: 0,
    }));
    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
    const dropPositions = [.2, .53, .04, .71, .37, .95];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let settleAt = 0;
    let drag = null;
    let suppressClick = false;
    let visible = false;

    function paint(piece) {
      piece.element.style.transform = 'translate3d(' + piece.x + 'px,' + piece.y + 'px,0)';
    }

    function contain(piece) {
      const right = width - piece.width - 6;
      const floor = height - piece.height - 6;
      if (piece.x < 6 || piece.x > right) {
        piece.x = clamp(piece.x, 6, right);
        piece.vx *= -.45;
      }
      if (piece.y > floor) {
        piece.y = floor;
        piece.vy = piece.vy > 75 ? piece.vy * -.28 : 0;
        piece.vx *= .82;
      }
    }

    function collide(first, second) {
      const x = first.x + first.width / 2 - second.x - second.width / 2;
      const y = first.y + first.height / 2 - second.y - second.height / 2;
      const overlapX = (first.width + second.width) / 2 + 4 - Math.abs(x);
      const overlapY = (first.height + second.height) / 2 + 4 - Math.abs(y);
      if (overlapX <= 0 || overlapY <= 0) return;
      const axis = overlapX < overlapY ? 'x' : 'y';
      const velocity = axis === 'x' ? 'vx' : 'vy';
      const direction = Math.sign(axis === 'x' ? x : y) || 1;
      const overlap = axis === 'x' ? overlapX : overlapY;
      const firstWeight = drag?.piece === first && drag.moved ? 0 : 1;
      const secondWeight = drag?.piece === second && drag.moved ? 0 : 1;
      const weight = firstWeight + secondWeight;
      first[axis] += direction * overlap * firstWeight / weight;
      second[axis] -= direction * overlap * secondWeight / weight;
      const closing = direction * (first[velocity] - second[velocity]);
      if (closing < 0) {
        const impulse = -closing * .93 * direction / weight;
        first[velocity] += impulse * firstWeight;
        second[velocity] -= impulse * secondWeight;
      }
    }

    function tick(time) {
      frame = 0;
      const step = Math.min((time - previousTime) / 1000, .032) / 3;
      previousTime = time;
      for (let substep = 0; substep < 3; substep++) {
        for (const piece of pieces) {
          if (drag?.piece === piece && drag.moved) continue;
          piece.vy += 1550 * step;
          piece.x += piece.vx * step;
          piece.y += piece.vy * step;
        }
        for (let i = 0; i < pieces.length; i++) {
          for (let j = i + 1; j < pieces.length; j++) collide(pieces[i], pieces[j]);
          contain(pieces[i]);
        }
      }
      pieces.forEach(paint);
      if (time < settleAt || drag?.moved) frame = requestAnimationFrame(tick);
    }

    function wake() {
      settleAt = performance.now() + 2400;
      if (!frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

    function startDrop() {
      if (!visible || paused || playground.hasAttribute('data-active')) return;
      playground.dataset.active = '';
      width = playground.clientWidth;
      height = playground.clientHeight;
      pieces.forEach((piece, index) => {
        piece.width = piece.element.offsetWidth;
        piece.height = piece.element.offsetHeight;
        piece.x = 6 + (width - piece.width - 12) * dropPositions[index];
        piece.y = 4 - index * 41;
        piece.vx = (index % 2 ? -1 : 1) * 40;
        piece.vy = 0;
        paint(piece);
      });
      wake();
    }

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (drag) delete drag.piece.element.dataset.dragging;
      drag = null;
      delete playground.dataset.active;
      pieces.forEach(piece => { piece.element.style.transform = ''; });
    }

    for (const piece of pieces) {
      const button = piece.element;
      button.addEventListener('pointerdown', event => {
        if (drag || event.button !== 0 || paused || !playground.hasAttribute('data-active')) return;
        suppressClick = false;
        drag = { piece, id: event.pointerId, x: event.clientX, y: event.clientY, startX: piece.x, startY: piece.y, moved: false };
        button.setPointerCapture(event.pointerId);
      });
      button.addEventListener('pointermove', event => {
        if (drag?.id !== event.pointerId || drag.piece !== piece) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 7) return;
        drag.moved = true;
        button.dataset.dragging = '';
        const x = clamp(drag.startX + dx, 6, width - piece.width - 6);
        const y = clamp(drag.startY + dy, 6, height - piece.height - 6);
        piece.vx = clamp((x - piece.x) * 35, -650, 650);
        piece.vy = clamp((y - piece.y) * 35, -650, 650);
        piece.x = x;
        piece.y = y;
        paint(piece);
        wake();
      });
      const endDrag = event => {
        if (drag?.id !== event.pointerId || drag.piece !== piece) return;
        if (drag.moved) {
          suppressClick = true;
          delete button.dataset.dragging;
          piece.vx *= .32;
          piece.vy *= .32;
          wake();
        }
        drag = null;
      };
      button.addEventListener('pointerup', endDrag);
      button.addEventListener('pointercancel', endDrag);
      button.addEventListener('lostpointercapture', endDrag);
      button.addEventListener('keydown', () => { suppressClick = false; });
      button.addEventListener('click', event => {
        if (!suppressClick) return;
        event.stopImmediatePropagation();
        suppressClick = null;
      }, { capture: true });
    }

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      document.documentElement.toggleAttribute('data-contact-visible', visible);
      startDrop();
    }, { threshold: .15 }).observe(playground);
    new ResizeObserver(() => {
      if (!playground.hasAttribute('data-active') || playground.clientWidth === width) return;
      reset();
      startDrop();
    }).observe(playground);
    new MutationObserver(() => {
      if (paused) reset();
      else startDrop();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion-paused'] });
  }

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

