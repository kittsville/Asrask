class generator {
	constructor(navManager) {
		this.navManager = navManager;
	}
	
	_genLink() {
		let link = document.createElement('a');
		
		this.navManager.handleLink(link);
		
		return link;
	}
}
