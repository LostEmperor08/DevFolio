import { getSiteData, saveSiteData } from './data.js';

let siteData = getSiteData();
let soundEnabled = true;
let audioCtx = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initBackgroundCanvas();
  initRouter();
  initScrollProgress();
  initCommandPalette();
  initAuraAI();
  initAudioFX();
  renderAllViews();
  initEventListeners();
});

/* ==========================================================================
   1. AudioFX Engine (Web Audio API Synthesizer)
   ========================================================================== */
function initAudioFX() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) {
        soundIcon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      }
      showToast(soundEnabled ? 'Sci-Fi Sound FX Enabled 🔊' : 'Sound Muted 🔇');
      if (soundEnabled) playSynthSound(880, 'sine', 0.1);
    });
  }
}

function playSynthSound(freq = 440, type = 'sine', duration = 0.08) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Silent fallback
  }
}

/* ==========================================================================
   2. Loading Screen Manager
   ========================================================================== */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const loadingText = document.getElementById('loading-text');
  if (!screen) return;

  const messages = [
    "INITIALIZING SAMARTH OS v3.0...",
    "LOADING CYBERPUNK GLASSMORPHISM ENGINES...",
    "CONNECTING TO SAMARTHPATIL.COM NODES...",
    "SYSTEM READY."
  ];

  let step = 0;
  const interval = setInterval(() => {
    step++;
    if (loadingText && messages[step]) {
      loadingText.innerText = messages[step];
    }
    if (step >= messages.length) {
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('hidden');
        playSynthSound(523.25, 'triangle', 0.2); // C5 chord note
      }, 300);
    }
  }, 250);
}

/* ==========================================================================
   3. Scroll Progress Indicator
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}

/* ==========================================================================
   4. Client-Side Page Router
   ========================================================================== */
function initRouter() {
  function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validPages = ['home', 'projects', 'blog', 'contact', 'donate', 'admin'];
    const activePage = validPages.includes(hash) ? hash : 'home';

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));

    const targetView = document.getElementById(`${activePage}-view`);
    if (targetView) targetView.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === activePage) link.classList.add('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSynthSound(600, 'sine', 0.05);

    if (activePage === 'contact') renderRadarCanvas();
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

/* ==========================================================================
   5. Command Palette (Ctrl + K)
   ========================================================================== */
function initCommandPalette() {
  const palette = document.getElementById('command-palette');
  const paletteBtn = document.getElementById('cmd-palette-btn');
  const searchInput = document.getElementById('palette-search');

  if (paletteBtn) {
    paletteBtn.addEventListener('click', () => togglePalette(true));
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePalette(!palette.classList.contains('active'));
    } else if (e.key === 'Escape' && palette.classList.contains('active')) {
      togglePalette(false);
    }
  });

  if (palette) {
    palette.addEventListener('click', (e) => {
      if (e.target === palette) togglePalette(false);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterPalette(e.target.value));
  }
}

function togglePalette(open) {
  const palette = document.getElementById('command-palette');
  const searchInput = document.getElementById('palette-search');
  if (!palette) return;

  if (open) {
    palette.classList.add('active');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    playSynthSound(750, 'sine', 0.1);
  } else {
    palette.classList.remove('active');
  }
}

function filterPalette(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.palette-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(q) ? 'flex' : 'none';
  });
}

window.executeCmd = function(cmd) {
  togglePalette(false);
  if (cmd === 'sound') {
    document.getElementById('sound-toggle-btn')?.click();
  } else {
    window.location.hash = `#${cmd}`;
  }
};

/* ==========================================================================
   6. Aura AI Assistant Chat Engine
   ========================================================================== */
