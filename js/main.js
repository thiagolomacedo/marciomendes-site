/* ====================================
   MESTRE MÁRCIO MENDES - SCRIPTS
   ==================================== */

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.mobile-menu-btn');

  nav.classList.toggle('active');
  btn.classList.toggle('active');
}

// Language Dropdown Toggle
function toggleLangDropdown() {
  const dropdown = document.querySelector('.language-dropdown');
  dropdown.classList.toggle('open');
}

// Select Language
function selectLanguage(lang, flag, code) {
  // Update button display
  const btn = document.querySelector('.lang-dropdown-btn');
  btn.querySelector('.current-lang-flag').textContent = flag;
  btn.querySelector('.current-lang-text').textContent = code;

  // Close dropdown
  document.querySelector('.language-dropdown').classList.remove('open');

  // Translate
  translateTo(lang);
}

// Translate Function
function translateTo(lang) {
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  } else {
    // Fallback: tenta novamente após carregar
    setTimeout(() => translateTo(lang), 500);
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

// Scroll Animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.animate-fadeIn, .animate-fadeInUp');

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.85) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Header Scroll Effect
function handleHeaderScroll() {
  const header = document.querySelector('.header');

  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.mobile-menu-btn');

  if (nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !btn.contains(e.target)) {
    nav.classList.remove('active');
    btn.classList.remove('active');
  }
});

// Back to Top Button
function handleBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.animate-fadeInUp');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run once on load
  handleScrollAnimations();

  // Add scroll listeners
  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('scroll', handleHeaderScroll);
  window.addEventListener('scroll', handleBackToTop);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Coming Soon Popup
function showComingSoon(e) {
  e.preventDefault();
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'coming-soon-overlay';
  overlay.innerHTML = `
    <div class="coming-soon-popup">
      <button class="coming-soon-close" onclick="closeComingSoon()">&times;</button>
      <h3>Coming Soon</h3>
      <p>This title will be available for purchase shortly. We're preparing everything so you can enjoy this work by Mestre Márcio Mendes.</p>
      <p class="coming-soon-sub">Stay tuned — great things are on the way.</p>
    </div>
  `;
  document.body.appendChild(overlay);
  // Animate in
  requestAnimationFrame(() => overlay.classList.add('active'));
  // Close on overlay click
  overlay.addEventListener('click', (ev) => {
    if (ev.target === overlay) closeComingSoon();
  });
}

function closeComingSoon() {
  const overlay = document.querySelector('.coming-soon-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

// Book Carousel Toggle
function toggleBookImage(carousel) {
  const images = carousel.querySelectorAll('.book-img');
  const dots = carousel.querySelectorAll('.dot');

  let currentIndex = 0;
  images.forEach((img, index) => {
    if (img.classList.contains('active')) {
      currentIndex = index;
    }
  });

  // Remove active from current
  images[currentIndex].classList.remove('active');
  dots[currentIndex].classList.remove('active');

  // Add active to next
  const nextIndex = (currentIndex + 1) % images.length;
  images[nextIndex].classList.add('active');
  dots[nextIndex].classList.add('active');
}
