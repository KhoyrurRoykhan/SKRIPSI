import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Accordion, Container, Row, Col, Button, Form, Alert, Card, Image, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import { BsArrowClockwise, BsCheckCircle } from 'react-icons/bs'; // Import ikon Bootstrap
import '../assets/tutor.css';
import '../asset_skulpt/SkulptTurtleRunner.css';
import forward100 from './assets/2turtle-forward.gif';
import backward100 from './assets/2turtle-backward.gif';
// import combinedForwardBackward from './assets/combinedForwardBackward.gif';

// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/cacingtarget.png';
import map from './assets/4-setx-sety-tilemap.png';
import grid from './assets/3-setposition-b.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";


const TantanganEmpat = () => {
    const navigate = useNavigate();

    //hh
    const showHint = () => {
      swal({
        title: "Petunjuk Tantangan",
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <p>Bidawang saat ini berada di tengah layar (titik <b>(0, 0)</b>), sedangkan cacing berada di titik <b>(100, 100)</b>.</p>
              <p>Tugas kamu adalah <b>memindahkan Bidawang</b> menuju ke posisi cacing dengan menggunakan <b>setx()</b> dan <b>sety()</b>.</p>
            `
          }
        },
        icon: "info"
      });
    };
    

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);

  const [output, setOutput] = useState('');

  const outf = (text) => {
    setOutput((prev) => prev + text);
  };

  const builtinRead = (x) => {
    if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
      throw `File not found: '${x}'`;
    }
    return window.Sk.builtinFiles['files'][x];
  };

  const runitchallanges = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(2)\n";
    const prog = forceReset ? imports : imports + pythonCodeChallanges;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => {
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
      ["setx(100)", "sety(100)"],
      ["sety(100)", "setx(100)"]
    ];
  
    const userCodeLines = pythonCodeChallanges.trim().split("\n").map(line => line.trim()).filter(line => line !== "");
    if (userCodeLines.length === 0) return;
  
    const step1 = userCodeLines[0];
  
    // Validasi step 1
    if (!step1.startsWith("setx(") && !step1.startsWith("sety(")) {
      return swal("Salah", "Anda harus menggunakan setx atau sety di langkah pertama", "error").then(() => {
        setPythonCodeChallanges('');
        initializeTurtle();
      });
    }
  
    if (!step1.includes("(100)")) {
      return swal("Salah", "Koordinat yang Anda masukkan salah pada langkah pertama", "error").then(() => {
        setPythonCodeChallanges('');
        initializeTurtle();
      });
    }
  
    // Kalau user sudah menulis step ke-2
    if (userCodeLines.length > 1) {
      const step2 = userCodeLines[1];
      const isFirstSetx = step1.startsWith("setx");
      const isSecondSetx = step2.startsWith("setx");
      const isSecondSety = step2.startsWith("sety");
  
      if (!(isSecondSetx || isSecondSety)) {
        return swal("Salah", "Gunakan setx atau sety di langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
  
      if (isFirstSetx && isSecondSetx) {
        return swal("Salah", "Gunakan sety pada langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
  
      if (!isFirstSetx && isSecondSety) {
        return swal("Salah", "Gunakan setx pada langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
  
      if (!step2.includes("(100)")) {
        return swal("Salah", "Koordinat yang Anda masukkan salah pada langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
    }
  
    // Cek apakah semua langkah sudah benar
    const isCorrect = validCodes.some(valid =>
      valid.length === userCodeLines.length &&
      valid.every((line, idx) => line === userCodeLines[idx])
    );
  
    if (isCorrect) {
      swal("Benar!", "Kamu berhasil menyelesaikan tantangan!", "success");
    }
  };
  
  

  const initializeTurtle = () => {
    const initCode = `from turtle import *
reset()
shape("turtle")
speed(2)`;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody("<stdin>", false, initCode, true)
    ).then(() => {
      console.log("Turtle initialized to default state.");
    });
  };


const resetCodeChallanges = () => {
  setPythonCodeChallanges('');
  setOutput('');
  initializeTurtle(); // Reset posisi turtle
};


  useEffect(() => {
    initializeTurtle(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <Container fluid className="sidenavigasi mt-5">
        <Row>
        {/* Kolom Kiri - Prev */}
        <Col md={2} className="d-flex justify-content-center align-items-center">
        <Button
            variant="light"
            onClick={() => navigate('/challanges/3')}
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
              4. Berpindah Posisi Sesuai Koordinat X dan Y
            </h4>
            
            <p>
                Selesaikan tantangan dibawah ini!
                Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.</p>
                <div className="d-flex gap-2 mb-2">
                    <Button variant="info" onClick={showHint} style={{ color: 'white', fontWeight: 'bold' }}>
                        Petunjuk
                    </Button>

                    <Button
                    variant="warning"
                    onClick={() => navigate('/belajar/turtlemotion/setxy')}
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
                    <pre className="output"style={{
                        height: "60px",
                        marginTop: '5px',
                        border: "2px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "#fff",
                      }}>
                        {output}
                      </pre>
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
                          src={broccoli}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "275px",
                            top: "75px",
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
            onClick={() => navigate('/challanges/5')}
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

export default TantanganEmpat
