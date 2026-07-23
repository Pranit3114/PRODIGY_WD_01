// ============================
// DOM Elements
// ============================
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section, .content-section");

// ============================
// Scroll-Based Navbar Styling
// ============================
const SCROLL_THRESHOLD = 60;

function handleScroll() {
  const scrollY = window.scrollY;

  // Toggle scrolled class for glassmorphism effect
  if (scrollY > SCROLL_THRESHOLD) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Highlight active section link based on scroll position
  updateActiveLink();
}

// ============================
// Active Section Tracking
// ============================
function updateActiveLink() {
  const scrollY = window.scrollY;
  const navHeight = navbar.offsetHeight;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === currentSection) {
      link.classList.add("active");
    }
  });
}

// ============================
// Smooth Scroll on Link Click
// ============================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Close mobile menu after clicking a link
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
  });
});

// ============================
// Mobile Menu Toggle
// ============================
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
  }
});

// ============================
// Hover Ripple Effect on Nav Links
// ============================
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    // Add a subtle scale pulse on hover
    link.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transition = "";
  });
});

// ============================
// Intersection Observer for Section Reveal Animations
// ============================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

// Apply reveal animation to content elements
document
  .querySelectorAll(
    ".feature-card, .portfolio-card, .section-title, .section-text",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    revealObserver.observe(el);
  });

// ============================
// Event Listeners
// ============================
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("load", handleScroll);
