// PAÜ Medya - Öğrenci Platformu & Yaşam Rehberi
// JavaScript Fonksiyonları ve Etkileşim Yönetimi

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Tema Değiştirici (Dark / Light Mode) ────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('pau_theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="far fa-sun"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeToggle.innerHTML = isLight ? '<i class="far fa-sun"></i>' : '<i class="far fa-moon"></i>';
      localStorage.setItem('pau_theme', isLight ? 'light' : 'dark');
    });
  }

  // ── 2. Mobil Menü Yönetimi ──────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
    });

    mainNav.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('mobile-open'));
    });
  }

  // ── 3. Öğrenci İlanları Veri Havuzu & Render ───────────────────
  let listings = [
    {
      id: 1,
      cat: 'ev',
      catName: '🏠 Ev & Oda',
      tagColor: 'tag-coral',
      price: '3.500 TL / Ay',
      title: 'Kınıklı Çamlık civarı 3+1 daireye kadın ev arkadaşı',
      desc: 'Kampüse yürüyerek 10 dk. Bireysel oda mevcut, eşyalı, internet ve doğalgaz aktif. Düzenli ve öğrenci olması tercihimizdir.',
      faculty: 'İİBF İktisat 3. Sınıf',
      contact: '@irem_pau20',
      date: 'Bugün'
    },
    {
      id: 2,
      cat: 'kitap',
      catName: '📚 Ders Notu',
      tagColor: 'tag-cyan',
      price: 'Ücretsiz',
      title: 'Mühendislik Fizik 1 & Kalkülüs vize çıkmış soruları',
      desc: '1. Sınıf güz dönemi tüm çözümlü vize ve final soruları, ders özet notları PDF ve el yazısı fotokopi seti.',
      faculty: 'Bilgisayar Müh. 2. Sınıf',
      contact: '@mert_eng',
      date: 'Dün'
    },
    {
      id: 3,
      cat: 'ev',
      catName: '🏠 Ev & Oda',
      tagColor: 'tag-coral',
      price: '4.200 TL / Ay',
      title: 'Asmalıevler 2+1 eşyalı aparta erkek ev arkadaşı',
      desc: 'Fakülte kapısına 5 dakika. Kombili, tüm beyaz eşyalar var, temiz ve sessiz ortam arayan arkadaş arıyoruz.',
      faculty: 'Tıp Fakültesi Dönem 2',
      contact: '@canberk_pau',
      date: '2 gün önce'
    },
    {
      id: 4,
      cat: 'esya',
      catName: '🛋️ İkinci El',
      tagColor: 'tag-amber',
      price: '850 TL',
      title: 'Öğrenci çalışma masası ve ofis sandalyesi',
      desc: 'Mezuniyet sebebiyle satıyorum. Sağlam, deformesi yok, Kınıklı içi araçla teslimde yardımcı olunabilir.',
      faculty: 'Eğitim Fakültesi',
      contact: '@sedat_ogretmen',
      date: '3 gün önce'
    },
    {
      id: 5,
      cat: 'kitap',
      catName: '📚 Ders Notu',
      tagColor: 'tag-cyan',
      price: '1.100 TL',
      title: 'Tıp Fakültesi Sobotta Anatomi Atlası (2 Cilt)',
      desc: 'Çok temiz durumda, hiç çizilmemiş orijinal ciltli atlas seti.',
      faculty: 'Tıp Fakültesi Dönem 3',
      contact: '@dr_ali_pau',
      date: '4 gün önce'
    },
    {
      id: 6,
      cat: 'grup',
      catName: '👥 Çalışma Grubu',
      tagColor: 'tag-purple',
      price: 'Ücretsiz',
      title: 'İngilizce Hazırlık Muafiyeti Speaking Pratik Grubu',
      desc: 'Haftada 2 gün kütüphanede veya Göl Bahçe\'de toplanıp İngilizce konuşma ve sınav formatında deneme yapacak arkadaşlar.',
      faculty: 'Yabancı Diller Hazırlık',
      contact: '@english_club_pau',
      date: 'Bugün'
    }
  ];

  // LocalStorage'dan eklenen yeni ilanları al
  const savedLocalListings = JSON.parse(localStorage.getItem('pau_custom_listings')) || [];
  listings = [...savedLocalListings, ...listings];

  const listingsContainer = document.getElementById('listingsContainer');
  const listingTabs = document.querySelectorAll('#listingFilters .cat-tab');

  function renderListings(filter = 'all', searchQuery = '') {
    if (!listingsContainer) return;
    listingsContainer.innerHTML = '';

    let filtered = filter === 'all' 
      ? listings 
      : listings.filter(item => item.cat === filter);

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) ||
        item.faculty.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      listingsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 0.75rem; color: var(--coral);"></i>
          <p>Aramanıza uygun ilan bulunamadı. İlk ilanı siz bırakabilirsiniz!</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div>
          <div class="item-top">
            <span class="item-cat-badge tag-coral" style="background: rgba(224,90,113,0.15); color: var(--coral); border: 1px solid rgba(224,90,113,0.3);">${item.catName}</span>
            <span class="item-price-tag">${item.price}</span>
          </div>
          <h3 class="item-title">${item.title}</h3>
          <p class="item-desc">${item.desc}</p>
        </div>
        <div class="item-meta-footer">
          <div>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.82rem;">${item.faculty}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${item.date}</div>
          </div>
          <button class="btn-contact" onclick="copyContact('${item.contact}')">
            <i class="fas fa-comment-alt"></i> İletişim
          </button>
        </div>
      `;
      listingsContainer.appendChild(card);
    });
  }

  renderListings();

  listingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      listingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderListings(tab.getAttribute('data-cat'));
    });
  });

  window.copyContact = function(contact) {
    navigator.clipboard.writeText(contact).then(() => {
      showToast(`İletişim bilgisi kopyalandı: ${contact}`);
    }).catch(() => {
      showToast(`İletişim: ${contact}`);
    });
  };

  // ── 4. PAÜ Etkinlikleri & Topluluk Verileri ─────────────────────
  const events = [
    {
      id: 1,
      cat: 'festival',
      catName: '🎉 Şenlik',
      title: 'PAÜ Güz Şenliği – Kınıklı Ana Kampüs',
      date: '28 Eylül – 2 Ekim 2026',
      loc: 'Göl Bahçe Etkinlik Alanı',
      desc: '100\'den fazla öğrenci topluluğunun stantları, spor turnuvaları, sahne şovları ve açık hava konserleri.',
      status: 'Ücretsiz & Herkese Açık'
    },
    {
      id: 2,
      cat: 'konser',
      catName: '🎵 Konser',
      title: 'Elifcan Yıldız & Rock Topluluğu Konseri',
      date: '6 Ekim 2026 • 19:30',
      loc: 'PAÜ Çivril Yerleşkesi Amfisi',
      desc: 'PAÜ Rock Topluluğu açılış performansı ve Elifcan Yıldız konseriyle müzik dolu bir akşam.',
      status: 'Öğrenci Girişi Ücretsiz'
    },
    {
      id: 3,
      cat: 'akademik',
      catName: '🎓 Zirve',
      title: 'Yapay Zeka ve Yazılım Teknolojileri Zirvesi',
      date: 'Ekim 2026',
      loc: 'Kongre Kültür Merkezi - Salon A',
      desc: 'Sektörün önde gelen mühendisleri, yapay zeka modelleri ve kariyer fırsatları üzerine paneller.',
      status: 'Katılım Belgeli'
    },
    {
      id: 4,
      cat: 'kulup',
      catName: '🌱 Topluluk',
      title: 'COP31 İklim ve Sürdürülebilirlik Gönüllülüğü',
      date: 'Ekim 2026',
      loc: 'Kınıklı Yerleşkesi Ağaçlandırma Alanı',
      desc: 'PAÜ Çevre ve Doğa Kulübü ile fidan dikimi ve çevre farkındalığı semineri.',
      status: 'Gönüllü Katılım'
    },
    {
      id: 5,
      cat: 'festival',
      catName: '🎉 Şenlik',
      title: 'PAÜ Güz Şenliği – İlçe Kampüsleri Turnesi',
      date: '5 – 14 Ekim 2026',
      loc: 'Sarayköy, Honaz, Bozkurt, Bekilli',
      desc: 'Tüm ilçe meslek yüksekokullarında öğrenci buluşmaları, müzik dinletileri ve yarışmalar.',
      status: 'Yerleşkelerde Aktif'
    }
  ];

  const eventsContainer = document.getElementById('eventsContainer');
  const eventTabs = document.querySelectorAll('#eventTabs .cat-tab');

  function renderEvents(filter = 'all') {
    if (!eventsContainer) return;
    eventsContainer.innerHTML = '';

    const filtered = filter === 'all'
      ? events
      : events.filter(e => e.cat === filter);

    filtered.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div>
          <div class="item-top">
            <span class="item-cat-badge tag-coral" style="background: rgba(56,189,248,0.12); color: var(--cyan); border: 1px solid rgba(56,189,248,0.3);">${ev.catName}</span>
            <span style="font-size: 0.78rem; color: var(--emerald); font-weight: 700;">${ev.status}</span>
          </div>
          <h3 class="item-title">${ev.title}</h3>
          <p class="item-desc">${ev.desc}</p>
        </div>
        <div class="item-meta-footer">
          <div>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.82rem;"><i class="far fa-calendar-alt"></i> ${ev.date}</div>
            <div style="font-size: 0.78rem; color: var(--text-dim);"><i class="fas fa-map-marker-alt"></i> ${ev.loc}</div>
          </div>
          <button class="btn-contact" onclick="showToast('Etkinlik takviminize kaydedildi! 📅')">
            Takvime Ekle
          </button>
        </div>
      `;
      eventsContainer.appendChild(card);
    });
  }

  renderEvents();

  eventTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      eventTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderEvents(tab.getAttribute('data-filter'));
    });
  });

  // ── 5. Yemekhane Menü Switcher (Günlük & Haftalık) ──────────────
  const menuData = {
    pazartesi: {
      dayTitle: 'Pazartesi Günü Menüsü',
      soup: 'Süzme Mercimek Çorbası',
      main: 'İzmir Köfte & Pirinç Pilavı',
      side: 'Mevsim Salatası',
      dessert: 'Kemalpaşa Tatlısı',
      cal: '890 kcal'
    },
    sali: {
      dayTitle: 'Salı Günü Menüsü',
      soup: 'Ezogelin Çorbası',
      main: 'Fırın Tavuk Sote & Bulgur Pilavı',
      side: 'Nane ve Salatalıklı Cacık',
      dessert: 'Taze Meyve (Elma / Muz)',
      cal: '820 kcal'
    },
    carsamba: {
      dayTitle: 'Çarşamba Günü Menüsü',
      soup: 'Yayla Çorbası',
      main: 'Geleneksel Kuru Fasulye & Şehriyeli Pilav',
      side: 'Karışık Ev Turşusu',
      dessert: 'Fırın Sütlaç',
      cal: '910 kcal'
    },
    persembe: {
      dayTitle: 'Perşembe Günü Menüsü',
      soup: 'Kremalı Domates Çorbası',
      main: 'Fırında Sebzeli Tavuk But & Patates Püresi',
      side: 'Akdeniz Yeşillikleri Salatası',
      dessert: 'İrmik Helvası',
      cal: '850 kcal'
    },
    cuma: {
      dayTitle: 'Cuma Günü Menüsü',
      soup: 'Geleneksel Tarhana Çorbası',
      main: 'Dana Tas Kebabı & Soslu Makarna',
      side: 'Kuru Üzüm Kompostosu',
      dessert: 'Cevizli Baklava',
      cal: '950 kcal'
    }
  };

  const dayBtns = document.querySelectorAll('.day-btn');
  const menuDayTitle = document.getElementById('menuDayTitle');
  const menuCalories = document.getElementById('menuCalories');
  const dishSoup = document.getElementById('dishSoup');
  const dishMain = document.getElementById('dishMain');
  const dishSide = document.getElementById('dishSide');
  const dishDessert = document.getElementById('dishDessert');

  function updateMenuDisplay(dayKey) {
    const item = menuData[dayKey];
    if (!item) return;

    if (menuDayTitle) menuDayTitle.textContent = item.dayTitle;
    if (menuCalories) menuCalories.textContent = item.cal;
    if (dishSoup) dishSoup.textContent = item.soup;
    if (dishMain) dishMain.textContent = item.main;
    if (dishSide) dishSide.textContent = item.side;
    if (dishDessert) dishDessert.textContent = item.dessert;
  }

  // Bugünün gününü otomatik tespit et
  const dayNames = ['pazar', 'pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi'];
  const todayIndex = new Date().getDay();
  let defaultDay = (todayIndex >= 1 && todayIndex <= 5) ? dayNames[todayIndex] : 'pazartesi';

  dayBtns.forEach(btn => {
    if (btn.getAttribute('data-day') === defaultDay) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateMenuDisplay(btn.getAttribute('data-day'));
    });
  });

  updateMenuDisplay(defaultDay);

  // ── 6. FAQ Akordeon Etkileşimi ───────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ── 7. Global Arama Çubuğu & Filtreler ───────────────────────────
  const globalSearchInput = document.getElementById('globalSearchInput');
  const globalSearchBtn = document.getElementById('globalSearchBtn');
  const focusSearch = document.getElementById('focusSearch');

  if (focusSearch && globalSearchInput) {
    focusSearch.addEventListener('click', () => {
      globalSearchInput.focus();
      globalSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function executeSearch() {
    const query = globalSearchInput.value.trim();
    if (query !== '') {
      renderListings('all', query);
      const targetSec = document.getElementById('ilanlar');
      if (targetSec) targetSec.scrollIntoView({ behavior: 'smooth' });
      showToast(`"${query}" araması sonuçları listelendi.`);
    } else {
      renderListings('all', '');
    }
  }

  if (globalSearchBtn) globalSearchBtn.addEventListener('click', executeSearch);
  if (globalSearchInput) {
    globalSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') executeSearch();
    });
  }

  // Quick Filter Pills (Hero altında)
  const quickPills = document.querySelectorAll('#quickPills .pill-btn');
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      quickPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-filter');

      if (cat === 'yemekhane') {
        document.getElementById('yemekhane').scrollIntoView({ behavior: 'smooth' });
      } else if (cat === 'kyk') {
        document.getElementById('rehberler').scrollIntoView({ behavior: 'smooth' });
      } else if (cat === 'hazirlik') {
        document.getElementById('rehberler').scrollIntoView({ behavior: 'smooth' });
      } else {
        renderListings(cat);
        document.getElementById('ilanlar').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── 8. İlan Bırak Modalı & Form Yönetimi ────────────────────────
  const postModal = document.getElementById('postModal');
  const openPostModalBtn = document.getElementById('openPostModalBtn');
  const closePostModal = document.getElementById('closePostModal');
  const newListingForm = document.getElementById('newListingForm');

  if (openPostModalBtn && postModal) {
    openPostModalBtn.addEventListener('click', () => postModal.classList.add('active'));
  }
  if (closePostModal && postModal) {
    closePostModal.addEventListener('click', () => postModal.classList.remove('active'));
  }

  if (newListingForm) {
    newListingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formCat = document.getElementById('formCat').value;
      const formPrice = document.getElementById('formPrice').value;
      const formTitle = document.getElementById('formTitle').value;
      const formDesc = document.getElementById('formDesc').value;
      const formFaculty = document.getElementById('formFaculty').value;
      const formContact = document.getElementById('formContact').value;

      const catLabels = {
        ev: '🏠 Ev & Oda',
        kitap: '📚 Ders Notu',
        esya: '🛋️ İkinci El',
        grup: '👥 Çalışma Grubu'
      };

      const newListing = {
        id: Date.now(),
        cat: formCat,
        catName: catLabels[formCat] || 'İlan',
        tagColor: 'tag-coral',
        price: formPrice,
        title: formTitle,
        desc: formDesc,
        faculty: formFaculty,
        contact: formContact,
        date: 'Yeni Eklendi'
      };

      listings.unshift(newListing);
      savedLocalListings.unshift(newListing);
      localStorage.setItem('pau_custom_listings', JSON.stringify(savedLocalListings));

      renderListings('all');
      postModal.classList.remove('active');
      newListingForm.reset();
      showToast('İlanınız panoya başarıyla eklendi! 🎉');
      document.getElementById('ilanlar').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── 9. Soru Sor Modalı ──────────────────────────────────────────
  const questionModal = document.getElementById('questionModal');
  const closeQuestionModal = document.getElementById('closeQuestionModal');
  const newQuestionForm = document.getElementById('newQuestionForm');

  if (closeQuestionModal && questionModal) {
    closeQuestionModal.addEventListener('click', () => questionModal.classList.remove('active'));
  }

  if (newQuestionForm) {
    newQuestionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      questionModal.classList.remove('active');
      newQuestionForm.reset();
      showToast('Sorunuz PAÜ topluluk panosuna iletildi! Yakında yanıtlanacaktır.');
    });
  }

  // Modal dışına tıklayınca kapatma
  window.addEventListener('click', (e) => {
    if (e.target === postModal) postModal.classList.remove('active');
    if (e.target === questionModal) questionModal.classList.remove('active');
  });

  // Giriş yap butonuna tıklandığında bilgilendirme
  const openAuthModalBtn = document.getElementById('openAuthModalBtn');
  if (openAuthModalBtn) {
    openAuthModalBtn.addEventListener('click', () => {
      showToast('Öğrenci girişi veya Pusula SSO entegrasyonu yakında aktif olacaktır!');
    });
  }

  // ── 10. Toast Bildirim Yardımcısı ──────────────────────────────
  window.showToast = function(msg) {
    const toast = document.getElementById('siteToast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

});
