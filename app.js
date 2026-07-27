const API_URL = "https://akhasongbook-api.sactvakha.workers.dev"; 

async function fetchAPI(action, params = {}) {
  const payload = { action: action, ...params };
  try {
    const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(payload) });
    return await response.json();
  } catch (error) { throw error; }
}

const i18n = {
  th: { app_title: "คลังเพลงคริสเตียนอาข่า", search_placeholder: "ค้นหาด้วย เลข หรือ ชื่อเพลง...", manage_text: "ดูและจัดการ", total_songs: "เพลงทั้งหมดในคลัง", group_songs: "กลุ่มเพลง", song_count_label: "จำนวนเพลง:", song_unit: "เพลง", nav_home: "หน้าแรก", nav_profile: "โปรไฟล์", nav_categories: "หมวดหมู่", cat_life: "เพลงชีวิตคริสเตียนอาข่า", cat_gen: "เพลงคริสเตียนทั่วไป", cat_xmas: "เพลงคริสต์มาส", cat_sad: "เพลงไว้อาลัย", cat_wed: "เพลงงานมงคลสมรส", cat_praise: "เพลงสรรเสริญ", cat_worship: "เพลงนมัสการ", cat_other: "เพลงอื่นๆ", nav_cat_life: "อาข่า", nav_cat_gen: "ทั่วไป", nav_cat_xmas: "คริสต์มาส", nav_cat_sad: "ไว้อาลัย", nav_cat_wed: "มงคลสมรส", nav_cat_praise: "สรรเสริญ", nav_cat_worship: "นมัสการ", nav_cat_other: "อื่นๆ", nav_music: "เพลย์ลิสต์", music_mp3: "เครื่องเล่น MP3", music_play_all: "ฟังเพลงทั้งหมด", menu_copy: "คัดลอกเนื้อเพลง", menu_share: "แชร์เพลงนี้", menu_print: "พิมพ์ / บันทึก PDF", label_chord: "คอร์ด:", lyric_new: "อาข่าแบบใหม่", lyric_old: "อาข่าแบบเก่า", music_tab_list: "เพลย์ลิสต์", music_tab_play: "กำลังเล่น", music_tab_lyric: "เนื้อเพลง", setting_account: "บัญชีของคุณ", setting_phone: "เบอร์โทรศัพท์:", setting_expire: "วันหมดอายุ:", btn_renew: "ต่ออายุการใช้งาน", btn_logout: "ออกจากระบบ", setting_display: "การแสดงผล", setting_theme: "โหมดหน้าจอ", theme_light: "สว่าง", theme_dark: "มืด", setting_color: "สีหลักของแอป", setting_advanced: "ตั้งค่าระบบเพิ่มเติม", setting_sys_lang: "ภาษาระบบ (System Language)", setting_zoom: "ขนาดหน้าจอ (Zoom):", setting_font: "ขนาดตัวอักษร (Font):", setting_bg_main: "สีพื้นหลัง", setting_bg_card: "สีการ์ด", btn_reset: "คืนค่า", pwa_title: "ติดตั้งแอปลงเครื่อง", pwa_desc: "เพื่อการใช้งานที่รวดเร็วและเข้าถึงง่ายขึ้น", pwa_cancel: "ภายหลัง", pwa_install: "ติดตั้งเลย" },
  en: { app_title: "Akha Songbook", search_placeholder: "Search number or title...", manage_text: "View & Manage", total_songs: "Total Songs", group_songs: "Categories", song_count_label: "Total:", song_unit: "songs", nav_home: "Home", nav_profile: "Profile", nav_categories: "Categories", cat_life: "Akha Christian Life", cat_gen: "General Christian", cat_xmas: "Christmas", cat_sad: "Funeral", cat_wed: "Wedding", cat_praise: "Praise", cat_worship: "Worship", cat_other: "Others", nav_cat_life: "Akha", nav_cat_gen: "General", nav_cat_xmas: "Xmas", nav_cat_sad: "Funeral", nav_cat_wed: "Wedding", nav_cat_praise: "Praise", nav_cat_worship: "Worship", nav_cat_other: "Others", nav_music: "Playlist", music_mp3: "MP3 Player", music_play_all: "Play All Songs", menu_copy: "Copy Lyrics", menu_share: "Share Song", menu_print: "Print / Save PDF", label_chord: "Chords:", lyric_new: "New Akha", lyric_old: "Old Akha", music_tab_list: "Playlist", music_tab_play: "Now Playing", music_tab_lyric: "Lyrics", setting_account: "Your Account", setting_phone: "Phone Number:", setting_expire: "Expiry Date:", btn_renew: "Renew Subscription", btn_logout: "Logout", setting_display: "Display", setting_theme: "Theme Mode", theme_light: "Light", theme_dark: "Dark", setting_color: "App Color", setting_advanced: "Advanced Settings", setting_sys_lang: "System Language", setting_zoom: "Screen Zoom:", setting_font: "Font Size:", setting_bg_main: "Background Color", setting_bg_card: "Card Color", btn_reset: "Reset", pwa_title: "Install App", pwa_desc: "For faster and easier access.", pwa_cancel: "Later", pwa_install: "Install Now" },
  my: { app_title: "အာခါ သီချင်းစာအုပ်", search_placeholder: "နံပါတ် သို့မဟုတ် ခေါင်းစဉ်ဖြင့် ရှာဖွေပါ...", manage_text: "စီမံရန်", total_songs: "သီချင်းစုစုပေါင်း", group_songs: "အမျိုးအစားများ", song_count_label: "စုစုပေါင်း-", song_unit: "ပုဒ်", nav_home: "ပင်မ", nav_profile: "ပရိုဖိုင်", nav_categories: "အမျိုးအစား", cat_life: "အာခါ ခရစ်ယာန် အသက်တာ", cat_gen: "အထွေထွေ ခရစ်ယာန်", cat_xmas: "ခရစ္စမတ်", cat_sad: "ဈာပန", cat_wed: "မင်္ဂလာဆောင်", cat_praise: "ချီးမွမ်းခြင်း", cat_worship: "ကိုးကွယ်ခြင်း", cat_other: "အခြား", nav_cat_life: "အာခါ", nav_cat_gen: "အထွေထွေ", nav_cat_xmas: "ခရစ္စမတ်", nav_cat_sad: "ဈာပန", nav_cat_wed: "မင်္ဂလာဆောင်", nav_cat_praise: "ချီးမွမ်းခြင်း", nav_cat_worship: "ကိုးကွယ်ခြင်း", nav_cat_other: "အခြား", nav_music: "ဖွင့်စာရင်း", music_mp3: "MP3 ပလေယာ", music_play_all: "အားလုံးဖွင့်ပါ", menu_copy: "စာသားကူးယူရန်", menu_share: "မျှဝေရန်", menu_print: "ပရင့် / PDF သိမ်းရန်", label_chord: "ကော့ဒ်-", lyric_new: "အာခါ (သစ်)", lyric_old: "အာခါ (ဟောင်း)", music_tab_list: "ဖွင့်စာရင်း", music_tab_play: "ဖွင့်နေသည်", music_tab_lyric: "စာသား", setting_account: "သင့်အကောင့်", setting_phone: "ဖုန်းနံပါတ်-", setting_expire: "သက်တမ်းကုန်ဆုံးရက်-", btn_renew: "သက်တမ်းတိုးရန်", btn_logout: "ထွက်မည်", setting_display: "ပြသမှု", setting_theme: "အခင်းအကျင်း", theme_light: "အလင်း", theme_dark: "အမှောင်", setting_color: "အက်ပ် အရောင်", setting_advanced: "အဆင့်မြင့် ဆက်တင်များ", setting_sys_lang: "စနစ် ဘာသာစကား (System Language)", setting_zoom: "ချဲ့ရန်-", setting_font: "ဖောင့်အရွယ်အစား-", setting_bg_main: "နောက်ခံအရောင်", setting_bg_card: "ကတ်အရောင်", btn_reset: "ပြန်လည်သတ်မှတ်ရန်", pwa_title: "အက်ပ်ကို ထည့်သွင်းပါ", pwa_desc: "ပိုမိုမြန်ဆန်လွယ်ကူစွာ အသုံးပြုရန်။", pwa_cancel: "နောက်မှ", pwa_install: "ယခုထည့်သွင်းပါ" },
  zh: { app_title: "阿卡诗歌本", search_placeholder: "按编号或标题搜索...", manage_text: "查看与管理", total_songs: "歌曲总数", group_songs: "分类", song_count_label: "总计:", song_unit: "首", nav_home: "首页", nav_profile: "个人资料", nav_categories: "分类", cat_life: "阿卡基督徒生活", cat_gen: "普通基督教", cat_xmas: "圣诞", cat_sad: "葬礼", cat_wed: "婚礼", cat_praise: "赞美", cat_worship: "敬拜", cat_other: "其他", nav_cat_life: "阿卡", nav_cat_gen: "普通", nav_cat_xmas: "圣诞", nav_cat_sad: "葬礼", nav_cat_wed: "婚礼", nav_cat_praise: "赞美", nav_cat_worship: "敬拜", nav_cat_other: "其他", nav_music: "播放列表", music_mp3: "MP3 播放器", music_play_all: "播放全部", menu_copy: "复制歌词", menu_share: "分享歌曲", menu_print: "打印 / 保存 PDF", label_chord: "和弦:", lyric_new: "新阿卡语", lyric_old: "旧阿卡语", music_tab_list: "列表", music_tab_play: "正在播放", music_tab_lyric: "歌词", setting_account: "您的账户", setting_phone: "电话号码:", setting_expire: "到期日期:", btn_renew: "续费", btn_logout: "退出登录", setting_display: "显示", setting_theme: "主题模式", theme_light: "浅色", theme_dark: "深色", setting_color: "应用颜色", setting_advanced: "高级设置", setting_sys_lang: "系统语言 (System Language)", setting_zoom: "屏幕缩放:", setting_font: "字体大小:", setting_bg_main: "背景颜色", setting_bg_card: "卡片颜色", btn_reset: "重置", pwa_title: "安装应用", pwa_desc: "以便更快捷地访问。", pwa_cancel: "稍后", pwa_install: "立即安装" },
  an: { app_title: "Aqkaq kalizaq DawrCar deuq.", search_placeholder: "Bof-awr pov-eu...", manage_text: "Haw-awr lavsav-eu", total_songs: "Dawqcar dawqtawvluf", group_songs: "Dawqcawr armaf", song_count_label: "Dawqcar:", song_unit: "hm", nav_home: "Imqhawq", nav_profile: "Profile", nav_categories: "Armaf", cat_life: "Aqkaq kalizaq Car-eu Sanqbof", cat_gen: "Aqkaq kalizaq cardawq nuideuq.", cat_xmas: "Kirsarmax DawqCar", cat_sad: "Shirbui-anr car-eu Dawqcar", cat_wed: "Oermr barngae Car-eu Dawqcar", cat_praise: "Jaceuq-euu dawqcar", cat_worship: "Uqduq tanq-eu DawqCar", cat_other: "Dawqcar Nuideuq.", nav_cat_life: "Sanqbof", nav_cat_gen: "Nuideuq.", nav_cat_xmas: "Kirsarmax", nav_cat_sad: "Shirbui", nav_cat_wed: "Oermr", nav_cat_praise: "Jaceuq", nav_cat_worship: "Uqduq", nav_cat_other: "Nuideuq.", nav_music: "Playlist", music_mp3: "MP3 Player", music_play_all: "Play All Songs", menu_copy: "Copy Lyrics", menu_share: "Share Song", menu_print: "Print / Save PDF", label_chord: "Chords:", lyric_new: "Aqkaq New", lyric_old: "Aqkaq Old", music_tab_list: "Playlist", music_tab_play: "Playing", music_tab_lyric: "Lyrics" },
  ao: { app_title: "Aˬkaˬ kalizaˬ Caˇdawˬ", search_placeholder: "Bof-awˇ poˆ-awˬ...", manage_text: "Haw-awˇ Laˆsaˆ-eu", total_songs: "Dawˬcaˇ Dawˬtawˆluꞈ", group_songs: "Dawˬcaˇ aˇmaꞈ", song_count_label: "Dawˬcaˇ:", song_unit: "hm", nav_home: "Imqhawq", nav_profile: "Profile", nav_categories: "Aˇmaꞈ", cat_life: "Aˬkaˬ kalizaˬ Caˇ-eu Sahˬboꞈ", cat_gen: "Aˬkaˬ kalizaˬ Caˇdawˬ Nuideuˬ", cat_xmas: "Kiˇsaˇmaˇ Dawˬcaˇ", cat_sad: "Shiˇbui", cat_wed: "Oeˇmˇ baˇgaˇ Caˇ-eu dawˬcaˇ", cat_praise: "Jaceuˬ-eu Dawˬcaˇ", cat_worship: "Uˬduˬ tahˬ-eu Dawˬcaˇ", cat_other: "Dawˬcaˇ Nuideuˬ", nav_cat_life: "Sahˬboꞈ", nav_cat_gen: "Nuideuˬ", nav_cat_xmas: "Kiˇsaˇmaˇ", nav_cat_sad: "Shiˇbui", nav_cat_wed: "Oeˇmˇ", nav_cat_praise: "Jaceuˬ", nav_cat_worship: "Uˬduˬ", nav_cat_other: "Nuideuˬ", nav_music: "Playlist", music_mp3: "MP3 Player", music_play_all: "Play All Songs", menu_copy: "Copy Lyrics", menu_share: "Share Song", menu_print: "Print / Save PDF", label_chord: "Chords:", lyric_new: "Aˬkaˬ New", lyric_old: "Aˬkaˬ Old", music_tab_list: "Playlist", music_tab_play: "Playing", music_tab_lyric: "Lyrics" }
};

