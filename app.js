/**
 * WanderLux Travel Platform - Main Application Logic (Arabic & EGP Currency)
 * منصة واندرلوكس للسياحة والرحلات الفاخرة - الربط والتفاعل باللغة العربية والجنيه المصري
 */

(function () {
  'use strict';

  // Extract clean filename and path
  const currentPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
  const filename = currentPath.split('/').pop() || 'index.html';

  const isDetails = filename.includes('package-details') || 
                    (currentPath.includes('/package_details_booking_flow/') && filename.includes('code.html'));
  const isPackages = (filename.includes('packages') && !filename.includes('package-details')) || 
                     (currentPath.includes('/tour_packages_grid/') && filename.includes('code.html'));
  const isDestinations = filename.includes('destinations') || 
                         (currentPath.includes('/explore_destinations/') && filename.includes('code.html'));
  const isHome = !isDetails && !isPackages && !isDestinations;

  const PAGES = {
    home: 'index.html',
    destinations: 'destinations.html',
    packages: 'packages.html',
    details: 'package-details.html',
  };

  // If in original nested folders
  if (currentPath.includes('/home_hero_discovery/')) {
    PAGES.home = 'code.html';
    PAGES.destinations = '../explore_destinations/code.html';
    PAGES.packages = '../tour_packages_grid/code.html';
    PAGES.details = '../package_details_booking_flow/code.html';
  } else if (currentPath.includes('/explore_destinations/')) {
    PAGES.home = '../home_hero_discovery/code.html';
    PAGES.destinations = 'code.html';
    PAGES.packages = '../tour_packages_grid/code.html';
    PAGES.details = '../package_details_booking_flow/code.html';
  } else if (currentPath.includes('/tour_packages_grid/')) {
    PAGES.home = '../home_hero_discovery/code.html';
    PAGES.destinations = '../explore_destinations/code.html';
    PAGES.packages = 'code.html';
    PAGES.details = '../package_details_booking_flow/code.html';
  } else if (currentPath.includes('/package_details_booking_flow/')) {
    PAGES.home = '../home_hero_discovery/code.html';
    PAGES.destinations = '../explore_destinations/code.html';
    PAGES.packages = '../tour_packages_grid/code.html';
    PAGES.details = 'code.html';
  }

  // Global State Storage
  const STORAGE_KEYS = {
    bookings: 'wanderlux_bookings',
    wishlist: 'wanderlux_wishlist',
  };

  function getBookings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.bookings);
      return data ? JSON.parse(data) : [
        {
          referenceId: 'WL-2025-AMALFI-8491',
          title: 'تجربة يخت خاص في ساحل أمالفي وكابري (7 أيام)',
          dates: '12 أكتوبر 2025 — 18 أكتوبر 2025',
          guests: 2,
          tier: 'جناح بحري كبار الشخصيات VIP',
          total: '405,000 ج.م',
          deposit: '81,000 ج.م',
          bookedAt: 'حجز مؤكد ومضمون'
        }
      ];
    } catch (e) {
      return [];
    }
  }

  function saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
    updateBookingBadge();
  }

  // Toast Notification System
  function showToast(message, icon = 'verified') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'wander-toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-secondary-container">${icon}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Initialize Page Links
  function wireNavigation() {
    // Brand Logo -> Home
    document.querySelectorAll('[data-path="home"]').forEach((el) => {
      el.setAttribute('href', PAGES.home);
    });

    // Destinations link
    document.querySelectorAll('[data-path="explore-destinations"]').forEach((el) => {
      el.setAttribute('href', PAGES.destinations);
      if (isDestinations) {
        el.className = 'transition-colors text-tertiary-container font-bold';
        el.setAttribute('aria-current', 'page');
      } else {
        el.className = 'font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors';
      }
    });

    // Tour Packages link
    document.querySelectorAll('[data-path="tour-packages"]').forEach((el) => {
      el.setAttribute('href', PAGES.packages);
      if (isPackages) {
        el.className = 'transition-colors text-tertiary-container font-bold';
        el.setAttribute('aria-current', 'page');
      } else {
        el.className = 'font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors';
      }
    });

    // Experiences link
    document.querySelectorAll('[data-path="experiences"]').forEach((el) => {
      el.setAttribute('href', PAGES.packages + '?category=Adventure');
    });

    // Special Deals link
    document.querySelectorAll('[data-path="special-deals"]').forEach((el) => {
      el.setAttribute('href', PAGES.packages + '?deals=true');
    });

    // About Us link
    document.querySelectorAll('[data-path="about-us"]').forEach((el) => {
      el.setAttribute('href', '#');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openAboutModal();
      });
    });

    // Wire Amalfi Coast links
    document.querySelectorAll('[data-path="tour-details-amalfi"]').forEach((el) => {
      el.setAttribute('href', PAGES.details);
    });

    // Wire other tour details links
    document.querySelectorAll('[data-path="tour-details-japan"]').forEach((el) => {
      el.setAttribute('href', PAGES.details + '?pkg=japan');
    });
    document.querySelectorAll('[data-path="tour-details-safari"]').forEach((el) => {
      el.setAttribute('href', PAGES.details + '?pkg=safari');
    });
    document.querySelectorAll('[data-path="tour-details-swiss"]').forEach((el) => {
      el.setAttribute('href', PAGES.details + '?pkg=swiss');
    });
    document.querySelectorAll('[data-path="tour-details-bali"]').forEach((el) => {
      el.setAttribute('href', PAGES.details + '?pkg=bali');
    });
    document.querySelectorAll('[data-path="tour-details-norway"]').forEach((el) => {
      el.setAttribute('href', PAGES.details + '?pkg=norway');
    });

    // My Bookings trigger
    document.querySelectorAll('[data-path="my-bookings"], #myBookingsBtn').forEach((el) => {
      el.setAttribute('href', '#');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        toggleBookingsDrawer(true);
      });
    });

    // Header search triggers
    document.querySelectorAll('#headerSearchBtn, header button').forEach((btn) => {
      if (btn.textContent.includes('ابحث') || btn.textContent.includes('Find') || btn.querySelector('.material-symbols-outlined')?.textContent.trim() === 'search') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openSearchModal();
        });
      }
    });

    // Connect Specialist & Calculator Buttons
    document.querySelectorAll('button').forEach((btn) => {
      const text = btn.textContent;
      if (text.includes('خبير') || text.includes('Specialist')) {
        btn.addEventListener('click', () => openSpecialistModal());
      } else if (text.includes('حاسبة') || text.includes('Calculator') || text.includes('Quote')) {
        btn.addEventListener('click', () => openQuoteCalculatorModal());
      }
    });

    // Wire home buttons
    wireCards();
  }

  function wireCards() {
    const heroDiscoverBtn = document.getElementById('heroDiscoverBtn');
    if (heroDiscoverBtn && isHome) {
      heroDiscoverBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedDest = document.getElementById('selected-destination')?.textContent?.trim() || '';
        let target = PAGES.packages;
        if (selectedDest.includes('أمالفي') || selectedDest.toLowerCase().includes('amalfi')) {
          target = PAGES.details;
        } else if (selectedDest.includes('سانتوريني') || selectedDest.includes('كيوتو')) {
          target += '?search=' + encodeURIComponent(selectedDest.split('،')[0].split(',')[0]);
        } else {
          target = PAGES.destinations;
        }
        window.location.href = target;
      });
    }
  }

  // Update Booking Badge
  function updateBookingBadge() {
    const bookings = getBookings();
    document.querySelectorAll('[data-path="my-bookings"], #myBookingsBtn').forEach((btn) => {
      let badge = btn.querySelector('.booking-count-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'booking-count-badge mr-2 px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-bold text-xs shadow-sm';
        btn.appendChild(badge);
      }
      if (bookings.length > 0) {
        badge.textContent = bookings.length;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }

  // "My Bookings" Slide-over Panel (حجوزاتي)
  function setupBookingsDrawer() {
    let drawer = document.getElementById('my-bookings-drawer');
    if (drawer) return;

    drawer = document.createElement('div');
    drawer.id = 'my-bookings-drawer';
    drawer.className = 'fixed inset-0 z-[100] hidden';
    drawer.dir = 'rtl';
    drawer.innerHTML = `
      <div id="drawer-backdrop" class="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"></div>
      <div class="absolute inset-y-0 left-0 max-w-full flex pr-10">
        <div class="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between animate-slide-left">
          <div class="p-6 border-b border-surface-container flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary text-2xl">luggage</span>
              <div>
                <h3 class="font-headline-sm text-headline-sm text-primary">رحلاتي الاستكشافية</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">الحجوزات النشطة وتأكيدات الكونسيرج الفاخر</p>
              </div>
            </div>
            <button id="close-drawer-btn" class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-all cursor-pointer" type="button">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div id="drawer-bookings-list" class="flex-1 overflow-y-auto p-6 space-y-4">
            <!-- Dynamic bookings rendered here -->
          </div>

          <div class="p-6 border-t border-surface-container bg-surface-container-low/40">
            <div class="flex items-center justify-between text-body-sm mb-4">
              <span class="text-on-surface-variant">خدمة كونسيرج مخصصة 24/7:</span>
              <span class="font-semibold text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-secondary">support_agent</span> خط الأولوية المباشر
              </span>
            </div>
            <a href="${PAGES.packages}" class="w-full py-3.5 px-6 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-md">
              <span class="material-symbols-outlined text-lg">explore</span>
              <span>استكشف المزيد من الرحلات</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);

    document.getElementById('drawer-backdrop').addEventListener('click', () => toggleBookingsDrawer(false));
    document.getElementById('close-drawer-btn').addEventListener('click', () => toggleBookingsDrawer(false));
  }

  function toggleBookingsDrawer(show) {
    setupBookingsDrawer();
    const drawer = document.getElementById('my-bookings-drawer');
    if (!drawer) return;

    if (show) {
      renderBookingsInDrawer();
      drawer.classList.remove('hidden');
    } else {
      drawer.classList.add('hidden');
    }
  }

  function renderBookingsInDrawer() {
    const listContainer = document.getElementById('drawer-bookings-list');
    if (!listContainer) return;

    const bookings = getBookings();
    if (bookings.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-12 flex flex-col items-center">
          <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4">
            <span class="material-symbols-outlined text-3xl">travel_explore</span>
          </div>
          <h4 class="font-title text-title text-on-surface mb-2">لا توجد رحلات نشطة حالياً</h4>
          <p class="font-body-sm text-body-sm text-on-surface-variant max-w-xs mb-6">ستظهر هنا تفاصيل رحلاتك الخاصة المؤكدة واليخوت المستأجرة.</p>
          <a href="${PAGES.details}" class="px-6 py-2.5 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-md text-label-md transition-all shadow-sm">
            احجز رحلة أمالفي (7 أيام)
          </a>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = bookings.map((b, idx) => `
      <div class="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> حجز مؤكد ومضمون
          </span>
          <span class="font-label-sm text-label-sm text-on-surface-variant font-mono">${b.referenceId || 'WL-2025-' + (8400 + idx)}</span>
        </div>
        <h4 class="font-title text-title text-primary font-bold mb-1">${b.title || 'تجربة يخت أمالفي وكابري الفاخر (7 أيام)'}</h4>
        <div class="space-y-1 text-body-sm text-on-surface-variant mb-4">
          <p class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-secondary">calendar_month</span> ${b.dates || '12 أكتوبر — 18 أكتوبر 2025'}
          </p>
          <p class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-secondary">groups</span> ${b.guests || 2} مسافرين • ${b.tier || 'جناح VIP بحري'}
          </p>
          <p class="flex items-center gap-1.5 font-bold text-on-surface">
            <span class="material-symbols-outlined text-sm text-tertiary-container">payments</span> الإجمالي: ${b.total || '405,000 ج.م'} (الدفعة المقدمة: ${b.deposit || '81,000 ج.م'})
          </p>
        </div>
        <div class="flex items-center gap-2 pt-2 border-t border-surface-container">
          <a href="${PAGES.details}" class="flex-1 py-1.5 text-center rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold transition-colors">
            عرض خط السير
          </a>
          <button onclick="WanderLux.cancelBooking(${idx})" class="px-3 py-1.5 rounded-xl text-error hover:bg-error-container/20 font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
            إلغاء الحجز
          </button>
        </div>
      </div>
    `).join('');
  }

  // Quick Search Palette Modal
  function openSearchModal() {
    let modal = document.getElementById('search-palette-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'search-palette-modal';
      modal.dir = 'rtl';
      modal.className = 'fixed inset-0 z-[120] flex items-start justify-center pt-24 px-4 bg-primary/50 backdrop-blur-sm';
      modal.innerHTML = `
        <div class="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-surface-container-high animate-fade-in">
          <div class="p-4 border-b border-surface-container flex items-center gap-3">
            <span class="material-symbols-outlined text-secondary text-2xl">search</span>
            <input id="palette-input" class="w-full bg-transparent text-on-surface font-headline-sm text-headline-sm placeholder:text-outline focus:outline-none" placeholder="ابحث عن الوجهات، اليخوت، الفلل الفاخرة..." autofocus />
            <button id="close-palette-btn" class="p-2 text-on-surface-variant hover:text-on-surface rounded-full cursor-pointer"><span class="material-symbols-outlined">close</span></button>
          </div>
          <div class="p-4 max-h-96 overflow-y-auto">
            <div class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-2">الملاذات الفاخرة الموصى بها</div>
            <div class="space-y-1">
              <a href="${PAGES.details}" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-tertiary-container group-hover:scale-110 transition-transform">sailing</span>
                  <div>
                    <div class="font-title text-title text-on-surface">يخت خاص في ساحل أمالفي وكابري</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">بوزيتانو، إيطاليا • جولة حصرية 7 أيام</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">من 192,500 ج.م ←</span>
              </a>
              <a href="${PAGES.packages}?search=Kyoto" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">temple_buddhist</span>
                  <div>
                    <div class="font-title text-title text-on-surface">ريوكان ودفء الثقافة في كيوتو وطوكيو</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">اليابان • طقوس الشاي وينابيع أونسن الخاصة</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">من 230,000 ج.م ←</span>
              </a>
              <a href="${PAGES.packages}?search=Swiss" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">downhill_skiing</span>
                  <div>
                    <div class="font-title text-title text-on-surface">قطار الجليد وبانوراما جبال الألب السويسرية</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">سويسرا • قطار درجة أولى بانورامي وسانت موريتز</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">من 162,500 ج.م ←</span>
              </a>
              <a href="${PAGES.packages}?search=Serengeti" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">nature_people</span>
                  <div>
                    <div class="font-title text-title text-on-surface">سفاري طيران سيرينغيتي ونغورونغورو</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">تنزانيا • مخيمات خيام فائقة الفخامة وسط البرية</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">من 295,000 ج.م ←</span>
              </a>
            </div>
          </div>
          <div class="p-3 bg-surface-container-low text-center text-body-sm text-on-surface-variant">
            اضغط <kbd class="px-2 py-0.5 rounded bg-surface-container font-mono text-xs">Esc</kbd> للإغلاق
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });
      document.getElementById('close-palette-btn').addEventListener('click', () => modal.remove());
    } else {
      modal.classList.remove('hidden');
    }

    const input = document.getElementById('palette-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          window.location.href = PAGES.packages + '?search=' + encodeURIComponent(input.value.trim());
        }
      });
    }
  }

  // Specialist Consultation Modal
  function openSpecialistModal() {
    const modal = document.createElement('div');
    modal.dir = 'rtl';
    modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl p-6 lg:p-8 border border-surface-container-high relative">
        <button class="modal-close absolute top-5 left-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"><span class="material-symbols-outlined">close</span></button>
        <div class="flex items-center gap-2 mb-2 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
          <span class="material-symbols-outlined text-lg">concierge</span>
          <span>استشارة كونسيرج خاصة</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-primary mb-2">تحدث مع خبير السفر الخاص</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">يقوم مصممو السفر لدينا بإعداد خط سير حصري ومصمم خصيصاً لك خلال 24 ساعة.</p>

        <form id="specialist-form" class="space-y-4">
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">الاسم بالكامل</label>
            <input required placeholder="مثال: أحمد المنصوري" value="محمد سليم" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">البريد الإلكتروني</label>
              <input required type="email" value="client@example.com" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm" />
            </div>
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">رقم الهاتف / واتساب</label>
              <input required type="tel" value="+20 100 123 4567" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm" />
            </div>
          </div>
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">وجهة الأحلام المطلوبة</label>
            <select class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm">
              <option>ساحل أمالفي وكابري، إيطاليا</option>
              <option>كيوتو وطوكيو، اليابان</option>
              <option>جبال الألب وزرمات، سويسرا</option>
              <option>سيرينغيتي ونغورونغورو، تنزانيا</option>
              <option>بورا بورا وبولينيزيا الفرنسية</option>
              <option>رحلة خاصة مخصصة حول العالم</option>
            </select>
          </div>
          <button type="submit" class="w-full py-4 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-headline-sm text-headline-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined">send</span>
            <span>طلب الاستشارة الخاصة</span>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    modal.querySelector('#specialist-form').addEventListener('submit', (e) => {
      e.preventDefault();
      modal.innerHTML = `
        <div class="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 text-center shadow-2xl" dir="rtl">
          <div class="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-primary mb-2">تم تأكيد طلب الاستشارة</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">تم تعيين أحد كبار مستشاري واندرلوكس لمتابعة طلبك وسيقوم بالتواصل معك عبر الواتساب والبريد قريباً.</p>
          <button onclick="this.closest('.fixed').remove()" class="px-8 py-3 rounded-full bg-primary-container text-on-primary font-label-md cursor-pointer">إغلاق</button>
        </div>
      `;
      showToast('تم إرسال طلب استشارة الكونسيرج بنجاح!', 'support_agent');
    });
  }

  // Instant Quote Calculator Modal (حاسبة التقدير بالجنيه المصري)
  function openQuoteCalculatorModal() {
    const modal = document.createElement('div');
    modal.dir = 'rtl';
    modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl p-6 lg:p-8 border border-surface-container-high relative">
        <button class="modal-close absolute top-5 left-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"><span class="material-symbols-outlined">close</span></button>
        <div class="flex items-center gap-2 mb-2 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
          <span class="material-symbols-outlined text-lg">calculate</span>
          <span>حاسبة التكلفة الفورية</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-primary mb-4">تقدير تكلفة الرحلة الفاخرة</h3>

        <div class="space-y-4">
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">منطقة الوجهة</label>
            <select id="calc-dest" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
              <option value="210000">ساحل أمالفي، إيطاليا (210,000 ج.م / أسبوع قاعدة)</option>
              <option value="240000">كيوتو وطوكيو، اليابان (240,000 ج.م / أسبوع قاعدة)</option>
              <option value="195000">جبال الألب، سويسرا (195,000 ج.م / أسبوع قاعدة)</option>
              <option value="310000">سفاري سيرينغيتي، تنزانيا (310,000 ج.م / أسبوع قاعدة)</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">عدد المسافرين</label>
              <select id="calc-guests" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
                <option value="1">مسافر واحد (جناح خاص)</option>
                <option value="2" selected>مسافران (زوجان)</option>
                <option value="4">4 مسافرين (عائلة / أجنحة)</option>
                <option value="6">6 مسافرين (يخت خاص كامل)</option>
              </select>
            </div>
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">مدة الإقامة</label>
              <select id="calc-days" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
                <option value="1">7 أيام (الجولة المعتمدة)</option>
                <option value="1.4">10 أيام (إقامة ممتدة)</option>
                <option value="1.9">14 يوماً (الرحلة الكبرى)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">مستوى الفخامة والخدمات</label>
            <select id="calc-tier" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
              <option value="1">فيلا بوتيك 5 نجوم مع سائق خاص</option>
              <option value="1.35">يخت محرك خاص + طاهٍ خاص (+35%)</option>
              <option value="1.8">جناح رئاسي فائق + تنقلات هليكوبتر (+80%)</option>
            </select>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container flex items-center justify-between">
            <span class="font-body-md text-body-md text-on-surface-variant">التقدير الإجمالي المتوقع:</span>
            <span id="calc-result" class="font-headline-md text-headline-md text-primary font-bold">420,000 ج.م</span>
          </div>

          <button id="calc-book-btn" class="w-full py-4 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-headline-sm text-headline-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <span>المتابعة إلى خط السير والحجز</span>
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    function recalculate() {
      const base = parseFloat(modal.querySelector('#calc-dest').value);
      const guests = parseInt(modal.querySelector('#calc-guests').value, 10);
      const days = parseFloat(modal.querySelector('#calc-days').value);
      const tier = parseFloat(modal.querySelector('#calc-tier').value);
      const total = Math.round(base * guests * days * tier);
      modal.querySelector('#calc-result').textContent = total.toLocaleString('ar-EG') + ' ج.م';
    }

    modal.querySelectorAll('select').forEach((s) => s.addEventListener('change', recalculate));
    modal.querySelector('#calc-book-btn').addEventListener('click', () => {
      window.location.href = PAGES.details;
    });
  }

  // About Agency Modal
  function openAboutModal() {
    const modal = document.createElement('div');
    modal.dir = 'rtl';
    modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl p-6 lg:p-8 border border-surface-container-high relative">
        <button class="modal-close absolute top-5 left-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"><span class="material-symbols-outlined">close</span></button>
        <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">إرث واندرلوكس للكونسيرج الفاخر</span>
        <h3 class="font-headline-lg text-headline-lg text-primary mt-3 mb-2">ريادة السفر الفاخر المصمم خصيصاً</h3>
        <p class="font-body-md text-body-md text-on-surface-variant mb-4">
          تأسست واندرلوكس على شواطئ البحر الأبيض المتوسط كوكالة سفر عالمية رفيعة المستوى متخصصة في تنسيق الرحلات الاستكشافية الاستثنائية واليخوت الخاصة. نجمع بين البساطة المعمارية الراقية والوصول الحصري النادر إلى الجزر الخاصة والمنتجعات المحجوبة.
        </p>
        <div class="grid grid-cols-3 gap-3 text-center my-6">
          <div class="p-3 bg-surface-container-low rounded-2xl">
            <div class="font-headline-md text-headline-md text-primary font-bold">14</div>
            <div class="text-xs text-on-surface-variant font-semibold">عاماً من الخبرة</div>
          </div>
          <div class="p-3 bg-surface-container-low rounded-2xl">
            <div class="font-headline-md text-headline-md text-primary font-bold">64</div>
            <div class="text-xs text-on-surface-variant font-semibold">ملاذاً خاصاً حول العالم</div>
          </div>
          <div class="p-3 bg-surface-container-low rounded-2xl">
            <div class="font-headline-md text-headline-md text-primary font-bold">100%</div>
            <div class="text-xs text-on-surface-variant font-semibold">خصوصية وحماية تامة</div>
          </div>
        </div>
        <button onclick="this.closest('.fixed').remove()" class="w-full py-3.5 rounded-full bg-primary-container text-on-primary font-label-md cursor-pointer">إغلاق</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  }

  // Keyboard Shortcuts (Ctrl+K for search, Esc for closing modals)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('#search-palette-modal, #my-bookings-drawer, .lightbox-modal, #booking-modal').forEach((m) => {
        if (m.id === 'my-bookings-drawer') m.classList.add('hidden');
        else m.remove();
      });
    }
  });

  // Global API
  window.WanderLux = {
    toast: showToast,
    openBookings: () => toggleBookingsDrawer(true),
    closeBookings: () => toggleBookingsDrawer(false),
    openSearch: openSearchModal,
    openSpecialist: openSpecialistModal,
    openQuote: openQuoteCalculatorModal,
    openAbout: openAboutModal,
    addBooking: function (booking) {
      const list = getBookings();
      list.unshift(booking);
      saveBookings(list);
      showToast('تم تأكيد الحجز وحفظه في حجوزاتي بنجاح!', 'verified');
    },
    cancelBooking: function (idx) {
      const list = getBookings();
      if (confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
        list.splice(idx, 1);
        saveBookings(list);
        renderBookingsInDrawer();
        showToast('تم إلغاء الحجز بنجاح.', 'info');
      }
    },
  };

  // Alias
  window.واندرلوكس = window.WanderLux;

  // Run initial wiring on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      wireNavigation();
      updateBookingBadge();
    });
  } else {
    wireNavigation();
    updateBookingBadge();
  }
})();
