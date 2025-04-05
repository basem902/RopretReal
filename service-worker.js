const CACHE_NAME = 'rawabet-tech-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/dark-mode.css',
  '/js/main.js',
  '/js/dark-mode.js',
  '/images/logo.png',
  '/pages/developers.html',
  '/pages/marketers.html',
  '/pages/clients.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // لا نخزن استجابات API أو استجابات خاطئة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // نسخ الاستجابة لأن body يمكن استخدامه مرة واحدة فقط
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
