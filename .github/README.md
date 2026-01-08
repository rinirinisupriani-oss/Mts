```markdown
Panduan singkat pemasangan & pengujian

1) Struktur file — letakkan semua file di satu folder:
   - index.html
   - visi-misi.html
   - prestasi.html
   - syarat.html
   - spp.html
   - beasiswa.html
   - kelebihan.html
   - alamat.html
   - style.css
   - script.js
   - emailjs-templates.md
   - README.md
   - images/hero-sekolah.jpg (ganti dengan foto sekolah)
   - images/foto-sekolah.jpg (ganti dengan foto sekolah)
   - favicon.ico (opsional)

2) Konfigurasi EmailJS:
   - Daftar / masuk ke https://www.emailjs.com
   - Tambahkan service (mis. Gmail/SMTP) → catat SERVICE ID (contoh: service_xxx)
   - Buat 2 template email (contact_form_template & beasiswa_form_template) → catat TEMPLATE ID
   - Salin Public Key (user_xxx) dari Integration / dashboard
   - Buka script.js → ganti EMAILJS_CONFIG sesuai nilai Anda:
     SERVICE_ID, TEMPLATE_ID_CONTACT, TEMPLATE_ID_BEASISWA, PUBLIC_KEY

3) Upload / jalankan:
   - Untuk pengujian lokal gunakan server simple:
     - VS Code: Live Server extension
     - Atau Python simple server: `python -m http.server 8000` lalu buka http://localhost:8000
   - Jangan buka file langsung via file:// karena CDN bisa diblokir.

4) Uji pengiriman:
   - Isi form Kontak dan klik Kirim → periksa notifikasi sukses / error
   - Jika sukses, periksa inbox/spam myalgmotion@gmail.com
   - Jika error, buka DevTools → Console / Network untuk melihat pesan

5) Jika butuh, saya bisa:
   - Membuat file zip dari semua file (saya berikan konten; Anda perlu buat zip di komputer)
   - Membantu debug bila muncul pesan error (salin pesan Console atau Network response)