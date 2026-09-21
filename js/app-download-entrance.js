(() => {
	'use strict';

	const appSection = document.querySelector('.app-download');
	if (!appSection) return;

	const appContent = appSection.querySelector('.app-download-content');

	appSection.classList.add('is-observed');
	appContent?.classList.add('is-observed');

	const revealAppSection = (entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	};

	const appObserver = new IntersectionObserver(revealAppSection, {
		threshold: 0.18
	});

	appObserver.observe(appSection);

	if (appContent) {
		const revealAppContent = (entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		};

		const appContentObserver = new IntersectionObserver(revealAppContent, {
			threshold: 0.2
		});

		appContentObserver.observe(appContent);
	}

	appSection.querySelectorAll('.app-store-button').forEach((button) => {
		button.addEventListener('click', () => {
			button.classList.remove('is-rippling');
			void button.offsetWidth;
			button.classList.add('is-rippling');
		});
	});
})();