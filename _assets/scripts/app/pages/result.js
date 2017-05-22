#= require app/pages

class resultPage extends appPage {
	loadPage() {
		this.activityId = this.activityManager.startActivity(function(){console.log('stopped');});
		
		let uri = 'results/' + this.resultId,
		params  = {
			success : this.renderPage.bind(this),
		},
		req = apiRequest(uri, params);
	}
	
	renderPage(response) {
		console.log(response);
		
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
