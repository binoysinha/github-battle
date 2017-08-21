const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
      .then(function (registration) {
        registration.onupdatefound = function () {
          if (navigator.serviceWorker.controller) {
            var installingWorker = registration.installing;
            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  break;
                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');
                default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function (e) {
        console.error('Error during service worker registration:', e);
      });
  } else {
    console.log('service worker is not supported');
  }
}

export default registerServiceWorker;