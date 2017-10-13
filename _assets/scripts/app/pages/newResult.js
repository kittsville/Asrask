#= require app/pages
#= require app/generators/form

class NewResultPage extends AppPage {
	loadPage() {
		this.title = 'New Result';

		this.renderPage();
	}

	renderPage() {
		// Form Introduction
		let card  	= cE('div', 'mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-card mdl-cell--8-col'),
		title     	= cE('div', 'mdl-card__title'),
		titleText 	= cE('h2',  'mdl-card__title-text'),
		helpText  	= cE('div', 'mdl-card__supporting-text');

		titleText.textContent = 'New Result';
		helpText.innerHTML  = 'Identify users brigading a thread from a subreddit';

		title.appendChild(titleText);
		card.appendChild(title);
		card.appendChild(helpText);

		// Form Data Entry
		let formGenerator = new FormGenerator(this.navManager),
		form               = cE('form'),
		threadInput        = formGenerator.textInput('threadUrl', 'Thread URL'),
		subInput           = formGenerator.textInput('subName', "Name of brigading subreddit");

		form.appendChild(threadInput);
		form.appendChild(subInput);
		card.appendChild(form);

		// Form Submission
		let submitWrapper = cE('div', 'mdl-card__actions mdl-card--border'),
		submitButton      = cE('button', 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored');

		submitButton.textContent = 'Analyse Thread';

		submitWrapper.appendChild(submitButton);
		card.appendChild(submitWrapper);

		this.setPage(card);
	}

	static get route() {
		return new route(/results\/new/);
	}
}
