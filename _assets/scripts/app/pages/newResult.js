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
		submitWrapper     = cE('div', 'mdl-card__actions mdl-card--border');

		this.submitButton      = cE('button', 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored');
		this.threadInput  = formGenerator.textInput('threadUrl', 'Thread URL');
		this.subInput     = formGenerator.textInput('subName', "Name of brigading subreddit");

		fieldWrap.appendChild(this.threadInput);
		fieldWrap.appendChild(this.subInput);
		form.appendChild(fieldWrap);

		this.submitButton.textContent = 'Analyse Thread';
		this.submitButton.type        = 'submit';
		form.addEventListener('submit', this.onSubmit.bind(this));

		submitWrapper.appendChild(this.submitButton);
		form.appendChild(submitWrapper);

		card.appendChild(form);

		this.setPage(card);
	}

	onSubmit(event) {
		event.preventDefault();

		let apiPath = 'results/new',
		payload     = {
			'thread'    : this.threadInput.inputField.value,
			'subreddit' : this.subInput.inputField.value
		};

		this.activityId = this.activityManager.startActivity(function(){console.log('Stopped page');});
		this._lockForm();
		setTimeout(this._unlockForm.bind(this), 3000);
		new apiRequest(
			apiPath,
			{
				success    : this.creationSucceeded.bind(this),
				error      : this.creationFailed.bind(this),
				activityId : this.activityId,
				method     : 'POST',
				body       : payload
			},
			this,
			this.activityManager,
			this.notManager
		);
	}

	creationSucceeded(response) {
		this.activityManager.endActivity(this.activityId);

		this.notManager.addNotification('Starting thread analysis');

		let resultPageUrl = 'results/' + response.data.url;
		this.navManager.setPage(resultPageUrl, 'new');
	}

	creationFailed() {
		this._unlockForm();
		this.activityManager.endActivity(this.activityId);

		this.notManager.addNotification('Failed to create result');
	}

	// Prevents input/form submission
	_lockForm() {
		this.threadInput.inputField.disabled = true;
		this.subInput.inputField.disabled = true;
		this.submitButton.disabled = true;
	}

	// Allows input/form submission
	_unlockForm() {
		this.threadInput.inputField.disabled = false;
		this.subInput.inputField.disabled = false;
		this.submitButton.disabled = false;
	}

	static get route() {
		return new route(/results\/new/);
	}
}
