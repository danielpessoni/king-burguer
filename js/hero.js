(() => {
	'use strict';

	const heroPromo = document.querySelector('.hero-promo');
	if (!heroPromo) return;

	const revealHero = () => {
		heroPromo.classList.add('is-ready');
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', revealHero, { once: true });
	} else {
		revealHero();
	}
})();