/**
 * Google Apps Script for "Join our next workshop" Google Sheet
 * 
 * Target Columns:
 * | Time | Name | Email | Topic of Interest |
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet named "Workshop Registrations".
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any existing code in the editor and replace it with this entire script.
 * 4. Click the "Save" icon (Ctrl + S or Cmd + S).
 * 5. Click "Deploy" > "New deployment".
 * 6. Under "Select type", choose "Web app" (click the gear icon > Web app).
 * 7. Set the deployment configuration:
 *    - Description: "Workshop Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (crucial so Next.js can send data without OAuth prompts)
 * 8. Click "Deploy".
 * 9. Copy the generated "Web App URL" (ends with /exec).
 * 10. Paste this URL in your .env.local file:
 *     GOOGLE_SHEET_WORKSHOP_WEBHOOK_URL=<PASTE_URL_HERE>
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for lock to avoid concurrent write race conditions
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Parse the JSON payload from the request
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // If the sheet is empty, create exactly the 4 requested columns
    if (sheet.getLastRow() === 0) {
      var headers = ["Time", "Name", "Email", "Topic of Interest"];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F3ECE8");
      sheet.setFrozenRows(1);
    }

    var time = data.time || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || data.firstName || "N/A";
    var email = data.email || "";
    var topicOfInterest = data.topicOfInterest || data.topic || data.selectedCourse || "General";

    // Append exactly: Time, Name, Email, Topic of Interest
    sheet.appendRow([time, name, email, topicOfInterest]);

    // Auto-resize columns to fit content nicely
    sheet.autoResizeColumns(1, 4);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Workshop registration recorded." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Simple test function you can run inside the Apps Script editor to test permissions
function testDoPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        topicOfInterest: "Motherhood",
        time: new Date().toLocaleString()
      })
    }
  };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
