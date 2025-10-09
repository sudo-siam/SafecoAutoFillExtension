console.log("[Safeco Extension] content.js loaded on", location.href);

const API_URL = "https://script.google.com/macros/s/" + SCRIPT_ID + "/exec";

let data = [];
let fromId = 0;
let toId = 0;
let currentId = 0;
let observerStarted = false;

let formSection = document
  .querySelector("td.topSelected")
  ?.innerText.replace(/\n/g, " ");
let isAutoFillingPolicyInfo = false;
let isAutoFillingHouseholder = false;
let isAutoFillingGaragedLoaction = false;
let isAutoFillingDrivers = false;
let isAutoFillingVehicle = false;

async function fetchPolicyInformation(id) {
  if (isAutoFillingPolicyInfo) return;
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );
    console.log(response);
    const json = await response.json();

    if (json.status === "success") {
      isAutoFillingPolicyInfo = true;
      const policyApiData = json.data;
      console.log("Fetched PolicyInformation:", policyApiData);

      // Fill the form
      setTimeout(() => {
        fillUpPolicyInformation([policyApiData]);
      }, 2000);

      // Wait for a bit if needed (e.g., for user interaction or animations)
      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
      isAutoFillingPolicyInfo = false;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    isAutoFillingPolicyInfo = false;
  }
}

async function fetchHouseholdSelections(id) {
  if (isAutoFillingHouseholder) return;
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );
    const json = await response.json();
    if (json.status === "success") {
      isAutoFillingHouseholder = false;
      const householdApiData = json.data;
      console.log("Fetched House Holders:", householdApiData);
      // Fill the form
      setTimeout(() => {
        fillUpHouseHold([householdApiData]);
      }, 2000);

      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
      isAutoFillingHouseholder = false;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    isAutoFillingHouseholder = false;
  }
}

async function fetchGaragedLocations(id) {
  if (isAutoFillingGaragedLoaction) return;
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );

    const json = await response.json();
    if (json.status === "success") {
      isAutoFillingGaragedLoaction = false;
      const garagedApiData = json.data;
      console.log("Fetched GaragedLocations:", garagedApiData);

      setTimeout(() => {
        fillUpGaragedLocations([garagedApiData]);
      }, 2000);

      // Wait for a bit if needed (e.g., for user interaction or animations)
      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
      isAutoFillingGaragedLoaction = false;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    isAutoFillingGaragedLoaction = false;
  }
}

async function fetchDrivers(id) {
  if (isAutoFillingDrivers) return;
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );
    const json = await response.json();
    if (json.status === "success") {
      isAutoFillingDrivers = false;
      const driversApiData = json.data;
      console.log("Fetched Drivers:", driversApiData);
      // Fill the form
      setTimeout(() => {
        fillUpDrivers([driversApiData]);
      }, 2000);

      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
      isAutoFillingDrivers = false;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    isAutoFillingDrivers = false;
  }
}

async function fetchVehicles(id) {
  if (isAutoFillingVehicle) return;
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );
    const json = await response.json();
    if (json.status === "success") {
      isAutoFillingVehicle = true;
      const vehicleApiData = json.data;
      console.log("Fetched Vehicles:", vehicleApiData);
      // Fill the form
      setTimeout(() => {
        fillUpVehicle([vehicleApiData]);
      }, 2000);

      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
      isAutoFillingVehicle = false;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    isAutoFillingVehicle = false;
  }
}

