class SignInForm {
  constructor() {
    this.form = document.getElementById("signinForm");
    this.fields = {
      emailUsername: document.getElementById("emailUsername"),
      password: document.getElementById("password"),
      rememberMe: document.getElementById("rememberMe"),
    };

    this.init();
    this.preventZoom();
  }

  preventZoom() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      (event) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );

    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.fontSize = "16px";
        // Prevent viewport zoom
        const viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        );
      });
      input.addEventListener("blur", function () {
        this.style.fontSize = "";
        // Restore viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        );
      });
    });
  }

  init() {
    this.setupEventListeners();
    this.setupPasswordToggle();
    this.addInputAnimations();
    this.addSuccessIcons();
  }

  addInputAnimations() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });
      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused");
      });
    });
  }

  addSuccessIcons() {
    // Add success icons to input wrappers
    const inputWrappers = document.querySelectorAll(".input-wrapper");
    inputWrappers.forEach((wrapper) => {
      if (!wrapper.querySelector(".input-success-icon")) {
        const successIcon = document.createElement("div");
        successIcon.className = "input-success-icon";
        successIcon.textContent = "✓";
        wrapper.appendChild(successIcon);
      }
    });
  }

  setupEventListeners() {
    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Real-time validation
    Object.keys(this.fields).forEach((fieldName) => {
      const field = this.fields[fieldName];
      if (field && field.type !== "checkbox") {
        field.addEventListener("blur", () => this.validateField(fieldName));
        field.addEventListener("input", () => {
          this.clearError(fieldName);
          this.validateFieldRealTime(fieldName);
        });
      }
    });

    // Enter key navigation
    this.fields.emailUsername.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.fields.password.focus();
      }
    });

    this.fields.password.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.form.dispatchEvent(new Event("submit"));
      }
    });
  }

  setupPasswordToggle() {
    const toggleButton = document.querySelector(".toggle-password");
    if (toggleButton) {
      toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = toggleButton.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);
        const eyeIcon = toggleButton.querySelector(".eye-icon");

        if (targetInput.type === "password") {
          targetInput.type = "text";
          eyeIcon.textContent = "🙈";
          toggleButton.setAttribute("aria-label", "Hide password");
        } else {
          targetInput.type = "password";
          eyeIcon.textContent = "👁️";
          toggleButton.setAttribute("aria-label", "Show password");
        }
      });
    }
  }

  validateFieldRealTime(fieldName) {
    const field = this.fields[fieldName];
    const value = field.value.trim();

    // Show success state for valid inputs
    if (fieldName === "emailUsername" && value.length >= 3) {
      this.updateFieldStatus(field, true);
    } else if (fieldName === "password" && value.length >= 6) {
      this.updateFieldStatus(field, true);
    } else if (value.length > 0) {
      field.classList.remove("success", "error");
    }
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "emailUsername":
        if (!value) {
          errorMessage = "Email or username is required";
          isValid = false;
        } else if (value.length < 3) {
          errorMessage = "Must be at least 3 characters";
          isValid = false;
        } else {
          // Check if it's a valid email format or username
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
          if (!emailRegex.test(value) && !usernameRegex.test(value)) {
            errorMessage = "Enter a valid email or username";
            isValid = false;
          }
        }
        break;

      case "password":
        if (!value) {
          errorMessage = "Password is required";
          isValid = false;
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters";
          isValid = false;
        }
        break;
    }

    this.showFieldError(fieldName, errorMessage, !isValid);
    this.updateFieldStatus(field, isValid);

    return isValid;
  }

  showFieldError(fieldName, message, isError) {
    const field = this.fields[fieldName];
    const errorElement = field
      .closest(".form-group")
      .querySelector(".error-message");

    errorElement.textContent = message;
    if (isError) {
      errorElement.classList.add("show");
    } else {
      errorElement.classList.remove("show");
    }
  }

  updateFieldStatus(field, isValid) {
    field.classList.remove("error", "success");
    if (field.value.trim()) {
      field.classList.add(isValid ? "success" : "error");
    }
  }

  clearError(fieldName) {
    const field = this.fields[fieldName];
    const errorElement = field
      .closest(".form-group")
      .querySelector(".error-message");

    if (field.classList.contains("error")) {
      field.classList.remove("error");
      errorElement.classList.remove("show");
    }
  }

  validateForm() {
    let isFormValid = true;

    // Only validate required fields
    const requiredFields = ["emailUsername", "password"];
    requiredFields.forEach((fieldName) => {
      const isFieldValid = this.validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.showNotification("Please correct the errors above", "error");
      // Scroll to first error
      const firstError = document.querySelector(".error-message.show");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await this.simulateSignIn();

      this.showNotification("🎉 Welcome back! Signing you in...", "success");

      // Simulate redirect after successful sign in
      setTimeout(() => {
        this.showNotification("🚀 Redirecting to your dashboard...", "success");
      }, 2000);
    } catch (error) {
      this.showNotification(
        "❌ Invalid credentials. Please check your email/username and password.",
        "error"
      );
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  }

  async simulateSignIn() {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const emailUsername = this.fields.emailUsername.value
          .trim()
          .toLowerCase();
        const password = this.fields.password.value;

        // Simulate some valid credentials for demo
        const validCredentials = [
          { username: "demo", password: "password123" },
          { username: "test@cryptotrade.com", password: "test123" },
          { username: "admin", password: "admin123" },
          { username: "trader", password: "crypto123" },
          { username: "user@example.com", password: "user123" },
        ];

        const isValid = validCredentials.some(
          (cred) =>
            cred.username === emailUsername && cred.password === password
        );

        if (isValid) {
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 2000);
    });
  }

  showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => {
      notification.remove();
    });

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
        `;

    // Enhanced mobile-friendly styles
    let backgroundColor;
    switch (type) {
      case "success":
        backgroundColor = "linear-gradient(135deg, #4caf50, #8bc34a)";
        break;
      case "info":
        backgroundColor = "linear-gradient(135deg, #2196f3, #64b5f6)";
        break;
      default:
        backgroundColor = "linear-gradient(135deg, #e74c3c, #ff5722)";
    }

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 16px;
            right: 16px;
            background: ${backgroundColor};
            color: white;
            padding: 20px 24px;
            border-radius: 20px;
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateY(-120px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: none;
            text-align: center;
            font-weight: 600;
            font-size: 16px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateY(0)";
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = "translateY(-120px)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 400);
    }, 4000);
  }
}

// Initialize the form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SignInForm();
});

// Prevent form zoom on iOS and Android
document.addEventListener("touchstart", () => {}, true);

// Additional zoom prevention
document.addEventListener("gesturestart", (e) => {
  e.preventDefault();
});

document.addEventListener("gesturechange", (e) => {
  e.preventDefault();
});

document.addEventListener("gestureend", (e) => {
  e.preventDefault();
});
