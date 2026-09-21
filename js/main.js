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

const menuFilters = document.querySelectorAll('[data-menu-filter]');
const menuCards = document.querySelectorAll('[data-menu-card]');

const toggleMenuCard = (card) => {
	const isFlipped = card.classList.toggle('is-flipped');
	card.setAttribute('aria-pressed', String(isFlipped));
};

menuCards.forEach((card) => {
	card.addEventListener('click', () => toggleMenuCard(card));
	card.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleMenuCard(card);
		}
	});
});

menuFilters.forEach((filter) => {
	filter.addEventListener('click', () => {
		const selectedCategory = filter.dataset.menuFilter;

		menuFilters.forEach((item) => {
			const isActive = item === filter;
			item.classList.toggle('is-active', isActive);
			item.setAttribute('aria-pressed', String(isActive));
		});

		menuCards.forEach((card) => {
			const shouldShow = selectedCategory === 'todos' || card.dataset.category === selectedCategory;
			card.hidden = !shouldShow;
			if (!shouldShow) {
				card.classList.remove('is-flipped');
				card.setAttribute('aria-pressed', 'false');
			}
		});
	});
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') setMenuState(false);
});
