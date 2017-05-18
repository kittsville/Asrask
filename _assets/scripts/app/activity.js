class activityIndicator {
	constructor(activitySpinner) {
		this.spinner    = activitySpinner;
		this.activities = 0;
		this.spinning   = false;
	}
	
	updateSpinner() {
		if (this.spinning && this.activities == 0) {
			this.spinner.classList.remove('active');
			this.spinning = false;
		} else if (!this.spinning && this.activities > 0) {
			this.spinner.classList.add('active');
			this.spinning = true;
		}
	}
	
	startActivity(){
		this.activities++;
		this.updateSpinner();
	}
	
	endActivity(){
		this.activities--;
		
		if (this.activities < 0) {
			throw 'Activity counter fell below 0. Kit broke the app, again.';
		}
		
		this.updateSpinner();
	}
}
