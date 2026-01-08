// script.js — pengaturan interaksi, loader EmailJS yang robust, validasi ringan, pengiriman form
// PENTING: Ganti nilai di bawah ini dengan value dari EmailJS Anda
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxx',               // ganti dengan SERVICE ID Anda
  TEMPLATE_ID_CONTACT: 'template_contact', // ganti dengan TEMPLATE ID untuk form kontak
  TEMPLATE_ID_BEASISWA: 'template_beasiswa',// ganti dengan TEMPLATE ID untuk form beasiswa
  PUBLIC_KEY: 'user_xxx'                   // ganti dengan PUBLIC KEY (user_xxx)
};

// ---------------- UI dasar ----------------
document.addEventListener('DOMContentLoaded', function () {
  // Tahun footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle untuk mobile
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Smooth scroll untuk anchor links internal
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });
});

// ---------------- Helper UI ----------------
function showAlert(message, type = 'success', timeout = 5000) {
  const div = document.createElement('div');
  div.className = `alert ${type === 'success' ? 'success' : 'error'}`;
  div.setAttribute('role', 'status');
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.classList.add('visible'), 10);
  setTimeout(() => {
    div.classList.remove('visible');
    setTimeout(() => div.remove(), 300);
  }, timeout);
}

// ---------------- Validasi sederhana ----------------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[0-9+\-\s]{6,20}$/.test(phone);
}

// ---------------- EmailJS Loader & Init ----------------
(function loadEmailJsAndInit(cfg, callback) {
  const CDN = 'https://cdn.emailjs.com/dist/email.min.js';

  function init() {
    if (window.emailjs && cfg.PUBLIC_KEY && cfg.PUBLIC_KEY !== 'user_xxx') {
      try {
        emailjs.init(cfg.PUBLIC_KEY);
        console.log('EmailJS diinisialisasi');
        if (typeof callback === 'function') callback(null);
      } catch (err) {
        console.error('Gagal inisialisasi EmailJS:', err);
        if (typeof callback === 'function') callback(err);
      }
    } else if (!window.emailjs) {
      if (typeof callback === 'function') callback(new Error('sdk_not_loaded'));
    } else {
      if (typeof callback === 'function') callback(new Error('invalid_public_key'));
    }
  }

  if (!window.emailjs) {
    // coba muat script CDN
    const s = document.createElement('script');
    s.src = CDN;
    s.onload = init;
    s.onerror = function () {
      console.error('Gagal memuat CDN EmailJS. Periksa koneksi atau CSP.');
      if (typeof callback === 'function') callback(new Error('load_error'));
    };
    document.head.appendChild(s);
    // tambahan: cek berkala sampai SDK siap (max 6 detik)
    let attempts = 0;
    const iv = setInterval(() => {
      attempts++;
      if (window.emailjs) {
        clearInterval(iv);
        init();
      } else if (attempts > 60) {
        clearInterval(iv);
        console.warn('EmailJS SDK tidak tersedia setelah menunggu.');
      }
    }, 100);
  } else {
    init();
  }
})(EMAILJS_CONFIG, function (err) {
  if (err) {
    console.warn('EmailJS belum siap:', err.message || err);
  } else {
    console.log('EmailJS siap digunakan.');
  }
  // Setelah loader dijalankan, daftarkan handler form (handler tidak bergantung penuh pada sukses init,
  // karena saat pengiriman kita akan cek ketersediaan emailjs lagi)
  attachFormHandlers();
});

// ---------------- Form handler & pengiriman ----------------
function attachFormHandlers() {
  // Kontak
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.elements['name'] ? contactForm.elements['name'].value.trim() : '';
      const email = contactForm.elements['email'] ? contactForm.elements['email'].value.trim() : '';
      const phone = contactForm.elements['phone'] ? contactForm.elements['phone'].value.trim() : '';
      const message = contactForm.elements['message'] ? contactForm.elements['message'].value.trim() : '';

      if (!name || !email || !phone) {
        showAlert('Nama, email, dan nomor telepon wajib diisi.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showAlert('Format email tidak valid.', 'error');
        return;
      }
      if (!isValidPhone(phone)) {
        showAlert('Format nomor telepon tidak valid.', 'error');
        return;
      }

      const templateParams = {
        to_email: 'myalgmotion@gmail.com',
        name,
        email,
        phone,
        message
      };

      if (window.emailjs && EMAILJS_CONFIG.SERVICE_ID !== 'service_xxx' && EMAILJS_CONFIG.TEMPLATE_ID_CONTACT !== 'template_contact') {
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_CONTACT, templateParams)
          .then(() => {
            showAlert('Pesan berhasil dikirim. Terima kasih telah menghubungi kami.', 'success');
            contactForm.reset();
          })
          .catch((error) => {
            console.error('Gagal mengirim pesan:', error);
            showAlert('Gagal mengirim pesan. Silakan coba lagi nanti atau hubungi email langsung: myalgmotion@gmail.com', 'error');
          });
      } else {
        showAlert('Layanan email tidak tersedia (EmailJS belum dikonfigurasi). Silakan hubungi: myalgmotion@gmail.com', 'error');
      }
    });
  }

  // Beasiswa
  const beasiswaForm = document.getElementById('beasiswa-form');
  if (beasiswaForm) {
    beasiswaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const student_name = beasiswaForm.elements['student_name'] ? beasiswaForm.elements['student_name'].value.trim() : '';
      const nik = beasiswaForm.elements['nik'] ? beasiswaForm.elements['nik'].value.trim() : '';
      const parent_name = beasiswaForm.elements['parent_name'] ? beasiswaForm.elements['parent_name'].value.trim() : '';
      const rekening = beasiswaForm.elements['rekening'] ? beasiswaForm.elements['rekening'].value.trim() : '';
      const address = beasiswaForm.elements['address'] ? beasiswaForm.elements['address'].value.trim() : '';

      if (!student_name || !nik || !parent_name || !rekening || !address) {
        showAlert('Semua kolom formulir beasiswa wajib diisi.', 'error');
        return;
      }
      if (!/^[0-9]+$/.test(nik) || nik.length < 10) {
        showAlert('NIK sebaiknya berupa angka penuh (minimal 10 digit).', 'error');
        return;
      }
      if (!/^[0-9]{6,}$/.test(rekening)) {
        showAlert('Nomor rekening tidak valid (minimal 6 digit angka).', 'error');
        return;
      }

      const templateParams = {
        to_email: 'myalgmotion@gmail.com',
        student_name,
        nik,
        parent_name,
        rekening,
        address
      };

      if (window.emailjs && EMAILJS_CONFIG.SERVICE_ID !== 'service_xxx' && EMAILJS_CONFIG.TEMPLATE_ID_BEASISWA !== 'template_beasiswa') {
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_BEASISWA, templateParams)
          .then(() => {
            showAlert('Permohonan beasiswa berhasil dikirim. Kami akan menghubungi Anda.', 'success');
            beasiswaForm.reset();
          })
          .catch((error) => {
            console.error('Gagal mengirim permohonan beasiswa:', error);
            showAlert('Gagal mengirim permohonan. Silakan coba lagi nanti atau hubungi: myalgmotion@gmail.com', 'error');
          });
      } else {
        showAlert('Layanan email tidak tersedia (EmailJS belum dikonfigurasi). Silakan hubungi: myalgmotion@gmail.com', 'error');
      }
    });
  }
}