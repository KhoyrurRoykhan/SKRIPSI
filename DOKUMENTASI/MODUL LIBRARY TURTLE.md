# PYTHON LIBRARY TURTLE

### Daftar isi
- Pendahuluan
- Turtle Motion
    - Left & Right
    - Forward & Backward
    - Setposition
    - Setx & Sety
    - Setheading
    - Home
    - Circle
    - dot
    - stamp & clearstamp
    - undo & speed
- Turtle Tell State
    - position
    - towards
    - xcor
    - ycor
    - heading
    - distance
- Settings for measurement
    - degrees
    - radians
- Pen control (Drawing State)
    - pendown
    - penup
    - pensize
    - pen
    - isdown
- Color Control
    - pencolor
    - fillcolor
    - color
    - filling
    - begin_fill
    - end_fill
- More drawing control
    - reset
    - clear
    - write


### Pendahuluan
Library Turtle adalah salah satu pustaka Python yang paling sering digunakan untuk menggambar grafik sederhana. Dengan menggunakan Turtle, kita bisa menggambar bentuk-bentuk geometris, menggambar pola, hingga membuat animasi dasar. Konsep Turtle didasarkan pada pen yang digerakkan di atas layar, dan dengan memberikan perintah kepada turtle, kita bisa membuatnya bergerak serta menggambar sesuai dengan instruksi.

Turtle menjadi alat yang menyenangkan bagi pemula untuk belajar logika pemrograman dan dasar-dasar koordinat grafis.

Pengenalan Dasar Koordinat
Layar turtle menggunakan sistem koordinat cartesian (x, y) di mana:

Titik (0, 0) adalah pusat layar.
Koordinat positif x mengarah ke kanan.
Koordinat positif y mengarah ke atas.
Nilai negatif untuk x dan y bergerak ke kiri dan bawah.

### Turtle Motion
### - Left & Right

Dalam pemrograman Python, kita bisa menggunakan modul `turtle` untuk menggambar berbagai bentuk dan pola. Dua metode yang sering digunakan untuk mengubah arah pergerakan objek (yang kita sebut sebagai "penyu") adalah `right()` dan `left()`. Berikut penjelasan sederhana mengenai kedua metode ini:

#### 1. Metode `right()`
Metode `right()` digunakan untuk memutar penyu ke arah kanan. Nilai yang kita masukkan ke dalam metode ini adalah sudut (dalam derajat) yang menunjukkan seberapa jauh penyu akan berputar.

**Sintaks:**
```python
turtle.right(angle)
```

- **angle**: Nilai sudut (misalnya 90) yang menunjukkan seberapa jauh penyu akan berputar ke kanan.

**Contoh Penggunaan:**
```python
turtle.right(90)     # Penyu berputar 90 derajat ke kanan
```

**Apa yang terjadi?**
1. Penyu berputar 90 derajat ke kanan (sehingga sekarang menghadap ke bawah layar).


#### 2. Metode `left()`
Metode `left()` digunakan untuk memutar penyu ke arah kiri. Seperti `right()`, kita juga perlu memasukkan nilai sudut yang menunjukkan seberapa jauh penyu akan berputar.

**Sintaks:**
```python
turtle.left(angle)
```

- **angle**: Nilai sudut yang menunjukkan seberapa jauh penyu akan berputar ke kiri.

**Contoh Penggunaan:**
```python
turtle.left(120)     # Penyu berputar 120 derajat ke kiri
```

**Apa yang terjadi?**
1. Kemudian, penyu berputar 120 derajat ke kiri.

Dengan menggunakan metode `right()` dan `left()`, kita dapat mengarahkan penyu ke berbagai arah dan membuat pola yang kita inginkan.


### - Forward & Backward
 Metode `forward()` dan `backward()` adalah dua cara dasar untuk menggerakkan penyu (objek yang menggambar) ke depan dan belakang. Mari kita pelajari cara penggunaannya dengan cara yang mudah dipahami:

#### 1. Metode `forward()`
Metode `forward()` digunakan untuk menggerakkan penyu ke arah depan. Kita perlu memberikan nilai jarak yang ingin ditempuh oleh penyu.

**Sintaks:**
```python
turtle.forward(jarak)
```
- **jarak**: Angka yang menunjukkan seberapa jauh penyu akan bergerak maju. Ini bisa berupa bilangan bulat (integer) atau desimal (float).

**Contoh Penggunaan:**
```python
turtle.forward(100)  # Penyu bergerak maju sejauh 100 unit
```

**Apa yang terjadi?**
- Penyu akan bergerak maju dalam arah yang sedang dihadapinya sejauh 100 unit.

**Catatan:** Kita juga bisa menggunakan `fd()` sebagai pengganti `forward()`. Kedua metode ini melakukan hal yang sama.
```python
turtle.fd(100)  # Sama seperti turtle.forward(100)
```

#### 2. Metode `backward()`
Metode `backward()` digunakan untuk menggerakkan penyu ke arah belakang. Kita juga perlu memberikan nilai jarak yang ingin ditempuh penyu, tetapi kali ini penyu akan bergerak mundur.

**Sintaks:**
```python
turtle.backward(jarak)
```
- **jarak**: Angka yang menunjukkan seberapa jauh penyu akan bergerak mundur.

**Contoh Penggunaan:**
```python
turtle.backward(100)  # Penyu bergerak mundur sejauh 100 unit
```

**Apa yang terjadi?**
- Penyu akan bergerak mundur dalam arah yang berlawanan dengan arah yang sedang dihadapinya sejauh 100 unit.

**Catatan:** Kita juga bisa menggunakan `bk()` atau `back()` sebagai pengganti `backward()`. Ketiga metode ini melakukan hal yang sama.
```python
turtle.bk(100)    # Sama seperti turtle.backward(100)
turtle.back(100)  # Sama seperti turtle.backward(100)
```

Dengan memahami metode `forward()` dan `backward()`, kita bisa mengontrol pergerakan penyu dalam menggambar bentuk dan pola pada layar.

### - Setposition
Metode `goto()` digunakan untuk memindahkan penyu (turtle) ke posisi tertentu pada layar. Ini adalah cara yang lebih langsung untuk menempatkan penyu di posisi koordinat yang diinginkan. Metode ini juga memiliki alias atau nama lain, yaitu `setpos()` dan `setposition()`, yang semuanya berfungsi dengan cara yang sama.

#### Sintaks:
```python
turtle.goto(x, y)
```
Alias:
```python
turtle.setpos(x, y)
turtle.setposition(x, y)
```

#### Parameter:
- **x**: Koordinat x pada layar.
- **y**: Koordinat y pada layar.

#### Bagaimana Cara Kerjanya?
- Metode ini akan memindahkan penyu langsung ke titik (x, y) yang ditentukan.
- Titik (0, 0) biasanya adalah titik tengah layar, sehingga nilai `x` dan `y` menentukan posisi relatif terhadap titik tengah tersebut.

#### Contoh Penggunaan:
```python
turtle.goto(100, 100)  # Penyu bergerak ke posisi (100, 100)
```

**Apa yang terjadi?**
- Penyu akan berpindah langsung ke posisi koordinat (100, 100) pada layar.

Metode `goto()`, `setpos()`, dan `setposition()` sangat berguna ketika kita ingin menempatkan penyu di lokasi tertentu dengan cepat, tanpa harus memikirkan arah penyu atau berapa jauh dia harus bergerak.

### - Setx & Sety
Metode `setx()` dan `sety()` digunakan untuk mengubah posisi penyu secara spesifik pada sumbu x atau y, tanpa mengubah posisi pada sumbu lainnya. Ini memungkinkan kita untuk menggerakkan penyu secara horizontal atau vertikal sambil mempertahankan posisi di sumbu lainnya.

#### 1. Metode `setx()`
Metode `setx()` digunakan untuk mengatur posisi penyu pada sumbu x tanpa mengubah posisi pada sumbu y.

**Sintaks:**
```python
turtle.setx(x)
```