function initAuraAI() {
  const toggleBtn = document.getElementById('ai-toggle-btn');
  const chatBox = document.getElementById('ai-chat-box');
  const closeBtn = document.getElementById('ai-close-btn');
  const form = document.getElementById('ai-chat-form');
  const messages = document.getElementById('ai-chat-messages');

  if (toggleBtn && chatBox) {
    toggleBtn.addEventListener('click', () => {
      chatBox.classList.toggle('active');
      playSynthSound(700, 'triangle', 0.08);
    });
  }

  if (closeBtn && chatBox) {
    closeBtn.addEventListener('click', () => chatBox.classList.remove('active'));
  }

  if (form && messages) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('ai-chat-input');
      const q = input.value.trim();
      if (!q) return;

      messages.innerHTML += `<p style="color: var(--neon-cyan); margin-top: 8px;"><strong>You:</strong> ${q}</p>`;
      input.value = '';

      setTimeout(() => {
        let reply = "I am Aura AI. Samarth Patil is a Full-Stack & AI Engineer specializing in React, Node.js, Python, and modern web architectures. You can contact him via the Contact page or email hello@samarthpatil.com!";
        if (q.toLowerCase().includes('skill') || q.toLowerCase().includes('stack')) {
          reply = "Samarth's core stack includes React, TypeScript, Node.js, Python, FastAPI, Docker, and PostgreSQL!";
        } else if (q.toLowerCase().includes('project') || q.toLowerCase().includes('work')) {
          reply = "Check out Samarth's signature projects like Aura AI, HyperFlow, and Vivid UI on the Projects page!";
        }
        messages.innerHTML += `<p style="color: var(--text-primary); margin-top: 6px;"><strong>Aura AI:</strong> ${reply}</p>`;
        messages.scrollTop = messages.scrollHeight;
        playSynthSound(900, 'sine', 0.1);
      }, 400);
    });
  }
}

/* ==========================================================================
   7. Render All Views & Components
   ========================================================================== */
function renderAllViews() {
  siteData = getSiteData();

  initHeroTyping();
  renderTimeline();
  renderTechStack();
  renderHomeBuilding();
  renderTestimonials();
  renderProjects('all');
  renderBlog('');
  renderSocials();
  renderCrypto();
  renderSupporters();
  renderAdminPosts();
}

