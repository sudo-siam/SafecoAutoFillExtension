var SCRIPT_ID = "AKfycbz7Fq8GZDirn_jtVwhAKCHBTETNHKPHAywi3yzjA3Rg28hbR8dKRf74z7U597puHGAE";
const API_URL = "https://script.google.com/macros/s/" + SCRIPT_ID + "/exec";

let data = [];

let currentID = 1;     
const maxID = 10;
let formSection = document.querySelector("td.topSelected").innerText.replace(/\n/g, " ");

async function fetchPolicyInformation() {

  if (currentID > maxID) {
    console.log("All policies processed.");
    return;
  }

  try {
    console.log("Fetching ID:", currentID);
    const response = await fetch(`${API_URL}?action=getData&id=${currentID}&sheetname=${encodeURIComponent(formSection)}`);
    console.log(response);
    const json = await response.json();

    if (json.status === "success") {
      const policyApiData = json.data;
      console.log("Fetched PolicyInformation:", policyApiData);

      // Fill the form
      fillUpPolicyInformation([policyApiData]);

      // Wait for a bit if needed (e.g., for user interaction or animations)
      await new Promise(res => setTimeout(res, 500)); 
    } else {
      console.error("API error:", json.message);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

async function fetchGaragedLocations() {

  try {
    console.log("Fetching ID:", currentID);
    const response = await fetch(`${API_URL}?action=getData&id=${currentID}&sheetname=${encodeURIComponent(formSection)}`);
  
    const json = await response.json();
    if (json.status === "success") {
      const garagedApiData = json.data;
      console.log("Fetched GaragedLocations:", garagedApiData);

      fillUpGaragedLocations([garagedApiData]);

      // Wait for a bit if needed (e.g., for user interaction or animations)
      await new Promise(res => setTimeout(res, 500)); 
    } else {
      console.error("API error:", json.message);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function callAPIForTab(tabName) {
  if (tabName === "Policy Information") {
    fetchPolicyInformation();
  } else if (tabName === "Garaged Locations") {
    fetchGaragedLocations();
  }
}

// Wait for the tab container to exist
function initTabObserver() {
  const tabContainer = document.querySelector("#ScreenTabs1"); // adjust selector
  if (!tabContainer) {
    setTimeout(initTabObserver, 500); // try again if not loaded yet
    return;
  }

  // Observe all <td> inside the tab container for class changes
  const observer = new MutationObserver(() => {
    const selectedTab = tabContainer.querySelector("td.topSelected");
    if (selectedTab) {
      const tabName = selectedTab.innerText.replace(/\n/g, " ");
      callAPIForTab(tabName);
    }
  });

  const tabs = tabContainer.querySelectorAll("td");
  tabs.forEach(td => observer.observe(td, { attributes: true, attributeFilter: ["class"] }));

  // Optional: trigger for the initial selected tab
  const initialTab = tabContainer.querySelector("td.topSelected");
  if (initialTab) {
    callAPIForTab(initialTab.innerText.replace(/\n/g, " "));
  }
}

// Start observing
initTabObserver();

function clickCloseButton() {
  const btn = document.querySelector("div.ui-dialog-titlebar a.ui-dialog-titlebar-close");
  if (btn) {
    btn.click();
  } else {
    setTimeout(clickCloseButton, 200); // retry every 200ms
  }
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
    suffix: match[3]
  };
}

function fillUpPolicyInformation(data) {
  const PolicyRatingState = document.querySelector("#PolicyRatingState");
  const ProducerID = document.querySelector("#PolicyProducerName");
  const PolicyQuoteDate = document.querySelector("#PolicyQuoteDate");
  const PolicyEffectiveDate = document.querySelector("#PolicyEffectiveDate");
  const PolicyClientAgentCustomerID = document.querySelector("#PolicyClientAgentCustomerID");
  const PolicyDescriptiveName = document.querySelector("#PolicyDescriptiveName");

  // Named Insured Applicant Information Fields

  const PolicyClientPersonFirstName = document.querySelector("#PolicyClientPersonFirstName");
  const PolicyClientPersonMiddleName = document.querySelector("#PolicyClientPersonMiddleName");
  const PolicyClientPersonLastName = document.querySelector("#PolicyClientPersonLastName");
  const PolicyClientPersonMaritalStatus = document.querySelector("#PolicyClientPersonMaritalStatus");
  const PolicyClientPersonBirthdate = document.querySelector("#PolicyClientPersonBirthdate");

  const PolicyClientHomePhoneNumberAreaCode = document.querySelector('[name="PolicyClientHomePhoneNumberAreaCode"]');
  const PolicyClientHomePhoneNumberPrefix = document.querySelector('[name="PolicyClientHomePhoneNumberPrefix"]');
  const PolicyClientHomePhoneNumberSuffix = document.querySelector('[name="PolicyClientHomePhoneNumberSuffix"]');

  const PolicyClientEmailAddress = document.querySelector("#PolicyClientEmailAddress");

  const PolicyClientMailingLocationAddressLine1 = document.querySelector("#PolicyClientMailingLocationAddressLine1");
  const PolicyClientMailingLocationAddressLine2 = document.querySelector("#PolicyClientMailingLocationAddressLine2");
  const PolicyClientMailingLocationZipCode = document.querySelector("#PolicyClientMailingLocationZipCode");
  const PolicyClientMailingLocationCity = document.querySelector("#PolicyClientMailingLocationCity");
  const PolicyClientMailingLocationState = document.querySelector("#PolicyClientMailingLocationState");
  const PolicyAutoDataVehicleGaragingAddressYES = document.querySelector('#PolicyAutoDataVehicleGaragingAddressYNY');
  const PolicyAutoDataVehicleGaragingAddressNO = document.querySelector('#PolicyAutoDataVehicleGaragingAddressYNN');


  // Additional Policy Information Fields

  const PolicyAutoDataAutoBusinessType = document.querySelector('#PolicyAutoDataAutoBusinessType');

  const PolicyAutoDataAnyIncidentsOnPolicyYNY = document.querySelector('#PolicyAutoDataAnyIncidentsOnPolicyYNY');
  const PolicyAutoDataAnyIncidentsOnPolicyYNN = document.querySelector('#PolicyAutoDataAnyIncidentsOnPolicyYNN');

  const PolicyAdditionalInterestsYNY = document.querySelector('#PolicyAdditionalInterestsYNY');
  const PolicyAdditionalInterestsYNN = document.querySelector('#PolicyAdditionalInterestsYNN');

  const PolicyAutoDataNamedNonOwnerYN = document.querySelector('#PolicyAutoDataNamedNonOwnerYN');
  const PolicyAutoDataMultipleCarDiscYN = document.querySelector('#PolicyAutoDataMultipleCarDiscYN');

  const PolicyAutoDataDeliveryVehicleYNY = document.querySelector('#PolicyAutoDataDeliveryVehicleYNY');
  const PolicyAutoDataDeliveryVehicleYNN = document.querySelector('#PolicyAutoDataDeliveryVehicleYNN');

  const PolicyOfferCode = document.querySelector('#PolicyOfferCode');





  if (!PolicyRatingState || !data || !data.length) return;
  if (!ProducerID || !data || !data.length) return;
  if (!PolicyQuoteDate || !data || !data.length) return;
  if (!PolicyEffectiveDate || !data || !data.length) return;
  if (!PolicyClientAgentCustomerID || !data || !data.length) return;
  if (!PolicyDescriptiveName || !data || !data.length) return;

  if (!PolicyClientPersonFirstName || !data || !data.length) return;
  if (!PolicyClientPersonMiddleName || !data || !data.length) return;
  if (!PolicyClientPersonLastName || !data || !data.length) return;
  if (!PolicyClientPersonMaritalStatus || !data || !data.length) return;
  if (!PolicyClientPersonBirthdate || !data || !data.length) return;
  if (!PolicyClientHomePhoneNumberAreaCode || !data || !data.length) return;
  if (!PolicyClientHomePhoneNumberPrefix || !data || !data.length) return;
  if (!PolicyClientHomePhoneNumberSuffix || !data || !data.length) return;

  
  if (!PolicyClientEmailAddress || !data || !data.length) return;
  
  
  if (!PolicyClientMailingLocationAddressLine1 || !data || !data.length) return;
  if (!PolicyClientMailingLocationAddressLine2 || !data || !data.length) return;
  if (!PolicyClientMailingLocationZipCode || !data || !data.length) return;
  if (!PolicyClientMailingLocationCity || !data || !data.length) return;
  if (!PolicyClientMailingLocationState || !data || !data.length) return;
  if (!PolicyAutoDataVehicleGaragingAddressYES || !data || !data.length) return;
  if (!PolicyAutoDataVehicleGaragingAddressNO || !data || !data.length) return;

  if (!PolicyAutoDataAutoBusinessType || !data || !data.length) return;
  if (!PolicyAutoDataAnyIncidentsOnPolicyYNY || !data || !data.length) return;
  if (!PolicyAutoDataAnyIncidentsOnPolicyYNN || !data || !data.length) return;
  if (!PolicyAdditionalInterestsYNY || !data || !data.length) return;
  if (!PolicyAdditionalInterestsYNN || !data || !data.length) return;
  if (!PolicyAutoDataNamedNonOwnerYN || !data || !data.length) return;
  if (!PolicyAutoDataMultipleCarDiscYN || !data || !data.length) return;
  if (!PolicyAutoDataDeliveryVehicleYNY || !data || !data.length) return;
  if (!PolicyAutoDataDeliveryVehicleYNN || !data || !data.length) return;
  if (!PolicyOfferCode || !data || !data.length) return;

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
  const policyAutoDataVehicleGaragingAddressYN = policyInfo["All vehicles garaged at mailing address?"];

  const policyAutoDataAutoBusinessType = policyInfo["Reason for Policy"];
  const policyAutoDataAnyIncidentsOnPolicyYN = policyInfo["Any reportable incidents?"];
  const policyAdditionalInterestsYN = policyInfo["Additional Interests?"];
  const policyAutoDataNamedNonOwnerYN = policyInfo["Named Non-Owner"];
  const policyAutoDataMultipleCarDiscYN = policyInfo["Advanced Multiple Car Discount"];
  const policyAutoDataDeliveryVehicleYN = policyInfo["Any vehicles used for delivery?"];
  const policyOfferCode = policyInfo["Priority Code"];


  if (!ratingState) {
    return;
  } else {
    for (let option of PolicyRatingState.options) {
      // Match by option text (you can also match by value if needed)
      if (option.text.trim().toLowerCase() === ratingState.trim().toLowerCase()) {
        option.selected = true;
        PolicyRatingState.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }
  } 

  if (!producerID) {
    return;
  } else {
    ProducerID.value = producerID;
    ProducerID.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyQuoteDate) {
    return;
  } else {   
    PolicyQuoteDate.value = policyQuoteDate;
    PolicyQuoteDate.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyEffectiveDate) {
    return;
  } else {   
    PolicyEffectiveDate.value = policyEffectiveDate;
    PolicyEffectiveDate.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyClientAgentCustomerID) {
    return;
  } else {   
    PolicyClientAgentCustomerID.value = policyClientAgentCustomerID;
    PolicyClientAgentCustomerID.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyDescriptiveName) {
    return;
  } else {  
    PolicyDescriptiveName.value = policyDescriptiveName;
    PolicyDescriptiveName.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (!policyClientPersonFirstName) {
    return;
  } else {  
    PolicyClientPersonFirstName.value = policyClientPersonFirstName;
    PolicyClientPersonFirstName.dispatchEvent(new Event("input", { bubbles: true }));
  }
  
  if (policyClientPersonMiddleName) { 
    PolicyClientPersonMiddleName.value = policyClientPersonMiddleName;
    PolicyClientPersonMiddleName.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyClientPersonLastName) {
    return;
  } else {  
    PolicyClientPersonLastName.value = policyClientPersonLastName;
    PolicyClientPersonLastName.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (!policyClientPersonMaritalStatus) {
    return;
  } else {  
    for (let option of PolicyClientPersonMaritalStatus.options) {
      // Match by option text (you can also match by value if needed)
      if (option.text.trim().toLowerCase() === policyClientPersonMaritalStatus.trim().toLowerCase()) {
        option.selected = true;
        PolicyClientPersonMaritalStatus.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }
  }

  if (!policyClientPersonBirthdate) {
    return;
  } else {  
    PolicyClientPersonBirthdate.value = policyClientPersonBirthdate;
    PolicyClientPersonBirthdate.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!primaryPhoneNumber) {
    return;
  } else {  
    const phoneParts = splitPhoneNumber(primaryPhoneNumber);   
    if (phoneParts) {
      PolicyClientHomePhoneNumberAreaCode.value = phoneParts.areaCode;
      PolicyClientHomePhoneNumberAreaCode.dispatchEvent(new Event("input", { bubbles: true }));
      PolicyClientHomePhoneNumberPrefix.value = phoneParts.prefix;
      PolicyClientHomePhoneNumberPrefix.dispatchEvent(new Event("input", { bubbles: true }));
      PolicyClientHomePhoneNumberSuffix.value = phoneParts.suffix;
      PolicyClientHomePhoneNumberSuffix.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  if (!policyClientEmailAddress) {
    return;
  } else {  
    PolicyClientEmailAddress.value = policyClientEmailAddress;
    PolicyClientEmailAddress.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyClientMailingLocationAddressLine1) {
    return;
  } else {  
    PolicyClientMailingLocationAddressLine1.value = policyClientMailingLocationAddressLine1;
    PolicyClientMailingLocationAddressLine1.dispatchEvent(new Event("input", { bubbles: true }));
  } 

  if (!policyClientMailingLocationAddressLine2) {
    return;
  } else {  
    PolicyClientMailingLocationAddressLine2.value = policyClientMailingLocationAddressLine2;
    PolicyClientMailingLocationAddressLine2.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyClientMailingLocationZipCode) {
    return;
  } else {  
    PolicyClientMailingLocationZipCode.value = policyClientMailingLocationZipCode;   
    PolicyClientMailingLocationZipCode.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!policyClientMailingLocationCity) {
    return;
  } else {  
    PolicyClientMailingLocationCity.value = policyClientMailingLocationCity;   
    PolicyClientMailingLocationCity.dispatchEvent(new Event("input", { bubbles: true }));
  }
  
  if (!policyClientMailingLocationState) {
    return;
  } else {  
    for (let option of PolicyClientMailingLocationState.options) {
      // Match by option text (you can also match by value if needed)
      if (option.text.trim().toLowerCase() === policyClientMailingLocationState.trim().toLowerCase()) {
        option.selected = true;
        PolicyClientMailingLocationState.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    } 
  }

  if (policyAutoDataVehicleGaragingAddressYN) {
    const value = policyAutoDataVehicleGaragingAddressYN?.trim().toLowerCase();

    if (value === "y") {
      PolicyAutoDataVehicleGaragingAddressYES.checked = true;
      PolicyAutoDataVehicleGaragingAddressYES.dispatchEvent(new Event("change", { bubbles: true }));
    } 
    else if (value === "n") {
      PolicyAutoDataVehicleGaragingAddressNO.checked = true;
      PolicyAutoDataVehicleGaragingAddressNO.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (policyAutoDataAutoBusinessType) {
    const value = policyAutoDataAutoBusinessType?.trim().toLowerCase(); 
    for (let option of PolicyAutoDataAutoBusinessType.options) {
      if (option.text.trim().toLowerCase() === value) {
        option.selected = true;
        PolicyAutoDataAutoBusinessType.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      } 

      if (value === "Carrier Consolidation/Book Transfer") {
        if (policyAutoDataMultipleCarDiscYN) {
          const value = policyAutoDataMultipleCarDiscYN?.trim().toLowerCase();  
          if (value === "y") {
            PolicyAutoDataMultipleCarDiscYN.checked = true;
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(new Event("change", { bubbles: true }));
          } else if (value === "n") {
            PolicyAutoDataMultipleCarDiscYN.checked = false;
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      }
    }
  }

  if (policyAutoDataAnyIncidentsOnPolicyYN) {
    const value = policyAutoDataAnyIncidentsOnPolicyYN?.trim().toLowerCase(); 
    if (value === "y") {
      PolicyAutoDataAnyIncidentsOnPolicyYNY.checked = true;
      PolicyAutoDataAnyIncidentsOnPolicyYNY.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n") {
      PolicyAutoDataAnyIncidentsOnPolicyYNN.checked = true;
      PolicyAutoDataAnyIncidentsOnPolicyYNN.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (policyAdditionalInterestsYN) {
    const value = policyAdditionalInterestsYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAdditionalInterestsYNY.checked = true;
      PolicyAdditionalInterestsYNY.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n") {
      PolicyAdditionalInterestsYNN.checked = true;
      PolicyAdditionalInterestsYNN.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (policyAutoDataNamedNonOwnerYN) {
    const value = policyAutoDataNamedNonOwnerYN?.trim().toLowerCase(); 
    if (value === "y") {
      PolicyAutoDataNamedNonOwnerYN.checked = true;
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n") {
      PolicyAutoDataNamedNonOwnerYN.checked = false;
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (policyAutoDataDeliveryVehicleYN) {
    const value = policyAutoDataDeliveryVehicleYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyAutoDataDeliveryVehicleYNY.checked = true;
      PolicyAutoDataDeliveryVehicleYNY.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n") {
      PolicyAutoDataDeliveryVehicleYNN.checked = true;
      PolicyAutoDataDeliveryVehicleYNN.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (!policyOfferCode) {
    return;
  } else {  
    PolicyOfferCode.value = policyOfferCode;
    PolicyOfferCode.dispatchEvent(new Event("input", { bubbles: true }));
  }
  

  
  // currentID++;
  // fetchPolicyInformation();
}

function fillUpGaragedLocations(data) {
  const PolicyLocations2AddressLine1 = document.querySelector("#PolicyLocations2AddressLine1");
  const PolicyLocations2AddressLine2 = document.querySelector("#PolicyLocations2AddressLine2");
  const PolicyLocations2ZipCode = document.querySelector("#PolicyLocations2ZipCode");
  const PolicyLocations2City = document.querySelector("#PolicyLocations2City");

  
  if(!PolicyLocations2AddressLine1 || !data || !data.length) return;
  if(!PolicyLocations2AddressLine2 || !data || !data.length) return;
  if(!PolicyLocations2ZipCode || !data || !data.length) return;
  if(!PolicyLocations2City || !data || !data.length) return;


  // Take the first garaged location in your data
  const garagedLocation = data[0];
  const addressLine1 = garagedLocation["Address Line 1"];
  const addressLine2 = garagedLocation["Address Line 2"];
  const zipCode = garagedLocation["ZIP Code"];
  const city = garagedLocation["City"];


  if (!addressLine1) {
    return;
  } else {
    PolicyLocations2AddressLine1.value = addressLine1;
    PolicyLocations2AddressLine1.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!addressLine2) {
    return;
  } else {  
    PolicyLocations2AddressLine2.value = addressLine2;
    PolicyLocations2AddressLine2.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!zipCode) {
    return;
  } else {  
    PolicyLocations2ZipCode.value = zipCode;  
    PolicyLocations2ZipCode.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!city) {
    return;
  } else {  
    PolicyLocations2City.value = city;  
    PolicyLocations2City.dispatchEvent(new Event("input", { bubbles: true }));
  }


  
}



