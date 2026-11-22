(() => {
  "use strict";

  // 1. Print / PDF Export triggers
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  // 2. Active navigation highlight on scroll
  const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-28% 0px -56% 0px", threshold: 0.01 }
    );
    sections.forEach((sec) => observer.observe(sec));
  }

  // 3. Screenshot Lightbox Modal
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lbImg = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title");
  const lbLink = document.getElementById("lightbox-link");
  const lbClose = document.getElementById("lightbox-close");
  let lastTrigger = null;

  function openLightbox(trigger) {
    const src = trigger.dataset.src;
    const title = trigger.dataset.title || "";
    const href = trigger.dataset.href || "";

    if (!src) return;
    lastTrigger = trigger;

    lbImg.src = src;
    lbImg.alt = title;
    lbTitle.textContent = title;

    if (href) {
      lbLink.href = href;
      lbLink.style.display = "inline-flex";
    } else {
      lbLink.style.display = "none";
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.querySelectorAll("[data-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn));
  });

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
