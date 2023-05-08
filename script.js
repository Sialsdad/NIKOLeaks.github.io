// Get the visitor count from the server
fetch('/visitor-count')
  .then(response => response.text())
  .then(count => {
    // Display the count on the page
    const countElement = document.createElement('p');
    countElement.textContent = `Visitor count: ${count}`;
    document.body.appendChild(countElement);

    // Send the count to the Discord webhook
    fetch('https://discord.com/api/webhooks/1100524825870602350/f_Dh-j7NvAGSHicdhWWFY6NUWyvEZdLynyksxuKVKIvLMHKityw1HpeUy4vSABSAKD_l', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: `Visitor count: ${count}` })
    });
  });

// Increment the visitor count when the page is loaded
fetch('/increment-count');

// Disable caching of the page to prevent counting reloads
window.addEventListener('load', function() {
  fetch('/disable-caching');
});
