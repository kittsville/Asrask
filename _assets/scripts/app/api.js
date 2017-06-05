class apiRequest {
	constructor(endpoint, params, page, notManager) {
		this.page       = page;
		this.notManager = notManager;
		
		this.onSuccess = params.success;
		
		if (params.hasOwnProperty('error')) {
			this.onError = params.error;
		}
		
		// e.g. api.example.com/v1/
		let apiBase = '{{ site.rendant_api }}',
		requestParams = {
			headers: {
				'Accept' : 'application/json',
			},
		},
		uri = apiBase + endpoint;
		
		fetch(uri, requestParams)
			.then(this.checkValidResponse.bind(this))
			.catch(this.onFail.bind(this));
	}
	
	checkValidResponse(response) {
		let contentType = response.headers.get("content-type");
		
		if (!(contentType || contentType.indexOf("application/json") == -1)) {
			return this.onNotJson();
		}
		
		if (!response.ok) {
			return this.onError();
		}
		
		return response.json().then(this.onSuccess);
	}
	
	onNotJson() {
		this.notManager.addNotification('The server returned an invalid response');
	}
	
	onError() {
		this.notManager.addNotification('The server returned an error');
	}
	
	onFail() {
		this.notManager.addNotification('Request failed. Check your internet connection');
	}
}
