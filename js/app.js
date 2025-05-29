document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const primaryNav = document.querySelector('.primary-navigation');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const visibility = primaryNav.getAttribute('data-visible');
      
      if (visibility === 'true') {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = ''; // Enable scrolling
      } else {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      }
    });
  }
  
  // Close mobile nav when clicking on a nav link
  const navLinks = document.querySelectorAll('.primary-navigation a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (primaryNav.getAttribute('data-visible') === 'true') {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.question-card, .supporter-card, .mission-content, .hero-content').forEach(el => {
    observer.observe(el);
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});