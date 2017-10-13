#= require app/pages

class NotFoundPage extends AppPage {
	loadPage() {
		let page = cE('div', 'page error-page'),
		styles   = cE('style'),
		icon     = cE('i', 'material-icons rotate'),
		title    = cE('h1'),
		details  = cE('p');

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
