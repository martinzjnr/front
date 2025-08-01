document.addEventListener("DOMContentLoaded", () => {
  // Add hover animations to support cards
  const supportCards_n4738 = document.querySelectorAll(".support_card_d3847");

  supportCards_n4738.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });

  // Add click animation to support links
  const supportLinks_p2837 = document.querySelectorAll(".support_link_g2937");

  supportLinks_p2837.forEach((link) => {
    link.addEventListener("click", (e) => {
      link.style.transform = "scale(0.95)";
      setTimeout(() => {
        link.style.transform = "scale(1)";
      }, 100);
    });
  });
});










document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('epgContactForm');
  const inputs = form.querySelectorAll('.epg_form_input_w2q8');

  // Add placeholder attribute to prevent label overlap
  inputs.forEach(input => {
    input.setAttribute('placeholder', ' ');
  });

  // Form submission handler
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = form.querySelector('.epg_submit_btn_v6n3');
    const btnText = submitBtn.querySelector('.epg_btn_text_l2p7');
    const originalText = btnText.textContent;

    // Disable button and show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      btnText.textContent = 'Message Sent!';
      form.reset();

      // Reset button after 2 seconds
      setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);

    } catch (error) {
      // Handle error
      btnText.textContent = 'Error! Try Again';
      setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  // Add floating label animation for select element
  const select = document.getElementById('epgSubject');
  select.addEventListener('change', function() {
    if (this.value) {
      this.classList.add('has-value');
    } else {
      this.classList.remove('has-value');
    }
  });
});