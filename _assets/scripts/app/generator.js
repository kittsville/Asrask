class generator {
	constructor(navManager) {
		this.navManager = navManager;
	}
	
	_genLink() {
		let link = document.createElement('a');
		
		link.addEventListener('click', this.navManager.onClick.bind(this.navManager));
		
		return link;
	}
}
