const version = 'v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache
        .addAll([
          '/',
          '/img/',
          '/js/index.js',
          '/css/global.css',
          '/css/index.css',
          '/css/category.css',
          '/css/flag.css'
        ])
        .catch(() => {}); // Silently catch the error from `/img/`
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Bypass cache when fetching a random flag (but not the icon!)
  // This will make the random route unavailable when offline ...
  let url = event.request.url;
  if (url.includes('/random') && !url.includes('.png')) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        return response.clone();
      })
    );
  } else {
    // For any other ressource, look up cache first!
    event.respondWith(
      caches.match(event.request).then(function(resp) {
        return (
          resp ||
          fetch(event.request).then(function(response) {
            caches.open(version).then(function(cache) {
              cache.put(event.request, response.clone());
            });
            return response.clone();
          })
        );
      })
    );
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(key => {
          if (key !== version) return caches.delete(key);
        })
      );
    })
  );
});
