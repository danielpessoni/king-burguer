(() => {
	'use strict';

	const ingredientsSection = document.querySelector('.ingredients-showcase');
	if (!ingredientsSection) return;

	const animatedElements = ingredientsSection.querySelectorAll(
		'.ingredients-showcase-header h2, .ingredients-showcase-header p, .ingredient-card'
	);
	if (!animatedElements.length) return;

	ingredientsSection.classList.add('is-observed');

	animatedElements.forEach((element, index) => {
		if (element.classList.contains('ingredient-card')) {
			element.style.setProperty('--ingredient-delay', `${index * 110}ms`);
		}
	});

	const revealIngredients = (entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	};

	const ingredientsObserver = new IntersectionObserver(revealIngredients, {
		threshold: 0.2
	});

	animatedElements.forEach((element) => ingredientsObserver.observe(element));
})();