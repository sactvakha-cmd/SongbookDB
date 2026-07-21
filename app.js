const API_URL = "https://akhasongbook-api.sactvakha.workers.dev"; 

async function fetchAPI(action, params = {}) {
  const payload = { action: action, ...params };
  try {
    const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(payload) });
    return await response.json();
  } catch (error) { throw error; }
}

const i18n = {
  th: { app_title: "คลังเพลงคริสเตียนอาข่า", search_placeholder: "ค้นหาด้วย เลข หรือ ชื่อเพลง...", manage_text: "ดูและจัดการ", total_songs: "เพลงทั้งหมดในคลัง", group_songs: "กลุ่มเพลง", song_count_label: "จำนวนเพลง:", song_unit: "เพลง", nav_home: "หน้าแรก", nav_profile: "โปรไฟล์", cat_life: "เพลงชีวิตคริสเตียนอาข่า", cat_gen: "เพลงคริสเตียนทั่วไป", cat_xmas: "เพลงคริสต์มาส", cat_sad: "เพลงไว้อาลัย", cat_wed: "เพลงงานมงคลสมรส", cat_praise: "เพลงสรรเสริญ", cat_worship: "เพลงนมัสการ", cat_other: "เพลงอื่นๆ", nav_cat_life: "อาข่า", nav_cat_gen: "ทั่วไป", nav_cat_xmas: "คริสต์มาส", nav_cat_sad: "ไว้อาลัย", nav_cat_wed: "มงคลสมรส", nav_cat_praise: "สรรเสริญ", nav_cat_worship: "นมัสการ", nav_cat_other: "อื่นๆ" },
  an: { app_title: "Aqkaq kalizaq DawrCar deuq.", search_placeholder: "Bof-awr pov-eu...", manage_text: "Haw-awr lavsav-eu", total_songs: "Dawqcar dawqtawvluf", group_songs: "Dawqcawr armaf", song_count_label: "Dawqcar:", song_unit: "hm", nav_home: "Imqhawq", nav_profile: "Profile", cat_life: "Aqkaq kalizaq Car-eu Sanqbof", cat_gen: "Aqkaq kalizaq cardawq nuideuq.", cat_xmas: "Kirsarmax DawqCar", cat_sad: "Shirbui-anr car-eu Dawqcar", cat_wed: "Oermr barngae Car-eu Dawqcar", cat_praise: "Jaceuq-euu dawqcar", cat_worship: "Uqduq tanq-eu DawqCar", cat_other: "Dawqcar Nuideuq.", nav_cat_life: "Sanqbof", nav_cat_gen: "Nuideuq.", nav_cat_xmas: "Kirsarmax", nav_cat_sad: "Shirbui", nav_cat_wed: "Oermr", nav_cat_praise: "Jaceuq", nav_cat_worship: "Uqduq", nav_cat_other: "Nuideuq." },
  ao: { app_title: "Aˬkaˬ kalizaˬ Caˇdawˬ", search_placeholder: "Bof-awˇ poˆ-awˬ...", manage_text: "Haw-awˇ Laˆsaˆ-eu", total_songs: "Dawˬcaˇ Dawˬtawˆluꞈ", group_songs: "Dawˬcaˇ aˇmaꞈ", song_count_label: "Dawˬcaˇ:", song_unit: "hm", nav_home: "Imqhawq", nav_profile: "Profile", cat_life: "Aˬkaˬ kalizaˬ Caˇ-eu Sahˬboꞈ", cat_gen: "Aˬkaˬ kalizaˬ Caˇdawˬ Nuideuˬ", cat_xmas: "Kiˇsaˇmaˇ Dawˬcaˇ", cat_sad: "Shiˇbui", cat_wed: "Oeˇmˇ baˇgaˇ Caˇ-eu dawˬcaˇ", cat_praise: "Jaceuˬ-eu Dawˬcaˇ", cat_worship: "Uˬduˬ tahˬ-eu Dawˬcaˇ", cat_other: "Dawˬcaˇ Nuideuˬ", nav_cat_life: "Sahˬboꞈ", nav_cat_gen: "Nuideuˬ", nav_cat_xmas: "Kiˇsaˇmaˇ", nav_cat_sad: "Shiˇbui", nav_cat_wed: "Oeˇmˇ", nav_cat_praise: "Jaceuˬ", nav_cat_worship: "Uˬduˬ", nav_cat_other: "Nuideuˬ" }
};

