function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
}

function initNavbarScroll() {
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

function initProductFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  
  if (filterTabs.length > 0 && productCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

function initCaseFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const caseCards = document.querySelectorAll('.case-card');
  
  if (filterTabs.length > 0 && caseCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const industry = this.getAttribute('data-industry');
        
        caseCards.forEach(card => {
          const cardIndustry = card.getAttribute('data-industry');
          
          if (industry === 'all' || cardIndustry === industry) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

function showFieldError(field, message) {
  const formGroup = field.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  
  if (formGroup && errorElement) {
    formGroup.classList.add('error');
    errorElement.textContent = message;
  }
}

function clearFieldError(field) {
  const formGroup = field.closest('.form-group');
  
  if (formGroup) {
    formGroup.classList.remove('error');
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validateForm(data) {
  const requiredFields = ['name', 'email', 'phone', 'message'];
  let isValid = true;
  
  requiredFields.forEach(field => {
    const input = document.querySelector(`[name="${field}"]`);
    if (!data[field] || !data[field].trim()) {
      showFieldError(input, '此字段为必填项');
      isValid = false;
    }
  });
  
  const emailInput = document.querySelector('[name="email"]');
  if (data.email && !validateEmail(data.email)) {
    showFieldError(emailInput, '请输入有效的邮箱地址');
    isValid = false;
  }
  
  const phoneInput = document.querySelector('[name="phone"]');
  if (data.phone && !validatePhone(data.phone)) {
    showFieldError(phoneInput, '请输入有效的手机号码');
    isValid = false;
  }
  
  return isValid;
}

function initContactForm() {
  const form = document.querySelector('.contact-form form');
  
  if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        clearFieldError(this);
      });
      
      input.addEventListener('blur', function() {
        if (this.value.trim()) {
          if (this.name === 'email' && !validateEmail(this.value)) {
            showFieldError(this, '请输入有效的邮箱地址');
          } else if (this.name === 'phone' && !validatePhone(this.value)) {
            showFieldError(this, '请输入有效的手机号码');
          }
        }
      });
    });
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      if (validateForm(data)) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          alert('感谢您的留言！我们会尽快与您联系。');
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + suffix;
            setTimeout(updateCounter, stepTime);
          } else {
            counter.textContent = target + suffix;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function initDynamicYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initProductFiltering();
  initCaseFiltering();
  initContactForm();
  initCounterAnimation();
  initDynamicYear();
});
