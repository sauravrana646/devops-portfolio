(function () {
  const pages = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "Why me" },
    { href: "projects.html", label: "Cases" },
    { href: "architecture.html", label: "Systems" },
    { href: "services.html", label: "Approach" },
    { href: "blog.html", label: "Notes" },
    { href: "resume.html", label: "Resume" },
    { href: "contact.html", label: "Reach out", cta: true },
  ];

  const current = document.body.dataset.page || "";

  function navLinks(desktop) {
    return pages
      .filter((p) => (desktop ? !p.cta : true))
      .map((p) => {
        const currentAttr = p.href.replace(".html", "") === current || (current === "home" && p.href === "index.html")
          ? ' aria-current="page"'
          : "";
        if (p.cta) {
          return `<a class="btn btn-primary" href="${p.href}">Reach out</a>`;
        }
        return `<a href="${p.href}"${currentAttr}>${p.label}</a>`;
      })
      .join("");
  }

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <a class="brand" href="index.html">[Brand]<span>.</span></a>
      <nav class="nav-desktop" aria-label="Primary">${navLinks(true)}</nav>
      <div class="header-actions">
        <a class="btn btn-primary" href="contact.html">Reach out</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">☰</button>
      </div>
    `;
  }

  const mobile = document.getElementById("mobile-nav");
  if (mobile) {
    mobile.innerHTML = navLinks(false);
  }

  const toggle = document.querySelector(".menu-toggle");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">[Brand]<span>.</span></a>
          <p class="muted" style="margin-top:12px;max-width:28ch">Senior platform, reliability, and DevSecOps consulting—scoped like a product.</p>
        </div>
        <div>
          <h3>Work</h3>
          <a href="projects.html">Projects</a>
          <a href="architecture.html">Architecture</a>
          <a href="services.html">Services</a>
          <a href="open-source.html">Open Source</a>
        </div>
        <div>
          <h3>Insights</h3>
          <a href="blog.html">Blog</a>
          <a href="resources.html">Resources</a>
        </div>
        <div>
          <h3>Credibility</h3>
          <a href="about.html">About</a>
          <a href="certifications.html">Certifications</a>
          <a href="testimonials.html">Testimonials</a>
          <a href="resume.html">Resume</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="contact.html">Contact</a>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© [Consultant Name] · design preview</span>
        <span>systems · secured · shipping</span>
      </div>
    `;
  }
})();
