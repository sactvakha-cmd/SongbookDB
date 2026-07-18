// เปลี่ยนชื่อจาก GAS_URL เป็น API_URL
const API_URL = "https://akhasongbook-api.sactvakha.workers.dev"; 

async function fetchAPI(action, params = {}) {
  const payload = { action: action, ...params };
  try {
    const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(payload) });
    return await response.json();
  } catch (error) { throw error; }
}

const i18n = {
  th: { app_title: "คลังเพลงคริสเตียนอาข่า", search_placeholder: "ค้นหาด้วย เลข หรือ ชื่อเพลง...", manage_text: "ดูและจัดการ", total_songs: "เพลงทั้งหมดในคลัง", group_songs: "กลุ่มเพลง", song_count_label: "จำนวนเพลง:", song_unit: "เพลง", nav_home: "หน้าแรก", nav_update: "อัปเดตแอป", nav_admin: "แอดมิน", nav_profile: "โปรไฟล์", cat_life: "เพลงชีวิตคริสเตียนอาข่า", cat_gen: "เพลงคริสเตียนทั่วไป", cat_xmas: "เพลงคริสต์มาส", cat_sad: "เพลงไว้อาลัย", cat_wed: "เพลงงานมงคลสมรส", cat_praise: "เพลงสรรเสริญ", cat_worship: "เพลงนมัสการ", cat_other: "เพลงอื่นๆ", nav_cat_life: "อาข่า", nav_cat_gen: "ทั่วไป", nav_cat_xmas: "คริสต์มาส", nav_cat_sad: "ไว้อาลัย", nav_cat_wed: "มงคลสมรส", nav_cat_praise: "สรรเสริญ", nav_cat_worship: "นมัสการ", nav_cat_other: "อื่นๆ" },
  an: { app_title: "Aqkaq kalizaq DawrCar deuq.", search_placeholder: "Bof-awr pov-eu...", manage_text: "Haw-awr lavsav-eu", total_songs: "Dawqcar dawqtawvluf", group_songs: "Dawqcawr armaf", song_count_label: "Dawqcar:", song_unit: "hm", nav_home: "Imqhawq", nav_update: "Update", nav_admin: "Admin", nav_profile: "Profile", cat_life: "Aqkaq kalizaq Car-eu Sanqbof", cat_gen: "Aqkaq kalizaq cardawq nuideuq.", cat_xmas: "Kirsarmax DawqCar", cat_sad: "Shirbui-anr car-eu Dawqcar", cat_wed: "Oermr barngae Car-eu Dawqcar", cat_praise: "Jaceuq-euu dawqcar", cat_worship: "Uqduq tanq-eu DawqCar", cat_other: "Dawqcar Nuideuq.", nav_cat_life: "Sanqbof", nav_cat_gen: "Nuideuq.", nav_cat_xmas: "Kirsarmax", nav_cat_sad: "Shirbui", nav_cat_wed: "Oermr", nav_cat_praise: "Jaceuq", nav_cat_worship: "Uqduq", nav_cat_other: "Nuideuq." },
  ao: { app_title: "Aˬkaˬ kalizaˬ Caˇdawˬ", search_placeholder: "Bof-awr poˆ-awˬ...", manage_text: "Haw-awˇ Laˆsaˆ-eu", total_songs: "Dawˬcaˇ Dawˬtawˆluꞈ", group_songs: "Dawˬcaˇ aˇmaꞈ", song_count_label: "Dawˬcaˇ:", song_unit: "hm", nav_home: "Imqhawq", nav_update: "Update", nav_admin: "Admin", nav_profile: "Profile", cat_life: "Aˬkaˬ kalizaˬ Caˇ-eu Sahˬboꞈ", cat_gen: "Aˬkaˬ kalizaˬ Caˇdawˬ Nuideuˬ", cat_xmas: "Kiˇsaˇmaˇ Dawˬcaˇ", cat_sad: "Shiˇbui", cat_wed: "Oeˇmˇ baˇgaˇ Caˇ-eu dawˬcaˇ", cat_praise: "Jaceuˬ-eu Dawˬcaˇ", cat_worship: "Uˬduˬ tahˬ-eu Dawˬcaˇ", cat_other: "Dawˬcaˇ Nuideuˬ", nav_cat_life: "Sahˬboꞈ", nav_cat_gen: "Nuideuˬ", nav_cat_xmas: "Kiˇsaˇmaˇ", nav_cat_sad: "Shiˇbui", nav_cat_wed: "Oeˇmˇ", nav_cat_praise: "Jaceuˬ", nav_cat_worship: "Uˬduˬ", nav_cat_other: "Nuideuˬ" }
};

