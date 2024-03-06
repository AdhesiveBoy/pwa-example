const CACHE_NAME = "static-cache";
const urlsToCache = [ "./index.html", "/favicon.ico", "../src/", "../src/App.jsx", "../src/main.jsx", "../src/index.css","/manifest.json", "../@vite/client", "./@react-refresh"
,"./node_modules/vite/dist/client/env.mjs","/logo192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Event listener for the "fetch" event.
 * It responds to fetch requests by checking the cache first and returning the cached response if available.
 * If the requested resource is not in the cache, it fetches it from the network.
 * @param {Event} event - The "fetch" event object.
 */
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response;

            // if not found in cache, return default offline content (only if this is a navigation request)
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
                return response;
            }


            return fetch(event.request);
        })
    );
});

/**
 * Event listener for the "activate" event.
 * It deletes old caches that are not in the cache whitelist.
 * @param {Event} event - The "activate" event object.
 */
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});

// window.addEventListener('offline', function(e) {
//     // Queue up events for server.
//     console.log("You are offline");
// }, false);