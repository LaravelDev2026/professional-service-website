// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initFormValidation();
    updateActiveNav();
    initPortfolioModals(); // Add this line
});

/**
 * Initialize Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

/**
 * Initialize Smooth Scrolling for Navigation Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }

                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Update Active Navigation Link on Scroll
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous messages
        clearErrorMessages();
        hideResponseMessage();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Get form data
        const formData = new FormData(this);

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Send form data via AJAX
        fetch(this.action, {
            method: 'POST', body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showResponseMessage('Thank you for your message! We will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showResponseMessage(data.message || 'Something went wrong. Please try again.', 'error');
                    if (data.errors) {
                        displayFormErrors(data.errors);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showResponseMessage('Network error. Please check your connection and try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

/**
 * Initialize Form Validation
 */
function initFormValidation() {
    const formElements = document.querySelectorAll('#contactForm input, #contactForm textarea');

    formElements.forEach(element => {
        element.addEventListener('blur', function () {
            validateField(this);
        });

        element.addEventListener('input', function () {
            clearFieldError(this);
        });
    });
}

/**
 * Validate Individual Form Field
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The form field to validate
 * @returns {boolean} - True if field is valid
 */
function validateField(field) {
    const fieldValue = field.value.trim();
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}Error`);

    if (!errorElement) return true;

    let isValid = true;
    let errorMessage = '';

    switch (fieldId) {
        case 'name':
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (fieldValue.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;

        case 'email':
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(fieldValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'message':
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (fieldValue.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
        return false;
    }

    clearFieldError(field);
    return true;
}

/**
 * Validate Entire Form
 * @returns {boolean} - True if form is valid
 */
function validateForm() {
    const requiredFields = document.querySelectorAll('#contactForm [required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Display Form Errors from Server Response
 * @param {Object} errors - Error object from server
 */
function displayFormErrors(errors) {
    for (const [field, errorMessages] of Object.entries(errors)) {
        const fieldElement = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);

        if (fieldElement && errorElement) {
            const message = Array.isArray(errorMessages) ? errorMessages[0] : errorMessages;
            showFieldError(fieldElement, message);
        }
    }
}

/**
 * Show Error Message for a Specific Field
 * @param {HTMLElement} field - The form field
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#ef4444';
    }
}

/**
 * Clear Error Message for a Specific Field
 * @param {HTMLElement} field - The form field
 */
function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        field.style.borderColor = '#e2e8f0';
    }
}

/**
 * Clear All Error Messages
 */
function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });

    document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
        field.style.borderColor = '#e2e8f0';
    });
}

/**
 * Show Response Message
 * @param {string} message - Message to display
 * @param {string} type - Message type: 'success' or 'error'
 */
function showResponseMessage(message, type) {
    const responseElement = document.getElementById('formResponse');
    if (responseElement) {
        responseElement.textContent = message;
        responseElement.className = `response-message ${type}`;
        responseElement.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideResponseMessage();
            }, 5000);
        }
    }
}

/**
 * Hide Response Message
 */
function hideResponseMessage() {
    const responseElement = document.getElementById('formResponse');
    if (responseElement) {
        responseElement.style.display = 'none';
    }
}

/**
 * Validate Email Format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Debounce Function for Performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout = null;  // Initialize as null
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        if (timeout !== null) {  // Check if timeout exists
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

// Make debounced version of scroll handler
const debouncedScroll = debounce(updateActiveNav, 100);
window.addEventListener('scroll', debouncedScroll);

/**
 * Initialize Portfolio Modals
 */
function initPortfolioModals() {
    const viewDetailButtons = document.querySelectorAll('.view-details-btn');
    const modals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    if (viewDetailButtons.length === 0) return;

    // Open modal on button click
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`project-modal-${projectId}`);

            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close modal on X click
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.project-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
}
