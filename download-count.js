// Get the download count element
const downloadCount = document.getElementById('download-count');

// Set the initial download count to 0
let count = 0;

// Function to update the download count
function updateDownloadCount() {
  // Increment the download count
  count++;

  // Update the download count element with the new count
  downloadCount.innerText = count;
}

// Attach the updateDownloadCount function to the download link
const downloadLink = document.querySelector('a[href="https://cdn.discordapp.com/attachments/1086827165615652924/1102780724060356658/Project_Eclipse.dll"]');
downloadLink.addEventListener('click', updateDownloadCount);
