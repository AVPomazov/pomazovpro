// ==========================================================================
// HERO SLIDER - Логика работы слайдера
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.hero-slider');
  
  // Проверяем, есть ли слайдер на странице
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsContainer = slider.querySelector('.slider-dots');
  
  let currentSlide = 0; // Текущий слайд (начинаем с 0)
  let slideInterval; // Переменная для автопереключения

  // Явно активируем первый слайд при загрузке
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  // ==========================================================================
  // СОЗДАНИЕ ТОЧЕК-ИНДИКАТОРОВ
  // ==========================================================================
  
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.slider-dot');
  
  // ==========================================================================
  // ФУНКЦИИ УПРАВЛЕНИЯ
  // ==========================================================================
  
  // Переход к конкретному слайду
  function goToSlide(index) {
    // Убираем active у текущего слайда и точки
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Обновляем текущий слайд
    currentSlide = index;
    
    // Добавляем active новому слайду и точке
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  // Следующий слайд
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0; // Если последний, переходим к первому
    }
    goToSlide(nextIndex);
  }
  
  // Предыдущий слайд
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1; // Если первый, переходим к последнему
    }
    goToSlide(prevIndex);
  }
  
  // Запуск автопереключения
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000); // Меняем слайд каждые 5 секунд
  }
  
  // Остановка автопереключения
  function stopAutoPlay() {
    clearInterval(slideInterval);
  }
  
  // ==========================================================================
  // ОБРАБОТЧИКИ СОБЫТИЙ
  // ==========================================================================
  
  // Клик по кнопке "Вперед"
  nextBtn.addEventListener('click', function() {
    nextSlide();
    resetAutoPlay(); // Сбрасываем таймер
  });
  
  // Клик по кнопке "Назад"
  prevBtn.addEventListener('click', function() {
    prevSlide();
    resetAutoPlay();
  });
  
  // Остановка при наведении
  slider.addEventListener('mouseenter', stopAutoPlay);
  
  // Запуск при уходе курсора
  slider.addEventListener('mouseleave', startAutoPlay);
  
  // Сброс таймера (после ручного переключения)
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }
  
  // ==========================================================================
  // ЗАПУСК
  // ==========================================================================
  
  startAutoPlay(); // Запускаем автопереключение

  // ==========================================================================
  // СВАЙП ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
  // ==========================================================================
  
  let touchStartX = 0;
  let touchEndX = 0;

  // Запоминаем точку, где палец коснулся экрана
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true }); // passive: true улучшает производительность скролла

  // Запоминаем точку, где палец оторвался от экрана
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  // Функция обработки свайпа
  function handleSwipe() {
    const threshold = 50; // Минимальное расстояние (в пикселях) для регистрации свайпа
    const diff = touchStartX - touchEndX;

    if (diff > threshold) {
      // Свайп влево -> Следующий слайд
      nextSlide();
      resetAutoPlay();
    } else if (diff < -threshold) {
      // Свайп вправо -> Предыдущий слайд
      prevSlide();
      resetAutoPlay();
    }
    // Если разница меньше 50px, считаем это просто тапом (кликом) и ничего не делаем
  }

});