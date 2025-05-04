import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const quizData = [
  {
    question: 'Apa perbedaan utama antara perintah left dan right?',
    options: [
      'left memutar bidawang ke arah kanan, sementara right memutar bidawang ke arah kiri.',
      'left memutar bidawang ke arah kiri, sementara right memutar bidawang ke arah kanan.',
      'left dan right hanya digunakan untuk mengubah warna turtle.',
      'Keduanya memindahkan turtle ke posisi (0, 0).'
    ],
    answer: 'left memutar bidawang ke arah kiri, sementara right memutar bidawang ke arah kanan.'
  },
  {
    question: 'Perintah apa yang digunakan untuk menggerakkan turtle ke depan sejauh 150 piksel?',
    options: [
      'backward 150',
      'forward 150',
      'left 150',
      'right 150'
    ],
    answer: 'forward 150'
  },
  {
    question: 'Jika posisi awal Bidawang adalah (0, 0), dan Anda menggunakan perintah setposition 50 100, di mana posisi akhir Bidawang?',
    options: [
      '(100, 50)',
      '(50, 0)',
      '(0, 100)',
      '(50, 100)'
    ],
    answer: '(50, 100)'
  },
  {
    question: 'Apa hasil dari perintah setx 200 jika posisi awal turtle adalah (100,50)?',
    options: [
      'Posisi baru menjadi (200, 50).',
      'Posisi baru menjadi (100, 200).',
      'Posisi baru menjadi (200, 200).',
      'Posisi baru tetap (100, 50).'
    ],
    answer: 'Posisi baru menjadi (200, 50).'
  },
  {
    question: 'Apa yang terjadi jika Anda menjalankan perintah circle -50?',
    options: [
      'Tidak ada lingkaran yang Digambar.',
      'Lingkaran dengan jari-jari 50 akan digambar berlawanan dengan arah.',
      'Lingkaran dengan jari-jari 50 akan digambar dengan arah normal (berlawanan arah jarum jam).',
      'Lingkaran kecil akan digambar di posisi saat ini.'
    ],
    answer: 'Lingkaran dengan jari-jari 50 akan digambar berlawanan dengan arah.'
  },
  {
    question: 'Jika posisi awal Bidawang adalah (100, 100) dan arahnya ke barat, apa yang terjadi setelah menggunakan home?',
    options: [
      'Bidawang tetap di posisi (100, 100).',
      'Bidawang kembali ke posisi (0, 0) dengan arah tetap ke barat.',
      'Bidawang kembali ke posisi (0, 0) dan menghadap ke timur.',
      'Bidawang tetap di posisi (100, 100) tetapi menghadap ke timur.'
    ],
    answer: 'Bidawang kembali ke posisi (0, 0) dan menghadap ke timur.'
  },
  {
    question: 'Apa fungsi dari position?',
    options: [
      'Memberitahu arah pergerakan turtle saat ini.',
      'Menghapus posisi turtle sebelumnya.',
      'Memberitahu posisi turtle saat ini dalam bentuk koordinat (x, y).',
      'Mengatur posisi turtle ke titik tertentu.'
    ],
    answer: 'Memberitahu posisi turtle saat ini dalam bentuk koordinat (x, y).'
  },
  {
    question: 'Apa hasil dari perintah berikut jika bidawang berada di koordinat (30, 20)?\nprint xcor',
    options: [
      '-20',
      '30',
      '(30, -20)',
      '0'
    ],
    answer: '30'
  },
  {
    question: 'Apa hasil dari perintah berikut jika bidawang sudah diputar 90 derajat ke kiri?\nprint heading',
    options: [
      '0',
      '90',
      '180',
      '270'
    ],
    answer: '90'
  },
  {
    question: 'Jika bidawang diputar ke kanan sebanyak 270 derajat dari arah awal, ke arah mana ia akan menghadap?',
    options: [
      'Timur',
      'Selatan',
      'Barat',
      'Utara'
    ],
    answer: 'Selatan'
  },
  {
    question: 'Apa yang terjadi jika metode pendown tidak dipanggil setelah penup?',
    options: [
      'Bidawang akan terus menggambar saat bergerak.',
      'Bidawang akan berhenti bergerak.',
      'Bidawang tidak akan menggambar garis saat bergerak.',
      'Bidawang akan menggambar lingkaran secara otomatis.'
    ],
    answer: 'Bidawang tidak akan menggambar garis saat bergerak.'
  },
  {
    question: 'Perhatikan kode berikut:\npenup\nsetposition 100 100\npendown\nsetposition 200 200\nApa yang terjadi setelah kode tersebut dijalankan?',
    options: [
      'Bidawang menggambar garis dari titik awal ke (100, 100).',
      'Bidawang menggambar garis dari (100, 100) ke (200, 200).',
      'Bidawang tidak menggambar sama sekali.',
      'Bidawang hanya menggambar lingkaran.'
    ],
    answer: 'Bidawang menggambar garis dari (100, 100) ke (200, 200).'
  },
  {
    question: 'Apa efek dari penggunaan perintah pensize 10 sebelum menggambar?',
    options: [
      'Mengganti warna garis menjadi hitam.',
      'Mengubah ketebalan garis menjadi 10 piksel.',
      'Membuat garis tidak terlihat.',
      'Menghapus garis yang telah digambar.'
    ],
    answer: 'Mengubah ketebalan garis menjadi 10 piksel.'
  },
  {
    question: 'Apa yang dikembalikan oleh metode isdown jika pena sedang dalam posisi turun (pendown)?',
    options: [
      'True',
      'False',
      'None',
      'Error'
    ],
    answer: 'True'
  },
  {
    question: 'Apa fungsi dari end_fill dalam proses pengisian warna?',
    options: [
      'Mengatur warna isian menjadi transparan.',
      'Menandai akhir area yang akan diisi warna.',
      'Menonaktifkan pengaturan warna pada turtle.',
      'Menghapus warna isian dari bentuk yang digambar.'
    ],
    answer: 'Menandai akhir area yang akan diisi warna.'
  },
  {
    question: 'Apa yang terjadi jika fungsi reset dipanggil setelah menggambar garis?',
    options: [
      'Semua gambar dihapus, tetapi atribut bidawang tetap sama.',
      'Semua gambar dihapus, dan bidawang kembali ke posisi awal dengan atribut default.',
      'Garis tidak dihapus, tetapi posisi bidawang berubah.',
      'Bidawang akan keluar dari jendela.'
    ],
    answer: 'Semua gambar dihapus, dan bidawang kembali ke posisi awal dengan atribut default.'
  },
  {
    question: 'Apa perbedaan utama antara fungsi clear dan reset?',
    options: [
      'clear menghapus gambar tanpa mengubah posisi atau atribut, sedangkan reset juga mengatur ulang posisi dan atribut bidawang.',
      'clear menghapus gambar beserta posisi bidawang, sedangkan reset hanya menghapus gambar.',
      'clear tidak menghapus gambar, sedangkan reset menghapus gambar.',
      'clear menutup jendela, sedangkan reset tidak.'
    ],
    answer: 'clear menghapus gambar tanpa mengubah posisi atau atribut, sedangkan reset juga mengatur ulang posisi dan atribut bidawang.'
  },
  {
    question: 'Perhatikan kode berikut:\nwrite("Belajar Python!", align="center", font=("Arial", 12, "italic"))\nApa yang akan terjadi?',
    options: [
      'Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi kiri bidawang.',
      'Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi tengah bidawang.',
      'Teks ditulis di layar dengan font Arial, ukuran 12, tetapi tidak bergaya italic.',
      'Tidak ada teks yang ditulis karena font tidak valid.'
    ],
    answer: 'Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi tengah bidawang.'
  },
  {
    question: 'Apa manfaat utama menggunakan perulangan for dalam membuat pola gambar dengan Bidawang?',
    options: [
      'Menghapus kode secara otomatis',
      'Mengubah arah turtle secara acak',
      'Mempercepat dan mempersingkat kode yang berulang',
      'Menyimpan file hasil gambar'
    ],
    answer: 'Mempercepat dan mempersingkat kode yang berulang'
  },
  {
    question: 'Perhatikan kode berikut:\nfor 4\nforward 100\nleft 90\nApa yang akan digambar oleh kode tersebut?',
    options: [
      'Persegi',
      'Lingkaran',
      'Bintang',
      'Segitiga'
    ],
    answer: 'Persegi'
  }
];

