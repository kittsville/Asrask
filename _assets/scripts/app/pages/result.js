#= require app/pages

class resultPage extends appPage {
	loadPage() {
		this.activityId = this.activityManager.startActivity(this.stopPageLoad.bind(this));
		
		let uri = 'results/' + this.resultId,
		params  = {
			success : this.renderPage.bind(this),
			fail    : this.pageLoadFailed.bind(this),
			error   : this.pageLoadFailed.bind(this),
		},
		req = apiRequest(uri, params);
	}
	
	pageLoadFailed(httpRequest) {
		alert('Failed to load Result page');
		
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
		
		let generator = new tableGenerator(this.navManager),
		table         = generator.genUserTable(response.data);
		
		this.setPage(table);
		
		this.title = 'Thread Analysis';
		
		this.activityManager.endActivity(this.activityId);
	}
	
	static get route() {
		return new route(/results\/([a-z0-9_\-]{12})/, ['resultId']);
	}
}
