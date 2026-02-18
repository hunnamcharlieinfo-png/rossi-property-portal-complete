// Authentication JavaScript

// Show specific form
function showForm(formId) {
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => form.classList.add('hidden'));
    
    const targetForm = document.getElementById(formId);
    if (targetForm) {
        targetForm.classList.remove('hidden');
        // Focus on first input
        const firstInput = targetForm.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validation
    if (!email || !password) {
        showAuthError('Please fill in all fields', event.target);
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address', event.target);
        return false;
    }
    
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters', event.target);
        return false;
    }
    
    // Simple validation (in production, this would be server-side)
    if (email && password) {
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        
        // Show success message
        showAuthSuccess('Login successful! Redirecting...', event.target);
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
    
    return false;
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.querySelector('input[name="terms"]').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password) {
        showAuthError('Please fill in all required fields', event.target);
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address', event.target);
        return false;
    }
    
    if (password !== confirmPassword) {
        showAuthError('Passwords do not match', event.target);
        return false;
    }
    
    if (password.length < 8) {
        showAuthError('Password must be at least 8 characters', event.target);
        return false;
    }
    
    if (!terms) {
        showAuthError('You must agree to the Terms of Service and Privacy Policy', event.target);
        return false;
    }
    
    // Store user data
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', `${firstName} ${lastName}`);
    localStorage.setItem('userPhone', phone);
    
    // Success message and redirect
    showAuthSuccess('Account created successfully! Redirecting...', event.target);
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
    
    return false;
}

// Handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value.trim();
    
    // Validation
    if (!email) {
        showAuthError('Please enter your email address', event.target);
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address', event.target);
        return false;
    }
    
    // Show success message
    showAuthSuccess(`Password reset link sent to ${email}. Check your email.`, event.target);
    
    // Clear field and reset after delay
    setTimeout(() => {
        document.getElementById('forgotEmail').value = '';
        showForm('loginForm');
    }, 2000);
    
    return false;
}

// Show error message
function showAuthError(message, formElement) {
    // Remove existing messages
    const existingMessage = formElement.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and insert error message
    const messageEl = document.createElement('div');
    messageEl.className = 'auth-message auth-error';
    messageEl.textContent = '❌ ' + message;
    formElement.insertBefore(messageEl, formElement.querySelector('button'));
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-remove after delay
    setTimeout(() => messageEl.remove(), 5000);
}

// Show success message
function showAuthSuccess(message, formElement) {
    // Remove existing messages
    const existingMessage = formElement.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and insert success message
    const messageEl = document.createElement('div');
    messageEl.className = 'auth-message auth-success';
    messageEl.textContent = '✓ ' + message;
    formElement.insertBefore(messageEl, formElement.querySelector('button'));
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUrl = window.location.href;
    const isLoginPage = currentUrl.includes('login.html') || currentUrl.endsWith('login.html') || currentUrl.includes('login/');
    
    // If not logged in and not on login page, redirect to login
    if (!isLoggedIn && !isLoginPage) {
        window.location.href = 'login.html';
    }
    
    // If logged in and on login page, redirect to dashboard
    if (isLoggedIn && isLoginPage) {
        window.location.href = 'index.html';
    }
}

// Run auth check on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check auth status
    checkAuth();
});

