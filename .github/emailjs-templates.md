```text
Panduan: isi template EmailJS (copy-paste)

1) Template: contact_form_template
   - Template ID: (catat setelah dibuat, mis. template_contact)
   - To: myalgmotion@gmail.com   (atau gunakan {{to_email}})
   - Subject: Pesan Kontak dari {{name}}
   - HTML body:
     <!DOCTYPE html>
     <html>
       <body>
         <p>Anda menerima pesan kontak dari website MTS Manbaul Ulum.</p>
         <ul>
           <li><strong>Nama:</strong> {{name}}</li>
           <li><strong>Email:</strong> {{email}}</li>
           <li><strong>Telepon:</strong> {{phone}}</li>
         </ul>
         <p><strong>Pesan:</strong></p>
         <p>{{message}}</p>
         <hr/>
         <p>— MTS Manbaul Ulum</p>
       </body>
     </html>

2) Template: beasiswa_form_template
   - Template ID: (catat setelah dibuat, mis. template_beasiswa)
   - To: myalgmotion@gmail.com   (atau gunakan {{to_email}})
   - Subject: Permohonan Beasiswa: {{student_name}}
   - HTML body:
     <!DOCTYPE html>
     <html>
       <body>
         <p>Anda menerima permohonan beasiswa melalui website MTS Manbaul Ulum.</p>
         <ul>
           <li><strong>Nama Siswa:</strong> {{student_name}}</li>
           <li><strong>NIK:</strong> {{nik}}</li>
           <li><strong>Nama Orang Tua / Wali:</strong> {{parent_name}}</li>
           <li><strong>Nomor Rekening:</strong> {{rekening}}</li>
           <li><strong>Alamat:</strong> {{address}}</li>
         </ul>
         <hr/>
         <p>— MTS Manbaul Ulum</p>
       </body>
     </html>

Catatan:
- Pastikan nama variabel di template sama persis dengan yang ada di script.js:
  Contact: to_email, name, email, phone, message
  Beasiswa: to_email, student_name, nik, parent_name, rekening, address
- Setelah membuat template, catat TEMPLATE ID dan masukkan di script.js.