let appLang = 'th'; 
let allSongs = [];
let currentCategory = ""; let currentSong = null; 
let userPhone = ""; let userExpiry = "";
let pendingSlipBase64 = "";
let isRegisteringNew = true;

const baseCategories = [
  { id: 'เพลงชีวิตคริสเตียนอาข่า', i18n_cat: 'cat_life', i18n_nav: 'nav_cat_life', icon: 'fa-book-bible', bg: 'bg-g1' },
  { id: 'เพลงคริสเตียนทั่วไป', i18n_cat: 'cat_gen', i18n_nav: 'nav_cat_gen', icon: 'fa-music', bg: 'bg-g2' },
  { id: 'เพลงคริสต์มาส', i18n_cat: 'cat_xmas', i18n_nav: 'nav_cat_xmas', icon: 'fa-tree', bg: 'bg-g5' },
  { id: 'เพลงไว้อาลัย', i18n_cat: 'cat_sad', i18n_nav: 'nav_cat_sad', icon: 'fa-dove', bg: 'bg-g8' },
  { id: 'เพลงงานมงคลสมรส', i18n_cat: 'cat_wed', i18n_nav: 'nav_cat_wed', icon: 'fa-rings-wedding', bg: 'bg-g4' },
  { id: 'เพลงสรรเสริญ', i18n_cat: 'cat_praise', i18n_nav: 'nav_cat_praise', icon: 'fa-hands-praying', bg: 'bg-g3' },
  { id: 'เพลงนมัสการ', i18n_cat: 'cat_worship', i18n_nav: 'nav_cat_worship', icon: 'fa-guitar', bg: 'bg-g6' },
  { id: 'เพลงอื่นๆ', i18n_cat: 'cat_other', i18n_nav: 'nav_cat_other', icon: 'fa-icons', bg: 'bg-g7' }
];

window.onload = () => {
  switchAuthTab('login');
  const savedLang = localStorage.getItem('app_lang'); if(savedLang) appLang = savedLang; setAppLanguage(appLang, false); 
  
  const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if(savedUser && savedUser.phone && savedUser.pin) {
    userPhone = savedUser.phone; document.getElementById('profile-phone').innerText = userPhone; document.getElementById('profile-expiry').innerText = "กำลังซิงค์...";
    document.getElementById('loader').classList.remove('hidden'); document.getElementById('view-auth').classList.add('hidden');
    authenticateUser(savedUser.phone, savedUser.pin, null, true);
  } else {
    document.getElementById('loader').classList.add('hidden'); document.getElementById('view-auth').classList.remove('hidden');
  }
};

function setAppLanguage(lang, reRender = true) {
  appLang = lang; localStorage.setItem('app_lang', lang);
  document.getElementById('btn-lang-th').classList.remove('active'); document.getElementById('btn-lang-an').classList.remove('active'); document.getElementById('btn-lang-ao').classList.remove('active'); document.getElementById('btn-lang-'+lang).classList.add('active');
  document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if(i18n[lang][key]) { if(el.tagName === 'INPUT' && el.hasAttribute('placeholder')) { el.placeholder = i18n[lang][key]; } else { el.innerHTML = i18n[lang][key]; } } });
  if(reRender && allSongs.length > 0) {
    renderDashboard(); updateBottomNav(currentCategory ? 'category' : 'dashboard');
    if(currentCategory) { const catConf = baseCategories.find(c => c.id === currentCategory); if(catConf) document.getElementById('cat-title').innerText = i18n[appLang][catConf.i18n_cat]; else document.getElementById('cat-title').innerText = i18n[appLang].total_songs; }
  }
}

