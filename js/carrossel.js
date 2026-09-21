const INACTIVITY_DELAY = 10000;
const AUTO_ADVANCE_INTERVAL = 5000;
const SLIDE_ANIMATION_DURATION = 460;

const kidsSlides = document.querySelectorAll('[data-kids-slide]');
const kidsDots = document.querySelectorAll('[data-kids-dot]');
const kidsCarousel = document.querySelector('[data-kids-carousel]');
const kidsPrevious = document.querySelector('[data-kids-previous]');
const kidsNext = document.querySelector('[data-kids-next]');
let currentKidsSlide = 0;
let touchStartX = null;
let touchStartY = null;
let kidsSlideIsAnimating = false;
let inactivityTimer = null;
let automaticSlideTimer = null;

const stopAutomaticSlides = () => {
	if (automaticSlideTimer) {
		window.clearInterval(automaticSlideTimer);
		automaticSlideTimer = null;
	}
};

const startAutomaticSlides = () => {
	stopAutomaticSlides();
	automaticSlideTimer = window.setInterval(() => {
		showKidsSlide(currentKidsSlide + 1);
	}, AUTO_ADVANCE_INTERVAL);
};

const resetInactivityTimer = () => {
	if (inactivityTimer) window.clearTimeout(inactivityTimer);
	stopAutomaticSlides();
	inactivityTimer = window.setTimeout(startAutomaticSlides, INACTIVITY_DELAY);
};

const showKidsSlide = (slideIndex, direction = 1, isManual = false) => {
	if (kidsSlideIsAnimating || kidsSlides.length < 2) return;

	const nextKidsSlide = (slideIndex + kidsSlides.length) % kidsSlides.length;
	if (nextKidsSlide === currentKidsSlide) return;

	kidsSlideIsAnimating = true;
	currentKidsSlide = nextKidsSlide;

	kidsSlides.forEach((slide, index) => {
		slide.classList.toggle('is-active', index === currentKidsSlide);
		slide.setAttribute('aria-hidden', String(index !== currentKidsSlide));
	});
	kidsCarousel.style.transform = `translateX(-${currentKidsSlide * 50}%)`;

	window.setTimeout(() => {
		kidsSlideIsAnimating = false;
	}, SLIDE_ANIMATION_DURATION);

	kidsDots.forEach((dot, index) => {
		const isActive = index === currentKidsSlide;
		dot.classList.toggle('is-active', isActive);
		dot.setAttribute('aria-current', String(isActive));
	});

	if (isManual) resetInactivityTimer();
};

if (kidsSlides.length) {
	kidsPrevious?.addEventListener('click', () => showKidsSlide(currentKidsSlide - 1, -1, true));
	kidsNext?.addEventListener('click', () => showKidsSlide(currentKidsSlide + 1, 1, true));
	kidsDots.forEach((dot) => {
		dot.addEventListener('click', () => {
			const targetSlide = Number(dot.dataset.kidsDot);
			const direction = targetSlide > currentKidsSlide ? 1 : -1;
			showKidsSlide(targetSlide, direction, true);
		});
	});

	kidsCarousel?.addEventListener('pointerdown', (event) => {
		if (!event.isPrimary) return;
		touchStartX = event.clientX;
		touchStartY = event.clientY;
	});

	kidsCarousel?.addEventListener('pointerup', (event) => {
		if (!event.isPrimary || touchStartX === null || touchStartY === null) return;

		const horizontalDistance = event.clientX - touchStartX;
		const verticalDistance = event.clientY - touchStartY;
		const isHorizontalSwipe = Math.abs(horizontalDistance) > 50 && Math.abs(horizontalDistance) > Math.abs(verticalDistance);

		if (isHorizontalSwipe) {
			const direction = horizontalDistance < 0 ? 1 : -1;
			showKidsSlide(currentKidsSlide + direction, direction, true);
		}

		touchStartX = null;
		touchStartY = null;
	});

	kidsCarousel?.addEventListener('pointercancel', () => {
		touchStartX = null;
		touchStartY = null;
	});

	resetInactivityTimer();
}