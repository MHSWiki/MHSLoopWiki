
// This script intercepts the browser's default install prompt
// and saves it for when the user clicks our custom button.

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
  // Show the install button/notice
  const installUI = document.getElementById('pwa-install-container');
  if (installUI) {
    installUI.style.display = 'block';
  }
});

window.addEventListener('appinstalled', () => {
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Hide the install UI
  const installUI = document.getElementById('pwa-install-container');
  if (installUI) {
    installUI.style.display = 'none';
  }
  console.log('PWA was installed');
});

// Function to trigger the install
async function installPWA() {
  if (!deferredPrompt) {
    return;
  }
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null;
}

// Attach to button if it exists
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'pwa-install-button') {
    installPWA();
  }
});
