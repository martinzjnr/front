document.addEventListener("DOMContentLoaded", function () {
  // Animate statistics on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".epg_aff_hero_x9k5_stat_value").forEach((stat) => {
    observer.observe(stat);
  });

  function animateValue(element) {
    const value = parseInt(element.getAttribute("data-value"));
    let current = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      current = Math.floor(progress * value);
      element.textContent = element.textContent.includes("$")
        ? `$${current}K+`
        : element.textContent.includes("h")
        ? `${current}h`
        : `${current}%`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    let start = null;
    window.requestAnimationFrame(step);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Tilt.js for 3D card hover effect
  const cards = document.querySelectorAll(".epg_aff_benefits_k8m3_card");

  cards.forEach((card) => {
    VanillaTilt.init(card, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05,
    });
  });

  // Animate cards on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    observer.observe(card);
  });

  // Animate chart bars
  const chartBars = document.querySelectorAll(
    ".epg_aff_benefits_k8m3_chart_bar"
  );
  chartBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.height = bar.style.height;
    }, index * 200);
  });
});