async function fetchTelematics(id) {
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );
    const json = await response.json();
    if (json.status === "success") {
      const telematicsApiData = json.data;
      console.log("Fetched Telematics:", telematicsApiData);
      // Fill the form
      setTimeout(() => {
        fillUpTelematics([telematicsApiData]);
      }, 2000);

      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

async function fetchUnderwriting(id) {
  try {
    console.log("Fetching ID:", id);
    const response = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent(
        formSection
      )}`
    );
    const json = await response.json();
    if (json.status === "success") {
      const underwritingApiData = json.data;
      console.log("Fetched Underwriting:", underwritingApiData);
      // Fill the form
      setTimeout(() => {
        fillUpUnderwriting([underwritingApiData]);
      }, 2000);

      await new Promise((res) => setTimeout(res, 500));
    } else {
      console.error("API error:", json.message);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function callAPIForTab(id, tabName) {
  if (tabName === "Policy Information") {
    fetchPolicyInformation(id);
  } else if (tabName === "Household Selections") {
    fetchHouseholdSelections(id);
  } else if (tabName === "Garaged Locations") {
    fetchGaragedLocations(id);
  } else if (tabName === "Drivers") {
    fetchDrivers(id);
  } else if (tabName === "Vehicles") {
    fetchVehicles(id);
  } else if (tabName === "Telematics") {
    fetchTelematics(id);
  } else if (tabName === "Underwriting") {
    fetchUnderwriting(id);
  }
}

function initTabObserver() {
  const tabContainer = document.querySelector("#ScreenTabs1");
  if (!tabContainer) {
    setTimeout(initTabObserver, 500);
    return;
  }
  if (observerStarted) return;
  observerStarted = true;

  const observer = new MutationObserver(() => {
    const selectedTab = tabContainer.querySelector("td.topSelected");
    if (selectedTab) {
      const tabName = selectedTab.innerText.replace(/\n/g, " ").trim();
      console.log("[observer] tab:", tabName, "id:", currentId);
      callAPIForTab(currentId, tabName);
    }
  });

  observer.observe(tabContainer, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true,
  });

  // initial run if a tab is already selected
  const initialTab = tabContainer.querySelector("td.topSelected");
  const tabName = initialTab.innerText.replace(/\n/g, " ").trim();
  if (initialTab) {
    callAPIForTab(currentId, tabName);
  }
}

// message listener
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "startProcess") {
    fromId = parseInt(msg.popupFrom, 10);
    toId = parseInt(msg.popupTo, 10);
    currentId = fromId;
    let state = msg.state;
    openForm(state);
    initTabObserver();
  }
});

chrome.storage.local.get("automationRange", async (res) => {
  if (res && res.automationRange) {
    fromId = parseInt(res.automationRange.from, 10);
    toId = parseInt(res.automationRange.to, 10);
    currentId = res.automationRange.current
      ? parseInt(res.automationRange.current, 10)
      : fromId;

    console.log(
      "[resume] loaded range:",
      fromId,
      "to",
      toId,
      "current:",
      currentId,
      "url:",
      location.href
    );

    // if we just came back to the 'now' page
    if (
      res.automationRange.returnToNow &&
      location.hostname.includes("now.agent.safeco.com")
    ) {
      console.log(
        "[resume] detected return to now.agent page — restarting process..."
      );
      // clear flag to prevent looping
      delete res.automationRange.returnToNow;
      chrome.storage.local.set({ automationRange: res.automationRange });
      const state = await fetchState(currentId);
      // restart main process
      setTimeout(() => {
        openForm(state);
        initTabObserver();
      }, 2500);
    } else if (location.hostname.includes("personal.safeco.com")) {
      // normal resume
      initTabObserver();
    }
  }
});

function clickCloseButton() {
  const btn = document.querySelector(
    "div.ui-dialog-titlebar a.ui-dialog-titlebar-close"
  );
  if (btn) {
    btn.click();
  } else {
    setTimeout(clickCloseButton, 200); // retry every 200ms
  }
}

function openForm(state) {
  const checkInterval = setInterval(() => {
    const quoteBtn = document.querySelector("#pl-quote-button");
    if (!quoteBtn) return;

    clearInterval(checkInterval);
    quoteBtn.click();

    // 3. Select state
    const select = document.querySelector("#select-7-select");
    if (select) {
      for (let option of select.options) {
        if (option.text.trim().toLowerCase() === state.toLowerCase()) {
          option.selected = true;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          console.log("✅ Selected state:", state);
          break;
        }
      }
    }

    // 4. Click Auto link (wait for it to appear)
    const autoInterval = setInterval(() => {
      const autoLink = [
        ...document.querySelectorAll("a.lm-Link.lm-LinkStandalone"),
      ].find((a) => a.textContent.trim() === "Auto");
      if (!autoLink) return;

      clearInterval(autoInterval);
      autoLink.click();
      console.log("✅ Auto link clicked, form should open");
    }, 500);
  }, 500);
}

// clickCloseButton();

function splitPhoneNumber(phone) {
  // Use regex to extract area code, prefix, and suffix
  const match = phone.match(/\((\d{3})\)(\d{3})-(\d{4})/);

  if (!match) {
    console.error("Invalid phone format:", phone);
    return null;
  }

  return {
    areaCode: match[1],
    prefix: match[2],
    suffix: match[3],
  };
}

function convertDate(dateValue) {
  if (!dateValue) return "";

  const parts = dateValue.split("/");
  if (parts.length !== 3) return dateValue; // return as-is if not in expected format

  let [month, day, year] = parts;

  // Ensure month and day are always 2 digits
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");

  // Convert 2-digit year to 4-digit (assume 20xx)
  if (year.length === 2) {
    year = "20" + year;
  }

  return `${month}/${day}/${year}`;
}

function fillUpPolicyInformation(data) {
  const PolicyRatingState = document.querySelector("#PolicyRatingState");
  const ProducerID = document.querySelector("#PolicyProducerName");
  const PolicyQuoteDate = document.querySelector("#PolicyQuoteDate");
  const PolicyEffectiveDate = document.querySelector("#PolicyEffectiveDate");
  const PolicyClientAgentCustomerID = document.querySelector(
    "#PolicyClientAgentCustomerID"
  );
  const PolicyDescriptiveName = document.querySelector(
    "#PolicyDescriptiveName"
  );

  // Named Insured Applicant Information Fields

  const PolicyClientPersonFirstName = document.querySelector(
    "#PolicyClientPersonFirstName"
  );
  const PolicyClientPersonMiddleName = document.querySelector(
    "#PolicyClientPersonMiddleName"
  );
  const PolicyClientPersonLastName = document.querySelector(
    "#PolicyClientPersonLastName"
  );
  const PolicyClientPersonMaritalStatus = document.querySelector(
    "#PolicyClientPersonMaritalStatus"
  );
  const PolicyClientPersonBirthdate = document.querySelector(
    "#PolicyClientPersonBirthdate"
  );

  const PolicyClientHomePhoneNumberAreaCode = document.querySelector(
    '[name="PolicyClientHomePhoneNumberAreaCode"]'
  );
  const PolicyClientHomePhoneNumberPrefix = document.querySelector(
    '[name="PolicyClientHomePhoneNumberPrefix"]'
  );
  const PolicyClientHomePhoneNumberSuffix = document.querySelector(
    '[name="PolicyClientHomePhoneNumberSuffix"]'
  );

  const PolicyClientEmailAddress = document.querySelector(
    "#PolicyClientEmailAddress"
  );

  const PolicyClientMailingLocationAddressLine1 = document.querySelector(
    "#PolicyClientMailingLocationAddressLine1"
  );
  const PolicyClientMailingLocationAddressLine2 = document.querySelector(
    "#PolicyClientMailingLocationAddressLine2"
  );
  const PolicyClientMailingLocationZipCode = document.querySelector(
    "#PolicyClientMailingLocationZipCode"
  );
  const PolicyClientMailingLocationCity = document.querySelector(
    "#PolicyClientMailingLocationCity"
  );
  const PolicyClientMailingLocationState = document.querySelector(
    "#PolicyClientMailingLocationState"
  );

  const PolicyAutoDataVehicleGaragingAddressYES = document.querySelector(
    "#PolicyAutoDataVehicleGaragingAddressYNY"
  );
  const PolicyAutoDataVehicleGaragingAddressNO = document.querySelector(
    "#PolicyAutoDataVehicleGaragingAddressYNN"
  );

  // Additional Policy Information Fields

  const PolicyAutoDataAutoBusinessType = document.querySelector(
    "#PolicyAutoDataAutoBusinessType"
  );

  const PolicyAutoDataAnyIncidentsOnPolicyYNY = document.querySelector(
    "#PolicyAutoDataAnyIncidentsOnPolicyYNY"
  );
  const PolicyAutoDataAnyIncidentsOnPolicyYNN = document.querySelector(
    "#PolicyAutoDataAnyIncidentsOnPolicyYNN"
  );

  const PolicyAdditionalInterestsYNY = document.querySelector(
    "#PolicyAdditionalInterestsYNY"
  );
  const PolicyAdditionalInterestsYNN = document.querySelector(
    "#PolicyAdditionalInterestsYNN"
  );

  const PolicyAutoDataNamedNonOwnerYN = document.querySelector(
    "#PolicyAutoDataNamedNonOwnerYN"
  );
  const PolicyAutoDataMultipleCarDiscYN = document.querySelector(
    "#PolicyAutoDataMultipleCarDiscYN"
  );

  const PolicyAutoDataDeliveryVehicleYNY = document.querySelector(
    "#PolicyAutoDataDeliveryVehicleYNY"
  );
  const PolicyAutoDataDeliveryVehicleYNN = document.querySelector(
    "#PolicyAutoDataDeliveryVehicleYNN"
  );

  const PolicyOfferCode = document.querySelector("#PolicyOfferCode");

  // Take the first policy in your data
  const policyInfo = data[0];
  const ratingState = policyInfo["Rating State"];
  const producerID = policyInfo["Producer/Other ID"];
  const policyQuoteDate = policyInfo["Quote Date"];
  const policyEffectiveDate = policyInfo["Effective Date"];
  const policyClientAgentCustomerID = policyInfo["Agency ID for Customer"];
  const policyDescriptiveName = policyInfo["Quote Description"];

  const policyClientPersonFirstName = policyInfo["First Name"];
  const policyClientPersonMiddleName = policyInfo["Middle Name"];
  const policyClientPersonLastName = policyInfo["Last Name"];
  const policyClientPersonMaritalStatus = policyInfo["Marital Status"];
  const policyClientPersonBirthdate = policyInfo["Birth Date"];

  const primaryPhoneNumber = policyInfo["Primary Phone Number"];
  const policyClientEmailAddress = policyInfo["Email Address"];

  const policyClientMailingLocationAddressLine1 = policyInfo["Mailing Address"];
  const policyClientMailingLocationAddressLine2 = policyInfo["Address Line 2"];
  const policyClientMailingLocationZipCode = policyInfo["ZIP Code"];
  const policyClientMailingLocationCity = policyInfo["City"];
  const policyClientMailingLocationState = policyInfo["State"];
  const policyAutoDataVehicleGaragingAddressYN =
    policyInfo["All vehicles garaged at mailing address?"];

  const policyAutoDataAutoBusinessType = policyInfo["Reason for Policy"];
  const policyAutoDataAnyIncidentsOnPolicyYN =
    policyInfo["Any reportable incidents?"];
  const policyAdditionalInterestsYN = policyInfo["Additional Interests?"];
  const policyAutoDataNamedNonOwnerYN = policyInfo["Named Non-Owner"];
  const policyAutoDataMultipleCarDiscYN =
    policyInfo["Advanced Multiple Car Discount"];
  const policyAutoDataDeliveryVehicleYN =
    policyInfo["Any vehicles used for delivery?"];
  const policyOfferCode = policyInfo["Priority Code"];

  if (!ratingState) {
    return;
  } else {
    for (let option of PolicyRatingState.options) {
      // Match by option text (you can also match by value if needed)
      if (
        option.text.trim().toLowerCase() === ratingState.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyRatingState.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }
  }

  if (producerID) {
    ProducerID.value = producerID;
    ProducerID.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (policyQuoteDate) {
    PolicyQuoteDate.value = policyQuoteDate;
    PolicyQuoteDate.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (policyEffectiveDate) {
    PolicyEffectiveDate.value = policyEffectiveDate;
    PolicyEffectiveDate.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (policyClientAgentCustomerID) {
    PolicyClientAgentCustomerID.value = policyClientAgentCustomerID;
    PolicyClientAgentCustomerID.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyDescriptiveName) {
    PolicyDescriptiveName.value = policyDescriptiveName;
    PolicyDescriptiveName.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (policyClientPersonFirstName) {
    PolicyClientPersonFirstName.value = policyClientPersonFirstName;
    PolicyClientPersonFirstName.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientPersonMiddleName) {
    PolicyClientPersonMiddleName.value = policyClientPersonMiddleName;
    PolicyClientPersonMiddleName.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientPersonLastName) {
    PolicyClientPersonLastName.value = policyClientPersonLastName;
    PolicyClientPersonLastName.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientPersonMaritalStatus) {
    for (let option of PolicyClientPersonMaritalStatus.options) {
      if (
        option.text.trim().toLowerCase() ===
        policyClientPersonMaritalStatus.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyClientPersonMaritalStatus.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (policyClientPersonBirthdate) {
    PolicyClientPersonBirthdate.value = policyClientPersonBirthdate;
    PolicyClientPersonBirthdate.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (primaryPhoneNumber) {
    const phoneParts = splitPhoneNumber(primaryPhoneNumber);
    if (phoneParts) {
      PolicyClientHomePhoneNumberAreaCode.value = phoneParts.areaCode;
      PolicyClientHomePhoneNumberAreaCode.dispatchEvent(
        new Event("input", { bubbles: true })
      );
      PolicyClientHomePhoneNumberPrefix.value = phoneParts.prefix;
      PolicyClientHomePhoneNumberPrefix.dispatchEvent(
        new Event("input", { bubbles: true })
      );
      PolicyClientHomePhoneNumberSuffix.value = phoneParts.suffix;
      PolicyClientHomePhoneNumberSuffix.dispatchEvent(
        new Event("input", { bubbles: true })
      );
    }
  }

  if (policyClientEmailAddress) {
    PolicyClientEmailAddress.value = policyClientEmailAddress;
    PolicyClientEmailAddress.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientMailingLocationAddressLine1) {
    PolicyClientMailingLocationAddressLine1.value =
      policyClientMailingLocationAddressLine1;
    PolicyClientMailingLocationAddressLine1.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientMailingLocationAddressLine2) {
    PolicyClientMailingLocationAddressLine2.value =
      policyClientMailingLocationAddressLine2;
    PolicyClientMailingLocationAddressLine2.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientMailingLocationZipCode) {
    PolicyClientMailingLocationZipCode.value =
      policyClientMailingLocationZipCode;
    PolicyClientMailingLocationZipCode.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientMailingLocationCity) {
    PolicyClientMailingLocationCity.value = policyClientMailingLocationCity;
    PolicyClientMailingLocationCity.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (policyClientMailingLocationState) {
    for (let option of PolicyClientMailingLocationState.options) {
      if (
        option.text.trim().toLowerCase() ===
        policyClientMailingLocationState.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyClientMailingLocationState.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (policyAutoDataVehicleGaragingAddressYN) {
    const value = policyAutoDataVehicleGaragingAddressYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAutoDataVehicleGaragingAddressYES.checked = true;
      PolicyAutoDataVehicleGaragingAddressYES.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyAutoDataVehicleGaragingAddressYES.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyAutoDataVehicleGaragingAddressNO.checked = true;
      PolicyAutoDataVehicleGaragingAddressNO.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyAutoDataVehicleGaragingAddressNO.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  if (policyAutoDataAutoBusinessType) {
    const value = policyAutoDataAutoBusinessType?.trim().toLowerCase();
    for (let option of PolicyAutoDataAutoBusinessType.options) {
      if (option.text.trim().toLowerCase() === value) {
        option.selected = true;
        PolicyAutoDataAutoBusinessType.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }

      if (value === "carrier consolidation/book transfer") {
        if (policyAutoDataMultipleCarDiscYN) {
          const value = policyAutoDataMultipleCarDiscYN?.trim().toLowerCase();
          if (value === "y") {
            PolicyAutoDataMultipleCarDiscYN.checked = true;
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(
              new Event("click", { bubbles: true })
            );
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(
              new Event("change", { bubbles: true })
            );
          } else if (value === "n") {
            PolicyAutoDataMultipleCarDiscYN.checked = false;
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(
              new Event("click", { bubbles: true })
            );
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(
              new Event("change", { bubbles: true })
            );
          }
        }
      }
    }
  }

  if (policyAutoDataAnyIncidentsOnPolicyYN) {
    const value = policyAutoDataAnyIncidentsOnPolicyYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAutoDataAnyIncidentsOnPolicyYNY.checked = true;
      PolicyAutoDataAnyIncidentsOnPolicyYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyAutoDataAnyIncidentsOnPolicyYNN.checked = true;
      PolicyAutoDataAnyIncidentsOnPolicyYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  if (policyAdditionalInterestsYN) {
    const value = policyAdditionalInterestsYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAdditionalInterestsYNY.checked = true;
      PolicyAdditionalInterestsYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyAdditionalInterestsYNN.checked = true;
      PolicyAdditionalInterestsYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  if (policyAutoDataNamedNonOwnerYN) {
    const value = policyAutoDataNamedNonOwnerYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAutoDataNamedNonOwnerYN.checked = true;
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyAutoDataNamedNonOwnerYN.checked = false;
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  if (policyAutoDataDeliveryVehicleYN) {
    const value = policyAutoDataDeliveryVehicleYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAutoDataDeliveryVehicleYNY.checked = true;
      PolicyAutoDataDeliveryVehicleYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyAutoDataDeliveryVehicleYNN.checked = true;
      PolicyAutoDataDeliveryVehicleYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  if (policyOfferCode) {
    PolicyOfferCode.value = policyOfferCode;
    PolicyOfferCode.dispatchEvent(new Event("input", { bubbles: true }));
  }

  isAutoFillingPolicyInfo = false;
  clickContinue();

  // currentID++;
  // fetchPolicyInformation();
}

function fillUpHouseHold(data) {
  const PolicyDriverCandidates2CandidateRelationship = document.querySelector(
    "#PolicyDriverCandidates2CandidateRelationship"
  );

  const householderInfo = data[0];
  const relationShip = householderInfo["Relationship To Insured"];

  if (PolicyDriverCandidates2CandidateRelationship && relationShip) {
    for (let option of PolicyDriverCandidates2CandidateRelationship.options) {
      if (normalize(option.text) === normalize(relationShip)) {
        option.selected = true;
        PolicyDriverCandidates2CandidateRelationship.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  isAutoFillingHouseholder = false;
  clickContinue();
}

function fillUpGaragedLocations(data) {
  const PolicyLocations2AddressLine1 = document.querySelector(
    "#PolicyLocations2AddressLine1"
  );
  const PolicyLocations2AddressLine2 = document.querySelector(
    "#PolicyLocations2AddressLine2"
  );
  const PolicyLocations2ZipCode = document.querySelector(
    "#PolicyLocations2ZipCode"
  );
  const PolicyLocations2City = document.querySelector("#PolicyLocations2City");
  const PolicyLocations2County = document.querySelector(
    "#PolicyLocations2County"
  );

  // Take the first garaged location in your data
  const garagedLocation = data[0];
  const addressLine1 = garagedLocation["Address Line 1"];
  const addressLine2 = garagedLocation["Address Line 2"];
  const zipCode = garagedLocation["ZIP Code"];
  const city = garagedLocation["City"];
  const county = garagedLocation["County"];

  if (!addressLine1) {
    return;
  } else {
    PolicyLocations2AddressLine1.value = addressLine1;
    PolicyLocations2AddressLine1.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (!addressLine2) {
    return;
  } else {
    PolicyLocations2AddressLine2.value = addressLine2;
    PolicyLocations2AddressLine2.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (!zipCode) {
    return;
  } else {
    PolicyLocations2ZipCode.value = zipCode;
    PolicyLocations2ZipCode.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (!city) {
    return;
  } else {
    PolicyLocations2City.value = city;
    PolicyLocations2City.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!county) {
    return;
  } else {
    for (let option of PolicyLocations2County.options) {
      if (option.text.trim().toLowerCase() === county.trim().toLowerCase()) {
        option.selected = true;
        PolicyLocations2County.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  isAutoFillingGaragedLoaction = false;
  clickContinue();
}

function fillUpDrivers(data) {
  const PolicyDrivers1PersonSocialSecurityNumberFirstThree =
    document.querySelector(
      '[name="PolicyDrivers1PersonSocialSecurityNumberFirstThree"]'
    );
  const PolicyDrivers1PersonSocialSecurityNumberMiddleTwo =
    document.querySelector(
      '[name="PolicyDrivers1PersonSocialSecurityNumberMiddleTwo"]'
    );
  const PolicyDrivers1PersonSocialSecurityNumberLastFour =
    document.querySelector(
      '[name="PolicyDrivers1PersonSocialSecurityNumberLastFour"]'
    );
  const PolicyDrivers1PersonGender = document.querySelector(
    "#PolicyDrivers1PersonGender"
  );
  const PolicyDrivers1PersonMaritalStatus = document.querySelector(
    "#PolicyDrivers1PersonMaritalStatus"
  );
  const PolicyDrivers1LicenseState = document.querySelector(
    "#PolicyDrivers1LicenseState"
  );
  const PolicyDrivers1FirstAgeLicensed = document.querySelector(
    "#PolicyDrivers1FirstAgeLicensed"
  );
  const PolicyDrivers1LicenseSuspendedRevokedYNY = document.querySelector(
    "#PolicyDrivers1LicenseSuspendedRevokedYNY"
  );
  const PolicyDrivers1LicenseSuspendedRevokedYNN = document.querySelector(
    "#PolicyDrivers1LicenseSuspendedRevokedYNN"
  );
  const PolicyDrivers1AccidentPrevCourseYNY = document.querySelector(
    "#PolicyDrivers1AccidentPrevCourseYNY"
  );
  const PolicyDrivers1AccidentPrevCourseYNN = document.querySelector(
    "#PolicyDrivers1AccidentPrevCourseYNN"
  );

  // Take the first driver in your data
  const driverInfo = data[0];
  const ssn = driverInfo["SSN"];
  const gender = driverInfo["Gender"];
  const maritalStatus = driverInfo["Marital Status"];
  const licenseState = driverInfo["License State"];
  const firstAgeLicensed = driverInfo["Age when first licensed"];
  const licenseSuspendedRevokedYN =
    driverInfo["License been suspended/revoked?"];
  const accidentPrevCourseYN = driverInfo["Accident Prevention Course"];
  const accidentPrevCourseDate = driverInfo["Accident Prevention Course Date"];

  const sr22FilingYN = driverInfo["SR-22 Filing"];
  const sr22FilingDate = driverInfo["SR-22 Filing Date"];
  const sr22FilingEndDate = driverInfo["SR-22 Filing End Date"];
  const sr22FilingState = driverInfo["SR-22 Filing State"];
  const sr22FilingCaseNumber = driverInfo["SR-22 Case Number"];

  const fr44FilingYN = driverInfo["FR-44 Filing"];
  const fr44FilingDate = driverInfo["FR-44 Filing Date"];
  const fr44FilingEndDate = driverInfo["FR-44 Filing End Date"];
  const fr44FilingState = driverInfo["FR-44 Filing State"];
  const fr44FilingCaseNumber = driverInfo["FR-44 Case Number"];

  if (ssn) {
    const ssnParts = ssn.match(/^(\d{3})-(\d{2})-(\d{4})$/);
    if (ssnParts) {
      PolicyDrivers1PersonSocialSecurityNumberFirstThree.value = ssnParts[1];
      PolicyDrivers1PersonSocialSecurityNumberFirstThree.dispatchEvent(
        new Event("input", { bubbles: true })
      );
      PolicyDrivers1PersonSocialSecurityNumberMiddleTwo.value = ssnParts[2];
      PolicyDrivers1PersonSocialSecurityNumberMiddleTwo.dispatchEvent(
        new Event("input", { bubbles: true })
      );
      PolicyDrivers1PersonSocialSecurityNumberLastFour.value = ssnParts[3];
      PolicyDrivers1PersonSocialSecurityNumberLastFour.dispatchEvent(
        new Event("input", { bubbles: true })
      );
    }
  }

  if (gender) {
    for (let option of PolicyDrivers1PersonGender.options) {
      if (option.text.trim().toLowerCase() === gender.trim().toLowerCase()) {
        option.selected = true;
        PolicyDrivers1PersonGender.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (maritalStatus) {
    for (let option of PolicyDrivers1PersonMaritalStatus.options) {
      if (
        option.text.trim().toLowerCase() === maritalStatus.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyDrivers1PersonMaritalStatus.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (licenseState) {
    for (let option of PolicyDrivers1LicenseState.options) {
      if (
        option.text.trim().toLowerCase() === licenseState.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyDrivers1LicenseState.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (firstAgeLicensed) {
    PolicyDrivers1FirstAgeLicensed.value = firstAgeLicensed;
    PolicyDrivers1FirstAgeLicensed.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (licenseSuspendedRevokedYN) {
    const value = licenseSuspendedRevokedYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyDrivers1LicenseSuspendedRevokedYNY.checked = true;
      PolicyDrivers1LicenseSuspendedRevokedYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyDrivers1LicenseSuspendedRevokedYNN.checked = true;
      PolicyDrivers1LicenseSuspendedRevokedYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  if (accidentPrevCourseYN) {
    const value = accidentPrevCourseYN.trim().toLowerCase();
    if (value === "y") {
      PolicyDrivers1AccidentPrevCourseYNY.checked = true;
      PolicyDrivers1AccidentPrevCourseYNY.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyDrivers1AccidentPrevCourseYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyDrivers1AccidentPrevCourseYNN.checked = true;
      PolicyDrivers1AccidentPrevCourseYNN.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyDrivers1AccidentPrevCourseYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }

    if (value === "y" && accidentPrevCourseDate) {
      const waitForDateField = () => {
        const dateField = document.querySelector(
          "#PolicyDrivers1AccidentPrevCourseDate"
        );
        if (dateField) {
          dateField.value = convertDate(accidentPrevCourseDate);
          dateField.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
          setTimeout(waitForDateField, 100); // try again after 100ms
        }
      };
      waitForDateField();
    }
  }

  if (sr22FilingYN) {
    const value = sr22FilingYN?.trim().toLowerCase();
    const SR22FilingYNY = document.querySelector(
      "#PolicyDrivers1SR22FilingYNY"
    );
    const SR22FilingYNN = document.querySelector(
      "#PolicyDrivers1SR22FilingYNN"
    );
    const SR22FilingDate = document.querySelector(
      "#PolicyDrivers1SR22FilingDate"
    );
    const SR22FilingEndDate = document.querySelector(
      "#PolicyDrivers1SR22FilingEndDate"
    );
    const SR22FilingState = document.querySelector(
      "#PolicyDrivers1SR22FilingState"
    );
    const SR22FilingCaseNumber = document.querySelector(
      "#PolicyDrivers1SR22FilingCaseNumber"
    );

    if (value === "y" && SR22FilingYNY) {
      SR22FilingYNY.checked = true;
      SR22FilingYNY.dispatchEvent(new Event("click", { bubbles: true }));
      SR22FilingYNY.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n" && SR22FilingYNN) {
      SR22FilingYNN.checked = true;
      SR22FilingYNN.dispatchEvent(new Event("click", { bubbles: true }));
      SR22FilingYNN.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (value === "y" && sr22FilingState) {
      if (SR22FilingDate && sr22FilingDate) {
        SR22FilingDate.value = convertDate(sr22FilingDate);
        SR22FilingDate.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (SR22FilingEndDate && sr22FilingEndDate) {
        SR22FilingEndDate.value = convertDate(sr22FilingEndDate);
        SR22FilingEndDate.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (SR22FilingState) {
        for (let option of SR22FilingState.options) {
          if (
            option.text.trim().toLowerCase() ===
            sr22FilingState.trim().toLowerCase()
          ) {
            option.selected = true;
            SR22FilingState.dispatchEvent(
              new Event("change", { bubbles: true })
            );
            break;
          }
        }
      }

      if (SR22FilingCaseNumber && sr22FilingCaseNumber) {
        SR22FilingCaseNumber.value = sr22FilingCaseNumber;
        SR22FilingCaseNumber.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }

      if (!SR22FilingState || !SR22FilingCaseNumber) {
        setTimeout(waitForSr22Fields, 100); // try again after 100ms
      }
    }
  }

  if (fr44FilingYN) {
    const value = fr44FilingYN?.trim().toLowerCase();
    const FR44FilingYNY = document.querySelector(
      "#PolicyDrivers1FR44FilingYNY"
    );
    const FR44FilingYNN = document.querySelector(
      "#PolicyDrivers1FR44FilingYNN"
    );
    const FR44FilingDate = document.querySelector(
      "#PolicyDrivers1FR44FilingDate"
    );
    const FR44FilingEndDate = document.querySelector(
      "#PolicyDrivers1FR44FilingEndDate"
    );
    const FR44FilingState = document.querySelector(
      "#PolicyDrivers1FR44FilingState"
    );
    const FR44FilingCaseNumber = document.querySelector(
      "#PolicyDrivers1FR44FilingCaseNumber"
    );

    if (value === "y" && FR44FilingYNY) {
      FR44FilingYNY.checked = true;
      FR44FilingYNY.dispatchEvent(new Event("click", { bubbles: true }));
      FR44FilingYNY.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n" && FR44FilingYNN) {
      FR44FilingYNN.checked = true;
      FR44FilingYNN.dispatchEvent(new Event("click", { bubbles: true }));
      FR44FilingYNN.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (value === "y" && fr44FilingState) {
      if (FR44FilingDate && fr44FilingDate) {
        FR44FilingDate.value = convertDate(fr44FilingDate);
        FR44FilingDate.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (FR44FilingEndDate && fr44FilingEndDate) {
        FR44FilingEndDate.value = convertDate(fr44FilingEndDate);
        FR44FilingEndDate.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (FR44FilingState) {
        for (let option of FR44FilingState.options) {
          if (
            option.text.trim().toLowerCase() ===
            fr44FilingState.trim().toLowerCase()
          ) {
            option.selected = true;
            FR44FilingState.dispatchEvent(
              new Event("change", { bubbles: true })
            );
            break;
          }
        }
      }

      if (FR44FilingCaseNumber && fr44FilingCaseNumber) {
        FR44FilingCaseNumber.value = fr44FilingCaseNumber;
        FR44FilingCaseNumber.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }

      if (!FR44FilingState || !FR44FilingCaseNumber) {
        setTimeout(waitForFr44Fields, 100); // try again after 100ms
      }
    }
  }

  isAutoFillingDrivers = false;
  clickContinue();
}

function fillUpVehicle(data) {
  const RecVehicleYNY = document.querySelector("#PolicyVehicles1RecVehicleYNY");
  const RecVehicleYNN = document.querySelector("#PolicyVehicles1RecVehicleYNN");
  const VINKnownYNY = document.querySelector("#PolicyVehicles1VINKnownYNY");
  const VINKnownYNN = document.querySelector("#PolicyVehicles1VINKnownYNN");
  const Vehicles1Use = document.querySelector("#PolicyVehicles1Use");
  const Vehicles1OwnershipType = document.querySelector(
    "#PolicyVehicles1OwnershipType"
  );
  const Vehicles1AnnualMiles = document.querySelector(
    "#PolicyVehicles1AnnualMiles"
  );
  const Vehicles1CorporateOwnedYN = document.querySelector(
    "#PolicyVehicles1CorporateOwnedYN"
  );
  const Vehicles1YearsVehicleOwned = document.querySelector(
    "#PolicyVehicles1YearsVehicleOwned"
  );
  const Vehicles1RideshareDeliveryYNY = document.querySelector(
    "#PolicyVehicles1RideshareDeliveryYNY"
  );
  const Vehicles1RideshareDeliveryYNN = document.querySelector(
    "#PolicyVehicles1RideshareDeliveryYNN"
  );

  const vehicleInfo = data[0];
  const recVehicle = vehicleInfo["Recreational Vehicle"];
  const vinIsKnown = vehicleInfo["Vehicle VIN is known"];
  const vin = vehicleInfo["VIN"];
  const vehicleUse = vehicleInfo["Vehicle Use"];
  const ownershipType = vehicleInfo["Ownership Type"];
  const annualMiles = vehicleInfo["Annual Miles"];
  const corporateOwned = vehicleInfo["Corporate Owned"];
  const yearsOwned = vehicleInfo["Years Vehicle Owned"];
  const rideshareOrDelivery = vehicleInfo["Ridesharing/Delivery"];

  // if (recVehicle) {
  //   const value = recVehicle?.trim().toLowerCase();
  //   if (value === "y") {
  //     RecVehicleYNY.checked = true;
  //     RecVehicleYNY.dispatchEvent(new Event("change", { bubbles: true }));
  //   } else if (value === "n") {
  //     RecVehicleYNN.checked = true;
  //     RecVehicleYNN.dispatchEvent(new Event("change", { bubbles: true }));
  //   }
  // }

  if (vinIsKnown) {
    const value = vinIsKnown?.trim().toLowerCase();
    if (value === "y") {
      VINKnownYNY.checked = true;
      VINKnownYNY.dispatchEvent(new Event("change", { bubbles: true }));
      VINKnownYNY.dispatchEvent(new Event("click", { bubbles: true }));
      const interval = setInterval(() => {
        const VIN = document.querySelector("#PolicyVehicles1VIN");
        if (VIN) {
          clearInterval(interval);
          fillVinField(VIN, vin);
        }
      }, 100);
    } else if (value === "n") {
      VINKnownYNN.checked = true;
      VINKnownYNN.dispatchEvent(new Event("change", { bubbles: true }));
      VINKnownYNN.dispatchEvent(new Event("click", { bubbles: true }));
    }
  }

  if (vehicleUse) {
    for (let option of Vehicles1Use.options) {
      if (normalize(option.text) === normalize(vehicleUse)) {
        option.selected = true;
        Vehicles1Use.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }
  }

  if (ownershipType) {
    for (let option of Vehicles1OwnershipType.options) {
      if (
        option.text.trim().toLowerCase() === ownershipType.trim().toLowerCase()
      ) {
        option.selected = true;
        Vehicles1OwnershipType.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (annualMiles) {
    Vehicles1AnnualMiles.value = annualMiles;
    Vehicles1AnnualMiles.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (yearsOwned) {
    Vehicles1YearsVehicleOwned.value = yearsOwned;
    Vehicles1YearsVehicleOwned.dispatchEvent(
      new Event("input", { bubbles: true })
    );
  }

  if (rideshareOrDelivery) {
    const value = rideshareOrDelivery.trim().toLowerCase();
    if (value === "y") {
      Vehicles1RideshareDeliveryYNY.checked = true;
      Vehicles1RideshareDeliveryYNY.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      Vehicles1RideshareDeliveryYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      Vehicles1RideshareDeliveryYNN.checked = true;
      Vehicles1RideshareDeliveryYNN.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      Vehicles1RideshareDeliveryYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  function fillVinField(VIN, vin) {
    VIN.value = vin;
    VIN.focus();
    VIN.dispatchEvent(new Event("input", { bubbles: true }));
    VIN.dispatchEvent(new Event("change", { bubbles: true }));
    VIN.dispatchEvent(new Event("click", { bubbles: true }));

    setTimeout(() => {
      VIN.blur();
      document.querySelector("#tdvehicles").click();
    }, 500);
  }

  // document.querySelector('#tdvehicles').click();
  isAutoFillingVehicle = false;
  clickContinue();
}

function fillUpTelematics(data) {
  const TelematicsStatus = document.querySelector(
    "#PolicyDrivers1TelematicsStatus"
  );
  const telematicsInfo = data[0];
  const rightTrackStatus = telematicsInfo["RightTrack Status"];
  const emailAddress = telematicsInfo["Email Address"];
  if (rightTrackStatus) {
    for (let option of TelematicsStatus.options) {
      if (normalize(option.text) === normalize(rightTrackStatus)) {
        option.selected = true;
        TelematicsStatus.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
      if (rightTrackStatus === "Opt In With Compatible Smartphone") {
        const waitForField = () => {
          const emailAddressField = document.querySelector(
            "#PolicyClientEmailAddress"
          );
          if (emailAddressField) {
            emailAddressField.value = emailAddress;
            emailAddressField.dispatchEvent(
              new Event("input", { bubbles: true })
            );
          } else {
            setTimeout(waitForField, 100);
          }
        };
        waitForField();
      }
    }
  }
  clickContinue();
}

function fillUpUnderwriting(data) {
  const PolicyAutoDataResidenceType = document.querySelector(
    "#PolicyAutoDataResidenceType"
  );
  const PolicyDriverPersonCommonOccupationCategory = document.querySelector(
    "#PolicyDriverPersonCommonOccupationCategory"
  );
  const PolicyDriverPersonEducation = document.querySelector(
    "#PolicyDriverPersonEducation"
  );
  const PolicyAutoDataPaperlessDocumentsDiscYNY = document.querySelector(
    "#PolicyAutoDataPaperlessDocumentsDiscYNY"
  );
  const PolicyAutoDataPaperlessDocumentsDiscYNN = document.querySelector(
    "#PolicyAutoDataPaperlessDocumentsDiscYNN"
  );

  const underwritingInfo = data[0];
  const residenceType = underwritingInfo["Residence Type"];
  const commonOccupations = underwritingInfo["Common Occupations"];
  const levelOfEducation = underwritingInfo["Highest Level of Education"];
  const paperlessDocument = underwritingInfo["Paperless Documents"];

  if (residenceType) {
    for (let option of PolicyAutoDataResidenceType.options) {
      if (
        option.text.trim().toLowerCase() === residenceType.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyAutoDataResidenceType.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (commonOccupations) {
    for (let option of PolicyDriverPersonCommonOccupationCategory.options) {
      if (
        option.text.trim().toLowerCase() ===
        commonOccupations.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyDriverPersonCommonOccupationCategory.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (levelOfEducation) {
    for (let option of PolicyDriverPersonEducation.options) {
      if (
        option.text.trim().toLowerCase() ===
        levelOfEducation.trim().toLowerCase()
      ) {
        option.selected = true;
        PolicyDriverPersonEducation.dispatchEvent(
          new Event("change", { bubbles: true })
        );
        break;
      }
    }
  }

  if (paperlessDocument) {
    const value = paperlessDocument?.trim().toLowerCase();
    if (value === "y") {
      PolicyAutoDataPaperlessDocumentsDiscYNY.checked = true;
      PolicyAutoDataPaperlessDocumentsDiscYNY.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyAutoDataPaperlessDocumentsDiscYNY.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else if (value === "n") {
      PolicyAutoDataPaperlessDocumentsDiscYNN.checked = true;
      PolicyAutoDataPaperlessDocumentsDiscYNN.dispatchEvent(
        new Event("click", { bubbles: true })
      );
      PolicyAutoDataPaperlessDocumentsDiscYNN.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }
  clickPDFLink();
  clickContinue(true);
}

function normalize(str) {
  return str.replace(/\s+/g, " ").trim().toLowerCase();
}

function clickContinue(isLastTab = false) {
  const btn = document.querySelector("#Continue");
  if (!btn) return;

  if (!isLastTab) {
    btn.click();
  }

  if (isLastTab) {
    if (currentId < toId) {
      currentId++;
      console.log("➡️ moving to next ID:", currentId);

      // save progress
      chrome.storage.local.set({
        automationRange: {
          from: fromId,
          to: toId,
          current: currentId,
          returnToNow: true,
        },
      });

      window.location.href = "https://now.agent.safeco.com/start";
    } else {
      console.log("✅ All IDs done.");
      chrome.storage.local.remove("automationRange");
    }
  } else {
    // 👇 only run this on normal tabs, not last tab
    setTimeout(() => {
      const tabContainer = document.querySelector("#ScreenTabs1");
      const sel = tabContainer?.querySelector("td.topSelected");
      if (sel) {
        const tabName = sel.innerText.replace(/\n/g, " ").trim();
        console.log("[clickContinue] now on:", tabName, "id:", currentId);
        callAPIForTab(currentId, tabName);
      }
    }, 1000);
  }
}

function clickPDFLink() {
  const link = document.querySelector(
    'span[onclick*="CurrentCarrierReportViewer"]'
  );
  if (link) {
    link.click();
  }
}
