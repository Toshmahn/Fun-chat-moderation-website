// Enhanced Chat Moderation Platform
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializePricingCards();
    initializeSignupForm();
    initializeStats();
    initializeAnimations();
    
    // Show welcome toast
    setTimeout(() => {
        showToast('Welcome to ShieldChat AI! Start your free trial today.', 'info');
    }, 1000);
    
    console.log('ShieldChat AI Platform initialized!');
});

// ===== PRICING =====
function initializePricingCards() {
    const cards = document.querySelectorAll('.pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const plan = this.getAttribute('data-plan');
            document.getElementById('selectedPlan').value = plan;
            
            showToast(`${plan.toUpperCase()} plan selected`, 'info');
        });
    });
}

function selectPlan(plan) {
    const planSelect = document.getElementById('selectedPlan');
    if (planSelect) {
        planSelect.value = plan;
        scrollToSignup();
        showToast(`${plan.toUpperCase()} plan selected`, 'success');
    }
}

// ===== SIGNUP FORM =====
function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                
                showToast('🎉 Welcome to ShieldChat AI! Your free trial has started.', 'success');
                
                // Update user count
                updateUserCount();
                
                // Reset form after delay
                setTimeout(() => {
                    if (data.plan !== 'enterprise') {
                        window.location.href = '#dashboard';
                        showToast('Redirecting to your dashboard...', 'info');
                    }
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
                
            }, 2000);
        });
    }
}

// ===== STATS ANIMATION =====
function initializeStats() {
    // Animate initial stats
    setTimeout(() => {
        animateValue(document.getElementById('totalUsers'), 0, 5247, 2000);
        animateValue(document.getElementById('totalMessages'), 0, 124893, 2000);
        animateValue(document.getElementById('messagesBlocked'), 0, 8452, 2000);
        
        const accuracyElement = document.getElementById('accuracyRate');
        animateValue(accuracyElement, 0, 99.2, 2000);
    }, 500);
    
    // Update stats every 30 seconds
    setInterval(updateLiveStats, 30000);
}

function updateLiveStats() {
    // Simulate live growth
    const currentUsers = parseInt(document.getElementById('totalUsers').textContent) || 5247;
    const currentMessages = parseInt(document.getElementById('totalMessages').textContent) || 124893;
    const currentBlocked = parseInt(document.getElementById('messagesBlocked').textContent) || 8452;
    
    const newUsers = currentUsers + Math.floor(Math.random() * 10);
    const newMessages = currentMessages + Math.floor(Math.random() * 100);
    const newBlocked = currentBlocked + Math.floor(Math.random() * 5);
    
    animateValue(document.getElementById('totalUsers'), currentUsers, newUsers, 1000);
    animateValue(document.getElementById('totalMessages'), currentMessages, newMessages, 1000);
    animateValue(document.getElementById('messagesBlocked'), currentBlocked, newBlocked, 1000);
}

function updateUserCount() {
    const userElement = document.getElementById('totalUsers');
    const currentUsers = parseInt(userElement.textContent.replace(',', '')) || 5247;
    const newUsers = currentUsers + 1;
    
    animateValue(userElement, currentUsers, newUsers, 500);
}

function animateValue(element, start, end, duration) {
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (element.id === 'accuracyRate') {
            const value = (progress * (end - start) + start).toFixed(1);
            element.textContent = value + '%';
        } else {
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('i');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set icon based on type
    switch(type) {
        case 'success':
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
            break;
        case 'warning':
            toastIcon.className = 'fas fa-exclamation-triangle';
            toastIcon.style.color = '#f59e0b';
            break;
        case 'error':
            toastIcon.className = 'fas fa-times-circle';
            toastIcon.style.color = '#ef4444';
            break;
        default:
            toastIcon.className = 'fas fa-info-circle';
            toastIcon.style.color = '#6366f1';
    }
    
    toastMessage.textContent = message;
    toast.style.display = 'flex';
    
    // Auto hide
    setTimeout(() => {
        toast.style.display = 'none';
    }, 5000);
}

// ===== SCROLL FUNCTIONS =====
function scrollToPricing() {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSignup() {
    document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.pricing-card, .feature-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Simulate dashboard updates
setInterval(() => {
    const dashboardStats = document.querySelectorAll('.dashboard-stats .stat-number');
    if (dashboardStats.length > 0) {
        dashboardStats.forEach(stat => {
            const current = parseInt(stat.textContent.replace(',', '')) || 0;
            const change = Math.floor(Math.random() * 20) - 5;
            const newValue = Math.max(0, current + change);
            
            if (stat.textContent.includes('%')) {
                const currentPercent = parseFloat(stat.textContent);
                const newPercent = Math.min(100, Math.max(95, currentPercent + (Math.random() - 0.5)));
                stat.textContent = newPercent.toFixed(1) + '%';
            } else {
                stat.textContent = newValue.toLocaleString();
            }
        });
    }
}, 10000);