// JavaScript Document

// ==========================================================================
// NAVBAR - Sticky эффект и бургер-меню
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
	// Бургер
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.navbar-menu');
	const menuLinks = menu.querySelectorAll('a');
	if (burger && menu) {
    burger.addEventListener('click', function() {
      // Переключаем классы
      menu.classList.toggle('is_active');
      burger.classList.toggle('is_active');
      
      // Доступность (для скринридеров)
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isExpanded);
      
      // Блокируем прокрутку фона, когда меню открыто (опционально, но рекомендуется)
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    // Закрываем меню при клике на любую ссылку внутри него
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menu.classList.remove('is_active');
        burger.classList.remove('is_active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Кнопка "Наверх"
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Показываем после 300px прокрутки
      scrollToTopBtn.classList.add('is-visible');
    } else {
      scrollToTopBtn.classList.remove('is-visible');
    }
  });
  // Плавный скролл при клике
  scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
});