let appLang = 'th'; 
let allSongs = [];
let currentCategory = ""; let currentSong = null; 
let userPhone = ""; let userExpiry = "";
let pendingSlipBase64 = "";
let isRegisteringNew = true;
let currentActiveView = 'dashboard';
let savedScrollPositions = {};

const baseCategories = [
  { id: 'เพลงชีวิตคริสเตียนอาข่า', i18n_cat: 'cat_life', i18n_nav: 'nav_cat_life', icon: 'fa-book-bible', bg: 'bg-g1' },
  { id: 'เพลงคริสเตียนทั่วไป', i18n_cat: 'cat_gen', i18n_nav: 'nav_cat_gen', icon: 'fa-music', bg: 'bg-g2' },
  { id: 'เพลงคริสต์มาส', i18n_cat: 'cat_xmas', i18n_nav: 'nav_cat_xmas', icon: 'fa-tree', bg: 'bg-g5' },
  { id: 'เพลงสรรเสริญ', i18n_cat: 'cat_praise', i18n_nav: 'nav_cat_praise', icon: 'fa-hands-praying', bg: 'bg-g3' },
  { id: 'เพลงงานมงคลสมรส', i18n_cat: 'cat_wed', i18n_nav: 'nav_cat_wed', icon: 'fa-ring', bg: 'bg-g4' },
  { id: 'เพลงไว้อาลัย', i18n_cat: 'cat_sad', i18n_nav: 'nav_cat_sad', icon: 'fa-dove', bg: 'bg-g8' }
];

