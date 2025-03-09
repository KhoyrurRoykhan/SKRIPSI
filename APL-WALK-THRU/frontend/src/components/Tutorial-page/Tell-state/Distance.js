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
import map from './assets/4-distance.png';

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'right(90)',
  '1c': 'forward(100)'
};

const Distance = () => {
    // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Tugas kalian adalah memeriksa posisi A dan B kemudian masukan hasilnya pada kolom jawaban yg sudah di sediakan",
      "info"
    );
  };

    //accordion task
    const [completedSteps, setCompletedSteps] = useState([]);
    const [activeKey, setActiveKey] = useState('1a');
  
    const checkCode = () => {
      const lines = pythonCode.split('\n').map(line => line.trim());
      let newCompletedSteps = [];
      let keys = Object.keys(correctCommands);
      
      for (let i = 0; i < keys.length; i++) {
        if (lines[i] === correctCommands[keys[i]]) {
          newCompletedSteps.push(keys[i]);
        } else {
          break;
        }
      }
      
      setCompletedSteps(newCompletedSteps);
      if (newCompletedSteps.length < keys.length) {
        setActiveKey(keys[newCompletedSteps.length]);
      } else {
        setActiveKey(null);
      }
    };
  
    //kuis
    const [answers, setAnswers] = useState({
      question1: '',
      question2: ''
    });
  
    const [feedback, setFeedback] = useState({
      question1: '',
      question2: ''
    });
  
    const handleAnswerChange = (question, answer) => {
      setAnswers(prevAnswers => ({ ...prevAnswers, [question]: answer }));
    };
  
    const handleSubmit = () => {
      const feedbackMessages = {
        question1: answers.question1 === 'Menghitung jarak Euclidean antara posisi saat ini dan koordinat (x, y).' 
          ? 'Benar!' 
          : 'Salah!',
        question2: answers.question2 === '5' 
          ? 'Benar!' 
          : 'Salah!'
      };
      setFeedback(feedbackMessages);
    };
  
    const [pythonCode, setPythonCode] = useState(``);
    const [pythonCode1, setPythonCode1] = useState(`    
for i in range(100):
    speed(1)
    setposition(100,100)
    speed(0)
    home()
    clear()

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
      const imports = "from turtle import *\nreset()\nshape('turtle')\n";
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
      setOutput1('Jarak ke (100, 100):\n141.4213562373095\nJarak setelah mencapai (100,100):\n0.0');
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
      const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(2)\npenup()\nsetposition(-150,-150)\npendown()\n";
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
        ["left(45)","print(disctance(150,150))","forward(424)"],
        ["print(distance(150,150))","left(45)","forward(424)"]
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
        console.log("OK");
        swal("Jawaban Benar!", "Kamu berhasil!", "success");
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
      runitchallanges(); // Jalankan kode saat halaman dimuat
    }, []);

  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 style={{textAlign:'center'}}>Distance</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara kerja fungsi distance()</li>
        </ol>

        <hr/>

        <p>
        Fungsi <code>distance()</code> digunakan untuk menghitung jarak Euclidean antara posisi turtle saat ini dan titik tertentu dengan koordinat yang diberikan. Sama seperti perintah sebelumnya (<i>Position()</i>) Untuk menampilkan hasilnya kita bisa menggunakan fungsi <code>print()</code>.
        </p>

        <br></br>

        <h5>Contoh:</h5>
        <p>Menampilkan jarak posisi bidawang ke koordinat tujuan.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Hitung jarak dari posisi awal ke titik (100, 100) 
print("Jarak ke (100, 100):") 
print(distance(100,100))

# Gerakkan turtle ke titik (100, 100) 
setposition(100, 100) 

# Hitung jarak setelah mencapai (100, 100) 
print("Jarak setelah mencapai (100,100):") 
print(distance(100, 100))`}
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
        <p><b>Hasil:</b> Fungsi <code>distance()</code> akan mendapatkan jarak posisi bidawang ke koordinat tujuan, kemudian untuk menampilkan nilainya kita bisa menggunakan fungsi <code>print()</code>.</p>
        
        <br></br>
        <hr />

        <h4>Latihan Menggunakan distance()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>distance()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Periksa Jarak</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Periksa jarak bidawang ke posisi (100,0):</p>
                  <pre><code>print(distance())</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Bergerak Maju</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk menggerakan bidawang maju 100 langkah:</p>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Periksa Jarak</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Periksa lagi jarak bidawang ke posisi (100,0):</p>
                  <pre><code>forward(100)</code></pre>
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
              height="290px"
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
            <pre id='output' className="output" style={{height:60}}>{output}</pre>
          </div>
          <div className="canvas-section" style={{width: 400, height: 400}}>
            <div  style={{width: 400, height: 400}} id="mycanvas"></div>
          </div>
        </div>
          </Col>
        </Row>
        

        <br></br>

        <hr/>

        <h4>Kesimpulan</h4>
        <p>
        Perintah <code>heading()</code> berguna untuk memantau arah gerakan bidawang dengan lebih tepat. Pemahaman tentang sistem derajat akan membantu siswa menggambar bentuk dan pola secara lebih akurat. 
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Apa fungsi dari metode distance(x, y)? </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Mengembalikan arah turtle menuju titik (x, y)." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengembalikan arah turtle menuju titik (x, y).')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menghitung jarak Euclidean antara posisi saat ini dan koordinat (x, y)." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menghitung jarak Euclidean antara posisi saat ini dan koordinat (x, y).')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengatur turtle untuk bergerak ke posisi (x, y)." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengatur turtle untuk bergerak ke posisi (x, y).')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menghapus jarak antara dua titik." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menghapus jarak antara dua titik.')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Jika turtle berada di koordinat (0, 0), apa hasil dari perintah berikut?  <pre>print(distance(3, 4)) </pre> </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="3" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', '3')} 
                />
                <Form.Check 
                  type="radio" 
                  label="4" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', '4')} 
                />
                <Form.Check 
                  type="radio" 
                  label="7" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', '7')} 
                />
                <Form.Check 
                  type="radio" 
                  label="5"
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', '5')} 
                />
              </Form.Group>
              {feedback.question2 && <Alert variant={feedback.question2 === 'Benar!' ? 'success' : 'danger'}>{feedback.question2}</Alert>}

              <Button variant="primary" onClick={handleSubmit} className="mt-3">Periksa Jawaban</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Tantangan Accordion */}
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
                      src={broccoli}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "325px",
                        top: "25px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  />
                  <img
                      src={map}
                      alt="Map"
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "4px",
                        width: "400px", // Sesuaikan ukuran jika perlu
                        height: "400px",
                      }}
                  />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
    </div>
  )
}

export default Distance
