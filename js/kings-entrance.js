(() => {
	'use strict';

	const kingsSection = document.querySelector('#promocoes');
	const doubleKingSection = document.querySelector('#king-em-dobro');
	const doubleKingSupertitle = doubleKingSection?.querySelector('.king-em-dobro-supertitle');
	const doubleKingNumber = doubleKingSection?.querySelector('.king-em-dobro-number');
	const doubleKingAmount = doubleKingSection?.querySelector('.king-em-dobro-amount');
	const doubleKingComma = doubleKingSection?.querySelector('.king-em-dobro-comma');
	const doubleKingCents = doubleKingSection?.querySelector('.king-em-dobro-cents');
	let doubleKingCounterStarted = false;

	const prepareSupertitleLetters = () => {
		if (!doubleKingSupertitle || doubleKingSupertitle.dataset.lettersReady) return;

		const text = doubleKingSupertitle.textContent.trim();
		doubleKingSupertitle.setAttribute('aria-label', text);
		doubleKingSupertitle.textContent = '';

		[...text].forEach((character, index) => {
			const letter = document.createElement('span');
			letter.setAttribute('aria-hidden', 'true');
			letter.style.setProperty('--letter-index', index);
			letter.textContent = character === ' ' ? '\u00a0' : character;
			doubleKingSupertitle.append(letter);
		});

		doubleKingSupertitle.dataset.lettersReady = 'true';
	};

	const prepareCounter = (element) => {
		if (!element || element.dataset.counterTarget) return;

		const numericText = element.textContent.replace(/\D/g, '');
		const target = Number.parseInt(numericText, 10);
		if (Number.isNaN(target)) return;

		element.dataset.counterTarget = String(target);
		element.textContent = '0';
	};

	const setFinalCounterValues = () => {
		[doubleKingNumber, doubleKingAmount, doubleKingCents].forEach((element) => {
			if (element?.dataset.counterTarget) {
				element.textContent = element.dataset.counterTarget;
			}
		});
	};

	const animateCounter = (element, startTime, duration = 900) => {
		if (!element?.dataset.counterTarget) return;

		const target = Number(element.dataset.counterTarget);

		const updateCounter = (currentTime) => {
			const progress = Math.min((currentTime - startTime) / duration, 1);
			element.textContent = String(Math.round(target * progress));

			if (progress < 1) {
				window.requestAnimationFrame(updateCounter);
			}
		};

		window.requestAnimationFrame(updateCounter);
	};

	const startDoubleKingCounters = () => {
		if (doubleKingCounterStarted) return;
		doubleKingCounterStarted = true;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setFinalCounterValues();
			return;
		}

		const counterStartTime = performance.now();
		animateCounter(doubleKingNumber, counterStartTime, 900);
		animateCounter(doubleKingAmount, counterStartTime, 1500);
		animateCounter(doubleKingCents, counterStartTime, 1500);
	};

	prepareSupertitleLetters();
	prepareCounter(doubleKingNumber);
	prepareCounter(doubleKingAmount);
	prepareCounter(doubleKingCents);

	const animatedElements = [
		...(kingsSection?.querySelectorAll('.kings-bacon-title, .kings-bacon-subtitle, .kings-bacon-card') ?? []),
		...(doubleKingSection ? [doubleKingSection] : [])
	];
	if (!animatedElements.length) return;

	const revealKingsElement = (entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			if (entry.target === doubleKingSection) {
				doubleKingSection.classList.add('is-visible');
				doubleKingSupertitle?.classList.add('is-visible');
				doubleKingComma?.classList.add('is-visible');
				doubleKingSection.querySelector('.king-em-dobro-card-title')?.classList.add('is-visible');
				startDoubleKingCounters();
			} else {
				entry.target.classList.add('is-visible');
			}
			observer.unobserve(entry.target);
		});
	};

	const kingsObserver = new IntersectionObserver(revealKingsElement, {
		threshold: 0.2
	});

	animatedElements.forEach((element) => kingsObserver.observe(element));
})();