// เก็บตัวย่อศิลปินเพื่อใช้สร้างรหัสเพลงใหม่
const artistPrefixes = {
  "Sl. Aqyo Ghoeqmaer": "AY",
  "Sll. Aqlmq Mazeuv": "AL",
  "Sl. Lawqtsaq": "LT"
};

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
  appLang = lang; 
  localStorage.setItem('app_lang', lang);
  
  const topLangSelector = document.getElementById('main-lang-selector');
  if (topLangSelector) topLangSelector.value = lang;

  const sysLangInput = document.getElementById('setting-sys-lang');
  if (sysLangInput && ['th','en','my','zh'].includes(lang)) {
      sysLangInput.value = lang;
  }

  document.querySelectorAll('[data-i18n]').forEach(el => { 
      const key = el.getAttribute('data-i18n'); 
      
      let text = i18n[lang] && i18n[lang][key] ? i18n[lang][key] : null;
      if (!text) text = i18n['en'][key]; 
      if (!text) text = i18n['th'][key]; 

      if(text) { 
          if(el.tagName === 'INPUT' && el.hasAttribute('placeholder')) { 
              el.placeholder = text; 
          } else { 
              el.innerHTML = text; 
          } 
      } 
  });

  if(reRender && allSongs.length > 0) {
    renderDashboard(); updateBottomNav(currentCategory ? 'category' : 'dashboard');
    if(currentCategory) { 
        const catConf = baseCategories.find(c => c.id === currentCategory); 
        const ln = i18n[appLang] || i18n['en'];
        if(catConf && ln) document.getElementById('cat-title').innerText = ln[catConf.i18n_cat] || i18n['en'][catConf.i18n_cat]; 
        else if(ln) document.getElementById('cat-title').innerText = ln.total_songs || i18n['en'].total_songs; 
    }
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
      
      if(res.settings) {
        localStorage.setItem('songbook_settings', JSON.stringify(res.settings));
        
        document.documentElement.setAttribute('data-theme', res.settings.theme || 'light');
        document.documentElement.style.setProperty('--primary', res.settings.color || '#2563eb');
        
        let hex = (res.settings.color || '#2563eb').replace('#', '');
        let r = parseInt(hex.substring(0,2), 16), g = parseInt(hex.substring(2,4), 16), b = parseInt(hex.substring(4,6), 16);
        document.documentElement.style.setProperty('--primary-glow', `rgba(${r},${g},${b},0.4)`);

        if(res.settings.bgMain) document.documentElement.style.setProperty('--bg-main', res.settings.bgMain);
        if(res.settings.bgSurface) document.documentElement.style.setProperty('--bg-surface', res.settings.bgSurface);
        
        let fScale = res.settings.fontScale || 50;
        document.documentElement.style.fontSize = (fScale / 50 * 16) + 'px';
        
        let sScale = res.settings.screenScale || 50;
        if (sScale !== 50) document.documentElement.style.zoom = (sScale / 50);
      }

      allSongs = res.songs || [];
      allSongs.sort((a, b) => (a.ID || "").localeCompare((b.ID || "")));
      
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
      showToast("ไม่มีการเชื่อมต่ออินเทอร์เน็ต กรุณาลองใหม่", "error");
      document.getElementById('view-auth').classList.remove('hidden'); 
    } else { 
      showToast("การเชื่อมต่อล้มเหลว กรุณาตรวจสอบอินเทอร์เน็ต", "error"); 
    }
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

function logoutUser() { localStorage.removeItem('songbook_user'); location.reload(); }

function toggleCategoryPopup() {
  const popup = document.getElementById('category-popup');
  const overlay = document.getElementById('category-popup-overlay');
  const ln = i18n[appLang] || i18n['en'] || i18n['th'];

  if (popup.classList.contains('hidden')) {
    popup.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.classList.add('no-scroll');

    updateBottomNav('category_popup'); 

    let html = `<div class="cat-grid-item full-width" onclick="selectCategoryFromPopup('ALL')">
                  <div class="icon" style="background:var(--primary);"><i class="fa-solid fa-list-ul"></i></div>
                  <div class="name">${ln.total_songs || 'Total Songs'}</div>
                </div>`;
                
    baseCategories.forEach(cat => {
      html += `<div class="cat-grid-item" onclick="selectCategoryFromPopup('${cat.id}')">
                 <div class="icon ${cat.bg}"><i class="fa-solid ${cat.icon}"></i></div>
                 <div class="name">${ln[cat.i18n_nav] || 'Category'}</div>
               </div>`;
    });
    
    document.getElementById('popup-category-list').innerHTML = html;
    setTimeout(() => popup.classList.add('show'), 10);
  } else {
    popup.classList.remove('show');
    document.body.classList.remove('no-scroll');
    
    updateBottomNav(currentActiveView);
    
    setTimeout(() => { popup.classList.add('hidden'); overlay.classList.add('hidden'); }, 300); 
  }
}

function closePopupIfOpen() {
  const popup = document.getElementById('category-popup');
  const overlay = document.getElementById('category-popup-overlay');
  if (!popup.classList.contains('hidden')) {
      popup.classList.remove('show');
      document.body.classList.remove('no-scroll');
      setTimeout(() => { popup.classList.add('hidden'); overlay.classList.add('hidden'); }, 300);
  }
}

function selectCategoryFromPopup(catId) {
  toggleCategoryPopup();
  if (catId === 'ALL') { openAllSongs(); } else { openCategory(catId, catId); }
}

