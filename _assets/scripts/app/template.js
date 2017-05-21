class tableGenerator {
	constructor() {
		this.nonNum      = 'mdl-data-table__cell--non-numeric';
		this.userBase    = 'https://reddit.com/user/';
		this.commentBase = 'https://reddit.com/r/';
	}
	
	_getNumericHeader() {
		return document.createElement('th');
	}
	
	_getTextHeader() {
		let header = this._getNumericHeader();
		
		header.className = this.nonNum;
		
		return header;
	}
	
	_genNumericCell() {
		return document.createElement('td');
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
		let body = document.createElement('tbody'),
		table    = document.createElement('table');
		
		table.className = 'mdl-cell mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell--6-col brigading-users';
		
		// HEAD
		let head = document.createElement('thead'),
		hRow     = document.createElement('tr'),
		subRow   = document.createElement('tr'),
		username = this._getTextHeader(),
		subs     = this._getTextHeader(),
		alpha    = this.subHeader(data.alpha),
		beta     = this.subHeader(data.beta),
		comments = this._getTextHeader();
		
		var linkBase = this.commentBase + data.alpha.name + '/comments/' + data.thread + '//';
		
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
			let row  = document.createElement('tr'),
			user     = entry.user,
			username = this._genTextCell(),
			alpha    = this._subCell(entry.alpha_participation),
			beta     = this._subCell(entry.beta_participation),
			comments = this._genTextCell(),
			userLink = document.createElement('a');
			
			userLink.href        = this.userBase + user.name;
			userLink.textContent = '/u/' + user.name;
			
			let last = entry.comments.length - 1;
			
			entry.comments.forEach(function(commentId, index) {
				var commentLink         = document.createElement('a');
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
