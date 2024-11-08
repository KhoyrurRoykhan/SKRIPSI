import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const LeftRight = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='mt-3'>Turtle Left & Right</h1>

      <h3>Tujuan Pembelajaran</h3>
      <ul>
        <li>Memahami cara mengendalikan arah gerakan turtle menggunakan <code>left()</code> dan <code>right()</code>.</li>
        <li>Memahami rotasi kiri dan kanan pada turtle.</li>
      </ul>

      <hr />

      <h2>Definisi Turtle <code>left()</code> dan <code>right()</code></h2>
      <p>
        Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>left()</code> dan <code>right()</code> digunakan
        untuk memutar arah gerakan turtle berdasarkan sudut derajat yang diberikan, tanpa harus memindahkan posisinya.
        Ini berguna untuk mengatur arah turtle sebelum melanjutkan dengan perintah lainnya, seperti menggambar atau bergerak.
      </p>

      <h4>Fungsi:</h4>
      <h5>1. <code>left(derajat)</code></h5>
      <p>Memutar arah turtle berlawanan arah jarum jam (kiri) sebesar derajat yang ditentukan.</p>
      <pre>
        <code>
          {`import turtle

t = turtle.Turtle()

# Putar turtle ke kiri sejauh 90 derajat
t.left(90)

# Putar lagi ke kiri sejauh 45 derajat
t.left(45)

turtle.done()`}
        </code>
      </pre>

      <h5>2. <code>right(derajat)</code></h5>
      <p>Memutar arah turtle searah jarum jam (kanan) sebesar derajat yang ditentukan.</p>
      <pre>
        <code>
          {`import turtle

t = turtle.Turtle()

# Putar turtle ke kanan sejauh 90 derajat
t.right(90)

# Putar lagi ke kanan sejauh 45 derajat
t.right(45)

turtle.done()`}
        </code>
      </pre>

      <hr />

      <h2>Contoh Penggunaan Gabungan <code>left()</code> dan <code>right()</code></h2>
      <p>
        Anda bisa mengombinasikan kedua perintah ini untuk membuat pola rotasi tanpa menggerakkan turtle maju.
        Misalnya, jika ingin memutar turtle ke kiri 90 derajat lalu kembali ke posisi semula dengan memutar ke kanan:
      </p>
      <pre>
        <code>
          {`import turtle

t = turtle.Turtle()

# Putar ke kiri sejauh 90 derajat
t.left(90)

# Putar ke kanan sejauh 90 derajat
t.right(90)

turtle.done()`}
        </code>
      </pre>

      <h3>Penggunaan Tambahan</h3>
      <p>
        Meskipun <code>left()</code> dan <code>right()</code> biasanya dikombinasikan dengan perintah lain seperti
        <code>forward()</code> untuk menggambar, perintah ini juga bisa digunakan secara mandiri untuk mengatur sudut
        atau arah dari turtle sesuai dengan kebutuhan.
      </p>

      <hr />

      <h2>Kesimpulan</h2>
      <p>
        Perintah <code>left()</code> dan <code>right()</code> dalam pustaka <strong>Turtle Graphics</strong> memungkinkan
        pengaturan arah gerakan turtle dengan rotasi ke kiri atau ke kanan berdasarkan derajat yang ditentukan.
        Perintah ini sangat berguna untuk kontrol arah sebelum melakukan perintah lain dalam pembuatan gambar atau pola.
      </p>

      {/* Embedding Trinket */}
      <div style={{ position: 'relative', paddingBottom: '28%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#ccc', marginBottom: '20px' }}>
          <iframe src="https://trinket.io/embed/python/33e5c3b81b" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>
        </div>

      <hr />

      <h2>Kuis</h2>
      <p>Apa yang dilakukan perintah <code>t.right(90)</code>?</p>
      <ul>
        <li>[ ] Memutar turtle ke kiri sebesar 90 derajat</li>
        <li>[ ] Memutar turtle ke kanan sebesar 90 derajat</li>
        <li>[ ] Menggerakkan turtle ke arah kanan sejauh 90 unit</li>
        <li>[ ] Menggerakkan turtle ke kanan tanpa memutar</li>
      </ul>
    </div>
    </div>
  )
}

export default LeftRight