function updateBottomNav(view) {
  const nav = document.getElementById('main-bottom-nav'); 
  if (!nav) return;
  if (view === 'music') { nav.classList.add('hidden'); return; }
  
  nav.classList.remove('hidden'); nav.classList.add('justify-center'); 
  
  const ln = i18n[appLang] || i18n['en'] || i18n['th'];
  const homeBtn = `<div class="nav-item ${view==='dashboard'?'active':''}" onclick="switchView('dashboard')"><i class="fa-solid fa-house"></i><span data-i18n="nav_home">${ln.nav_home}</span></div>`;
  const musicBtn = `<div class="nav-item ${view==='music'?'active':''}" onclick="openMusicPlayer()"><i class="fa-solid fa-circle-play"></i><span data-i18n="nav_music">${ln.nav_music || 'Playlist'}</span></div>`;
  const catBtn = `<div class="nav-item ${view==='category' || view==='category_popup' ?'active':''}" onclick="toggleCategoryPopup()"><i class="fa-solid fa-layer-group"></i><span data-i18n="nav_categories">${ln.nav_categories}</span></div>`;
  const profileBtn = `<div class="nav-item ${view==='settings'?'active':''}" onclick="switchView('settings')"><i class="fa-solid fa-user"></i><span data-i18n="nav_profile">${ln.nav_profile}</span></div>`;
  
  nav.innerHTML = homeBtn + musicBtn + catBtn + profileBtn;
}

document.addEventListener("visibilitychange", () => {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user'));
  if (document.visibilityState === "visible" && savedUser && allSongs.length > 0) {
    fetchAPI('authAndGetSongs', { phone: savedUser.phone, pin: savedUser.pin }).then(res => { 
        if(res.status === 'success') { 
            allSongs = res.songs || []; 
            renderDashboard(); 
            if(currentCategory) searchCategory(); 
        } 
    }).catch(e => console.log('Auto sync failed'));
  }
});

function forceDataRefresh() {
  const savedUser = JSON.parse(localStorage.getItem('songbook_user')); if(!savedUser) return;
  document.getElementById('app').classList.add('hidden'); document.getElementById('loader').classList.remove('hidden'); document.getElementById('loader-text').innerText = "กำลังซิงค์ข้อมูลล่าสุด...";
  fetchAPI('authAndGetSongs', { phone: savedUser.phone, pin: savedUser.pin }).then(res => {
      if(res.status === 'success') {
        allSongs = res.songs || [];
        allSongs.sort((a, b) => (a.ID || "").localeCompare((b.ID || "")));
        renderDashboard(); 
        if(currentCategory) searchCategory(true); 
        if(!currentCategory && document.getElementById('global-search').value !== "") searchGlobal();
        document.getElementById('loader').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); showToast("ซิงค์ข้อมูลเสร็จสิ้น!", "success");
      } else { logoutUser(); }
    }).catch(error => { showToast("การเชื่อมต่อล้มเหลว กรุณาตรวจสอบอินเทอร์เน็ต", "error"); document.getElementById('loader').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); });
}

function renderDashboard() {
  try {
    document.getElementById('total-count').innerText = allSongs.length; 
    const mp3Count = allSongs.filter(s => s.AudioUrl && s.AudioUrl.trim() !== "").length;
    const mp3CountEl = document.getElementById('total-music-count');
    if (mp3CountEl) mp3CountEl.innerText = mp3Count;

    const grid = document.getElementById('grid-container');
    const ln = i18n[appLang] || i18n['en'] || i18n['th'];
    grid.innerHTML = baseCategories.map(cat => {
      const count = allSongs.filter(s => s.Category === cat.id).length; const catName = ln[cat.i18n_cat] || cat.id;
      return `<div class="cat-card ${cat.bg}" onclick="openCategory('${cat.id}', '${cat.id}')"><i class="fa-solid ${cat.icon}"></i><h3 style="font-size: 1rem;">${catName}</h3><div class="count">${count} ${ln.song_unit || 'Songs'}</div></div>`;
    }).join('');
  } catch(e) { console.error("Render Dashboard Error", e); }
}

function openAllSongs() { 
  currentCategory = "ALL"; 
  const ln = i18n[appLang] || i18n['en'] || i18n['th'];
  document.getElementById('cat-title').innerText = ln.total_songs || 'Total Songs'; 
  document.getElementById('cat-search').value = ""; 
  document.getElementById('cat-artist-filter').value = ""; 
  switchView('category'); 
  searchCategory(true); 
}

function openCategory(catId, catRealId) { 
  currentCategory = catId; 
  const catConf = baseCategories.find(c => c.id === catId); 
  const ln = i18n[appLang] || i18n['en'] || i18n['th'];
  document.getElementById('cat-title').innerText = catConf ? (ln[catConf.i18n_cat] || catId) : catId; 
  document.getElementById('cat-search').value = ""; 
  document.getElementById('cat-artist-filter').value = ""; 
  switchView('category'); 
  searchCategory(true); 
}

let searchCatTimeout = null;
function searchCategory(isImmediate = false) {
  clearTimeout(searchCatTimeout);
  
  const executeSearch = () => {
    try {
      const q = document.getElementById('cat-search').value.toLowerCase();
      const selectedArtist = document.getElementById('cat-artist-filter').value;
      
      let results = allSongs.filter(s => { 
        const matchCat = (currentCategory === "ALL") || (s.Category === currentCategory); 
        const matchArtist = selectedArtist === "" || s.Author === selectedArtist;
        const t1 = s.Title ? s.Title.toString().toLowerCase() : ""; 
        const t2 = s.ID ? s.ID.toString().toLowerCase() : ""; 
        const t3 = s.EnglishTitle ? s.EnglishTitle.toString().toLowerCase() : ""; 
        return matchCat && matchArtist && (t1.includes(q) || t2.includes(q) || t3.includes(q)); 
      });

      document.getElementById('cat-total').innerText = results.length; 
      renderList(results, document.getElementById('song-list'), selectedArtist);
    } catch(e) { console.error("Search Error", e); }
  };

  if(isImmediate) {
    document.getElementById('song-list').innerHTML = ""; 
    executeSearch();
  } else {
    searchCatTimeout = setTimeout(executeSearch, 300);
  }
}

let searchGlobalTimeout = null;
function searchGlobal() {
  clearTimeout(searchGlobalTimeout);
  searchGlobalTimeout = setTimeout(() => {
    try {
      const q = document.getElementById('global-search').value.toLowerCase(); 
      const selectedArtist = document.getElementById('artist-filter').value;

      const resDiv = document.getElementById('search-results'); 
      const contentDiv = document.getElementById('dashboard-content');
      
      if(!q && !selectedArtist) { 
          resDiv.innerHTML = ""; contentDiv.classList.remove('hidden'); return; 
      }
      contentDiv.classList.add('hidden'); 
      
      const results = allSongs.filter(s => { 
        const matchArtist = selectedArtist === "" || s.Author === selectedArtist;
        const t1 = s.Title ? s.Title.toString().toLowerCase() : ""; 
        const t2 = s.ID ? s.ID.toString().toLowerCase() : ""; 
        const t3 = s.EnglishTitle ? s.EnglishTitle.toString().toLowerCase() : ""; 
        return matchArtist && (t1.includes(q) || t2.includes(q) || t3.includes(q)); 
      });

      renderList(results, resDiv, selectedArtist);
    } catch(e) { console.error("Search Global Error", e); }
  }, 300);
}

