class navManager {
	constructor(wrapper, activityManager){
		this.wrapper         = wrapper;
		this.activityManager = activityManager;
		
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
		
		let routeMatcher = new RegExp(
			'^('  + routePatterns.join(')|(') + ')$', 
			'gi'
		),
		uri = window.location.pathname.substring(3);
		uri = uri.substring(0, uri.length-1);
		
		let matches = routeMatcher.exec(uri);
		
		if (matches == null) {
			throw 404;
		} else {
			let routeIndex = matches.indexOf(matches[0], 1),
			pageType       = this.dispatcher[routeIndex - 1],
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
				this,
				names
			);
		}
	}
}
