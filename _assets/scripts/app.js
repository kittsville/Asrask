#= require material.min
#= require app/notification
#= require app/navigation
#= require app/generators/table
#= require app/activity
#= require app/api
#= require app/pages
#= require app/pages/results
#= require app/pages/result
#= require app/pages/newResult
#= require app/pages/home

function launchApp() {
	let wrapper     = document.getElementById('page-wrapper'),
	activitySpinner = document.getElementById('activity'),
	activityManager = new activityIndicator(activitySpinner);
	
	this.nav = new navManager(wrapper, activityManager);
}
