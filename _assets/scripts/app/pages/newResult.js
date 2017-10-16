#= require app/pages
#= require app/generators/form

class NewResultPage extends AppPage {
	loadPage() {
		this.title = 'New Result';

		this.renderPage();
	}

	renderPage() {
		// Form Introduction
		let card  = cE('div', 'mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-card mdl-cell--8-col'),
		title     = cE('div', 'mdl-card__title'),
		titleText = cE('h2',  'mdl-card__title-text'),
		helpText  = cE('div', 'mdl-card__supporting-text');

		titleText.textContent = 'New Result';
		helpText.innerHTML  = 'Identify users brigading a thread from a subreddit';

		title.appendChild(titleText);
		card.appendChild(title);
		card.appendChild(helpText);

		// Form Data Entry
		let formGenerator = new FormGenerator(this.navManager),
		fieldWrap         = cE('div', 'field-wrap'),
		form              = cE('form'),
		submitWrapper     = cE('div', 'mdl-card__actions mdl-card--border'),
		submitButton      = cE('button', 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored');

		this.threadInput  = formGenerator.textInput('threadUrl', 'Thread URL');
		this.subInput     = formGenerator.textInput('subName', "Name of brigading subreddit");

		fieldWrap.appendChild(this.threadInput);
		fieldWrap.appendChild(this.subInput);
		form.appendChild(fieldWrap);

		submitButton.textContent = 'Analyse Thread';
		submitButton.type        = 'submit';

		submitWrapper.appendChild(submitButton);
		form.appendChild(submitWrapper);

		card.appendChild(form);

		this.setPage(card);
	}

	static get route() {
		return new route(/results\/new/);
	}
}
