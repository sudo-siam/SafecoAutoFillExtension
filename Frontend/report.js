// report-populator.js
function populateReportWithData() {
    try {
        // Extract data from the original page
        const reportData = extractDataFromOriginalPage();
        console.log('Extracted data:', reportData);
        
        // Populate the rock solid template
        populateRockSolidTemplate(reportData);
        
    } catch (error) {
        console.error('Error populating report:', error);
    }
}

function extractDataFromOriginalPage() {
    // Extract reference number and date
    const referenceNumber = document.querySelector('.bruu-page-container--top td:first-child')?.textContent?.replace('Reference #:', '').trim() || '';
    const reportDate = document.querySelector('.bruu-page-container--top td:last-child')?.textContent?.replace('Report Date:', '').trim() || '';
    
    // Extract search address
    const searchAddress = document.querySelector('#tblSearchLocations span')?.textContent?.trim() || '';
    
    // Extract subjects
    const subjects = [];
    const subjectRows = document.querySelectorAll('#tblSearchSubjects tr:not(:first-child)');
    subjectRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 6) {
            subjects.push({
                subjectNumber: cells[0].textContent.trim(),
                name: cells[1].textContent.trim(),
                dob: cells[2].textContent.trim(),
                gender: cells[3].textContent.trim(),
                licenseNumber: cells[4].textContent.trim(),
                licenseState: cells[5].textContent.trim()
            });
        }
    });
    
    // Extract policies
    const policies = [];
    for (let i = 1; i <= 20; i++) {
        const policyHeader = document.querySelector(`#PolicyHeader${i}`);
        if (!policyHeader) continue;
        
        const policyText = policyHeader.querySelector('td')?.textContent?.trim() || '';
        const noteMatch = policyText.match(/\*\*(.*)\*\*/);
        const note = noteMatch ? noteMatch[1].trim() : '';
        
        const policyContainer = document.querySelector(`#PolicyContainer${i}`);
        if (!policyContainer) continue;
        
        // Extract policy details
        const carrierName = policyContainer.querySelector(`#CarrierName${i}`)?.textContent?.trim() || '';
        const policyType = policyContainer.querySelector(`#PolicyType${i}`)?.textContent?.trim() || '';
        const policyStatus = policyContainer.querySelector(`#PolicyStatus${i}`)?.textContent?.trim() || '';
        
        // Extract drivers
        const drivers = [];
        for (let j = 1; j <= 10; j++) {
            const driverName = policyContainer.querySelector(`#Policy${i}DriverName${j}`);
            const driverStatus = policyContainer.querySelector(`#Policy${i}DriverStatus${j}`);
            if (driverName && driverStatus) {
                drivers.push({
                    name: driverName.textContent.trim(),
                    status: driverStatus.textContent.trim()
                });
            }
        }
        
        // Extract vehicles
        const vehicles = [];
        for (let j = 1; j <= 10; j++) {
            const vin = policyContainer.querySelector(`#Policy${i}VIN${j}`);
            const year = policyContainer.querySelector(`#Policy${i}Year${j}`);
            const make = policyContainer.querySelector(`#Policy${i}Make${j}`);
            const type = policyContainer.querySelector(`#Policy${i}Type${j}`);
            const coverage = policyContainer.querySelector(`#Policy${i}Coverage${j}`);
            const coverageLimit = policyContainer.querySelector(`#Policy${i}CoverageLimit${j}`);
            
            if (vin) {
                vehicles.push({
                    vin: vin.textContent.trim(),
                    year: year?.textContent?.trim() || '',
                    make: make?.textContent?.trim() || '',
                    type: type?.textContent?.trim() || '',
                    coverage: coverage?.textContent?.trim() || '',
                    coverageLimit: coverageLimit?.textContent?.trim() || ''
                });
            }
        }
        
        policies.push({
            policyNumber: i,
            note,
            carrierName,
            policyType,
            policyStatus,
            drivers,
            vehicles
        });
    }
    
    return {
        referenceNumber,
        reportDate,
        searchAddress,
        subjects,
        policies
    };
}

