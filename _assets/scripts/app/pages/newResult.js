#= require app/pages

class newResultPage extends appPage {
	loadPage() {
		console.log('Loaded new result page');
	}
	
	static get route() {
		return new route(/results\/new/);
	}
}