let appLang = 'th'; 
let allSongs = []; let allUsers = [];
let currentCategory = ""; let currentSong = null; let currentAdminLyricTab = "old"; 
let isAdmin = false; let adminPassword = ""; let userPhone = ""; let userExpiry = "";
let readerFontSize = 1.2; let readerLineHeight = 2.0; let readerAlign = "center"; 

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
  const reader = JSON.parse(localStorage.getItem('songbook_reader')); if(reader) { readerFontSize = reader.size || 1.2; readerLineHeight = reader.line || 2.0; readerAlign = reader.align || 'center'; }
  const savedPass = localStorage.getItem('adminPass'); if(savedPass) { isAdmin = true; adminPassword = savedPass; }
  
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
      
      // [UPDATE] บันทึกเพลงลง localStorage สำหรับใช้โหมด Offline
      allSongs = res.songs || []; 
      localStorage.setItem('offline_songs', JSON.stringify(allSongs));

      document.getElementById('profile-phone').innerText = phone; document.getElementById('profile-expiry').innerText = res.expiry;
      document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden'); document.getElementById('main-bottom-nav').classList.remove('hidden');
      updateBottomNav('dashboard'); renderDashboard(); updateAdminUI();
    } else if(res.status === 'expired') {
      showToast(res.msg, "error"); document.getElementById('app').classList.add('hidden'); document.getElementById('main-bottom-nav').classList.add('hidden');
      localStorage.setItem('temp_renew_phone', phone); localStorage.setItem('temp_renew_pin', pin);
      goToPayment(false); 
      localStorage.removeItem('songbook_user');
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
    
    // [UPDATE] เข้าสู่ระบบ Offline Mode แบบสมบูรณ์
    if(isSilentMode) {
      showToast("ใช้งานแบบออฟไลน์ (ข้อมูลล่าสุดที่เคยซิงค์)", "warning");
      
      // ดึงเพลงที่เซฟไว้จาก localStorage
      const savedSongs = localStorage.getItem('offline_songs');
      if(savedSongs) {
        allSongs = JSON.parse(savedSongs);
      }

      document.getElementById('view-auth').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); document.getElementById('main-bottom-nav').classList.remove('hidden');
      
      renderDashboard(); // เรียกใช้งานการแสดงผล
      updateBottomNav('dashboard'); updateAdminUI();
    } else { alert("การเชื่อมต่อล้มเหลว: " + err.message); }
  });
}

function showPaymentView() { document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.remove('hidden'); }
function showLoginView() { document.getElementById('view-payment').classList.add('hidden'); document.getElementById('view-auth').classList.remove('hidden'); switchAuthTab('login');}

function goToRenewFromProfile() {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if(!savedUser) return;
  localStorage.setItem('temp_renew_phone', savedUser.phone);
  localStorage.setItem('temp_renew_pin', savedUser.pin);
  localStorage.setItem('temp_renew_name', "สมาชิกเดิม (ต่ออายุ)"); 
  isRegisteringNew = false; 
  document.getElementById('pay-title').innerText = "ต่ออายุการใช้งาน";
  document.getElementById('slip-upload').value = ""; document.getElementById('slip-image-preview').style.display = "none"; pendingSlipBase64 = "";
  document.getElementById('app').classList.add('hidden'); document.getElementById('main-bottom-nav').classList.add('hidden');
  document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.remove('hidden');
}

function goToPayment(isNew) {
  isRegisteringNew = isNew;
  document.getElementById('pay-title').innerText = isNew ? "ชำระเงินเพื่อสมัครสมาชิก" : "ต่ออายุการใช้งาน";
  if(isNew) {
    const name = document.getElementById('auth-name').value.trim();
    const phone = document.getElementById('auth-phone').value.trim();
    const pin = document.getElementById('auth-pin').value.trim();
    if(!name || !phone || !pin) { showToast("กรุณากรอกข้อมูลให้ครบถ้วน", "warning"); return; }
    localStorage.setItem('temp_renew_name', name); localStorage.setItem('temp_renew_phone', phone); localStorage.setItem('temp_renew_pin', pin);
  }
  pendingSlipBase64 = ""; document.getElementById('slip-upload').value = ""; document.getElementById('slip-image-preview').style.display = "none";
  document.getElementById('view-auth').classList.add('hidden'); document.getElementById('view-payment').classList.remove('hidden');
}

function cancelPayment() {
  document.getElementById('view-payment').classList.add('hidden');
  const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if(savedUser && document.getElementById('app').classList.contains('hidden') === true && isRegisteringNew === false) {
      document.getElementById('app').classList.remove('hidden');
      document.getElementById('main-bottom-nav').classList.remove('hidden');
  } else {
      document.getElementById('view-auth').classList.remove('hidden');
      switchAuthTab('login');
  }
}

