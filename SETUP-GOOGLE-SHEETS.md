# Contact Form → Google Sheets Setup

Your contact form (Name, Email, Message) is already built into the site.
To make submissions land in a Google Sheet, follow these steps once:

## 1. Create the spreadsheet
1. Go to https://sheets.google.com and create a new blank spreadsheet.
2. Rename it, e.g. "Portfolio Contact Submissions".
3. In row 1, add these headers: `Timestamp | Name | Email | Message`

## 2. Add the Apps Script
1. In the sheet, click **Extensions > Apps Script**.
2. Delete any starter code in the editor.
3. Open `google-apps-script-code.gs` (included in this project) and paste
   its full contents into the Apps Script editor.
4. Click the save icon (or Ctrl/Cmd + S).

## 3. Deploy as a Web App
1. Click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through and allow it
   (you'll see an "unverified app" warning since it's your own script;
   click **Advanced > Go to (your project name)** to proceed).
6. Copy the **Web app URL** shown (it looks like
   `https://script.google.com/macros/s/XXXXXXXX/exec`).

## 4. Connect it to the site
1. Open `assets/js/script.js`.
2. Find this line near the bottom:
   ```js
   const CONTACT_FORM_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace the placeholder with the Web App URL you copied.
4. Save the file and re-upload/deploy your site.

## 5. Test it
1. Open the live site, fill out the contact form, and click **Send Message**.
2. Check your Google Sheet — a new row should appear with the timestamp,
   name, email, and message.

## Updating the script later
Any time you edit `google-apps-script-code.gs` in the Apps Script editor,
you must create a **new version** for the changes to go live:
**Deploy > Manage deployments > (pencil/edit icon) > Version: New version > Deploy**.

## Notes
- This is completely free and requires no backend server — it works fine
  on static hosts like GitHub Pages, Netlify, or Vercel.
- Submissions are stored as plain rows in your own Google Sheet, which you
  can open, filter, or export to Excel (.xlsx) any time via
  **File > Download > Microsoft Excel**.
- Since "Who has access" is set to Anyone, anyone with the URL could POST
  data to it. This is normal for this pattern and fine for a low-traffic
  personal contact form; the form itself already validates that all three
  fields are filled before submitting.