function initHeroTyping() {
  const el = document.getElementById('typing-title');
  if (!el || !siteData.personalInfo.titles) return;

  const titles = siteData.personalInfo.titles;
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      el.innerText = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.innerText = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentTitle.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = siteData.timeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div style="font-size: 0.82rem; font-weight: 700; color: var(--neon-cyan); text-transform: uppercase;">${item.year}</div>
        <h3 style="font-size: 1.15rem; margin: 4px 0;">${item.title}</h3>
        <div style="font-size: 0.88rem; color: var(--neon-purple); margin-bottom: 8px;">${item.company}</div>
        <p style="color: var(--text-secondary); font-size: 0.92rem;">${item.description}</p>
      </div>
    </div>
  `).join('');
}

function renderTechStack() {
  const container = document.getElementById('tech-stack-container');
  if (!container) return;

  container.innerHTML = siteData.techStack.map(t => `
    <div class="tech-card" onmouseenter="playSynthHover()">
      <i class="${t.icon}" style="color: ${t.color};"></i>
      <div style="font-size: 0.85rem; font-weight: 600;">${t.name}</div>
    </div>
  `).join('');
}

window.playSynthHover = function() {
  playSynthSound(1200, 'sine', 0.03);
};

function renderHomeBuilding() {
  const container = document.getElementById('home-building-container');
  if (!container) return;

  container.innerHTML = siteData.currentlyBuilding.map(item => `
    <div class="project-card">
      <div>
        <div class="badge-pill badge-intermediate" style="margin-bottom: 12px; display: inline-block;">${item.status}</div>
        <h3 style="font-size: 1.2rem; margin-bottom: 8px;">${item.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 16px;">${item.desc}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${item.tech.map(t => `<span class="badge-pill" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  container.innerHTML = siteData.testimonials.map(t => `
    <div class="project-card" style="border-color: rgba(157, 78, 221, 0.2);">
      <i class="fa-solid fa-quote-left" style="font-size: 1.8rem; color: var(--neon-purple); margin-bottom: 12px;"></i>
      <p style="color: var(--text-secondary); font-size: 0.95rem; font-style: italic; margin-bottom: 20px;">"${t.quote}"</p>
      <div>
        <div style="font-weight: 700; color: var(--text-primary);">${t.author}</div>
        <div style="font-size: 0.82rem; color: var(--neon-cyan);">${t.role}</div>
      </div>
    </div>
  `).join('');
}

function renderProjects(filter) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? siteData.projects 
    : siteData.projects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <div class="project-card">
      <div>
        <img src="${p.thumbnail}" alt="${p.title}" class="project-thumb">
        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
          <span class="badge-pill badge-intermediate">${p.categoryLabel}</span>
          <span class="badge-pill ${p.difficulty === 'Advanced' ? 'badge-advanced' : 'badge-intermediate'}">${p.difficulty}</span>
        </div>
        <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${p.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 16px;">${p.description}</p>
      </div>

      <div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;">
          ${p.tags.map(t => `<span class="badge-pill" style="background: var(--bg-secondary); color: var(--text-muted);">${t}</span>`).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 12px;">
          <span style="font-size: 0.85rem; color: var(--text-muted);"><i class="fa-regular fa-star" style="color: var(--neon-cyan);"></i> ${p.stars} stars</span>
          <div style="display: flex; gap: 12px;">
            <a href="${p.githubUrl}" target="_blank" style="color: var(--text-secondary);" title="GitHub Source"><i class="fa-brands fa-github"></i></a>
            <a href="${p.demoUrl}" target="_blank" style="color: var(--neon-cyan);" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBlog(query) {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const q = query.toLowerCase().trim();
  const filtered = siteData.blogPosts.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.excerpt.toLowerCase().includes(q)
  );

  container.innerHTML = filtered.map(post => `
    <div class="project-card" onclick="openBlogModal('${post.id}')" style="cursor: pointer;">
      <div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">
          <i class="fa-regular fa-calendar"></i> ${post.date} • <i class="fa-regular fa-clock"></i> ${post.readTime}
        </div>
        <h3 style="font-size: 1.2rem; margin-bottom: 8px;">${post.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 16px;">${post.excerpt}</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: var(--neon-cyan); font-weight: 600; font-size: 0.88rem;">Read Post <i class="fa-solid fa-arrow-right"></i></span>
        <span style="font-size: 0.85rem; color: var(--neon-pink);"><i class="fa-solid fa-heart"></i> ${post.likes || 42}</span>
      </div>
    </div>
  `).join('');
}

window.openBlogModal = function(id) {
  const post = siteData.blogPosts.find(p => p.id === id);
  if (!post) return;

  const modal = document.getElementById('blog-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">${post.date} • ${post.readTime}</div>
    <h1 style="font-size: 2.2rem; margin-bottom: 16px;">${post.title}</h1>
    <div style="display: flex; gap: 8px; margin-bottom: 24px;">
      ${(post.tags || []).map(t => `<span class="badge-pill badge-intermediate">${t}</span>`).join('')}
    </div>
    <hr style="border: none; border-top: 1px solid var(--glass-border); margin-bottom: 24px;">
    <div style="color: var(--text-secondary); line-height: 1.7;">${post.content}</div>
  `;

  modal.classList.add('active');
  playSynthSound(800, 'sine', 0.1);
};

function renderSocials() {
  const container = document.getElementById('socials-container');
  if (!container) return;

  container.innerHTML = siteData.socials.map(soc => `
    <div class="social-card">
      <div style="display: flex; align-items: center; gap: 12px;">
        <i class="${soc.icon}" style="font-size: 1.3rem; color: var(--neon-cyan);"></i>
        <div>
          <div style="font-weight: 600; font-size: 0.95rem;">${soc.name}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">${soc.handle}</div>
        </div>
      </div>
      ${soc.url ? `
        <a href="${soc.url}" target="_blank" class="btn btn-glass" style="padding: 6px 14px; font-size: 0.82rem;">Visit</a>
      ` : `
        <button class="btn btn-glass" onclick="copyToClipboard('${soc.copyable}', '${soc.name}')" style="padding: 6px 14px; font-size: 0.82rem;">Copy</button>
      `}
    </div>
  `).join('');
}

function renderCrypto() {
  const container = document.getElementById('crypto-container');
  if (!container) return;

  container.innerHTML = siteData.donateConfig.cryptoWallets.map(w => `
    <div class="crypto-card">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${w.color}; display: flex; align-items: center; justify-content: center; color: #fff;">
          <i class="${w.icon}"></i>
        </div>
        <div>
          <h4 style="font-size: 1.05rem;">${w.name}</h4>
          <span style="font-size: 0.8rem; color: var(--neon-cyan); font-weight: 600;">${w.symbol}</span>
        </div>
      </div>
      <div class="wallet-address-box">${w.address}</div>
      <button class="btn btn-glass" onclick="copyToClipboard('${w.address}', '${w.name} Address')" style="width: 100%;">
        <i class="fa-solid fa-copy"></i> Copy Address
      </button>
    </div>
  `).join('');
}

function renderSupporters() {
  const container = document.getElementById('supporters-container');
  if (!container) return;

  container.innerHTML = siteData.supportersList.map(s => `
    <div class="stat-card" style="text-align: left; padding: 18px;">
      <div style="font-weight: 700; color: var(--text-primary);">${s.name}</div>
      <div style="font-size: 0.85rem; color: var(--neon-cyan); margin: 4px 0;">${s.tier} (${s.amount})</div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">${s.date}</div>
    </div>
  `).join('');
}

function renderRadarCanvas() {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let angle = 0;

  function drawRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 60;

    // Rings
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2); ctx.stroke();

    // Radar Sweeper Line
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.strokeStyle = '#00f2fe';
    ctx.stroke();

    angle += 0.03;
    requestAnimationFrame(drawRadar);
  }

  drawRadar();
}

