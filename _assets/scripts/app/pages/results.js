#= require app/pages

class resultsPage extends appPage {
	loadPage() {
		console.log('Loaded results page');
	}
	
	static get route() {
		return new route(/results/);
	}
}
