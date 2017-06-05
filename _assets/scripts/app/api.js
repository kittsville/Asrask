class apiRequest {
	constructor(endpoint, onSuccess, page, notManager) {
		this.onSuccess  = onSuccess;
		this.page       = page;
		this.notManager = notManager;
		
		// e.g. api.example.com/v1/
		let apiBase = '{{ site.rendant_api }}',
		params = {
			headers: {
				'Accept' : 'application/json',
			},
		},
		uri = apiBase + endpoint;
		
		fetch(uri, params).then(this.checkValidResponse.bind(this));
	}
	
	checkValidResponse(response) {
		let contentType = response.headers.get("content-type");
		
		if (contentType && contentType.indexOf("application/json") !== -1) {
			return response.json().then(this.onSuccess);
		} else {
			this.onNotJson();
		}
	}
	
	onNotJson() {
		this.notManager.addNotification('The server returned an invalid response');
	}
}
