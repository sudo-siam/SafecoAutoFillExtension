const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  // Get the value from the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => document.querySelector("td.topSelected")?.innerText.replace(/\n/g, " ") || ""
    }, (result) => {
      const formSection = result?.[0]?.result || ""; // ✅ safe access

      if (!formSection) {
        console.warn("No topSelected element found on the page.");
        return;
      }

      if (formSection === "Policy Information") {
        chrome.tabs.sendMessage(tabs[0].id, { action: "fetchPolicyInformation" });
      } else if (formSection === "Garaged Locations") {
        chrome.tabs.sendMessage(tabs[0].id, { action: "fetchGaragedLocations" });
      }
    });

  });
});