function switchAuthTab(tab) {
  document.getElementById('tab-login').classList.remove('active'); document.getElementById('tab-register').classList.remove('active'); document.getElementById('tab-'+tab).classList.add('active');
  let html = "";
  if(tab === 'login') {
    html = `
      <div class="search-container"><i class="fa-solid fa-phone"></i><input type="tel" id="auth-phone" placeholder="เบอร์โทรศัพท์ (ใส่ 0 นำหน้า)" maxlength="10"></div>
      <div class="search-container"><i class="fa-solid fa-lock"></i><input type="password" id="auth-pin" placeholder="รหัสผ่าน PIN" maxlength="6"></div>
      <button class="btn-primary" onclick="doLogin()" id="btn-auth-action" style="margin-top:10px;">เข้าสู่ระบบ</button>
    `;
  } else {
    html = `
      <div style="background: rgba(37, 99, 235, 0.05); padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.85rem; color: var(--text-muted); text-align:left;">
        <li>ตั้งรหัส PIN 4-6 หลัก เพื่อใช้เข้าแอปครั้งต่อไป</li>
      </div>
      <div class="search-container"><i class="fa-solid fa-user"></i><input type="text" id="auth-name" placeholder="ชื่อ-นามสกุล ของคุณ"></div>
      <div class="search-container"><i class="fa-solid fa-phone"></i><input type="tel" id="auth-phone" placeholder="เบอร์โทรศัพท์ของคุณ" maxlength="10"></div>
      <div class="search-container"><i class="fa-solid fa-lock"></i><input type="password" id="auth-pin" placeholder="ตั้งรหัส PIN ใหม่" maxlength="6"></div>
      <button class="btn-primary" onclick="goToPayment(true)" id="btn-auth-action" style="margin-top:10px;">สมัครสมาชิก และ ชำระเงิน</button>
    `;
  }
  document.getElementById('auth-content-box').innerHTML = html;
}

function doLogin() {
  const phone = document.getElementById('auth-phone').value.trim(); const pin = document.getElementById('auth-pin').value.trim();
  if(!phone || !pin) { showToast("กรุณากรอกเบอร์โทรและรหัสผ่าน", "warning"); return; }
  const btn = document.getElementById('btn-auth-action'); btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังตรวจสอบ...'; btn.disabled = true;
  authenticateUser(phone, pin, btn, false);
}

function authenticateUser(phone, pin, btnObj = null, isSilentMode = false) {
  if(!isSilentMode) { document.getElementById('loader').classList.remove('hidden'); document.getElementById('loader-text').innerText = "กำลังตรวจสอบสิทธิ์..."; }
  fetchAPI('authAndGetSongs', { phone: phone, pin: pin })
  .then(res => {
    if(btnObj) { btnObj.innerHTML = 'เข้าสู่ระบบ'; btnObj.disabled = false; }
    document.getElementById('loader').classList.add('hidden');
    if(res.status === 'success') {
      userPhone = phone; userExpiry = res.expiry;
      localStorage.setItem('songbook_user', JSON.stringify({phone: phone, pin: pin}));
      allSongs = res.songs || []; localStorage.setItem('offline_songs', JSON.stringify(allSongs));
      document.getElementById('profile-phone').innerText = phone; document.getElementById('profile-expiry').innerText = res.expiry;
      document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden'); document.getElementById('main-bottom-nav').classList.remove('hidden');
      updateBottomNav('dashboard'); renderDashboard();
    } else if(res.status === 'expired') {
      showToast(res.msg, "error"); document.getElementById('app').classList.add('hidden'); document.getElementById('main-bottom-nav').classList.add('hidden');
      localStorage.setItem('temp_renew_phone', phone); localStorage.setItem('temp_renew_pin', pin); goToPayment(false); localStorage.removeItem('songbook_user');
    } else if(res.status === 'pending') {
      showToast(res.msg, "warning"); document.getElementById('app').classList.add('hidden'); document.getElementById('main-bottom-nav').classList.add('hidden');
      showLoginView(); localStorage.removeItem('songbook_user');
    } else {
      showToast(res.msg, "error"); document.getElementById('app').classList.add('hidden'); document.getElementById('main-bottom-nav').classList.add('hidden');
      showLoginView(); localStorage.removeItem('songbook_user');
    }
  }).catch(err => {
    if(btnObj) { btnObj.innerHTML = 'เข้าสู่ระบบ'; btnObj.disabled = false; }
    document.getElementById('loader').classList.add('hidden');
    if(isSilentMode) {
      showToast("ใช้งานแบบออฟไลน์ (ข้อมูลล่าสุดที่เคยซิงค์)", "warning");
      const savedSongs = localStorage.getItem('offline_songs'); if(savedSongs) allSongs = JSON.parse(savedSongs);
      document.getElementById('view-auth').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); document.getElementById('main-bottom-nav').classList.remove('hidden');
      renderDashboard(); updateBottomNav('dashboard');
    } else { alert("การเชื่อมต่อล้มเหลว: " + err.message); }
  });
}

