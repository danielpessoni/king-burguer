(() => {
	'use strict';

	const hmmSection = document.querySelector('.hmm-product');
	if (!hmmSection) return;

	const animatedElements = hmmSection.querySelectorAll(
		'.hmm-product-header h2, .hmm-product-header p, .hmm-product-visual img, .hmm-product-details'
	);
	if (!animatedElements.length) return;

	hmmSection.classList.add('is-observed');

	const revealHmmmProduct = (entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	};

	const hmmObserver = new IntersectionObserver(revealHmmmProduct, {
		threshold: 0.2
	});

	animatedElements.forEach((element) => hmmObserver.observe(element));
})();