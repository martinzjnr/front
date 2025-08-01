document.addEventListener("DOMContentLoaded", function () {
  // Animate statistics
  function animateValue(id, start, end, duration, prefix = "") {
    const obj = document.getElementById(id);
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      let current = Math.floor(progress * (end - start) + start);
      if (prefix === "$") {
        current = current.toLocaleString();
      } else if (prefix === "%") {
        current = Math.min(current, 100);
      }

      obj.textContent = `${prefix}${current}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  // Initialize animations with delays
  setTimeout(() => animateValue("tradersCount", 0, 15000, 2000), 500);
  setTimeout(() => animateValue("satisfactionRate", 0, 99, 2000, "%"), 1000);
  setTimeout(() => animateValue("tradingVolume", 0, 250, 2000, "$"), 1500);

  // Intersection Observer for scroll-based animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("epg_animate_in_j2k8");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe elements for animation
  const elements = document.querySelectorAll(
    ".epg_stat_card_y4h8, .epg_review_card_h7p2"
  );
  elements.forEach((el) => observer.observe(el));

  // Smooth scroll functionality
  document
    .querySelector(".epg_scroll_indicator_r7m3")
    .addEventListener("click", () => {
      const nextSection = document.querySelector(
        ".epg_testimonials_hero_x8p4"
      ).nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
});

// Initialize Swiper when the document is loaded
document.addEventListener("DOMContentLoaded", function () {
  const testimonialSwiper = new Swiper(".epg_testimonial_swiper_h2n8", {
    // Enable smooth sliding
    effect: "slide",

    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },

    // Enable loop
    loop: true,

    // Add auto-play
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    // Enable pagination
    pagination: {
      el: ".epg_swiper_pagination_z8h3",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".epg_swiper_button_next_w4j6",
      prevEl: ".epg_swiper_button_prev_c5k8",
    },

    // Enable smooth transitions
    speed: 800,

    // Enable grabbing cursor
    grabCursor: true,

    // Keyboard control
    keyboard: {
      enabled: true,
    },

    // Accessibility
    a11y: {
      prevSlideMessage: "Previous testimonial",
      nextSlideMessage: "Next testimonial",
      firstSlideMessage: "This is the first testimonial",
      lastSlideMessage: "This is the last testimonial",
      paginationBulletMessage: "Go to testimonial {{index}}",
    },
  });

  // Add hover pause functionality
  const swiperContainer = document.querySelector(
    ".epg_testimonial_swiper_h2n8"
  );

  swiperContainer.addEventListener("mouseenter", () => {
    testimonialSwiper.autoplay.stop();
  });

  swiperContainer.addEventListener("mouseleave", () => {
    testimonialSwiper.autoplay.start();
  });
});








document.addEventListener('DOMContentLoaded', function() {
  // Animate statistics when they come into view
  const stats = document.querySelectorAll('.epg_stat_item_t6r2');
  
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const value = stat.dataset.value;
        const numberElement = stat.querySelector('.epg_stat_number_q9w4');
        
        if (value.includes('M')) {
          // Animate millions
          const number = parseInt(value);
          animateNumber(numberElement, 0, number, 2000, 'M+');
        } else if (value.includes('%')) {
          // Animate percentage
          const number = parseInt(value);
          animateNumber(numberElement, 0, number, 2000, '%');
        } else if (value === '24/7') {
          // Don't animate 24/7
          numberElement.textContent = value;
        }
        
        observer.unobserve(stat);
      }
    });
  };

  function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const updateNumber = () => {
      current += increment;
      if (current <= end) {
        element.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = end + suffix;
      }
    };
    
    requestAnimationFrame(updateNumber);
  }

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
  });

  stats.forEach(stat => statsObserver.observe(stat));

  // Add hover effect to story cards
  const storyCards = document.querySelectorAll('.epg_story_card_l3p6');
  
  storyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});