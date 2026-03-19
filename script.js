const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealTargets = Array.from(
  document.querySelectorAll("[data-reveal], .section-card, .poster, .service-card, .contact-item")
);
const slider = document.querySelector("[data-slider]");
const sliderButtons = Array.from(document.querySelectorAll("[data-slider-action]"));

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const setActiveLink = () => {
  const offset = window.scrollY + 140;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isMatch);
  });
};

revealTargets.forEach((item) => {
  if (!item.hasAttribute("data-reveal")) {
    item.setAttribute("data-reveal", "");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((item) => revealObserver.observe(item));

if (slider && sliderButtons.length) {
  const scrollAmount = () => Math.max(slider.clientWidth * 0.82, 280);

  sliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.sliderAction === "next" ? 1 : -1;
      slider.scrollBy({ left: direction * scrollAmount(), behavior: "smooth" });
    });
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);