const EvaluasiJawab = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hovered, setHovered] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const hasFinishedRef = useRef(false);
  const answersRef = useRef({});
  const timerRef = useRef(null);

  const [progresBelajar, setProgresBelajar] = useState(27); 
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    Swal.fire({
      title: 'Selamat mengerjakan!',
      text: 'Kerjakan kuis dengan teliti dan semangat 💪',
      icon: 'info',
      confirmButtonText: 'Mulai',
      confirmButtonColor: '#3085d6'
    });
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(timerRef.current);
          if (isDataLoaded) {
            handleFinish();
          } else {
            // ⏳ Tunggu sampai data siap, lalu panggil handleFinish
            const interval = setInterval(() => {
              if (isDataLoaded) {
                clearInterval(interval);
                handleFinish();
              }
            }, 500);
          }
          return 0;
        }
        return next;
      });
    }, 1000);
  
    return () => clearInterval(timerRef.current);
  }, [isDataLoaded]);
  

  

useEffect(() => {
  const getTokenAndProgres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);

      const progres = await axios.get('http://localhost:5000/user/progres-belajar', {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`
        }
      });

      setProgresBelajar(progres.data.progres_belajar);
      setIsDataLoaded(true); // ✅ Set data siap
    } catch (error) {
      console.error("Gagal mengambil token/progres:", error);
      navigate("/login");
    }
  };

  getTokenAndProgres();
}, []);


  const handleOptionClick = (index) => {
    if (!showResult) {
      const updatedAnswers = { ...answers, [current]: index };
      setAnswers(updatedAnswers);
      answersRef.current = updatedAnswers;
    }
  };

  const handleFinish = async () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    clearInterval(timerRef.current);

    let sc = 0;
    const wrong = [];

    quizData.forEach((q, idx) => {
      const selected = answersRef.current[idx];
      const selectedOption = q.options[selected];
      if (selectedOption === q.answer) {
        sc += 1;
      } else {
        wrong.push(idx);
      }
    });

    setScore(sc);
    setWrongAnswers(wrong);
    setShowResult(true);

    const nilaiAkhir = (sc / quizData.length) * 100;

// ✅ Update progres jika memenuhi syarat
if (nilaiAkhir >= 80 && progresBelajar === 27) {
  try {
    await axios.put(
      'http://localhost:5000/user/progres-belajar',
      { progres_belajar: progresBelajar + 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setProgresBelajar(prev => prev + 1);

    Swal.fire({
      icon: 'success',
      title: 'Selesai!',
      html: `
        <p>Nilaimu: <strong>${nilaiAkhir}</strong></p>
        <p>Kamu telah selesai memperlajari semua materi 🎉</p>
        <p>Pilih "Tutup" jika ingin memeriksa kembali jawabanmu.</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Lanjutkan',
      cancelButtonText: 'Tutup'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/belajar/evaluasi');
      }
    });

  } catch (error) {
    console.error("Gagal update progres:", error);
    Swal.fire({
      icon: 'error',
      title: 'Gagal Update Progres',
      text: 'Terjadi kesalahan saat memperbarui progres kamu.',
      confirmButtonColor: '#d33'
    });
  }

} else if (nilaiAkhir >= 80 && progresBelajar > 27) {
  // ⚠️ Sudah pernah menjawab kuis ini sebelumnya
  Swal.fire({
    icon: 'info',
    title: 'Sudah Pernah Menyelesaikan Kuis Ini',
    html: `
      <p>Nilaimu: <strong>${sc}</strong> dari ${quizData.length} soal ✅</p>
      <p>Kamu sudah menyelesaikan kuis ini sebelumnya.</p>
      <p>Tidak ada perubahan pada progres belajar kamu.</p>
    `,
    confirmButtonText: 'Mengerti'
  });

} else {
  // ❌ Nilai belum memenuhi
  Swal.fire({
    title: 'Nilai Belum Memenuhi 😕',
    icon: 'warning',
    html: `
      <p>Nilaimu: <strong>${nilaiAkhir}</strong></p>
      <p>Sayangnya kamu belum memenuhi syarat nilai minimal (80).</p>
      <p><strong>Silakan baca ulang materi sebelumnya</strong> lalu coba kerjakan ulang kuis ini ya 💪</p>
    `,
    confirmButtonText: 'Mengerti'
  }).then(() => {
    navigate('/belajar/evaluasi');
  });
}}


  const isAnswered = (index) => answers.hasOwnProperty(index);
  const isWrong = (index) => wrongAnswers.includes(index);

  return (
    <Container fluid className="p-4" style={{ height: '100vh', fontFamily: 'Verdana, sans-serif' }}>
      <Row className="h-100">
        <Col xs={12} md={4} lg={3} className="mb-4">
          <Card className="w-100">
            <Card.Body className="d-flex flex-column w-100">
              <Card.Title style={{ fontSize: '16px', textAlign: 'left' }}>
                Soal kategori:<br />
                <span className="text-success">Evaluasi</span>
              </Card.Title>

              <div
                className="mt-3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {quizData.map((_, i) => (
                  <Button
                    key={i}
                    variant={
                      current === i
                        ? 'secondary'
                        : isWrong(i)
                        ? 'danger'
                        : isAnswered(i)
                          ? 'success'
                          : 'outline-secondary'
                    }
                    onClick={() => setCurrent(i)}
                    style={{
                      width: '100%',
                      height: '50px',
                      padding: 0,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <div
                className="mt-3 w-100"
                style={{
                  fontSize: '14px',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                {timeRemaining > 0 ? `${timeRemaining} detik tersisa` : 'Waktu habis'}
              </div>

              {showResult && (
                <div className="mt-2 text-center fw-bold text-primary">
                  Nilai: {score} / {quizData.length}
                </div>
              )}

              {!showResult && (
                <Button className="mt-3" variant="danger" onClick={handleFinish}>
                  Selesai
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8} lg={9} className="d-flex flex-column">
          <Card className="h-100" style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '30px' }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title as="h4" className="mb-4">
                  <div
                    className="p-3 mb-3"
                    style={{
                      display: "block",
                      backgroundColor: "#d1e7dd",
                      fontSize: "18px",
                      borderRadius: "5px",
                      color: "#0f5132"
                    }}
                  >
                    {quizData[current].question}
                  </div>
                </Card.Title>

                <div className="d-flex flex-column gap-2">
                  {quizData[current].options.map((option, i) => {
                    const isSelected = answers[current] === i;
                    const isCorrectAnswer = option === quizData[current].answer;

                    let backgroundColor = '';
                    let textColor = '#198754';

                    if (showResult) {
                      if (isCorrectAnswer) {
                        backgroundColor = '#198754';
                        textColor = '#fff';
                      } else if (isSelected) {
                        backgroundColor = '#dc3545';
                        textColor = '#fff';
                      }
                    } else {
                      backgroundColor = isSelected || hovered === i ? '#198754' : '';
                      textColor = isSelected || hovered === i ? '#fff' : '#198754';
                    }

                    return (
                      <Button
                        key={i}
                        variant="outline-success"
                        onClick={() => handleOptionClick(i)}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="w-100 p-2 text-start"
                        style={{
                          fontSize: "16px",
                          backgroundColor,
                          borderColor: "#198754",
                          color: textColor
                        }}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="primary"
                  onClick={() => setCurrent((prev) => Math.min(prev + 1, quizData.length - 1))}
                >
                  Selanjutnya <FaArrowAltCircleRight />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EvaluasiJawab
