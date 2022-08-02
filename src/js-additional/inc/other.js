class Other {
	sheludeBlockSubmit(){
		if (window.location.pathname.indexOf('/shelude') !== -1) {
			let submit = document.querySelector('.find-submit');
			if (!submit){
				return false;
			}
			submit.addEventListener("click", function() {
				let shelude = document.querySelector('.shelude');
				if (shelude){
					shelude.scrollIntoView({
						behavior: "smooth"
					});
				}
			}, true);
		}
	}
}
export default new Other();
