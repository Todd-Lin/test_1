/**
 * Main Application Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;

  // 1. Theme Management
  initTheme();

  // 2. Cursor Glow Follower
  initCursorGlow();

  // 3. Audio UI Controls
  initAudioControls();

  // 4. Populate Dynamic Sections
  renderHero(data.profile);
  renderAbout(data.about);
  renderSkills(data.skillCategories);
  renderProjects(data.projects);
  renderExperience(data.experience);
  renderContact(data.profile);

  // 5. Typing Animation in Hero
  initTypewriter(data.profile.typingRoles);

  // 6. Navigation & Scroll Spy
  initNavigation();

  // 7. Scroll Reveal Animations
  initScrollReveal();

  // 8. Global Modal & Toast Setup
  initModal();
  initContactForm();
});

/* ===================================================
   1. THEME CONTROLLER
=================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio_theme') || 'indigo';
  setTheme(savedTheme);

  const dots = document.querySelectorAll('.theme-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.dataset.theme;
      setTheme(theme);
      window.soundFx?.playClick();
    });
  });
}

function setTheme(theme) {
  if (theme === 'indigo') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('portfolio_theme', theme);

  document.querySelectorAll('.theme-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.theme === theme);
  });
}

/* ===================================================
   2. CURSOR GLOW
=================================================== */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.innerWidth < 768) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

/* ===================================================
   3. AUDIO CONTROLS
=================================================== */
function initAudioControls() {
  const soundBtn = document.getElementById('sound-toggle');
  if (!soundBtn) return;

  const updateIcon = () => {
    const enabled = window.soundFx?.enabled;
    soundBtn.classList.toggle('muted', !enabled);
    soundBtn.innerHTML = enabled
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
  };

  updateIcon();

  soundBtn.addEventListener('click', () => {
    window.soundFx?.toggle();
    updateIcon();
  });

  // Attach hover/click sounds to interactive elements
  document.querySelectorAll('button, a, .project-card, .pillar-card').forEach(el => {
    el.addEventListener('mouseenter', () => window.soundFx?.playHover());
  });
}

