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
import broccoli from './assets/kepiting.png';
import grid from './assets/3-setposition-b.png';
import map from './assets/5-setheading-tilemap.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";



const TantanganLima = () => {
    const navigate = useNavigate();

    //hh
    const showHint = () => {
      swal({
        title: "Petunjuk Tantangan",
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <p>Bidawang saat ini berada di tengah layar (titik <b>(0, 0)</b>), sedangkan kepiting berada di suatu arah tertentu.</p>
              <p>Tugas kamu adalah <b>mengubah arah Bidawang</b> agar menghadap ke arah kepiting menggunakan perintah <b>setheading()</b>.</p>
              <p>Jika arah yang kamu masukkan benar, kepiting akan <b>berpindah tempat</b>. Tantangan akan selesai setelah kamu berhasil <b>menebak semua arah kepiting</b> dengan benar.</p>
            `
          }
        },
        icon: "info"
      });
    };
    

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState('');
const [output, setOutput] = useState('');
const [step, setStep] = useState(0);
const [hasRun, setHasRun] = useState(false);
const [processingAlert, setProcessingAlert] = useState(false);

const headingAnswers = [0, 90, 180, 270];
const broccoliPositions = [
  { left: '345px', top: '175px' }, // setheading(0)
  { left: '175px', top: '5px' },   // setheading(90)
  { left: '5px', top: '175px' },   // setheading(180)
  { left: '175px', top: '345px' }, // setheading(270)
];

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
    if (processingAlert) return;
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
        if (!forceReset) checkCodeChallanges();
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const checkCodeChallanges = async () => {
    if (!hasRun || processingAlert) return;

    const userCode = pythonCodeChallanges
      .replace(/\s/g, '')
      .replace(/setheading/gi, 'setheading');
    const expectedAngle = headingAnswers[step];

    const isCorrect = userCode.includes(`setheading(${expectedAngle})`);

    setProcessingAlert(true);
    if (isCorrect) {
      await swal("Jawaban Benar!", "Kamu berhasil!", "success").then(() => {
        if (step < headingAnswers.length - 1) {
          setStep((prev) => prev + 1);
        } else {
          swal("Selamat!", "Kamu berhasil menyelesaikan semua tantangan!", "success");
        }
        resetCodeChallanges();
      });
    } else if (userCode !== '') {
      await swal("Jawaban Salah", "Gunakan setheading() untuk mengatur arahnya.", "error").then(() => {
        resetCodeChallanges();
      });
    }
    setProcessingAlert(false);
  };


  const resetCodeChallanges = () => {
    setPythonCodeChallanges('');
    setOutput('');
    setHasRun(false);
    setTimeout(() => runitchallanges('', true), 100);
  };


  useEffect(() => {
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);
  return (
    <Container fluid className="sidenavigasi mt-5">
        <Row>
        {/* Kolom Kiri - Prev */}
        <Col md={2} className="d-flex justify-content-center align-items-center">
        <Button
            variant="light"
            onClick={() => navigate('/challanges/4')}
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
              5. Menebak Arah Kepiting Dengan Spesifik
            </h4>
            
            <p>Selesaikan tantangan dengan mengarahkan bidawang ke arah cacing menggunakan <code>setheading()</code>.</p>
            <div className="d-flex gap-2 mb-2">
                    <Button variant="info" onClick={showHint} style={{ color: 'white', fontWeight: 'bold' }}>
                        Petunjuk
                    </Button>

                    <Button
                    variant="warning"
                    onClick={() => navigate('/belajar/turtlemotion/setheading')}
                    style={{ color: 'white', fontWeight: 'bold' }}
                    >
                    Kembali ke Materi
                    </Button>

                </div>

              <div className="skulpt-container" style={{ border: "3px solid #ccc", borderRadius: "10px", padding: "15px", backgroundColor: "#f9f9f9" }}>
                <div className="editor-section">
                  <CodeMirror
                    value={pythonCodeChallanges}
                    placeholder={'// Ketikan kode disini!'}
                    height="290px"
                    theme="light"
                    extensions={[python()]}
                    onChange={(value) => setPythonCodeChallanges(value)}
                    style={{ border: "2px solid #2DAA9E", borderRadius: "8px", padding: "5px" }}
                  />
                  <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                    <Button variant="success" onClick={() => runitchallanges()}>Run Code</Button>
                    <Button variant="secondary" onClick={resetCodeChallanges}><BsArrowClockwise/> Reset</Button>
                  </div>
                  <pre className="output" style={{ height: "60px", border: "2px solid #ccc", borderRadius: "5px", padding: "5px", backgroundColor: "#fff" }}>{output}</pre>
                </div>
                <div className="canvas-section" style={{ position: "relative", width: "400px", height: "405px", borderRadius: "10px", border: "3px solid #2DAA9E" }}>
                  <div id="mycanvas-challanges" style={{ width: 400, height: 400, position: "relative" }}></div>
                  <img src={map} alt="Map" style={{ position: "absolute", left: "0px", top: "0px", width: "400px", height: "400px" }} />
                  <img src={grid} alt="Grid" style={{ position: "absolute", left: "0px", top: "0px", width: "400px", height: "400px" }} />
                  <img src={broccoli} alt="Target Broccoli" style={{ position: "absolute", ...broccoliPositions[step], width: "50px", height: "50px" }} />
                </div>
              </div>
            </div>
        </Col>

        {/* Kolom Kanan - Next */}
        <Col md={2} className="d-flex justify-content-center align-items-center">
        <Button
            variant="light"
            onClick={() => navigate('/challanges/6')}
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

export default TantanganLima
