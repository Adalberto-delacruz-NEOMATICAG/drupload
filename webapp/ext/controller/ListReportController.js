// webapp/ext/controller/ListReportController.js (full file)
sap.ui.define([], function () {
  "use strict";
  return {
    openSpreadsheetUploadDialog: async function () {
      const view = this.editFlow.getView();
      view.setBusyIndicatorDelay(0);
      view.setBusy(true);

      this.spreadsheetUpload = await view.getController().getAppComponent().createComponent({
        usage: "spreadsheetImporter",
        async: true,
        componentData: {
          context: this,
          useTableSelector: true
        }
      });

      await this.spreadsheetUpload.triggerInitContext();
      const tableId = this.spreadsheetUpload.getTableId();
      if (!tableId) { view.setBusy(false); return; }

      const options = {
        context: this,
        tableId,
        // Tell the importer which props to expect (your OData technical names):
        columns: ["antragsdatum", "datum", "police", "source_system", "sparte", "version"],
        // Enforce required props:
        mandatoryFields: ["police", "version"],
        // Optional: during development you can bypass strict header checks.
        // Remove this once things align.
        // skipColumnsCheck: true
	
      };


   

      this.spreadsheetUpload.openSpreadsheetUploadDialog(options);
      view.setBusy(false);
    }
  };
});	 

// spreadsheetFileName: "buchauszug_import_template.xlsx"