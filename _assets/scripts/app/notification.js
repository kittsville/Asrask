class NotificationManager {
	constructor(snackbarElement) {
		this.snackbar      = snackbarElement.MaterialSnackbar;
		this.undoCallbacks = {}; // Keeps tracks of which undo callback have been called
		this.nextId        = 0;
	}

	addNotification(message) {
		let data = {
			message : message,
		};

		this.snackbar.showSnackbar(data);
	}

	addReversableNotification(message, undo) {
		let callbackId = this.nextId++,
		callback = function() {
			let alreadyCalled = this.undoCallbacks[callbackId];

			if (!alreadyCalled) {
				this.undoCallbacks[callbackId] = true;

				undo();
			}
		}.bind(this),
		data = {
			message       : message,
			actionHandler : callback,
			actionText    : 'Undo',
		};

		this.undoCallbacks[callbackId] = false;

		this.snackbar.showSnackbar(data);
	}
}
