(() => {
	'use strict';

	const menuSection = document.querySelector('.menu-section');
	if (!menuSection) return;

	const animatedElements = menuSection.querySelectorAll(
		'.menu-section-header h2, .menu-section-header p, .menu-filter, .menu-grid'
	);
	if (!animatedElements.length) return;

	menuSection.classList.add('is-observed');

	menuSection.querySelectorAll('.menu-filter').forEach((filter, index) => {
		filter.style.setProperty('--menu-filter-delay', `${index * 90}ms`);
	});

	const revealMenuElement = (entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	};

	const menuObserver = new IntersectionObserver(revealMenuElement, {
		threshold: 0.2
	});

	animatedElements.forEach((element) => menuObserver.observe(element));
})();