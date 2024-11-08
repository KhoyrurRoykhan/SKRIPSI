import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const SetPosition = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='mt-3'>Turtle Setposition</h1>

        <h3>Prasyarat</h3>
        <p>Pemahaman dasar tentang pemrograman Python.</p>

        <h3>Tujuan Pembelajaran</h3>
        <ul>
          <li>Memahami cara mengatur posisi turtle secara langsung menggunakan <code>setposition()</code> atau <code>setpos()</code>.</li>
          <li>Memahami koordinat kartesius dalam ruang gambar Turtle Graphics.</li>
        </ul>

        <hr />

        <h2>Definisi Turtle <code>setposition()</code> atau <code>setpos()</code></h2>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>setposition()</code> (bisa juga disingkat <code>setpos()</code>) digunakan untuk memindahkan turtle ke titik tertentu dalam ruang gambar, berdasarkan koordinat yang ditentukan. Saat perintah ini digunakan, turtle akan menggambar jalur dari posisi sebelumnya ke posisi baru.
        </p>

        <h4>Fungsi:</h4>
        <p><code>setposition(x, y)</code> atau <code>setpos(x, y)</code>: Memindahkan turtle ke koordinat <code>(x, y)</code> yang ditentukan dalam ruang gambar. Jalur yang digambar tergantung pada apakah pena (pen) sedang aktif atau tidak. Jika pena aktif, jalur akan tergambar; jika tidak, hanya turtle yang berpindah.</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke koordinat (100, 100)
t.setposition(100, 100)

# Pindahkan ke koordinat (-50, 50)
t.setposition(-50, 50)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Contoh Penggunaan Setposition untuk Membentuk Pola</h2>
        <p>
          Anda dapat menggunakan <code>setposition()</code> untuk menggambar pola dengan mengatur beberapa titik koordinat. Misalnya, membuat segitiga dengan menentukan tiga titik:
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke titik pertama
t.setposition(100, 0)

# Pindahkan ke titik kedua
t.setposition(50, 100)

# Kembali ke titik awal
t.setposition(0, 0)

turtle.done()`}
          </code>
        </pre>

        <h3>Menggunakan <code>penup()</code> dan <code>pendown()</code></h3>
        <p>
          Perintah <code>setposition()</code> sering digunakan bersamaan dengan <code>penup()</code> dan <code>pendown()</code>. Jika Anda ingin memindahkan turtle ke posisi baru tanpa menggambar jalur, gunakan <code>penup()</code> untuk mengangkat pena, lalu <code>pendown()</code> untuk menurunkan pena jika ingin mulai menggambar lagi.
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Angkat pena untuk berpindah tanpa menggambar
t.penup()
t.setposition(150, 150)

# Turunkan pena untuk mulai menggambar
t.pendown()
t.setposition(0, 0)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Perintah <code>setposition()</code> atau <code>setpos()</code> dalam pustaka <strong>Turtle Graphics</strong> memungkinkan Anda memindahkan turtle ke koordinat tertentu dalam ruang gambar. Perintah ini sangat berguna untuk mengatur posisi awal turtle atau membuat jalur menggambar yang kompleks dengan mengombinasikan pergerakan dan kontrol pena.
        </p>

        {/* Embedding Trinket */}
        <div style={{ position: 'relative', paddingBottom: '28%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#ccc', marginBottom: '20px' }}>
          <iframe src="https://trinket.io/embed/python/33e5c3b81b" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>
        </div>

        <hr />

        <h2>Kuis</h2>
        <p>Apa yang dilakukan perintah <code>t.setposition(-100, 50)</code> jika pena aktif?</p>
        <ul>
          <li>[ ] Memutar turtle ke kiri sejauh 50 derajat</li>
          <li>[ ] Memindahkan turtle ke koordinat (-100, 50) tanpa menggambar</li>
          <li>[ ] Memindahkan turtle ke koordinat (-100, 50) dan menggambar jalur</li>
          <li>[ ] Menghapus jalur yang sudah digambar sebelumnya</li>
        </ul>
      </div>
    </div>
  )
}

export default SetPosition
