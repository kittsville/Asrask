#= require app/pages

class notFoundPage extends appPage {
	loadPage() {
		let page = document.createElement('div'),
		styles   = document.createElement('style'),
		icon     = document.createElement('i'),
		title    = document.createElement('h1'),
		details  = document.createElement('p');
		
		page.classList.add('page', 'error-page');
		
		icon.classList.add('material-icons', 'rotate');
		icon.innerHTML = 'error';
		
		title.textContent   = '404 - Page not Found';
		details.textContent = 'Nobody here but us chickens ¯\\_(ツ)_/¯';
		
		styles.innerHTML = 'main {background: none}';
		
		page.appendChild(styles);
		page.appendChild(icon);
		page.appendChild(title);
		page.appendChild(details);
		
		this.title = 'Page not Found';
		
		this.setPage(page);
	}
}
