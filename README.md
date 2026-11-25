# WanderLux Travel Agency & Booking Platform 🌍✈️

منصة حجز وسياحة فاخرة متكاملة تم ربط جميع شاشاتها وتصاميمها ببعضها باستخدام **HTML5 و CSS3 (Tailwind) و JavaScript**.

---

## 📌 الصفحات المرتبطة ببعضها (Connected Screens)

1. **الصفحة الرئيسية (Home Hero & Discovery)**:
   - الملف: [`index.html`](file:///c:/Users/ELMAJD%20COMP/Downloads/stitch_wanderlust_travel_booking_platform/index.html)
   - واجهة البحث التفاعلية واختيار الوجهات والتواريخ وعدد المسافرين.
   - كروت الوجهات الشائعة (Santorini, Kyoto, Swiss Alps) مع روابط الحجز.
   - شهادات العملاء المميزين وزر مخصص للانتقال المباشر لرحلة ساحل أمالفي.
   - نوافذ منبثقة تفاعلية: استشارة مع خبير سفر (`Speak with a Specialist`) وحاسبة الأسعار التقديرية الفورية (`Instant Quote Calculator`).

2. **صفحة استكشاف الوجهات (Explore Destinations)**:
   - الملف: [`destinations.html`](file:///c:/Users/ELMAJD%20COMP/Downloads/stitch_wanderlust_travel_booking_platform/destinations.html)
   - تصفية فورية (Live Filters) حسب القارة: جميع القارات، أوروبا، آسيا والمحيط الهادئ، الأمريكتين، إفريقيا والشرق الأوسط، الجزر، والرحلات القطبية.
   - حقل بحث مباشر وسريع لتصفية الوجهات بالاسم والوصف.
   - زر `Explore` على كل وجهة يوجه مباشرة للرحلات المخصصة لها (أمالفي، كيوتو، سيرينجيتي، سويسرا، بورا بورا، أيسلندا).

3. **صفحة باقات الرحلات الفاخرة (Tour Packages Grid)**:
   - الملف: [`packages.html`](file:///c:/Users/ELMAJD%20COMP/Downloads/stitch_wanderlust_travel_booking_platform/packages.html)
   - تصفية حسب التصنيف: شهر العسل والرومانسية، العائلات، المغامرات والحياة البرية، السبا والاستجمام، واليخوت والقطارات الفاخرة.
   - شريط تحكم الميزانية (Budget Slider) التفاعلي من 2,500$ إلى 15,000$.
   - قائمة المدة الزمنية والترتيب (حسب السعر من الأقل للأعلى، الأعلى للأقل، والتقييم).
   - زر `View Details` على كل باقة يفتح صفحة تفاصيل الرحلة المحددة.

4. **صفحة تفاصيل الرحلة وتدفق الحجز (Package Details & Booking Flow)**:
   - الملف: [`package-details.html`](file:///c:/Users/ELMAJD%20COMP/Downloads/stitch_wanderlust_travel_booking_platform/package-details.html)
   - يدعم عرض الرحلة الرئيسية (ساحل أمالفي وكابري) مع دعم ديناميكي لجميع الباقات الأخرى (اليابان، كينيا/تنزانيا، سويسرا، بالي، النرويج).
   - مسار التنقل (Breadcrumbs) المتصل بالصفحة الرئيسية والوجهات.
   - معرض صور فسيفسائي تفاعلي (Photo Bento Grid) يدعم التكبير عبر Lightbox بمجرد النقر على أي صورة.
   - جدول الرحلة المفصل يوماً بيوم (Day-by-Day Accordion) مع خيار فتح/طي جميع الأيام.
   - بطاقة الحجز التفاعلية: اختيار عدد الضيوف وحساب فوري للتكلفة، الضرائب، الدفعة المقدمة (Deposit 20%).
   - زر `Reserve Your Journey Now`: يفتح نافذة الدفع وتأكيد الحجز التفاعلية، وتوليد كود الحجز وتخزينه في `localStorage`.
   - زر `Hold Dates for 48 Hours`: لتثبيت موعد الرحلة مجاناً لمدة 48 ساعة.

---

## ⚡ مميزات الربط المشتركة (Shared Features in `app.js` & `app.css`)

- **شريط التنقل العلوي الموحد (Universal Header Nav)**:
  - الشعار ينقل إلى الرئيسية.
  - تمييز الصفحة الحالية (Active State) تلقائياً.
  - زر **My Bookings**: يفتح لوحة جانبية منزلقة تعرض الحجوزات المحفوظة مع إمكانية إلغائها أو عرض تفاصيلها.
  - زر البحث السريع `Find a luxury escape...` واختصار لوحة المفاتيح `Ctrl + K` للبحث السريع والانتقال المباشر.
  - نظام الإشعارات المنبثقة (Toasts) عند الحفظ في المفضلة أو تأكيد الحجز.

- **شريط التنقل المساعد للنموذج الأولي (Prototype Dock)**:
  - شريط عائم بالأسفل يتيح التبديل بنقرة واحدة بين الشاشات الأربعة:
    `[🏠 Home] [🌍 Destinations] [🧳 Packages] [📋 Booking Flow]`
  - زر **View Mockups**: يعرض صور التصاميم الأصلية (`screen.png`) للشاشات الأربعة مع إمكانية التبديل بينها للمقارنة بالصفحات الحية.
  - إمكانية تصغير الشريط في أي وقت حتى لا يحجب المحتوى.

---

## 🚀 طريقة التشغيل

يمكنك فتح أي من الملفات مباشرة بالنقر المزدوج عليها في متصفحك (Chrome، Edge، Firefox، إلخ):
- افتح [`index.html`](file:///c:/Users/ELMAJD%20COMP/Downloads/stitch_wanderlust_travel_booking_platform/index.html) لبدء التصفح من الصفحة الرئيسية!
