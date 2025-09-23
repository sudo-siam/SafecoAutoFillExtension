function doGet(request) {
  var action = request.parameter.action;

  if (!action) {
    return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle("Mail Viewer")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  switch (action) {
    case "getData":
      return getDataAPIController(request);

    default:
      return ContentService.createTextOutput(JSON.stringify({
        error: "Unknown action"
      })).setMimeType(ContentService.MimeType.JSON);
  }
}




