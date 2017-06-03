// borrowed from
// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-dev-utils/noopServiceWorkerMiddleware.js

// A simple, no-op service worker that takes immediate control.
function noopServiceWorker() {
  return (req, res, next) => {
    if (req.url === '/service-worker.js') {
      res.setHeader('Content-Type', 'text/javascript');
      res.send(`
        self.addEventListener('install', () => {
          // Skip over the "waiting" lifecycle state, to ensure that our
          // new service worker is activated immediately, even if there's
          // another tab open controlled by our older service worker code.
          self.skipWaiting();
        });


        self.addEventListener('activate', () => {
          // Optional: Get a list of all the current open windows/tabs under
          // our service worker's control, and force them to reload.
          // This can "unbreak" any open windows/tabs as soon as the new
          // service worker activates, rather than users having to manually reload.
          self.clients.matchAll({type: 'window'}).then(windowClients => {
            windowClients.forEach(windowClient => {
              windowClient.navigate(windowClient.url);
            });
          });
        });
        `
      );
    } else {
      next();
    }
  }
}

module.exports = noopServiceWorker;
