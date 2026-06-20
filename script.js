const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const faqItems = document.querySelectorAll(".faq-item");
const scanButtons = document.querySelectorAll(".btn-primary");
const scanForm = document.querySelector(".scan-form");
const scanMessage = document.querySelector(".scan-message");
const revealTargets = document.querySelectorAll(
  ".reveal, .feature-card, .pricing-card"
);

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId && document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

scanButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    button.style.transform = "translateY(0) scale(0.98)";
  });

  button.addEventListener("pointerup", () => {
    button.style.transform = "";
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

if (scanForm) {
  scanForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (scanMessage) {
      scanMessage.textContent = "Demo scan generated — see how the workflow works below.";
    }

    const workflowSection = document.querySelector("#workflow");

    if (workflowSection) {
      workflowSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
