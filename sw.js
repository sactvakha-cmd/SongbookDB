const CACHE_NAME = 'akha-songbook-pro-v57';

// รายชื่อไฟล์ที่ 'ต้อง' แคชเพื่อให้แอนดรอยด์ยอมรับการติดตั้ง
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // บังคับให้ SW ตัวใหม่ทำงานทันที
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // ดึงไฟล์สำคัญมาเก็บไว้ทันทีตอนติดตั้ง
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        // ล้าง Cache ตัวเก่าทิ้ง เพื่อกันบั๊ก
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    )).then(() => self.clients.claim()) // บังคับคุมทุกหน้าต่างที่เปิดอยู่
  );
});

self.addEventListener('fetch', (event) => {
  // ไม่ยุ่งกับ API Request
  if (event.request.method !== 'GET' || event.request.url.includes('workers.dev')) {
    return;
  }

  // Network First Strategy: ให้แอปดึงข้อมูลใหม่ล่าสุดเสมอ 
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
