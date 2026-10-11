// JavaScript Document
document.addEventListener('DOMContentLoaded', function() {
  
  const tabs = document.querySelectorAll('.brief_tabs li');
  const fieldsets = document.querySelectorAll('.brief_form fieldset');
	
  // 1. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ТАБА
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
    
    // 4. Сохраняем ID активного таба в память браузера
    localStorage.setItem('activeBriefTab', targetId);

    // 5. Обновляем состояние кнопок навигации после переключения
    updateNavButtons();
  }
	
  // 2. ОБРАБОТЧИК КЛИКА НА ТАБЫ
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const link = this.querySelector('a');
      const targetId = link.getAttribute('href').substring(1); // Убираем символ #
      switchTab(targetId);
			scrollToBrief();
    });
  });
  
  // 3. ПРОВЕРЯЕМ ПАМЯТЬ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
  const savedTabId = localStorage.getItem('activeBriefTab');
  if (savedTabId && document.getElementById(savedTabId)) {
    switchTab(savedTabId);
  } else if (tabs.length > 0) {
    const firstTabId = tabs[0].querySelector('a').getAttribute('href').substring(1);
    switchTab(firstTabId);
  }
	
  // 4. КНОПКА "СБРОС"
  const clearButton = document.querySelector('.clear');
  if (clearButton) {
    clearButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Вы уверены, что хотите сбросить все данные формы?')) {
        localStorage.removeItem('activeBriefTab');
        const firstTabId = tabs[0].querySelector('a').getAttribute('href').substring(1);
        switchTab(firstTabId);
        const form = document.querySelector('.brief_form');
        if (form) form.reset();
        alert('Форма сброшена');
      }
    });
  }

	// 5. ФУНКЦИЯ ПОКАЗА/СКРЫТИЯ ПОЛЕЙ (toggleField)
	function toggleField(triggerId, targetId) {
		const trigger = document.getElementById(triggerId);
		const target = document.getElementById(targetId);

		if (trigger && target) {
			// Если это radio-кнопка
			if (trigger.type === 'radio') {
				const radioName = trigger.name;
				const radioGroup = document.querySelectorAll(`input[name="${radioName}"]`);

				// Вешаем слушатель на ВСЮ группу radio
				radioGroup.forEach(radio => {
					radio.addEventListener('change', function() {
						// Проверяем состояние именно того radio, который должен открывать это поле
						if (trigger.checked) {
							target.classList.add('visible');
						} else {
							target.classList.remove('visible');
						}
					});
				});
			} 
			// Если это checkbox (старая проверенная логика)
			else {
				trigger.addEventListener('change', function() {
					const isChecked = this.checked;

					if (isChecked) {
						target.classList.add('visible');
					} else {
						target.classList.remove('visible');
					}

					// Показываем/скрываем доп. чекбоксы, связанные с этим полем
					const related = document.querySelectorAll(`[data-show-target="${targetId}"]`);
					related.forEach(el => {
						if (isChecked) {
							el.classList.add('visible');
						} else {
							el.classList.remove('visible');
						}
					});
				});
			}
		}
	}
	
  // 6. ПРИВЯЗКА toggleField К КОНКРЕТНЫМ ID (ИСПРАВЛЕНО!)
  toggleField('buildingTypeCustom', 'customBuildingField');  
  // Группа 4: Стартовая информация (ID чекбоксов теперь совпадают с HTML!)
  toggleField('concept_check', 'concept_file-field');
  toggleField('esciz_check', 'esciz_file-field');
  toggleField('project_check', 'project_file-field');
  toggleField('site_check', 'site-field');
  toggleField('what-custom', 'what-custom-field');
  // Группа 5: Состав семьи
  toggleField('family-hosts', 'family-hosts-field');
  toggleField('family-small-child', 'family-small-child-field');
  toggleField('family-adult-child', 'family-adult-child-field');
  toggleField('family-elders', 'family-elders-field');
  toggleField('guests-hosts', 'guests-hosts-field');
  toggleField('guests-children', 'guests-children-field');
  toggleField('guests-elders', 'guests-elders-field');
  toggleField('family-staff', 'family-staff-field');
  toggleField('family-pets', 'family-pets-field');
	// Группа 2.2: Ограничения на местности
	toggleField('restriction-style', 'restriction-style-field');
	toggleField('restriction-existing', 'restriction-existing-field');
	toggleField('restriction-neighbors', 'restriction-neighbors-field');
	toggleField('restriction-other', 'restriction-other-field');
	// Группа 2.4: Отопление (только для "другое")
	toggleField('heating-other', 'heating-other-field');
	// Группа 3.1: Технология строительства
	toggleField('tech-other', 'tech-other-field');
	// Группа 3.2: Фундамент
	toggleField('basement-other', 'basement-other-field');
	toggleField('tech-other', 'tech-other-field');
	toggleField('basement-other', 'basement-other-field');
	// Группа 3.4: Крыша (НОВОЕ!)
  toggleField('roof-shape-custom', 'roof-shape-custom-field');
  toggleField('roof-cover-custom', 'roof-cover-custom-field');
    
  // 7. УНИВЕРСАЛЬНОЕ ОБНОВЛЕНИЕ ИМЕНИ ФАЙЛА (для всех полей загрузки)
  const fileInputs = document.querySelectorAll('.form-file input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', function() {
      const label = this.parentElement.querySelector('.file-label');
      if (this.files.length > 0) {
        label.textContent = this.files.length === 1 
          ? this.files[0].name 
          : `Файлов выбрано: ${this.files.length}`;
      } else {
        label.textContent = 'Выберите файл(ы)';
      }
    });
  });

  // 8. НАВИГАЦИЯ КНОПКАМИ "СЛЕДУЮЩИЙ / ПРЕДЫДУЩИЙ"
	const nextButtons = document.querySelectorAll('.brief-nav__next');
	const prevButtons = document.querySelectorAll('.brief-nav__prev');

	// Функция плавной прокрутки к табам (с задержкой для анимации)
	// Функция плавной прокрутки к началу брифа
	function scrollToBrief() {
		const anchor = document.getElementById('page-top');
		if (anchor) {
			anchor.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start' 
			});
		}
	}

	nextButtons.forEach(btn => {
		btn.addEventListener('click', function() {
			const allFieldsets = document.querySelectorAll('.brief_form fieldset');
			const currentFieldset = document.querySelector('.brief_form fieldset.active');
			const currentIndex = Array.from(allFieldsets).indexOf(currentFieldset);
			const nextFieldset = allFieldsets[currentIndex + 1];

			if (nextFieldset) {
				switchTab(nextFieldset.id);
				scrollToBrief(); // ← Прокрутка к табам
			}
		});
	});

	prevButtons.forEach(btn => {
		btn.addEventListener('click', function() {
			const allFieldsets = document.querySelectorAll('.brief_form fieldset');
			const currentFieldset = document.querySelector('.brief_form fieldset.active');
			const currentIndex = Array.from(allFieldsets).indexOf(currentFieldset);
			const prevFieldset = allFieldsets[currentIndex - 1];

			if (prevFieldset) {
				switchTab(prevFieldset.id);
				scrollToBrief(); // ← Прокрутка к табам
			}
		});
	});

	// 9. УПРАВЛЕНИЕ ВИДИМОСТЬЮ КНОПОК НАВИГАЦИИ
	function updateNavButtons() {
		const allFieldsets = document.querySelectorAll('.brief_form fieldset');
		const currentFieldset = document.querySelector('.brief_form fieldset.active');
		const currentIndex = Array.from(allFieldsets).indexOf(currentFieldset);
		const totalSteps = allFieldsets.length;
		const btnPrev = document.querySelector('.brief-nav__prev');
		const btnNext = document.querySelector('.brief-nav__next');
		const btnSubmit = document.querySelector('.brief-nav__submit');
		const consentWrapper = document.getElementById('consent-wrapper'); // <-- Находим блок согласия

		if (!btnPrev || !btnNext || !btnSubmit) return;

		// Сброс состояний (всё прячем по умолчанию)
		btnPrev.classList.remove('disabled');
		btnNext.classList.remove('hidden');
		btnSubmit.classList.add('hidden');
		consentWrapper.classList.add('hidden'); // <-- Прячем согласие

		// Правило 1: Первый шаг
		if (currentIndex === 0) {
			btnPrev.classList.add('disabled');
		}
		// Правило 2: Последний шаг
		else if (currentIndex === totalSteps - 1) {
			btnNext.classList.add('hidden');
			btnSubmit.classList.remove('hidden');
			consentWrapper.classList.remove('hidden'); // <-- ПОКАЗЫВАЕМ согласие на последнем шаге
		}
	}
	
	// 10. УНИВЕРСАЛЬНАЯ ПАМЯТЬ ФОРМЫ (Автосохранение и восстановление)
  const form = document.getElementById('briefForm');
  const storageKey = 'pomazov_brief_data_v1'; // Ключ для localStorage

  // Функция сохранения
  function saveFormData() {
    const formData = {};
    const elements = form.elements;

    // Проходим по всем полям формы
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      // Сохраняем только поля с именем name (кроме кнопок)
      if (el.name && el.type !== 'submit' && el.type !== 'button') {
        if (el.type === 'checkbox' || el.type === 'radio') {
          // Для чекбоксов создаем массив выбранных значений
          if (!formData[el.name]) formData[el.name] = [];
          if (el.checked) formData[el.name].push(el.value);
        } else {
          // Для текстовых полей просто сохраняем значение
          formData[el.name] = el.value;
        }
      }
    }
    // Записываем в память браузера
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }

  // Функция восстановления
  function restoreFormData() {
    const savedData = localStorage.getItem(storageKey);
    if (!savedData) return; // Если памяти нет, выходим

    const formData = JSON.parse(savedData);
    const elements = form.elements;

    // Проходим по всем полям и заполняем их
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el.name && formData.hasOwnProperty(el.name)) {
        if (el.type === 'checkbox' || el.type === 'radio') {
          // Если значение есть в сохраненном массиве — ставим галочку
          el.checked = formData[el.name].includes(el.value);
          
          // ВАЖНО: Искусственно вызываем событие change, чтобы сработал toggleField
          // (показались скрытые поля, например, загрузка файлов)
          if (el.checked) el.dispatchEvent(new Event('change'));
        } else {
          el.value = formData[el.name];
        }
      }
    }
  }

  // Слушаем любые изменения в форме и сохраняем
  form.addEventListener('input', saveFormData);
  form.addEventListener('change', saveFormData);

  // Восстанавливаем данные при загрузке
  restoreFormData();
	
	// 11. МАСКИ ДЛЯ ПОЛЕЙ ВВОДА
	// Маска для телефона (если ещё не сделана)
	const telInput = document.getElementById('tel');
	if (telInput) {
		IMask(telInput, {
			mask: '+7(000) 000-00-00',
			lazy: false
		});
	}
	// Маска для бюджета (числовая с разделителем тысяч)
	const priceInputs = document.querySelectorAll('#min_price, #max_price');
	priceInputs.forEach(input => {
		IMask(input, {
			mask: Number,
			thousandsSeparator: ' ', // Пробел как разделитель (2 500 000)
			radix: ',',              // Запятая для дробных (если понадобятся)
			scale: 0,                // 0 знаков после запятой (бюджет целыми числами)
			normalizeZeros: true,    // Убирает лишние нули в начале
			padFractionalZeros: false
		});
	});
	// Маска для кадастрового номера: 00:00:0000000:0000
	const cadastrInput = document.getElementById('inputCadastr');
	if (cadastrInput) {
		IMask(cadastrInput, {
			mask: '00:00:0000000:0000',
			lazy: false,  // Показывать плейсхолдер-маску сразу
			placeholderChar: '0'  // Символ-заполнитель
		});
	}
});