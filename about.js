document.addEventListener("DOMContentLoaded", () => {
  // Animate statistics when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector(".epg_about_hero_x9k7_stats");
  if (statsSection) {
    observer.observe(statsSection);
  }

  function animateStats() {
    const stats = document.querySelectorAll(".epg_about_hero_x9k7_stat_number");
    stats.forEach((stat) => {
      const targetValue = parseInt(stat.getAttribute("data-value"));
      animateValue(stat, 0, targetValue, 2000);
    });
  }

  function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = current.toLocaleString();
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Smooth scroll for navigation
  document
    .querySelectorAll(
      ".epg_about_hero_x9k7_primary_btn, .epg_about_hero_x9k7_secondary_btn"
    )
    .forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(
          button.getAttribute("href")
        );
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
});
