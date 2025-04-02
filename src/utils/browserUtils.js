// Browser compatibility check
function checkBrowserCompatibility() {
  // Define minimum browser versions required
  const minBrowsers = {
    chrome: 70,
    firefox: 68,
    safari: 12,
    edge: 79, // Chromium-based Edge
    opera: 60,
  };

  // Function to check if the browser is supported
  function isSupported() {
    const ua = navigator.userAgent;
    let browserName = null;
    let browserVersion = null;

    // Chrome
    if (/Chrome/.test(ua) && !/Chromium|Edge|Edg|OPR|Opera/.test(ua)) {
      browserName = "chrome";
      browserVersion = parseInt(ua.match(/Chrome\/(\d+)/)[1], 10);
    }
    // Firefox
    else if (/Firefox/.test(ua)) {
      browserName = "firefox";
      browserVersion = parseInt(ua.match(/Firefox\/(\d+)/)[1], 10);
    }
    // Safari
    else if (
      /Safari/.test(ua) &&
      !/Chrome|Chromium|Edge|Edg|OPR|Opera/.test(ua)
    ) {
      browserName = "safari";
      browserVersion = parseInt(ua.match(/Version\/(\d+)/)[1], 10);
    }
    // Edge (Chromium)
    else if (/Edg|Edge/.test(ua)) {
      browserName = "edge";
      browserVersion = parseInt(
        ua.match(/Edg\/(\d+)|Edge\/(\d+)/)[1] ||
          ua.match(/Edg\/(\d+)|Edge\/(\d+)/)[2],
        10
      );
    }
    // Opera
    else if (/OPR|Opera/.test(ua)) {
      browserName = "opera";
      browserVersion = parseInt(
        ua.match(/OPR\/(\d+)|Opera\/(\d+)/)[1] ||
          ua.match(/OPR\/(\d+)|Opera\/(\d+)/)[2],
        10
      );
    }

    // Check if browser is supported
    if (browserName && browserVersion) {
      return browserVersion >= minBrowsers[browserName];
    }

    // For unknown browsers, assume not supported
    return false;
  }

  // If browser is not supported, show a warning
  if (!isSupported()) {
    const warningDiv = document.createElement("div");
    warningDiv.style.cssText =
      "position:fixed;top:0;left:0;right:0;background:#f44336;color:white;text-align:center;padding:10px;z-index:9999;font-family:sans-serif;";
    warningDiv.innerHTML = `
      <p>Your browser may not support all features of this application. 
      For the best experience, please use a recent version of Chrome, Firefox, Safari, or Edge.</p>
      <button style="background:white;color:#f44336;border:none;padding:5px 10px;margin-top:5px;cursor:pointer;" onclick="this.parentNode.style.display='none'">Dismiss</button>
    `;
    document.body.appendChild(warningDiv);
  }
}

// Check browser compatibility once DOM is loaded
document.addEventListener("DOMContentLoaded", checkBrowserCompatibility);
