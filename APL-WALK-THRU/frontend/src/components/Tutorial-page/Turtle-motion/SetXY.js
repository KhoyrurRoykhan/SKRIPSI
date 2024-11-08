import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const SetXY = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='mt-3'>Turtle Setx & Sety</h1>

        <h3>Prasyarat</h3>
        <p>Pemahaman dasar tentang pemrograman Python.</p>

        <h3>Tujuan Pembelajaran</h3>
        <ul>
          <li>Memahami cara mengatur posisi turtle pada sumbu x dan y secara terpisah menggunakan <code>setx()</code> dan <code>sety()</code>.</li>
          <li>Memahami koordinat kartesius dalam ruang gambar Turtle Graphics.</li>
        </ul>

        <hr />

        <h2>Definisi Turtle <code>setx()</code> dan <code>sety()</code></h2>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>setx()</code> dan <code>sety()</code> digunakan untuk memindahkan turtle ke posisi tertentu hanya pada sumbu x atau sumbu y, tanpa mengubah koordinat lainnya. Perintah ini berguna untuk memindahkan turtle secara horizontal atau vertikal.
        </p>

        <h4>Fungsi:</h4>
        <h5>1. <code>setx(x)</code></h5>
        <p>Memindahkan turtle ke posisi x yang ditentukan, tanpa mengubah posisi pada sumbu y. Jika pena (pen) aktif, turtle akan menggambar jalur dari posisi sebelumnya ke posisi baru.</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke posisi x = 100, tanpa mengubah posisi y
t.setx(100)

turtle.done()`}
          </code>
        </pre>

        <h5>2. <code>sety(y)</code></h5>
        <p>Memindahkan turtle ke posisi y yang ditentukan, tanpa mengubah posisi pada sumbu x. Jika pena aktif, jalur akan tergambar.</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke posisi y = 150, tanpa mengubah posisi x
t.sety(150)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Contoh Penggunaan Gabungan <code>setx()</code> dan <code>sety()</code></h2>
        <p>
          Anda dapat menggunakan kedua perintah ini untuk memindahkan turtle ke posisi tertentu dengan mengatur koordinat x dan y secara terpisah. Misalnya, untuk memindahkan turtle secara horizontal lalu vertikal:
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke posisi x = 100
t.setx(100)

# Pindahkan turtle ke posisi y = 200
t.sety(200)

turtle.done()`}
          </code>
        </pre>

        <h3>Menggunakan <code>penup()</code> dan <code>pendown()</code></h3>
        <p>
          Seperti <code>setposition()</code>, perintah <code>setx()</code> dan <code>sety()</code> juga sering digunakan bersama dengan <code>penup()</code> dan <code>pendown()</code> untuk memindahkan turtle tanpa menggambar jalur.
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Angkat pena untuk berpindah tanpa menggambar
t.penup()
t.setx(-50)
t.sety(50)

# Turunkan pena untuk mulai menggambar
t.pendown()
t.setx(50)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Perintah <code>setx()</code> dan <code>sety()</code> dalam pustaka <strong>Turtle Graphics</strong> digunakan untuk memindahkan turtle secara horizontal atau vertikal tanpa mengubah koordinat lainnya. Perintah ini berguna untuk memindahkan turtle ke posisi yang diinginkan dengan lebih fleksibel, terutama saat mengatur pola atau jalur yang spesifik.
        </p>

        {/* Embedding Trinket */}
        <div style={{ position: 'relative', paddingBottom: '28%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#ccc', marginBottom: '20px' }}>
          <iframe src="https://trinket.io/embed/python/33e5c3b81b" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>
        </div>

        <hr />

        <hr />

        <h2>Kuis</h2>
        <p>Apa yang dilakukan perintah <code>t.sety(75)</code> jika pena aktif?</p>
        <ul>
          <li>[ ] Memindahkan turtle ke posisi y = 75 dan menggambar jalur</li>
          <li>[ ] Memutar turtle ke kiri sejauh 75 derajat</li>
          <li>[ ] Memindahkan turtle ke posisi x = 75</li>
          <li>[ ] Menghapus jalur yang sudah digambar sebelumnya</li>
        </ul>
      </div>
    </div>
  )
}

export default SetXY
