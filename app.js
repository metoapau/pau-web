// PAÜ Medya - Öğrenci Portalı JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
    // Mobil menüde linke tıklanınca kapat
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
  }

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (!link) return;
      if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // 2. Events Data & Filter Logic
  const events = [
    {
      id: 1,
      title: 'PAÜ Bahar Şenlikleri & Açılış Konseri',
      category: 'konser',
      categoryName: '🎵 Konser',
      date: '15 Mayıs 2026',
      location: 'Göl Bahçe Etkinlik Alanı',
      countdown: '12 Gün Kaldı'
    },
    {
      id: 2,
      title: 'Yapay Zeka ve Yazılım Zirvesi 2026',
      category: 'akademik',
      categoryName: '🎓 Akademik',
      date: '20 Nisan 2026',
      location: 'PAÜ Kongre Kültür Merkezi - Salon A',
      countdown: '5 Gün Kaldı'
    },
    {
      id: 3,
      title: 'Fakülteler Arası Halı Saha Turnuvası',
      category: 'spor',
      categoryName: '⚽ Spor',
      date: '25 Nisan 2026',
      location: 'PAÜ Spor Kompleksi Sahaları',
      countdown: '10 Gün Kaldı'
    },
    {
      id: 4,
      title: 'PAÜ Tiyatro Kulübü Sahnesi: "Kampüs Halleri"',
      category: 'kulup',
      categoryName: '🎭 Kulüp',
      date: '18 Nisan 2026',
      location: 'Hasan Kasapoğlu Kültür Merkezi',
      countdown: '3 Gün Kaldı'
    },
    {
      id: 5,
      title: 'Denizli Doğa Yürüyüşü & Teleferik Gezisi',
      category: 'kulup',
      categoryName: '🌲 Kulüp',
      date: '28 Nisan 2026',
      location: 'Bağbaşı Yaylası',
      countdown: '13 Gün Kaldı'
    },
    {
      id: 6,
      title: 'Girişimcilik ve Kariyer Günleri',
      category: 'akademik',
      categoryName: '🎓 Akademik',
      date: '2 Mayıs 2026',
      location: 'İİBF Konferans Salonu',
      countdown: '17 Gün Kaldı'
    }
  ];

  const eventsGrid = document.getElementById('eventsGrid');
  const eventFilters = document.querySelectorAll('.event-filter');

  function renderEvents(filterCategory = 'all') {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = '';

    const filtered = filterCategory === 'all'
      ? events
      : events.filter(e => e.category === filterCategory);

    if (filtered.length === 0) {
      eventsGrid.innerHTML = `<p style="color: var(--text-muted); padding: 2rem 0;">Bu kategoride henüz etkinlik yok.</p>`;
      return;
    }

    filtered.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card glass glass-hover';
      card.innerHTML = `
        <span class="event-category-tag bio-tag tag-cyan">${event.categoryName}</span>
        <div class="event-date-box">
          <i class="far fa-calendar-alt"></i> ${event.date}
        </div>
        <h3 class="event-title">${event.title}</h3>
        <div class="event-location">
          <i class="fas fa-map-marker-alt"></i> ${event.location}
        </div>
        <div class="event-footer">
          <span style="font-size: 0.82rem; color: var(--text-dim);">
            <i class="far fa-clock"></i> ${event.countdown}
          </span>
          <button class="btn-event-join" onclick="showToast('Etkinlik takviminize eklendi! 🎉')">Takvime Ekle</button>
        </div>
      `;
      eventsGrid.appendChild(card);
    });
  }

  renderEvents();

  eventFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      eventFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents(btn.getAttribute('data-filter'));
    });
  });

  // 3. Like Logic
  window.toggleLike = function(btn) {
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);

    if (btn.classList.contains('liked')) {
      btn.classList.remove('liked');
      count--;
      btn.querySelector('i').className = 'far fa-heart';
    } else {
      btn.classList.add('liked');
      count++;
      btn.querySelector('i').className = 'fas fa-heart';
      showToast('Gönderiyi beğendiniz! ❤️');
    }
    countSpan.textContent = count;
  };

  // 4. Cafeteria Menu
  const menuData = {
    pazartesi: { soup: 'Mercimek Çorbası', main: 'İzmir Köfte & Pirinç Pilavı', side: 'Mevsim Salatası', dessert: 'Kemalpaşa Tatlısı', calories: '890 kcal' },
    sali:      { soup: 'Ezogelin Çorbası', main: 'Tavuk Sote & Bulgur Pilavı',  side: 'Cacık',           dessert: 'Meyve (Elma/Muz)',   calories: '820 kcal' },
    carsamba:  { soup: 'Yayla Çorbası',    main: 'Kuru Fasulye & Şehriyeli Pilav', side: 'Turşu',         dessert: 'Sütlaç',             calories: '910 kcal' },
    persembe:  { soup: 'Domates Çorbası',  main: 'Fırın Tavuk & Patates Püresi', side: 'Akdeniz Salatası', dessert: 'İrmik Helvası',    calories: '850 kcal' },
    cuma:      { soup: 'Tarhana Çorbası',  main: 'Tas Kebabı & Makarna',         side: 'Komposto',        dessert: 'Baklava',            calories: '950 kcal' }
  };

  const foodSoup    = document.getElementById('foodSoup');
  const foodMain    = document.getElementById('foodMain');
  const foodSide    = document.getElementById('foodSide');
  const foodDessert = document.getElementById('foodDessert');
  const totalCal    = document.getElementById('totalCal');

  function updateMenu(day) {
    const m = menuData[day];
    if (!m) return;
    if (foodSoup)    foodSoup.textContent    = m.soup;
    if (foodMain)    foodMain.textContent    = m.main;
    if (foodSide)    foodSide.textContent    = m.side;
    if (foodDessert) foodDessert.textContent = m.dessert;
    if (totalCal)    totalCal.textContent    = m.calories;
  }

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateMenu(btn.getAttribute('data-day'));
    });
  });

  // 5. Campus Guide Tab Switcher
  const guideBtns = document.querySelectorAll('.guide-nav-btn');
  const guideTabs = document.querySelectorAll('.guide-tab-content');

  guideBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      guideBtns.forEach(b => b.classList.remove('active'));
      guideTabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  // 6. Confession Modal
  const confessModal    = document.getElementById('confessModal');
  const openConfessBtn  = document.getElementById('openConfessModal');
  const closeConfessBtn = document.getElementById('closeConfessModal');
  const confessForm     = document.getElementById('confessForm');

  if (openConfessBtn && confessModal) {
    openConfessBtn.addEventListener('click', e => {
      e.preventDefault();
      confessModal.classList.add('active');
    });
  }
  if (closeConfessBtn && confessModal) {
    closeConfessBtn.addEventListener('click', () => confessModal.classList.remove('active'));
  }
  if (confessModal) {
    confessModal.addEventListener('click', e => {
      if (e.target === confessModal) confessModal.classList.remove('active');
    });
  }
  if (confessForm) {
    confessForm.addEventListener('submit', e => {
      e.preventDefault();
      confessModal.classList.remove('active');
      confessForm.reset();
      showToast('Mesajınız PAÜ Medya ekibine iletildi! 🎉');
    });
  }

  // 7. Toast Helper
  window.showToast = function(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--primary);"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

});
