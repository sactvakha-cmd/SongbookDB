const API_URL = "https://akhasongbook-api.sactvakha.workers.dev";
let adminPassword = "";
let allSongs = [];
let allUsers = [];
let currentAdminView = 'dashboard';
let adminScrollPositions = {};

window.onload = () => {
  const savedCat = sessionStorage.getItem('adminCatTemp');
  if(savedCat) { currentAdminCategory = savedCat; }

  const savedPass = sessionStorage.getItem('adminPassTemp');
  if(savedPass) { adminPassword = savedPass; fetchAllData(); } 
  else { document.getElementById('loader').classList.add('hidden'); document.getElementById('view-login').classList.remove('hidden'); }
};

async function fetchAPI(action, params = {}) {
  const payload = { action: action, password: adminPassword, ...params };
  try {
    const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(payload) });
    const data = await response.json();
    if(data.status === 'error' && data.msg === 'รหัสผ่านผู้ดูแลระบบไม่ถูกต้อง') { logout(); throw new Error(data.msg); }
    return data;
  } catch (error) { throw error; }
}

function loginAdmin() {
  const pass = document.getElementById('admin-pass').value;
  if(!pass) return;
  document.getElementById('loader').classList.remove('hidden');
  adminPassword = pass;
  fetchAPI('getAllUsers') 
  .then(res => {
    if(res.status === 'success') {
      sessionStorage.setItem('adminPassTemp', pass);
      fetchAllData();
    } else {
      showToast(res.msg, "error"); document.getElementById('loader').classList.add('hidden'); adminPassword = "";
    }
  }).catch(e => { showToast(e.message, "error"); document.getElementById('loader').classList.add('hidden'); adminPassword = ""; });
}

function fetchAllData() {
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('loader-text').innerText = "กำลังโหลดข้อมูลระบบ...";
  document.getElementById('view-login').classList.add('hidden');
  
  Promise.all([
    fetchAPI('getAllUsers'), 
    fetchAPI('getAllSongsAdmin') 
  ]).then(results => {
      const resUsers = results[0];
      const resSongs = results[1];
      
      if(resUsers.status === 'success') allUsers = resUsers.users || [];
      if(resSongs.status === 'success') {
        allSongs = resSongs.songs || [];
        allSongs.sort((a, b) => (a.ID || "").localeCompare((b.ID || "")));
      }
      
      showToast("เข้าสู่ระบบแอดมินสำเร็จ");
      document.getElementById('app').classList.remove('hidden');
      document.getElementById('main-bottom-nav').classList.remove('hidden');
      switchView('dashboard');
      document.getElementById('loader').classList.add('hidden');
      
      filterAdminCat(currentAdminCategory);
  }).catch(err => {
      showToast("โหลดข้อมูลล้มเหลว: " + err.message, "error");
      document.getElementById('loader').classList.add('hidden');
  });
}

function updateBottomNav(view) {
  const nav = document.getElementById('main-bottom-nav');
  nav.classList.add('justify-center');
  nav.innerHTML = `
    <div class="nav-item ${view==='dashboard'||view==='admin-form'?'active':''}" onclick="switchView('dashboard')"><i class="fa-solid fa-music"></i><span>จัดการเพลง</span></div>
    <div class="nav-item ${view==='users'||view==='user-form'?'active':''}" onclick="switchView('users')"><i class="fa-solid fa-users"></i><span>จัดการผู้ใช้</span></div>
    <div class="nav-item" onclick="logout()" style="color:var(--danger)"><i class="fa-solid fa-right-from-bracket"></i><span>ออกระบบ</span></div>
  `;
}

function switchView(view) {
  adminScrollPositions[currentAdminView] = window.scrollY;

  ['view-dashboard', 'view-admin-form', 'view-users', 'view-user-form'].forEach(v => document.getElementById(v).classList.add('hidden'));
  document.getElementById('view-' + view).classList.remove('hidden');
  
  updateBottomNav(view);
  if(view === 'dashboard') filterAdminCat(currentAdminCategory);
  if(view === 'users') renderUsers();

  if (view === 'admin-form' || view === 'user-form') {
    window.scrollTo(0, 0);
  } else {
    setTimeout(() => {
      window.scrollTo(0, adminScrollPositions[view] || 0);
    }, 10);
  }

  currentAdminView = view;
}

function logout() { sessionStorage.removeItem('adminPassTemp'); location.reload(); }

