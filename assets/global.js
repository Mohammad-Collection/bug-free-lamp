// Global JavaScript for the theme
class GlobalJS {
  constructor() {
    this.init();
  }
  
  init() {
    // Initialize any global functionality
    console.log('Reveal Image 3D Theme Loaded');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle loading states
    this.handleLoadingStates();
  }
  
  handleLoadingStates() {
    // Remove loading class when page is fully loaded
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GlobalJS();
});

// Utility function for smooth reveal animations
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-animate-on-scroll]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);