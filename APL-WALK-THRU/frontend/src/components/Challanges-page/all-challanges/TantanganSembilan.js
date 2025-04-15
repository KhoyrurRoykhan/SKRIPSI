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
import hartakarun from './assets/harta-karun.png';
import map from './assets/4-distance.png';
import grid from './assets/grid.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";

const TantanganSembilan = () => {
    const navigate = useNavigate();

    // hint challanges
    const showHint = () => {
      swal({
        title: "Petunjuk Tantangan",
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <p>Tugas kamu adalah <b>bergerak menuju harta karun</b> yang berada di posisi (150,150) menggunakan perintah <b>forward()</b>.</p>
              <p>Sebelum itu, kamu harus mengetahui terlebih dahulu <b>berapa jarak</b> antara posisi Bidawang dan harta karun.</p>
              <p>Gunakan perintah <b>distance</b> untuk menghitung jaraknya secara akurat.</p>
            `
          }
        },
        icon: "info"
      });
    };
    

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
  
    const [output, setOutput] = useState('');
    const [output1, setOutput1] = useState('');
    const [outputChallanges, setOutputChallanges] = useState('');
  
    const outfchallanges = (text) => {
      setOutputChallanges((prev) => prev + text);
    };

  
    const builtinReadChallanges = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles['files'][x];
    };
  
  
    const runitchallanges = (code, forceReset = false) => {
      setOutputChallanges('');
      setHasRun(false);
      const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-150,-150)\npendown()\nspeed(2)\n";
      const prog = forceReset ? imports : imports + pythonCodeChallanges;
    
      window.Sk.pre = "outputChallanges";
      window.Sk.configure({ output: outfchallanges, read: builtinReadChallanges });
      (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
    
      window.Sk.misceval.asyncToPromise(() =>
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
      ).then(() => {
        console.log('success');
        setHasRun(true);
        if (!forceReset) {
          checkCodeChallanges();
        }
      }, (err) => setOutputChallanges((prev) => prev + err.toString()));
    };
  
    const [hasRun, setHasRun] = useState(false);
  
    const checkCodeChallanges = () => {
      if (!hasRun) return;
    
      const validCodes = [
        ["left(45)", "print(distance(150,150))", "forward(424)"],
        ["right(315)", "print(distance(150,150))", "forward(424)"],
        ["left(45)", "print(distance(150,150))", "forward(424.2640687119285)"],
        ["right(315)", "print(distance(150,150))", "forward(424.2640687119285)"],
        ["print(distance(150,150))", "left(45)", "forward(424)"],
        ["print(distance(150,150))", "right(315)", "forward(424)"],
        ["print(distance(150,150))", "left(45)", "forward(424.2640687119285)"],
        ["print(distance(150,150))", "right(315)", "forward(424.2640687119285)"],
      ];
    
      const showError = (index, expected, actual, note = '') => {
        swal(
          "Salah!",
          `Baris ke-${index + 1} salah.\nSeharusnya: ${expected}\nKamu menulis: ${actual}${note ? `\nCatatan: ${note}` : ''}`,
          "error"
        ).then(() => {
          setHasRun(false);
          resetCodeChallanges();
        });
      };
    
      const userCodeLines = pythonCodeChallanges.trim().split("\n").map(line => line.trim());
    
      // Cek apakah semua kode cocok secara penuh
      const isExactMatch = validCodes.some(valid =>
        valid.length === userCodeLines.length &&
        valid.every((code, index) => code.replace(/\s+/g, '') === (userCodeLines[index] || "").replace(/\s+/g, ''))
      );
    
      if (isExactMatch) {
        swal("Jawaban Benar!", "Kamu berhasil!", "success");
        return;
      }
    
      // Cek apakah ada jalur yang cocok sejauh ini
      let partialMatchFound = false;
    
      for (const valid of validCodes) {
        let matchSoFar = true;
    
        for (let i = 0; i < userCodeLines.length; i++) {
          const expected = valid[i];
          const actual = userCodeLines[i];
    
          if (!expected || !actual) {
            matchSoFar = false;
            break;
          }
    
          const normExpected = expected.replace(/\s+/g, '');
          const normActual = actual.replace(/\s+/g, '');
    
          if (normExpected !== normActual) {
            matchSoFar = false;
            break;
          }
        }
    
        if (matchSoFar) {
          partialMatchFound = true;
          break;
        }
      }
    
      if (partialMatchFound) {
        // Jangan kasih alert, user masih di jalur benar
        return;
      }
    
      // Kalau semua jalur gagal cocok sejauh ini, tampilkan pesan salah
      // Cari tahu salahnya di mana untuk feedback
      for (const valid of validCodes) {
        const stepsToCheck = Math.min(userCodeLines.length, valid.length);
    
        for (let i = 0; i < stepsToCheck; i++) {
          const expected = valid[i];
          const actual = userCodeLines[i];
          const normExpected = expected.replace(/\s+/g, '');
          const normActual = actual.replace(/\s+/g, '');
    
          if (normExpected !== normActual) {
            if (normExpected.includes("distance") && normActual.includes("disctance")) {
              return showError(i, expected, actual, "Periksa penulisan fungsi `distance`, bukan `disctance`.");
            }
            if (normExpected.startsWith("forward(") && normActual.startsWith("forward(")) {
              return showError(i, expected, actual, "Cek kembali jarak yang kamu masukkan.");
            }
            if ((normExpected.startsWith("left(") || normExpected.startsWith("right(")) &&
                !(normActual.startsWith("left(") || normActual.startsWith("right("))) {
              return showError(i, expected, actual, "Kamu belum mengarahkan turtle ke arah harta karun.");
            }
            if (normExpected.startsWith("print(") && !normActual.startsWith("print(")) {
              return showError(i, expected, actual, "Kamu perlu mencetak jarak dengan `print(distance(...))`.");
            }
    
            return showError(i, expected, actual);
          }
        }
      }
    
      // Kalau sampai sini, berarti semua jalur gagal dan tidak diketahui pasti salahnya apa
      swal("Jawaban Salah", "Urutan atau isi kode tidak sesuai. Coba lagi!", "error");
    };
    
    const resetCodeChallanges = () => {
      setPythonCodeChallanges('');
      setOutput('');
      runitchallanges('', true);
    };
  
  
    useEffect(() => {
    //   runit2(); // Jalankan kode saat halaman dimuat
      runitchallanges(); // Jalankan kode saat halaman dimuat
    }, []);

  return (
    <Container fluid className="sidenavigasi mt-5">
        <Row>
        {/* Kolom Kiri - Prev */}
        <Col md={2} className="d-flex justify-content-center align-items-center">
        <Button
            variant="light"
            onClick={() => navigate('/challanges/8')}
            style={{
            background: 'linear-gradient(to right, #6c757d, #495057)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: '10px 20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            fontWeight: 'bold'
            }}
        >
            ◀️ Prev
        </Button>
        </Col>

        {/* Kolom Tengah - Konten Tantangan */}
        <Col md={8}>
            <div style={{marginTop:"20px"}}>
        
            <h4
              style={{
                color: '#2DAA9E',
                fontSize: '26px',
                fontWeight: 'bold',
                borderLeft: '5px solid #2DAA9E',
                paddingLeft: '10px',
                marginBottom: '15px',
              }}
            >
              9. Mencari Tahu Jarak Harta Karun
            </h4>
            
            <p>
                Selesaikan tantangan dibawah ini!
                Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
                </p>
                <div className="d-flex gap-2 mb-2">
                    <Button variant="info" onClick={showHint} style={{ color: 'white', fontWeight: 'bold' }}>
                        Petunjuk
                    </Button>

                    <Button
                    variant="warning"
                    onClick={() => navigate('/belajar/tellstate/distance')}
                    style={{ color: 'white', fontWeight: 'bold' }}
                    >
                    Kembali ke Materi
                    </Button>

                </div>

                <div className="skulpt-container" style={{
                      border: "3px solid #ccc",
                      borderRadius: "10px",
                      padding: "15px",
                      // display: "flex",
                      // flexWrap: "wrap",
                      gap: "20px",
                      justifyContent: "center",
                      backgroundColor: "#f9f9f9",
                    }}>
                  <div className="editor-section">
                    <CodeMirror
                      value={pythonCodeChallanges}
                      placeholder={'//Ketikan kode disini!'}
                      height="290px"
                      theme="light"
                      extensions={[python()]}
                      onChange={(value) => setPythonCodeChallanges(value)}
                      style={{
                        border: "2px solid #2DAA9E",
                        borderRadius: "8px",
                        padding: "5px",
                      }}
                    />
                    <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                      <Button variant="success" onClick={() => { runitchallanges();}}>Run Code</Button>
                      <Button variant="secondary" onClick={resetCodeChallanges}>
                        <BsArrowClockwise /> Reset
                      </Button>
                      </div>
                    <pre id='outputChallanges' className="output"style={{
                        height: "60px",
                        marginTop: '5px',
                        border: "2px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "#fff",
                      }}>{outputChallanges}</pre>
                  </div>
                  <div className="canvas-section" 
                  style={{
                    position: "relative",
                    width: "400px",
                    height: "405px",
                    borderRadius: "10px",
                    border: "3px solid #2DAA9E",
                    // overflow: "hidden"
                  }}>
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
                      <img
                          src={grid}
                          alt="grid"
                          style={{
                            position: "absolute",
                            left: "0px",
                            width: "400px", // Sesuaikan ukuran jika perlu
                            height: "400px",
                          }}
                      />
                      <img
                          src={hartakarun}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "325px",
                            top: "23px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      />
                  </div>
                </div>
            </div>
        </Col>

        {/* Kolom Kanan - Next */}
        <Col md={2} className="d-flex justify-content-center align-items-center">
        <Button
            variant="light"
            onClick={() => navigate('/challanges/10')}
            style={{
            background: 'linear-gradient(to right, #17a2b8, #138496)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: '10px 20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            fontWeight: 'bold',
            
            }}
        >
            Next ▶️
        </Button>
        </Col>
      </Row>
        
    </Container>
  )
}

export default TantanganSembilan
