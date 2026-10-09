// JavaScript Document

// ==========================================================================
// NAVBAR - Sticky эффект и бургер-меню
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
	//Бургер
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.nav_menu');
	burger.addEventListener('click', function(){
		menu.classList.toggle('is_active');
		burger.classList.toggle('is_active');
	});
	
	// Кнопка "Наверх"
	(function() {
		const scrollBtn = document.querySelector('.scroll-to-top');
		if (!scrollBtn) return;

		const SHOW_AFTER = 400; // px прокрутки до появления

		window.addEventListener('scroll', function() {
			if (window.scrollY > SHOW_AFTER) {
				scrollBtn.classList.add('is-visible');
			} else {
				scrollBtn.classList.remove('is-visible');
			}
		});
	})();
});
