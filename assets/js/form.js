document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-attach');
    const mainText = dropZone.querySelector('.form-file-main-text');
    const fileNameDisplay = dropZone.querySelector('.form-file-name');
    const hint = dropZone.querySelector('.form-hint');

    // Функция обновления отображения имени файла
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

    // Стандартный выбор через диалог
    fileInput.addEventListener('change', () => {
      updateFileName(fileInput.files[0]);
    });

    // Drag-and-Drop события
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Визуальная реакция на перетаскивание
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.add('is-dragging'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => dropZone.classList.remove('is-dragging'), false);
    });

    // Обработка сброса файла
    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      
      if (files.length > 0) {
        fileInput.files = files; // Присваиваем файл инпуту
        updateFileName(files[0]); // Обновляем UI
      }
    });
  });