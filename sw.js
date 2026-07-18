const CACHE_NAME = 'songbook-cache-v4';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// ติดตั้ง Service Worker และเซฟไฟล์ลงเครื่อง
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ดึงข้อมูลมาแสดงผล
self.addEventListener('fetch', event => {
  // ยกเว้นไม่ให้แคชการเรียก API จาก Cloudflare Worker (เพื่อให้ข้อมูลเพลงอัปเดตเสมอ)
  if (event.request.url.includes('workers.dev')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(response => {
      // ถ้ามีไฟล์ในเครื่องให้ใช้ของในเครื่อง ถ้าไม่มีให้โหลดจากเน็ต
      return response || fetch(event.request);
    })
  );
});
