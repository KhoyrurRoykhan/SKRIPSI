

# Turtle Left & Right

### Prasyarat
Pemahaman dasar tentang pemrograman Python.

### Tujuan Pembelajaran
- Memahami cara mengendalikan arah gerakan turtle menggunakan `left()` dan `right()`.
- Memahami rotasi kiri dan kanan pada turtle.

---

## Definisi Turtle `left()` dan `right()`

Dalam pustaka **Turtle Graphics**, metode `left()` dan `right()` digunakan untuk memutar arah gerakan turtle berdasarkan sudut derajat yang diberikan, tanpa harus memindahkan posisinya. Ini berguna untuk mengatur arah turtle sebelum melanjutkan dengan perintah lainnya, seperti menggambar atau bergerak.

### Fungsi:

1. **`left(derajat)`**: Memutar arah turtle berlawanan arah jarum jam (kiri) sebesar derajat yang ditentukan.
   
   Contoh:
   ```python
   import turtle

   t = turtle.Turtle()

   # Putar turtle ke kiri sejauh 90 derajat
   t.left(90)

   # Putar lagi ke kiri sejauh 45 derajat
   t.left(45)

   turtle.done()
   ```

2. **`right(derajat)`**: Memutar arah turtle searah jarum jam (kanan) sebesar derajat yang ditentukan.

   Contoh:
   ```python
   import turtle

   t = turtle.Turtle()

   # Putar turtle ke kanan sejauh 90 derajat
   t.right(90)

   # Putar lagi ke kanan sejauh 45 derajat
   t.right(45)

   turtle.done()
   ```

---

## Contoh Penggunaan Gabungan `left()` dan `right()`

Anda bisa mengombinasikan kedua perintah ini untuk membuat pola rotasi tanpa menggerakkan turtle maju. Misalnya, jika ingin memutar turtle ke kiri 90 derajat lalu kembali ke posisi semula dengan memutar ke kanan:

```python
import turtle

t = turtle.Turtle()

# Putar ke kiri sejauh 90 derajat
t.left(90)

# Putar ke kanan sejauh 90 derajat
t.right(90)

turtle.done()
```

### Penggunaan Tambahan
Meskipun `left()` dan `right()` biasanya dikombinasikan dengan perintah lain seperti `forward()` untuk menggambar, perintah ini juga bisa digunakan secara mandiri untuk mengatur sudut atau arah dari turtle sesuai dengan kebutuhan.

---

## Kesimpulan

Perintah `left()` dan `right()` dalam pustaka **Turtle Graphics** memungkinkan pengaturan arah gerakan turtle dengan rotasi ke kiri atau ke kanan berdasarkan derajat yang ditentukan. Perintah ini sangat berguna untuk kontrol arah sebelum melakukan perintah lain dalam pembuatan gambar atau pola.

Berikut adalah bagian pertanyaan (question) yang sesuai dengan modul tentang **Turtle Left & Right** yang telah kita buat:

---

## Kuis

Apa yang dilakukan perintah `t.right(90)`?

- [ ] Memutar turtle ke kiri sebesar 90 derajat
- [ ] Memutar turtle ke kanan sebesar 90 derajat
- [ ] Menggerakkan turtle ke arah kanan sejauh 90 unit
- [ ] Menggerakkan turtle ke kanan tanpa memutar

---


