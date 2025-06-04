// Menú hamburguesa
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// efceto typeit
document.addEventListener("DOMContentLoaded", function () {
  new TypeIt(".highlight", {
    strings: ["Nicolas Racciatti"],
    speed: 60,
    breakLines: false,
    waitUntilVisible: true,
    loop: false,
    // cursor: true,
    cursorChar: "_",
    cursorSpeed: 1000,
  }).go();
});

// Botón volver arriba
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Animaciones de scroll con ScrollReveal
if (typeof ScrollReveal !== "undefined") {
  window.ScrollReveal = ScrollReveal;
  ScrollReveal().reveal(".hero-content", {
    delay: 300,
    duration: 1000,
    origin: "bottom",
    distance: "50px",
  });

  ScrollReveal().reveal(".section-title", {
    delay: 200,
    duration: 800,
    origin: "top",
    distance: "30px",
  });

  ScrollReveal().reveal(".skill-card", {
    delay: 100,
    duration: 600,
    origin: "bottom",
    distance: "30px",
    interval: 200,
  });

  ScrollReveal().reveal(".project-card", {
    delay: 200,
    duration: 800,
    origin: "bottom",
    distance: "50px",
    interval: 300,
  });

  ScrollReveal().reveal(".about-image", {
    delay: 300,
    duration: 1000,
    origin: "left",
    distance: "50px",
  });

  ScrollReveal().reveal(".about-text", {
    delay: 500,
    duration: 1000,
    origin: "right",
    distance: "50px",
  });
}

// Formulario de contacto
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // El formulario se enviará normalmente a Formspree
    // Puedes agregar validaciones adicionales aquí si lo deseas

    // Ejemplo de validación simple
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert("Por favor, ingresa un email válido.");
      return;
    }
  });
}

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Ajuste para navbar fija
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});
