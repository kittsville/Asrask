#= require app/pages

class resultsPage extends appPage {
	loadPage() {
		console.log('Loaded results page');
		
		this.title = 'Results';
		
		this.setPage();
	}
	
	static get route() {
		return new route(/results/);
	}
}
