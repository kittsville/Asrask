#= require app/pages

class newResultPage extends appPage {
	loadPage() {
		console.log('Loaded new result page');
		
		
		this.setPage();
		this.title = 'New Result';
	}
	
	static get route() {
		return new route(/results\/new/);
	}
}
