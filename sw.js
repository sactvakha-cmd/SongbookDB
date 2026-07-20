const CACHE_NAME = 'akha-songbook-pro-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', (event) => {
  // บล็อคไม่ให้ Cache API และการ POST ข้อมูล เพื่อให้ระบบเพลงทำงานถูกต้อง 100%
  if (event.request.method !== 'GET' || event.request.url.includes('workers.dev')) {
    return;
  }

  // Network First Strategy: ให้แอปดึงข้อมูลใหม่ล่าสุดเสมอ (UI ไม่มีทางพัง/ค้าง) 
  // แต่ถ้าออฟไลน์ (ไม่มีเน็ต) ค่อยสลับไปดึงจาก Cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
