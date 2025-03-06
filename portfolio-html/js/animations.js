// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill bar animations
    initSkillBars();
    
    // Initialize project card hover effects
    initProjectCards();
    
    // Initialize typing animation if element exists
    if (document.querySelector('.typing-animation')) {
        initTypingAnimation();
    }
});

// Scroll animations functionality
function initScrollAnimations() {
    // Get all elements with reveal classes
    const revealLeftElements = document.querySelectorAll('.reveal-left');
    const revealRightElements = document.querySelectorAll('.reveal-right');
    const revealTopElements = document.querySelectorAll('.reveal-top');
    const revealBottomElements = document.querySelectorAll('.reveal-bottom');
    const revealItems = document.querySelectorAll('.reveal-item');
    
    // Set staggered delays for reveal items
    setStaggeredDelays(revealItems);
    
    // Function to check and activate elements on scroll
    function checkScroll() {
        activateElementsOnScroll(revealLeftElements, 'active');
        activateElementsOnScroll(revealRightElements, 'active');
        activateElementsOnScroll(revealTopElements, 'active');
        activateElementsOnScroll(revealBottomElements, 'active');
        activateElementsOnScroll(revealItems, 'active');
    }
    
    // Check elements on initial load
    setTimeout(checkScroll, 100);
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
}

// Skill bars animation functionality
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isInViewport(bar) && !bar.style.width) {
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 200);
            }
        });
    }
    
    // Animate skill bars on initial load
    setTimeout(animateSkillBars, 500);
    
    // Animate skill bars on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Project cards hover effects
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}

// Typing animation functionality
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';
        
        let i = 0;
        const speed = 50; // typing speed in milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing animation when element is in viewport
        function checkTyping() {
            if (isInViewport(element) && element.textContent === '') {
                typeWriter();
                window.removeEventListener('scroll', checkTyping);
            }
        }
        
        // Check on initial load
        setTimeout(checkTyping, 500);
        
        // Check on scroll
        window.addEventListener('scroll', checkTyping);
    });
}

// Parallax effect for background elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

// Animate numbers counting up
function initCounterAnimation() {
    const counterElements = document.querySelectorAll('.counter');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    function checkCounters() {
        counterElements.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Check counters on initial load
    setTimeout(checkCounters, 500);
    
    // Check counters on scroll
    window.addEventListener('scroll', checkCounters);
}

// Initialize custom cursor if enabled
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-active');
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Initialize image lazy loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        function lazyLoad() {
            lazyImages.forEach(img => {
                if (isInViewport(img)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                }
            });
        }
        
        // Check on initial load
        setTimeout(lazyLoad, 500);
        
        // Check on scroll
        window.addEventListener('scroll', lazyLoad);
    }
} 