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