function previewSlip(event) {
  const file = event.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas'); const MAX_WIDTH = 800; 
      let width = img.width; let height = img.height;
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
    if(res.status === 'success') {
      showToast(res.msg, "success");
      setTimeout(() => { logoutUser(); }, 2000);
    } else { showToast(res.msg, "error"); }
  }).catch(err => { btn.innerHTML = 'ส่งหลักฐานและรอตรวจสอบ'; btn.disabled = false; alert("อัปโหลดไม่สำเร็จ: " + err.message); });
}

function logoutUser() { localStorage.removeItem('songbook_user'); localStorage.removeItem('adminPass'); localStorage.removeItem('offline_songs'); location.reload(); }

function updateBottomNav(view) {
  const nav = document.getElementById('main-bottom-nav'); 
  if (!nav) return;
  let html = '';
  
  const homeBtn = `<div class="nav-item ${view==='dashboard'?'active':''}" onclick="switchView('dashboard')"><i class="fa-solid fa-house"></i><span data-i18n="nav_home">${i18n[appLang].nav_home}</span></div>`;
  const profileBtn = `<div class="nav-item ${view==='settings'||view==='admin-users'||view==='admin-user-form'?'active':''}" onclick="switchView('settings')"><i class="fa-solid fa-user"></i><span data-i18n="nav_profile">${i18n[appLang].nav_profile}</span></div>`;
  const adminBtn = `<div class="nav-item ${view==='admin'?'active':''}" onclick="handleAdminIconClick()"><i class="fa-solid fa-shield-halved" style="${isAdmin?'color:#f59e0b':''}"></i><span data-i18n="nav_admin">${i18n[appLang].nav_admin}</span></div>`;
  const addSongBtn = isAdmin ? `<div class="nav-item ${view==='admin'?'active':''}" onclick="openAdminForm()"><i class="fa-solid fa-circle-plus" style="color:#f59e0b; font-size:1.5rem;"></i><span style="color:#f59e0b;">เพิ่มเพลง</span></div>` : '';

  if (view === 'dashboard' || view === 'admin' || view === 'settings' || view === 'admin-users' || view === 'admin-user-form') {
    nav.classList.add('justify-center');
    html = homeBtn + addSongBtn + profileBtn + adminBtn;
  } else {
    nav.classList.remove('justify-center');
    html += homeBtn;
    html += `<div class="nav-scroll-area">`;
    baseCategories.forEach(cat => { 
      let isActive = (currentCategory === cat.id) ? 'active' : ''; 
      html += `<div class="nav-item ${isActive}" onclick="openCategory('${cat.id}', '${cat.id}')"><i class="fa-solid ${cat.icon}"></i><span>${i18n[appLang][cat.i18n_nav]}</span></div>`; 
    });
    html += `</div>`;
    html += addSongBtn + profileBtn;
  }
  nav.innerHTML = html;
}

document.addEventListener("visibilitychange", () => {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if (document.visibilityState === "visible" && savedUser && allSongs.length > 0) {
    fetchAPI('authAndGetSongs', { phone: savedUser.phone, pin: savedUser.pin }).then(res => { if(res.status === 'success') { allSongs = res.songs || []; localStorage.setItem('offline_songs', JSON.stringify(allSongs)); renderDashboard(); if(currentCategory) searchCategory(); } }).catch(e => console.log('Auto sync failed'));
  }
});

function switchAdminLyricView(type) {
  currentAdminLyricTab = type;
  document.getElementById('btn-edit-lyric-old').classList.remove('active'); document.getElementById('btn-edit-lyric-new').classList.remove('active'); document.getElementById('btn-edit-lyric-'+type).classList.add('active');
  if(type === 'old') { document.getElementById('form-lyrics-old').classList.remove('hidden'); document.getElementById('toolbar-old').classList.remove('hidden'); document.getElementById('form-lyrics-new').classList.add('hidden'); document.getElementById('toolbar-new').classList.add('hidden');
  } else { document.getElementById('form-lyrics-old').classList.add('hidden'); document.getElementById('toolbar-old').classList.add('hidden'); document.getElementById('form-lyrics-new').classList.remove('hidden'); document.getElementById('toolbar-new').classList.remove('hidden'); }
}

function formatTextAdmin(command, targetId) { document.execCommand(command, false, null); document.getElementById(targetId).focus(); }
function changeAdminEditorLineSpacing(type, val) { const targetEditor = (type === 'old') ? 'form-lyrics-old' : 'form-lyrics-new'; document.getElementById(targetEditor).style.lineHeight = val; }

function forceAppRefresh() { location.reload(true); }

