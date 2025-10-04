// popup.js
const startBtn = document.getElementById("startBtn");
const fromInput = document.getElementById("fromId");
const toInput = document.getElementById("toId");

startBtn.addEventListener("click", () => {
  const fromId = fromInput.value.trim();
  const toId = toInput.value.trim();

  if (!fromId || !toId) {
    alert("Please enter both From and To IDs");
    return;
  }

  // persist the range so content/background can read it later
  chrome.storage.local.set({ automationRange: { from: fromId, to: toId } }, () => {
    // notify the active tab to start
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "startProcess",
        popupFrom: fromId,
        popupTo: toId
      });
      // close popup (optional)
      window.close();
    });
  });
});
