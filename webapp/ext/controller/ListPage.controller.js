sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('zdr.upload.drupload.ext.controller.ListPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf zdr.upload.drupload.ext.controller.ListPage
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();

				
			},
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
        tableId: "ui.v4.ordersv4fe::OrdersObjectPage--fe::table::Items::LineItem-innerTable"
      },
    });
  this.spreadsheetUpload.openSpreadsheetUploadDialog();
  this.editFlow.getView().setBusy(false);
}
		},

		/**
        * Generated event handler.
        *
        * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
        * @param aSelectedContexts the selected contexts of the table rows.
        */
        openSpreadsheetUploadDialog: function(oContext, aSelectedContexts) {
            MessageToast.show("Custom handler invoked.");
        }
	});
});