function forceDataRefresh() {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user')); if(!savedUser) return;
  document.getElementById('app').classList.add('hidden'); document.getElementById('loader').classList.remove('hidden'); document.getElementById('loader-text').innerText = "กำลังซิงค์ข้อมูลล่าสุด...";
  fetchAPI('authAndGetSongs', { phone: savedUser.phone, pin: savedUser.pin }).then(res => {
      if(res.status === 'success') {
        allSongs = res.songs || []; localStorage.setItem('offline_songs', JSON.stringify(allSongs)); renderDashboard(); updateAdminUI(); 
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

function handleAdminIconClick() { if(isAdmin) { showToast("คุณอยู่ในระบบผู้ดูแลแล้ว", "success"); } else { document.getElementById('admin-modal').classList.add('show'); setTimeout(() => document.getElementById('modal-pass-input').focus(), 100); } }
function handleMenuAddClick() { if(isAdmin) openAdminForm(); else { document.getElementById('admin-modal').classList.add('show'); setTimeout(() => document.getElementById('modal-pass-input').focus(), 100); } }
function closeAdminModal() { document.getElementById('admin-modal').classList.remove('show'); document.getElementById('modal-pass-input').value = ""; }

function verifyAdmin() {
  const pass = document.getElementById('modal-pass-input').value;
  if(pass === "1234") { // แนะนำให้เปลี่ยนรหัสและดึงจาก API ภายหลัง
    isAdmin = true; adminPassword = pass; localStorage.setItem('adminPass', pass); closeAdminModal(); updateAdminUI(); showToast("🔓 ปลดล็อกโหมดแอดมินสำเร็จ", "success");
    if(currentCategory) searchCategory(); if(!currentCategory && document.getElementById('global-search').value !== "") searchGlobal();
  } else { showToast("รหัสผ่านผิด!", "error"); document.getElementById('modal-pass-input').value = ""; document.getElementById('modal-pass-input').focus(); }
}
document.getElementById('modal-pass-input').addEventListener("keypress", e => { if(e.key === "Enter") { e.preventDefault(); verifyAdmin(); } });

function logoutAdmin() { isAdmin = false; adminPassword = ""; localStorage.removeItem('adminPass'); updateAdminUI(); showToast("ออกจากระบบผู้ดูแลแล้ว"); if(currentCategory) searchCategory(); if(!currentCategory && document.getElementById('global-search').value !== "") searchGlobal(); switchView('dashboard'); }

function updateAdminUI() {
  const adminTools = document.getElementById('admin-tools-section');
  const btnLogout = document.getElementById('btn-logout');
  if(isAdmin) {
    if(adminTools) adminTools.classList.remove('hidden');
    if(btnLogout) btnLogout.classList.remove('hidden');
  } else {
    if(adminTools) adminTools.classList.add('hidden');
    if(btnLogout) btnLogout.classList.add('hidden');
  }
  
  let currentView = 'dashboard';
  const views = ['dashboard', 'category', 'song', 'admin', 'settings', 'admin-users', 'admin-user-form'];
  for (let v of views) {
    let el = document.getElementById('view-' + v);
    if (el && !el.classList.contains('hidden')) {
      currentView = v;
      break;
    }
  }
  updateBottomNav(currentView);
}

function toggleEngTitleField() { const cat = document.getElementById('form-cat').value; const group = document.getElementById('eng-title-group'); if(cat === 'เพลงชีวิตคริสเตียนอาข่า') { group.classList.remove('hidden'); } else { group.classList.add('hidden'); document.getElementById('form-eng-title').value = ""; } }

function openAllSongs() { currentCategory = "ALL"; document.getElementById('cat-title').innerText = i18n[appLang].total_songs; document.getElementById('cat-search').value = ""; switchView('category'); searchCategory(); }
function openCategory(catId, catRealId) { currentCategory = catId; const catConf = baseCategories.find(c => c.id === catId); document.getElementById('cat-title').innerText = catConf ? i18n[appLang][catConf.i18n_cat] : catId; document.getElementById('cat-search').value = ""; switchView('category'); searchCategory(); }

function quickChangeCategory(songId, newCat) {
  const song = allSongs.find(s => s.ID === songId); if(!song) return; const oldCat = song.Category; song.Category = newCat; showToast("กำลังย้าย...", "success"); if(currentCategory !== "ALL") searchCategory();
  fetchAPI('updateSongCategory', { id: songId, newCategory: newCat, password: adminPassword }).then(res => { if(res.status === 'success') { renderDashboard(); } else { song.Category = oldCat; if(currentCategory !== "ALL") searchCategory(); } }).catch(e => { song.Category = oldCat; if(currentCategory !== "ALL") searchCategory(); showToast("ย้ายไม่สำเร็จ: " + e.message, "error"); });
}

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
      let engTitleHtml = s.EnglishTitle ? `<div class="s-eng-title">${s.EnglishTitle}</div>` : ''; let adminHtml = '';
      if(isAdmin) { let optionsHtml = baseCategories.map(c => `<option value="${c.id}" ${c.id===s.Category?'selected':''}>${i18n[appLang][c.i18n_nav]}</option>`).join(''); adminHtml = `<select onclick="event.stopPropagation()" onchange="quickChangeCategory('${s.ID}', this.value)" class="quick-cat-select">${optionsHtml}</select><div class="quick-actions" style="margin-top:8px; margin-left:0;"><button class="btn-quick edit" onclick="event.stopPropagation(); openAdminForm('${s.ID}')" title="แก้ไข"><i class="fa-solid fa-pen"></i></button><button class="btn-quick del" onclick="quickDeleteSong('${s.ID}', event)" title="ลบ"><i class="fa-solid fa-trash"></i></button></div>`; }
      return `<div class="song-item" onclick="openSong('${s.ID}')"><div class="s-id">${s.ID}</div><div class="s-info" style="min-width:0;"><div class="s-title" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.Title||'-'}</div>${engTitleHtml}<div class="s-meta">${s.Author || '-'}</div>${adminHtml}</div>${!isAdmin ? `<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i>` : ``}</div>`
    }).join('');
  } catch(e) { console.error("Render List Error", e); }
}

