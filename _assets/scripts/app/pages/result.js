#= require app/pages

class resultPage extends appPage {
	constructor(names) {
		super();
		
		this.resultId = names.resultId;
	}
	
	static get route() {
		return new route(/results\/([a-z0-9_\-]{12})/, ['resultId']);
	}
}
