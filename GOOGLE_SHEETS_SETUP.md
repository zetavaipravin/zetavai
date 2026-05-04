# Google Sheets Integration Setup

## Summary of Changes Made

✅ **Removed from Co-Founders Section:**
- Jay Jaju profile card entirely
- Pratik Jaju from Advisory section entirely

✅ **Updated Co-Founders Section:**
- Pranav Jaju moved from Advisory → Co-Founders as **Co-Founder & CEO**
- Pravin Jaju updated role to **Co-Founder & CTO**
- Removed profile grids (core strengths, tools, sectors, education) from both cards
- Kept only name, role, bio, LinkedIn link, and skill chips

✅ **Updated Let's Talk Section:**
- Replaced Jay Jaju with Pranav Jaju
- LinkedIn links now point to: Pranav (CEO) and Pravin (CTO)

✅ **Form Backend:**
- Replaced Supabase integration with Google Apps Script
- Form now POSTs to a Google Apps Script deployment URL
- Ready to capture name, email, message, and interests

---

## Google Sheets Setup Instructions

### Step 1: Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet (or use an existing one)
3. Rename the first sheet to **"Leads"** (exact name)
4. Add headers in the first row:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Message`
   - E1: `Interests`

### Step 2: Create the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with: timestamp, name, email, message, interests
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.message,
      data.interests
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App

1. Click the blue **Deploy** button (top right)
2. Select **New Deployment**
3. Choose type: **Web app**
4. Set:
   - **Execute as:** Your Google account (the sheet owner)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Copy the deployment URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/usercopy`)

### Step 4: Update the HTML File

1. Open `index-zetavai.html`
2. Find line 1142: `const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy';`
3. Replace `YOUR_SCRIPT_ID` with the actual Script ID from your deployment URL
4. Save the file

**Example:**
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAbC123DEF456-GHIjklMNOpqRSTUVwXyZ/usercopy';
```

### Step 5: Test the Form

1. Open your website (serve it locally or deploy)
2. Scroll to the "Let's Talk" section
3. Fill out the contact form with test data
4. Click "Send a Message"
5. Check your Google Sheet — a new row should appear with the submission

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Form shows error after submit | Check the deployment URL is correct in index-zetavai.html (line 1142) |
| CORS error in browser console | Normal — the fetch should still work. Check the Google Sheet for the row. |
| No row appears in Google Sheet | Verify the sheet is named exactly "Leads" (case-sensitive) and the Apps Script was deployed |
| Permission errors | Ensure you deployed "Execute as: Your account" and "Who has access: Anyone" |

---

## File Updates Completed

- ✅ `index-zetavai.html` — team section restructured, form backend switched to Google Sheets
- 📄 `GOOGLE_SHEETS_SETUP.md` — this file (setup guide)

**Next:** Follow the 5 steps above to wire up your Google Sheet and get form submissions flowing.
