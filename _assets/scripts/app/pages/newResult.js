#= require app/pages

class newResultPage extends appPage {
	loadPage() {
		console.log('Loaded new result page');
		
		this.title = 'New Analysis';
		
		this.setPage();
	}
	
	static get route() {
		return new route(/results\/new/);
	}
}
