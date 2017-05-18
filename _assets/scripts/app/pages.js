class appPage {
	constructor(wrapper, activityManager) {
		this.wrapper         = wrapper;
		this.activityManager = activityManager;
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
