const navigationLinks = document.querySelectorAll('.desktop-links a, .mobile-links a');

navigationLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		const targetId = link.getAttribute('href');
		const targetSection = targetId ? document.querySelector(targetId) : null;

		if (!targetSection) return;

		event.preventDefault();
		targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.pushState(null, '', targetId);
	});
});