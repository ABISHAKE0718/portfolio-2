// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// Futuristic Loading Screen Animation
window.addEventListener('load', () => {
    initializeFuturisticLoading();
});

function initializeFuturisticLoading() {
    const stages = [
        { id: 'stage-1', duration: 3000 },
        { id: 'stage-2', duration: 4000 },
        { id: 'stage-3', duration: 3500 },
        { id: 'stage-4', duration: 3000 }
    ];
    
    let currentStage = 0;
    let progressPercent = 0;
    const progressElement = document.querySelector('.progress-percent');
    const progressLabel = document.querySelector('.progress-label');
    
    // Labels for each stage
    const stageLabels = [
        'INITIALIZING...',
        'SCANNING SYSTEMS...',
        'RENDERING 3D MATRIX...',
        'FINALIZING INTERFACE...'
    ];
    
    function showStage(stageIndex) {
        // Hide all stages
        document.querySelectorAll('.loading-stage').forEach(stage => {
            stage.classList.remove('active');
        });
        
        // Show current stage
        const currentStageElement = document.getElementById(stages[stageIndex].id);
        if (currentStageElement) {
            currentStageElement.classList.add('active');
        }
        
        // Update progress label
        if (progressLabel) {
            progressLabel.textContent = stageLabels[stageIndex];
        }
        
        // Animate progress
        const targetPercent = Math.floor(((stageIndex + 1) / stages.length) * 100);
        animateProgress(progressPercent, targetPercent, stages[stageIndex].duration);
        progressPercent = targetPercent;
    }
    
    function animateProgress(startPercent, endPercent, duration) {
        const startTime = Date.now();
        
        function updateProgress() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPercent = Math.floor(startPercent + (endPercent - startPercent) * progress);
            
            if (progressElement) {
                progressElement.textContent = currentPercent + '%';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            }
        }
        
        updateProgress();
    }
    
    // Start the loading sequence
    showStage(0);
    
    // Progress through stages
    let totalTime = 0;
    stages.forEach((stage, index) => {
        setTimeout(() => {
            if (index < stages.length - 1) {
                showStage(index + 1);
            } else {
                // Final stage completed, hide loading screen
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    
                    // Initialize animations after loading
                    initializeAnimations();
                    initializeParticles();
                }, 2000);
            }
        }, totalTime + stage.duration);
        
        totalTime += stage.duration;
    });
    
    // Add some interactive sound effects (optional)
    addLoadingSoundEffects();
}

function addLoadingSoundEffects() {
    // Create audio context for futuristic beeps (optional enhancement)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function createBeep(frequency, duration) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
        
        // Stage transition beeps
        setTimeout(() => createBeep(800, 0.1), 3000);  // Stage 2
        setTimeout(() => createBeep(1000, 0.1), 7000); // Stage 3
        setTimeout(() => createBeep(1200, 0.15), 10500); // Stage 4
        setTimeout(() => createBeep(600, 0.3), 13500);  // Complete
        
    } catch (error) {
        // Audio not supported, continue without sound
        console.log('Audio effects not supported');
    }
}

// Navigation Functionality
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Trigger animations on scroll
    handleScrollAnimations();
    
    // Animate skill bars when skills section is visible
    animateSkillBars();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements
    addAnimationClasses();
}

// Add animation classes to elements
function addAnimationClasses() {
    // About section animations
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) aboutText.classList.add('slide-in-left');
    if (aboutImage) aboutImage.classList.add('slide-in-right');
    
    // Skills section animations
    const skillCategories = document.querySelectorAll('.skills-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('fade-in');
        category.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Achievement cards animations
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Project cards animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Certificate cards animations
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Animate skill bars and language bars
function animateSkillBars() {
    const skillsSection = document.querySelector('.skills');
    const languagesSection = document.querySelector('.languages');
    
    // Animate skill bars
    if (skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        if (skillsSectionTop < window.innerHeight * 0.75) {
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }, index * 100);
            });
        }
    }
    
    // Animate language proficiency bars
    if (languagesSection) {
        const languagesSectionTop = languagesSection.getBoundingClientRect().top;
        const languageBars = document.querySelectorAll('.proficiency-bar');
        
        if (languagesSectionTop < window.innerHeight * 0.75) {
            languageBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }, index * 150);
            });
        }
    }
}

