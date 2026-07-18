const CACHE_NAME = 'akha-songbook-v2';

// เก็บแคชเฉพาะไฟล์ในเว็บเราเท่านั้น (เอาพวกฟอนต์ Google ออก ป้องกัน Safari Error)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // บังคับให้ Service Worker ตัวใหม่ทำงานทันที ไม่ต้องรอ
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  // ควบคุมหน้าเว็บทั้งหมดทันที
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // ปล่อยผ่าน API และ Request ที่ไม่ใช่โหมด GET
  if (event.request.method !== 'GET' || event.request.url.includes('workers.dev')) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // 1. พยายามดึงข้อมูลจากอินเทอร์เน็ตก่อนเสมอ (แก้ปัญหาหน้าเว็บเก่าค้าง และปัญหา Redirect)
        // บังคับ redirect: 'follow' เพื่อให้ Safari ไม่ขึ้น Error
        const networkResponse = await fetch(event.request, { redirect: 'follow' });
        
        // 2. ถ้าดึงสำเร็จ และเป็นไฟล์ในโดเมนเรา ให้อัปเดตแคชเงียบๆ
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        // 3. ถ้าไม่มีเน็ต (ดึงพัง) ค่อยกลับไปหาของในแคช
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // 4. ถ้าเป็นไฟล์ HTML แล้วหาในแคชไม่เจอจริงๆ ให้โยนหน้า index.html กลับไป
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        
        throw error;
      }
    })()
  );
});
