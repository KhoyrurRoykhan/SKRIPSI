import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const SetXY = () => {
  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 className='mt-3' style={{textAlign:'center'}}>Turtle Setx & Sety</h2>
        <hr></hr>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengatur posisi turtle pada sumbu x dan y secara terpisah menggunakan `setx()` dan `sety()`.</li>
          <li>Memahami koordinat kartesius dalam ruang gambar Turtle Graphics.</li>
        </ol>

        <br />

        <h4>Definisi</h4>
        <p>
        Dalam pustaka Turtle Graphics, metode `setx()` dan `sety()` digunakan untuk memindahkan turtle ke posisi tertentu hanya pada sumbu x atau sumbu y, tanpa mengubah koordinat lainnya. Perintah ini berguna untuk memindahkan turtle secara horizontal atau vertikal.
        </p>

        <br></br>

        <h4>Fungsi:</h4>
        <h5>1. <code>setx(x)</code></h5>
        <p>Memindahkan turtle ke posisi x yang ditentukan, tanpa mengubah posisi pada sumbu y. Jika pena (pen) aktif, turtle akan menggambar jalur dari posisi sebelumnya ke posisi baru.</p>
        <pre>
          <code>
            {`# Pindahkan turtle ke posisi x = 100, tanpa mengubah posisi y
setx(100)
`}
          </code>
        </pre>
        <p>Hasil:</p>
        <p>Posisi awal objek adalah x=0,y=0. Setelah dijalankan kode tersebut maka nilai x akan menjadi 100. Dan objek akan berpindah ke titik x=100,y=0</p>
        <p>img hasil</p>

        <h5>2. <code>sety(y)</code></h5>
        <p>Memindahkan turtle ke posisi y yang ditentukan, tanpa mengubah posisi pada sumbu x. Jika pena aktif, jalur akan tergambar.</p>
        <pre>
          <code>
            {`# Pindahkan turtle ke posisi y = 150, tanpa mengubah posisi x
sety(150)
`}
          </code>
        </pre>
        <p>Hasil:</p>
        <p>Posisi awal objek adalah x=0,y=0. Setelah dijalankan kode tersebut maka nilai y akan menjadi 150. Dan objek akan berpindah ke titik x=0,y=150.</p>
        <p>img hasil</p>

        <br />

        <h4>Contoh Penggunaan Gabungan <code>setx()</code> dan <code>sety()</code></h4>
        <p>
          Anda dapat menggunakan kedua perintah ini untuk memindahkan turtle ke posisi tertentu dengan mengatur koordinat x dan y secara terpisah. Misalnya, untuk memindahkan turtle secara horizontal lalu vertikal:
        </p>
        <pre>
          <code>
            {`# Pindahkan turtle ke posisi x = 100
setx(100)

# Pindahkan turtle ke posisi y = 200
sety(200)
`}
          </code>
        </pre>
        <p>Hasil:</p>
        <p>Posisi awal objek adalah x=0,y=0. Setelah dijalankan kode tersebut maka nilai y akan menjadi 150. Dan objek akan berpindah ke titik x=0,y=150.</p>
        <p>img hasil</p>

        <br />

        <h4>Kesimpulan</h4>
        <p>
          Perintah <code>setx()</code> dan <code>sety()</code> dalam pustaka <strong>Turtle Graphics</strong> digunakan untuk memindahkan turtle secara horizontal atau vertikal tanpa mengubah koordinat lainnya. Perintah ini berguna untuk memindahkan turtle ke posisi yang diinginkan dengan lebih fleksibel, terutama saat mengatur pola atau jalur yang spesifik.
        </p>

        <br />

        <h4>Kuis</h4>
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