/* ==========================================================================
   8. Admin Panel CMS
   ========================================================================== */
function renderAdminPosts() {
  const tbody = document.getElementById('admin-posts-tbody');
  if (!tbody) return;

  tbody.innerHTML = (siteData.blogPosts || []).map(p => `
    <tr>
      <td>${p.title}</td>
      <td>${p.date}</td>
      <td>${p.readTime}</td>
      <td><button class="btn btn-glass" onclick="deletePost('${p.id}')" style="padding: 4px 8px; font-size: 0.78rem;">Delete</button></td>
    </tr>
  `).join('');
}

window.deletePost = function(id) {
  siteData.blogPosts = siteData.blogPosts.filter(p => p.id !== id);
  saveSiteData(siteData);
  renderAllViews();
  showToast('Post Deleted');
};

/* ==========================================================================
   9. Background Canvas (Particles + Subtle Matrix Rain)
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const particles = [];

  for (let i = 0; i < 45; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function initEventListeners() {
  const blogSearch = document.getElementById('blog-search');
  if (blogSearch) blogSearch.addEventListener('input', (e) => renderBlog(e.target.value));

  const modalClose = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('blog-modal');
  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      showToast(`Transmission received, ${name}! Samarth will reply shortly.`);
      contactForm.reset();
      playSynthSound(950, 'triangle', 0.15);
    });
  }

  const adminForm = document.getElementById('admin-login-form');
  if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('admin-passcode').value;
      if (pass === 'admin123') {
        document.getElementById('admin-lock-screen').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        showToast('Admin Panel Unlocked!');
      } else {
        showToast('Incorrect Passcode! Use admin123');
      }
    });
  }
}

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied!`);
    playSynthSound(1000, 'sine', 0.08);
  });
};

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--neon-cyan);"></i> <span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
