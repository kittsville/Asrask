#= require app/pages

class ResultPage extends AppPage {
	loadPage() {
		this.activityId = this.activityManager.startActivity(this.stopPageLoad.bind(this));

		let apiPath = 'results/' + this.resultId;

		new apiRequest(
			apiPath,
			{
				success    : this.renderPage.bind(this),
				error      : this.pageLoadFailed.bind(this),
				activityId : this.activityId,
			},
			this,
			this.activityManager,
			this.notManager
		);
	}

	pageLoadFailed(httpRequest) {
		this.notManager.addNotification('Failed to load result');

		this.activityManager.endActivity(this.activityId);
	}

	stopPageLoad() {
		this.stop = true;
	}

	renderPage(response) {
		if (this.stop == true) {
			this.stop = false;

			return;
		}

		let generator = new TableGenerator(this.navManager),
		table         = generator.genUserTable(response.data);

		this.setPage(table);

		this.title = 'Thread Analysis';

		this.activityManager.endActivity(this.activityId);
	}

	static get route() {
		return new route(/results\/([a-z0-9_\-]{12})/, ['resultId']);
	}
}
