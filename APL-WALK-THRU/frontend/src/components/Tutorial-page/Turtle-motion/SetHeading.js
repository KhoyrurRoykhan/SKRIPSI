import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const SetHeading = () => {
  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 className='mt-3' style={{textAlign:'center'}}>Setheading</h2>

        <hr></hr>

        <h4>Tujuan Pembelajaran</h4>
        <ul>
          <li>Memahami cara mengatur arah turtle menggunakan <code>setheading()</code>.</li>
          <li>Memahami bagaimana sudut arah mempengaruhi gerakan turtle.</li>
        </ul>

        <hr />

        <h4>Definisi Turtle <code>setheading()</code></h4>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>setheading()</code> digunakan untuk mengatur arah turtle ke sudut tertentu, diukur dalam derajat. Sudut dihitung searah jarum jam, dimulai dari arah ke timur (0 derajat). Dengan menggunakan <code>setheading()</code>, Anda dapat mengontrol ke mana turtle akan menghadap sebelum bergerak.
        </p>

        <h4>Fungsi:</h4>
        <p><code>setheading(sudut)</code>: Mengatur arah turtle berdasarkan sudut yang ditentukan dalam derajat. Sudut diukur dari arah ke timur (0 derajat) searah jarum jam:</p>
        <ul>
          <li><strong>0°</strong>: Timur</li>
          <li><strong>90°</strong>: Utara</li>
          <li><strong>180°</strong>: Barat</li>
          <li><strong>270°</strong>: Selatan</li>
        </ul>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Atur arah turtle menghadap utara (90 derajat)
t.setheading(90)
t.forward(100)  # Bergerak ke atas

# Atur arah turtle menghadap barat (180 derajat)
t.setheading(180)
t.forward(100)  # Bergerak ke kiri

turtle.done()`}
          </code>
        </pre>

        <hr />

        <h4>Contoh Penggunaan <code>setheading()</code></h4>
        <p>
          Anda dapat menggunakan <code>setheading()</code> untuk menggambar bentuk tertentu dengan mengatur arah sebelum setiap pergerakan. Misalnya, membuat segiempat dengan mengatur arah di setiap sisi:
        </p>
        <pre>
          <code>
            {`import turtle

t = turtle.Turtle()

# Menggambar segiempat menggunakan setheading
for sudut in [0, 90, 180, 270]:
    t.setheading(sudut)
    t.forward(100)

turtle.done()`}
          </code>
        </pre>

        <h4>Arah dan Rotasi</h4>
        <p>
          Dengan <code>setheading()</code>, Anda dapat secara langsung mengatur arah turtle ke sudut yang diinginkan tanpa harus menggunakan <code>left()</code> atau <code>right()</code>. Ini memudahkan pembuatan pola atau gambar yang memerlukan arah spesifik.
        </p>

        <hr />

        <h4>Kesimpulan</h4>
        <p>
          Perintah <code>setheading()</code> dalam pustaka <strong>Turtle Graphics</strong> sangat berguna untuk mengontrol arah turtle dengan presisi. Dengan mengatur sudut arah secara langsung, Anda dapat membuat pola yang kompleks dan menggambar dengan lebih terstruktur.
        </p>

        <hr />

        <h4>Kuis</h4>
        <p>Apa yang dilakukan perintah <code>t.setheading(270)</code>?</p>
        <ul>
          <li>[ ] Mengatur arah turtle ke barat</li>
          <li>[ ] Mengatur arah turtle ke selatan</li>
          <li>[ ] Menggerakkan turtle ke posisi (270, 0)</li>
          <li>[ ] Menghapus jalur yang sudah digambar sebelumnya</li>
        </ul>
      </div>
    </div>
  )
}

export default SetHeading
