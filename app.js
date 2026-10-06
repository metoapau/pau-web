// PAÜ Medya - Öğrenci Portalı JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar Scroll & Mobile ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks     = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
    navLinks.querySelectorAll('.nav-link').forEach(l =>
      l.addEventListener('click', () => navLinks.classList.remove('mobile-open'))
    );
  }

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 130;
    sections.forEach(sec => {
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (!link) return;
      if (sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // ── 2. Gerçek PAÜ Etkinlikleri ─────────────────────────────────
  const events = [
    {
      id: 1,
      title: 'PAÜ Güz Şenliği – Ana Kampüs',
      category: 'festival',
      categoryLabel: '🎉 Şenlik',
      categoryClass: 'tag-cyan',
      date: '28 Eyl – 2 Eki 2026',
      location: 'Kınıklı Kampüsü, Göl Bahçe',
      desc: '100\'den fazla öğrenci topluluğu stantları, karaoke, spor etkinlikleri, sahne programları ve konserler.',
      badge: 'Devam Ediyor',
      badgeClass: 'badge-live-soft',
      link: 'https://www.pau.edu.tr'
    },
    {
      id: 2,
      title: 'PAÜ Güz Şenliği – İlçe Kampüsleri',
      category: 'festival',
      categoryLabel: '🎉 Şenlik',
      categoryClass: 'tag-purple',
      date: '5 – 14 Eki 2026',
      location: 'Sarayköy, Çivril, Honaz, Bozkurt, Bekilli',
      desc: 'Öğrenci topluluğu tanıtım stantları, halk oyunları, müzik dinletileri ve konserler. Çivril\'de Elifcan Yıldız sahnede!',
      badge: 'Bugün',
      badgeClass: 'badge-today',
      link: 'https://www.pau.edu.tr'
    },
    {
      id: 3,
      title: 'Elifcan Yıldız Konseri – Çivril',
      category: 'konser',
      categoryLabel: '🎵 Konser',
      categoryClass: 'tag-rose',
      date: '6 Ekim 2026',
      location: 'PAÜ Çivril Yerleşkesi',
      desc: 'Rock Topluluğu açılış performansı ve ardından Elifcan Yıldız\'ın özel konseri. Ücretsiz ve herkese açık!',
      badge: 'Ücretsiz',
      badgeClass: 'badge-free',
      link: 'https://www.pau.edu.tr'
    },
    {
      id: 4,
      title: '"Terörsüz Türkiye" Ekonomi Konferansı',
      category: 'akademik',
      categoryLabel: '🎓 Akademik',
      categoryClass: 'tag-amber',
      date: 'Ekim 2026',
      location: 'PAÜ Kongre Kültür Merkezi',
      desc: '"Ekonomik ve Mali Etkileriyle Terörsüz Türkiye" temalı akademik konferans. Kayıt için pau.edu.tr.',
      badge: 'Akademik',
      badgeClass: 'badge-academic',
      link: 'https://www.pau.edu.tr'
    },
    {
      id: 5,
      title: 'COP31 Gönüllülük Farkındalık Etkinliği',
      category: 'kulup',
      categoryLabel: '🌱 Topluluk',
      categoryClass: 'tag-emerald',
      date: 'Ekim 2026',
      location: 'Kınıklı Kampüsü',
      desc: 'İklim değişikliği ve çevre bilinciyle ilgili gönüllük etkinliği. PAÜ Sürdürülebilirlik Topluluğu organizasyonuyla.',
      badge: 'Gönüllü',
      badgeClass: 'badge-free',
      link: 'https://www.pau.edu.tr'
    },
    {
      id: 6,
      title: 'Lisansüstü Program Başvuruları',
      category: 'akademik',
      categoryLabel: '🎓 Akademik',
      categoryClass: 'tag-amber',
      date: 'Ekim 2026',
      location: 'pau.edu.tr / Pusula Sistemi',
      desc: '2025-2026 güz dönemi lisansüstü program başvuruları ve değerlendirme sonuçları açıklandı.',
      badge: 'Son Başvuru',
      badgeClass: 'badge-today',
      link: 'https://www.pau.edu.tr'
    }
  ];

  const eventsGrid  = document.getElementById('eventsGrid');
  const eventFilters = document.querySelectorAll('.event-filter');

  function renderEvents(cat = 'all') {
    if (!eventsGrid) return;
    const filtered = cat === 'all' ? events : events.filter(e => e.category === cat);
    eventsGrid.innerHTML = '';

    if (!filtered.length) {
      eventsGrid.innerHTML = `<p style="color:var(--text-muted);padding:2rem 0">Bu kategoride henüz etkinlik yok.</p>`;
      return;
    }

    filtered.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'event-card glass glass-hover';
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;margin-bottom:.85rem;">
          <span class="bio-tag ${ev.categoryClass}">${ev.categoryLabel}</span>
          <span class="event-badge ${ev.badgeClass}">${ev.badge}</span>
        </div>
        <div class="event-date-box"><i class="far fa-calendar-alt"></i> ${ev.date}</div>
        <h3 class="event-title">${ev.title}</h3>
        <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:.85rem;line-height:1.6">${ev.desc}</p>
        <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${ev.location}</div>
        <div class="event-footer">
          <a href="${ev.link}" target="_blank" class="btn-event-join" style="text-decoration:none">
            Detaylar <i class="fas fa-external-link-alt" style="font-size:.7rem"></i>
          </a>
        </div>`;
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

  // ── 3. Mizah & Kampüs Gündemi – Sıfırlanmış & Güncel ──────────
  const humorPosts = [
    {
      author: 'Kınıklı Kampüs Günlükleri',
      time: 'az önce',
      emoji: '🌬️',
      text: 'PAÜ Güz Şenliği\'nde açık hava konserine giderken Denizli rüzgarı sahneyi mi götürdü diye düşünmeden edemedim. Ses sistemi tutunmaya çalışıyor... 💨🎤',
      likes: 712
    },
    {
      author: 'Pusula Bilgi Sistemi Fan Kulübü',
      time: '12 dk önce',
      emoji: '💻',
      text: 'Lisansüstü başvuru sonuçları açıklandı. Pusula\'ya giriş yapan öğrenci sayısı: 18.000. Pusula\'nın kaldırdığı yük: şüpheli 🖥️💀',
      likes: 1204
    },
    {
      author: 'Göl Bahçe Kaz Derneği',
      time: '1 saat önce',
      emoji: '🪿',
      text: 'Güz Şenliği kurulumu başladı. Göl bahçedeki kazlar sahne kurulum ekibini denetliyor. Organizasyon tamamen onların kontrolünde, biz sadece izliyoruz.',
      likes: 988
    },
    {
      author: 'PAÜ Beslenme Araştırma Kulübü',
      time: '2 saat önce',
      emoji: '🍽️',
      text: 'Yemekhane öğle servisi 11:00\'de başlıyor. 10:58\'de kapıda kuyruk: 300 kişi. Öğrenci açlığı PAÜ\'nün en hızlı koordineli etkinliği olmaya devam ediyor.',
      likes: 856
    },
    {
      author: 'Kınıklı Meteoroloji Ajansı',
      time: '3 saat önce',
      emoji: '💨',
      text: 'Bugün hava tahmini: sabah saçlar dağınık, öğlen evrak uçuyor, akşam üstü Mühendislik önü için yatay yağmur uyarısı verildi. Şemsiye değil rüzgar sörfü tahtası öneririz.',
      likes: 1341
    },
    {
      author: 'COP31 PAÜ Gönüllüleri',
      time: '5 saat önce',
      emoji: '🌱',
      text: 'Bugün COP31 farkındalık etkinliğindeyiz. "İklimi kurtaralım" diyoruz ama önce PAÜ\'nün otobüs duraklarına çatı yapalım, yağmurda bitki gibi ıslanıyoruz 🌧️📋',
      likes: 623
    }
  ];

  const humorGrid = document.getElementById('humorGrid');
  if (humorGrid) {
    humorGrid.innerHTML = '';
    humorPosts.forEach((post, i) => {
      const card = document.createElement('div');
      card.className = 'humor-card glass glass-hover';
      card.innerHTML = `
        <div class="humor-header">
          <div class="humor-avatar-emoji">${post.emoji}</div>
          <div>
            <div class="humor-author">${post.author}</div>
            <div class="humor-time">${post.time}</div>
          </div>
        </div>
        <p class="humor-text">${post.text}</p>
        <div class="humor-actions">
          <button class="action-btn" onclick="toggleLike(this)">
            <i class="far fa-heart"></i> <span class="like-count">${post.likes}</span> Beğeni
          </button>
          <button class="action-btn" onclick="showToast('Bağlantı kopyalandı! 🔗')">
            <i class="far fa-share-square"></i> Paylaş
          </button>
        </div>`;
      humorGrid.appendChild(card);
    });
  }

  // ── 4. Like Logic ───────────────────────────────────────────────
  window.toggleLike = function(btn) {
    const span = btn.querySelector('.like-count');
    let n = parseInt(span.textContent);
    if (btn.classList.contains('liked')) {
      btn.classList.remove('liked');
      n--;
      btn.querySelector('i').className = 'far fa-heart';
    } else {
      btn.classList.add('liked');
      n++;
      btn.querySelector('i').className = 'fas fa-heart';
      showToast('Beğenildi! ❤️');
    }
    span.textContent = n;
  };

  // ── 5. Cafeteria Menu ───────────────────────────────────────────
  const menuData = {
    pazartesi: { soup:'Mercimek Çorbası', main:'İzmir Köfte & Pirinç Pilavı', side:'Mevsim Salatası',   dessert:'Kemalpaşa Tatlısı', cal:'890 kcal' },
    sali:      { soup:'Ezogelin Çorbası', main:'Tavuk Sote & Bulgur Pilavı',  side:'Cacık',             dessert:'Elma / Muz',         cal:'820 kcal' },
    carsamba:  { soup:'Yayla Çorbası',    main:'Kuru Fasulye & Şehriyeli Pilav', side:'Turşu',          dessert:'Sütlaç',             cal:'910 kcal' },
    persembe:  { soup:'Domates Çorbası',  main:'Fırın Tavuk & Patates Püresi',  side:'Akdeniz Salatası',dessert:'İrmik Helvası',      cal:'850 kcal' },
    cuma:      { soup:'Tarhana Çorbası',  main:'Tas Kebabı & Makarna',           side:'Komposto',        dessert:'Baklava',            cal:'950 kcal' }
  };

  // Bugünkü günü otomatik seç
  const days = ['pazar','pazartesi','sali','carsamba','persembe','cuma','cumartesi'];
  const todayKey = days[new Date().getDay()];
  const todayBtn = document.querySelector(`.day-btn[data-day="${todayKey}"]`);
  if (todayBtn) {
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
    todayBtn.classList.add('active');
    updateMenu(todayKey);
  }

  function updateMenu(day) {
    const m = menuData[day];
    if (!m) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('foodSoup', m.soup); set('foodMain', m.main);
    set('foodSide', m.side); set('foodDessert', m.dessert);
    set('totalCal', m.cal);
  }

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateMenu(btn.getAttribute('data-day'));
    });
  });

  // ── 6. Campus Guide Tabs ────────────────────────────────────────
  document.querySelectorAll('.guide-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.guide-nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.guide-tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  // ── 7. Confession Modal ─────────────────────────────────────────
  const confessModal = document.getElementById('confessModal');
  const openBtn      = document.getElementById('openConfessModal');
  const closeBtn     = document.getElementById('closeConfessModal');
  const form         = document.getElementById('confessForm');

  if (openBtn)  openBtn.addEventListener('click',  e => { e.preventDefault(); confessModal.classList.add('active'); });
  if (closeBtn) closeBtn.addEventListener('click', () => confessModal.classList.remove('active'));
  if (confessModal) confessModal.addEventListener('click', e => { if (e.target === confessModal) confessModal.classList.remove('active'); });
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    confessModal.classList.remove('active');
    form.reset();
    showToast('Mesajınız PAÜ Medya ekibine iletildi! 🎉');
  });

  // ── 8. Toast ────────────────────────────────────────────────────
  window.showToast = function(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--primary)"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  // ── 9. PAÜ İstatistik Sayaçları ─────────────────────────────────
  const counters = document.querySelectorAll('.stat-counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      let current  = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString('tr-TR') + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));

});
