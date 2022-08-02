var observer = new IntersectionObserver(function(entries) {
	for (i in entries){

		if (entries[i].isIntersecting === true){
			if ( (
				!entries[i].target.getAttribute("src") ||
				entries[i].target.getAttribute("src") == "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxIDEnPjwvc3ZnPg== 100w"
				) &&
				entries[i].target.dataset.src
			){
				entries[i].target.setAttribute("src",entries[i].target.dataset.src);
			}
			if ((
				!entries[i].target.getAttribute("srcset") ||
				entries[i].target.getAttribute("srcset") == "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxIDEnPjwvc3ZnPg== 100w"
				) &&
				entries[i].target.dataset.srcset
			){
				entries[i].target.setAttribute("srcset",entries[i].target.dataset.srcset);
			}
		}
	}
}, { threshold: [0] });

let lazyLoad = () => {
	let mas = document.querySelectorAll('[data-src],[data-srcset]');
	for (var i = 0; i < mas.length; i++) {
		observer.observe(mas[i]);
	}
}

module.exports = lazyLoad;
