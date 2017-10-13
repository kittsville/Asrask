#= require app/pages

class homePage extends appPage {
	loadPage() {
		console.log('Loaded homepage');

		this.title = 'Home';

		this.setPage();
	}

	static get route() {
		return new route('');
	}
}