// ฟังก์ชัน renderList อัปเดตให้รองรับการเปลี่ยน ID แบบชั่วคราว
function renderList(songs, container, filterArtist = "") {
  try {
    if(songs.length === 0) { container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">ไม่พบข้อมูลเพลง 😢</div>`; return; }
    
    // ถ้ามีการเลือกศิลปิน ให้เรียงใหม่และเปลี่ยนรหัสชั่วคราว แต่เวลาเรียกเปิดเพลงยังใช้ ID จริง
    let displaySongs = songs;
    if (filterArtist !== "" && artistPrefixes[filterArtist]) {
        let prefix = artistPrefixes[filterArtist];
        displaySongs = songs.map((s, index) => {
            let fakeId = prefix + String(index + 1).padStart(2, '0');
            return { ...s, displayId: fakeId };
        });
    } else {
        displaySongs = songs.map(s => ({ ...s, displayId: s.ID }));
    }

    container.innerHTML = displaySongs.map(s => {
      let engTitleHtml = s.EnglishTitle ? `<div class="s-eng-title">${s.EnglishTitle}</div>` : ''; 
      // สังเกตว่า s.displayId ใช้แค่แสดงผล แต่ onclick ส่ง s.ID ของจริงไป
      return `<div class="song-item" onclick="openSong('${s.ID}', '${s.displayId}')"><div class="s-id">${s.displayId}</div><div class="s-info"><div class="s-title">${s.Title||'-'}</div>${engTitleHtml}<div class="s-meta">${s.Author || '-'}</div></div><i class="fa-solid fa-chevron-right" style="color:var(--text-muted); opacity:0.5;"></i></div>`
    }).join('');
  } catch(e) { console.error("Render List Error", e); }
}

function switchView(view) {
  try {
    closePopupIfOpen();
    closeSongMenu();

    savedScrollPositions[currentActiveView] = window.scrollY;
    
    if (view !== 'music') { isMusicPlayerActive = false; }

    if(view !== 'song' && view !== 'music') {
      const audioEl = document.getElementById('song-audio-element');
      if(audioEl && !audioEl.paused) { toggleAudio(); }
      const mediaBox = document.getElementById('detail-media-container');
      if(mediaBox) { mediaBox.innerHTML = ''; mediaBox.classList.add('hidden'); }
    }
    
    if (view === 'settings') {
      initSettingsUI();
    }

    ['view-dashboard', 'view-category', 'view-song', 'view-settings', 'view-music'].forEach(v => { 
      document.getElementById(v).classList.add('hidden'); 
      document.getElementById(v).classList.remove('fade-in'); 
    });
    
    let activeView = document.getElementById('view-' + view); 
    if(activeView) { activeView.classList.remove('hidden'); void activeView.offsetWidth; activeView.classList.add('fade-in'); }
    
    if(view === 'dashboard') { 
        currentCategory = ""; 
        if(document.getElementById('global-search').value === "" && document.getElementById('artist-filter').value === "") {
            document.getElementById('dashboard-content').classList.remove('hidden'); 
        }
    }
    updateBottomNav(view); 

    if (view === 'song' || view === 'settings' || view === 'music') { window.scrollTo(0, 0); } 
    else { setTimeout(() => { window.scrollTo(0, savedScrollPositions[view] || 0); }, 10); }

    currentActiveView = view;
  } catch (e) { console.error("Switch View Error", e); }
}

function switchReaderLyricView(type) {
  document.getElementById('btn-lyric-new').classList.remove('active'); 
  document.getElementById('btn-lyric-old').classList.remove('active'); 
  document.getElementById('btn-lyric-'+type).classList.add('active');
  
  const lyricsEl = document.getElementById('detail-lyrics');
  let htmlContent = type === 'new' ? currentSong.LyricsNew : currentSong.Lyrics;
  
  if (htmlContent) {
    htmlContent = htmlContent.replace(/>\s+</g, '><');
    lyricsEl.innerHTML = htmlContent;
  } else {
    lyricsEl.innerHTML = `<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ไม่มีเนื้อเพลง</div>`;
  }
}

function openSong(id, displayId = null) {
  try {
    currentSong = allSongs.find(s => s.ID === id); 
    document.getElementById('detail-title').innerText = currentSong.Title; 
    const engTitleEl = document.getElementById('detail-eng-title'); 
    if(currentSong.EnglishTitle) { engTitleEl.innerText = currentSong.EnglishTitle; engTitleEl.classList.remove('hidden'); } else { engTitleEl.classList.add('hidden'); }
    
    // แสดงรหัสปลอม (ถ้ามี) หรือแสดงรหัสจริง
    document.getElementById('detail-id').innerText = displayId ? displayId : currentSong.ID; 
    
    const authorEl = document.getElementById('detail-author'); 
    if(currentSong.Author && currentSong.Author.trim() !== "") {
        authorEl.innerText = currentSong.Author;
        authorEl.parentElement.style.display = ""; 
    } else {
        authorEl.innerText = "";
        authorEl.parentElement.style.display = "none"; 
    }

    const chordDiv = document.getElementById('detail-chords-container'); if(currentSong.Chords) { document.getElementById('detail-chords').innerText = currentSong.Chords; chordDiv.classList.remove('hidden'); } else { chordDiv.classList.add('hidden'); }
    
    const notDiv = document.getElementById('detail-notation-container'); if(currentSong.Notation) { notDiv.innerText = currentSong.Notation; notDiv.classList.remove('hidden'); } else { notDiv.classList.add('hidden'); }
    
    const imgBox = document.getElementById('detail-image-container'); if(currentSong.ImageUrl) { imgBox.innerHTML = `<img src="${currentSong.ImageUrl}" alt="Song Image">`; imgBox.classList.remove('hidden'); } else { imgBox.innerHTML = ""; imgBox.classList.add('hidden'); }
    
    const toggleBox = document.getElementById('lyrics-toggle-box');
    if(currentSong.LyricsNew && currentSong.Lyrics) { 
      toggleBox.classList.remove('hidden'); 
      if(appLang === 'ao') switchReaderLyricView('old'); else switchReaderLyricView('new'); 
    } else { 
      toggleBox.classList.add('hidden'); 
      const lyricsEl = document.getElementById('detail-lyrics'); 
      let htmlContent = currentSong.LyricsNew || currentSong.Lyrics;
      if (htmlContent) {
        htmlContent = htmlContent.replace(/>\s+</g, '><');
        lyricsEl.innerHTML = htmlContent;
      } else {
        lyricsEl.innerHTML = "<div style='color:var(--text-muted); font-size:0.9rem; font-style:italic;'>ยังไม่มีเนื้อเพลง</div>";
      }
    }
    
    const inspDiv = document.getElementById('detail-inspiration'); if(currentSong.Inspiration) { inspDiv.innerHTML = `<i class="fa-solid fa-quote-left" style="opacity:0.3; margin-right:5px;"></i> ${currentSong.Inspiration.replace(/\n/g, '<br>')}`; inspDiv.classList.remove('hidden'); } else { inspDiv.classList.add('hidden'); }
    
    const mediaBox = document.getElementById('detail-media-container'); 
    let mediaHtml = ""; 
    
    const topAudio = document.getElementById('top-audio-player');
    const topEmpty = document.getElementById('top-audio-empty');
    const audioEl = document.getElementById('song-audio-element');
    
    if(currentSong.AudioUrl) {
      topAudio.classList.remove('hidden');
      topEmpty.classList.add('hidden');
      audioEl.src = currentSong.AudioUrl;
      audioEl.load(); 
      document.getElementById('btn-play-pause').innerHTML = '<i class="fa-solid fa-play"></i>';
      document.getElementById('audio-fill').style.width = '0%';
      document.getElementById('audio-time').innerText = '0:00';
    } else {
      topAudio.classList.add('hidden');
      topEmpty.classList.remove('hidden');
      audioEl.src = "";
    }
    
    if(currentSong.ExternalLink) {
      const ytMatch = currentSong.ExternalLink.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      if (ytMatch && ytMatch[1]) {
        mediaHtml += `<div class="video-container"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen></iframe></div>`;
      } else {
        mediaHtml += `<a href="${currentSong.ExternalLink}" target="_blank" class="btn-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ข้อมูลเพิ่มเติม</a>`; 
      }
    }
    
    if(mediaHtml !== "") { mediaBox.innerHTML = mediaHtml; mediaBox.classList.remove('hidden'); } else { mediaBox.innerHTML = ""; mediaBox.classList.add('hidden'); }
    
    closeSongMenu();
    switchView('song');
  } catch (e) { console.error("Open Song Error", e); alert('เกิดข้อผิดพลาดในการแสดงเพลง'); }
}

function toggleSongMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('song-action-menu');
    menu.classList.toggle('hidden');
}