- **x**: Nilai koordinat x baru (bisa berupa bilangan bulat atau desimal).

**Contoh Penggunaan:**
```python
turtle.setpos(-100, 100)  # Penyu ditempatkan pada posisi (-100, 100)
turtle.setx(200)          # Penyu bergerak ke posisi (200, 100) tanpa mengubah koordinat y
```

**Apa yang terjadi?**
1. Penyu pertama-tama ditempatkan di koordinat (-100, 100).
2. Kemudian, `setx(200)` mengubah posisi x penyu menjadi 200, sehingga penyu bergerak ke posisi (200, 100), tanpa mengubah posisi y-nya.

#### 2. Metode `sety()`
Metode `sety()` digunakan untuk mengatur posisi penyu pada sumbu y tanpa mengubah posisi pada sumbu x.

**Sintaks:**
```python
turtle.sety(y)
```

- **y**: Nilai koordinat y baru (bisa berupa bilangan bulat atau desimal).

**Contoh Penggunaan:**
```python
turtle.setpos(-100, 100)  # Penyu ditempatkan pada posisi (-100, 100)
turtle.sety(-200)         # Penyu bergerak ke posisi (-100, -200) tanpa mengubah koordinat x
```

**Apa yang terjadi?**
1. Penyu pertama-tama ditempatkan di koordinat (-100, 100).
2. Kemudian, `sety(-200)` mengubah posisi y penyu menjadi -200, sehingga penyu bergerak ke posisi (-100, -200), tanpa mengubah posisi x-nya.

#### Kesimpulan
- **`setx(x)`**: Mengubah posisi penyu hanya pada sumbu x.
- **`sety(y)`**: Mengubah posisi penyu hanya pada sumbu y.

Dengan menggunakan `setx()` dan `sety()`, kita bisa mengontrol posisi penyu secara horizontal dan vertikal dengan lebih spesifik dan terarah.

### - Setheading
Metode `setheading()` digunakan untuk mengubah arah atau orientasi penyu (turtle) ke sudut tertentu dalam derajat. Metode ini memungkinkan kita untuk mengatur arah yang akan dituju oleh penyu dengan lebih tepat. Alias untuk metode ini adalah `seth()`, dan keduanya bekerja dengan cara yang sama.
#### Cara Kerja Orientasi
Dalam `turtle`, arah diukur dalam derajat:
- **0**: Timur
- **90**: Utara
- **180**: Barat
- **270**: Selatan

Ini adalah pengaturan default atau "Standar Mode". Pada mode ini, arah yang diberikan ke metode `setheading()` akan mengubah arah penyu sesuai dengan derajat yang ditentukan.

##### Sintaks:
```python
turtle.setheading(to_angle)
```
Alias:
```python
turtle.seth(to_angle)
```

#### Parameter:
- **to_angle**: Sudut (dalam derajat) yang menunjukkan arah yang ingin dituju oleh penyu. Bisa berupa bilangan bulat (integer) atau desimal (float).

#### Contoh Penggunaan:
```python
turtle.setpos(-100, 100)  # Penyu ditempatkan pada posisi (-100, 100)
turtle.setheading(90)     # Penyu diatur menghadap ke utara
```

**Apa yang terjadi?**
1. Penyu pertama-tama ditempatkan di koordinat (-100, 100).
2. Kemudian, `setheading(90)` mengubah arah penyu sehingga menghadap ke utara (90 derajat).

#### Kesimpulan
- **`setheading(angle)`** atau **`seth(angle)`** digunakan untuk mengatur arah penyu sesuai sudut yang diinginkan.
- Dengan menggunakan metode ini, kita dapat mengontrol orientasi penyu untuk bergerak ke arah yang tepat, baik itu ke timur, barat, utara, selatan, atau sudut tertentu lainnya. 

Metode `setheading()` sangat berguna ketika kita ingin penyu bergerak dalam arah yang spesifik.


### - Home
Metode `home()` digunakan untuk mengembalikan penyu (turtle) ke posisi awal pada layar, yaitu titik asal (0, 0). Selain itu, metode ini juga mengatur ulang arah penyu ke orientasi awalnya, yang biasanya menghadap ke timur (0 derajat).

