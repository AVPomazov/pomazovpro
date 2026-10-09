// JavaScript Document

// ==========================================================================
// NAVBAR - Sticky эффект и бургер-меню
// ==========================================================================
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav_menu');
document.addEventListener('DOMContentLoaded', function() {
	burger.addEventListener('click', function(){
		menu.classList.toggle('is_active');
		burger.classList.toggle('is_active');
	});
//const burger = document.querySelector('.burger');
//	const menu = document.querySelector('.nav_menu');
// Бургер: открыть/закрыть меню
//  burger.addEventListener('click', () => {
//    menu.classList.toggle('is_active');
//    burger.classList.toggle('is_active');
//  });
//  
//  // Подменю: аккордеон
//  document.querySelectorAll('.has_submenu > a').forEach(link => {
//    link.addEventListener('click', (e) => {
//      if (window.innerWidth <= 1024) {
//        e.preventDefault();
//        const li = link.parentElement;
//        li.classList.toggle('is_open');
//      }
//    });
//  });
//  
//  // Закрыть меню при клике на обычную ссылку
//  document.querySelectorAll('.nav_menu a:not(.has_submenu > a)').forEach(link => {
//    link.addEventListener('click', () => {
//      menu.classList.remove('is_active');
//      burger.classList.remove('is_active');
//    });
//  });
});
