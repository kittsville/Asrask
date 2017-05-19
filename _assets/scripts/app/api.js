function apiRequest(endpoint, params) {
	var params       = params || {},
	httpRequest      = new XMLHttpRequest(),
	httpMethod       = params.method || 'GET',                 // Sets HTTP Method, default is GET
	showActivity     = httpMethod !== 'GET',
	successCallback  = params.success || function(){},         // Optional AJAX success callback
	failureCallback  = params.fail || function(httpRequest) {  // Optional AJAX failure callback
		alert('Something went wrong. Try reloading the page');
	},
	errorCallback    = params.error || function(errorObject) { // Optional API error callback
		alert(errorObject.error);
	},
	responseJSON     = {},
	requestCompleted = function() {
		if (httpRequest.readyState == 4) {
			try {
				var responseJSON = JSON.parse(httpRequest.responseText);
			} catch (e) {
				failureCallback(httpRequest);
				
				if (showActivity) {
					ActivityIndicator.activityCompleted();
				}
				
				return;
			}
			
			if (httpRequest.status >= 200 && httpRequest.status <= 299) {
				successCallback(responseJSON, httpRequest);
			} else {
				console.log('API Error: ' + responseJSON.error);
				
				errorCallback(responseJSON, httpRequest);
			}
			
			if (showActivity) {
				ActivityIndicator.activityCompleted();
			}
		}
	};
	
	if (showActivity) {
		ActivityIndicator.activityStarted();
	}
	
	httpRequest.open(httpMethod, '{{ site.rendant_api }}/' + endpoint, true);
	httpRequest.onreadystatechange = requestCompleted;
	
	if (params.data) {
		httpRequest.send(JSON.stringify(params.data));
	} else {
		httpRequest.send();
	}
};
