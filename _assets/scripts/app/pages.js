class appPage {
	constructor(wrapper, activityManager, notManager, navManager, pageUrl, names, historyType) {
		this.wrapper         = wrapper;
		this.activityManager = activityManager;
		this.notManager      = notManager;
		this.navManager      = navManager;
		this.pageUrl         = pageUrl;
		this.historyType     = historyType;
		this.titleSuffix     = ' - Raofu';
		this.titleElement    = document.getElementsByTagName('title')[0];
		this.metaTitles      = document.getElementsByClassName('title');
		this.stop            = false;
		
		for (name in names) {
			this[name] = names[name];
		}
		
		this.loadPage();
	}
	
	setPage(content = null) {
		this.wrapper.innerHTML = '';
		
		// Allows page to be blanked
		if (content != null) {
			this.wrapper.appendChild(content);
			
			componentHandler.upgradeElements(this.wrapper);
		}
		
		let url = '/a/' + this.pageUrl;
		
		if (!url.endsWith('/')) {
			url += '/';
		}
		
		switch (this.historyType) {
			case 'new':
				history.pushState(null, '', url);
			break;
			
			case 'update':
				history.replaceState(null, '', url);
			break;
			
			case 'navigate':
				// Do nothing when navigating through browser history
			break;
		}
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