function closeSongMenu() {
    const menu = document.getElementById('song-action-menu');
    if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
}

document.addEventListener('click', (event) => {
    const menuContainer = document.querySelector('.song-menu-container');
    if (menuContainer && !menuContainer.contains(event.target)) {
        closeSongMenu();
    }
});

function getCleanSongText() {
    if(!currentSong) return "";
    let text = `[${currentSong.ID}] ${currentSong.Title}\n`;
    if(currentSong.EnglishTitle) text += `${currentSong.EnglishTitle}\n`;
    if(currentSong.Author) text += `ผู้แต่ง: ${currentSong.Author}\n`;
    if(currentSong.Chords) text += `คอร์ด: ${currentSong.Chords}\n`;
    text += `\n-----------------------\n\n`;
    
    const lyricsBox = document.createElement("div");
    const isNewActive = document.getElementById('btn-lyric-new').classList.contains('active');
    lyricsBox.innerHTML = isNewActive ? (currentSong.LyricsNew || currentSong.Lyrics) : (currentSong.Lyrics || currentSong.LyricsNew);
    
    lyricsBox.querySelectorAll('br, p, div').forEach(el => {
       if (el.tagName === 'BR') el.replaceWith('\n');
       else el.append('\n');
    });
    
    let plainText = lyricsBox.innerText.replace(/\n\s*\n/g, '\n\n').trim();
    text += plainText;
    
    return text;
}

function copySongLyrics() {
    closeSongMenu();
    const textToCopy = getCleanSongText();
    if(!textToCopy) return showToast("ไม่มีข้อมูลเนื้อเพลง", "warning");

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("คัดลอกเนื้อเพลงเรียบร้อยแล้ว", "success");
    }).catch(err => {
        showToast("ไม่สามารถคัดลอกได้", "error");
        console.error('Copy Error:', err);
    });
}

function shareSong() {
    closeSongMenu();
    const textToShare = getCleanSongText();
    if(!textToShare) return showToast("ไม่มีข้อมูลเพลงที่จะแชร์", "warning");

    if (navigator.share) {
        navigator.share({
            title: currentSong.Title,
            text: textToShare,
        }).catch(err => console.log('Share canceled:', err));
    } else {
        copySongLyrics(); 
        showToast("คัดลอกเนื้อเพลงแล้ว (อุปกรณ์นี้ไม่รองรับการแชร์โดยตรง)", "success");
    }
}

function printSong() {
    closeSongMenu();
    if(!currentSong) return;
    window.print();
}

function showToast(msg, type="success") {
  const toast = document.getElementById('toast');
  const icon = type === "error" ? "fa-circle-xmark" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-check";
  toast.style.background = type === "error" ? "var(--danger)" : type === "warning" ? "#f59e0b" : "var(--primary)";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
}

function initSettingsUI() {
    const settings = JSON.parse(localStorage.getItem('songbook_settings')) || {};
    
    const fScale = settings.fontScale || 50;
    const sScale = settings.screenScale || 50;
    if (document.getElementById('setting-font-scale')) {
        document.getElementById('setting-font-scale').value = fScale;
        document.getElementById('val-font-scale').innerText = fScale;
    }
    if (document.getElementById('setting-screen-scale')) {
        document.getElementById('setting-screen-scale').value = sScale;
        document.getElementById('val-screen-scale').innerText = sScale;
    }

    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    
    let curMain = document.documentElement.style.getPropertyValue('--bg-main').trim();
    if (!curMain) curMain = theme === 'dark' ? '#0f172a' : '#f1f5f9';
    if (document.getElementById('setting-bg-main')) document.getElementById('setting-bg-main').value = rgbToHex(curMain);

    let curSurf = document.documentElement.style.getPropertyValue('--bg-surface').trim();
    if (!curSurf) curSurf = theme === 'dark' ? '#1e293b' : '#ffffff';
    if (document.getElementById('setting-bg-surface')) document.getElementById('setting-bg-surface').value = rgbToHex(curSurf);
    
    if (document.getElementById('setting-sys-lang')) {
        document.getElementById('setting-sys-lang').value = ['th','en','my','zh'].includes(appLang) ? appLang : 'th';
    }
}