function openAdminForm(songId = null) {
  const editorOld = document.getElementById('form-lyrics-old'); const editorNew = document.getElementById('form-lyrics-new');
  if(songId && typeof songId === 'string') { 
    currentSong = allSongs.find(s => s.ID === songId);
    document.getElementById('form-id').value = currentSong.ID; document.getElementById('form-cat').value = currentSong.Category; document.getElementById('form-title').value = currentSong.Title; document.getElementById('form-eng-title').value = currentSong.EnglishTitle || ""; document.getElementById('form-author').value = currentSong.Author || ""; document.getElementById('form-chords').value = currentSong.Chords || ""; document.getElementById('form-notation').value = currentSong.Notation || ""; document.getElementById('form-audio').value = currentSong.AudioUrl || ""; document.getElementById('form-link').value = currentSong.ExternalLink || ""; document.getElementById('form-image').value = currentSong.ImageUrl || ""; document.getElementById('form-inspiration').value = currentSong.Inspiration || ""; 
    editorOld.innerHTML = currentSong.Lyrics || ""; editorNew.innerHTML = currentSong.LyricsNew || ""; document.getElementById('admin-title').innerText = "✏️ แก้ไข: " + currentSong.ID;
  } else { 
    document.getElementById('form-id').value = ""; if(currentCategory && currentCategory !== "ALL") document.getElementById('form-cat').value = currentCategory; else document.getElementById('form-cat').value = "เพลงชีวิตคริสเตียนอาข่า";
    document.getElementById('form-title').value = ""; document.getElementById('form-eng-title').value = ""; document.getElementById('form-author').value = ""; document.getElementById('form-chords').value = ""; document.getElementById('form-notation').value = ""; document.getElementById('form-audio').value = ""; document.getElementById('form-link').value = ""; document.getElementById('form-image').value = ""; document.getElementById('form-inspiration').value = "";
    editorOld.innerHTML = ""; editorOld.style.textAlign = "center"; editorOld.style.lineHeight = "2.0"; editorNew.innerHTML = ""; editorNew.style.textAlign = "center"; editorNew.style.lineHeight = "2.0"; document.getElementById('admin-title').innerText = "➕ เพิ่มเพลงใหม่";
  }
  toggleEngTitleField(); switchAdminLyricView('old'); switchView('admin');
}

function saveSong() {
  const lyricsOldHTML = document.getElementById('form-lyrics-old').innerHTML.trim(); const lyricsNewHTML = document.getElementById('form-lyrics-new').innerHTML.trim();
  if(!document.getElementById('form-title').value || (!lyricsOldHTML && !lyricsNewHTML)) { showToast("กรุณากรอกชื่อและเนื้อเพลง", "warning"); return; }
  const btn = document.getElementById('btn-save-top'); btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; btn.disabled = true;
  const data = { ID: document.getElementById('form-id').value, Title: document.getElementById('form-title').value, Category: document.getElementById('form-cat').value, Language: "Akha", Author: document.getElementById('form-author').value, Chords: document.getElementById('form-chords').value, Lyrics: lyricsOldHTML, LyricsNew: lyricsNewHTML, Inspiration: document.getElementById('form-inspiration').value, Notation: document.getElementById('form-notation').value, AudioUrl: document.getElementById('form-audio').value, ExternalLink: document.getElementById('form-link').value, EnglishTitle: document.getElementById('form-eng-title').value, ImageUrl: document.getElementById('form-image').value };
  fetchAPI('saveSong', { data: data, password: adminPassword }).then(res => { btn.innerHTML = '<i class="fa-solid fa-check"></i> บันทึก'; btn.disabled = false; if(res.status === 'success') { showToast(res.msg); let viewToGo = currentCategory ? 'category' : 'dashboard'; forceDataRefresh(); switchView(viewToGo); } else { showToast(res.msg, "error"); } }).catch(e => { btn.innerHTML = '<i class="fa-solid fa-check"></i> บันทึก'; btn.disabled = false; showToast("ผิดพลาด: " + e.message, "error"); });
}

