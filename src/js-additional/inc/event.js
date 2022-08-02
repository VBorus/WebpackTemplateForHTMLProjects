class Event {
	event(selector, callback, target = "one", event = "click", options = false) {
		if (event === "click") {
			if (target === "all") {
				this._onClickAll(selector, callback, options);
			}
			if (target === "one") {
				this._onClick(selector, callback, options);
			}
		} else {
			if (target === "all") {
				this._onEventAll(selector, event, callback, options);
			}
			if (target === "one") {
				this._onEvent(selector, event, callback, options);
			}
		}
	}
	_onEvent(arg, event2, func, options = false) {
		if (document.querySelector(arg)) {
			document.querySelector(arg).addEventListener(event2, func, options);
		}
	}
	_onEventAll(arg, event, func, options = false) {
		if (document.querySelector(arg)) {
			let mas = document.querySelectorAll(arg);
			for (let i = mas.length - 1; i >= 0; i--) {
				mas[i].addEventListener(event, func, options);
			}
		}
	}
	_onClick(arg, callback, options = false) {
		if (document.querySelector(arg)) {
			if ('touchstart' in document.documentElement) {
				document.querySelector(arg).addEventListener('touchstart', callback, options);
			} else {
				document.querySelector(arg).addEventListener('click', callback, options);
			}
		}
	}
	_onClickAll(arg, callback, options = false) {
		if (document.querySelectorAll(arg)) {
			let list = document.querySelectorAll(arg);
			if ('touchstart' in document.documentElement) {
				for (let i = list.length - 1; i >= 0; i--) {
					list[i].addEventListener('touchstart', callback, options);
				}
			} else {
				for (let i = list.length - 1; i >= 0; i--) {
					list[i].addEventListener('click', callback, options);
				}
			}
		}
	}
}
export default new Event();
