/* components.js — Shared header/footer injected into every page */

function getRelPath(depth) {
  return depth === 0 ? './' : '../'.repeat(depth);
}

function renderHeader(depth = 0) {
  const r = getRelPath(depth);
  return `
<div class="announcement-banner">
  🔒 Limited Time: Save 63% on Aura Identity Protection — <a href="https://aurainc.sjv.io/bOKKNk" target="_blank" rel="noopener sponsored">Get Protected Now →</a>
</div>
<header class="site-header">
  <div class="container">
    <nav class="nav-inner" aria-label="Main navigation">
      <a href="${r}index.html" class="nav-logo" aria-label="Armidillo — Home">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 2L4 8v8c0 7.18 5.14 13.9 12 15.56C22.86 29.9 28 23.18 28 16V8L16 2z" fill="#1a2b6b"/>
          <path d="M16 4.5L6.5 9.25V16c0 5.86 4.19 11.3 9.5 12.86C21.31 27.3 25.5 21.86 25.5 16V9.25L16 4.5z" fill="#2d428a"/>
          <path d="M13 16.5l2 2 4-4" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="16" cy="13" r="2.5" fill="#f97316" opacity="0.8"/>
        </svg>
        Armidillo
      </a>
      <ul class="nav-links" role="list">
        <li class="dropdown">
          <a href="${r}pages/learning-center/index.html">Learn</a>
          <ul class="dropdown-menu" role="list">
            <li><a href="${r}pages/learning-center/index.html">Learning Center</a></li>
            <li><a href="${r}pages/senior-security-hub/index.html">Senior Security Hub</a></li>
            <li><a href="${r}pages/home-security-hub/index.html">Home Security Hub</a></li>
            <li><a href="${r}pages/resources/index.html">Resource Hub</a></li>
            <li><a href="${r}pages/glossary.html">Glossary</a></li>
          </ul>
        </li>
        <li><a href="${r}pages/resources/essential-tools.html">Tools</a></li>
        <li><a href="${r}pages/victim-support.html">Victim Support</a></li>
        <li><a href="${r}pages/for-business.html">For Business</a></li>
        <li><a href="${r}pages/about.html">About</a></li>
        <li><a href="https://aurainc.sjv.io/bOKKNk" target="_blank" rel="noopener sponsored" class="nav-cta">Get Protected</a></li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </nav>
  </div>
  <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
    <a href="${r}index.html">Home</a>
    <a href="${r}pages/learning-center/index.html">Learning Center</a>
    <a href="${r}pages/senior-security-hub/index.html">Senior Security Hub</a>
    <a href="${r}pages/resources/essential-tools.html">Tools</a>
    <a href="${r}pages/victim-support.html">Victim Support</a>
    <a href="${r}pages/for-business.html">For Business</a>
    <a href="${r}pages/about.html">About</a>
    <a href="${r}pages/subscribe.html">Subscribe</a>
    <a href="https://aurainc.sjv.io/bOKKNk" target="_blank" rel="noopener sponsored" style="color:#f97316;font-weight:700;">🔒 Get Protected with Aura</a>
  </nav>
</header>`;
}

