// popup.js
const startBtn = document.getElementById("startBtn");
const fromInput = document.getElementById("fromId");
const toInput = document.getElementById("toId");

startBtn.addEventListener("click", async () => {
  const fromId = fromInput.value.trim();
  const toId = toInput.value.trim();

  if (!fromId || !toId) {
    alert("Please enter both From and To IDs");
    return;
  }

  // persist the range so content/background can read it later
  chrome.storage.local.set({ automationRange: { from: fromId, to: toId } }, () => {
    chrome.tabs.query({ active: true}, async (tabs) => {
      const url = tabs[0].url || "";
      console.log(url);
      if (!url.includes("now.agent.safeco.com") && !url.includes("personal.safeco.com")) {
        return;
      }

      try {
        const state = await fetchState(fromId);
        await chrome.tabs.sendMessage(tabs[0].id, {
          action: "startProcess",
          popupFrom: fromId,
          popupTo: toId,
          state: state
        });
        console.log("Message sent to content.js successfully!");
      } catch (err) {
        console.warn("Content script not found in this tab:", err);
      }
    });

  });
});

