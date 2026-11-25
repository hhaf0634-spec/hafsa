/**
 * WanderLux Travel Platform - Main Application Logic
 * Seamlessly connects all screens, modals, state, and prototype interactions
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

  // Determine root relative prefix
  const isInSubdir = currentPath.includes('/stitch_wanderlust_travel_booking_platform/');
  const rootPrefix = isInSubdir ? './' : './';

  const PAGES = {
    home: 'index.html',
    destinations: 'destinations.html',
    packages: 'packages.html',
    details: 'package-details.html',
  };

  // If in original nested folders (e.g. explore_destinations/code.html)
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

  // Helper to resolve mockup screenshot path accurately
  function getMockupSrc(folderName) {
    if (currentPath.includes('/' + folderName + '/')) {
      return 'screen.png';
    }
    if (currentPath.includes('/home_hero_discovery/') || 
        currentPath.includes('/explore_destinations/') || 
        currentPath.includes('/tour_packages_grid/') || 
        currentPath.includes('/package_details_booking_flow/')) {
      return '../' + folderName + '/screen.png';
    }
    // If inside stitch_wanderlust_travel_booking_platform directly
    if (isInSubdir) {
      return folderName + '/screen.png';
    }
    // At root
    return 'stitch_wanderlust_travel_booking_platform/' + folderName + '/screen.png';
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
          title: '7-Day Amalfi Coast & Capri Private Yacht Experience',
          dates: 'Oct 12, 2025 — Oct 18, 2025',
          guests: 2,
          tier: 'Signature VIP Sea Suite',
          total: '$8,120',
          deposit: '$1,624',
          bookedAt: 'Verified Reservation'
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

  function getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.wishlist);
      return data ? JSON.parse(data) : ['amalfi', 'kyoto'];
    } catch (e) {
      return ['amalfi', 'kyoto'];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(list));
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
      el.setAttribute('href', PAGES.packages + '?category=Adventure+%26+Wildlife');
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
    document.querySelectorAll('#headerSearchBtn, header button:has(.material-symbols-outlined)').forEach((btn) => {
      if (btn.textContent.includes('Find a luxury escape') || btn.querySelector('span')?.textContent === 'search') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openSearchModal();
        });
      }
    });

    // Connect Specialist & Calculator Buttons
    document.querySelectorAll('button').forEach((btn) => {
      const text = btn.textContent;
      if (text.includes('Speak with a Travel Specialist')) {
        btn.addEventListener('click', () => openSpecialistModal());
      } else if (text.includes('Instant Quote Calculator')) {
        btn.addEventListener('click', () => openQuoteCalculatorModal());
      }
    });

    // Wire cards
    wireCards();
  }

  // Wire destination cards and package cards
  function wireCards() {
    // Amalfi Coast article on destinations page
    const amalfiArticle = document.querySelector('article[data-continent="europe"]:has(h3:contains("Positano"))');
    if (amalfiArticle) {
      const exploreBtn = amalfiArticle.querySelector('button');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = PAGES.details;
        });
      }
    }

    // Home Hero Search Bar Discover Button
    const heroDiscoverBtn = document.getElementById('heroDiscoverBtn') ||
      document.querySelector('section button:has(span:contains("travel_explore"))');
    if (heroDiscoverBtn && isHome) {
      heroDiscoverBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedDest = document.getElementById('selected-destination')?.textContent?.trim() || '';
        let target = PAGES.packages;
        if (selectedDest.toLowerCase().includes('amalfi')) {
          target = PAGES.details;
        } else if (selectedDest.toLowerCase().includes('santorini') || selectedDest.toLowerCase().includes('kyoto')) {
          target += '?search=' + encodeURIComponent(selectedDest.split(',')[0]);
        } else {
          target = PAGES.destinations;
        }
        window.location.href = target;
      });
    }

    // Trending Luxury Escapes on Home
    if (isHome) {
      const articles = document.querySelectorAll('section:has(h2:contains("Trending")) article');
      articles.forEach((art, idx) => {
        const reserveBtn = art.querySelector('button, a');
        if (reserveBtn && reserveBtn.textContent.includes('Reserve')) {
          reserveBtn.addEventListener('click', (e) => {
            if (idx === 0) window.location.href = PAGES.packages + '?search=Santorini';
            else if (idx === 1) window.location.href = PAGES.packages + '?search=Kyoto';
            else if (idx === 2) window.location.href = PAGES.packages + '?search=Swiss';
          });
        }
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
        badge.className = 'booking-count-badge ml-2 px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-bold text-xs shadow-sm';
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

  // "My Bookings" Slide-over Panel
  function setupBookingsDrawer() {
    let drawer = document.getElementById('my-bookings-drawer');
    if (drawer) return;

    drawer = document.createElement('div');
    drawer.id = 'my-bookings-drawer';
    drawer.className = 'fixed inset-0 z-[100] hidden';
    drawer.innerHTML = `
      <div id="drawer-backdrop" class="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"></div>
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between animate-slide-right">
          <div class="p-6 border-b border-surface-container flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary text-2xl">luggage</span>
              <div>
                <h3 class="font-headline-sm text-headline-sm text-primary">My Expeditions</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Active reservations & concierge bookings</p>
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
              <span class="text-on-surface-variant">24/7 Dedicated Concierge:</span>
              <span class="font-semibold text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-secondary">support_agent</span> Priority Line
              </span>
            </div>
            <a href="${PAGES.packages}" class="w-full py-3.5 px-6 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shadow-md">
              <span class="material-symbols-outlined text-lg">explore</span>
              <span>Discover More Journeys</span>
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
          <h4 class="font-title text-title text-on-surface mb-2">No Active Expeditions Yet</h4>
          <p class="font-body-sm text-body-sm text-on-surface-variant max-w-xs mb-6">Your confirmed bespoke itineraries and luxury charters will appear here.</p>
          <a href="${PAGES.details}" class="px-6 py-2.5 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-md text-label-md transition-all shadow-sm">
            Book 7-Day Amalfi Coast
          </a>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = bookings.map((b, idx) => `
      <div class="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Confirmed
          </span>
          <span class="font-label-sm text-label-sm text-on-surface-variant">ID: ${b.referenceId || 'WL-2025-' + (8400 + idx)}</span>
        </div>
        <h4 class="font-title text-title text-primary font-bold mb-1">${b.title || '7-Day Amalfi Coast & Capri Private Yacht'}</h4>
        <div class="space-y-1 text-body-sm text-on-surface-variant mb-4">
          <p class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-secondary">calendar_month</span> ${b.dates || 'Oct 12 — Oct 18, 2025'}
          </p>
          <p class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-secondary">groups</span> ${b.guests || 2} Guests • ${b.tier || 'Signature VIP'}
          </p>
          <p class="flex items-center gap-1.5 font-bold text-on-surface">
            <span class="material-symbols-outlined text-sm text-tertiary-container">payments</span> Total: ${b.total || '$8,120'} (Deposit: ${b.deposit || '$1,624'})
          </p>
        </div>
        <div class="flex items-center gap-2 pt-2 border-t border-surface-container">
          <a href="${PAGES.details}" class="flex-1 py-1.5 text-center rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold transition-colors">
            View Itinerary
          </a>
          <button onclick="WanderLux.cancelBooking(${idx})" class="px-3 py-1.5 rounded-xl text-error hover:bg-error-container/20 font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
            Cancel
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
      modal.className = 'fixed inset-0 z-[120] flex items-start justify-center pt-24 px-4 bg-primary/50 backdrop-blur-sm';
      modal.innerHTML = `
        <div class="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-surface-container-high animate-fade-in">
          <div class="p-4 border-b border-surface-container flex items-center gap-3">
            <span class="material-symbols-outlined text-secondary text-2xl">search</span>
            <input id="palette-input" class="w-full bg-transparent text-on-surface font-headline-sm text-headline-sm placeholder:text-outline focus:outline-none" placeholder="Search destinations, yachts, villas..." autofocus />
            <button id="close-palette-btn" class="p-2 text-on-surface-variant hover:text-on-surface rounded-full cursor-pointer"><span class="material-symbols-outlined">close</span></button>
          </div>
          <div class="p-4 max-h-96 overflow-y-auto">
            <div class="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-2">Recommended Sanctuaries</div>
            <div class="space-y-1">
              <a href="${PAGES.details}" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-tertiary-container group-hover:scale-110 transition-transform">sailing</span>
                  <div>
                    <div class="font-title text-title text-on-surface">Amalfi Coast & Capri Private Yacht</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">Positano, Italy • 7 Days Signature Tour</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">From $3,850 →</span>
              </a>
              <a href="${PAGES.packages}?search=Kyoto" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">temple_buddhist</span>
                  <div>
                    <div class="font-title text-title text-on-surface">Kyoto & Tokyo Ryokan Cultural Odyssey</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">Japan • Private Tea Masters & Onsen</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">From $4,600 →</span>
              </a>
              <a href="${PAGES.packages}?search=Swiss" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">downhill_skiing</span>
                  <div>
                    <div class="font-title text-title text-on-surface">Swiss Alps Glacier Express & St. Moritz</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">Switzerland • Panoramic 1st Class Rail</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">From $3,250 →</span>
              </a>
              <a href="${PAGES.packages}?search=Serengeti" class="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">nature_people</span>
                  <div>
                    <div class="font-title text-title text-on-surface">Serengeti & Ngorongoro Fly-In Safari</div>
                    <div class="font-body-sm text-body-sm text-on-surface-variant">Tanzania • Luxury Tented Camps</div>
                  </div>
                </div>
                <span class="font-label-sm text-label-sm text-secondary font-bold">From $5,900 →</span>
              </a>
            </div>
          </div>
          <div class="p-3 bg-surface-container-low text-center text-body-sm text-on-surface-variant">
            Press <kbd class="px-2 py-0.5 rounded bg-surface-container font-mono text-xs">Esc</kbd> to dismiss
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
    modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl p-6 lg:p-8 border border-surface-container-high relative">
        <button class="modal-close absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"><span class="material-symbols-outlined">close</span></button>
        <div class="flex items-center gap-2 mb-2 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
          <span class="material-symbols-outlined text-lg">concierge</span>
          <span>Bespoke Concierge Consultation</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-primary mb-2">Speak With a Private Curator</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">Our senior travel designers will craft an exclusive, custom itinerary within 24 hours.</p>

        <form id="specialist-form" class="space-y-4">
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Your Full Name</label>
            <input required placeholder="e.g. Lord Alistair Vance" value="Elena Montgomery" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Email</label>
              <input required type="email" value="elena@montgomery-holdings.com" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm" />
            </div>
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Phone / WhatsApp</label>
              <input required type="tel" value="+1 (555) 234-5678" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm" />
            </div>
          </div>
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Dream Sanctuary Destination</label>
            <select class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant focus:border-secondary focus:outline-none font-body-sm">
              <option>Amalfi Coast & Capri, Italy</option>
              <option>Kyoto & Hakone, Japan</option>
              <option>Swiss Alps, Zermatt</option>
              <option>Serengeti & Ngorongoro, Tanzania</option>
              <option>Bora Bora & French Polynesia</option>
              <option>Custom Worldwide Charter</option>
            </select>
          </div>
          <button type="submit" class="w-full py-4 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-headline-sm text-headline-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined">send</span>
            <span>Request Private Consultation</span>
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
        <div class="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 text-center shadow-2xl">
          <div class="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-primary mb-2">Consultation Confirmed</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">A WanderLux senior travel partner has been assigned to your request and will contact you shortly.</p>
          <button onclick="this.closest('.fixed').remove()" class="px-8 py-3 rounded-full bg-primary-container text-on-primary font-label-md cursor-pointer">Close</button>
        </div>
      `;
      showToast('Specialist inquiry dispatched successfully!', 'support_agent');
    });
  }

  // Instant Quote Calculator Modal
  function openQuoteCalculatorModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl p-6 lg:p-8 border border-surface-container-high relative">
        <button class="modal-close absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"><span class="material-symbols-outlined">close</span></button>
        <div class="flex items-center gap-2 mb-2 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
          <span class="material-symbols-outlined text-lg">calculate</span>
          <span>Instant Quote Estimator</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-primary mb-4">Tailor-Made Cost Estimate</h3>

        <div class="space-y-4">
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Destination Region</label>
            <select id="calc-dest" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
              <option value="4200">Amalfi Coast, Italy ($4,200/wk base)</option>
              <option value="4800">Kyoto & Tokyo, Japan ($4,800/wk base)</option>
              <option value="3900">Swiss Alps, Switzerland ($3,900/wk base)</option>
              <option value="6200">Serengeti Safari, Tanzania ($6,200/wk base)</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Travelers</label>
              <select id="calc-guests" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
                <option value="1">1 Solo Voyager</option>
                <option value="2" selected>2 Guests (Couple)</option>
                <option value="4">4 Guests (Family/Suite)</option>
                <option value="6">6 Guests (Private Charter)</option>
              </select>
            </div>
            <div>
              <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Duration</label>
              <select id="calc-days" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
                <option value="1">7 Days (Signature)</option>
                <option value="1.5">10 Days (Extended)</option>
                <option value="2">14 Days (Grand Voyage)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-label-sm text-label-sm text-on-surface mb-1 font-semibold">Luxury Experience Tier</label>
            <select id="calc-tier" class="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant font-body-sm">
              <option value="1">Bespoke 5-Star Boutique Villa</option>
              <option value="1.35">Private Motor Yacht & Chauffeur (+35%)</option>
              <option value="1.8">Ultra Presidential & Heli-Transfer (+80%)</option>
            </select>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container flex items-center justify-between">
            <span class="font-body-md text-body-md text-on-surface-variant">Estimated Total (USD):</span>
            <span id="calc-result" class="font-headline-md text-headline-md text-primary font-bold">$8,400</span>
          </div>

          <button id="calc-book-btn" class="w-full py-4 rounded-full bg-tertiary-container hover:bg-tertiary text-on-tertiary font-headline-sm text-headline-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
            <span>Proceed to Itinerary & Booking</span>
            <span class="material-symbols-outlined">arrow_forward</span>
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
      modal.querySelector('#calc-result').textContent = '$' + total.toLocaleString();
    }

    modal.querySelectorAll('select').forEach((s) => s.addEventListener('change', recalculate));
    modal.querySelector('#calc-book-btn').addEventListener('click', () => {
      window.location.href = PAGES.details;
    });
  }

  // About Agency Modal
  function openAboutModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl p-6 lg:p-8 border border-surface-container-high relative">
        <button class="modal-close absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"><span class="material-symbols-outlined">close</span></button>
        <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">WanderLux Concierge Heritage</span>
        <h3 class="font-headline-lg text-headline-lg text-primary mt-3 mb-2">Curated Luxury Authority</h3>
        <p class="font-body-md text-body-md text-on-surface-variant mb-4">
          Founded on the Mediterranean shores, WanderLux is an elite global travel agency orchestrating discreet, bespoke expeditions. We blend airy architectural minimalism with rare access to private islands, secluded villas, and master artisans.
        </p>
        <div class="grid grid-cols-3 gap-3 text-center my-6">
          <div class="p-3 bg-surface-container-low rounded-2xl">
            <div class="font-headline-md text-headline-md text-primary font-bold">14</div>
            <div class="text-xs text-on-surface-variant font-semibold">Years Experience</div>
          </div>
          <div class="p-3 bg-surface-container-low rounded-2xl">
            <div class="font-headline-md text-headline-md text-primary font-bold">64</div>
            <div class="text-xs text-on-surface-variant font-semibold">Private Sanctuaries</div>
          </div>
          <div class="p-3 bg-surface-container-low rounded-2xl">
            <div class="font-headline-md text-headline-md text-primary font-bold">100%</div>
            <div class="text-xs text-on-surface-variant font-semibold">NDA Protected</div>
          </div>
        </div>
        <button onclick="this.closest('.fixed').remove()" class="w-full py-3.5 rounded-full bg-primary-container text-on-primary font-label-md cursor-pointer">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  }

  // Prototype Navigation Dock & Screen Mockup Viewer
  function setupPrototypeDock() {
    let dock = document.getElementById('wanderlux-prototype-dock');
    if (dock) return;

    dock = document.createElement('div');
    dock.id = 'wanderlux-prototype-dock';
    dock.className = 'prototype-dock';
    dock.innerHTML = `
      <div id="dock-content" class="flex items-center gap-1.5">
        <span class="text-xs font-bold text-secondary-fixed tracking-wider uppercase pl-1 pr-2 hidden sm:inline">⚡ Prototype:</span>
        <a href="${PAGES.home}" class="dock-link ${isHome ? 'active' : ''}">
          <span class="material-symbols-outlined text-sm">home</span>
          <span>Home</span>
        </a>
        <a href="${PAGES.destinations}" class="dock-link ${isDestinations ? 'active' : ''}">
          <span class="material-symbols-outlined text-sm">public</span>
          <span>Destinations</span>
        </a>
        <a href="${PAGES.packages}" class="dock-link ${isPackages ? 'active' : ''}">
          <span class="material-symbols-outlined text-sm">luggage</span>
          <span>Packages</span>
        </a>
        <a href="${PAGES.details}" class="dock-link ${isDetails ? 'active' : ''}">
          <span class="material-symbols-outlined text-sm">sailing</span>
          <span>Booking Flow</span>
        </a>
        <button id="dock-mockups-btn" class="dock-link bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 ml-1 cursor-pointer" type="button">
          <span class="material-symbols-outlined text-sm">photo_library</span>
          <span>View Mockups</span>
        </button>
      </div>
      <button id="dock-toggle-btn" class="p-1 rounded-full text-white/70 hover:text-white cursor-pointer" title="Toggle Dock">
        <span class="material-symbols-outlined text-sm">unfold_less</span>
      </button>
    `;
    document.body.appendChild(dock);

    let minimized = false;
    document.getElementById('dock-toggle-btn').addEventListener('click', () => {
      minimized = !minimized;
      const content = document.getElementById('dock-content');
      const icon = document.querySelector('#dock-toggle-btn .material-symbols-outlined');
      if (minimized) {
        content.classList.add('hidden');
        dock.classList.add('minimized');
        icon.textContent = 'unfold_more';
      } else {
        content.classList.remove('hidden');
        dock.classList.remove('minimized');
        icon.textContent = 'unfold_less';
      }
    });

    document.getElementById('dock-mockups-btn').addEventListener('click', openMockupsViewer);
  }

  // Screen Mockups Viewer Modal
  function openMockupsViewer() {
    const screens = [
      {
        id: 'home',
        title: 'Screen 1: Home Hero Discovery',
        src: getMockupSrc('home_hero_discovery'),
        link: PAGES.home,
      },
      {
        id: 'dest',
        title: 'Screen 2: Explore Destinations',
        src: getMockupSrc('explore_destinations'),
        link: PAGES.destinations,
      },
      {
        id: 'pkg',
        title: 'Screen 3: Tour Packages Grid',
        src: getMockupSrc('tour_packages_grid'),
        link: PAGES.packages,
      },
      {
        id: 'detail',
        title: 'Screen 4: Package Details & Booking Flow',
        src: getMockupSrc('package_details_booking_flow'),
        link: PAGES.details,
      },
    ];

    let activeIndex = isHome ? 0 : isDestinations ? 1 : isPackages ? 2 : 3;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[130] flex flex-col bg-primary/95 backdrop-blur-md animate-fade-in text-white';
    modal.innerHTML = `
      <div class="h-16 px-6 bg-surface-container-lowest/10 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-secondary-container">auto_awesome</span>
          <span class="font-headline-sm text-title font-bold">Stitch Original Design Screens</span>
        </div>
        <div class="flex items-center gap-2" id="mockup-tabs">
          ${screens.map((s, i) => `
            <button class="mockup-tab px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${i === activeIndex ? 'bg-tertiary-container text-on-tertiary shadow-md' : 'bg-white/10 hover:bg-white/20'}" data-index="${i}">
              ${s.title.split(':')[0]}
            </button>
          `).join('')}
        </div>
        <button id="close-mockup-modal" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
          <span class="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      <div class="flex-1 overflow-auto p-6 flex flex-col items-center justify-center relative">
        <div class="max-w-5xl w-full flex flex-col items-center">
          <div class="flex items-center justify-between w-full mb-3">
            <h3 id="mockup-title" class="font-headline-sm text-headline-sm text-secondary-fixed font-bold">${screens[activeIndex].title}</h3>
            <a id="mockup-live-link" href="${screens[activeIndex].link}" class="px-4 py-1.5 rounded-full bg-secondary hover:bg-secondary-container text-white hover:text-on-secondary-container font-label-md text-xs font-bold flex items-center gap-1 transition-all">
              <span>Open Live Interactive Page</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div class="w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 max-h-[75vh] overflow-y-auto">
            <img id="mockup-img" src="${screens[activeIndex].src}" alt="Design Screen" class="w-full h-auto object-contain block" />
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#close-mockup-modal').addEventListener('click', () => modal.remove());

    modal.querySelectorAll('.mockup-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-index'), 10);
        modal.querySelectorAll('.mockup-tab').forEach((t, i) => {
          if (i === idx) {
            t.className = 'mockup-tab px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer bg-tertiary-container text-on-tertiary shadow-md';
          } else {
            t.className = 'mockup-tab px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer bg-white/10 hover:bg-white/20';
          }
        });
        modal.querySelector('#mockup-title').textContent = screens[idx].title;
        modal.querySelector('#mockup-live-link').setAttribute('href', screens[idx].link);
        modal.querySelector('#mockup-img').setAttribute('src', screens[idx].src);
      });
    });
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
    openMockups: openMockupsViewer,
    addBooking: function (booking) {
      const list = getBookings();
      list.unshift(booking);
      saveBookings(list);
      showToast('Reservation confirmed & saved in My Bookings!', 'verified');
    },
    cancelBooking: function (idx) {
      const list = getBookings();
      if (confirm('Cancel this expedition reservation?')) {
        list.splice(idx, 1);
        saveBookings(list);
        renderBookingsInDrawer();
        showToast('Reservation removed.', 'info');
      }
    },
  };

  // Run initial wiring on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      wireNavigation();
      updateBookingBadge();
      setupPrototypeDock();
    });
  } else {
    wireNavigation();
    updateBookingBadge();
    setupPrototypeDock();
  }
})();
