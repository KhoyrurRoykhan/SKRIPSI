import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const ForwardBackward = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='mt-3'>Turtle Forward & Backward</h1>

        <h3>Tujuan Pembelajaran</h3>
        <ul>
          <li>Memahami cara menggerakkan turtle ke depan dan ke belakang menggunakan <code>forward()</code> dan <code>backward()</code>.</li>
          <li>Memahami konsep gerakan linear pada turtle.</li>
        </ul>

        <hr />

        <h2>Definisi Turtle <code>forward()</code> dan <code>backward()</code></h2>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>forward()</code> dan <code>backward()</code> digunakan untuk menggerakkan turtle dalam arah tertentu, berdasarkan jarak yang ditentukan dalam satuan piksel (pixel). Gerakan ini dilakukan ke depan (searah arah yang sedang dihadapi turtle) atau ke belakang (berlawanan arah dengan yang sedang dihadapi turtle).
        </p>

        <h4>Fungsi:</h4>
        <h5>1. <code>forward(jarak)</code></h5>
        <p>Menggerakkan turtle ke depan sejauh jarak yang ditentukan (dalam piksel), dalam arah yang sedang dihadapi oleh turtle.</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Gerakkan turtle ke depan sejauh 100 piksel
t.forward(100)

turtle.done()`}
          </code>
        </pre>

        <h5>2. <code>backward(jarak)</code></h5>
        <p>Menggerakkan turtle ke belakang sejauh jarak yang ditentukan (dalam piksel), dalam arah berlawanan dengan arah yang sedang dihadapi oleh turtle.</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Gerakkan turtle ke belakang sejauh 50 piksel
t.backward(50)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h2>Contoh Penggunaan Gabungan <code>forward()</code> dan <code>backward()</code></h2>
        <p>
          Anda bisa mengombinasikan kedua perintah ini untuk membuat gerakan maju-mundur dengan mudah. Misalnya, untuk membuat turtle bergerak ke depan sejauh 150 piksel, lalu mundur kembali ke posisi awal:
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Gerakkan turtle ke depan sejauh 150 piksel
t.forward(150)

# Kembali ke posisi awal dengan mundur sejauh 150 piksel
t.backward(150)

turtle.done()`}
          </code>
        </pre>

        <h3>Penggunaan Tambahan</h3>
        <p>
          Perintah <code>forward()</code> dan <code>backward()</code> sering dikombinasikan dengan perintah rotasi seperti <code>left()</code> dan <code>right()</code> untuk membuat pola atau gambar yang lebih kompleks.
        </p>

        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Perintah <code>forward()</code> dan <code>backward()</code> dalam pustaka <strong>Turtle Graphics</strong> digunakan untuk menggerakkan turtle ke depan atau ke belakang sejauh jarak yang ditentukan dalam piksel. Kedua perintah ini sangat berguna untuk membentuk gambar dengan gerakan linear sebelum mengatur arah baru menggunakan perintah rotasi.
        </p>

        {/* Embedding Trinket */}
      <div style={{ position: 'relative', paddingBottom: '28%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#ccc', marginBottom: '20px' }}>
          <iframe src="https://trinket.io/embed/python/33e5c3b81b" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>
        </div>

        <hr />

        <h2>Kuis</h2>
        <p>Apa yang dilakukan perintah <code>t.forward(200)</code>?</p>
        <ul>
          <li>[ ] Menggerakkan turtle ke depan sejauh 200 piksel</li>
          <li>[ ] Memutar turtle ke kanan sejauh 200 derajat</li>
          <li>[ ] Memutar turtle ke kiri sejauh 200 derajat</li>
          <li>[ ] Menggerakkan turtle ke belakang sejauh 200 piksel</li>
        </ul>
      </div>
    </div>
  )
}

export default ForwardBackward
