document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const mobileMenu = document.querySelector("#mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const skillLevels = document.querySelectorAll(".skill-level");

  // Scroll effects
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Animate skill levels on scroll
  const animateSkills = () => {
    skillLevels.forEach((skill) => {
      const skillTop = skill.getBoundingClientRect().top;
      if (skillTop < window.innerHeight - 50) {
        skill.style.width = skill.parentElement.dataset.level;
      }
    });
  };

  window.addEventListener("scroll", animateSkills);

  // ScrollReveal initialization
  ScrollReveal().reveal(".scroll-reveal", {
    delay: 200,
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
    origin: "bottom",
    reset: true,
    viewFactor: 0.2,
  });
});