function showPaymentView() { document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.remove('hidden'); }
function showLoginView() { document.getElementById('view-payment').classList.add('hidden'); document.getElementById('view-auth').classList.remove('hidden'); switchAuthTab('login');}

function goToRenewFromProfile() {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user')); if(!savedUser) return;
  localStorage.setItem('temp_renew_phone', savedUser.phone); localStorage.setItem('temp_renew_pin', savedUser.pin); localStorage.setItem('temp_renew_name', "สมาชิกเดิม (ต่ออายุ)"); 
  isRegisteringNew = false; document.getElementById('pay-title').innerText = "ต่ออายุการใช้งาน";
  document.getElementById('slip-upload').value = ""; document.getElementById('slip-image-preview').style.display = "none"; pendingSlipBase64 = "";
  document.getElementById('app').classList.add('hidden'); document.getElementById('main-bottom-nav').classList.add('hidden');
  document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.remove('hidden');
}

function goToPayment(isNew) {
  isRegisteringNew = isNew; document.getElementById('pay-title').innerText = isNew ? "ชำระเงินเพื่อสมัครสมาชิก" : "ต่ออายุการใช้งาน";
  if(isNew) {
    const name = document.getElementById('auth-name').value.trim(); const phone = document.getElementById('auth-phone').value.trim(); const pin = document.getElementById('auth-pin').value.trim();
    if(!name || !phone || !pin) { showToast("กรุณากรอกข้อมูลให้ครบถ้วน", "warning"); return; }
    localStorage.setItem('temp_renew_name', name); localStorage.setItem('temp_renew_phone', phone); localStorage.setItem('temp_renew_pin', pin);
  }
  pendingSlipBase64 = ""; document.getElementById('slip-upload').value = ""; document.getElementById('slip-image-preview').style.display = "none";
  document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.remove('hidden');
}

function cancelPayment() {
  document.getElementById('view-payment').classList.add('hidden'); const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if(savedUser && document.getElementById('app').classList.contains('hidden') === true && isRegisteringNew === false) {
      document.getElementById('app').classList.remove('hidden'); document.getElementById('main-bottom-nav').classList.remove('hidden');
  } else { document.getElementById('view-auth').classList.remove('hidden'); switchAuthTab('login'); }
}

