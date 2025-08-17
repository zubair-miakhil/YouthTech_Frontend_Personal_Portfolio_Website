// script.js - Portfolio interactivity for Zubair Miakhil

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('open');
});

// Smooth scrolling for nav links
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile nav after click
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Section fade/slide-in on scroll using Intersection Observer
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});
sections.forEach(section => {
  observer.observe(section);
});

// Animate skill progress bars when Skills section enters viewport
const skillsSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress-bar');
const animateSkills = () => {
  progressBars.forEach(bar => {
    const percent = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress', percent + '%');
    bar.classList.add('animated');
    bar.querySelector && (bar.querySelector('::after').style.width = percent + '%');
    // Fallback for browsers: animate width via JS
    bar.querySelector && (bar.querySelector('::after').style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)');
    bar.style.position = 'relative';
    let fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.position = 'absolute';
    fill.style.left = 0;
    fill.style.top = 0;
    fill.style.height = '100%';
    fill.style.width = '0';
    fill.style.background = 'linear-gradient(90deg, #ff6f61, #ffb88c)';
    fill.style.borderRadius = '5px';
    fill.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
    bar.appendChild(fill);
    setTimeout(() => {
      fill.style.width = percent + '%';
    }, 200);
  });
};
let skillsAnimated = false;
const skillsObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      animateSkills();
      skillsAnimated = true;
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillsObs.observe(skillsSection);

// Optional: Simple contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    let valid = true;
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!name) valid = false;
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) valid = false;
    if (!message) valid = false;
    if (!valid) {
      e.preventDefault();
      alert('Please fill in all fields with a valid email.');
    }
  });
} 