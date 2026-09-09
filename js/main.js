const menuToggle = document.querySelector('.menu-toggle');
const drawerClose = document.querySelector('.drawer-close');
const menuOverlay = document.querySelector('[data-menu-overlay]');
const mobileLinks = document.querySelectorAll('.mobile-links a');
const mobileDrawer = document.querySelector('.mobile-drawer');

const setMenuState = (isOpen) => {
	document.body.classList.toggle('menu-is-open', isOpen);
	menuToggle?.setAttribute('aria-expanded', String(isOpen));
	mobileDrawer?.setAttribute('aria-hidden', String(!isOpen));
};

menuToggle?.addEventListener('click', () => setMenuState(true));
drawerClose?.addEventListener('click', () => setMenuState(false));
menuOverlay?.addEventListener('click', () => setMenuState(false));
mobileLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

const kidsSlides = document.querySelectorAll('[data-kids-slide]');
const kidsDots = document.querySelectorAll('[data-kids-dot]');
const kidsCarousel = document.querySelector('[data-kids-carousel]');
const kidsPrevious = document.querySelector('[data-kids-previous]');
const kidsNext = document.querySelector('[data-kids-next]');
let currentKidsSlide = 0;
let touchStartX = null;
let touchStartY = null;
let kidsSlideIsAnimating = false;

const showKidsSlide = (slideIndex, direction = 1) => {
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
	}, 460);

	kidsDots.forEach((dot, index) => {
		const isActive = index === currentKidsSlide;
		dot.classList.toggle('is-active', isActive);
		dot.setAttribute('aria-current', String(isActive));
	});
};

if (kidsSlides.length) {
	kidsPrevious?.addEventListener('click', () => showKidsSlide(currentKidsSlide - 1, -1));
	kidsNext?.addEventListener('click', () => showKidsSlide(currentKidsSlide + 1, 1));
	kidsDots.forEach((dot) => {
		dot.addEventListener('click', () => {
			const targetSlide = Number(dot.dataset.kidsDot);
			const direction = targetSlide > currentKidsSlide ? 1 : -1;
			showKidsSlide(targetSlide, direction);
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
			showKidsSlide(currentKidsSlide + direction, direction);
		}

		touchStartX = null;
		touchStartY = null;
	});

	kidsCarousel?.addEventListener('pointercancel', () => {
		touchStartX = null;
		touchStartY = null;
	});
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') setMenuState(false);
});
