// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== EVENTS LISTENERS =====
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', handleScroll);
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// ===== INITIALIZATION =====
function init() {
    // Animar skills bars cuando estén visibles
    animateSkillBars();
    
    // Configurar smooth scrolling para los enlaces de navegación
    setupSmoothScrolling();
    
    // Configurar filtros de proyectos
    setupProjectFilters();
    
    // Configurar intersection observer para animaciones
    setupScrollAnimations();
    
    // Configurar typewriter effect
    setupTypewriter();
    
    // Configurar formulario de contacto
    setupContactForm();
}

// ===== NAVIGATION FUNCTIONS =====
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar background on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (mobileMenuBtn.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// ===== ANIMATIONS =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .timeline-item, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => observer.observe(element));
}

function setupTypewriter() {
    const typewriterElement = document.querySelector('.title-typewriter');
    if (!typewriterElement) return;
    
    const texts = ['Full Stack Developer', 'Software Engineer', 'Tech Enthusiast', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typewriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typewriter, typeSpeed);
    }
    
    // Start typewriter effect after a delay
    setTimeout(typewriter, 1000);
}

// ===== PROJECT FILTERS =====
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating label functionality
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission(form);
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Mensaje enviado correctamente', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove focused class from form groups
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
    }, 2000);
}

// ===== UTILITIES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : type === 'error' ? 'var(--accent-color)' : 'var(--secondary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps

// ===== EASTER EGGS =====
// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s ease-in-out';
    showNotification('🎉 ¡Código Konami activado! ¡Eres increíble!', 'success');
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        body.style.animation = '';
        document.head.removeChild(style);
    }, 2000);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);

// ===== THEME PERSISTENCE =====
// Save user preferences (for future theme toggle feature)
function savePreference(key, value) {
    localStorage.setItem(`jamarbo-portfolio-${key}`, value);
}

function getPreference(key, defaultValue) {
    return localStorage.getItem(`jamarbo-portfolio-${key}`) || defaultValue;
}

// ===== LOADING PERFORMANCE =====
// Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images with data-src exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    setupLazyLoading();
}

// ===== ANALYTICS HELPERS =====
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log(`Event: ${eventName}`, properties);
    
    // Example: Google Analytics 4 event tracking
    // gtag('event', eventName, properties);
}

// Track navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation_click', {
            destination: link.getAttribute('href')
        });
    });
});

// Track project views
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('project_view', {
            project: link.closest('.project-card').querySelector('h3').textContent
        });
    });
});

console.log('🚀 Jamarbo Portfolio initialized successfully!');
