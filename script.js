/**
 * BuildCraft Constructions - Main JavaScript
 * Design System Initialized
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('BuildCraft Constructions - Design system & scripts initialized.');

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Stats Bar Animation using Intersection Observer
  const statCards = document.querySelectorAll('.stat-anim');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Staggered animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statCards.forEach(card => {
    statsObserver.observe(card);
  });

  // Projects Carousel
  const projectsCarousel = document.getElementById('projects-carousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (projectsCarousel && prevBtn && nextBtn) {
    const updateCarouselButtons = () => {
      // Allow 1px tolerance for rounding issues
      prevBtn.disabled = projectsCarousel.scrollLeft <= 1;
      nextBtn.disabled = projectsCarousel.scrollLeft + projectsCarousel.clientWidth >= projectsCarousel.scrollWidth - 1;
    };

    projectsCarousel.addEventListener('scroll', updateCarouselButtons);
    // Initial check
    updateCarouselButtons();
    // Recheck on window resize
    window.addEventListener('resize', updateCarouselButtons);

    prevBtn.addEventListener('click', () => {
      const cardWidth = projectsCarousel.querySelector('.project-card').offsetWidth + 24; // width + gap
      projectsCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const cardWidth = projectsCarousel.querySelector('.project-card').offsetWidth + 24;
      projectsCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // Fade in left/right animations
  const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right');
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

  // Testimonials Carousel Dots
  const testCarousel = document.getElementById('testimonials-carousel');
  const testDots = document.querySelectorAll('.carousel-dots .dot');

  if (testCarousel && testDots.length > 0) {
    const updateActiveDot = () => {
      const scrollPos = testCarousel.scrollLeft;
      const cardWidth = testCarousel.querySelector('.testimonial-card').offsetWidth + 24;
      const activeIndex = Math.round(scrollPos / cardWidth);
      
      testDots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    testCarousel.addEventListener('scroll', updateActiveDot);

    testDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = testCarousel.querySelector('.testimonial-card').offsetWidth + 24;
        testCarousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      });
    });
  }

  // Testimonials Carousel Arrows
  const testPrevBtn = document.querySelector('.test-prev-btn');
  const testNextBtn = document.querySelector('.test-next-btn');
  
  if (testCarousel && testPrevBtn && testNextBtn) {
    const updateTestArrows = () => {
      testPrevBtn.disabled = testCarousel.scrollLeft <= 1;
      testNextBtn.disabled = testCarousel.scrollLeft + testCarousel.clientWidth >= testCarousel.scrollWidth - 1;
    };

    testCarousel.addEventListener('scroll', updateTestArrows);
    updateTestArrows();
    window.addEventListener('resize', updateTestArrows);

    testPrevBtn.addEventListener('click', () => {
      const cardWidth = testCarousel.querySelector('.testimonial-card').offsetWidth + 24;
      testCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    testNextBtn.addEventListener('click', () => {
      const cardWidth = testCarousel.querySelector('.testimonial-card').offsetWidth + 24;
      testCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formWrapper = document.getElementById('contact-form-wrapper');
  const successMessage = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (contactForm.checkValidity()) {
        formWrapper.style.display = 'none';
        successMessage.style.display = 'flex';
        contactForm.reset();
      }
    });
  }

  // Video Modal Logic
  const videoPlayBtn = document.querySelector('.hero-video-play');
  const videoModal = document.getElementById('video-modal');
  const videoModalOverlay = document.getElementById('video-modal-overlay');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoContainer = document.getElementById('video-container');

  if (videoPlayBtn && videoModal) {
    const youtubeIframe = '<iframe src="https://www.youtube.com/embed/4BzjUq921Y4?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>';

    const openVideoModal = () => {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      videoContainer.innerHTML = youtubeIframe;
    };

    const closeVideoModal = () => {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
      // Clear iframe after transition to stop playback immediately
      setTimeout(() => {
        videoContainer.innerHTML = '';
      }, 300);
    };

    videoPlayBtn.addEventListener('click', openVideoModal);
    videoModalClose.addEventListener('click', closeVideoModal);
    videoModalOverlay.addEventListener('click', closeVideoModal);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }
});
