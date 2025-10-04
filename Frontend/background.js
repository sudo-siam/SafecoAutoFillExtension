chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.url.includes("CurrentCarrierReportViewer.aspx") && details.frameId === 0) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      func: () => window.print() // opens print dialog
    });
  }
});
