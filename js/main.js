// تسجيل service worker للـ PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker تم تسجيله بنجاح:', registration.scope);
      })
      .catch(error => {
        console.log('فشل تسجيل ServiceWorker:', error);
      });
    
    // تحقق إذا كان المستخدم على الصفحة الرئيسية وقم بتوجيهه إلى صفحة البداية - نستخدم sessionStorage لمنع التكرار
    const visitedSplash = sessionStorage.getItem('visitedSplash');
    if (!visitedSplash && (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html'))) {
      sessionStorage.setItem('visitedSplash', 'true');
      window.location.href = 'splash.html';
    }
  });
}

// التبديل بين الصفحات المتعاقبة (Splash Screens)
document.addEventListener('DOMContentLoaded', function() {
  const splashScreens = document.querySelectorAll('.splash');
  const indicators = document.querySelectorAll('.indicator');
  const skipBtn = document.querySelector('.skip-btn');
  
  if (!splashScreens.length) return; // التحقق من وجود شاشات متعاقبة
  
  let currentSplash = 0;
  let splashInterval;
  
  // دالة لتحديث شاشة البداية المتعاقبة النشطة
  function updateSplash() {
    splashScreens.forEach((splash, index) => {
      splash.classList.remove('active');
      if (indicators[index]) {
        indicators[index].classList.remove('active');
      }
    });
    
    splashScreens[currentSplash].classList.add('active');
    if (indicators[currentSplash]) {
      indicators[currentSplash].classList.add('active');
    }
  }
  
  // بدء التبديل التلقائي بين شاشات البداية
  function startSplashInterval() {
    splashInterval = setInterval(() => {
      currentSplash = (currentSplash + 1) % splashScreens.length;
      updateSplash();
      
      // إذا وصلنا للشاشة الأخيرة، توقف عن التبديل التلقائي
      if (currentSplash === splashScreens.length - 1) {
        clearInterval(splashInterval);
      }
    }, 3000); // تبديل كل 3 ثواني
  }
  
  // تعيين الشاشة الأولى كنشطة وبدء التبديل
  updateSplash();
  startSplashInterval();
  
  // معالجة النقر على المؤشرات
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      clearInterval(splashInterval);
      currentSplash = index;
      updateSplash();
      startSplashInterval();
    });
  });
  
  // معالجة زر التخطي
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault(); // منع السلوك الافتراضي للرابط
      clearInterval(splashInterval);
      sessionStorage.setItem('visitedSplash', 'true'); // تعيين علامة أن المستخدم شاهد صفحة البداية
      window.location.href = 'index.html';
    });
  }
  
  // التنقل إلى الصفحة الرئيسية بعد عرض جميع الشاشات المتعاقبة
  setTimeout(() => {
    if (window.location.pathname.includes('splash.html')) {
      sessionStorage.setItem('visitedSplash', 'true'); // تعيين علامة أن المستخدم شاهد صفحة البداية
      window.location.href = 'index.html';
    }
  }, 10000); // الانتقال بعد 10 ثواني
});

// القائمة المحمولة
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    });
  }
});

// تنشيط الروابط النشطة في القائمة
document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });
});

// تأثيرات التمرير والظهور
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  // دالة للتحقق من أن العنصر في مجال الرؤية
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // دالة لتنشيط العناصر المرئية
  function checkAnimations() {
    animatedElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // تعيين الحالة الأولية للعناصر
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });
  
  // التحقق عند تحميل الصفحة وعند التمرير
  checkAnimations();
  window.addEventListener('scroll', checkAnimations);
});

// التنقل بين أنواع المستخدمين
document.addEventListener('DOMContentLoaded', function() {
  const userCards = document.querySelectorAll('.user-card');
  
  if (userCards.length) {
    userCards.forEach(card => {
      card.addEventListener('click', () => {
        const userType = card.getAttribute('data-user-type');
        if (userType) {
          window.location.href = `pages/${userType}.html`;
        }
      });
    });
  }
});