let currentAdminCategory = 'ALL';
function filterAdminCat(cat) {
  currentAdminCategory = cat;
  sessionStorage.setItem('adminCatTemp', cat);
  document.querySelectorAll('.admin-cat-btn').forEach(btn => {
    btn.classList.remove('active');
    if(btn.getAttribute('data-cat') === cat) btn.classList.add('active');
  });
  renderSongs();
}

function renderSongs() {
  const q = document.getElementById('song-search').value.toLowerCase();
  const results = allSongs.filter(s => {
    const matchSearch = (s.Title||"").toLowerCase().includes(q) || (s.ID||"").toLowerCase().includes(q);
    const matchCat = (currentAdminCategory === 'ALL') || (s.Category === currentAdminCategory);
    return matchSearch && matchCat;
  });
  document.getElementById('song-list').innerHTML = results.map(s => `
    <div class="song-item">
      <div class="s-id">${s.ID}</div>
      <div class="s-info"><div class="s-title">${s.Title||'-'}</div><div class="s-meta">${s.Category} | 🎧 ฟัง ${s.PlayCount || 0} ครั้ง</div></div>
      <div class="quick-actions">
        <button class="btn-quick edit" onclick="openAdminForm('${s.ID}')"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-quick del" onclick="deleteSong('${s.ID}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}
function searchSongs() { renderSongs(); }

function openAdminForm(id = null) {
  const editorOld = document.getElementById('form-lyrics-old'); const editorNew = document.getElementById('form-lyrics-new');
  if(id) {
    const s = allSongs.find(x => x.ID === id);
    document.getElementById('form-id').value = s.ID; document.getElementById('form-cat').value = s.Category; document.getElementById('form-title').value = s.Title; document.getElementById('form-eng-title').value = s.EnglishTitle || ""; document.getElementById('form-author').value = s.Author || ""; document.getElementById('form-chords').value = s.Chords || ""; document.getElementById('form-notation').value = s.Notation || ""; document.getElementById('form-audio').value = s.AudioUrl || ""; document.getElementById('form-link').value = s.ExternalLink || ""; document.getElementById('form-image').value = s.ImageUrl || ""; document.getElementById('form-inspiration').value = s.Inspiration || ""; 
    editorOld.innerHTML = s.Lyrics || ""; editorNew.innerHTML = s.LyricsNew || ""; document.getElementById('admin-title').innerText = "✏️ แก้ไข: " + s.ID;
  } else {
    document.getElementById('form-id').value = ""; document.getElementById('form-title').value = ""; editorOld.innerHTML = ""; editorNew.innerHTML = ""; document.getElementById('admin-title').innerText = "➕ เพิ่มเพลงใหม่";
    document.getElementById('form-audio').value = ""; document.getElementById('form-image').value = "";
    if(currentAdminCategory !== 'ALL') document.getElementById('form-cat').value = currentAdminCategory;
  }
  switchView('admin-form');
}

function saveSong() {
  const data = { ID: document.getElementById('form-id').value, Title: document.getElementById('form-title').value, Category: document.getElementById('form-cat').value, Language: "Akha", Author: document.getElementById('form-author').value, Chords: document.getElementById('form-chords').value, Lyrics: document.getElementById('form-lyrics-old').innerHTML, LyricsNew: document.getElementById('form-lyrics-new').innerHTML, Inspiration: document.getElementById('form-inspiration').value, Notation: document.getElementById('form-notation').value, AudioUrl: document.getElementById('form-audio').value, ExternalLink: document.getElementById('form-link').value, EnglishTitle: document.getElementById('form-eng-title').value, ImageUrl: document.getElementById('form-image').value };
  if(!data.Title) return showToast("กรอกชื่อเพลงด้วยครับ", "warning");
  document.getElementById('btn-save-top').disabled = true;
  fetchAPI('saveSong', { data: data }).then(res => {
    document.getElementById('btn-save-top').disabled = false;
    showToast(res.msg); setTimeout(() => location.reload(), 1000);
  }).catch(e => { showToast(e.message, "error"); document.getElementById('btn-save-top').disabled = false; });
}
function deleteSong(id) { if(confirm(`ลบเพลง ${id}?`)) { fetchAPI('deleteSong', { id: id }).then(res => { showToast(res.msg); location.reload(); }); } }

function switchAdminLyricView(type) {
  document.getElementById('btn-edit-lyric-old').classList.remove('active'); document.getElementById('btn-edit-lyric-new').classList.remove('active'); document.getElementById('btn-edit-lyric-'+type).classList.add('active');
  if(type === 'old') { 
    document.getElementById('form-lyrics-old').classList.remove('hidden'); document.getElementById('form-lyrics-new').classList.add('hidden'); 
  } else { 
    document.getElementById('form-lyrics-old').classList.add('hidden'); document.getElementById('form-lyrics-new').classList.remove('hidden'); 
  }
}

// ระบบจัดรูปแบบตัวอักษรและข้อความพื้นฐาน
function formatTextAdmin(command, value = null) {
  document.execCommand('styleWithCSS', false, true);
  document.execCommand(command, false, value);
  
  const editorOld = document.getElementById('form-lyrics-old');
  const editorNew = document.getElementById('form-lyrics-new');
  
  [editorOld, editorNew].forEach(editor => {
    if (!editor.classList.contains('hidden')) {
      const fontSizes = editor.querySelectorAll('font[size]');
      fontSizes.forEach(f => {
        const sizeMap = { '1':'0.85rem', '2':'1rem', '3':'1.2rem', '4':'1.5rem', '5':'1.8rem', '6':'2.2rem', '7':'2.8rem' };
        const span = document.createElement('span');
        span.style.fontSize = sizeMap[f.getAttribute('size')] || '1.2rem';
        span.innerHTML = f.innerHTML;
        f.replaceWith(span);
      });
      const fontFaces = editor.querySelectorAll('font[face]');
      fontFaces.forEach(f => {
        const span = document.createElement('span');
        span.style.fontFamily = f.getAttribute('face');
        span.innerHTML = f.innerHTML;
        f.replaceWith(span);
      });
    }
  });
  // นำโค้ดที่รีเซ็ต Dropdown ออก เพื่อให้ Dropdown โชว์ค่าที่เพิ่งเลือกค้างไว้
}

// ระบบจัดการขนาด (pt), บรรทัด และช่องไฟ แบบเจาะจง (Pages/Word Style)
function applyCustomStyle(property, value) {
  if (!value) return;
  
  const selection = window.getSelection();
  
  // ตรวจสอบว่าแอดมินคลุมดำข้อความหรือยัง
  if (!selection.rangeCount || selection.isCollapsed) {
    showToast("กรุณาคลุมดำข้อความที่ต้องการปรับรูปแบบก่อนครับ", "warning");
    // หากไม่ได้คลุมดำ ค่อยเคลียร์ค่าให้เป็นค่าว่างเพื่อเตือนแอดมิน
    const targetSelect = document.querySelector(`.editor-select[onchange*="${property}"]`);
    if(targetSelect) targetSelect.value = '';
    return;
  }

  let finalValue = value;
  if (property === 'fontSize') finalValue = value + 'pt';

  const marker = 'MARKER' + Date.now();
  document.execCommand('styleWithCSS', false, true);
  document.execCommand('fontName', false, marker);

  const activeEditor = document.getElementById('form-lyrics-old').classList.contains('hidden') ? 
                       document.getElementById('form-lyrics-new') : 
                       document.getElementById('form-lyrics-old');

  const elements = activeEditor.querySelectorAll(`font[face="${marker}"], span[style*="${marker}"]`);
  
  elements.forEach(el => {
    const span = document.createElement('span');
    
    if (el.tagName.toLowerCase() === 'span') {
        let css = el.style.cssText;
        css = css.replace(new RegExp(`font-family:\\s*["']?${marker}["']?;?`, 'gi'), '');
        span.style.cssText = css;
    }
    
    span.style[property] = finalValue;
    span.innerHTML = el.innerHTML;
    
    el.replaceWith(span);
  });
  // นำโค้ดที่รีเซ็ต Dropdown ออก เพื่อให้ Dropdown โชว์ค่าที่เพิ่งเลือกค้างไว้
}