// Typing effect for hero title
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Enhanced Particle.js configuration for colorful background
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 120,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00ffff', '#ff0080', '#39ff14', '#ff8c00', '#667eea', '#f093fb']
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 1,
                        color: '#00ffff'
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: '#00ffff',
                    opacity: 0.2,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 250,
                        size: 8,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 6
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize tilt effect for cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.achievement-card, .project-card, .certificate-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src || img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth reveal animation for sections
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Enhanced Cyberpunk Cursor Effects
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #00ffff 0%, #0099cc 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        opacity: 0;
        box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
    `;
    
    document.body.appendChild(cursor);
    
    let trails = [];
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = 1;
        
        // Create cursor trail
        createCursorTrail(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1;
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0;
    });
    
    // Enhanced hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .achievement-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, #ff0080 0%, #ff6b6b 100%)';
            cursor.style.boxShadow = '0 0 30px #ff0080, 0 0 60px #ff0080';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'radial-gradient(circle, #00ffff 0%, #0099cc 100%)';
            cursor.style.boxShadow = '0 0 20px #00ffff, 0 0 40px #00ffff';
        });
    });
    
    // Click ripple effect
    document.addEventListener('click', (e) => {
        createClickRipple(e.clientX, e.clientY);
    });
}

// Create cursor trail effect
function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        document.body.removeChild(trail);
    }, 800);
}

// Create click ripple effect
function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (x - 100) + 'px';
    ripple.style.top = (y - 100) + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 600);
}

// Initialize floating emojis around profile image
function initFloatingEmojis() {
    const heroSection = document.querySelector('.hero');
    const imageContainer = document.querySelector('.image-container');
    
    if (heroSection && imageContainer) {
        const emojiContainer = document.createElement('div');
        emojiContainer.className = 'floating-emojis';
        
        const emojis = ['📈', '📊', '💻', '🚀', '⚡', '🎯', '🔥', '💡', '🌟', '⭐', '🎨', '🔬'];
        
        emojis.forEach((emoji, index) => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'floating-emoji';
            emojiElement.textContent = emoji;
            emojiElement.style.animationDelay = `${index * 0.5}s`;
            emojiContainer.appendChild(emojiElement);
        });
        
        imageContainer.appendChild(emojiContainer);
    }
}

// Initialize Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    const characters = '0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101';
    
    // Responsive column count based on screen width
    const screenWidth = window.innerWidth;
    let columnCount;
    
    if (screenWidth <= 480) {
        columnCount = 8; // Mobile phones
    } else if (screenWidth <= 768) {
        columnCount = 12; // Tablets
    } else if (screenWidth <= 1024) {
        columnCount = 16; // Small laptops
    } else {
        columnCount = 20; // Large screens
    }
    
    for (let i = 0; i < columnCount; i++) {
        setTimeout(() => {
            createMatrixColumn();
        }, i * 200);
    }
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        let columnText = '';
        for (let j = 0; j < 20; j++) {
            columnText += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = columnText;
        
        matrixContainer.appendChild(column);
        
        setTimeout(() => {
            if (matrixContainer.contains(column)) {
                matrixContainer.removeChild(column);
            }
            createMatrixColumn();
        }, 5000);
    }
}

// Add holographic effects to cards
function initHolographicCards() {
    const cards = document.querySelectorAll('.achievement-card, .project-card, .certificate-card');
    
    cards.forEach(card => {
        card.classList.add('holographic-card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(circle at ${x}% ${y}%, 
                rgba(0, 255, 255, 0.2) 0%,
                rgba(255, 0, 128, 0.1) 25%,
                rgba(57, 255, 20, 0.1) 50%,
                rgba(255, 140, 0, 0.1) 75%,
                rgba(0, 212, 255, 0.05) 100%)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    setTimeout(() => {
        initTypingEffect();
    }, 2500);
    
    // Initialize counter animation
    animateCounters();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize tilt effect
    initTiltEffect();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize section reveals
    initSectionReveals();
    
    // Initialize floating emojis
    initFloatingEmojis();
    
    // Initialize matrix rain effect for all devices
    initMatrixRain();
    
    // Initialize holographic cards
    initHolographicCards();
    
    // Initialize custom cursor
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
    
    // Add data science icons to skills section
    addDataScienceIcons();
    
    // Initialize pulse animations
    initPulseAnimations();
    
    // Initialize cyberpunk scroll effects
    initCyberpunkScrollEffects();
    
    // Initialize typewriter effect for subtitle
    setTimeout(() => {
        initTypewriterEffect();
    }, 4000);
    
    // Initialize motion graphics
    initMotionGraphics();
});

// Add CSS for section animations
const sectionStyles = document.createElement('style');
sectionStyles.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(sectionStyles);

// Performance optimization
window.addEventListener('resize', debounce(() => {
    // Reinitialize particles on resize
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}, 250));

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add data science icons to skills section
function addDataScienceIcons() {
    const skillItems = document.querySelectorAll('.skill-item');
    const icons = {
        'Python': '🐍',
        'Machine Learning': '🤖',
        'R Programming': '📊',
        'SQL': '🗃️',
        'HTML/CSS': '🌐',
        'JavaScript': '⚡',
        'React.js': '⚛️',
        'Node.js': '🟢',
        'Team Leadership': '👑',
        'Project Management': '📋',
        'Communication': '💬',
        'Problem Solving': '🧩'
    };
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-info span:first-child');
        if (skillName) {
            const name = skillName.textContent;
            if (icons[name]) {
                skillName.innerHTML = `<span class="data-icon">${icons[name]}</span> ${name}`;
            }
        }
    });
}

// Initialize pulse animations for interactive elements
function initPulseAnimations() {
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .nav-logo a');
    
    interactiveElements.forEach(element => {
        element.classList.add('pulse-glow');
        
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'pulse-glow-animation 0.5s ease-in-out';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'pulse-glow-animation 2s ease-in-out infinite';
        });
    });
}

// Enhanced scroll animations with cyberpunk effects
function initCyberpunkScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrollY > sectionTop - windowHeight && scrollY < sectionTop + sectionHeight) {
                section.style.boxShadow = `0 0 50px rgba(0, 255, 255, 0.${Math.floor(Math.random() * 3) + 1})`;
            }
        });
    });
}

// Typewriter effect for hero subtitle
function initTypewriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #00ffff';
        
        let i = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                subtitle.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 3500);
    }
}

// Create motion graphics lines
function initMotionGraphics() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 5; i++) {
        const motionLine = document.createElement('div');
        motionLine.className = 'motion-path';
        motionLine.style.left = Math.random() * 100 + '%';
        motionLine.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(motionLine);
    }
}