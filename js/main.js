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

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') setMenuState(false);
});
