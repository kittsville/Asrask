#= require app/pages

class resultPage extends appPage {
	constructor(wrapper, activityManager, names) {
		super(wrapper, activityManager);
		
		this.resultId = names.resultId;
		
		this.loadPage();
	}
	
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
		
		let generator = new tableGenerator(),
		table         = generator.genUserTable(response.data);
		
		this.wrapper.appendChild(table);
		
		this.activityManager.endActivity(this.activityId);
	}
	
	static get route() {
		return new route(/results\/([a-z0-9_\-]{12})/, ['resultId']);
	}
}
