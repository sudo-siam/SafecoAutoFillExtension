chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) return;

  // Case 1: print the PDF
  // if (details.url.includes("CurrentCarrierReportViewer.aspx")) {
  //   chrome.scripting.executeScript({
  //     target: { tabId: details.tabId },
  //     func: () => window.print()
  //   });
  // }

  // if (details.url.includes("CurrentCarrierReportViewer.aspx")) {
  //   chrome.scripting
  //     .executeScript({
  //       target: { tabId: details.tabId },
  //       files: ["html2pdf.bundle.min.js", "report.js"],
  //     })
  //     .then(() => {
  //       chrome.scripting
  //         .insertCSS({
  //           target: { tabId: details.tabId },
  //           files: ["report.css"],
  //         })
  //         .then(() => {
  //           // Create and populate the rock solid layout
  //           chrome.scripting.executeScript({
  //             target: { tabId: details.tabId },
  //             func: () => {
  //               // Create the rock solid container
  //               const rockSolidContainer = document.createElement("div");
  //               rockSolidContainer.id = "rockSolidContainer";
  //               rockSolidContainer.style.cssText = `
  //                       position: fixed;
  //                       top: 0;
  //                       left: 0;
  //                       width: 100%;
  //                       height: 100%;
  //                       background: white;
  //                       z-index: 9999;
  //                       overflow: auto;
  //                       padding: 20px;
  //                   `;

  //               // Add your HTML structure
  //               rockSolidContainer.innerHTML = `
  //                       <div class="report-container" id="rockSolidReport">
  //                           <!-- Will be populated by report-populator.js -->
  //                       </div>
  //                   `;

  //               document.body.appendChild(rockSolidContainer);

  //               // Populate with data and generate PDF
  //               if (typeof populateReportWithData === "function") {
  //                 populateReportWithData();

  //                 // Wait for layout to render, then generate PDF
  //                 setTimeout(() => {
  //                   const rockSolidReport =
  //                     document.getElementById("rockSolidReport");
  //                   if (rockSolidReport) {
  //                     html2pdf()
  //                       .set({
  //                         margin: [10, 10, 10, 10],
  //                         filename: `insurance_report_${new Date().getTime()}.pdf`,
  //                         image: { type: "jpeg", quality: 0.98 },
  //                         html2canvas: {
  //                           scale: 2,
  //                           useCORS: true,
  //                           width: 794,
  //                           windowWidth: 794,
  //                         },
  //                         jsPDF: {
  //                           unit: "mm",
  //                           format: "a4",
  //                           orientation: "portrait",
  //                         },
  //                       })
  //                       .from(rockSolidReport)
  //                       .save()
  //                       .then(() => {
  //                         console.log("Beautiful PDF generated!");
  //                         // Remove the temporary container
  //                         document
  //                           .getElementById("rockSolidContainer")
  //                           ?.remove();
  //                       })
  //                       .catch((error) => {
  //                         console.error("PDF generation failed:", error);
  //                         document
  //                           .getElementById("rockSolidContainer")
  //                           ?.remove();
  //                       });
  //                   }
  //                 }, 10000);
  //               }
  //             },
  //           });
  //         });
  //     });
  // }

  if (details.url.includes("CurrentCarrierReportViewer.aspx")) {
    chrome.scripting
      .executeScript({
        target: { tabId: details.tabId },
        files: ["html2pdf.bundle.min.js"],
      })
      .then(() => {
        // Create and populate the rock solid layout
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            const title = document.querySelector(".bruu-page--title");
            const topContainer = document.querySelector(
              ".bruu-page-container--top"
            );
            const searchRequest = document.querySelector("#tblSearchRequest");
            const searchLocations = document.querySelector(
              "#tblSearchLocations"
            );
            if (!title) return console.error("title not found!");
            if (!topContainer) return console.error("top container not found!");
            if (!searchRequest)
              return console.error("search request not found!");
            if (!searchLocations)
              return console.error("search location not found!");

            const wrapper = document.createElement("div");
            wrapper.append(title);
            wrapper.append(topContainer);
            wrapper.append(searchRequest);
            wrapper.append(searchLocations);

            html2pdf()
              .set({
                margin: [10, 10, 10, 10],
                filename: "report.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: true },
                jsPDF: { unit: "pt", orientation: "portrait" },
              })
              .from(wrapper)
              .save();
          },
        });
      });
  }
});