function quickDeleteSong(songId, event) {
  event.stopPropagation(); const songToDelete = allSongs.find(s => s.ID === songId);
  if(confirm(`⚠️ ยืนยันลบเพลง "${songToDelete.Title}" ถาวร?`)) { fetchAPI('deleteSong', { id: songId, password: adminPassword }).then(res => { showToast("🗑 " + res.msg); forceDataRefresh(); }).catch(e => showToast("ลบไม่สำเร็จ: " + e.message, "error")); }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ['view-dashboard', 'view-category', 'view-song', 'view-admin', 'view-settings', 'view-admin-users', 'view-admin-user-form'].forEach(v => { document.getElementById(v).classList.add('hidden'); document.getElementById(v).classList.remove('fade-in'); });
    let activeView = document.getElementById('view-' + view); if(activeView) { activeView.classList.remove('hidden'); void activeView.offsetWidth; activeView.classList.add('fade-in'); }
    if(view === 'dashboard') { currentCategory = ""; if(document.getElementById('global-search').value === "") document.getElementById('dashboard-content').classList.remove('hidden'); }
    updateBottomNav(view); 
  } catch (e) { console.error("Switch View Error", e); }
}

function toggleTextSettings() { document.getElementById('text-settings-panel').classList.toggle('show'); }

function switchReaderLyricView(type) {
  document.getElementById('btn-lyric-new').classList.remove('active'); document.getElementById('btn-lyric-old').classList.remove('active'); document.getElementById('btn-lyric-'+type).classList.add('active');
  const lyricsEl = document.getElementById('detail-lyrics');
  if(type === 'new') { lyricsEl.innerHTML = currentSong.LyricsNew || `<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ไม่มีเนื้อเพลงอาข่าแบบใหม่ในระบบ</div>`; } 
  else { lyricsEl.innerHTML = currentSong.Lyrics || `<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ไม่มีเนื้อเพลงอาข่าแบบเก่าในระบบ</div>`; }
  lyricsEl.style.fontSize = readerFontSize + 'rem'; lyricsEl.style.lineHeight = readerLineHeight; lyricsEl.style.textAlign = readerAlign;
}

function openSong(id) {
  try {
    currentSong = allSongs.find(s => s.ID === id); document.getElementById('detail-title').innerText = currentSong.Title; const engTitleEl = document.getElementById('detail-eng-title'); if(currentSong.EnglishTitle) { engTitleEl.innerText = currentSong.EnglishTitle; engTitleEl.classList.remove('hidden'); } else { engTitleEl.classList.add('hidden'); }
    document.getElementById('detail-id').innerText = currentSong.ID; document.getElementById('detail-author').innerText = currentSong.Author || '-'; const chordDiv = document.getElementById('detail-chords-container'); if(currentSong.Chords) { document.getElementById('detail-chords').innerText = currentSong.Chords; chordDiv.classList.remove('hidden'); } else { chordDiv.classList.add('hidden'); }
    const notDiv = document.getElementById('detail-notation-container'); if(currentSong.Notation) { notDiv.innerText = currentSong.Notation; notDiv.classList.remove('hidden'); } else { notDiv.classList.add('hidden'); }
    const imgBox = document.getElementById('detail-image-container'); if(currentSong.ImageUrl) { imgBox.innerHTML = `<img src="${currentSong.ImageUrl}" alt="Song Image">`; imgBox.classList.remove('hidden'); } else { imgBox.innerHTML = ""; imgBox.classList.add('hidden'); }
    const toggleBox = document.getElementById('lyrics-toggle-box');
    if(currentSong.LyricsNew && currentSong.Lyrics) { toggleBox.classList.remove('hidden'); if(appLang === 'ao') switchReaderLyricView('old'); else switchReaderLyricView('new'); } 
    else { toggleBox.classList.add('hidden'); const lyricsEl = document.getElementById('detail-lyrics'); lyricsEl.innerHTML = currentSong.LyricsNew || currentSong.Lyrics || "<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ยังไม่มีเนื้อเพลง</div>"; lyricsEl.style.fontSize = readerFontSize + 'rem'; lyricsEl.style.lineHeight = readerLineHeight; lyricsEl.style.textAlign = readerAlign; }
    ['left', 'center', 'right'].forEach(a => document.getElementById('btn-align-'+a).classList.remove('active-align')); document.getElementById('btn-align-'+readerAlign).classList.add('active-align');
    const inspDiv = document.getElementById('detail-inspiration'); if(currentSong.Inspiration) { inspDiv.innerHTML = `<i class="fa-solid fa-quote-left" style="opacity:0.3; margin-right:5px;"></i> ${currentSong.Inspiration.replace(/\n/g, '<br>')}`; inspDiv.classList.remove('hidden'); } else { inspDiv.classList.add('hidden'); }
    const mediaBox = document.getElementById('detail-media-container'); let mediaHtml = ""; if(currentSong.AudioUrl) mediaHtml += `<audio controls src="${currentSong.AudioUrl}"></audio><br>`; if(currentSong.ExternalLink) mediaHtml += `<a href="${currentSong.ExternalLink}" target="_blank" class="btn-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ข้อมูลเพิ่มเติม / YouTube</a>`; if(mediaHtml !== "") { mediaBox.innerHTML = mediaHtml; mediaBox.classList.remove('hidden'); } else { mediaBox.innerHTML = ""; mediaBox.classList.add('hidden'); }
    document.getElementById('text-settings-panel').classList.remove('show'); switchView('song');
  } catch (e) { console.error("Open Song Error", e); alert('เกิดข้อผิดพลาดในการแสดงเพลง'); }
}

