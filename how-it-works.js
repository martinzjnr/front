document.addEventListener("DOMContentLoaded", () => {
  // Animate floating elements
  const elements = document.querySelectorAll(
    ".epg_how_works_hero_x7f9_k2m5_element"
  );

  elements.forEach((element) => {
    const speed = element.getAttribute("data-speed");

    element.style.animation = `epg_how_works_hero_x7f9_k2m5_float ${
      6 * speed
    }s ease-in-out infinite`;
  });

  // Add intersection observer for step animations
  const steps = document.querySelectorAll(".epg_how_works_hero_x7f9_k2m5_step");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "translateY(0)";
          entry.target.style.opacity = "1";
        }
      });
    },
    { threshold: 0.5 }
  );

  steps.forEach((step, index) => {
    step.style.transform = "translateY(20px)";
    step.style.opacity = "0";
    step.style.transition = `all 0.5s ease ${index * 0.2}s`;
    observer.observe(step);
  });

  // Add hover effect for buttons
  const buttons = document.querySelectorAll(
    ".epg_how_works_hero_x7f9_k2m5_primary_btn, .epg_how_works_hero_x7f9_k2m5_secondary_btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for step animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".epg_steps_guide_x8k4_step").forEach((step) => {
    observer.observe(step);
  });

  // Countdown Timer
  function updateCountdown() {
    const countdownElement = document.getElementById(
      "epg_steps_guide_x8k4_countdown"
    );
    if (!countdownElement) return;

    let hours = 24;
    let minutes = 0;
    let seconds = 0;

    setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else {
        hours = 24;
        minutes = 0;
        seconds = 0;
      }

      countdownElement.textContent = `${String(hours).padStart(
        2,
        "0"
      )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }, 1000);
  }

  updateCountdown();
});
