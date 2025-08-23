// public/sw.js

const CACHE_NAME = 'seasons-taiwanese-eatery-cache-v2'; // IMPORTANT: Increment this version to trigger the update.

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/web-app-manifest-192x192.png',
    '/web-app-manifest-512x512.png',
];

// 'install' event: Cache assets and force the new service worker to activate immediately.
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Force the waiting service worker to become the active service worker.
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Failed to cache assets during install:', error);
            })
    );
});

// 'activate' event: Clean up old caches and refresh all clients.
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                // Delete all caches that are not the current version.
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
            .then(() => {
                // Take immediate control of all open clients.
                return self.clients.claim();
            })
            .then(() => self.clients.matchAll({ type: 'window' }))
            .then((clients) => {
                // Refresh all controlled clients to ensure they use the new service worker.
                clients.forEach((client) => {
                    console.log(`[Service Worker] Refreshing client: ${client.url}`);
                    client.navigate(client.url);
                });
            })
    );
});


// 'fetch' event: Serve from cache, fall back to network, and cache new requests.
self.addEventListener('fetch', (event) => {
    // We only handle GET requests.
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // If a cached response is found, return it.
            if (cachedResponse) {
                console.log(`[Service Worker] Serving from cache: ${event.request.url}`);
                return cachedResponse;
            }

            // If not in cache, fetch from the network.
            return fetch(event.request).then((response) => {
                console.log(`[Service Worker] Fetching from network: ${event.request.url}`);

                // Check if we received a valid response.
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response because a response stream can only be consumed once.
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                    console.log(`[Service Worker] Cached new resource: ${event.request.url}`);
                });

                return response;
            }).catch((error) => {
                console.error(`[Service Worker] Fetch failed for ${event.request.url}:`, error);
                // Optional: Return a fallback page for offline users.
                // return caches.match('/offline.html');
            });
        })
    );
});

// 'push' event: Handle incoming push notifications.
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received.');
    const data = event.data ? event.data.json() : {};

    const title = data.title || 'New Update from Seasons Taiwanese Eatery!';
    const options = {
        body: data.body || 'Check out our latest news and delicious dishes!',
        icon: data.icon || '/web-app-manifest-192x192.png',
        badge: data.badge || '/web-app-manifest-192x192.png',
        data: {
            url: data.url || '/'
        },
        vibrate: [200, 100, 200],
        actions: [
            { action: 'explore', title: 'Explore' },
            { action: 'close', title: 'Close' }
        ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// 'notificationclick' event: Handle clicks on push notifications.
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked.');
    event.notification.close();

    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.openWindow(urlToOpen).then((windowClient) => {
            if (windowClient) {
                windowClient.focus();
            }
        })
    );
});