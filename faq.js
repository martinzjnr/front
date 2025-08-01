// Animate stats numbers with unique function names
function animateStatValue_k8273(element, start, end, duration) {
  let current = start;
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current + (element.dataset.suffix || "");
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Initialize animations with unique function name
document.addEventListener("DOMContentLoaded", () => {
  const initializeAnimations_m9283 = () => {
    const statNumbers = document.querySelectorAll(".stat_number_d8273");
    const values = [50, 100, 2];
    const suffixes = ["K+", "+", "B+"];

    statNumbers.forEach((stat, index) => {
      stat.dataset.suffix = suffixes[index];
      animateStatValue_k8273(stat, 0, values[index], 2000);
    });
  };

  initializeAnimations_m9283();

  // Enhanced search interaction
  const searchBox_p4738 = document.querySelector(".search_box_u2937");
  const searchInput_q2837 = document.querySelector(".search_input_w3847");
  const popularTags_r9283 = document.querySelector(".popular_tags_x9283");

  searchInput_q2837.addEventListener("focus", () => {
    searchBox_p4738.style.transform = "scale(1.02)";
    popularTags_r9283.style.opacity = "1";
  });

  searchInput_q2837.addEventListener("blur", () => {
    searchBox_p4738.style.transform = "scale(1)";
  });

  // Simulate live price updates with unique function name
  function updatePrices_s7364() {
    const tickers = document.querySelectorAll(".ticker_item_k4738");
    tickers.forEach((ticker) => {
      const priceElement = ticker.querySelector('[class^="price_"]');
      const currentPrice = parseFloat(
        priceElement.textContent.replace(/[^0-9.]/g, "")
      );
      const change = (Math.random() - 0.5) * 100;
      const newPrice = (currentPrice + change).toFixed(2);

      priceElement.textContent = `$${newPrice} `;
      priceElement.className =
        change > 0 ? "price_up_m2937" : "price_down_n3847";
      priceElement.innerHTML += `<i class="fas fa-caret-${
        change > 0 ? "up" : "down"
      }"></i>`;
    });
  }

  setInterval(updatePrices_s7364, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  // FAQ Item Toggle
  const faqItems_m9283 = document.querySelectorAll(".faq_item_d3847");

  faqItems_m9283.forEach((item) => {
    const question = item.querySelector(".faq_question_e9283");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all items
      faqItems_m9283.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const icon = otherItem.querySelector(".expand_icon_f4738 i");
        icon.className = "fas fa-plus";
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add("active");
        const icon = item.querySelector(".expand_icon_f4738 i");
        icon.className = "fas fa-times";
      }
    });
  });

  // Category Filter
  const categoryBtns_n4738 = document.querySelectorAll(".category_btn_a4738");

  categoryBtns_n4738.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns_n4738.forEach((otherBtn) => {
        otherBtn.classList.remove("active_category_b2937");
      });

      // Add active class to clicked button
      btn.classList.add("active_category_b2937");

      const category = btn.dataset.category;

      // Filter FAQ items
      faqItems_m9283.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
          item.style.animation = "fadeIn 0.5s ease";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Add hover effect to FAQ items
  faqItems_m9283.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-5px)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0)";
    });
  });

  // Support button hover effect
  const contactBtn_p2837 = document.querySelector(".contact_btn_l4738");
  contactBtn_p2837.addEventListener("mouseenter", () => {
    contactBtn_p2837.style.transform = "translateY(-2px)";
  });

  contactBtn_p2837.addEventListener("mouseleave", () => {
    contactBtn_p2837.style.transform = "translateY(0)";
  });
});
