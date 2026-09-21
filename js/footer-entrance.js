(() => {
	'use strict';

	const footer = document.querySelector('.site-footer');
	if (!footer || !('IntersectionObserver' in window)) return;

	footer.classList.add('is-observed');

	const footerObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, {
		threshold: 0.18
	});

	footerObserver.observe(footer);
})();