#### Fungsi dan Manfaat `home()`
- **Posisi:** Mengembalikan penyu ke titik asal (0, 0).
- **Orientasi:** Mengatur arah penyu ke orientasi awal (menghadap ke timur).

#### Sintaks:
```python
turtle.home()
```

#### Contoh Penggunaan:
```python
turtle.setpos(-100, 100)  # Penyu ditempatkan pada posisi (-100, 100)
turtle.home()             # Penyu kembali ke titik asal (0, 0) dan menghadap ke timur
```

**Apa yang terjadi?**
1. Penyu pertama-tama ditempatkan di koordinat (-100, 100).
2. Kemudian, `home()` memindahkan penyu kembali ke titik asal (0, 0) dan mengatur arah penyu menghadap ke timur.

#### Kesimpulan
Metode `home()` sangat berguna ketika kita ingin mengembalikan penyu ke posisi awalnya dengan cepat, tanpa perlu menggunakan metode lain seperti `goto(0, 0)` dan `setheading(0)` secara terpisah.


### - Circle
Metode `circle()` digunakan untuk menggambar lingkaran dengan berbagai variasi seperti ukuran, bagian lingkaran tertentu (busur), dan bentuk poligon. Metode ini sangat fleksibel karena dapat digunakan untuk menggambar lingkaran penuh, busur, atau bentuk poligon sederhana.

#### Sintaks:
```python
turtle.circle(radius, extent=None, steps=None)
```

#### Parameter:
- **radius**: Jari-jari lingkaran. Positif untuk menggambar lingkaran searah jarum jam, negatif untuk berlawanan arah.
- **extent**: (Opsional) Bagian lingkaran dalam derajat. Nilai default adalah `None`, yang berarti menggambar lingkaran penuh (360 derajat). Jika diatur ke nilai tertentu, akan menggambar busur sesuai derajat tersebut.
- **steps**: (Opsional) Menentukan jumlah segmen yang digunakan untuk menggambar lingkaran. Bisa digunakan untuk menggambar poligon. Semakin banyak langkah, semakin halus bentuk lingkaran.

#### Contoh Penggunaan:
##### Contoh 1: Menggambar Lingkaran Penuh dengan Radius 50
```python
turtle.circle(50)  # Menggambar lingkaran dengan jari-jari 50
```
- **Output**: Lingkaran penuh dengan radius 50 unit.

##### Contoh 2: Menggambar Busur Lingkaran dengan Radius 120 dan Extent 180
```python
turtle.circle(120, 180)  # Menggambar busur lingkaran dengan radius 120 dan derajat 180
```
- **Output**: Busur lingkaran (setengah lingkaran) dengan radius 120 unit.

##### Contoh 3: Menggambar Poligon dengan Radius 80 dan 5 Langkah
```python
turtle.circle(80, steps=5)  # Menggambar poligon dengan radius 80 dan 5 sisi
```
- **Output**: Bentuk poligon (segilima) dengan radius 80 unit.

#### Kesimpulan
Metode `circle()` sangat berguna untuk menggambar lingkaran, busur, atau bahkan poligon dengan jumlah sisi yang bisa ditentukan. Dengan mengatur parameter `radius`, `extent`, dan `steps`, kita bisa membuat berbagai macam bentuk sesuai kebutuhan.

### - Dot
Metode `dot()` digunakan untuk menggambar titik melingkar (bulatan) dengan ukuran dan warna tertentu. Metode ini berguna ketika kita ingin menandai titik atau membuat dekorasi kecil pada gambar. Jika ukuran tidak disebutkan, titik akan memiliki ukuran yang sesuai dengan nilai `pensize` yang sedang digunakan.

#### Sintaks:
```python
turtle.dot(size=None, *color)
```

