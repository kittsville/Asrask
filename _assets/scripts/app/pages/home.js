#= require app/pages

class HomePage extends AppPage {
	loadPage() {
		console.log('Loaded homepage');

		this.title = 'Home';

		this.setPage();
	}

	static get route() {
		return new route('');
	}
}
