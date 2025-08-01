// Animate statistics numbers
document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".epg_inv_hero_x9f2_stat_number");

  stats.forEach((stat) => {
    const value = parseInt(stat.getAttribute("data-value"));
    let current = 0;
    const increment = value / 50;
    const duration = 2000;
    const interval = duration / 50;

    const counter = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(counter);
      }
      stat.textContent =
        Math.floor(current).toLocaleString() +
        (stat.textContent.includes("%")
          ? "%"
          : stat.textContent.includes("$")
          ? "M+"
          : "+");
    }, interval);
  });

  // Create particle effect
  const particles = document.querySelector(".epg_inv_hero_x9f2_particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
        `;
    particles.appendChild(particle);
  }
});

// @keyframes float {
//     0% {
//         transform: translateY(0) translateX(0);
//         opacity: 0;
//     }
//     50% {
//         opacity: 1;
//     }
//     100% {
//         transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
//         opacity: 0;
//     }
// }

// Investment Plans Calculator
document.addEventListener("DOMContentLoaded", () => {
  const planData = {
    basic: { rate: 2.5, min: 100, max: 999, duration: 24 },
    standard: { rate: 3.5, min: 1000, max: 4999, duration: 24 },
    premium: { rate: 4.5, min: 5000, max: 9999, duration: 48 },
    elite: { rate: 5.5, min: 10000, max: 50000, duration: 48 },
  };

  const cards = document.querySelectorAll(".epg_inv_plans_x8d3_card");

  cards.forEach((card) => {
    const planType = card.dataset.plan;
    const input = card.querySelector("input");
    const profitDisplay = card.querySelector(".epg_inv_plans_x8d3_profit");

    input.addEventListener("input", () => {
      const amount = parseFloat(input.value);
      const plan = planData[planType];

      if (amount >= plan.min && amount <= plan.max) {
        const profit = (amount * (plan.rate / 100) * plan.duration).toFixed(2);
        profitDisplay.textContent = `$${profit}`;
        input.style.borderColor = "rgba(59, 130, 246, 0.5)";
      } else {
        profitDisplay.textContent = "$0.00";
        input.style.borderColor = "rgba(239, 68, 68, 0.5)";
      }
    });

    // Add input validation
    input.addEventListener("blur", () => {
      const amount = parseFloat(input.value);
      const plan = planData[planType];

      if (amount < plan.min) input.value = plan.min;
      if (amount > plan.max) input.value = plan.max;
    });
  });

  // Add hover effects for cards
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
});

// Animate statistics numbers
document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".epg_inv_features_k7m2_stat_number");

  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);

      if (end > 1000) {
        element.textContent = current.toLocaleString() + "+";
      } else {
        element.textContent = current + "%";
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer for animation trigger
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const value = parseInt(element.getAttribute("data-value"));
          animateValue(element, 0, value, 2000);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));

  // Add hover animation for cards
  const cards = document.querySelectorAll(
    ".epg_inv_features_k7m2_card, .epg_inv_features_k7m2_stat_card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.background = "rgba(255, 255, 255, 0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.background = "rgba(255, 255, 255, 0.05)";
    });
  });
});
