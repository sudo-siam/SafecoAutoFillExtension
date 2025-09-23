function populateTestData() {
  const sheetNames = ["Policy Information", "Garaged Locations"];
  const rowCount = 5;

  sheetNames.forEach(sheetName => {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) return;

    const data = sheet.getDataRange().getValues();
    if (data.length === 0) return;

    const headers = data[0];
    sheet.clear();
    sheet.appendRow(headers);

    const testData = [];
    for (let i = 0; i < rowCount; i++) {
      const row = headers.map(header => generateFakeValue(sheetName, header, i));
      testData.push(row);
    }

    sheet.getRange(2, 1, testData.length, headers.length).setValues(testData);
  });
}

function generateFakeValue(sheetName, header, rowIndex) {

  const firstNames = ["John", "Jane", "Alex", "Emma", "Chris", "Sophia", "Liam", "Olivia"];
  const middleNames = ["Alex", "Bar", "Carlos", "Dana", "Emily", "", "", ""];
  const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Wilson", "Clark", "Walker"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const streets = ["Main St", "Oak Ave", "Pine Rd", "Cedar Blvd", "Maple Dr"];
  const yesNo = ["Y", "N"];
  const locations = [
      { ratingState: "Alabama", city: "Clanton", state: "Alabama", zip: "35045", country: "Chilton"  },
      { ratingState: "Florida", city: "Tampa", state: "Florida", zip: "33602", country: "Hillsborough" },
      { ratingState: "California", city: "Moreno Valley", state: "California", zip: "30303", country: "Riverside" },
  ];
  const reasonsForPolicy = [
                              "New Auto Customer", 
                              "Rewrite of Policy Lapsed > 60 Days", 
                              "Move To Separate Household",
                              "Move To New State", 
                              "Loyalty Rewrite"
                            ];
  const quoteDescriptions = [
                              "Standard Auto Policy", 
                              "Comprehensive Coverage", 
                              "Liability Only", 
                              "Full Coverage"
                            ];

  const priorityCodes = ["A1", "B2", "C3", "D4", "E5"];

  // Random data
  const firstName = randomItem(firstNames);
  const middleName = randomItem(middleNames);
  const lastName = randomItem(lastNames);
  const maritalStatus = randomItem(maritalStatuses);
  const birthDate = randomDate(new Date(1960,0,1), new Date(2005,0,1));
  const phone = randomPhoneNumber();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${rowIndex+1}@example.com`;
  const address = `${Math.floor(Math.random()*9999)+1} ${randomItem(streets)}`;
  const address2 = `Apt ${Math.floor(Math.random()*50)+1}`;
  const loc = randomItem(locations);

  // Switch for Policy Information
  if(sheetName === "Policy Information") {
    switch(header) {
      case "ID": return rowIndex + 1;
      case "First Name": return firstName;
      case "Middle Name": return middleName;
      case "Last Name": return lastName;
      case "Marital Status": return maritalStatus;
      case "Birth Date": return birthDate;
      case "Primary Phone Number": return phone;
      case "Email Address": return email;
      case "Mailing Address": return address;
      case "Address Line 2": return address2;
      case "ZIP Code": return loc.zip;
      case "City": return loc.city;
      case "State": return loc.ratingState;
      case "Override USPS Address Edit?":
      case "All vehicles garaged at mailing address?":
      case "Any reportable incidents?":
      case "Additional Interests?":
      case "Named Non-Owner":
      case "Advanced Multiple Car Discount":
      case "Any vehicles used for delivery?": return randomItem(yesNo);
      case "Rating State": return loc.ratingState;
      case "Agent Number": return `0${5}-${5232 + rowIndex}`;
      case "Producer/Other ID": return `PR${2000 + rowIndex}`;
      case "Quote Date": return getDatePlusDays(0);
      case "Effective Date": return getDatePlusDays(6);
      case "Agency ID for Customer": return `AGC${3000 + rowIndex}`;
      case "Quote Description": return randomItem(quoteDescriptions);
      case "Reason for Policy": return randomItem(reasonsForPolicy);
      case "Priority Code": return randomItem(priorityCodes);
      default: return "";
    }
  }

  // Switch for Garaged Locations
  if(sheetName === "Garaged Locations") {
    switch(header) {
      case "ID": return rowIndex + 1;
      case "Address Line 1": return address;
      case "Address Line 2": return address2;
      case "ZIP Code": return loc.zip;
      case "City": return loc.city;
      case "County": return loc.state;
      default: return "";
    }
  }

  return "";
}

// --- Helpers ---
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  if(!end) {
    return new Date(start.getTime() + Math.random() * (start.getTime()));
  } else {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}

function getDatePlusDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  return `${mm}/${dd}/${yy}`;
}

function randomPhoneNumber() {
  const area = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `(${area})${prefix}-${line}`;
}