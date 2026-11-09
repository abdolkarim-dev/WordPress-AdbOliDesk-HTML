document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     منوی موبایل — یکسان در index.html و projects.html
     ============================================================ */
  const mobileBtn  = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon   = document.getElementById("menu-icon");

  if (mobileBtn && mobileMenu && menuIcon) {
    mobileBtn.addEventListener("click", () => {
      const willOpen = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden", !willOpen);
      menuIcon.classList.toggle("fa-bars", !willOpen);
      menuIcon.classList.toggle("fa-xmark", willOpen);

      mobileBtn.setAttribute("aria-expanded", String(willOpen));
    });
  }

  /* ============================================================
     فیلتر + جست‌وجوی نمونه‌کارها (فقط در projects.html)
     ============================================================ */
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards  = [...document.querySelectorAll(".project-card")];
  const searchInput   = document.getElementById("project-search");
  const emptyState    = document.getElementById("empty-state");
  const projectCount  = document.getElementById("project-count");

  if (filterButtons.length && searchInput && emptyState && projectCards.length) {
    let selectedFilter = "all";

    const filterProjects = () => {
      const query = searchInput.value.trim().toLocaleLowerCase("fa");
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const matchesCategory =
          selectedFilter === "all" || card.dataset.category === selectedFilter;
        const searchableText = (
          card.innerText + " " + (card.dataset.search || "")
        ).toLocaleLowerCase("fa");
        const matchesSearch = !query || searchableText.includes(query);
        const isVisible = matchesCategory && matchesSearch;

        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      emptyState.classList.toggle("hidden", visibleCount > 0);
      if (projectCount) projectCount.textContent = visibleCount.toLocaleString("fa-IR");
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedFilter = button.dataset.filter;
        filterButtons.forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });
        filterProjects();
      });
    });

    searchInput.addEventListener("input", filterProjects);
  }

  /* ============================================================
     سال در فوتر (همه‌ی صفحات)
     ============================================================ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toLocaleString("fa-IR");

  /* ============================================================
     فرم تماس — فقط اگه صفحه فرم داشت
     ============================================================ */
  const form = document.querySelector("form");
  const formMsg = document.getElementById("form-msg");
  if (form && formMsg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      formMsg.classList.remove("hidden");
      formMsg.innerText =
        "درخواست شما با موفقیت ثبت شد. به‌زودی با شما تماس خواهم گرفت.";
      form.reset();
      setTimeout(() => formMsg.classList.add("hidden"), 5000);
    });
  }

  /* ============================================================
     انیمیشن ذرات — فقط اگه canvas وجود داشت
     ============================================================ */
  const canvas = document.getElementById("circuitCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let width, height;
    const particles = [];

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 242, 254, 0.4)";
        ctx.fill();
      }
    }

    for (let i = 0; i < 45; i++) particles.push(new Particle());

    const animateCanvas = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateCanvas);
    };
    animateCanvas();
  }
});