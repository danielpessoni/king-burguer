/**
 * menu.js - King Burguer
 * 
 * Responsável pelo controle de animação e comportamento do menu de navegação
 * na rolagem da página (shrink on scroll).
 */

(() => {
	'use strict';

	// Configuração do limiar de scroll para ativar o encolhimento do menu
	const SCROLL_THRESHOLD = 25;
	const SCROLLED_CLASS = 'is-scrolled';

	const header = document.querySelector('.site-header');
	if (!header) return;

	let isScrolled = false;
	let ticking = false;

	/**
	 * Atualiza o estado da classe do menu de acordo com o scroll vertical
	 */
	const updateMenuState = () => {
		const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
		const shouldBeScrolled = currentScrollY > SCROLL_THRESHOLD;

		if (shouldBeScrolled !== isScrolled) {
			isScrolled = shouldBeScrolled;
			header.classList.toggle(SCROLLED_CLASS, isScrolled);
		}

		ticking = false;
	};

	/**
	 * Handler do evento scroll otimizado com requestAnimationFrame
	 */
	const onScroll = () => {
		if (!ticking) {
			window.requestAnimationFrame(updateMenuState);
			ticking = true;
		}
	};

	/**
	 * Inicializa o observador de rolagem do menu
	 */
	const initMenuAnimation = () => {
		// Sincroniza o estado inicial (caso o usuário atualize a página já rolada)
		updateMenuState();

		// Listener passivo para garantir 60fps sem bloquear a thread principal
		window.addEventListener('scroll', onScroll, { passive: true });
	};

	// Executa quando o DOM estiver pronto
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMenuAnimation);
	} else {
		initMenuAnimation();
	}
})();
