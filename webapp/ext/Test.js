sap.ui.define(["sap/m/MessageToast"], function (MessageToast) {
	"use strict";
	return {
		/**
		 * Create Dialog to Upload Spreadsheet and open it
		 * @param {*} oEvent
		 */
		openSpreadsheetUploadDialog: async function (event) {
			this.editFlow.getView().setBusyIndicatorDelay(0);
			this.editFlow.getView().setBusy(true);
			this.spreadsheetUpload = await this.editFlow.getView()
				.getController()
				.getAppComponent()
				.createComponent({
					usage: "spreadsheetImporter",
					async: true,
					componentData: {
						context: this,
						useTableSelector: true
					},
				});
			this.spreadsheetUpload.openSpreadsheetUploadDialog();
			this.editFlow.getView().setBusy(false);
		},

		openLanding: function (oEvent) {
			window.open("https://spreadsheet-importer.com/", "_blank");
		},

		openDocs: function (oEvent) {
			window.open("https://docs.spreadsheet-importer.com/", "_blank");
		}
	};
});