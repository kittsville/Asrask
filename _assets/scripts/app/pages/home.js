#= require app/pages

class homePage extends appPage {
	loadPage() {
		console.log('Loaded homepage');
	}
	
	static get route() {
		return new route('');
	}
}