function rgbToHex(col) {
  if (col.startsWith('#')) return col;
  const match = col.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)/i);
  return (match && match.length === 4) ? "#" +
    ("0" + parseInt(match[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(match[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(match[3],10).toString(16)).slice(-2) : col;
}

function changeSystemLang(lang) {
    setAppLanguage(lang);
    saveUiSettings();
}

function adjustScale(type, amount) {
    const inputId = type === 'screen' ? 'setting-screen-scale' : 'setting-font-scale';
    const input = document.getElementById(inputId);
    if (!input) return;

    let currentVal = parseInt(input.value);
    let newVal = currentVal + amount;
    
    if (newVal < 25) newVal = 25;
    if (newVal > 100) newVal = 100;
    
    input.value = newVal;
    
    if (type === 'screen') {
        updateScreenScale(newVal);
    } else {
        updateFontScale(newVal);
    }
    
    saveUiSettings();
}

function updateScreenScale(val) {
    if (document.getElementById('val-screen-scale')) document.getElementById('val-screen-scale').innerText = val;
    document.documentElement.style.zoom = (val / 50);
}

function updateFontScale(val) {
    if (document.getElementById('val-font-scale')) document.getElementById('val-font-scale').innerText = val;
    document.documentElement.style.fontSize = (val / 50 * 16) + 'px';
}

function updateBgColor(type, val) {
    if (type === 'main') {
        document.documentElement.style.setProperty('--bg-main', val);
    } else if (type === 'surface') {
        document.documentElement.style.setProperty('--bg-surface', val);
    }
    saveUiSettings();
}

function resetBgColor(type) {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (type === 'main') {
        const defaultMain = theme === 'dark' ? '#0f172a' : '#f1f5f9';
        document.documentElement.style.setProperty('--bg-main', defaultMain);
        if (document.getElementById('setting-bg-main')) document.getElementById('setting-bg-main').value = defaultMain;
    } else if (type === 'surface') {
        const defaultSurface = theme === 'dark' ? '#1e293b' : '#ffffff';
        document.documentElement.style.setProperty('--bg-surface', defaultSurface);
        if (document.getElementById('setting-bg-surface')) document.getElementById('setting-bg-surface').value = defaultSurface;
    }
    saveUiSettings();
}

function setTheme(theme) { 
    document.documentElement.setAttribute('data-theme', theme); 
    document.documentElement.style.removeProperty('--bg-main');
    document.documentElement.style.removeProperty('--bg-surface');
    initSettingsUI();
    saveUiSettings(); 
}

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
  
  const bgMain = document.documentElement.style.getPropertyValue('--bg-main').trim();
  const bgSurface = document.documentElement.style.getPropertyValue('--bg-surface').trim();
  
  const fInput = document.getElementById('setting-font-scale');
  const sInput = document.getElementById('setting-screen-scale');
  const fontScale = fInput ? fInput.value : 50;
  const screenScale = sInput ? sInput.value : 50;

  const settings = JSON.parse(localStorage.getItem('songbook_settings')) || {};
  settings.theme = theme; 
  settings.color = color;
  settings.bgMain = bgMain; 
  settings.bgSurface = bgSurface;
  settings.fontScale = fontScale; 
  settings.screenScale = screenScale;
  
  localStorage.setItem('songbook_settings', JSON.stringify(settings));
  
  if (userPhone) {
    fetchAPI('updateSettings', { phone: userPhone, settings: settings }).catch(e => console.log('Error saving settings'));
  }
}

const songAudioEl = document.getElementById('song-audio-element');
let masterMusicList = [];    
let musicPlaylist = [];      
let currentMusicCategory = 'ALL';
let currentPlayingSongId = null; 
let isMusicPlayerActive = false;
let isShuffle = false;
let isRepeat = false;

function openMusicPlayer() {
  isMusicPlayerActive = true;
  masterMusicList = allSongs.filter(s => s.AudioUrl && s.AudioUrl.trim() !== "");
  
  renderMusicCategories();
  filterMusicByCategory(currentMusicCategory, false);
  
  switchView('music');
  switchMusicTab('play'); 

  if(masterMusicList.length > 0 && !currentPlayingSongId) { 
      currentPlayingSongId = masterMusicList[0].ID;
      
      const song = masterMusicList[0];
      document.getElementById('music-title-display').innerText = song.Title;
      document.getElementById('music-artist-display').innerText = song.Author || 'Akha Songbook';
      
      const coverImg = document.getElementById('music-cover-img');
      const lyricBg = document.getElementById('lyric-bg-img');
      const imgUrl = song.ImageUrl ? song.ImageUrl : 'icon-512.png';
      
      coverImg.src = imgUrl; lyricBg.style.backgroundImage = `url('${imgUrl}')`;
      updateMusicLyrics(song);
      
      songAudioEl.src = song.AudioUrl;
      songAudioEl.load(); 
  }
}

function switchMusicTab(tab) {
  document.getElementById('tab-music-list').classList.remove('active');
  document.getElementById('tab-music-play').classList.remove('active');
  document.getElementById('tab-music-lyric').classList.remove('active');
  document.getElementById('tab-music-'+tab).classList.add('active');
  
  const listContainer = document.getElementById('music-list-container');
  const playerContainer = document.getElementById('music-player-container');
  const coverView = document.getElementById('music-cover-view');
  const lyricView = document.getElementById('music-lyric-view');
  
  if(tab === 'list') {
    listContainer.classList.remove('hidden'); playerContainer.classList.add('hidden');
  } else {
    listContainer.classList.add('hidden'); playerContainer.classList.remove('hidden');
    if(tab === 'play') { coverView.classList.remove('hidden'); lyricView.classList.add('hidden'); } 
    else if(tab === 'lyric') { coverView.classList.add('hidden'); lyricView.classList.remove('hidden'); }
  }
}

function renderMusicCategories() {
  const container = document.getElementById('music-category-scroll');
  const ln = i18n[appLang] || i18n['en'] || i18n['th'];
  let html = `<button class="music-cat-btn ${currentMusicCategory==='ALL'?'active':''}" onclick="filterMusicByCategory('ALL')">${ln.total_songs || 'Total Songs'}</button>`;
  baseCategories.forEach(cat => {
      const countInCat = masterMusicList.filter(s => s.Category === cat.id).length;
      if(countInCat > 0) { html += `<button class="music-cat-btn ${currentMusicCategory===cat.id?'active':''}" onclick="filterMusicByCategory('${cat.id}')">${ln[cat.i18n_nav]}</button>`; }
  });
  container.innerHTML = html;
}

function filterMusicByCategory(catId, switchToList = true) {
  currentMusicCategory = catId; renderMusicCategories(); 
  if(catId === 'ALL') { musicPlaylist = masterMusicList; } else { musicPlaylist = masterMusicList.filter(s => s.Category === catId); }
  renderMusicList(); if(switchToList) switchMusicTab('list');
}

function renderMusicList() {
  const container = document.getElementById('music-list-container');
  if(musicPlaylist.length === 0) { container.innerHTML = `<div style="text-align:center; padding:50px; color:var(--text-muted);">ไม่มีเพลงในหมวดหมู่นี้</div>`; return; }
  
  container.innerHTML = musicPlaylist.map((s, index) => {
    const isPlaying = (s.ID === currentPlayingSongId);
    return `<div class="song-item ${isPlaying ? 'playing' : ''}" style="border:none; border-bottom:1px solid #f1f5f9; border-radius:0; padding:15px; margin:0;" onclick="playMusicIndex(${index})">
      <div class="s-id" style="width:40px; text-align:center; color:${isPlaying ? 'var(--primary)' : 'var(--text-muted)'}; font-size:1.1rem;">
         ${isPlaying ? '<i class="fa-solid fa-chart-simple fa-fade"></i>' : (index+1)}
      </div>
      <div class="s-info">
         <div class="s-title" style="${isPlaying ? 'color:var(--primary);' : ''}">${s.Title}</div>
         <div class="s-meta">${s.Author || 'Akha Songbook'}</div>
      </div>
      <i class="fa-solid ${isPlaying && !songAudioEl.paused ? 'fa-pause' : 'fa-play'}" style="color:${isPlaying ? 'var(--primary)' : 'var(--border-color)'}; font-size:1rem;"></i>
    </div>`;
  }).join('');
}

function playMusicIndex(index) {
  if(index < 0 || index >= musicPlaylist.length) return;
  const song = musicPlaylist[index];
  currentPlayingSongId = song.ID;
  
  if (userPhone) {
      fetchAPI('recordPlayCount', { songId: song.ID }).catch(e => console.log('Stats update err:', e));
  }
  
  document.getElementById('music-title-display').innerText = song.Title;
  document.getElementById('music-artist-display').innerText = song.Author || 'Akha Songbook';
  
  const coverImg = document.getElementById('music-cover-img');
  const lyricBg = document.getElementById('lyric-bg-img');
  const imgUrl = song.ImageUrl ? song.ImageUrl : 'icon-512.png';
  
  coverImg.src = imgUrl; lyricBg.style.backgroundImage = `url('${imgUrl}')`;
  updateMusicLyrics(song);
  
  songAudioEl.src = song.AudioUrl;
  songAudioEl.play().then(() => {
     document.getElementById('btn-music-play-pause').innerHTML = '<i class="fa-solid fa-pause"></i>';
     coverImg.classList.add('spin-slow');
     const cdIcon = document.getElementById('music-indicator-icon'); if(cdIcon) cdIcon.classList.add('fa-spin');
     renderMusicList(); switchMusicTab('play');
  }).catch(e => showToast("เล่นเพลงล้มเหลว", "error"));
}

function updateMusicLyrics(song) {
  const container = document.getElementById('music-lyric-content');
  let lyricsHtml = (appLang === 'ao') ? (song.Lyrics || song.LyricsNew) : (song.LyricsNew || song.Lyrics);
  if(lyricsHtml) {
      lyricsHtml = lyricsHtml.replace(/>\s+</g, '><');
      container.innerHTML = lyricsHtml;
  } else {
      container.innerHTML = `<div style="text-align:center; color:rgba(255,255,255,0.7); margin-top:50px;">ไม่มีข้อมูลเนื้อเพลง</div>`;
  }
}

function toggleAudio() {
  const playBtn = document.getElementById('btn-play-pause');
  if(!songAudioEl.src) return;
  if(songAudioEl.paused) { songAudioEl.play().then(() => { playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; }); } 
  else { songAudioEl.pause(); playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; }
}

function toggleMusicAudio() {
  if(!currentPlayingSongId && musicPlaylist.length > 0) { playMusicIndex(0); return; }
  const playBtn = document.getElementById('btn-music-play-pause'); const coverImg = document.getElementById('music-cover-img'); const cdIcon = document.getElementById('music-indicator-icon');
  if(!songAudioEl.src) return;
  
  if(songAudioEl.paused) {
    songAudioEl.play().then(() => { 
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; coverImg.classList.add('spin-slow');
        if(cdIcon) cdIcon.classList.add('fa-spin'); renderMusicList();
    });
  } else {
    songAudioEl.pause(); playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; coverImg.classList.remove('spin-slow');
    if(cdIcon) cdIcon.classList.remove('fa-spin'); renderMusicList();
  }
}

function playMusicNext(isAuto = false) {
  if(musicPlaylist.length === 0) return;
  let currentIndex = musicPlaylist.findIndex(s => s.ID === currentPlayingSongId);
  
  if(isAuto && isRepeat) { 
      if(currentIndex >= 0) playMusicIndex(currentIndex); 
      return; 
  }
  
  let nextIdx = currentIndex + 1;
  if(isShuffle) { 
      nextIdx = Math.floor(Math.random() * musicPlaylist.length); 
  } else if(nextIdx >= musicPlaylist.length || currentIndex === -1) { 
      nextIdx = 0; 
  }
  playMusicIndex(nextIdx);
}

function playMusicPrev() {
  if(musicPlaylist.length === 0) return;
  let currentIndex = musicPlaylist.findIndex(s => s.ID === currentPlayingSongId);
  let prevIdx = currentIndex - 1;
  if(prevIdx < 0 || currentIndex === -1) prevIdx = musicPlaylist.length - 1;
  playMusicIndex(prevIdx);
}

function toggleMusicShuffle() {
  isShuffle = !isShuffle;
  document.getElementById('btn-music-shuffle').style.color = isShuffle ? 'var(--primary)' : 'var(--text-muted)';
}
function toggleMusicRepeat() {
  isRepeat = !isRepeat;
  document.getElementById('btn-music-repeat').style.color = isRepeat ? 'var(--primary)' : 'var(--text-muted)';
}

function seekAudio(e) {
  if(!songAudioEl.src || isNaN(songAudioEl.duration) || songAudioEl.duration === Infinity) return;
  const track = e.currentTarget;
  const clickX = e.clientX - track.getBoundingClientRect().left;
  songAudioEl.currentTime = (clickX / track.getBoundingClientRect().width) * songAudioEl.duration;
}

function seekMusicAudio(e) {
  if(!songAudioEl.src || isNaN(songAudioEl.duration) || songAudioEl.duration === Infinity) return;
  const track = e.currentTarget;
  const clickX = e.clientX - track.getBoundingClientRect().left;
  songAudioEl.currentTime = (clickX / track.getBoundingClientRect().width) * songAudioEl.duration;
}

if(songAudioEl) {
  songAudioEl.addEventListener('loadedmetadata', () => {
    if(!isNaN(songAudioEl.duration) && songAudioEl.duration !== Infinity) {
      let mins = Math.floor(songAudioEl.duration / 60); let secs = Math.floor(songAudioEl.duration % 60);
      if(secs < 10) secs = '0' + secs;
      document.getElementById('audio-time').innerText = '0:00 / ' + mins + ':' + secs;
      document.getElementById('music-time-total').innerText = mins + ':' + secs;
    }
  });

  songAudioEl.addEventListener('timeupdate', () => {
    if(isNaN(songAudioEl.duration) || songAudioEl.duration === Infinity) return;
    const percent = (songAudioEl.currentTime / songAudioEl.duration) * 100;
    
    const fillEl = document.getElementById('audio-fill'); if(fillEl) fillEl.style.width = percent + '%';
    
    let curMins = Math.floor(songAudioEl.currentTime / 60); let curSecs = Math.floor(songAudioEl.currentTime % 60);
    if(curSecs < 10) curSecs = '0' + curSecs;
    let totalMins = Math.floor(songAudioEl.duration / 60); let totalSecs = Math.floor(songAudioEl.duration % 60);
    if(totalSecs < 10) totalSecs = '0' + totalSecs;
    
    const timeEl = document.getElementById('audio-time'); if(timeEl) timeEl.innerText = curMins + ':' + curSecs + ' / ' + totalMins + ':' + totalSecs;

    const mFillEl = document.getElementById('music-time-fill'); if(mFillEl) mFillEl.style.width = percent + '%';
    const mCurEl = document.getElementById('music-time-current'); if(mCurEl) mCurEl.innerText = curMins + ':' + curSecs;
  });

  songAudioEl.addEventListener('ended', () => {
    document.getElementById('btn-play-pause').innerHTML = '<i class="fa-solid fa-play"></i>';
    document.getElementById('audio-fill').style.width = '0%';
    document.getElementById('audio-time').innerText = '0:00';
    
    document.getElementById('btn-music-play-pause').innerHTML = '<i class="fa-solid fa-play"></i>';
    const coverImg = document.getElementById('music-cover-img'); if(coverImg) coverImg.classList.remove('spin-slow');
    const cdIcon = document.getElementById('music-indicator-icon'); if(cdIcon) cdIcon.classList.remove('fa-spin');
    
    if(isMusicPlayerActive && musicPlaylist.length > 0) { playMusicNext(true); }
  });
}
