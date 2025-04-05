// وضع الظلام (Dark Mode)
document.addEventListener('DOMContentLoaded', function() {
  const modeToggle = document.querySelector('.mode-toggle');
  const htmlElement = document.documentElement;
  
  // التحقق من وجود إعدادات وضع الظلام المخزنة
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    htmlElement.setAttribute('data-theme', currentTheme);
    
    // تحديث أيقونة التبديل
    updateToggleIcon(currentTheme);
  }
  
  // إضافة معالج الحدث لزر التبديل
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      // تبديل وضع الظلام
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // تحديث السمة وحفظها في التخزين المحلي
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // تحديث أيقونة التبديل
      updateToggleIcon(newTheme);
    });
  }
  
  // تحديث أيقونة التبديل بناءً على الوضع الحالي
  function updateToggleIcon(theme) {
    if (modeToggle) {
      if (theme === 'dark') {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        modeToggle.setAttribute('title', 'التبديل إلى الوضع المضيء');
      } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        modeToggle.setAttribute('title', 'التبديل إلى الوضع المظلم');
      }
    }
  }
  
  // التحقق من تفضيلات النظام
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // تطبيق الوضع المفضل إذا لم يختر المستخدم وضعًا
  if (!currentTheme) {
    const preferredTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', preferredTheme);
    localStorage.setItem('theme', preferredTheme);
    updateToggleIcon(preferredTheme);
  }
  
  // الاستماع للتغييرات في تفضيلات النظام
  prefersDarkScheme.addEventListener('change', (e) => {
    // تطبيق التغيير فقط إذا لم يختر المستخدم وضعًا مخصصًا
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      updateToggleIcon(newTheme);
    }
  });
});
