import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const Dot = () => {
  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 className='mt-3' style={{textAlign:'center'}}>Dot</h2>

        <hr/>

        <h4>Tujuan Pembelajaran</h4>
        <ul>
          <li>Memahami cara menggambar titik menggunakan <code>dot()</code>.</li>
          <li>Mengerti parameter yang digunakan dalam fungsi <code>dot()</code> untuk mengubah ukuran dan warna titik.</li>
        </ul>

        <hr />

        <h4>Definisi Turtle <code>dot()</code></h4>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>dot()</code> digunakan untuk menggambar titik pada posisi turtle saat ini. Titik ini dapat diatur ukuran dan warnanya. Fungsi ini sangat berguna untuk menandai posisi tertentu dalam gambar atau untuk menggambar pola dengan titik.
        </p>

        <h4>Fungsi:</h4>
        <p><code>dot(ukuran, warna)</code>: Menggambar titik dengan ukuran dan warna yang ditentukan. Parameter <code>warna</code> opsional dan dapat diisi dengan nama warna atau kode heksadesimal.</p>
        <ul>
          <li><strong>ukuran</strong>: Ukuran titik yang ingin digambar. Nilai default adalah 5.</li>
          <li><strong>warna</strong>: Warna titik yang ingin digambar. Jika tidak ditentukan, warna default adalah warna pena saat ini.</li>
        </ul>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar titik dengan ukuran 10 dan warna default
t.dot(10)

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h4>Contoh Penggunaan <code>dot()</code></h4>
        <p>Berikut adalah beberapa contoh penggunaan <code>dot()</code> untuk menggambar titik:</p>

        <h4>Menggambar Titik dengan Ukuran dan Warna yang Berbeda</h4>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar titik dengan ukuran 20 dan warna merah
t.dot(20, "red")

# Pindahkan turtle untuk menggambar titik berikutnya
t.penup()
t.setposition(50, 50)
t.pendown()

# Menggambar titik dengan ukuran 15 dan warna biru
t.dot(15, "blue")

turtle.done()`}
          </code>
        </pre>

        <h4>Menggambar Titik di Berbagai Posisi</h4>
        <p>Anda bisa memindahkan turtle ke posisi yang berbeda sebelum menggambar titik:</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar titik di posisi (0, 0)
t.dot(10, "green")

# Pindahkan turtle ke posisi lain
t.penup()
t.setposition(-50, -50)
t.pendown()

# Menggambar titik di posisi (-50, -50)
t.dot(10, "purple")

turtle.done()`}
          </code>
        </pre>

        <h4>Menggambar Pola dengan Titik</h4>
        <p>Anda dapat menggunakan loop untuk menggambar pola titik:</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar pola titik
for i in range(10):
    t.dot(10, "orange")
    t.penup()
    t.forward(20)
    t.pendown()

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h4>Kesimpulan</h4>
        <p>
          Perintah <code>dot()</code> dalam pustaka <strong>Turtle Graphics</strong> memungkinkan Anda menggambar titik dengan ukuran dan warna yang dapat disesuaikan. Fungsi ini berguna untuk menandai posisi, membuat pola, atau menambah detail pada gambar yang Anda buat.
        </p>

        <hr />

        <h4>Kuis</h4>
        <p>Apa yang dilakukan perintah <code>t.dot(30, "blue")</code>?</p>
        <ul>
          <li>[ ] Menggambar titik dengan ukuran 30 dan warna biru</li>
          <li>[ ] Menghapus titik yang sudah ada</li>
          <li>[ ] Mengganti warna pena menjadi biru</li>
          <li>[ ] Menggambar lingkaran dengan jari-jari 30</li>
        </ul>
      </div>
    </div>
  )
}

export default Dot