#### Parameter:
- **size**: (Opsional) Ukuran titik dalam piksel. Harus berupa bilangan bulat lebih besar atau sama dengan 1. Jika tidak disebutkan, ukuran titik akan menjadi `pensize + 4` atau `2 * pensize`.
- **color**: (Opsional) Warna titik. Bisa berupa nama warna (seperti `"blue"`, `"red"`), kode heksadesimal (seperti `"#ff0000"`), atau tuple warna numerik (seperti `(255, 0, 0)` untuk warna merah).

#### Contoh Penggunaan:
##### Contoh 1: Menggambar Titik dengan Ukuran Default
```python
turtle.dot()  # Menggambar titik dengan ukuran default
```
- **Output**: Menggambar titik dengan ukuran yang bergantung pada `pensize`.

##### Contoh 2: Menggambar Titik dengan Ukuran 20 dan Warna "blue"
```python
turtle.fd(50)         # Menggerakkan penyu 50 unit ke depan
turtle.dot(20, "blue")  # Menggambar titik berwarna biru dengan ukuran 20
turtle.fd(50)         # Menggerakkan penyu 50 unit ke depan
```
- **Output**: Penyu akan bergerak maju 50 unit, menggambar titik berwarna biru dengan ukuran 20, kemudian bergerak maju lagi 50 unit.

#### Kesimpulan
Metode `dot()` sangat berguna untuk menggambar titik-titik dengan ukuran dan warna yang dapat dikustomisasi. Ini bisa digunakan untuk membuat pola, menandai posisi tertentu, atau sekadar menghias gambar.

### - stamp & clearstamp
#### 1. **Metode `stamp()`**
Metode `stamp()` digunakan untuk mencap salinan bentuk penyu (turtle) ke kanvas. Bentuk cap ini akan tetap di tempat bahkan setelah penyu bergerak ke posisi lain. Metode ini sangat berguna untuk membuat pola atau jejak di sepanjang jalur penyu. Metode ini tidak memerlukan argumen apa pun dan mengembalikan ID unik dari cap yang dibuat.

- **Sintaks:**
  ```python
  turtle.stamp()
  ```
- **Kegunaan:** Mencap bentuk penyu di lokasi saat ini pada kanvas dan mengembalikan ID cap.

**Contoh 1: Mencap Bentuk Penyu di Lokasi Tertentu**
```python
turtle.forward(100)  # Penyu bergerak maju 100 unit
turtle.stamp()       # Mencap bentuk penyu pada posisi saat ini
turtle.forward(100)  # Penyu bergerak maju 100 unit lagi
```
- **Output:** Penyu bergerak maju, mencap bentuknya di posisi tengah, lalu bergerak maju lagi.

**Contoh 2: Mencap dengan Warna**
```python
turtle.color("blue")       # Mengatur warna penyu menjadi biru
stamp_id = turtle.stamp()  # Mencap bentuk penyu dan menyimpan ID cap
turtle.fd(50)              # Penyu bergerak maju 50 unit
```
- **Output:** Penyu mencap bentuk biru di posisi awal, lalu bergerak maju 50 unit.

#### 2. **Metode `clearstamp()`**
Metode `clearstamp()` digunakan untuk menghapus cap tertentu yang telah dibuat oleh penyu. Metode ini memerlukan ID cap yang ingin dihapus, yang sebelumnya diperoleh dari pemanggilan `stamp()`. 

- **Sintaks:**
  ```python
  turtle.clearstamp(stamp_id)
  ```
- **Parameter:** 
  - **stamp_id:** ID unik dari cap yang akan dihapus. ID ini adalah nilai yang dikembalikan dari metode `stamp()`.

**Contoh: Menghapus Cap dengan ID Tertentu**
```python
turtle.color("blue")       # Mengatur warna penyu menjadi biru
stamp_id = turtle.stamp()  # Mencap bentuk penyu dan menyimpan ID cap
turtle.fd(50)              # Penyu bergerak maju 50 unit
turtle.clearstamp(stamp_id)  # Menghapus cap dengan ID yang disimpan
```
- **Output:** Penyu mencap bentuk biru di posisi awal, bergerak maju, lalu cap biru dihapus menggunakan ID-nya.

