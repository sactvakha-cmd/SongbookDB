self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // ว่างไว้ ปล่อยให้เบราว์เซอร์จัดการเอง
});
