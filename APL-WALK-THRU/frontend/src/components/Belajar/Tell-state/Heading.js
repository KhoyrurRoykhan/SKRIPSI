import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Accordion, Container, Row, Col, Button, Form, Alert, Card, Image, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import '../assets/tutor.css';
import '../asset_skulpt/SkulptTurtleRunner.css';
import { BsArrowClockwise, BsCheckCircle } from 'react-icons/bs'; // Import ikon Bootstrap
import left120 from './assets/1left120.gif';
import right90 from './assets/1right90.gif';
import gabunganleftright from './assets/1gabunganleftright.gif';

// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/cacingtarget.png';
import map from './assets/3-heading.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";
import Swal from "sweetalert2";

const correctCommands = {
  '1a': 'print(heading())',
  '1b': 'left(90)',
  '1c': 'print(heading())',
  '1d': 'right(180)',
  '1e': 'print(heading())'
};

const Heading = () => {
  //token
  const [activeButton, setActiveButton] = useState("intro-1");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/token`);
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  //kunci halaman
  const [progresBelajar, setProgresBelajar] = useState(27);
  
  useEffect(() => {
    const checkAkses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/token`);
        const decoded = jwtDecode(response.data.accessToken);

        const progres = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/progres-belajar`, {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`
          }
        });

        const progresBelajar = progres.data.progres_belajar;
        console.log(progresBelajar)
        setProgresBelajar(progres.data.progres_belajar);

        // Cek apakah progres cukup untuk akses halaman ini
        if (progresBelajar < 1) {
          // Redirect ke halaman materi sebelumnya
          navigate('/belajar/pendahuluan');
        }

      } catch (error) {
        console.log(error);
        navigate('/login'); // atau ke halaman login siswa
      }
    };

    checkAkses();
  }, [navigate]);

  const handleNavigate = (path, syarat) => {
    if (syarat) {
      navigate(path);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Selesaikan materi sebelumnya terlebih dahulu ya 😊',
        confirmButtonColor: '#3085d6',
      });
    }
  };  

  // Tentukan accordion aktif berdasarkan URL
  const activeAccordionKey = location.pathname.includes("/belajar/tellstate") || location.pathname.includes("/belajar/tellstate/heading")
    ? "2"
    : "0";

  // Class untuk tombol aktif
  const getButtonClass = (path) =>
    location.pathname === path ? "btn text-start mb-2 btn-success" : "btn text-start mb-2 btn-outline-success";


    // hint challanges
    const showHint = () => {
      swal(
        "Petunjuk Tantangan",
        "Tugas kalian adalah memeriksa arah mana yg tidak buntu (periksa menggunakan heading), masukan jawabannya pada kolom yang sudah disediakan!",
        "info"
      );
    };
    
    const [inputA, setInputA] = useState("");

    const checkAnswer = () => {
      const correctAnswersA = ["180.0", "180", "180,0"];
      
      if (correctAnswersA.includes(inputA)) {
        swal("Benar!", "Jawaban Anda benar.", "success");
      } else {
        swal("Salah!", "Jawaban Anda salah.", "error");
      }
    };
 
    //accordion task
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeKey, setActiveKey] = useState('1a');

  const normalizeLine = (line) => {
    return line
      .toLowerCase()               // bikin semua huruf kecil biar gak sensi kapital
      .replace(/['"]/g, '"')       // samain semua kutip jadi "
      .replace(/\s+/g, ' ')        // spasi berlebih jadi satu spasi
      .replace(/\s*\(\s*/g, '(')   // hapus spasi sekitar kurung buka
      .replace(/\s*\)\s*/g, ')')   // hapus spasi sekitar kurung tutup
      .replace(/\s*,\s*/g, ',')    // hapus spasi sekitar koma
      .replace(/\s*:\s*/g, ':')    // hapus spasi sekitar titik dua
      .trim();
  };
  
  const checkCode = () => {
    const cleanedCode = pythonCode
      .split('\n')
      .map(line => normalizeLine(line))
      .filter(line => line.length > 0);
  
    let newCompletedSteps = [];
  
    for (const key of Object.keys(correctCommands)) {
      const expected = correctCommands[key]
        .split('\n')
        .map(line => normalizeLine(line));
  
      const codeSlice = cleanedCode.slice(0, expected.length);
  
      const isMatch = expected.every((expectedLine, idx) => {
        const userLine = codeSlice[idx] || '';
        return userLine.includes(expectedLine);
      });
  
      if (isMatch) {
        newCompletedSteps.push(key);
        cleanedCode.splice(0, expected.length);
      } else {
        break;
      }
    }
  
    setCompletedSteps(newCompletedSteps);
  
    if (newCompletedSteps.length < Object.keys(correctCommands).length) {
      setActiveKey(Object.keys(correctCommands)[newCompletedSteps.length]);
    } else {
      setActiveKey(null);
    }
  };
  
    //kuis
    const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const correctAnswers = {
    question1: "Timur (kanan).",
    question2: "90"
  };

  const handleAnswerChange = (question, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleSubmit = async () => {
    const newFeedback = {};
    let allCorrect = true;
  
    // Cek semua jawaban
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
      const selected = selectedAnswers[question];
      const isCorrect = selected === correctAnswer;
  
      newFeedback[question] = isCorrect ? 'Benar!' : 'Salah!';
      if (!isCorrect) allCorrect = false;
    }
  
    setFeedback(newFeedback);
  
    // Jika semua benar dan progres saat ini adalah 13
    if (allCorrect && progresBelajar === 13) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_ENDPOINT}/user/progres-belajar`,
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
          title: 'Jawaban Benar!',
          text: 'Materi selanjutnya sudah terbuka 😊',
          confirmButtonColor: '#198754'
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
    } else if (allCorrect) {
      Swal.fire({
        icon: 'info',
        title: 'Sudah Diselesaikan',
        text: 'Kamu sudah menyelesaikan materi ini sebelumnya.',
        confirmButtonColor: '#198754'
      });
    }
  };

  
    const [pythonCode, setPythonCode] = useState(``);
    const [pythonCode1, setPythonCode1] = useState(`    
for i in range(100):
    speed(1)
    # Putar turtle ke kiri sebesar 90 derajat 
    left(90) 
    speed(0)
    home()
    reset()

`);
  
  
    const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
  
    const [output, setOutput] = useState('');
    const [output1, setOutput1] = useState('');
    const [outputChallanges, setOutputChallanges] = useState('');
  
    const outf = (text) => {
      setOutput((prev) => prev + text);
    };
  
    const outf1 = (text) => {
      setOutput1((prev) => prev + text);
    };
  
    const outfchallanges = (text) => {
      setOutputChallanges((prev) => prev + text);
    };
  
    const builtinRead = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles['files'][x];
    };
  
    const builtinRead1 = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles['files'][x];
    };
  
    const builtinReadChallanges = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles['files'][x];
    };
  
    const runit = (code, forceReset = false) => {
      setOutput('');
      const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(1)\n";
      const prog = forceReset ? imports : imports + pythonCode;
  
      window.Sk.pre = "output";
      window.Sk.configure({ output: outf, read: builtinRead });
      (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas';
  
      window.Sk.misceval.asyncToPromise(() => 
          window.Sk.importMainWithBody('<stdin>', false, prog, true)
      ).then(
          () => console.log('success'),
          (err) => setOutput((prev) => prev + err.toString())
      );
  };
  
    // ✅ Fungsi untuk menjalankan pythonCode1 (Contoh 1) - Perbaikan disini
    const runit1 = (code, forceReset = false) => {
      setOutput1('Arah awal: 0.0\nArah setelah putaran: 90.0');
      const imports = "from turtle import *\nreset()\nshape('turtle')\n";
      const prog = forceReset ? imports : imports + pythonCode1;
  
      window.Sk.pre = "output1"; // ID untuk <pre> output
      window.Sk.configure({ output: outf1, read: builtinRead1 }); // ✅ Perbaikan: output => outf1
      (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh1';
  
      window.Sk.misceval.asyncToPromise(() =>
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
      ).then(
        () => console.log('Contoh 1 berhasil dijalankan!'),
        (err) => setOutput1((prev) => prev + err.toString())
      );
    };
  
  
    const runitchallanges = (code, forceReset = false) => {
      setOutputChallanges('');
      const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(2)\n";
      const prog = forceReset ? imports : imports + pythonCodeChallanges;
    
      window.Sk.pre = "outputChallanges";
      window.Sk.configure({ output: outfchallanges, read: builtinReadChallanges });
      (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
    
      window.Sk.misceval.asyncToPromise(() => 
          window.Sk.importMainWithBody('<stdin>', false, prog, true)
      ).then(
          () => {
            console.log('success');
            setHasRun(true);
            checkCodeChallanges();
          },
          (err) => setOutput((prev) => prev + err.toString())
      );
    };
  
    const [hasRun, setHasRun] = useState(false);
  
    const checkCodeChallanges = () => {
      if (!hasRun) return;
  
      const validCodes = [
          ["left(90)","left(90)","print(heading())"], 
          ["right(90)","right(90)","print(heading())"],
          ["right(180)","print(heading())"],
          ["left(180)","print(heading())"],
      ];
  
      const userCodeLines = pythonCodeChallanges.trim().split("\n");
  
      // Cek apakah input pengguna merupakan bagian awal dari salah satu jawaban yang valid
      const isPartialMatch = validCodes.some(validCode =>
          validCode.slice(0, userCodeLines.length).every((code, index) => code === userCodeLines[index])
      );
  
      // Cek apakah input pengguna sudah benar secara keseluruhan
      const isExactMatch = validCodes.some(validCode =>
          validCode.length === userCodeLines.length && validCode.every((code, index) => code === userCodeLines[index])
      );
  
      if (isExactMatch) {
          // swal("Jawaban Benar!", "Kamu berhasil!", "success");
      } else if (!isPartialMatch) {
          swal("Jawaban Salah", "Coba lagi dengan perintah yang benar.", "error");
      }
  };
  
  
    const resetCode = () => {
      setPythonCode('');
      setOutput('');
      runit('', true);
  };
  
    const resetCodeChallanges = () => {
      setPythonCodeChallanges('');
      setOutput('');
      runitchallanges('', true);
    };
  
  
    useEffect(() => {
      runit();
      runit1(); // Jalankan kode saat halaman dimuat
    //   runit2(); // Jalankan kode saat halaman dimuat
      // runitchallanges(); // Jalankan kode saat halaman dimuat
    }, []);

  return (
    <Container fluid className="sidenavigasi mt-5" style={{fontFamily: 'Verdana, sans-serif' }}>
      <Row>
      <Col xs={2} className="bg-light border-end vh-100 p-0"
        style={{ overflowY: "hidden" }} // atau "auto", atau "scroll"
        >
        <Accordion defaultActiveKey={activeAccordionKey}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Pengenalan</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={getButtonClass("/belajar/pendahuluan")}
                    onClick={() => navigate("/belajar/pendahuluan")}
                  >
                    Pengenalan
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/pendahuluan/kuis")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/pendahuluan/kuis", progresBelajar >= 1)}
                    style={{ pointerEvents: progresBelajar < 1 ? "auto" : "auto", opacity: progresBelajar < 1 ? 0.5 : 1 }}
                  >
                    <span>📋 Kuis: Pengenalan</span>
                    {progresBelajar < 1 && <span className="ms-2">🔒</span>}
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Turtle Motion</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/leftright")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/leftright", progresBelajar >= 2)}
                    style={{ pointerEvents: progresBelajar < 2 ? "auto" : "auto", opacity: progresBelajar < 2 ? 0.5 : 1 }}
                  >
                    <span>Left & Right</span>
                    {progresBelajar < 2 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/forwardbackward")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/forwardbackward", progresBelajar >= 3)}
                    style={{ pointerEvents: progresBelajar < 3 ? "auto" : "auto", opacity: progresBelajar < 3 ? 0.5 : 1 }}
                  >
                    Forward & Backward
                    {progresBelajar < 3 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/setposition")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/setposition", progresBelajar >= 4)}
                    style={{ pointerEvents: progresBelajar < 4 ? "auto" : "auto", opacity: progresBelajar < 4 ? 0.5 : 1 }}
                  >
                    Set Position
                    {progresBelajar < 4 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/setxy")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/setxy", progresBelajar >= 5)}
                    style={{ pointerEvents: progresBelajar < 5 ? "auto" : "auto", opacity: progresBelajar < 5 ? 0.5 : 1 }}
                  >
                    Setx & sety
                    {progresBelajar < 5 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/setheading")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/setheading", progresBelajar >= 6)}
                    style={{ pointerEvents: progresBelajar < 6 ? "auto" : "auto", opacity: progresBelajar < 6 ? 0.5 : 1 }}
                  >
                    Setheading
                    {progresBelajar < 6 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/home")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/home", progresBelajar >= 7)}
                    style={{ pointerEvents: progresBelajar < 7 ? "auto" : "auto", opacity: progresBelajar < 7 ? 0.5 : 1 }}
                  >
                    Home
                    {progresBelajar < 7 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/circle")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/circle", progresBelajar >= 8)}
                    style={{ pointerEvents: progresBelajar < 8 ? "auto" : "auto", opacity: progresBelajar < 8 ? 0.5 : 1 }}
                  >
                    Circle
                    {progresBelajar < 8 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/dot")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/dot", progresBelajar >= 9)}
                    style={{ pointerEvents: progresBelajar < 9 ? "auto" : "auto", opacity: progresBelajar < 9 ? 0.5 : 1 }}
                  >
                    Dot
                    {progresBelajar < 9 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/turtlemotion/kuis")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/turtlemotion/kuis", progresBelajar >= 10)}
                    style={{ pointerEvents: progresBelajar < 10 ? "auto" : "auto", opacity: progresBelajar < 10 ? 0.5 : 1 }}
                  >
                    📋 Kuis: Pergerakan
                    {progresBelajar < 10 && <span className="ms-2">🔒</span>}
                  </button>

                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Tell State</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={`${getButtonClass("/belajar/tellstate/position")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/tellstate/position", progresBelajar >= 11)}
                    style={{ pointerEvents: progresBelajar < 11 ? "auto" : "auto", opacity: progresBelajar < 11 ? 0.5 : 1 }}
                  >
                    Position
                    {progresBelajar < 11 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/tellstate/xcorycor")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/tellstate/xcorycor", progresBelajar >= 12)}
                    style={{ pointerEvents: progresBelajar < 12 ? "auto" : "auto", opacity: progresBelajar < 12 ? 0.5 : 1 }}
                  >
                    Xcor & Ycor
                    {progresBelajar < 12 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/tellstate/heading")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/tellstate/heading", progresBelajar >= 13)}
                    style={{ pointerEvents: progresBelajar < 13 ? "auto" : "auto", opacity: progresBelajar < 13 ? 0.5 : 1 }}
                  >
                    Heading
                    {progresBelajar < 13 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/tellstate/distance")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/tellstate/distance", progresBelajar >= 14)}
                    style={{ pointerEvents: progresBelajar < 14 ? "auto" : "auto", opacity: progresBelajar < 14 ? 0.5 : 1 }}
                  >
                    Distance
                    {progresBelajar < 14 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/tellstate/kuis")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/tellstate/kuis", progresBelajar >= 15)}
                    style={{ pointerEvents: progresBelajar < 15 ? "auto" : "auto", opacity: progresBelajar < 15 ? 0.5 : 1 }}
                  >
                    📋 Kuis: Mengetahui Status
                    {progresBelajar < 15 && <span className="ms-2">🔒</span>}
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Pen & Color Control</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={`${getButtonClass("/belajar/pencontrol/penuppendown")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/pencontrol/penuppendown", progresBelajar >= 16)}
                    style={{ pointerEvents: progresBelajar < 16 ? "auto" : "auto", opacity: progresBelajar < 16 ? 0.5 : 1 }}
                  >
                    Pendown & Penup
                    {progresBelajar < 16 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/pencontrol/pensize")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/pencontrol/pensize", progresBelajar >= 17)}
                    style={{ pointerEvents: progresBelajar < 17 ? "auto" : "auto", opacity: progresBelajar < 17 ? 0.5 : 1 }}
                  >
                    Pensize
                    {progresBelajar < 17 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/pencontrol/isdown")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/pencontrol/isdown", progresBelajar >= 18)}
                    style={{ pointerEvents: progresBelajar < 18 ? "auto" : "auto", opacity: progresBelajar < 18 ? 0.5 : 1 }}
                  >
                    Isdown
                    {progresBelajar < 18 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/colorcontrol/pencolor")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/colorcontrol/pencolor", progresBelajar >= 19)}
                    style={{ pointerEvents: progresBelajar < 19 ? "auto" : "auto", opacity: progresBelajar < 19 ? 0.5 : 1 }}
                  >
                    Pencolor
                    {progresBelajar < 19 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/colorcontrol/fillcolor")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/colorcontrol/fillcolor", progresBelajar >= 20)}
                    style={{ pointerEvents: progresBelajar < 20 ? "auto" : "auto", opacity: progresBelajar < 20 ? 0.5 : 1 }}
                  >
                    Pengisian Warna (Fillcolor, Begin_fill, dan End_fill)
                    {progresBelajar < 20 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/pencolorcontrol/kuis")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/pencolorcontrol/kuis", progresBelajar >= 21)}
                    style={{ pointerEvents: progresBelajar < 21 ? "auto" : "auto", opacity: progresBelajar < 21 ? 0.5 : 1 }}
                  >
                    📋 Kuis: Kontrol Pena dan Warna
                    {progresBelajar < 21 && <span className="ms-2">🔒</span>}
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

           
            <Accordion.Item eventKey="4">
              <Accordion.Header>More Drawing Control</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={`${getButtonClass("/belajar/moredrawingcontrol/reset")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/moredrawingcontrol/reset", progresBelajar >= 22)}
                    style={{ pointerEvents: progresBelajar < 22 ? "auto" : "auto", opacity: progresBelajar < 22 ? 0.5 : 1 }}
                  >
                    Reset
                    {progresBelajar < 22 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/moredrawingcontrol/clear")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/moredrawingcontrol/clear", progresBelajar >= 23)}
                    style={{ pointerEvents: progresBelajar < 23 ? "auto" : "auto", opacity: progresBelajar < 23 ? 0.5 : 1 }}
                  >
                    Clear
                    {progresBelajar < 23 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/moredrawingcontrol/write")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/moredrawingcontrol/write", progresBelajar >= 24)}
                    style={{ pointerEvents: progresBelajar < 24 ? "auto" : "auto", opacity: progresBelajar < 24 ? 0.5 : 1 }}
                  >
                    Write
                    {progresBelajar < 24 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/perulangan/forloop")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/perulangan/forloop", progresBelajar >= 25)}
                    style={{ pointerEvents: progresBelajar < 25 ? "auto" : "auto", opacity: progresBelajar < 25 ? 0.5 : 1 }}
                  >
                    For Loops
                    {progresBelajar < 25 && <span className="ms-2">🔒</span>}
                  </button>

                  <button
                    className={`${getButtonClass("/belajar/moredrawingcontrol/kuis")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/moredrawingcontrol/kuis", progresBelajar >= 26)}
                    style={{ pointerEvents: progresBelajar < 26 ? "auto" : "auto", opacity: progresBelajar < 26 ? 0.5 : 1 }}
                  >
                    📋 Kuis: Kontrol Gambar Lanjutan
                    {progresBelajar < 26 && <span className="ms-2">🔒</span>}
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Evaluasi</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={`${getButtonClass("/belajar/evaluasi")} d-flex justify-content-between align-items-center w-100`}
                    onClick={() => handleNavigate("/belajar/evaluasi", progresBelajar >= 27)}
                    style={{ pointerEvents: progresBelajar < 27 ? "auto" : "auto", opacity: progresBelajar < 27 ? 0.5 : 1 }}
                  >
                    Evaluasi
                    {progresBelajar < 27 && <span className="ms-2">🔒</span>}
                  </button>                  
                </div>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Col>

        <Col xs={10} className="p-4">
        <div className='content' style={{paddingLeft:50, paddingRight:50}}>
          <div>
            <h2 style={{
                textAlign: 'center',
                backgroundColor: '#198754',
                color: 'white',
                padding: '10px 20px',
                // borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '24px',
                letterSpacing: '1px',
                borderLeft: '10px solid orange' // Border kiri dengan warna oranye
              }}>
                Heading
              </h2>
            <hr></hr>
            <br/>

            <h4
              style={{
                // color: '#2DAA9E',
                fontSize: '22px',
                fontWeight: 'bold',
                borderLeft: '5px solid #198754',
                paddingLeft: '10px',
                marginBottom: '10px',
              }}
            >
              Tujuan Pembelajaran
            </h4>
            <ol
              style={{
                backgroundColor: '#F9F9F9',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                listStylePosition: 'inside',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
              Mengetahui cara memeriksa arah pergerakan dari bidawang menggunakan heading().
              </li>
            </ol>

            <hr/>

            <p>
            Fungsi <code>heading()</code> digunakan untuk menampilkan arah pergerakan bidawang dalam satuan derajat. Sama seperti perintah sebelumnya (<i>Position()</i>) Untuk menampilkan hasilnya kita bisa menggunakan fungsi <code>print()</code>.
            </p>

            <ul>
              <li><strong>0°</strong>: Timur (Kanan Layar)</li>
              <li><strong>90°</strong>: Utara (Atas Layar)</li>
              <li><strong>180°</strong>: Barat (Kiri Layar)</li>
              <li><strong>270°</strong>: Selatan (Bawah Layar)</li>
            </ul>

            <br></br>

            <h5>Contoh:</h5>
            <p>Menampilkan posisi arah pergerakan dari bidawang sebelum dan sesudah berotasi:</p>
            <Row className="align-items-center">
              <Col md={6}>
                <CodeMirror
                  value={`# Periksa arah awal 
print("Arah awal:", heading()) 

# Putar turtle ke kiri sebesar 90 derajat 
left(90) 

# Periksa arah setelah putaran 
print("Arah setelah putaran:", heading()) `}
                  height="280px"
                  theme="light"
                  extensions={[python()]}
                  editable={false}
                  options={{ readOnly: 'nocursor' }}
                />
                <pre id='output1' className="output mt-2" style={{height:120}}>{output1}</pre>
              </Col>
              <Col md={6} className="text-center">
                <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
                  <div style={{textAlign:'center'}} id="mycanvas-contoh1"></div>
                </div>
              </Col>
            </Row>
            <br></br>
            <p><b>Hasil:</b> Fungsi <code>heading()</code> digunakan untuk mendapatkan arah pergerakan dari bidawang, kemudian untuk menampilkan nilainya kita bisa menggunakan fungsi <code>print()</code>.</p>
            
            <br></br>
            <hr />

            <div
              style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                // maxWidth: '1000px',
                margin: 'auto',
              }}
            >
              <h4 style={{
                  // color: '#2DAA9E',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  borderLeft: '5px solid #198754',
                  paddingLeft: '10px',
                  marginBottom: '15px',
                }}>
                  Latihan Menggunakan heading() 🐢
                </h4>
            <p>
            Untuk lebih mudah memahami cara kerja perintah <code>xcor()</code> dan <code>ycor()</code>, ikuti instruksi dibawah ini
            </p>
            <Row>
              <Col xs={3} style={{ fontSize: 15 }}>
                <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                  <AccordionItem eventKey="1a">
                    <AccordionHeader>
                      <b>1. Periksa Arah</b>
                      {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Periksa arah bidawang dengan menggunakan perintah dibawah ini:</p>
                      <pre><code>print(heading())</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1b">
                    <AccordionHeader>
                      <b>2. Berputar ke Kiri</b>
                      {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk memutar Bidawang ke kiri sebesar 90 derajat:</p>
                      <pre><code>left(90)</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1c">
                    <AccordionHeader>
                      <b>3. Periksa Arah</b>
                      {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Periksa lagi arah bidawang dengan perintah dibawah ini:</p>
                      <pre><code>print(heading())</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1d">
                    <AccordionHeader>
                      <b>4. Berputar ke Kanan</b>
                      {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Putar Bidawang ke kanan sebesar 180 derajat agar menghadap kebawah layar:</p>
                      <pre><code>right(180)</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1e">
                    <AccordionHeader>
                      <b>5. Periksa Arah</b>
                      {completedSteps.includes('1e') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Periksa lagi arah bidawang:</p>
                      <pre><code>print(heading())</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </Col>



              <Col xs={9}>
              <div className="skulpt-container" style={{border: "2px solid #ccc"}}>
              <div className="editor-section">
                {/* <h5>Python Turtle Code Editor</h5> */}
                <CodeMirror
                  value={pythonCode}
                  placeholder={'//Ketikan kode disini!'}
                  height="250px"
                  theme="light"
                  extensions={[python()]}
                  onChange={(value) => setPythonCode(value)}
                />
                <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                  <Button variant="success" onClick={() => { runit(); checkCode(); }}>Run Code</Button>
                  <Button variant="secondary" onClick={resetCode}>
                    <BsArrowClockwise /> Reset
                  </Button>
                  </div>
                <pre id='output' className="output" style={{height:100}}>{output}</pre>
              </div>
              <div className="canvas-section" style={{width: 400, height: 400}}>
                <div  style={{width: 400, height: 400}} id="mycanvas"></div>
              </div>
            </div>
              </Col>
            </Row>
            </div>

            <br></br>

            <hr/>

            <div
              style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                // maxWidth: '1000px',
                margin: 'auto',
                borderLeft: '5px solid #198754',
                borderRight: '5px solid #198754',
              }}
            >
              <h4 style={{
                  // color: '#2DAA9E',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  // borderLeft: '5px solid #2DAA9E',
                  // paddingLeft: '10px',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}>
                  Kesimpulan
                </h4>
            <p>
            Perintah <code>heading()</code> berguna untuk memantau arah gerakan bidawang dengan lebih tepat. Pemahaman tentang sistem derajat akan membantu siswa menggambar bentuk dan pola secara lebih akurat. 
            </p>
            </div>
            

            <br/>

            <Accordion className="mb-4" style={{ outline: "3px solid #198754", borderRadius: "10px" }}>
            {/* Kuis Accordion */}
            <Accordion.Item eventKey="0">
            <Accordion.Header>
                <h4 style={{ fontWeight: "bold" }}>Pertanyaan</h4>
              </Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group controlId="question1">
                    <Form.Label className="p-3 mb-3"
                      style={{
                        display: "block",
                        backgroundColor: "#f8f9fa",
                        // borderLeft: "5px solid #2DAA9E",
                        // borderRight: "5px solid #2DAA9E",
                        fontSize: "18px",
                        // fontWeight: "bold",
                        borderRadius: "5px"
                      }}>
                        1. Dalam canvas Bidawang, arah 0 derajat mengarah ke mana? 
                      </Form.Label>
                      <div className="row d-flex">
                    {[
                      "Utara (atas).",
                      "Timur (kanan).",
                      "Barat (kiri).",
                      "Selatan (bawah)."
                    ].map((answer) => (
                      <div key={answer} className="mb-2">
                        <Button
                          variant={selectedAnswers.question1 === answer ? "success" : "outline-success"}
                          onClick={() => handleAnswerChange("question1", answer)}
                          className="w-100 p-2"
                          style={{
                            fontSize: "16px",
                            // fontWeight: "bold",
                            backgroundColor: selectedAnswers.question1 === answer ? "#2DAA9E" : "",
                            borderColor: "#2DAA9E",
                            textAlign: 'left'
                          }}
                        >
                          {answer}
                        </Button>
                      </div>
                    ))}
                  </div>

                  </Form.Group>
                  {feedback.question1 && (
                    <Alert variant={feedback.question1 === "Benar!" ? "success" : "danger"} className="mt-3">
                      {feedback.question1}
                    </Alert>
                  )}

                  <Form.Group controlId="question2">
                    <Form.Label className="p-3 mb-3"
                      style={{
                        display: "block",
                        backgroundColor: "#f8f9fa",
                        // borderLeft: "5px solid #2DAA9E",
                        // borderRight: "5px solid #2DAA9E",
                        fontSize: "18px",
                        // fontWeight: "bold",
                        borderRadius: "5px"
                      }}>
                        2. Apa hasil dari perintah berikut jika turtle sudah diputar 90 derajat ke kiri?  <pre>print(heading())</pre> 
                      </Form.Label>
                      <div className="row d-flex">
                      {["0", 
                      "90", 
                      "180", 
                      "270"].map(
                        (answer) => (
                          <div key={answer} className="mb-2">
                            <Button
                              variant={selectedAnswers.question2 === answer ? "success" : "outline-success"}
                              onClick={() => handleAnswerChange("question2", answer)}
                              className="w-100 p-2 flex-grow-1"
                              style={{
                                fontSize: "16px",
                                // fontWeight: "bold",
                                backgroundColor: selectedAnswers.question2 === answer ? "#2DAA9E" : "",
                                borderColor: "#2DAA9E",
                                textAlign: 'left'
                              }}
                            >
                              {answer}
                            </Button>
                          </div>
                        )
                      )}
                    </div>

                  </Form.Group>
                  {feedback.question2 && (
                    <Alert variant={feedback.question2 === "Benar!" ? "success" : "danger"} className="mt-3">
                      {feedback.question2}
                    </Alert>
                  )}

                <div className="text-center">
                  <Button variant="primary" onClick={handleSubmit} className="mt-3 p-2" style={{ fontSize: "18px" }}>
                    Periksa Jawaban
                  </Button>
                </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
            <Accordion.Item eventKey="1">
              <Accordion.Header><h4>Tantangan</h4></Accordion.Header>
              <Accordion.Body>
              <p>
                Selesaikan tantangan dibawah ini!
                Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
                </p>
                <Button className=" mb-2" variant="info" onClick={showHint}>
                  Petunjuk
                </Button>

                <div className="mb-3 mt-3">
                <label className="me-2"><b>X</b> :</label>
                <input type="text" value={inputA} onChange={(e) => setInputA(e.target.value)} />
                <Button className="ms-3" variant="primary" onClick={checkAnswer}>
                  Periksa Jawaban
                </Button>
                </div>

                <div className="skulpt-container" style={{border: "2px solid #ccc"}}>
                  <div className="editor-section">
                    <CodeMirror
                      value={pythonCodeChallanges}
                      placeholder={'//Ketikan kode disini!'}
                      height="290px"
                      theme="light"
                      extensions={[python()]}
                      onChange={(value) => setPythonCodeChallanges(value)}
                    />
                    <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                      <Button variant="success" onClick={() => { runitchallanges(); checkCode(); }}>Run Code</Button>
                      <Button variant="secondary" onClick={resetCodeChallanges}>
                        <BsArrowClockwise /> Reset
                      </Button>
                      </div>
                    <pre id='outputChallanges' className="output" style={{height:60}}>{outputChallanges}</pre>
                  </div>
                  <div className="canvas-section" style={{ position: "relative", width: 400, height: 400,  }}>
                    <div id="mycanvas-challanges" style={{ 
                      width: 400, 
                      height: 400, 
                      position: "relative", 
                    }}></div>
                      <img
                          src={map}
                          alt="Map"
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            width: "400px", // Sesuaikan ukuran jika perlu
                            height: "400px",
                          }}
                      />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
          </div>
        </div>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Heading
