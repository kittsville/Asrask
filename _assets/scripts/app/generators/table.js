#= require app/generator

class tableGenerator extends generator {
	constructor(navManager) {
		super(navManager);

		this.nonNum      = 'mdl-data-table__cell--non-numeric';
		this.userBase    = 'https://reddit.com/user/';
		this.commentBase = 'https://reddit.com/r/';
	}

	_getNumericHeader() {
		return cE('th');
	}

	_getTextHeader() {
		let header = this._getNumericHeader();

		header.className = this.nonNum;

		return header;
	}

	_genNumericCell() {
		return cE('td');
	}

	_genTextCell() {
		let cell = this._genNumericCell();

		cell.className = this.nonNum;

		return cell;
	}

	_subCell(participation) {
		let cell = this._genNumericCell();

		cell.textContent = (participation / 10) + '%';

		return cell;
	}

	genUserTable(data) {
		let body = cE('tbody'),
		table    = cE('table');

		table.className = 'mdl-cell mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell--6-col brigading-users';

		// HEAD
		let head = cE('thead'),
		hRow     = cE('tr'),
		subRow   = cE('tr'),
		username = this._getTextHeader(),
		subs     = this._getTextHeader(),
		alpha    = this.subHeader(data.thread.subreddit),
		beta     = this.subHeader(data.beta),
		comments = this._getTextHeader();

		var linkBase = this.commentBase + data.thread.subreddit.name + '/comments/' + data.thread.reddit_id + '//';

		username.rowSpan = 2;
		comments.rowSpan = 2;
		subs.colSpan     = 2;

		username.classList.add('username');
		subs.classList.add('participation');
		comments.classList.add('comments');

		username.textContent = 'Username';
		subs.textContent     = 'Participation';
		comments.textContent = 'Comments';

		hRow.appendChild(username);
		hRow.appendChild(subs);
		hRow.appendChild(comments);

		subRow.appendChild(alpha);
		subRow.appendChild(beta);

		head.appendChild(hRow);
		head.appendChild(subRow);

		table.appendChild(head);

		// BODY
		data.entries.forEach(function(entry) {
			let row  = cE('tr'),
			user     = entry.user,
			username = this._genTextCell(),
			alpha    = this._subCell(entry.alpha_participation),
			beta     = this._subCell(entry.beta_participation),
			comments = this._genTextCell(),
			userLink = this._genLink();

			userLink.href        = this.userBase + user.name;
			userLink.textContent = '/u/' + user.name;

			let last = entry.comments.length - 1;

			entry.comments.forEach(function(commentId, index) {
				var commentLink         = this._genLink();
				commentLink.href        = linkBase + commentId + '/?context=99';
				commentLink.textContent = commentId;

				comments.appendChild(commentLink);

				if (index != last) {
					let separator = document.createTextNode(', ');

					comments.appendChild(separator);
				}
			}, this);

			username.appendChild(userLink);
			row.appendChild(username);
			row.appendChild(alpha);
			row.appendChild(beta);
			row.appendChild(comments);

			body.appendChild(row);
		}, this);

		table.appendChild(body);

		return table;
	}

	subHeader(subreddit) {
		let header = this._getNumericHeader();

		header.textContent = '/r/' + subreddit.name;

		return header;
	}
}
