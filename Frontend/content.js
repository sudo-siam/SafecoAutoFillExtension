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

async function fetchDrivers() {

  try {
    console.log("Fetching ID:", currentID);
    const response = await fetch(`${API_URL}?action=getData&id=${currentID}&sheetname=${encodeURIComponent(formSection)}`); 
    const json = await response.json();
    if (json.status === "success") {
      const driversApiData = json.data;
      console.log("Fetched Drivers:", driversApiData);  
      // Fill the form
      fillUpDrivers([driversApiData]);
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
  } else if (tabName === "Drivers") {
    fetchDrivers();
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
  const PolicyClientMailingLocationOverrideUSPSAddressEditYN = document.querySelector("#PolicyClientMailingLocationOverrideUSPSAddressEditYN");
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
  if (!PolicyClientMailingLocationOverrideUSPSAddressEditYN || !data || !data.length) return;
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
  const policyClientMailingLocationOverrideUSPSAddressEditYN = policyInfo["Override USPS Address Edit?"];
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

  if(!policyClientMailingLocationOverrideUSPSAddressEditYN) {
    return;
  } else {
    const value = policyClientMailingLocationOverrideUSPSAddressEditYN?.trim().toLowerCase();
    if (value === "y") {
      PolicyClientMailingLocationOverrideUSPSAddressEditYN.checked = true;
      PolicyClientMailingLocationOverrideUSPSAddressEditYN.dispatchEvent(new Event("click", { bubbles: true }));
      PolicyClientMailingLocationOverrideUSPSAddressEditYN.dispatchEvent(new Event("change", { bubbles: true }));
    } 
    else if (value === "n") {
      PolicyClientMailingLocationOverrideUSPSAddressEditYN.checked = false;
      PolicyClientMailingLocationOverrideUSPSAddressEditYN.dispatchEvent(new Event("click", { bubbles: true }));
      PolicyClientMailingLocationOverrideUSPSAddressEditYN.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (policyAutoDataVehicleGaragingAddressYN) {
    const value = policyAutoDataVehicleGaragingAddressYN?.trim().toLowerCase();

    if (value === "y") {
      PolicyAutoDataVehicleGaragingAddressYES.checked = true;
      PolicyAutoDataVehicleGaragingAddressYES.dispatchEvent(new Event("click", { bubbles: true }));
      PolicyAutoDataVehicleGaragingAddressYES.dispatchEvent(new Event("change", { bubbles: true }));
    } 
    else if (value === "n") {
      PolicyAutoDataVehicleGaragingAddressNO.checked = true;
      PolicyAutoDataVehicleGaragingAddressNO.dispatchEvent(new Event("click", { bubbles: true }));
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

      if (value === "carrier consolidation/book transfer") {
        if (policyAutoDataMultipleCarDiscYN) {
          const value = policyAutoDataMultipleCarDiscYN?.trim().toLowerCase();  
          if (value === "y") {
            PolicyAutoDataMultipleCarDiscYN.checked = true;
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(new Event("click", { bubbles: true }));
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(new Event("change", { bubbles: true }));
          } else if (value === "n") {
            PolicyAutoDataMultipleCarDiscYN.checked = false;
            PolicyAutoDataMultipleCarDiscYN.dispatchEvent(new Event("click", { bubbles: true }));
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
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(new Event("click", { bubbles: true }));
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (value === "n") {
      PolicyAutoDataNamedNonOwnerYN.checked = false;
      PolicyAutoDataNamedNonOwnerYN.dispatchEvent(new Event("click", { bubbles: true }));
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
  const PolicyLocations2County = document.querySelector("#PolicyLocations2County");

  
  if(!PolicyLocations2AddressLine1 || !data || !data.length) return;
  if(!PolicyLocations2AddressLine2 || !data || !data.length) return;
  if(!PolicyLocations2ZipCode || !data || !data.length) return;
  if(!PolicyLocations2City || !data || !data.length) return;
  if(!PolicyLocations2County || !data || !data.length) return;


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

  if (!county) {
    return;
  } else {  
    for (let option of PolicyLocations2County.options) {
      if (option.text.trim().toLowerCase() ===  county.trim().toLowerCase()) {
        option.selected = true;
        PolicyLocations2County.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      } 
    }
  }
}

function fillUpDrivers(data) {
    const PolicyDrivers1PersonSocialSecurityNumberFirstThree = document.querySelector('[name="PolicyDrivers1PersonSocialSecurityNumberFirstThree"]')
    const PolicyDrivers1PersonSocialSecurityNumberMiddleTwo = document.querySelector('[name="PolicyDrivers1PersonSocialSecurityNumberMiddleTwo"]')
    const PolicyDrivers1PersonSocialSecurityNumberLastFour = document.querySelector('[name="PolicyDrivers1PersonSocialSecurityNumberLastFour"]')
    const PolicyDrivers1PersonGender = document.querySelector("#PolicyDrivers1PersonGender");
    const PolicyDrivers1PersonMaritalStatus = document.querySelector("#PolicyDrivers1PersonMaritalStatus");
    const PolicyDrivers1LicenseState = document.querySelector("#PolicyDrivers1LicenseState");
    const PolicyDrivers1FirstAgeLicensed = document.querySelector("#PolicyDrivers1FirstAgeLicensed");
    const PolicyDrivers1LicenseSuspendedRevokedYNY = document.querySelector('#PolicyDrivers1LicenseSuspendedRevokedYNY');
    const PolicyDrivers1LicenseSuspendedRevokedYNN = document.querySelector('#PolicyDrivers1LicenseSuspendedRevokedYNN');
    const PolicyDrivers1AccidentPrevCourseYNY = document.querySelector('#PolicyDrivers1AccidentPrevCourseYNY');
    const PolicyDrivers1AccidentPrevCourseYNN = document.querySelector('#PolicyDrivers1AccidentPrevCourseYNN');

    if(!PolicyDrivers1PersonSocialSecurityNumberFirstThree || !data || !data.length) return;
    if(!PolicyDrivers1PersonSocialSecurityNumberMiddleTwo || !data || !data.length) return;
    if(!PolicyDrivers1PersonSocialSecurityNumberLastFour || !data || !data.length) return;
    if(!PolicyDrivers1PersonGender || !data || !data.length) return;  
    if(!PolicyDrivers1PersonMaritalStatus || !data || !data.length) return;
    if(!PolicyDrivers1LicenseState || !data || !data.length) return;
    if(!PolicyDrivers1FirstAgeLicensed || !data || !data.length) return;
    if(!PolicyDrivers1LicenseSuspendedRevokedYNY || !data || !data.length) return;
    if(!PolicyDrivers1LicenseSuspendedRevokedYNN || !data || !data.length) return;
    if(!PolicyDrivers1AccidentPrevCourseYNY || !data || !data.length) return;
    if(!PolicyDrivers1AccidentPrevCourseYNN || !data || !data.length) return;

    // Take the first driver in your data
    const driverInfo = data[0];
    const ssn = driverInfo["SSN"];
    const gender = driverInfo["Gender"];
    const maritalStatus = driverInfo["Marital Status"];
    const licenseState = driverInfo["License State"];
    const firstAgeLicensed = driverInfo["Age when first licensed"];
    const licenseSuspendedRevokedYN = driverInfo["License been suspended/revoked?"];
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
    
    if (!ssn) {
      return;
    } else {  
      const ssnParts = ssn.match(/^(\d{3})-(\d{2})-(\d{4})$/);
      if (ssnParts) {
        PolicyDrivers1PersonSocialSecurityNumberFirstThree.value = ssnParts[1];
        PolicyDrivers1PersonSocialSecurityNumberFirstThree.dispatchEvent(new Event("input", { bubbles: true }));
        PolicyDrivers1PersonSocialSecurityNumberMiddleTwo.value = ssnParts[2];
        PolicyDrivers1PersonSocialSecurityNumberMiddleTwo.dispatchEvent(new Event("input", { bubbles: true }));
        PolicyDrivers1PersonSocialSecurityNumberLastFour.value = ssnParts[3];
        PolicyDrivers1PersonSocialSecurityNumberLastFour.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    if (!gender) {
      return;
    } else {  
      for (let option of PolicyDrivers1PersonGender.options) {
        if (option.text.trim().toLowerCase() ===  gender.trim().toLowerCase()) {
          option.selected = true;
          PolicyDrivers1PersonGender.dispatchEvent(new Event("change", { bubbles: true }));
          break;
        } 
      }
    }

    if (!maritalStatus) {
      return;
    } else {  
      for (let option of PolicyDrivers1PersonMaritalStatus.options) {
        if (option.text.trim().toLowerCase() ===  maritalStatus.trim().toLowerCase()) {
          option.selected = true;
          PolicyDrivers1PersonMaritalStatus.dispatchEvent(new Event("change", { bubbles: true }));
          break;
        } 
      }
    }

    if (!licenseState) {
      return;
    } else {  
      for (let option of PolicyDrivers1LicenseState.options) {
        if (option.text.trim().toLowerCase() ===  licenseState.trim().toLowerCase()) {
          option.selected = true;
          PolicyDrivers1LicenseState.dispatchEvent(new Event("change", { bubbles: true }));
          break;
        } 
      }
    }
    
    if (!firstAgeLicensed) {
      return;
    } else {  
      PolicyDrivers1FirstAgeLicensed.value = firstAgeLicensed;  
      PolicyDrivers1FirstAgeLicensed.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (licenseSuspendedRevokedYN) {
      const value = licenseSuspendedRevokedYN?.trim().toLowerCase();
      if (value === "y") {
        PolicyDrivers1LicenseSuspendedRevokedYNY.checked = true;
        PolicyDrivers1LicenseSuspendedRevokedYNY.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (value === "n") { 
        PolicyDrivers1LicenseSuspendedRevokedYNN.checked = true;
        PolicyDrivers1LicenseSuspendedRevokedYNN.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    if (accidentPrevCourseYN) {
      const value = accidentPrevCourseYN.trim().toLowerCase();

      if (value === "y") {
        PolicyDrivers1AccidentPrevCourseYNY.checked = true;
        PolicyDrivers1AccidentPrevCourseYNY.dispatchEvent(new Event("click", { bubbles: true }));
        PolicyDrivers1AccidentPrevCourseYNY.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (value === "n") {
        PolicyDrivers1AccidentPrevCourseYNN.checked = true;
        PolicyDrivers1AccidentPrevCourseYNN.dispatchEvent(new Event("click", { bubbles: true }));
        PolicyDrivers1AccidentPrevCourseYNN.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (value === "y" && accidentPrevCourseDate) {
        const waitForDateField = () => {
          const dateField = document.querySelector("#PolicyDrivers1AccidentPrevCourseDate");
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
      if (value === "y") {
        PolicyDrivers1SR22FilingYNY.checked = true;
        PolicyDrivers1SR22FilingYNY.dispatchEvent(new Event("click", { bubbles: true }));  
        PolicyDrivers1SR22FilingYNY.dispatchEvent(new Event("change", { bubbles: true }));  
      } else if (value === "n") { 
        PolicyDrivers1SR22FilingYNN.checked = true;
        PolicyDrivers1SR22FilingYNN.dispatchEvent(new Event("click", { bubbles: true }));
        PolicyDrivers1SR22FilingYNN.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (value === "y" && sr22FilingState) {
        const waitForSr22Fields = () => { 
          const SR22FilingYNY = document.querySelector("#PolicyDrivers1SR22FilingYNY");
          const SR22FilingYNN = document.querySelector("#PolicyDrivers1SR22FilingYNN");
          const SR22FilingDate = document.querySelector("#PolicyDrivers1SR22FilingDate");
          const SR22FilingEndDate = document.querySelector("#PolicyDrivers1SR22FilingEndDate");
          const SR22FilingState = document.querySelector("#PolicyDrivers1SR22FilingState");
          const SR22FilingCaseNumber = document.querySelector("#PolicyDrivers1SR22FilingCaseNumber");

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
              if (option.text.trim().toLowerCase() ===  sr22FilingState.trim().toLowerCase()) {
                option.selected = true;
                SR22FilingState.dispatchEvent(new Event("change", { bubbles: true }));
                break;
              }
            }
          }

          if (SR22FilingCaseNumber && sr22FilingCaseNumber) {
            SR22FilingCaseNumber.value = sr22FilingCaseNumber;
            SR22FilingCaseNumber.dispatchEvent(new Event("input", { bubbles: true }));
          }

          if (!SR22FilingState || !SR22FilingCaseNumber) {
            setTimeout(waitForSr22Fields, 100); // try again after 100ms
          }
        };
        waitForSr22Fields();
      }
    }

    if (fr44FilingYN) {
      const value = fr44FilingYN?.trim().toLowerCase();
      if (value === "y") {
        PolicyDrivers1FR44FilingYNY.checked = true;
        PolicyDrivers1FR44FilingYNY.dispatchEvent(new Event("click", { bubbles: true }));  
        PolicyDrivers1FR44FilingYNY.dispatchEvent(new Event("change", { bubbles: true }));  
      } else if (value === "n") { 
        PolicyDrivers1FR44FilingYNN.checked = true;
        PolicyDrivers1FR44FilingYNN.dispatchEvent(new Event("click", { bubbles: true }));
        PolicyDrivers1FR44FilingYNN.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (value === "y" && fr44FilingState) {
        const waitForFr44Fields = () => { 
          const FR44FilingYNY = document.querySelector("#PolicyDrivers1FR44FilingYNY");
          const FR44FilingYNN = document.querySelector("#PolicyDrivers1FR44FilingYNN");
          const FR44FilingDate = document.querySelector("#PolicyDrivers1FR44FilingDate");
          const FR44FilingEndDate = document.querySelector("#PolicyDrivers1FR44FilingEndDate");
          const FR44FilingState = document.querySelector("#PolicyDrivers1FR44FilingState");
          const FR44FilingCaseNumber = document.querySelector("#PolicyDrivers1FR44FilingCaseNumber");

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
              if (option.text.trim().toLowerCase() ===  fr44FilingState.trim().toLowerCase()) {
                option.selected = true;
                FR44FilingState.dispatchEvent(new Event("change", { bubbles: true }));
                break;
              }
            }
          }

          if (FR44FilingCaseNumber && fr44FilingCaseNumber) {
            FR44FilingCaseNumber.value = fr44FilingCaseNumber;
            FR44FilingCaseNumber.dispatchEvent(new Event("input", { bubbles: true }));
          }

          if (!FR44FilingState || !FR44FilingCaseNumber) {
            setTimeout(waitForFr44Fields, 100); // try again after 100ms
          }
        };
        waitForFr44Fields();
      }
    }

}

    


