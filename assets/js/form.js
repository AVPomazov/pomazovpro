document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. ЛОГИКА ЗАГРУЗКИ ФАЙЛОВ (Drag-and-Drop)
  // ==========================================
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-attach');

  // Если на странице нет зоны загрузки, просто пропускаем этот блок, чтобы не было ошибок
  if (dropZone && fileInput) {
    const mainText = dropZone.querySelector('.form-file-main-text');
    const fileNameDisplay = dropZone.querySelector('.form-file-name');
    const hint = dropZone.querySelector('.form-hint');

    const updateFileName = (file) => {
      if (file) {
        mainText.style.display = 'none';
        hint.style.display = 'none';
        fileNameDisplay.textContent = `Выбран файл: ${file.name}`;
        fileNameDisplay.style.display = 'block';
      } else {
        mainText.style.display = 'block';
        hint.style.display = 'block';
        fileNameDisplay.style.display = 'none';
      }
    };

    fileInput.addEventListener('change', () => {
      updateFileName(fileInput.files[0]);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.add('is-dragging'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.remove('is-dragging'), false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      
      if (files.length > 0) {
        fileInput.files = files; 
        updateFileName(files[0]); 
      }
    });
  }

  // ==========================================
  // 2. ЛОГИКА СТРЕЛКИ ДЛЯ КАСТОМНОГО SELECT
  // ==========================================
  const selectWrappers = document.querySelectorAll('.form-select-wrapper');
  
  selectWrappers.forEach(wrapper => {
    const select = wrapper.querySelector('.form-select');
    if (!select) return; // Дополнительная защита
    
    // Открытие списка (клик мышью)
    select.addEventListener('mousedown', () => {
      wrapper.classList.add('is-open');
    });
    
    // Закрытие списка (потеря фокуса)
    select.addEventListener('blur', () => {
      wrapper.classList.remove('is-open');
    });
    
    // Закрытие после выбора
    select.addEventListener('change', () => {
      wrapper.classList.remove('is-open');
    });
    
    // Поддержка клавиатуры (Space/Enter открывает список)
    select.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        wrapper.classList.add('is-open');
      }
    });
  });
});