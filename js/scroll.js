const navigationLinks = document.querySelectorAll('.desktop-links a, .mobile-links a');

navigationLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		const targetId = link.getAttribute('href');
		const targetSection = targetId ? document.querySelector(targetId) : null;

		if (!targetSection) return;

		event.preventDefault();
		targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.pushState(null, '', targetId);
	});
});

// Rolagem suave do botão de promoções
const heroPromoScroll = document.querySelector('.hero-promo-scroll');
const promotionsSection = document.querySelector('#promocoes');

heroPromoScroll?.addEventListener('click', (event) => {
	if (!promotionsSection) return;

	event.preventDefault();
	promotionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});