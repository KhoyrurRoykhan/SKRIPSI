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
import peringatan from './assets/peringatan.gif';
// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/cacingtarget.png';
import map from './assets/2-forward-backward-b.png';
import tilemap from './assets/2-forward-backward-tilemap.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'backward(50)',
  '1c': 'backward(100)'
};

const KuisAccordion = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "1. Gerakan Bidawang menuju ke posisi cacing tanpa menabrak dinding.\n 2. Gunakan forward() atau backward() lalu kombinasikan dengan left() atau right() untuk membuat bidawang berbelok arah. \n\n",
      "info"
    );
  };

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
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

  const runitchallanges = (code = '', forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-100,-100)\npendown()\nspeed(2)\n";
    const prog = forceReset ? imports : imports + code;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => {
        if (!forceReset && code.trim().length > 0) {
          setHasRun(true);
          checkCodeChallanges(code); // Panggil dengan kode aktual
        }
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };
  
  

  const [hasRun, setHasRun] = useState(false);

  const validCode = ["forward(200)", "left(90)", "forward(200)", "left(90)", "forward(200)"];

  const checkCodeChallanges = (userCode) => {
    const trimmedCode = userCode.trim();
    if (!trimmedCode) return;
  
    const userCodeLines = trimmedCode.split("\n").map(line => line.trim());
    const linesToCheck = userCodeLines.slice(currentStep);
  
    const forwardRegex = /^forward\((\d+)\)$/;
    const leftRegex = /^left\((\d+)\)$/;
  
    let step = currentStep;
  
    for (let i = 0; i < linesToCheck.length; i++) {
      const currentLine = linesToCheck[i];
  
      if (step >= validCode.length) break;
  
      // STEP 0, 2, 4 → forward(200)
      if ([0, 2, 4].includes(step)) {
        const match = currentLine.match(forwardRegex);
        if (match) {
          const value = parseInt(match[1]);
          if (value < 200) {
            return swal("Jawaban Salah", "Pergerakan bidawang kurang jauh", "error").then(() => {
              initializeTurtle();
              setCurrentStep(0);
              setPythonCodeChallanges('');
              setHasRun(false);
            });
          } else if (value > 200) {
            return swal("Jawaban Salah", "Bidawang keluar jalur", "error").then(() => {
              initializeTurtle();
              setCurrentStep(0);
              setPythonCodeChallanges('');
              setHasRun(false);
            });
          }
        } else {
          return swal("Jawaban Salah", "Perintah yang anda masukkan salah", "error").then(() => {
            initializeTurtle();
            setCurrentStep(0);
            setPythonCodeChallanges('');
            setHasRun(false);
          });
        }
      }
  
      // STEP 1, 3 → left(90)
      else if ([1, 3].includes(step)) {
        const match = currentLine.match(leftRegex);
        if (match) {
          const value = parseInt(match[1]);
          if (value < 90) {
            return swal("Jawaban Salah", "Sudut kurang besar", "error").then(() => {
              initializeTurtle();
              setCurrentStep(0);
              setPythonCodeChallanges('');
              setHasRun(false);
            });
          } else if (value > 90) {
            return swal("Jawaban Salah", "Sudut terlalu besar", "error").then(() => {
              initializeTurtle();
              setCurrentStep(0);
              setPythonCodeChallanges('');
              setHasRun(false);
            });
          }
        } else {
          return swal("Jawaban Salah", "Perintah yang anda masukkan salah", "error").then(() => {
            initializeTurtle();
            setCurrentStep(0);
            setPythonCodeChallanges('');
            setHasRun(false);
          });
        }
      }
  
      step++;
    }
  
    const newStep = currentStep + linesToCheck.length;
    setCurrentStep(newStep);
    console.log("Step setelah cek:", newStep);
  
    if (newStep >= validCode.length) {
      swal("Jawaban Benar!", "Kamu berhasil menyelesaikan tantangan!", "success");
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
    setCurrentStep(0);
    setOutput('');
    setHasRun(false); // <- Penting agar tidak menjalankan evaluasi otomatis
    runitchallanges('', true);
  };
  
  

  useEffect(() => {
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <Accordion className="mb-4" style={{ outline: "3px solid #2DAA9E", borderRadius: "10px" }}>
        {/* Tantangan Accordion */}
        <Accordion.Item eventKey="1">
          <Accordion.Header><h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>Tantangan</h4></Accordion.Header>
          <Accordion.Body>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            Selesaikan tantangan dibawah ini!
            Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
            </p>
            <Button className=" mb-2" variant="info" onClick={showHint}>
              Petunjuk
            </Button>

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
                <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
                <Button variant="success" onClick={() => runitchallanges(pythonCodeChallanges)}>Run Code</Button>
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
                {/* Conditional rendering of warning images based on currentStep */}
                {currentStep === 1 && (
                  <img
                    src={peringatan}
                    alt="warning"
                    style={{
                      position: "absolute",
                      left: "330px",
                      top: "280px",
                      width: "40px",
                      height: "40px",
                      zIndex: 10,
                    }}
                  />
                )}
                {currentStep === 3 && (
                  <img
                    src={peringatan}
                    alt="warning"
                    style={{
                      position: "absolute",
                      left: "280px",
                      top: "35px",
                      width: "40px",
                      height: "40px",
                      zIndex: 10,
                    }}
                  />
                )}
                

                <img
                  src={tilemap}
                  alt="Map"
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: "400px",
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
                    width: "400px",
                    height: "400px",
                  }}
                  />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
  );
};

export default KuisAccordion;