function previewSlip(event) {
  const file = event.target.files[0]; if(!file) return; const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas'); const MAX_WIDTH = 800; let width = img.width; let height = img.height;
      if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
      canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, width, height);
      pendingSlipBase64 = canvas.toDataURL('image/jpeg', 0.6); 
      const preview = document.getElementById('slip-image-preview'); preview.src = pendingSlipBase64; preview.style.display = 'block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function submitPayment() {
  if(!pendingSlipBase64) { showToast("กรุณาแนบรูปภาพสลิปโอนเงิน", "warning"); return; }
  const phone = localStorage.getItem('temp_renew_phone'); const pin = localStorage.getItem('temp_renew_pin'); const name = localStorage.getItem('temp_renew_name');
  if(!phone || !pin) { showToast("ข้อมูลสูญหาย กรุณาทำรายการใหม่", "error"); showLoginView(); return; }
  const btn = document.getElementById('btn-submit-payment'); btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังอัปโหลดสลิป...'; btn.disabled = true;
  fetchAPI('submitPayment', { phone: phone, pin: pin, name: name, type: isRegisteringNew ? 'register' : 'renew', base64Image: pendingSlipBase64 })
  .then(res => {
    btn.innerHTML = 'ส่งหลักฐานและรอตรวจสอบ'; btn.disabled = false;
    if(res.status === 'success') { showToast(res.msg, "success"); setTimeout(() => { logoutUser(); }, 2000); } else { showToast(res.msg, "error"); }
  }).catch(err => { btn.innerHTML = 'ส่งหลักฐานและรอตรวจสอบ'; btn.disabled = false; alert("อัปโหลดไม่สำเร็จ: " + err.message); });
}

function logoutUser() { localStorage.removeItem('songbook_user'); localStorage.removeItem('offline_songs'); location.reload(); }

function updateBottomNav(view) {
  const nav = document.getElementById('main-bottom-nav'); if (!nav) return;
  let html = '';
  const homeBtn = `<div class="nav-item ${view==='dashboard'?'active':''}" onclick="switchView('dashboard')"><i class="fa-solid fa-house"></i><span data-i18n="nav_home">${i18n[appLang].nav_home}</span></div>`;
  const profileBtn = `<div class="nav-item ${view==='settings'?'active':''}" onclick="switchView('settings')"><i class="fa-solid fa-user"></i><span data-i18n="nav_profile">${i18n[appLang].nav_profile}</span></div>`;
  
  if (view === 'dashboard' || view === 'settings') {
    nav.classList.add('justify-center'); html = homeBtn + profileBtn;
  } else {
    nav.classList.remove('justify-center'); html += homeBtn;
    html += `<div class="nav-scroll-area">`;
    baseCategories.forEach(cat => { let isActive = (currentCategory === cat.id) ? 'active' : ''; html += `<div class="nav-item ${isActive}" onclick="openCategory('${cat.id}', '${cat.id}')"><i class="fa-solid ${cat.icon}"></i><span>${i18n[appLang][cat.i18n_nav]}</span></div>`; });
    html += `</div>`; html += profileBtn;
  }
  nav.innerHTML = html;
}

document.addEventListener("visibilitychange", () => {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if (document.visibilityState === "visible" && savedUser && allSongs.length > 0) {
    fetchAPI('authAndGetSongs', { phone: savedUser.phone, pin: savedUser.pin }).then(res => { if(res.status === 'success') { allSongs = res.songs || []; localStorage.setItem('offline_songs', JSON.stringify(allSongs)); renderDashboard(); if(currentCategory) searchCategory(); } }).catch(e => console.log('Auto sync failed'));
  }
});

function forceDataRefresh() {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user')); if(!savedUser) return;
  document.getElementById('app').classList.add('hidden'); document.getElementById('loader').classList.remove('hidden'); document.getElementById('loader-text').innerText = "กำลังซิงค์ข้อมูลล่าสุด...";
  fetchAPI('authAndGetSongs', { phone: savedUser.phone, pin: savedUser.pin }).then(res => {
      if(res.status === 'success') {
        allSongs = res.songs || []; localStorage.setItem('offline_songs', JSON.stringify(allSongs)); renderDashboard(); 
        if(currentCategory) searchCategory(); if(!currentCategory && document.getElementById('global-search').value !== "") searchGlobal();
        document.getElementById('loader').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); showToast("ซิงค์ข้อมูลเสร็จสิ้น!", "success");
      } else { logoutUser(); }
    }).catch(error => { alert("เกิดข้อผิดพลาด: " + error.message); document.getElementById('loader-text').innerText = "โหลดข้อมูลล้มเหลว"; });
}

