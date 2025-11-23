// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                
                // Toggle active class on answer
                answer.classList.toggle('active');
                
                // Change icon
                if (answer.classList.contains('active')) {
                    icon.textContent = '−';
                } else {
                    icon.textContent = '+';
                }
            });
        });
    }
    
    // FAQ Category Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and categories
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                faqCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show selected category
                const categoryId = this.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }
    
    // Donation Amount Selection
    const amountButtons = document.querySelectorAll('.select-amount');
    const customAmountInput = document.getElementById('custom-amount');
    const amountDisplay = document.getElementById('amount');
    
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = this.getAttribute('data-amount');
                amountDisplay.value = `UGX ${formatNumberWithCommas(amount)}`;
                
                // Remove active class from all buttons
                amountButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.textContent = 'Select';
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.textContent = 'Selected';
                
                // Clear custom amount
                if (customAmountInput) {
                    customAmountInput.value = '';
                }
            });
        });
    }
    
    // Custom Amount Input
    if (customAmountInput && amountDisplay) {
        customAmountInput.addEventListener('input', function() {
            const amount = this.value;
            if (amount) {
                amountDisplay.value = `UGX ${formatNumberWithCommas(amount)}`;
                
                // Remove active class from amount buttons
                amountButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.textContent = 'Select';
                });
            }
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // In a real application, you would submit the form to a server here
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
    }
    
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const amount = document.getElementById('amount');
            const firstName = document.getElementById('first-name');
            const lastName = document.getElementById('last-name');
            const email = document.getElementById('email');
            const cardNumber = document.getElementById('card-number');
            const expiry = document.getElementById('expiry');
            const cvv = document.getElementById('cvv');
            const nameOnCard = document.getElementById('name-on-card');
            
            let isValid = true;
            
            if (!amount.value) {
                showError(amount, 'Please select a donation amount');
                isValid = false;
            } else {
                clearError(amount);
            }
            
            if (!firstName.value.trim()) {
                showError(firstName, 'Please enter your first name');
                isValid = false;
            } else {
                clearError(firstName);
            }
            
            if (!lastName.value.trim()) {
                showError(lastName, 'Please enter your last name');
                isValid = false;
            } else {
                clearError(lastName);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!cardNumber.value.trim() || !isValidCardNumber(cardNumber.value)) {
                showError(cardNumber, 'Please enter a valid card number');
                isValid = false;
            } else {
                clearError(cardNumber);
            }
            
            if (!expiry.value.trim() || !isValidExpiry(expiry.value)) {
                showError(expiry, 'Please enter a valid expiry date (MM/YY)');
                isValid = false;
            } else {
                clearError(expiry);
            }
            
            if (!cvv.value.trim() || !isValidCVV(cvv.value)) {
                showError(cvv, 'Please enter a valid CVV');
                isValid = false;
            } else {
                clearError(cvv);
            }
            
            if (!nameOnCard.value.trim()) {
                showError(nameOnCard, 'Please enter the name on your card');
                isValid = false;
            } else {
                clearError(nameOnCard);
            }
            
            if (isValid) {
                // In a real application, you would process the payment here
                alert('Thank you for your donation! Your payment has been processed successfully.');
                this.reset();
                amountDisplay.value = '';
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#dc3545';
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '#ced4da';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidCardNumber(cardNumber) {
        // Simple validation - in a real app, use a proper payment processor
        const cleaned = cardNumber.replace(/\s+/g, '');
        return /^\d{13,19}$/.test(cleaned);
    }
    
    function isValidExpiry(expiry) {
        return /^\d{2}\/\d{2}$/.test(expiry);
    }
    
    function isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
    
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});