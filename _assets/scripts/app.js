#= require material.min
#= require app/notification
#= require app/navigation
#= require app/template
#= require app/api
#= require app/pages
#= require app/pages/results
#= require app/pages/result
#= require app/pages/newResult

function launchApp() {
	let wrapper     = document.getElementById('page-wrapper');
	
	this.nav = new navManager(wrapper);
}