function zoomText(step) { readerFontSize += (step * 0.2); if(readerFontSize < 0.8) readerFontSize = 0.8; if(readerFontSize > 2.5) readerFontSize = 2.5; document.getElementById('detail-lyrics').style.fontSize = readerFontSize + 'rem'; saveReaderPrefs(); }
function adjustSpacing(step) { readerLineHeight += step; if(readerLineHeight < 1.2) readerLineHeight = 1.2; if(readerLineHeight > 4.0) readerLineHeight = 4.0; document.getElementById('detail-lyrics').style.lineHeight = readerLineHeight; saveReaderPrefs(); }
function setAlign(align) { readerAlign = align; document.getElementById('detail-lyrics').style.textAlign = align; ['left', 'center', 'right'].forEach(a => document.getElementById('btn-align-'+a).classList.remove('active-align')); document.getElementById('btn-align-'+align).classList.add('active-align'); saveReaderPrefs(); }
function saveReaderPrefs() { const prefs = { size: readerFontSize, line: readerLineHeight, align: readerAlign }; localStorage.setItem('songbook_reader', JSON.stringify(prefs)); }

function openUserManagement() { document.getElementById('loader').classList.remove('hidden'); document.getElementById('loader-text').innerText = "กำลังดึงข้อมูลสมาชิก..."; fetchAPI('getAllUsers', { password: adminPassword }).then(res => { allUsers = res.users || []; renderUserList(); document.getElementById('loader').classList.add('hidden'); switchView('admin-users'); }).catch(err => { alert("ดึงข้อมูลไม่สำเร็จ: " + err.message); document.getElementById('loader').classList.add('hidden'); }); }
function searchUsers() { renderUserList(); }
function renderUserList() {
  try {
    const q = document.getElementById('user-search').value.toLowerCase(); const container = document.getElementById('user-list');
    const results = allUsers.filter(u => { const p = u.Phone ? u.Phone.toString().toLowerCase() : ""; const n = u.Name ? u.Name.toString().toLowerCase() : ""; return p.includes(q) || n.includes(q); });
    if(results.length === 0) { container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">ไม่พบข้อมูลผู้ใช้</div>`; return; }
    let today = new Date(); today.setHours(0,0,0,0);
    container.innerHTML = results.map(u => {
      let isPending = u.ExpiryDate === "รอตรวจสอบ"; let expDate = isPending ? null : new Date(u.ExpiryDate); if(expDate) expDate.setHours(0,0,0,0); let isExpired = expDate ? (expDate < today) : false;
      let statusColor = isPending ? "#f59e0b" : (isExpired ? "var(--danger)" : "var(--primary)"); let statusText = isPending ? "รอตรวจสอบสลิป" : (isExpired ? "หมดอายุ" : "ใช้งานได้");
      let expStr = isPending ? "-" : `${String(expDate.getDate()).padStart(2, '0')}/${String(expDate.getMonth() + 1).padStart(2, '0')}/${expDate.getFullYear()+543}`;
      let slipBadge = u.SlipUrl ? `<a href="${u.SlipUrl}" target="_blank" style="color:#10b981; font-size:0.8rem; text-decoration:none;"><i class="fa-solid fa-image"></i> ดูสลิป</a>` : '';
      return `
      <div class="song-item">
        <div class="s-info"><div class="s-title">${u.Name || 'ไม่มีชื่อ'} <span style="font-size:0.8rem; color:var(--text-muted);">(ต่ออายุ: ${u.RenewCount} ครั้ง)</span></div><div class="s-eng-title" style="color:#475569;"><i class="fa-solid fa-phone"></i> ${u.Phone} | <i class="fa-solid fa-key"></i> ${u.PIN}</div><div class="s-meta" style="color:${statusColor}; font-weight:600;"><i class="fa-solid fa-calendar"></i> หมดอายุ: ${expStr} (${statusText}) ${slipBadge}</div></div>
        <div class="quick-actions"><button class="btn-quick edit" onclick="openUserForm('${u.Phone}')" title="แก้ไข/ต่ออายุ"><i class="fa-solid fa-pen"></i></button><button class="btn-quick del" onclick="deleteUser('${u.Phone}')" title="ลบ"><i class="fa-solid fa-trash"></i></button></div>
      </div>`;
    }).join('');
  } catch(e) { console.error("Render User List Error", e); }
}

function openUserForm(phone = null) {
  if(phone) { 
    let user = allUsers.find(u => u.Phone === phone); document.getElementById('form-user-is-edit').value = "true"; document.getElementById('form-user-phone').value = user.Phone; document.getElementById('form-user-phone').disabled = true; document.getElementById('form-user-pin').value = user.PIN; document.getElementById('form-user-name').value = user.Name || "";
    document.getElementById('form-user-count').value = user.RenewCount || 1;
    if(user.ExpiryDate !== "รอตรวจสอบ") { let d = new Date(user.ExpiryDate); let dateStr = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); document.getElementById('form-user-expiry').value = dateStr; } else { document.getElementById('form-user-expiry').value = ""; }
    const slipBox = document.getElementById('form-user-slip-box'); if(user.SlipUrl) { slipBox.classList.remove('hidden'); document.getElementById('form-user-slip-link').href = user.SlipUrl; } else { slipBox.classList.add('hidden'); }
    document.getElementById('user-form-title').innerText = "แก้ไข / อนุมัติต่ออายุ";
  } else { 
    document.getElementById('form-user-is-edit').value = "false"; document.getElementById('form-user-phone').value = ""; document.getElementById('form-user-phone').disabled = false; document.getElementById('form-user-pin').value = ""; document.getElementById('form-user-name').value = ""; document.getElementById('form-user-expiry').value = ""; document.getElementById('form-user-count').value = 1; document.getElementById('form-user-slip-box').classList.add('hidden'); document.getElementById('user-form-title').innerText = "เพิ่มผู้ใช้งานใหม่ (รับเงินสด)";
  }
  switchView('admin-user-form');
}

