const CACHE_NAME = "bakery-app-v1";
const API_CACHE = "api-cache-v1";

self.addEventListener("install", async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.add("/index.html");
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // API so'rovlari uchun
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(API_CACHE).then((cache) => {
        return fetch(event.request)
          .then((networkResponse) => {
            // Online bo'lganda yangi ma'lumotlarni keshlash
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch(() => {
            // Offline bo'lganda keshdan olish
            return cache.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                // Keshdan olishdan oldin timestamp tekshirish
                const cachedData = cachedResponse.clone().json();
                const cacheTime = new Date(
                  cachedResponse.headers.get("date")
                ).getTime();
                const now = new Date().getTime();

                // Agar kesh 5 daqiqadan eski bo'lsa, null qaytarish
                if (now - cacheTime > 5 * 60 * 1000) {
                  return null;
                }
                return cachedResponse;
              }
              return null;
            });
          });
      })
    );
    return;
  }

  // Static fayllar uchun
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => name !== CACHE_NAME && caches.delete(name))
  );
  self.clients.claim();
});

self.addEventListener("push", (event) => {
  const { title, ...options } = event.data ? event.data.json() : {};
  self.registration.showNotification(title || "New Notification", options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/notification";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client)
          return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});

// API keshini tozalash (har 5 daqiqada)
setInterval(() => {
  caches.open(API_CACHE).then((cache) => {
    cache.keys().then((requests) => {
      requests.forEach((request) => {
        cache.delete(request);
      });
    });
  });
}, 5 * 60 * 1000);
