import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const SetPosition = () => {
  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 className='mt-3' style={{textAlign:'center'}}>Setposition</h2>
        <hr></hr>
        <br></br>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengatur posisi turtle secara langsung menggunakan `setposition()` atau `setpos()`.</li>
          <li>Memahami koordinat kartesius dalam ruang gambar Turtle Graphics.</li>
        </ol>

        <br/>

        <h4>Definisi Turtle <code>setposition()</code></h4>
        <p>
        Dalam pustaka Turtle Graphics, metode `setposition()` (bisa juga disingkat `setpos()`) digunakan untuk memindahkan turtle ke titik tertentu dalam ruang gambar, berdasarkan koordinat yang ditentukan. Saat perintah ini digunakan, turtle akan menggambar jalur dari posisi sebelumnya ke posisi baru.
        </p>

        <br/>

        <h4>Fungsi:</h4>
        <p><code>setposition(x, y)</code> atau <code>setpos(x, y)</code>: Memindahkan turtle ke koordinat <code>(x, y)</code> yang ditentukan dalam ruang gambar. Jalur yang digambar tergantung pada apakah pena (pen) sedang aktif atau tidak. Jika pena aktif, jalur akan tergambar; jika tidak, hanya turtle yang berpindah.</p>
        <pre>
          <code>
            {`# Pindahkan turtle ke koordinat (100, 100)
setposition(100, 100)`}
          </code>
        </pre>
        <p>Hasil:</p>
        <p>Objek akan bergerak ke posisi x=100 dan y=100.</p>
        <p>img hasil</p>

        <br />

        <h4>Contoh Penggunaan Setposition untuk Membentuk Pola</h4>
        <p>
        Kita dapat menggunakan <code>setposition()</code> untuk menggambar pola dengan mengatur beberapa titik koordinat. Misalnya, membuat segitiga dengan menentukan tiga titik:
        </p>
        <pre>
          <code>
            {`# Pindahkan turtle ke titik pertama
setposition(100, 0)

# Pindahkan ke titik kedua
setposition(50, 100)

# Kembali ke titik awal
setposition(0, 0)
`}
          </code>
        </pre>

        <p>Hasil:</p>
        <p>Objek akan berpindah ke titik x=100, y=0. Kemudian setelah mencapai titik itu obejek akan pindah ke titik kedua yaitu x=50,y=100. Dan setelah mencapai titik kedua, objek akan berpindah lagi ke titik awal yaitu x=0,y=0.</p>
        <p>img hasil</p>

        <br />

        <h4>Kesimpulan</h4>
        <p>
        Perintah `setposition()` atau `setpos()` dalam pustaka Turtle Graphics memungkinkan Anda memindahkan turtle ke koordinat tertentu dalam ruang gambar. Perintah ini sangat berguna untuk mengatur posisi awal turtle atau membuat jalur menggambar yang kompleks dengan mengombinasikan pergerakan dan kontrol pena.
        </p>

        <br />

        <h4>Kuis</h4>
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