function renderDashboard() {
  try {
    document.getElementById('total-count').innerText = allSongs.length; const grid = document.getElementById('grid-container');
    grid.innerHTML = baseCategories.map(cat => {
      const count = allSongs.filter(s => s.Category === cat.id).length; const catName = i18n[appLang][cat.i18n_cat];
      return `<div class="cat-card ${cat.bg}" onclick="openCategory('${cat.id}', '${cat.id}')"><i class="fa-solid ${cat.icon}"></i><h3 style="font-size: 1rem;">${catName}</h3><div class="count">${count} ${i18n[appLang].song_unit}</div></div>`;
    }).join('');
  } catch(e) { console.error("Render Dashboard Error", e); }
}

function openAllSongs() { currentCategory = "ALL"; document.getElementById('cat-title').innerText = i18n[appLang].total_songs; document.getElementById('cat-search').value = ""; switchView('category'); searchCategory(); }
function openCategory(catId, catRealId) { currentCategory = catId; const catConf = baseCategories.find(c => c.id === catId); document.getElementById('cat-title').innerText = catConf ? i18n[appLang][catConf.i18n_cat] : catId; document.getElementById('cat-search').value = ""; switchView('category'); searchCategory(); }

function searchCategory() {
  try {
    const q = document.getElementById('cat-search').value.toLowerCase();
    const results = allSongs.filter(s => { const matchCat = (currentCategory === "ALL") || (s.Category === currentCategory); const t1 = s.Title ? s.Title.toString().toLowerCase() : ""; const t2 = s.ID ? s.ID.toString().toLowerCase() : ""; const t3 = s.EnglishTitle ? s.EnglishTitle.toString().toLowerCase() : ""; return matchCat && (t1.includes(q) || t2.includes(q) || t3.includes(q)); });
    document.getElementById('cat-total').innerText = results.length; renderList(results, document.getElementById('song-list'));
  } catch(e) { console.error("Search Error", e); }
}

