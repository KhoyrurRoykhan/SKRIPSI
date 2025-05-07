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
import targetA from './assets/cacing-target-1.png';
import targetB from './assets/cacing-target-2.png';
import targetC from './assets/cacing-target-3.png';
import targetD from './assets/cacing-target-4.png';
import map from './assets/3-setposition-b.png';
import tilemap from './assets/3-setposition-tilemap.png';
import maptitik from './assets/3-setposition-a-titik.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";
import Swal from "sweetalert2";


const TantanganTiga = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    // hint
    const showHint = () => {
      swal({
        title: "Petunjuk Tantangan",
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <p>Bidawang saat ini berada di tengah layar (titik <b>(0, 0)</b>).</p>
              <p>Tugas kamu adalah memindahkan Bidawang ke titik-titik yang sudah <b>ditandai</b> di sepanjang sungai pada canvas.</p>
              <p>Pindahkan Bidawang secara <b>berurutan</b> mengikuti alur sungai dengan menggunakan perintah <b>setposition(x, y)</b> untuk setiap titik.</p>
            `
          }
        },
        icon: "info"
      });
    };

    const [progresTantangan, setProgresTantangan] = useState(0);

  useEffect(() => {
    const checkAksesTantangan = async () => {
      try {
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);

        const progres = await axios.get('http://localhost:5000/user/progres-tantangan', {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`
          }
        });

        const progresTantangan = progres.data.progres_tantangan;
        console.log(progresTantangan);
        setProgresTantangan(progresTantangan);

        // Misal: hanya bisa akses jika progres_tantangan >= 3
        if (progresTantangan < 2) {
          navigate('/challanges'); // ganti ke halaman tantangan sebelumnya
        }

      } catch (error) {
        console.log(error);
        navigate('/login'); // fallback ke login
      }
    };

    checkAksesTantangan();
  }, [navigate]);    
    

    const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
    const [currentStep, setCurrentStep] = useState(0); // Track the current step
    const [output, setOutput] = useState('');
    const pythonCodeRef = useRef('');


    const outf = (text) => {
        setOutput((prev) => prev + text);
    };

    const builtinRead = (x) => {
        if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
        }
        return window.Sk.builtinFiles['files'][x];
    };

    const runitchallanges = (code, forceReset = false, skipCheck = false) => {
        setOutput('');
        const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-100,-100)\nspeed(2)\npendown()\n";
        const prog = forceReset ? imports : imports + pythonCodeChallanges;
      
        window.Sk.pre = "output4";
        window.Sk.configure({ output: outf, read: builtinRead });
        (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
      
        window.Sk.misceval.asyncToPromise(() =>
          window.Sk.importMainWithBody('<stdin>', false, prog, true)
        ).then(
          () => {
            console.log('success');
            if (!skipCheck) {
              checkCodeChallanges(); // Langsung panggil tanpa syarat
            }
          },
          (err) => setOutput((prev) => prev + err.toString())
        );
      };
      
    
      const [hasRun, setHasRun] = useState(false);
    
      const checkCodeChallanges = () => {
        const validCode = [
          "setposition(100,-100)",
          "setposition(100,0)",
          "setposition(0,100)",
          "setposition(-100,0)",
          "setposition(-100,-100)",
        ];
      
        const userCodeLines = pythonCodeRef.current
          .trim()
          .split("\n")
          .map(line => line.trim())
          .filter(line => line !== "");
      
        for (let i = 0; i < userCodeLines.length; i++) {
          const line = userCodeLines[i];
      
          if (!line.startsWith("setposition")) {
            return swal("Salah", "Anda harus menggunakan setposition", "error").then(() => {
              pythonCodeRef.current = '';
              resetCodeChallanges();
            });
          }
      
          if (line !== validCode[i]) {
            return swal("Salah", "Posisi x y yang anda masukan tidak tepat", "error").then(() => {
              pythonCodeRef.current = '';
              resetCodeChallanges();
            });
          }
        }
      
        if (userCodeLines.length + currentStep === validCode.length) {
          swal("Benar!", "Kamu berhasil menyelesaikan tantangan!", "success").then(async () => {
            try {
              if (progresTantangan === 2) {
                await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/user/progres-tantangan`, {
                  progres_tantangan: progresTantangan + 1
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                setProgresTantangan(prev => prev + 1);
              }
            } catch (error) {
              console.error("Gagal update progres tantangan halaman 3:", error);
              Swal.fire({
                icon: 'error',
                title: 'Gagal Update Progres Tantangan',
                text: 'Terjadi kesalahan saat memperbarui progres tantangan halaman ketiga.',
                confirmButtonColor: '#d33'
              });
            }
          });
        }
      };
      
    
    const initializeTurtle = () => {
      const imports = "from turtle import *\nshape('turtle')\n";
      const initialPosition = "reset()\nspeed(0)\npenup()\nsetpos(-100, -100)\npendown()\nspeed(2)\n"; // Set initial position
      const prog = imports + initialPosition;
    
      window.Sk.pre = "output";
      window.Sk.configure({ output: outf, read: builtinRead });
      (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
    
      window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
      ).then(
        () => {},
        (err) => setOutput((prev) => prev + err.toString())
      );
    };
    
    
    const resetCodeChallanges = () => {
      setPythonCodeChallanges('');
      pythonCodeRef.current = '';
      setCurrentStep(0);
      setOutput('');
      setHasRun(false);
      runitchallanges('', true, true); // <- kirim skipCheck = true
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
            onClick={() => navigate('/challanges/2')}
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
              3. Berpindah Posisi Sesuai Koordinat
            </h4>
            
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                Selesaikan tantangan dibawah ini!
                Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
                </p>
                <div className="d-flex gap-2 mb-2">
                    <Button variant="info" onClick={showHint} style={{ color: 'white', fontWeight: 'bold' }}>
                        Petunjuk
                    </Button>

                    <Button
                    variant="warning"
                    onClick={() => navigate('/belajar/turtlemotion/setposition')}
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
                      onChange={(value) => {
                        setPythonCodeChallanges(value);
                        pythonCodeRef.current = value;
                      }}                  
                      style={{
                        border: "2px solid #2DAA9E",
                        borderRadius: "8px",
                        padding: "5px",
                      }}
                    />
                    <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                      <Button variant="success" onClick={() => { runitchallanges() }}>Run Code</Button>
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
                    {/* <img
                          src={targetA}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "275px",
                            top: "75px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      />
                      <img
                          src={targetB}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "175px",
                            top: "75px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      />
                      <img
                          src={targetC}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "75px",
                            top: "75px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      />
                      <img
                          src={targetD}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "75px",
                            top: "275px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      /> */}
                      {/* <img
                          src={map}
                          alt="Map"
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            width: "400px", // Sesuaikan ukuran jika perlu
                            height: "400px",
                          }}
                      /> */}
                      <img
                          src={tilemap}
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
                          src={maptitik}
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
            </div>
        </Col>

        {/* Kolom Kanan - Next */}
        <Col md={2} className="d-flex justify-content-center align-items-center">
        <Button
            variant="light"
            onClick={() => navigate('/challanges/4')}
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

export default TantanganTiga
