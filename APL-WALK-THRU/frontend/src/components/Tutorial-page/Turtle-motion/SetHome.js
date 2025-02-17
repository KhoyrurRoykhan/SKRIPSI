import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const SetHome = () => {
  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 className='mt-3' style={{textAlign:'center'}}>Home</h2>

        <hr/>

        <h4>Tujuan Pembelajaran</h4>
        <ul>
          <li>Memahami cara mengembalikan posisi turtle ke titik awal menggunakan <code>home()</code>.</li>
          <li>Mengetahui kegunaan fungsi <code>home()</code> dalam pengaturan gambar.</li>
        </ul>

        <hr />

        <h4>Definisi Turtle <code>home()</code></h4>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>home()</code> digunakan untuk memindahkan turtle kembali ke posisi awalnya, yaitu titik (0, 0) pada koordinat kartesius. Selain memindahkan turtle, perintah ini juga mengatur arah turtle menghadap ke timur (0 derajat). Ini berguna ketika Anda ingin memulai kembali menggambar dari posisi awal.
        </p>

        <h4>Fungsi:</h4>
        <p><code>home()</code>: Memindahkan turtle ke koordinat (0, 0) dan mengatur arah turtle menghadap timur.</p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Pindahkan turtle ke beberapa posisi
t.setposition(100, 100)
t.setposition(-50, 50)

# Kembali ke posisi awal
t.home()

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h4>Contoh Penggunaan <code>home()</code></h4>
        <p>
          Perintah <code>home()</code> sangat berguna ketika Anda ingin kembali ke titik awal setelah menggambar, terutama saat bekerja pada gambar yang kompleks. Misalnya, menggambar pola dan kemudian kembali ke titik awal:
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar segiempat
for _ in range(4):
    t.forward(100)
    t.right(90)

# Kembali ke posisi awal
t.home()

turtle.done()`}
          </code>
        </pre>

        <h4>Kombinasi dengan Perintah Lain</h4>
        <p>
          Anda dapat menggunakan <code>home()</code> bersama dengan perintah lain seperti <code>penup()</code> dan <code>pendown()</code> jika Anda ingin berpindah ke posisi awal tanpa menggambar jalur.
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Angkat pena untuk berpindah tanpa menggambar
t.penup()
t.setposition(100, 100)
t.pendown()

# Menggambar garis
t.forward(100)

# Kembali ke posisi awal
t.home()

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h4>Kesimpulan</h4>
        <p>
          Perintah <code>home()</code> dalam pustaka <strong>Turtle Graphics</strong> memudahkan untuk kembali ke posisi awal (0, 0) dan mengatur arah turtle. Ini berguna untuk memulai kembali proses menggambar dari titik yang telah ditentukan tanpa harus mengatur koordinat secara manual.
        </p>

        <hr />

        <h4>Kuis</h4>
        <p>Apa yang dilakukan perintah <code>t.home()</code>?</p>
        <ul>
          <li>[ ] Menghapus semua jalur yang telah digambar</li>
          <li>[ ] Memindahkan turtle ke posisi (0, 0) dan mengatur arah ke timur</li>
          <li>[ ] Memindahkan turtle ke posisi acak dalam ruang gambar</li>
          <li>[ ] Mengatur arah turtle ke selatan dan memindahkannya ke (0, 0)</li>
        </ul>
      </div>
    </div>
  )
}

export default SetHome
