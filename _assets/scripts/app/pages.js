class appPage {
	constructor(wrapper, activityManager, navManager, names) {
		this.wrapper         = wrapper;
		this.activityManager = activityManager;
		this.navManager      = navManager;
		this.titleSuffix     = ' - Raofu';
		this.titleElement    = document.getElementsByTagName('title')[0];
		this.metaTitles      = document.getElementsByClassName('title');
		
		for (name in names) {
			this[name] = names[name];
		}
		
		this.loadPage();
	}
	
	setPage(content) {
		this.wrapper.innerHTML = '';
		
		this.wrapper.appendChild(content);
		
		componentHandler.upgradeElements(this.wrapper);
	}
	
	set title(text) {
		this.pageTitle = text;
		
		this.titleElement.textContent = text + this.titleSuffix;
		
		for (var i = 0; i < this.metaTitles.length; i++) {
			this.metaTitles[i].content = text;
		}
	}
	
	get title() {
		return this.pageTitle;
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
