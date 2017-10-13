class ActivityIndicator {
	constructor(activitySpinner) {
		this.spinner    = activitySpinner;
		this.nextId     = 0;
		this.activities = {};
		this.count      = 0;
		this.spinning   = false;

		window.addEventListener('keydown',  this.onKeyDown.bind(this));
	}

	updateSpinner() {
		if (this.spinning && this.count == 0) {
			this.spinner.classList.remove('active');
			this.spinning = false;
		} else if (!this.spinning && this.count > 0) {
			this.spinner.classList.add('active');
			this.spinning = true;
		}
	}

	startActivity(stopActivityCallback){
		let activityId = this.nextId++;

		this.activities[activityId] = stopActivityCallback;
		this.count++;

		this.updateSpinner();

		return activityId;
	}

	// Force stop an ongoing activity
	stopActivity(activityId) {
		console.log('Force stopping activity ID: ' + activityId);

		this.activities[activityId]();

		this.endActivity(activityId);
	}

	stopAllActivities() {
		Object.keys(this.activities).forEach(function(activityId) {
			this.stopActivity(activityId);
		}, this);
	}

	// Indicates activity has ended of its own accord
	endActivity(activityId){
		delete this.activities[activityId];
		this.count--;

		this.updateSpinner();
	}

	onKeyDown(e) {
		// 27 = Esc key, means "pls stop doing thing"
		if ( e.keyCode == 27 ) {
			this.stopAllActivities();
		}
	}
}
