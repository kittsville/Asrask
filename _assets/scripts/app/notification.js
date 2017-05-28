class notificationManager {
	constructor(snackbarElement) {
		this.snackbar = snackbarElement.MaterialSnackbar;
	}
	
	addNotification(message, undoCallback = null) {
		let data = {
			message : message,
		};
		
		if (undoCallback) {
			data.actionHandler = undoCallback;
			data.actionText    = 'Undo';
		}
		
		this.snackbar.showSnackbar(data);
	}
}
