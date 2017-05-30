class navManager {
	constructor(wrapper, activityManager, notManager){
		this.wrapper         = wrapper;
		this.activityManager = activityManager;
		this.notManager      = notManager;
		
		// Ordered from most to least specific
		this.pageTypes = [
			newResultPage,
			resultPage,
			resultsPage,
			homePage,
		];
		
		this.dispatcher = {};
		
		let i = 0,
		routePatterns = [];
		
		this.pageTypes.forEach(function(pageType) {
			routePatterns.push(pageType.route.pattern.source);
			
			this.dispatcher[i] = pageType;
			
			i += 1 + pageType.route.names.length;
		}, this);
		
		this.routeMatcher = new RegExp(
			'^(('  + routePatterns.join(')|(') + '))$', 
			'gi'
		);
		
		if (!this._isAppUrl(window.location.href)) {
			throw 'App somehow initialised on bad URL';
		}
		
		let url = this._extractAppUrl(window.location.pathname);
		
		this.setPage(url, 'update');
		
		setTimeout(this.deferredSetup.bind(this), 50);
		
		window.addEventListener('popstate', this.onBrowserNavigation.bind(this));
	}
	
	// Performs non-immediate app setup
	deferredSetup() {
		document.querySelectorAll('#sidebar a').forEach(function(link) {
			this.handleLink(link);
		}, this);
	}
	
	handleLink(link) {
		link.addEventListener('click', this.onClick.bind(this));
	}
	
	onClick(e) {
		if (this._isAppUrl(e.target.href)) {
			e.preventDefault();
			
			let url = this._extractAppUrl(e.target.pathname);
			
			this.setPage(url, 'new');
		}
	}
	
	onBrowserNavigation(e) {
		let url = this._extractAppUrl(window.location.pathname);
		
		this.setPage(url, 'navigate');
	}
	
	setPage(url, historyType) {
		this.routeMatcher.lastIndex = 0;
		let matches = this.routeMatcher.exec(url);
		
		if (matches == null) {
			this.page = new notFoundPage(
				this.wrapper,
				this.activityManager,
				this.notManager,
				this,
				url,
				{},
				historyType
			);
		} else {
			let routeIndex = matches.indexOf(matches[0], 2),
			pageType       = this.dispatcher[routeIndex - 2],
			names          = {};
			
			// Prepares extracted URL parts for page e.g. Result ID
			if (pageType.route.names.length > 0) {
				let i = routeIndex + 1,
				j     = 0,
				max   = pageType.route.names.length;
				
				while (j < max) {
					names[pageType.route.names[j]] = matches[i];
					j++;
					i++;
				}
			}
			
			this.page = new pageType(
				this.wrapper,
				this.activityManager,
				this.notManager,
				this,
				url,
				names,
				historyType
			);
		}
	}
	
	_isAppUrl(url) {
		return url.startsWith('{{ site.app_url }}');
	}
	
	_extractAppUrl(url) {
		url = url.substring(3);
		
		if (url.endsWith('/')) {
			url = url.substring(0, url.length - 1);
		}
		
		return url;
	}
}
