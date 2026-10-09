// JavaScript Document

document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.brief_tabs li');
  const fieldsets = document.querySelectorAll('.brief_form fieldset');
  
  // Функция переключения таба
  function switchTab(targetId) {
    // 1. Убираем active у всех табов и fieldset
    tabs.forEach(tab => tab.classList.remove('active'));
    fieldsets.forEach(fieldset => fieldset.classList.remove('active'));
    
    // 2. Добавляем active к нужному табу
    const targetTabLink = document.querySelector(`.brief_tabs a[href="#${targetId}"]`);
    if (targetTabLink) {
      targetTabLink.parentElement.classList.add('active');
    }
    
    // 3. Показываем нужный fieldset
    const targetFieldset = document.getElementById(targetId);
    if (targetFieldset) {
      targetFieldset.classList.add('active');
    }

    // 🌟 НОВОЕ: Сохраняем ID активного таба в память браузера
    localStorage.setItem('activeBriefTab', targetId);
  }
  
  // Обработчик клика на табы
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const link = this.querySelector('a');
      const targetId = link.getAttribute('href').substring(1); // Убираем символ #
      switchTab(targetId);
    });
  });
  
  // 🌟 НОВОЕ: Проверяем память при загрузке страницы
  const savedTabId = localStorage.getItem('activeBriefTab');
  
  if (savedTabId && document.getElementById(savedTabId)) {
    // Если в памяти есть сохраненный таб и он есть на странице — открываем его
    switchTab(savedTabId);
  } else if (tabs.length > 0) {
    // Иначе (первый визит) — открываем первый таб по умолчанию
    const firstTabId = tabs[0].querySelector('a').getAttribute('href').substring(1);
    switchTab(firstTabId);
  }	
	
});

function toggleField(triggerId, targetId) {
  const trigger = document.getElementById(triggerId);
  const target = document.getElementById(targetId);
  
  if (trigger && target) {
    trigger.addEventListener('change', function() {
      if (this.checked) {
        target.classList.add('visible');
      } else {
        target.classList.remove('visible');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Активируем связь
  toggleField('buildingTypeCustom', 'customBuildingField');
	toggleField('esciz_file', 'esciz_file-field');
	toggleField('site', 'site-field');
	toggleField('what-custom', 'what-custom-field');
	toggleField('hozyaeva', 'hozyaeva-field');
});
