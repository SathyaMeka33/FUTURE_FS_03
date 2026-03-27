/* ============================================
   SkyFit Gym – JavaScript (Orange Theme)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ---------- Navbar Scroll ----------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 50);
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- Hamburger Menu ----------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll Animations ----------
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  animatedElements.forEach(el => observer.observe(el));

  // ---------- Counter Animation ----------
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  let counterStarted = false;

  function animateCounters() {
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      function updateCount() {
        current += increment;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target;
        }
      }
      updateCount();
    });
  }

  // Observe the stats bar
  const statsBar = document.querySelector('.hero-stats-bar');
  if (statsBar) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(statsBar);
  }

  // ---------- Testimonial Carousel ----------
  const track = document.getElementById('testimonialTrack');
  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;
    let autoPlayInterval;

    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() { goToSlide((currentSlide + 1) % cards.length); }
    function prevSlide() { goToSlide((currentSlide - 1 + cards.length) % cards.length); }

    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    function startAutoPlay() { autoPlayInterval = setInterval(nextSlide, 5000); }
    function resetAutoPlay() { clearInterval(autoPlayInterval); startAutoPlay(); }
    startAutoPlay();

    // Touch/swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide(); else prevSlide();
        resetAutoPlay();
      }
    }, { passive: true });
  }

  // ---------- BMI Calculator ----------
  const bmiForm = document.getElementById('bmiForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
      const weight = parseFloat(document.getElementById('bmiWeight').value);

      if (height > 0 && weight > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        document.getElementById('bmiValue').textContent = bmi;

        let category, message, color;
        if (bmi < 18.5) {
          category = 'Underweight'; message = 'Consider a nutrition plan. Our trainers can help!'; color = '#60a5fa';
        } else if (bmi < 25) {
          category = 'Normal Weight'; message = 'Great job! Maintain your fitness with us.'; color = '#4ade80';
        } else if (bmi < 30) {
          category = 'Overweight'; message = 'Our weight loss programs can help!'; color = '#fbbf24';
        } else {
          category = 'Obese'; message = 'Start your transformation today. We\'re here for you!'; color = '#f87171';
        }

        const cat = document.getElementById('bmiCategory');
        cat.textContent = category;
        cat.style.color = color;
        document.getElementById('bmiMessage').textContent = message;
        document.getElementById('bmiResult').style.display = 'block';
      }
    });
  }

  // ---------- Book Free Trial Modal ----------
  const bookTrialBtn = document.getElementById('bookTrialBtn');
  const trialModal = document.getElementById('trialModal');
  const modalClose = document.getElementById('modalClose');
  const trialForm = document.getElementById('trialForm');

  if (bookTrialBtn && trialModal) {
    bookTrialBtn.addEventListener('click', (e) => {
      e.preventDefault();
      trialModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', () => {
      trialModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    trialModal.addEventListener('click', (e) => {
      if (e.target === trialModal) {
        trialModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const trialDate = document.getElementById('trialDate');
    trialDate.setAttribute('min', new Date().toISOString().split('T')[0]);

    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      trialModal.classList.remove('active');
      document.body.style.overflow = '';
      showToast('Trial booked successfully! We\'ll contact you soon.');
      trialForm.reset();
    });
  }

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! We\'ll get back to you soon.');
      e.target.reset();
    });
  }

  // ---------- Registration Form ----------
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    // Auto-select plan from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    if (planParam) {
      const planRadio = registerForm.querySelector(`input[name="plan"][value="${planParam}"]`);
      if (planRadio) planRadio.checked = true;
    }

    // Set max date for DOB (must be at least 10 years old)
    const dobInput = document.getElementById('regDob');
    if (dobInput) {
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 10);
      dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate plan selection
      const planError = document.getElementById('planError');
      const selectedPlan = registerForm.querySelector('input[name="plan"]:checked');
      if (!selectedPlan) {
        planError.classList.add('visible');
        isValid = false;
      } else {
        planError.classList.remove('visible');
      }

      // Validate terms
      const termsError = document.getElementById('termsError');
      const termsChecked = document.getElementById('regTerms').checked;
      if (!termsChecked) {
        termsError.classList.add('visible');
        isValid = false;
      } else {
        termsError.classList.remove('visible');
      }

      // Validate required fields
      const requiredFields = registerForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (field.type === 'checkbox' || field.type === 'radio') return;
        if (!field.value.trim()) {
          field.style.borderColor = '#f87171';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      // Validate email format
      const email = document.getElementById('regEmail');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#f87171';
        isValid = false;
      }

      if (!isValid) {
        showToast('Please fill in all required fields correctly.');
        return;
      }

      // Success
      const planNames = { monthly: 'Monthly – ₹1,000/month', quarterly: 'Quarterly – ₹2,500/3 months', yearly: 'Yearly – ₹8,000/year' };
      const name = document.getElementById('regName').value;
      const planValue = selectedPlan.value;

      // Show success state
      registerForm.style.display = 'none';
      const successEl = document.getElementById('registerSuccess');
      const detailsEl = document.getElementById('successDetails');
      detailsEl.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Plan:</strong> ${planNames[planValue] || planValue}</p>
        <p><strong>Email:</strong> ${email.value}</p>
      `;
      successEl.style.display = 'block';

      // Scroll to top of success
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Clear error styles on input
    registerForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });

    // Clear plan error when plan is selected
    registerForm.querySelectorAll('input[name="plan"]').forEach(radio => {
      radio.addEventListener('change', () => {
        document.getElementById('planError').classList.remove('visible');
      });
    });

    // Clear terms error when checkbox is checked
    const termsCheckbox = document.getElementById('regTerms');
    if (termsCheckbox) {
      termsCheckbox.addEventListener('change', () => {
        if (termsCheckbox.checked) {
          document.getElementById('termsError').classList.remove('visible');
        }
      });
    }
  }

  // ---------- Toast ----------
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i>${message}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ---------- Particles (subtle orange) ----------
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * 5;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -10px;
        background: rgba(243, 97, 0, ${Math.random() * 0.4 + 0.2});
        box-shadow: 0 0 ${size * 2}px rgba(243, 97, 0, 0.15);
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      particleContainer.appendChild(particle);
      setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }

    setInterval(createParticle, 600);
    for (let i = 0; i < 10; i++) setTimeout(createParticle, i * 200);
  }

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ---------- Diet Page: Tab Switching ----------
  const dietTabs = document.querySelectorAll('.diet-tab');
  if (dietTabs.length > 0) {
    dietTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dietTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.diet-tab-content').forEach(c => c.classList.remove('active'));
        const targetTab = document.getElementById('tab-' + tab.dataset.tab);
        if (targetTab) targetTab.classList.add('active');
      });
    });
  }

  // ---------- Diet Page: Food Calorie Finder ----------
  const foodDatabase = {
    egg: { cal: 155, icon: 'fa-egg', type: 'Protein' },
    rice: { cal: 130, icon: 'fa-bowl-rice', type: 'Carbs' },
    chicken: { cal: 239, icon: 'fa-drumstick-bite', type: 'Protein' },
    paneer: { cal: 265, icon: 'fa-cheese', type: 'Protein' },
    milk: { cal: 42, icon: 'fa-glass-water', type: 'Protein' },
    banana: { cal: 89, icon: 'fa-apple-whole', type: 'Carbs' },
    apple: { cal: 52, icon: 'fa-apple-whole', type: 'Carbs' },
    oats: { cal: 389, icon: 'fa-seedling', type: 'Carbs' },
    chapati: { cal: 297, icon: 'fa-bread-slice', type: 'Carbs' },
    dal: { cal: 116, icon: 'fa-bowl-food', type: 'Protein' },
    almonds: { cal: 576, icon: 'fa-seedling', type: 'Fats' },
    ghee: { cal: 900, icon: 'fa-droplet', type: 'Fats' },
    curd: { cal: 98, icon: 'fa-bowl-food', type: 'Protein' },
    potato: { cal: 77, icon: 'fa-seedling', type: 'Carbs' },
    fish: { cal: 206, icon: 'fa-fish', type: 'Protein' },
    broccoli: { cal: 34, icon: 'fa-leaf', type: 'Fiber' },
    spinach: { cal: 23, icon: 'fa-leaf', type: 'Fiber' },
    bread: { cal: 265, icon: 'fa-bread-slice', type: 'Carbs' },
    peanuts: { cal: 567, icon: 'fa-seedling', type: 'Fats' },
    honey: { cal: 304, icon: 'fa-jar', type: 'Carbs' },
    idli: { cal: 58, icon: 'fa-bowl-food', type: 'Carbs' },
    dosa: { cal: 168, icon: 'fa-bowl-food', type: 'Carbs' },
    butter: { cal: 717, icon: 'fa-droplet', type: 'Fats' },
    cheese: { cal: 402, icon: 'fa-cheese', type: 'Fats' },
    tofu: { cal: 76, icon: 'fa-seedling', type: 'Protein' },
    yogurt: { cal: 59, icon: 'fa-bowl-food', type: 'Protein' },
    sweet_potato: { cal: 86, icon: 'fa-seedling', type: 'Carbs' },
    avocado: { cal: 160, icon: 'fa-seedling', type: 'Fats' },
    mushroom: { cal: 22, icon: 'fa-seedling', type: 'Fiber' },
    watermelon: { cal: 30, icon: 'fa-apple-whole', type: 'Carbs' }
  };

  const foodSearch = document.getElementById('foodSearch');
  const foodSearchBtn = document.getElementById('foodSearchBtn');
  const foodSuggestions = document.getElementById('foodSuggestions');
  const calorieResult = document.getElementById('calorieResult');
  const calorieNotFound = document.getElementById('calorieNotFound');
  const popularFoods = document.getElementById('popularFoods');

  if (foodSearch) {
    // Populate popular foods
    if (popularFoods) {
      const popularList = ['chicken', 'egg', 'rice', 'paneer', 'oats', 'banana', 'milk', 'dal', 'almonds', 'fish'];
      popularList.forEach(food => {
        const item = foodDatabase[food];
        if (!item) return;
        const div = document.createElement('div');
        div.className = 'popular-food-item';
        div.innerHTML = `<span class="food-name">${food.replace('_', ' ')}</span><span class="food-cal">${item.cal} kcal</span>`;
        div.addEventListener('click', () => {
          foodSearch.value = food.replace('_', ' ');
          searchFood(food.replace('_', ' '));
        });
        popularFoods.appendChild(div);
      });
    }

    // Auto suggestions
    foodSearch.addEventListener('input', () => {
      const query = foodSearch.value.trim().toLowerCase();
      foodSuggestions.innerHTML = '';
      if (query.length < 1) { foodSuggestions.classList.remove('visible'); return; }

      const matches = Object.keys(foodDatabase).filter(f => f.includes(query));
      if (matches.length > 0) {
        matches.slice(0, 6).forEach(food => {
          const div = document.createElement('div');
          div.className = 'food-suggestion-item';
          div.innerHTML = `${food.replace('_', ' ')} <span>${foodDatabase[food].cal} kcal</span>`;
          div.addEventListener('click', () => {
            foodSearch.value = food.replace('_', ' ');
            foodSuggestions.classList.remove('visible');
            searchFood(food.replace('_', ' '));
          });
          foodSuggestions.appendChild(div);
        });
        foodSuggestions.classList.add('visible');
      } else {
        foodSuggestions.classList.remove('visible');
      }
    });

    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.calorie-search-box')) {
        foodSuggestions.classList.remove('visible');
      }
    });

    foodSearchBtn.addEventListener('click', () => searchFood(foodSearch.value));
    foodSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchFood(foodSearch.value);
    });

    function searchFood(query) {
      const food = query.trim().toLowerCase().replace(' ', '_');
      foodSuggestions.classList.remove('visible');
      calorieResult.style.display = 'none';
      calorieNotFound.style.display = 'none';

      if (!food) return;

      if (foodDatabase[food]) {
        const data = foodDatabase[food];
        document.getElementById('calorieFood').textContent = food.replace('_', ' ');
        document.getElementById('calorieValue').textContent = data.cal;
        calorieResult.style.display = 'flex';

        // Animate bar (max 900 kcal scale)
        const percentage = Math.min((data.cal / 900) * 100, 100);
        setTimeout(() => {
          document.getElementById('calorieBar').style.width = percentage + '%';
        }, 100);
      } else {
        calorieNotFound.style.display = 'flex';
      }
    }
  }

  // ---------- Diet Page: Calorie Calculator ----------
  const calorieCalcForm = document.getElementById('calorieCalcForm');
  if (calorieCalcForm) {
    calorieCalcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('calcWeight').value);
      const height = parseFloat(document.getElementById('calcHeight').value);
      const age = parseFloat(document.getElementById('calcAge').value);
      const goal = document.getElementById('calcGoal').value;

      if (!weight || !height || !age || !goal) {
        showToast('Please fill in all fields.');
        return;
      }

      // Mifflin-St Jeor Equation (male approximation)
      let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      let tdee = bmr * 1.55; // moderate activity
      let dailyCal;

      if (goal === 'loss') {
        dailyCal = Math.round(tdee - 500);
      } else if (goal === 'gain') {
        dailyCal = Math.round(tdee + 400);
      } else {
        dailyCal = Math.round(tdee);
      }

      const protein = Math.round(dailyCal * 0.3 / 4);
      const carbs = Math.round(dailyCal * 0.5 / 4);
      const fats = Math.round(dailyCal * 0.2 / 9);

      // Show result
      document.getElementById('calcEmpty').style.display = 'none';
      const filled = document.getElementById('calcFilled');
      filled.style.display = 'block';

      // Animate calorie number
      const calEl = document.getElementById('calcCalories');
      let current = 0;
      const increment = dailyCal / 60;
      function countUp() {
        current += increment;
        if (current < dailyCal) {
          calEl.textContent = Math.floor(current);
          requestAnimationFrame(countUp);
        } else {
          calEl.textContent = dailyCal;
        }
      }
      countUp();

      // Animate circle
      const circle = document.getElementById('calcCircle');
      const circumference = 2 * Math.PI * 52; // r=52
      const maxCal = 4000;
      const offset = circumference - (Math.min(dailyCal / maxCal, 1) * circumference);
      setTimeout(() => { circle.style.strokeDashoffset = offset; }, 100);

      // Set macro values
      document.getElementById('calcProtein').textContent = protein + 'g';
      document.getElementById('calcCarbs').textContent = carbs + 'g';
      document.getElementById('calcFats').textContent = fats + 'g';

      const goalLabels = { loss: 'Weight Loss Target', gain: 'Weight Gain Target', maintain: 'Maintenance Intake' };
      document.getElementById('calcGoalLabel').textContent = goalLabels[goal] || 'Your Daily Intake';
    });
  }

  // ---------- Diet Page: Smart Suggestions ----------
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  const suggestionGrid = document.getElementById('suggestionGrid');

  if (suggestionBtns.length > 0 && suggestionGrid) {
    const suggestions = {
      loss: [
        { name: 'Broccoli', cal: 34, icon: 'fa-leaf', type: 'Low Cal' },
        { name: 'Spinach', cal: 23, icon: 'fa-leaf', type: 'Low Cal' },
        { name: 'Egg Whites', cal: 52, icon: 'fa-egg', type: 'High Protein' },
        { name: 'Mushroom', cal: 22, icon: 'fa-seedling', type: 'Low Cal' },
        { name: 'Watermelon', cal: 30, icon: 'fa-apple-whole', type: 'Low Cal' },
        { name: 'Green Tea', cal: 1, icon: 'fa-mug-hot', type: 'Zero Cal' },
        { name: 'Tofu', cal: 76, icon: 'fa-seedling', type: 'High Protein' },
        { name: 'Cucumber', cal: 15, icon: 'fa-seedling', type: 'Low Cal' }
      ],
      gain: [
        { name: 'Almonds', cal: 576, icon: 'fa-seedling', type: 'Calorie Dense' },
        { name: 'Peanut Butter', cal: 588, icon: 'fa-jar', type: 'Calorie Dense' },
        { name: 'Ghee', cal: 900, icon: 'fa-droplet', type: 'Calorie Dense' },
        { name: 'Banana Shake', cal: 250, icon: 'fa-blender', type: 'Quick Fuel' },
        { name: 'Cheese', cal: 402, icon: 'fa-cheese', type: 'Calorie Dense' },
        { name: 'Chicken', cal: 239, icon: 'fa-drumstick-bite', type: 'High Protein' },
        { name: 'Avocado', cal: 160, icon: 'fa-seedling', type: 'Healthy Fats' },
        { name: 'Dry Fruits Mix', cal: 520, icon: 'fa-seedling', type: 'Calorie Dense' }
      ],
      maintain: [
        { name: 'Brown Rice', cal: 111, icon: 'fa-bowl-rice', type: 'Balanced' },
        { name: 'Dal', cal: 116, icon: 'fa-bowl-food', type: 'Balanced' },
        { name: 'Curd', cal: 98, icon: 'fa-bowl-food', type: 'Balanced' },
        { name: 'Fish', cal: 206, icon: 'fa-fish', type: 'Lean Protein' },
        { name: 'Sweet Potato', cal: 86, icon: 'fa-seedling', type: 'Balanced' },
        { name: 'Egg', cal: 155, icon: 'fa-egg', type: 'Balanced' },
        { name: 'Oats', cal: 389, icon: 'fa-seedling', type: 'Balanced' },
        { name: 'Yogurt', cal: 59, icon: 'fa-bowl-food', type: 'Balanced' }
      ]
    };

    function renderSuggestions(goal) {
      suggestionGrid.innerHTML = '';
      const items = suggestions[goal] || [];
      items.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'suggestion-card';
        card.style.animationDelay = (i * 0.06) + 's';
        card.innerHTML = `
          <div class="suggestion-card-icon"><i class="fas ${item.icon}"></i></div>
          <h4>${item.name}</h4>
          <div class="suggestion-cal">${item.cal} kcal / 100g</div>
          <div class="suggestion-type">${item.type}</div>
        `;
        suggestionGrid.appendChild(card);
      });
    }

    // Initial render
    renderSuggestions('loss');

    suggestionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        suggestionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSuggestions(btn.dataset.goal);
      });
    });
  }

  // ---------- Diet Page: Macro Bar Animation ----------
  const macroCards = document.querySelectorAll('.macro-card');
  if (macroCards.length > 0) {
    const macroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          macroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    macroCards.forEach(card => macroObserver.observe(card));
  }

  onScroll();
});