function populateRockSolidTemplate(data) {
    const container = document.getElementById('rockSolidReport');
    
    container.innerHTML = `
        <!-- Report Header -->
        <div class="page-title">
            <h1>Prior Insurance Report</h1>
        </div>
        
        <hr style="border: 1px solid #b59e8c; height: 2px; margin: 0;">
        
        <div class="report-header">
            <div class="bold">Reference #: <span id="referenceNumber">${data.referenceNumber}</span></div>
            <div class="bold">Report Date: <span id="reportDate">${data.reportDate}</span></div>
        </div>
        
        <hr style="border: 1px solid #b59e8c; height: 2px; margin: 0;">
        
        <!-- SEARCH REQUEST Section -->
        <div class="section-header">SEARCH REQUEST</div>
        
        <div style="padding: 10px;">
            <div class="bold">Address: <span id="searchAddress">${data.searchAddress}</span></div>
            
            <br>
            
            <!-- Subjects Table -->
            <table class="data-table" id="subjectsTable">
                <thead>
                    <tr>
                        <th width="13%" align="left">Subject #</th>
                        <th width="25%" align="left">Name</th>
                        <th width="14%" align="left">DOB</th>
                        <th width="9%" align="left">Gender</th>
                        <th width="19%" align="left">License Number</th>
                        <th width="20%" align="left">License State</th>
                    </tr>
                </thead>
                <tbody id="subjectsBody">
                    ${data.subjects.map(subject => `
                        <tr>
                            <td>${subject.subjectNumber}</td>
                            <td>${subject.name}</td>
                            <td>${subject.dob}</td>
                            <td>${subject.gender}</td>
                            <td>${subject.licenseNumber}</td>
                            <td>${subject.licenseState}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <!-- SEARCH RESULTS Section -->
        <div class="section-header">SEARCH RESULTS</div>
        
        <div style="padding: 10px;" id="policiesContainer">
            ${data.policies.map(policy => `
                <div class="policy-header">
                    Policy ${policy.policyNumber}
                    ${policy.note ? `<span class="policy-note" style="margin-left: 10px; font-style: italic;">${policy.note}</span>` : ''}
                </div>
                
                <div class="policy-container">
                    <div class="policy-info">
                        <table class="policy-info-table">
                            <tr>
                                <td width="15%" class="bold">Carrier Name</td>
                                <td width="54%">${policy.carrierName}</td>
                                <td width="11%" class="bold">Policy Type</td>
                                <td width="15%">${policy.policyType}</td>
                            </tr>
                            <tr>
                                <td class="bold">Policy Status</td>
                                <td>${policy.policyStatus}</td>
                                <td colspan="2" class="empty-cell"></td>
                            </tr>
                        </table>
                        
                        <br>
                        
                        <!-- Drivers Section -->
                        <div class="subsection-header">Drivers</div>
                        <table class="data-table drivers-table">
                            <thead>
                                <tr>
                                    <th width="34%" style="background: #F2EDE6" align="left">Last, First Name</th>
                                    <th width="66%" style="background: #F2EDE6" align="left">Driver Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${policy.drivers.map((driver, index) => `
                                    <tr class="${index % 2 === 0 ? '' : 'alt-row'}">
                                        <td>${driver.name}</td>
                                        <td>${driver.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <br>
                        
                        <!-- Vehicles Section -->
                        <div class="subsection-header">Insured Vehicles</div>
                        <table class="data-table vehicles-table">
                            <thead>
                                <tr>
                                    <th width="20%" style="background: #F2EDE6" align="left">VIN</th>
                                    <th width="7%" style="background: #F2EDE6" align="left">Year</th>
                                    <th width="9%" style="background: #F2EDE6" align="left">Make</th>
                                    <th width="18%" style="background: #F2EDE6" align="left">Type</th>
                                    <th width="22%" style="background: #F2EDE6" align="left">Coverages</th>
                                    <th width="24%" style="background: #F2EDE6" align="left">Limits</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${policy.vehicles.map((vehicle, index) => `
                                    <tr class="${index % 2 === 0 ? '' : 'alt-row'}">
                                        <td>${vehicle.vin}</td>
                                        <td>${vehicle.year}</td>
                                        <td>${vehicle.make}</td>
                                        <td>${vehicle.type}</td>
                                        <td>${vehicle.coverage}</td>
                                        <td>${vehicle.coverageLimit}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
            `).join('')}
        </div>
    `;
}

// Auto-populate when loaded
document.addEventListener('DOMContentLoaded', populateReportWithData);