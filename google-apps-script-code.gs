/**
 * Contact Form -> Google Sheets backend
 *
 * SETUP INSTRUCTIONS (also see SETUP-GOOGLE-SHEETS.md):
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Rename it something like "Portfolio Contact Submissions".
 * 2. In the sheet, add a header row in row 1: Timestamp | Name | Email | Message
 * 3. Click Extensions > Apps Script. Delete any starter code and paste
 *    this entire file in its place.
 * 4. Click Deploy > New deployment.
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: "Contact form handler" (optional).
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy, and authorize the permissions Google asks for.
 * 5. Copy the "Web app URL" it gives you.
 * 6. Paste that URL into assets/js/script.js, replacing
 *    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE" for CONTACT_FORM_ENDPOINT.
 * 7. Every time you edit this script, you must create a NEW deployment
 *    (Deploy > Manage deployments > Edit > New version) for changes to
 *    take effect on the live URL.
 */

function doPost(e) {

  try {

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var name = e.parameter.name || "";
    var email = e.parameter.email || "";
    var message = e.parameter.message || "";

    sheet.appendRow([new Date(), name, email, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  }

}

// Optional: lets you quickly test the deployment URL in a browser.
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "Contact form endpoint is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}
