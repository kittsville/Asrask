class appPage {
	constructor(wrapper, activityManager) {
		this.wrapper         = wrapper;
		this.activityManager = activityManager;
	}
	
	setPage(content) {
		this.wrapper.innerHTML = '';
		
		this.wrapper.appendChild(content);
		
		componentHandler.upgradeElements(this.wrapper);
	}
	
	// Previously loaded page returned to
	refocus() {}
	
	// Page navigated away from
	defocus() {}
}

class route {
	constructor(pattern, names = []) {
		this.pattern = pattern;
		this.names   = names;
	}
}
