#= require app/pages

class ResultsPage extends AppPage {
	loadPage() {
		console.log('Loaded results page');

		this.title = 'Results';

		this.setPage();
	}

	static get route() {
		return new route(/results/);
	}
}
