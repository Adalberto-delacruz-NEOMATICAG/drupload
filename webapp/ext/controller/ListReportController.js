sap.ui.define([], function () {
  "use strict";

  // Helper to pad NUMC fields on the UI side (optional safeguard if you ever pre-process rows)
  function padNumc(value, len) {
    if (value === null || value === undefined) return value;
    const s = String(value).replace(/\D/g, ""); // keep digits only
    return s.padStart(len, "0").slice(-len);
  }

  // IMPORTANT: columnConfig maps Excel column labels -> OData property names
  // Use short, human-friendly labels for the Excel header (left), and your
  // *technical* property names (right) exactly as exposed by your OData service.
  const columnConfig = [
    { label: "sparte",        property: "sparte" },        // CHAR(4)
    { label: "police",        property: "police" },        // CHAR(20)  (REQUIRED)
    { label: "version",       property: "version" },       // NUMC(2)   (REQUIRED)
    { label: "datum",         property: "datum" },         // DATS (Edm.Date) -> 'YYYY-MM-DD'
    { label: "antragsdatum",  property: "antragsdatum" },  // DATS (Edm.Date) -> 'YYYY-MM-DD'
    { label: "source_system", property: "source_system" }  // CHAR(10)
  ];

  // A sample row to generate a good template (correct formats!)
  const sampleRow = [{
    sparte:        "P001",          // <= 4 chars
    police:        "DR-0000000001", // <= 20 chars
    version:       "01",            // NUMC(2) --> 2 digits
    datum:         "2025-10-29",    // DATS via OData (Edm.Date) => YYYY-MM-DD
    antragsdatum:  "2025-10-29",    // DATS via OData (Edm.Date)
    source_system: "NEO"            // <= 10 chars
  }];

  return {
    openSpreadsheetUploadDialog: async function () {
      const view = this.editFlow.getView();
      view.setBusyIndicatorDelay(0);
      view.setBusy(true);

      // Load the Spreadsheet Importer component
      this.spreadsheetUpload = await view.getController().getAppComponent().createComponent({
        usage: "spreadsheetImporter",
        async: true,
        componentData: {
          context: this,
          useTableSelector: true
        }
      });

      // Ask the importer which table we’re on
      await this.spreadsheetUpload.triggerInitContext();
      const tableId = this.spreadsheetUpload.getTableId();
      if (!tableId) { view.setBusy(false); return; }

      // Build strict options so the template + upload align with your backend types
      const options = {
        context: this,
        tableId,
        // Use the *technical* property names so the importer knows where to write:
        columns: columnConfig.map(c => c.property),

        // Optional but recommended: provide explicit columnConfig so the template has clear labels
        columnConfig,

        // Enforce required fields in the dialog:
        mandatoryFields: ["police", "version"],

        // Generate a clean, guided template:
        spreadsheetFileName: "buchauszug_import_template.xlsx",
        sampleData: sampleRow,

        // During development, you can disable header matching to avoid "Column X does not match…" errors.
        // Once your Excel matches the labels in `columnConfig`, set this back to false (remove the line).
        // skipColumnsCheck: true,
      };

      // Open dialog
      this.spreadsheetUpload.openSpreadsheetUploadDialog(options);
      view.setBusy(false);
    }
  };
});
// sap.m.MessageToast.show("Reminder: re-uploading the same sparte+police+version+datum will fail. Increase 'version'.");