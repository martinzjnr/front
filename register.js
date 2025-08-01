class RegistrationForm {
  constructor() {
    this.form = document.getElementById("registrationForm");
    this.fields = {
      fullName: document.getElementById("fullName"),
      username: document.getElementById("username"),
      email: document.getElementById("email"),
      country: document.getElementById("country"),
      phone: document.getElementById("phone"),
      password: document.getElementById("password"),
      confirmPassword: document.getElementById("confirmPassword"),
      securityQuestion: document.getElementById("securityQuestion"),
      securityAnswer: document.getElementById("securityAnswer"),
      terms: document.getElementById("terms"),
    };

    this.progressFill = document.querySelector(".progress-fill");
    this.progressText = document.querySelector(".progress-text");

    this.init();
    this.preventZoom();
    this.updateProgress();
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
    const inputs = document.querySelectorAll("input, select, textarea");
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
    this.setupPasswordStrength();
    this.addInputAnimations();
  }

  addInputAnimations() {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });
      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused");
      });
    });
  }

  updateProgress() {
    const totalFields = Object.keys(this.fields).length;
    let completedFields = 0;

    Object.values(this.fields).forEach((field) => {
      if (field.type === "checkbox") {
        if (field.checked) completedFields++;
      } else {
        if (field.value.trim()) completedFields++;
      }
    });

    const progress = (completedFields / totalFields) * 100;
    this.progressFill.style.width = `${progress}%`;

    if (progress === 0) {
      this.progressText.textContent = "Complete your registration";
    } else if (progress < 50) {
      this.progressText.textContent = `${Math.round(
        progress
      )}% completed - Keep going!`;
    } else if (progress < 100) {
      this.progressText.textContent = `${Math.round(
        progress
      )}% completed - Almost there!`;
    } else {
      this.progressText.textContent = "Ready to submit!";
    }
  }

  setupEventListeners() {
    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Real-time validation and progress update
    Object.keys(this.fields).forEach((fieldName) => {
      const field = this.fields[fieldName];
      if (field) {
        field.addEventListener("blur", () => this.validateField(fieldName));
        field.addEventListener("input", () => {
          this.clearError(fieldName);
          this.updateProgress();
        });
        field.addEventListener("change", () => {
          this.updateProgress();
        });
      }
    });

    // Special handling for password confirmation
    this.fields.confirmPassword.addEventListener("input", () => {
      this.validatePasswordMatch();
    });

    // Username availability check (simulated)
    this.fields.username.addEventListener("blur", () => {
      this.checkUsernameAvailability();
    });
  }

  setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll(".toggle-password");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = button.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);
        const eyeIcon = button.querySelector(".eye-icon");

        if (targetInput.type === "password") {
          targetInput.type = "text";
          eyeIcon.textContent = "🙈";
          button.setAttribute("aria-label", "Hide password");
        } else {
          targetInput.type = "password";
          eyeIcon.textContent = "👁️";
          button.setAttribute("aria-label", "Show password");
        }
      });
    });
  }

  setupPasswordStrength() {
    this.fields.password.addEventListener("input", () => {
      this.updatePasswordStrength();
    });
  }

  updatePasswordStrength() {
    const password = this.fields.password.value;
    const strengthFill = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    let strength = 0;
    let strengthLabel = "Very Weak";
    let color = "#e74c3c";

    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20;

    if (strength >= 80) {
      strengthLabel = "Very Strong";
      color = "#4caf50";
    } else if (strength >= 60) {
      strengthLabel = "Strong";
      color = "#8bc34a";
    } else if (strength >= 40) {
      strengthLabel = "Medium";
      color = "#ff9900";
    } else if (strength >= 20) {
      strengthLabel = "Weak";
      color = "#ff5722";
    }

    strengthFill.style.width = `${strength}%`;
    strengthFill.style.backgroundColor = color;
    strengthText.textContent = `Password strength: ${strengthLabel}`;
    strengthText.style.color = color;
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "fullName":
        if (!value) {
          errorMessage = "Full name is required";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "Full name must be at least 2 characters";
          isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = "Full name can only contain letters and spaces";
          isValid = false;
        }
        break;

      case "username":
        if (!value) {
          errorMessage = "Username is required";
          isValid = false;
        } else if (value.length < 3) {
          errorMessage = "Username must be at least 3 characters";
          isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          errorMessage =
            "Username can only contain letters, numbers, and underscores";
          isValid = false;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = "Email address is required";
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address";
          isValid = false;
        }
        break;

      case "country":
        if (!value) {
          errorMessage = "Please select your country";
          isValid = false;
        }
        break;

      case "phone":
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        if (!value) {
          errorMessage = "Phone number is required";
          isValid = false;
        } else if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
          errorMessage = "Please enter a valid phone number";
          isValid = false;
        }
        break;

      case "password":
        if (!value) {
          errorMessage = "Password is required";
          isValid = false;
        } else if (value.length < 8) {
          errorMessage = "Password must be at least 8 characters";
          isValid = false;
        } else if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
            value
          )
        ) {
          errorMessage =
            "Password must contain uppercase, lowercase, number, and special character";
          isValid = false;
        }
        break;

      case "confirmPassword":
        if (!value) {
          errorMessage = "Please confirm your password";
          isValid = false;
        } else if (value !== this.fields.password.value) {
          errorMessage = "Passwords do not match";
          isValid = false;
        }
        break;

      case "securityQuestion":
        if (!value) {
          errorMessage = "Please select a security question";
          isValid = false;
        }
        break;

      case "securityAnswer":
        if (!value) {
          errorMessage = "Security answer is required";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "Security answer must be at least 2 characters";
          isValid = false;
        }
        break;

      case "terms":
        if (!field.checked) {
          errorMessage = "You must agree to the terms and conditions";
          isValid = false;
        }
        break;
    }

    this.showFieldError(fieldName, errorMessage, !isValid);
    this.updateFieldStatus(field, isValid);

    return isValid;
  }

  validatePasswordMatch() {
    const password = this.fields.password.value;
    const confirmPassword = this.fields.confirmPassword.value;

    if (confirmPassword && password !== confirmPassword) {
      this.showFieldError("confirmPassword", "Passwords do not match", true);
      this.updateFieldStatus(this.fields.confirmPassword, false);
    } else if (confirmPassword) {
      this.showFieldError("confirmPassword", "", false);
      this.updateFieldStatus(this.fields.confirmPassword, true);
    }
  }

  checkUsernameAvailability() {
    const username = this.fields.username.value.trim();
    if (username.length >= 3) {
      // Simulate API call
      setTimeout(() => {
        // Simulate some usernames being taken
        const takenUsernames = [
          "admin",
          "user",
          "test",
          "crypto",
          "trader",
          "bitcoin",
          "ethereum",
        ];
        if (takenUsernames.includes(username.toLowerCase())) {
          this.showFieldError("username", "Username is already taken", true);
          this.updateFieldStatus(this.fields.username, false);
        } else {
          this.showFieldError("username", "Username is available", false);
          this.updateFieldStatus(this.fields.username, true);
        }
      }, 800);
    }
  }

  showFieldError(fieldName, message, isError) {
    const field = this.fields[fieldName];
    const errorElement = field
      .closest(".form-group, .terms-section")
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
    if (field.value.trim() || field.checked) {
      field.classList.add(isValid ? "success" : "error");
    }
  }

  clearError(fieldName) {
    const field = this.fields[fieldName];
    const errorElement = field
      .closest(".form-group, .terms-section")
      .querySelector(".error-message");

    if (field.classList.contains("error")) {
      field.classList.remove("error");
      errorElement.classList.remove("show");
    }
  }

  validateForm() {
    let isFormValid = true;

    Object.keys(this.fields).forEach((fieldName) => {
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
      await this.simulateRegistration();

      this.showNotification(
        "🎉 Account created successfully! Welcome to Elivate Prime Group (EPG)!",
        "success"
      );

      // Reset form after successful submission
      setTimeout(() => {
        this.form.reset();
        this.resetFormState();
        this.updateProgress();
      }, 3000);
    } catch (error) {
      this.showNotification(
        "❌ Registration failed. Please try again.",
        "error"
      );
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  }

  async simulateRegistration() {
    // Simulate network delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 95% success rate
        if (Math.random() > 0.05) {
          resolve();
        } else {
          reject(new Error("Registration failed"));
        }
      }, 2500);
    });
  }

  resetFormState() {
    Object.values(this.fields).forEach((field) => {
      field.classList.remove("error", "success");
    });

    document.querySelectorAll(".error-message").forEach((error) => {
      error.classList.remove("show");
      error.textContent = "";
    });

    // Reset password strength
    const strengthFill = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");
    strengthFill.style.width = "0%";
    strengthText.textContent = "Password strength";
    strengthText.style.color = "#666";
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
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 16px;
            right: 16px;
            background: ${
              type === "success"
                ? "linear-gradient(135deg, #4caf50, #8bc34a)"
                : "linear-gradient(135deg, #e74c3c, #ff5722)"
            };
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

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateY(-120px)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 400);
    }, 5000);
  }
}

// Initialize the form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new RegistrationForm();
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
