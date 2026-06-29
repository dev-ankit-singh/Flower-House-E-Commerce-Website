// ============================================
// SERENO LIVING — Main JavaScript
// ============================================

// ===== HERO CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let autoSlideTimer;

function goSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function changeSlide(dir) {
  clearInterval(autoSlideTimer);
  goSlide(currentSlide + dir);
  startAutoSlide();
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => goSlide(currentSlide + 1), 5000);
}

startAutoSlide();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('visible');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== PRODUCT IMAGE HOVER SWAP =====
document.querySelectorAll('.product-card[data-hover-img]').forEach(card => {
  const img = card.querySelector('.product-img');
  const original = img.src;
  const hover = card.dataset.hoverImg;

  // Preload hover image
  const preload = new Image();
  preload.src = hover;

  card.addEventListener('mouseenter', () => { img.src = hover; });
  card.addEventListener('mouseleave', () => { img.src = original; });
});

// ===== ADD TO CART =====
function addToCart(name, price) {
  const toast = document.getElementById('cartToast');
  const msg = document.getElementById('cartToastMsg');
  msg.textContent = `${name} added to cart!`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  const email = input.value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    msg.style.color = '#c0392b';
    msg.textContent = 'Please enter your email address.';
    return;
  }
  if (!emailRe.test(email)) {
    msg.style.color = '#c0392b';
    msg.textContent = 'Please enter a valid email.';
    return;
  }
  msg.style.color = 'var(--green-mid)';
  msg.textContent = '✓ Thank you for subscribing! Welcome to the Sereno family.';
  input.value = '';
}

// Enter key for newsletter
document.getElementById('newsletterEmail')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') subscribeNewsletter();
});

// ===== CATEGORY FILTER BUTTONS =====
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ===== SEARCH =====
document.querySelector('.search-icon')?.addEventListener('click', () => {
  const val = document.getElementById('searchInput')?.value.trim();
  if (val) alert(`Searching for: "${val}"`);
});

document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val) alert(`Searching for: "${val}"`);
  }
});

// ===== SCROLL REVEAL (lightweight, no library) =====
const revealEls = document.querySelectorAll('.product-card, .collection-item, .feature-item, .stat, .brand-story-inner');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.1}s, transform 0.5s ease ${(i % 4) * 0.1}s`;
  observer.observe(el);
});





// product.js js start
// ============================================
// PRODUCT PAGE — product.js
// ============================================

const BASE_PRICE = 4138;
let qty = 1;

function changeQty(dir) {
  qty = Math.max(1, qty + dir);
  document.getElementById('qtyVal').textContent = qty;
  document.getElementById('pdTotal').textContent = '₹' + (BASE_PRICE * qty).toLocaleString('en-IN') + '.00';
}

function selectSize(btn) {
  document.querySelectorAll('.pd-size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectColor(btn, name) {
  document.querySelectorAll('.pd-color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('colorName').textContent = name;
}

function pdAddToCart() {
  const msg = document.getElementById('pdCartMsg');
  msg.textContent = `✓ ${qty} item(s) added to cart!`;
  setTimeout(() => { msg.textContent = ''; }, 3000);
}

function switchImg(thumb) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  document.getElementById('mainProductImg').src = thumb.src;
}

function toggleAcc(btn) {
  const body = btn.nextElementSibling;
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.pd-acc-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.pd-acc-head').forEach(b => b.classList.remove('open'));
  if (!isOpen) { body.classList.add('open'); btn.classList.add('open'); }
}