function renderUsers() {
  const q = document.getElementById('user-search').value.toLowerCase();
  
  const results = allUsers.filter(u => {
    const phone = (u.Phone || "").toLowerCase();
    const name = (u.Name || "").toLowerCase();
    const exp = (u.ExpiryDate || "").toLowerCase();
    const status = (u.Status || "").toLowerCase();
    
    let statusThai = "";
    if (status === "pending_new") statusThai = "รอตรวจสอบ สมัครใหม่";
    else if (status === "pending_renew") statusThai = "รอตรวจสอบ ต่ออายุ";
    
    return phone.includes(q) || name.includes(q) || exp.includes(q) || status.includes(q) || statusThai.includes(q);
  });

  document.getElementById('user-list').innerHTML = results.map(u => {
    let isPending = u.Status === "pending_new" || u.Status === "pending_renew" || u.ExpiryDate === "รอตรวจสอบ" || !u.ExpiryDate;
    
    let statusText = `หมดอายุ: ${u.ExpiryDate}`;
    if (isPending) {
        if (u.Status === "pending_renew") {
            statusText = `รอตรวจสอบสลิป (ต่ออายุ) | เดิม: ${u.ExpiryDate !== "รอตรวจสอบ" ? u.ExpiryDate : '-'}`;
        } else {
            statusText = "รอตรวจสอบสลิป (สมัครใหม่)";
        }
    }
    
    let statusColor = isPending ? "#f59e0b" : "var(--primary)";
    let slip = u.SlipUrl ? `<a href="${u.SlipUrl}" target="_blank" style="color:#10b981; font-size:0.8rem; margin-left:5px;"><i class="fa-solid fa-image"></i> สลิป</a>` : '';
    return `<div class="song-item">
      <div class="s-info">
        <div class="s-title">${u.Name||'ไม่มีชื่อ'} <span style="font-size:0.8rem; color:var(--text-muted);">(รอบ: ${u.RenewCount||1})</span></div>
        <div class="s-eng-title"><i class="fa-solid fa-phone"></i> ${u.Phone} | <i class="fa-solid fa-key"></i> ${u.PIN}</div>
        <div class="s-meta" style="color:${statusColor}">${statusText} ${slip}</div>
      </div>
      <div class="quick-actions">
        <button class="btn-quick edit" onclick="openUserForm('${u.Phone}')"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-quick del" onclick="deleteUser('${u.Phone}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
  }).join('');
}
function searchUsers() { renderUsers(); }

function openUserForm(phone = null) {
  if(phone) { 
    let u = allUsers.find(x => x.Phone === phone);
    document.getElementById('form-user-is-edit').value = "true"; document.getElementById('form-user-phone').value = u.Phone; document.getElementById('form-user-phone').disabled = true; document.getElementById('form-user-pin').value = u.PIN; document.getElementById('form-user-name').value = u.Name || ""; document.getElementById('form-user-count').value = u.RenewCount || 1;
    if(u.ExpiryDate && u.ExpiryDate !== "รอตรวจสอบ") { let d = new Date(u.ExpiryDate); document.getElementById('form-user-expiry').value = d.toISOString().split('T')[0]; } else { document.getElementById('form-user-expiry').value = ""; }
    if(u.SlipUrl) { document.getElementById('form-user-slip-box').classList.remove('hidden'); document.getElementById('form-user-slip-link').href = u.SlipUrl; } else { document.getElementById('form-user-slip-box').classList.add('hidden'); }
    document.getElementById('user-form-title').innerText = "แก้ไข / อนุมัติ";
  } else { 
    document.getElementById('form-user-is-edit').value = "false"; document.getElementById('form-user-phone').value = ""; document.getElementById('form-user-phone').disabled = false; document.getElementById('form-user-pin').value = ""; document.getElementById('form-user-name').value = ""; document.getElementById('form-user-expiry').value = ""; document.getElementById('form-user-count').value = 1; document.getElementById('form-user-slip-box').classList.add('hidden'); document.getElementById('user-form-title').innerText = "เพิ่มผู้ใช้ใหม่";
  }
  switchView('user-form');
}

function addDaysToExpiry(days) {
  let v = document.getElementById('form-user-expiry').value; let d = v ? new Date(v) : new Date(); d.setDate(d.getDate() + days);
  document.getElementById('form-user-expiry').value = d.toISOString().split('T')[0];
}

function saveUser() {
  const d = { 
    Phone: document.getElementById('form-user-phone').value, 
    PIN: document.getElementById('form-user-pin').value, 
    Name: document.getElementById('form-user-name').value, 
    ExpiryDate: document.getElementById('form-user-expiry').value,
    RenewCount: parseInt(document.getElementById('form-user-count').value) || 1,
    Status: document.getElementById('form-user-expiry').value ? 'active' : 'pending_new'
  };
  fetchAPI('saveUser', { userData: d, isEdit: document.getElementById('form-user-is-edit').value === "true" }).then(res => { showToast(res.msg); setTimeout(() => location.reload(), 1000); });
}
function deleteUser(phone) { if(confirm(`ลบเบอร์ ${phone}?`)) { fetchAPI('deleteUser', { phone: phone }).then(res => { showToast(res.msg); location.reload(); }); } }

function showToast(msg, type="success") {
  const toast = document.getElementById('toast');
  toast.style.background = type === "error" ? "var(--danger)" : type === "warning" ? "#f59e0b" : "var(--primary)";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
}

async function uploadMedia(event, targetId, fileType) {
  const file = event.target.files[0];
  if(!file) return;
  showToast("กำลังอัปโหลดไฟล์...", "warning");
  
  const formData = new FormData();
  formData.append("action", "uploadAdminFile");
  formData.append("password", adminPassword);
  formData.append("fileType", fileType);
  formData.append("extension", file.name.split('.').pop());
  formData.append("file", file); 

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData 
    });
    const res = await response.json();
    
    if(res.status === 'success') {
      document.getElementById(targetId).value = res.url;
      showToast("อัปโหลดสำเร็จ!", "success");
    } else { showToast(res.msg, "error"); }
  } catch (err) { 
    showToast("อัปโหลดไม่สำเร็จ: " + err.message, "error"); 
  }
}

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let recordedBlob = null; 

async function toggleRecording() {
  try {
    const btn = document.getElementById('btn-record-audio');
    const icon = btn.querySelector('i');
    const previewBox = document.getElementById('audio-preview-box');
    
    previewBox.classList.add('hidden');
    document.getElementById('audio-preview-element').src = "";
    recordedBlob = null;
    
    if (!isRecording) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("เบราว์เซอร์ของคุณไม่รองรับการใช้งานไมค์ หรือไม่ได้เข้าใช้งานผ่าน HTTPS"); return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (typeof MediaRecorder === 'undefined') { alert("อุปกรณ์นี้ไม่รองรับระบบบันทึกเสียงครับ"); return; }

      let options = {};
      if (MediaRecorder.isTypeSupported('audio/webm')) { options = { mimeType: 'audio/webm' }; }
      else if (MediaRecorder.isTypeSupported('audio/mp4')) { options = { mimeType: 'audio/mp4' }; }

      mediaRecorder = new MediaRecorder(stream, options);
      audioChunks = [];
      mediaRecorder.start();
      isRecording = true;
      
      btn.style.background = "var(--danger)"; btn.classList.add('recording-pulse');
      icon.classList.remove('fa-microphone'); icon.classList.add('fa-stop');
      showToast("🔴 กำลังบันทึกเสียง... กดอีกครั้งเพื่อหยุด", "warning");

      mediaRecorder.addEventListener("dataavailable", event => { 
        if (event.data.size > 0) audioChunks.push(event.data); 
      });

      mediaRecorder.addEventListener("stop", () => {
        const mimeType = mediaRecorder.mimeType || 'audio/mp4'; 
        recordedBlob = new Blob(audioChunks, { type: mimeType });
        
        const audioUrl = URL.createObjectURL(recordedBlob);
        document.getElementById('audio-preview-element').src = audioUrl;
        
        previewBox.classList.remove('hidden');
        previewBox.style.display = "flex";
        
        showToast("หยุดบันทึกแล้ว กรุณาลองฟังและกดยืนยันอัปโหลด", "success");
        stream.getTracks().forEach(track => track.stop()); 
      });
    } else {
      if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
      isRecording = false;
      btn.style.background = "#ef4444"; btn.classList.remove('recording-pulse');
      icon.classList.remove('fa-stop'); icon.classList.add('fa-microphone');
    }
  } catch (err) { alert("ไม่สามารถเข้าถึงไมโครโฟนได้: " + err.message); }
}

async function uploadRecordedAudio() {
  if (!recordedBlob) {
    showToast("ไม่พบไฟล์เสียง กรุณาอัดใหม่", "error"); return;
  }
  
  showToast("กำลังอัปโหลดเสียง...", "warning");
  const ext = recordedBlob.type.includes('mp4') ? 'm4a' : recordedBlob.type.includes('webm') ? 'webm' : 'mp3';
  
  const formData = new FormData();
  formData.append("action", "uploadAdminFile");
  formData.append("password", adminPassword);
  formData.append("fileType", "audio");
  formData.append("extension", ext);
  formData.append("file", recordedBlob, "record." + ext); 

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });
    const res = await response.json();
    
    if(res.status === 'success') {
      document.getElementById('form-audio').value = res.url;
      showToast("อัปโหลดเสียงบันทึกสำเร็จ!", "success");
      document.getElementById('audio-preview-box').classList.add('hidden');
      document.getElementById('audio-preview-element').src = "";
    } else { showToast(res.msg, "error"); }
  } catch (err) {
    showToast("อัปโหลดไม่สำเร็จ: " + err.message, "error");
  }
}

function cancelRecordedAudio() {
  recordedBlob = null;
  document.getElementById('audio-preview-element').src = "";
  document.getElementById('audio-preview-box').classList.add('hidden');
  showToast("ลบเสียงชั่วคราวแล้ว สามารถกดอัดใหม่ได้เลย", "success");
}
