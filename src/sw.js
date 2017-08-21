importScripts('workbox-sw.prod.js');

self.addEventListener('install', function () {
    console.log('installed');
    self.skipWaiting();
});
self.addEventListener('activate', function () {
    console.log('activated');
    self.clients.claim()
});
// Create Workbox service worker instance
const workboxSW = new self.WorkboxSW({
    clientsClaim: true
});

// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([]);


// // cache very first page by sw
// workboxSW.router.registerRoute(
//     '/',
//     workboxSW.strategies.staleWhileRevalidate()
// );

// Use a stale-while-revalidate strategy for all API requests.
workboxSW.router.registerRoute(
  new RegExp('^https://api.github.com/search/'),
  workboxSW.strategies.staleWhileRevalidate({cacheName: 'github-api'})
);
// Use a cache-first strategy for the images, all of which have unique URLs.
workboxSW.router.registerRoute(
    new RegExp('^https://\\w+\\.githubusercontent\\.com/u'),
    workboxSW.strategies.cacheFirst({
        cacheName: 'images',
        cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60,
        },
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);

// workboxSW.router.registerRoute(
//     new RegExp('^https://api.github.com/search/repositories?q=stars:%3E1+language:'),
//     workboxSW.strategies.cacheFirst({
//         "cacheName": "search-cache",
//         "cacheExpiration": {
//             "maxEnteries": 10,
//             "maxAgeSeconds": 300
//         }
//     }));

workboxSW.router.registerNavigationRoute('/index.html');