function renderFooter(depth = 0) {
  const r = getRelPath(depth);
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${r}index.html" class="footer-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 2L4 8v8c0 7.18 5.14 13.9 12 15.56C22.86 29.9 28 23.18 28 16V8L16 2z" fill="#5a78d4"/>
            <path d="M13 16.5l2 2 4-4" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Armidillo
        </a>
        <p class="footer-tagline">Fraud prevention education, scam awareness, and identity protection resources for every generation.</p>
        <p class="footer-disclaimer">Armidillo is a research and educational resource. We are not a law firm or financial advisor. Content is for informational purposes only. We are not affiliated with any government agency.</p>
        <p class="footer-disclaimer" style="margin-top:0.5rem;">Contact: <a href="mailto:info@armidillo.com" style="color:rgba(255,255,255,0.45)">info@armidillo.com</a></p>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul role="list">
          <li><a href="${r}pages/about.html">About Us</a></li>
          <li><a href="${r}pages/for-business.html">For Business</a></li>
          <li><a href="${r}pages/subscribe.html">Subscribe</a></li>
          <li><a href="${r}pages/affiliate-disclosure.html">Affiliate Disclosure</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul role="list">
          <li><a href="${r}pages/learning-center/index.html">Learning Center</a></li>
          <li><a href="${r}pages/victim-support.html">Victim Support</a></li>
          <li><a href="${r}pages/resources/essential-tools.html">Essential Tools</a></li>
          <li><a href="${r}pages/glossary.html">Glossary</a></li>
          <li><a href="${r}pages/scam-assessment.html">Scam Assessment</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul role="list">
          <li><a href="${r}pages/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="${r}pages/cookie-policy.html">Cookie Policy</a></li>
          <li><a href="${r}pages/terms-and-conditions.html">Terms &amp; Conditions</a></li>
          <li><a href="${r}pages/affiliate-disclosure.html">Affiliate Disclosure</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Armidillo Security. All Rights Reserved.</p>
      <p class="footer-pplx">Built with <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Perplexity Computer</a></p>
    </div>
  </div>
</footer>`;
}

function renderAuraBlock(variant = 'default') {
  if (variant === 'compact') {
    return `
<div class="aura-callout">
  <h4>🔒 Has Your Identity Been Compromised?</h4>
  <p>Aura monitors your credit at all 3 bureaus 24/7, alerts you in seconds, and covers eligible losses up to $1M.</p>
  <a href="https://aurainc.sjv.io/bOKKNk" target="_blank" rel="noopener sponsored" class="btn btn-primary" style="margin-top:0.75rem">Try Aura Free →</a>
  <p class="aura-disclosure" style="margin-top:0.75rem"><em>Affiliate link — we may earn a commission at no extra cost to you. <a href="./affiliate-disclosure.html">See our Affiliate Disclosure.</a></em></p>
</div>`;
  }
  return `
<div class="aura-block">
  <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem">
    <span style="font-size:1.8rem">🛡️</span>
    <span style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#fdba74">#1 Recommended</span>
  </div>
  <h3>Protect Your Identity Now — Starting at $12/Month</h3>
  <p style="color:rgba(255,255,255,0.75);font-size:0.95rem;margin-bottom:0.5rem">All-in-one identity theft protection, 3-bureau credit monitoring, and $1M insurance coverage.</p>
  <div class="aura-badges">
    <span class="aura-badge">⭐ Rated #1 Identity Theft Protection 2026</span>
    <span class="aura-badge">$1M Insurance Coverage</span>
    <span class="aura-badge">3-Bureau Credit Monitoring</span>
  </div>
  <a href="https://aurainc.sjv.io/bOKKNk" target="_blank" rel="noopener sponsored" class="btn btn-primary btn-lg">Get Aura Protection Now →</a>
  <p class="aura-disclosure">Affiliate link — we may earn a commission at no extra cost to you. Aura is available for US residents. <a href="./affiliate-disclosure.html">See our Affiliate Disclosure.</a></p>
</div>`;
}

function renderSubscribeStrip(depth = 0) {
  const r = getRelPath(depth);
  return `
<div class="subscribe-strip">
  <h2>Get Monthly Fraud Alerts</h2>
  <p>Stay ahead of emerging scam tactics with practical fraud prevention tips. No spam. Unsubscribe anytime.</p>
  <!-- KIT FORM EMBED HERE -->
  <a href="${r}pages/subscribe.html" class="btn btn-primary btn-lg">Protect Myself — Subscribe Free</a>
</div>`;
}

function initPage() {
  // Theme toggle
  (function(){
    const t = document.querySelector('[data-theme-toggle]');
    const r = document.documentElement;
    let d = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    r.setAttribute('data-theme', d);
    if (t) {
      t.addEventListener('click', () => {
        d = d === 'dark' ? 'light' : 'dark';
        r.setAttribute('data-theme', d);
        t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
        t.innerHTML = d === 'dark'
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      });
    }
  })();

  // Mobile menu
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mobileNav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('active');
      btn.setAttribute('aria-expanded', open);
    });
  }

  // Glossary accordions
  document.querySelectorAll('.glossary-term').forEach(term => {
    term.addEventListener('click', () => {
      term.closest('.glossary-item').classList.toggle('open');
    });
  });

  // Scroll-reveal
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.card, .article-card, .hub-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', initPage);