#### Kesimpulan
- **`stamp()`**: Mencap salinan bentuk penyu di posisi saat ini dan mengembalikan ID cap.
- **`clearstamp(stamp_id)`**: Menghapus cap dengan ID tertentu yang telah dibuat oleh penyu.

Metode `stamp()` dan `clearstamp()` sangat berguna untuk membuat pola atau efek visual yang melibatkan jejak penyu pada kanvas. Dengan menggabungkan keduanya, kita bisa menciptakan gambar yang dinamis dan interaktif.


### - undo & speed
#### 1. **Metode `undo()`**
Metode `undo()` digunakan untuk membatalkan tindakan terakhir yang dilakukan oleh penyu (turtle). Anda bisa membatalkan beberapa tindakan secara berulang, tergantung pada ukuran buffer undo yang telah ditetapkan. Metode ini tidak memerlukan argumen apa pun.

- **Sintaks:**
  ```python
  turtle.undo()
  ```
- **Kegunaan:** Membatalkan tindakan penyu terakhir.

**Contoh: Membatalkan Tindakan Terakhir**
```python
turtle.forward(100)  # Penyu bergerak maju 100 unit
turtle.left(90)      # Penyu berbelok 90 derajat ke kiri
turtle.forward(100)  # Penyu bergerak maju 100 unit
turtle.undo()        # Membatalkan tindakan terakhir (bergerak maju 100 unit)
```
- **Output:** Penyu pertama-tama bergerak maju, lalu berbelok, kemudian bergerak maju lagi. Setelah `undo()`, penyu kembali ke posisi sebelum langkah terakhir.
  
Jika `undo()` dihapus, maka penyu akan tetap maju 100 unit terakhir:
```python
turtle.forward(100)
turtle.left(90)
turtle.forward(100)
```
- **Output:** Penyu akan bergerak maju, berbelok, dan maju lagi tanpa ada pembatalan tindakan.

#### 2. **Metode `speed()`**
Metode `speed()` digunakan untuk mengatur kecepatan gerakan penyu. Metode ini dapat mempercepat atau memperlambat animasi gerakan penyu di layar, membuatnya lebih interaktif dan sesuai dengan kebutuhan visualisasi.

- **Sintaks:**
  ```python
  turtle.speed(speed=None)
  ```
- **Parameter:**
  - **speed**: Angka antara 0 dan 10, atau string yang menunjukkan tingkat kecepatan seperti `'fastest'`, `'fast'`, `'normal'`, `'slow'`, `'slowest'`.

- **Keterangan:**
  - `0`: **'fastest'** – Tidak ada animasi, langsung menggambar.
  - `1`: **'slowest'** – Kecepatan paling lambat.
  - `10`: **'fast'** – Kecepatan sangat cepat.
  - `None`: Jika tidak ada nilai yang diberikan, metode ini akan mengembalikan kecepatan saat ini.

**Contoh: Mengatur Kecepatan Penyu**
```python
turtle.speed(1)        # Penyu bergerak dengan kecepatan paling lambat
turtle.forward(100)    # Penyu bergerak maju 100 unit
turtle.speed('fast')   # Mengatur kecepatan menjadi sangat cepat
turtle.right(90)       
turtle.forward(100)    # Penyu bergerak maju 100 unit dengan cepat
```
- **Output:** Penyu pertama-tama bergerak maju dengan lambat, kemudian setelah mengubah kecepatan menjadi 'fast', penyu bergerak maju dengan lebih cepat.

#### Kesimpulan
- **`undo()`**: Membatalkan tindakan terakhir dari penyu. Dapat digunakan berulang untuk membatalkan beberapa tindakan sebelumnya.
- **`speed()`**: Mengatur atau mengembalikan kecepatan penyu. Membuat animasi lebih dinamis dengan memilih kecepatan yang sesuai (dari 'slowest' hingga 'fastest').

Metode `undo()` berguna untuk koreksi dan pengeditan, sementara `speed()` memungkinkan kontrol lebih besar terhadap animasi dan kecepatan gambar.