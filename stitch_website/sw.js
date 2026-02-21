const CACHE_NAME = 'accofin-instant-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/about.html',
    '/how_we_work.html',
    '/contact.html',
    '/global_companies.html',
    '/indian_businesses.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
