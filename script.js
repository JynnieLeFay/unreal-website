const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
const header = document.querySelector(".site-header");
if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
if (nav) nav.querySelectorAll("a").forEach(link => {
  const target = (link.getAttribute("href") || "").toLowerCase();
  link.classList.toggle("active", target === current || (current === "" && target === "index.html"));
});


// V25: mobile navigation closes reliably after selection, outside click or Escape.
if (toggle && nav) {
  document.addEventListener("click", event => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
      toggle.focus();
    }
  });
}


// Zurück-nach-oben-Schaltfläche auf allen Unterseiten, nicht auf Home.
if (!document.body.classList.contains("home-page-body")) {
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "Zurück nach oben");
  backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(backToTop);
  const updateBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 320);
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