function renderList(songs, container) {
  try {
    if(songs.length === 0) { container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">ไม่พบข้อมูลเพลง 😢</div>`; return; }
    container.innerHTML = songs.map(s => {
      let engTitleHtml = s.EnglishTitle ? `<div class="s-eng-title">${s.EnglishTitle}</div>` : ''; 
      return `<div class="song-item" onclick="openSong('${s.ID}')"><div class="s-id">${s.ID}</div><div class="s-info" style="min-width:0;"><div class="s-title" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.Title||'-'}</div>${engTitleHtml}<div class="s-meta">${s.Author || '-'}</div></div><i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>`
    }).join('');
  } catch(e) { console.error("Render List Error", e); }
}

function searchGlobal() {
  try {
    const q = document.getElementById('global-search').value.toLowerCase(); const resDiv = document.getElementById('search-results'); const contentDiv = document.getElementById('dashboard-content');
    if(!q) { resDiv.innerHTML = ""; contentDiv.classList.remove('hidden'); return; }
    contentDiv.classList.add('hidden'); const results = allSongs.filter(s => { const t1 = s.Title ? s.Title.toString().toLowerCase() : ""; const t2 = s.ID ? s.ID.toString().toLowerCase() : ""; const t3 = s.EnglishTitle ? s.EnglishTitle.toString().toLowerCase() : ""; return t1.includes(q) || t2.includes(q) || t3.includes(q); });
    renderList(results, resDiv);
  } catch(e) { console.error("Search Global Error", e); }
}

function switchView(view) {
  try {
    // ปิดเพลงอัตโนมัติเวลากดย้อนกลับ (ไม่ว่าไปหน้าไหนที่ไม่ใช่หน้าเพลง)
    if(view !== 'song') {
      const audioEl = document.getElementById('song-audio-element');
      if(audioEl && !audioEl.paused) { toggleAudio(); }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    ['view-dashboard', 'view-category', 'view-song', 'view-settings'].forEach(v => { document.getElementById(v).classList.add('hidden'); document.getElementById(v).classList.remove('fade-in'); });
    let activeView = document.getElementById('view-' + view); if(activeView) { activeView.classList.remove('hidden'); void activeView.offsetWidth; activeView.classList.add('fade-in'); }
    if(view === 'dashboard') { currentCategory = ""; if(document.getElementById('global-search').value === "") document.getElementById('dashboard-content').classList.remove('hidden'); }
    updateBottomNav(view); 
  } catch (e) { console.error("Switch View Error", e); }
}

function switchReaderLyricView(type) {
  document.getElementById('btn-lyric-new').classList.remove('active'); document.getElementById('btn-lyric-old').classList.remove('active'); document.getElementById('btn-lyric-'+type).classList.add('active');
  const lyricsEl = document.getElementById('detail-lyrics');
  if(type === 'new') { lyricsEl.innerHTML = currentSong.LyricsNew || `<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ไม่มีเนื้อเพลงอาข่าแบบใหม่ในระบบ</div>`; } 
  else { lyricsEl.innerHTML = currentSong.Lyrics || `<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ไม่มีเนื้อเพลงอาข่าแบบเก่าในระบบ</div>`; }
}

function openSong(id) {
  try {
    currentSong = allSongs.find(s => s.ID === id); 
    document.getElementById('detail-title').innerText = currentSong.Title; 
    const engTitleEl = document.getElementById('detail-eng-title'); 
    if(currentSong.EnglishTitle) { engTitleEl.innerText = currentSong.EnglishTitle; engTitleEl.classList.remove('hidden'); } else { engTitleEl.classList.add('hidden'); }
    
    document.getElementById('detail-id').innerText = currentSong.ID; document.getElementById('detail-author').innerText = currentSong.Author || '-'; 
    const chordDiv = document.getElementById('detail-chords-container'); if(currentSong.Chords) { document.getElementById('detail-chords').innerText = currentSong.Chords; chordDiv.classList.remove('hidden'); } else { chordDiv.classList.add('hidden'); }
    
    const notDiv = document.getElementById('detail-notation-container'); if(currentSong.Notation) { notDiv.innerText = currentSong.Notation; notDiv.classList.remove('hidden'); } else { notDiv.classList.add('hidden'); }
    
    const imgBox = document.getElementById('detail-image-container'); if(currentSong.ImageUrl) { imgBox.innerHTML = `<img src="${currentSong.ImageUrl}" alt="Song Image">`; imgBox.classList.remove('hidden'); } else { imgBox.innerHTML = ""; imgBox.classList.add('hidden'); }
    
    const toggleBox = document.getElementById('lyrics-toggle-box');
    if(currentSong.LyricsNew && currentSong.Lyrics) { toggleBox.classList.remove('hidden'); if(appLang === 'ao') switchReaderLyricView('old'); else switchReaderLyricView('new'); } 
    else { toggleBox.classList.add('hidden'); const lyricsEl = document.getElementById('detail-lyrics'); lyricsEl.innerHTML = currentSong.LyricsNew || currentSong.Lyrics || "<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ยังไม่มีเนื้อเพลง</div>"; }
    
    const inspDiv = document.getElementById('detail-inspiration'); if(currentSong.Inspiration) { inspDiv.innerHTML = `<i class="fa-solid fa-quote-left" style="opacity:0.3; margin-right:5px;"></i> ${currentSong.Inspiration.replace(/\n/g, '<br>')}`; inspDiv.classList.remove('hidden'); } else { inspDiv.classList.add('hidden'); }
    
    const mediaBox = document.getElementById('detail-media-container'); 
    let mediaHtml = ""; 
    
    // ตั้งค่าแถบ Audio บน Top Bar
    const topAudio = document.getElementById('top-audio-player');
    const topEmpty = document.getElementById('top-audio-empty');
    const audioEl = document.getElementById('song-audio-element');
    
    if(currentSong.AudioUrl) {
      topAudio.classList.remove('hidden');
      topEmpty.classList.add('hidden');
      audioEl.src = currentSong.AudioUrl;
      audioEl.pause();
      document.getElementById('btn-play-pause').innerHTML = '<i class="fa-solid fa-play"></i>';
      document.getElementById('audio-fill').style.width = '0%';
      document.getElementById('audio-time').innerText = '0:00';
    } else {
      topAudio.classList.add('hidden');
      topEmpty.classList.remove('hidden');
      audioEl.src = "";
    }
    
    // Video YouTube แสดงด้านล่าง
    if(currentSong.ExternalLink) {
      const ytMatch = currentSong.ExternalLink.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      if (ytMatch && ytMatch[1]) {
        mediaHtml += `<div class="video-container"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen></iframe></div>`;
      } else {
        mediaHtml += `<a href="${currentSong.ExternalLink}" target="_blank" class="btn-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ข้อมูลเพิ่มเติม</a>`; 
      }
    }
    
    if(mediaHtml !== "") { mediaBox.innerHTML = mediaHtml; mediaBox.classList.remove('hidden'); } else { mediaBox.innerHTML = ""; mediaBox.classList.add('hidden'); }
    
    switchView('song');
  } catch (e) { console.error("Open Song Error", e); alert('เกิดข้อผิดพลาดในการแสดงเพลง'); }
}

function showToast(msg, type="success") {
  const toast = document.getElementById('toast');
  const icon = type === "error" ? "fa-circle-xmark" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-check";
  toast.style.background = type === "error" ? "var(--danger)" : type === "warning" ? "#f59e0b" : "var(--primary)";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
}

function setTheme(theme) { document.documentElement.setAttribute('data-theme', theme); saveUiSettings(); }
function setColor(color) {
  document.documentElement.style.setProperty('--primary', color);
  let hex = color.replace('#', '');
  let r = parseInt(hex.substring(0,2), 16), g = parseInt(hex.substring(2,4), 16), b = parseInt(hex.substring(4,6), 16);
  document.documentElement.style.setProperty('--primary-glow', `rgba(${r},${g},${b},0.4)`);
  saveUiSettings();
}
function saveUiSettings() {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const color = document.documentElement.style.getPropertyValue('--primary').trim() || '#2563eb';
  const settings = JSON.parse(localStorage.getItem('songbook_settings')) || {};
  settings.theme = theme; settings.color = color;
  localStorage.setItem('songbook_settings', JSON.stringify(settings));
}

/* --- ระบบเครื่องเล่นเพลงบน Top Bar --- */
function toggleAudio() {
  const audioEl = document.getElementById('song-audio-element');
  const playBtn = document.getElementById('btn-play-pause');
  if(!audioEl.src) return;
  
  if(audioEl.paused) {
    audioEl.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audioEl.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

function seekAudio(e) {
  const audioEl = document.getElementById('song-audio-element');
  if(!audioEl.src || isNaN(audioEl.duration) || audioEl.duration === Infinity) return;
  const track = e.currentTarget;
  const rect = track.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audioEl.currentTime = percent * audioEl.duration;
}

const songAudioEl = document.getElementById('song-audio-element');
if(songAudioEl) {
  songAudioEl.addEventListener('timeupdate', () => {
    if(isNaN(songAudioEl.duration) || songAudioEl.duration === Infinity) return;
    const percent = (songAudioEl.currentTime / songAudioEl.duration) * 100;
    document.getElementById('audio-fill').style.width = percent + '%';
    
    let mins = Math.floor(songAudioEl.currentTime / 60);
    let secs = Math.floor(songAudioEl.currentTime % 60);
    if(secs < 10) secs = '0' + secs;
    document.getElementById('audio-time').innerText = mins + ':' + secs;
  });

  songAudioEl.addEventListener('ended', () => {
    document.getElementById('btn-play-pause').innerHTML = '<i class="fa-solid fa-play"></i>';
    document.getElementById('audio-fill').style.width = '0%';
    document.getElementById('audio-time').innerText = '0:00';
  });
}
