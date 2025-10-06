chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) return;

  // Case 1: print the PDF
  if (details.url.includes("CurrentCarrierReportViewer.aspx")) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      func: () => window.print()
    });
  }
});
