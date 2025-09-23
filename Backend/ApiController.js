function getDataAPIController(request) {
  try {
    const id = request.parameter.id;
    const sheetName = request.parameter.sheetname;
    if (!id) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No ID provided"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = fetchSheetData(`${sheetName}`);

    // Find row with matching ID
    const row = data.find(r => String(r["ID"]) === String(id));

    if (row) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        data: row
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: `No record found for ID ${id}`
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function fetchSheetData(e) {
  const sheetName = e;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      let value = row[i];

      // ✅ Format dates to mm/dd/yy
      if (value instanceof Date) {
        value = Utilities.formatDate(value, Session.getScriptTimeZone(), "MM/dd/yy");
      }

      // ✅ Make sure ZIP codes stay as strings (keep leading zeros if any)
      if (header === "ZIP Code" && value !== "") {
        value = String(value).split(".")[0]; // remove .0 if present
      }

      // ✅ Force Agent Number to string (if accidentally parsed as date)
      if (header === "Agent Number" && value !== "") {
        value = String(value);
      }

      obj[header] = value;
    });
    return obj;
  });
}