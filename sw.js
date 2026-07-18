const CACHE_NAME = 'akha-songbook-safe-v1';

// แคชเฉพาะไฟล์โครงสร้างหลักในโดเมนเราเท่านั้น
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// 1. สั่งให้ Service Worker ตัวใหม่ทำงานทันทีที่ติดตั้งเสร็จ
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// 2. ล้างแคชเวอร์ชันเก่าที่เคยทำให้เกิด Error ทิ้งให้หมดแบบอัตโนมัติ
self.addEventListener('activate', event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. ดักจับการโหลดไฟล์ (หัวใจสำคัญที่ป้องกัน Error)
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // กฎเหล็ก: ถ้าเป็นไฟล์จากโดเมนอื่น (เช่น Google, Cloudflare) หรือ API 
  // ให้ "ข้ามการทำงานของ SW" ไปเลย ปล่อยให้เบราว์เซอร์จัดการเอง 
  // (แก้ปัญหา Safari Redirects ขาด 100%)
  if (requestUrl.origin !== self.location.origin || event.request.method !== 'GET') {
    return;
  }

  // สำหรับไฟล์ในเว็บเรา (HTML, CSS, JS) ให้ใช้โหมด "ดึงเน็ตก่อนเสมอ (Network First)"
  event.respondWith(
    fetch(event.request, { redirect: 'follow' })
      .then(networkResponse => {
        // ถ้าเน็ตใช้งานได้ปกติ ให้บันทึกไฟล์ล่าสุดลงแคชเงียบๆ
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // ถ้าไม่มีเน็ต (ออฟไลน์) ถึงจะเปิดไฟล์สำรองจากแคชมาให้ใช้งาน
        return caches.match(event.request).then(cachedResponse => {
          return cachedResponse || caches.match('./index.html');
        });
      })
  );
});
