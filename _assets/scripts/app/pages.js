class appPage {
	focus() {
		console.log('Focused');
	}
	
	defocus() {
		console.log('Defocused');
	}
}

class route {
	constructor(pattern, names = []) {
		this.pattern = pattern;
		this.names   = names;
	}
}

class resultsPage extends appPage {
	static get route() {
		return new route(/results/);
	}
}

class resultPage extends appPage {
	constructor(names) {
		super();
		
		this.resultId = names.resultId;
	}
	
	static get route() {
		return new route(/results\/([a-z0-9_\-]{12})/, ['resultId']);
	}
}

class newResultPage extends appPage {
	static get route() {
		return new route(/results\/new/);
	}
}