/* ===================================================
   4. SECTION RENDERERS
=================================================== */
function renderHero(profile) {
  const nameEl = document.getElementById('hero-name');
  const bioEl = document.getElementById('hero-bio');
  const statusEl = document.getElementById('hero-status-text');
  const statsContainer = document.getElementById('hero-stats-container');
  const socialsContainer = document.getElementById('hero-socials-container');

  if (nameEl) nameEl.textContent = profile.name;
  if (bioEl) bioEl.textContent = profile.bio;
  if (statusEl) statusEl.textContent = profile.statusText;

  if (statsContainer) {
    statsContainer.innerHTML = profile.stats.map(s => `
      <div class="stat-item">
        <div class="stat-number gradient-text">${s.number}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  if (socialsContainer) {
    socialsContainer.innerHTML = profile.socials.map(soc => `
      <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="${soc.name}" title="${soc.name}">
        ${getSocialIcon(soc.icon)}
      </a>
    `).join('');
  }
}

function renderAbout(about) {
  const quoteEl = document.getElementById('about-quote');
  const pillarsContainer = document.getElementById('about-pillars');

  if (quoteEl) quoteEl.textContent = about.quote;

  if (pillarsContainer) {
    pillarsContainer.innerHTML = about.pillars.map(p => `
      <div class="pillar-card reveal">
        <div class="pillar-icon">${getPillarIcon(p.icon)}</div>
        <div class="pillar-info">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderSkills(categories) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = categories.map((cat, idx) => `
    <div class="skill-category-card reveal reveal-delay-${(idx % 4) + 1}">
      <div class="skill-category-header">
        <div class="category-icon">${getPillarIcon(cat.icon)}</div>
        <h3>${cat.title}</h3>
      </div>
      <div class="skill-pill-list">
        ${cat.skills.map(s => `<span class="skill-pill"><span class="logo-dot"></span>${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  const filterContainer = document.getElementById('project-filters');
  if (!grid) return;

  const renderCards = (items) => {
    grid.innerHTML = items.map((proj, idx) => `
      <div class="project-card reveal reveal-delay-${(idx % 3) + 1}" data-id="${proj.id}">
        <div class="project-preview">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" />
          <span class="project-badge-tag">${proj.badge}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.shortDesc}</p>
          <div class="project-tags">
            ${proj.tags.slice(0, 4).map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <span class="project-link-btn" onclick="openProjectModal('${proj.id}')">
              View Details &rarr;
            </span>
            <div class="project-links">
              <a href="${proj.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="View Source" onclick="event.stopPropagation();">
                ${getSocialIcon('github')}
              </a>
              <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="Live Demo" onclick="event.stopPropagation();">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach 3D Tilt
    if (window.VanillaTilt && window.innerWidth > 992) {
      window.VanillaTilt.init(document.querySelectorAll('.project-card'));
    }

    // Attach click for modal
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        openProjectModal(card.dataset.id);
      });
    });
  };

  renderCards(projects);

  if (filterContainer) {
    const buttons = filterContainer.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.soundFx?.playClick();

        const filter = btn.dataset.filter;
        if (filter === 'all') {
          renderCards(projects);
        } else {
          const filtered = projects.filter(p => p.category === filter);
          renderCards(filtered);
        }
        initScrollReveal();
      });
    });
  }
}

function renderExperience(experiences) {
  const container = document.getElementById('timeline-list');
  if (!container) return;

  container.innerHTML = experiences.map((exp, idx) => `
    <div class="timeline-item reveal reveal-delay-${(idx % 3) + 1}">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <h3 class="timeline-role">${exp.role}</h3>
          <span class="timeline-period">${exp.period}</span>
        </div>
        <div class="timeline-company">${exp.company}</div>
        <p class="timeline-desc">${exp.description}</p>
        <div class="timeline-techs">
          ${exp.techs.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderContact(profile) {
  const emailEl = document.getElementById('contact-email-val');
  const locationEl = document.getElementById('contact-location-val');
  const copyBtn = document.getElementById('copy-email-btn');

  if (emailEl) emailEl.textContent = profile.email;
  if (locationEl) locationEl.textContent = profile.location;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(profile.email).then(() => {
        showToast('Email copied to clipboard!', 'success');
        window.soundFx?.playSuccess();
      }).catch(() => {
        showToast('Failed to copy email', 'error');
      });
    });
  }
}

/* ===================================================
   5. TYPEWRITER EFFECT
=================================================== */
function initTypewriter(roles) {
  const roleEl = document.getElementById('hero-role-text');
  if (!roleEl || !roles || roles.length === 0) return;

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 40;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      roleEl.textContent = currentRole.substring(0, charIdx);
    } else {
      charIdx++;
      roleEl.textContent = currentRole.substring(0, charIdx);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===================================================
   6. NAVIGATION & SCROLL SPY
=================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll class on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      window.soundFx?.playClick();
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ===================================================
   7. SCROLL REVEAL (IntersectionObserver)
=================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.active)');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(r => r.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===================================================
   8. PROJECT DETAIL MODAL
=================================================== */
function initModal() {
  const backdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => closeModal());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
}

function openProjectModal(id) {
  const project = window.PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  const backdrop = document.getElementById('project-modal');
  const body = document.getElementById('modal-content-body');

  body.innerHTML = `
    <div class="modal-banner">
      <img src="${project.image}" alt="${project.title}" />
    </div>
    <div class="modal-body">
      <span class="modal-category-badge">// ${project.categoryLabel}</span>
      <h2 class="modal-title">${project.title}</h2>
      <p class="project-desc">${project.longDesc}</p>
      
      <h4 style="margin-top: 1.5rem; font-size: 1.1rem;">Key Highlights & Architecture</h4>
      <ul class="modal-features-list">
        ${project.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <div class="project-tags" style="margin-top: 1.5rem;">
        ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 2rem;">
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Live Preview
        </a>
        <a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          ${getSocialIcon('github')}
          View Source
        </a>
      </div>
    </div>
  `;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  window.soundFx?.playClick();
}

function closeModal() {
  const backdrop = document.getElementById('project-modal');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ===================================================
   9. CONTACT FORM & TOAST NOTIFICATION
=================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#form-name').value;
    const email = form.querySelector('#form-email').value;
    const message = form.querySelector('#form-message').value;

    if (!name || !email || !message) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    showToast(`Thanks ${name}! Your message has been sent.`, 'success');
    window.soundFx?.playSuccess();
    form.reset();
  });
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ===================================================
   10. SVG ICONS HELPER
=================================================== */
function getSocialIcon(name) {
  switch (name) {
    case 'github':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
    case 'linkedin':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
    case 'twitter':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`;
    case 'mail':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
    default:
      return '';
  }
}

function getPillarIcon(name) {
  switch (name) {
    case 'zap':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
    case 'layout':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`;
    case 'cpu':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`;
    case 'database':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
    case 'cloud':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;
    case 'tool':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
    default:
      return '';
  }
}

window.openProjectModal = openProjectModal;
