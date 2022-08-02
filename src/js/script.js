document.addEventListener("DOMContentLoaded", function() {
	require('../js-additional/inc/lazyload')();
	const Event = require('../js-additional/inc/event').default;
	const Other = require('../js-additional/inc/other').default;

	let variable = "Item";
	console.log(variable);
	Event.event(".hamburger", () => {
		document.querySelector(".header").classList.toggle("header-mobile-menu-open");
	},"all");
	Event.event("#scrollToTop", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
	Event.event("body", (e) => {
	},"all");
});
