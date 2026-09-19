(() => {
	'use strict';

	const kingsSection = document.querySelector('#promocoes');
	if (!kingsSection) return;

	const animatedElements = kingsSection.querySelectorAll(
		'.kings-bacon-title, .kings-bacon-subtitle, .kings-bacon-card'
	);
	if (!animatedElements.length) return;

	const revealKingsElement = (entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	};

	const kingsObserver = new IntersectionObserver(revealKingsElement, {
		threshold: 0.2
	});

	animatedElements.forEach((element) => kingsObserver.observe(element));
})();