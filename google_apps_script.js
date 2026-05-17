/**
 * Google Apps Script for InTheBox Contact Form
 * 
 * INSTRUCTIONS TO SET UP GOOGLE SHEETS BACKEND:
 * 1. Go to Google Sheets and create a new spreadsheet named "InTheBox Leads".
 * 2. In the first row, create the following headers exactly as written:
 *    Timestamp | Name | Email | Phone | Message | Source | Status
 * 3. Click Extensions > Apps Script.
 * 4. Delete any code in the script editor and paste this entire file.
 * 5. Click the "Save" icon.
 * 6. Click "Deploy" > "New deployment".
 * 7. Set "Select type" to "Web app".
 * 8. Under "Execute as", select "Me".
 * 9. Under "Who has access", select "Anyone".
 * 10. Click "Deploy". (You may need to authorize the script. Click "Review permissions" -> Choose your account -> "Advanced" -> "Go to script (unsafe)" -> "Allow").
 * 11. Copy the "Web app URL" provided.
 * 12. Paste this URL into your website's source code in `src/pages/Contact.tsx` at the `GOOGLE_SCRIPT_URL` variable.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Check honeypot for spam prevention
    if (data.botField) {
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Bot caught' })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const timestamp = new Date();
    
    // Extract lead fields
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const message = data.message || '';
    const source = data.source || 'Website Contact Form';
    const status = 'New';
    
    // Append to sheet
    sheet.appendRow([timestamp, name, email, phone, message, source, status]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET request for CORS preflight or pinging
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'InTheBox Backend Active' })).setMimeType(ContentService.MimeType.JSON);
}
