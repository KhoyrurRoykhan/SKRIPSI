import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const Circle = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='mt-3'>Turtle Circle</h1>

        <h3>Prasyarat</h3>
        <p>Pemahaman dasar tentang pemrograman Python.</p>

        <h3>Tujuan Pembelajaran</h3>
        <ul>
          <li>Memahami cara menggambar lingkaran menggunakan <code>circle()</code>.</li>
          <li>Mengerti parameter yang digunakan dalam fungsi <code>circle()</code> untuk mengubah ukuran dan arah lingkaran.</li>
        </ul>

        <hr />

        <h2>Definisi Turtle <code>circle()</code></h2>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>circle()</code> digunakan untuk menggambar lingkaran atau bagian dari lingkaran (busur) dengan jari-jari tertentu. Fungsi ini sangat berguna untuk menggambar bentuk bulat dan pola yang melibatkan lingkaran.
        </p>

        <h4>Fungsi:</h4>
        <p><code>circle(jari_jari, extent=None)</code>: Menggambar lingkaran dengan jari-jari yang ditentukan. Parameter <code>extent</code> opsional dan digunakan untuk menggambar busur lingkaran. Jika <code>extent</code> tidak diberikan, maka lingkaran penuh akan digambar.</p>
        <ul>
          <li><strong>jari_jari</strong>: Jari-jari lingkaran yang ingin digambar.</li>
          <li><strong>extent</strong>: Sudut (dalam derajat) dari lingkaran yang ingin digambar. Jika tidak ada, menggambar lingkaran penuh (360 derajat).</li>
        </ul>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar lingkaran dengan jari-jari 50
t.circle(50)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Contoh Penggunaan <code>circle()</code></h2>
        <p>Berikut adalah contoh penggunaan <code>circle()</code> untuk menggambar lingkaran penuh dan busur:</p>

        <h3>Menggambar Lingkaran Penuh</h3>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar lingkaran penuh dengan jari-jari 100
t.circle(100)

turtle.done()`}
          </code>
        </pre>

        <h3>Menggambar Busur Lingkaran</h3>
        <p>Anda juga dapat menggambar busur dengan menentukan <code>extent</code>. Misalnya, untuk menggambar busur 180 derajat:</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar busur dengan jari-jari 50 dan 180 derajat
t.circle(50, 180)

turtle.done()`}
          </code>
        </pre>

        <h3>Menggambar Lingkaran dengan Posisi dan Arah Berbeda</h3>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke posisi tertentu
t.penup()
t.setposition(0, -100)  # Memindahkan turtle ke bawah
t.pendown()

# Menggambar lingkaran dengan jari-jari 100
t.circle(100)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Perintah <code>circle()</code> dalam pustaka <strong>Turtle Graphics</strong> memungkinkan Anda menggambar lingkaran atau busur dengan mudah. Dengan mengatur jari-jari dan opsi <code>extent</code>, Anda dapat menggambar berbagai bentuk bulat yang berbeda untuk memperkaya gambar atau pola yang Anda buat.
        </p>

        <hr />

        <h2>Kuis</h2>
        <p>Apa yang dilakukan perintah <code>t.circle(75, 180)</code>?</p>
        <ul>
          <li>[ ] Menggambar lingkaran penuh dengan jari-jari 75</li>
          <li>[ ] Menggambar busur lingkaran dengan jari-jari 75 dan sudut 180 derajat</li>
          <li>[ ] Menghapus lingkaran dengan jari-jari 75</li>
          <li>[ ] Mengganti arah turtle ke 180 derajat</li>
        </ul>
      </div>
    </div>
  )
}

export default Circle
