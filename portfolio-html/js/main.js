// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the preloader
    initPreloader();
    
    // Initialize the mobile menu
    initMobileMenu();
    
    // Initialize the scroll events
    initScrollEvents();
    
    // Initialize the theme toggle
    initThemeToggle();
    
    // Initialize the back to top button
    initBackToTop();
    
    // Set the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after the page has loaded
    window.addEventListener('load', function() {
        preloader.classList.add('hide');
        
        // Remove preloader from DOM after animation completes
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu when the hamburger icon is clicked
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when a nav link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Scroll events functionality
function initScrollEvents() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    // Add scrolled class to header when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Trigger scroll event on page load to set initial state
    window.dispatchEvent(new Event('scroll'));
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme when the theme toggle is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update the theme icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    const scrollThreshold = 300;
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Utility function to add active class to elements when they enter the viewport
function activateElementsOnScroll(elements, activeClass) {
    elements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains(activeClass)) {
            element.classList.add(activeClass);
        }
    });
}

// Utility function to set staggered animation delays
function setStaggeredDelays(elements, baseDelay = 0.1) {
    elements.forEach((element, index) => {
        element.style.setProperty('--item-index', index);
    });
} 