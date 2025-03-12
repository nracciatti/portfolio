// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Animación de barras de habilidades
  const skillBars = document.querySelectorAll(".skill-progress");

  // Función para animar las barras de habilidades
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress;
    });
  }

  // Observador de intersección para las habilidades
  if ("IntersectionObserver" in window) {
    const skillsSection = document.getElementById("habilidades");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(animateSkillBars, 300);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillsSection) {
      observer.observe(skillsSection);
    }
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    window.addEventListener("scroll", () => {
      const skillsSection = document.getElementById("habilidades");
      if (skillsSection) {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
          animateSkillBars();
        }
      }
    });
  }

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

  // Formulario de contacto - Ya no necesitamos este código si usamos Formspree
  // Pero podemos mantenerlo para mostrar un mensaje de éxito después del envío
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    // Añadir un evento para mostrar un mensaje después de que el formulario se envíe
    contactForm.addEventListener("submit", (e) => {
      // No prevenimos el envío del formulario, dejamos que Formspree lo maneje

      // Podemos mostrar un mensaje de carga mientras se envía
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      // Opcional: Podemos guardar el estado del formulario en localStorage
      // para mostrar un mensaje cuando el usuario regrese después del envío
      localStorage.setItem("formSubmitted", "true");
    });

    // Verificar si el formulario fue enviado (cuando el usuario regresa de Formspree)
    if (
      window.location.search.includes("submitted=true") ||
      localStorage.getItem("formSubmitted") === "true"
    ) {
      // Limpiar el estado
      localStorage.removeItem("formSubmitted");

      // Mostrar mensaje de éxito
      contactForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          <h3>¡Mensaje Enviado!</h3>
          <p>Gracias por contactarme. Te responderé lo antes posible.</p>
        </div>
      `;
    }
  }

  // Efectos de scroll con ScrollReveal
  if (typeof ScrollReveal === "function") {
    // Configuración básica para ScrollReveal
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "50px",
      duration: 1000,
      delay: 200,
      easing: "ease-in-out",
      reset: false,
    });

    // Aplicar animaciones a diferentes elementos
    sr.reveal(".section-title", {
      delay: 100,
    });

    sr.reveal(".about-image", {
      origin: "left",
    });

    sr.reveal(".about-text", {
      origin: "right",
      delay: 300,
    });

    sr.reveal(".skill-card", {
      interval: 200,
    });

    sr.reveal(".project-card", {
      interval: 300,
    });

    sr.reveal(".contact-info", {
      origin: "left",
    });

    sr.reveal(".contact-form", {
      origin: "right",
      delay: 300,
    });
  } else {
    // Si ScrollReveal no está disponible, aplicamos animaciones básicas con JavaScript
    // Esto es un fallback simple para navegadores que no cargan la librería

    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8
      );
    }

    // Función para añadir la clase 'appear' a los elementos visibles
    function checkElements() {
      const fadeElements = document.querySelectorAll(".fade-in");
      const slideElements = document.querySelectorAll(".slide-up");

      // Comprobar elementos con fade-in
      fadeElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("appear");
        }
      });

      // Comprobar elementos con slide-up
      slideElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("appear");
        }
      });
    }

    // Añadir clases de animación a los elementos
    document
      .querySelectorAll(".section-title")
      .forEach((el) => el.classList.add("fade-in"));
    document
      .querySelectorAll(".about-image")
      .forEach((el) => el.classList.add("slide-up"));
    document
      .querySelectorAll(".about-text")
      .forEach((el) => el.classList.add("slide-up"));
    document
      .querySelectorAll(".skill-card")
      .forEach((el) => el.classList.add("fade-in"));
    document
      .querySelectorAll(".project-card")
      .forEach((el) => el.classList.add("slide-up"));
    document
      .querySelectorAll(".contact-info")
      .forEach((el) => el.classList.add("fade-in"));
    document
      .querySelectorAll(".contact-form")
      .forEach((el) => el.classList.add("slide-up"));

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener("load", checkElements);
    window.addEventListener("scroll", checkElements);
  }

  // Animación suave para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