function addDaysToExpiry(days) {
  let currentVal = document.getElementById('form-user-expiry').value; let dateObj = currentVal ? new Date(currentVal) : new Date(); dateObj.setDate(dateObj.getDate() + days);
  let dateStr = dateObj.getFullYear() + '-' + String(dateObj.getMonth()+1).padStart(2,'0') + '-' + String(dateObj.getDate()).padStart(2,'0'); document.getElementById('form-user-expiry').value = dateStr; showToast(`บวกเวลาเพิ่ม ${days} วันแล้ว`, "success");
}

function saveUser() {
  const phone = document.getElementById('form-user-phone').value.trim(); const pin = document.getElementById('form-user-pin').value.trim(); const name = document.getElementById('form-user-name').value.trim(); const exp = document.getElementById('form-user-expiry').value; const isEdit = document.getElementById('form-user-is-edit').value === "true";
  if(!phone || !pin || !exp) { showToast("กรุณากรอกข้อมูลสำคัญให้ครบ (*)", "warning"); return; }
  const btn = document.getElementById('btn-save-user'); btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; btn.disabled = true;
  const userData = { Phone: phone, PIN: pin, Name: name, ExpiryDate: exp };
  fetchAPI('saveUser', { userData: userData, isEdit: isEdit, password: adminPassword }).then(res => { btn.innerHTML = '<i class="fa-solid fa-check"></i> บันทึก'; btn.disabled = false; if(res.status === 'success') { showToast(res.msg); openUserManagement(); } else { showToast(res.msg, "error"); } }).catch(e => { btn.innerHTML = '<i class="fa-solid fa-check"></i> บันทึก'; btn.disabled = false; showToast("ผิดพลาด: " + e.message, "error"); });
}

function deleteUser(phone) { if(confirm(`⚠️ ยืนยันลบผู้ใช้งานเบอร์ ${phone} ถาวร?`)) { showToast("กำลังลบ...", "success"); fetchAPI('deleteUser', { phone: phone, password: adminPassword }).then(res => { if(res.status === 'success') { showToast(res.msg); openUserManagement(); } else { showToast(res.msg, "error"); } }).catch(e => showToast("ลบไม่สำเร็จ: " + e.message, "error")); } }

function showToast(msg, type="success") {
  const toast = document.getElementById('toast');
  const icon = type === "error" ? "fa-circle-xmark" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-check";
  toast.style.background = type === "error" ? "var(--danger)" : type === "warning" ? "#f59e0b" : "var(--primary)";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
}
