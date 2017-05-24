#= require app/pages

class resultPage extends appPage {
	loadPage() {
		this.activityId = this.activityManager.startActivity(this.stopPageLoad.bind(this));
		
		let uri = 'results/' + this.resultId,
		params  = {
			success : this.renderPage.bind(this),
		},
		req = apiRequest(uri, params);
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
