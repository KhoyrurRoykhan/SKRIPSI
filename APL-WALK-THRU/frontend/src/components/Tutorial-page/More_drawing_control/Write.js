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
import map from './assets/1-write.png';

const correctCommands = {
    '1a': 'forward(100)',
    '1b': 'right(90)',
    '1c': 'forward(100)',
    '1d': 'left(45)',
    '1e': 'forward(50)'
  };

const Write = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "Tugas kalian adalah menggerakkan Bidawang menuju ke posisi cacing dengan maksimal menggunakan 4x kode perintah. Gunakan forward() atau backward() lalu kombinasikan dengan left() atau right() untuk membuat bidawang berbelok arah. \n\n",
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
        question1: answers.question1 === 'Mengatur perataan teks (kiri, tengah, atau kanan).' 
          ? 'Benar!' 
          : 'Salah!',
        question2: answers.question2 === 'Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi tengah bidawang.' 
          ? 'Benar!' 
          : 'Salah!'
      };
      setFeedback(feedbackMessages);
    };
  
    const [pythonCode, setPythonCode] = useState(``);
    const [pythonCode1, setPythonCode1] = useState(` 
for i in range(100):
    speed(1)
    write("Hello, World!", align="center", font=("Arial", 16, "bold")) 
    forward(100)  # Bidawang tetap dapat menggambar setelah menulis  
    time.sleep(4)  
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
      setOutput1('');
      const imports = "import time\nfrom turtle import *\nreset()\nshape('turtle')\n";
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
      const imports = 'from turtle import *\nreset()\nshape("turtle")\npenup()\nspeed(0)\nsetposition(-190,0)\nwrite("B",font=("arial",30))\nforward(50)\n# write("I",font=("arial",30))\nforward(50)\nwrite("D",font=("arial",30))\nforward(50)\n# write("A",font=("arial",30))\nforward(50)\nwrite("W",font=("arial",30))\nforward(50)\nwrite("A",font=("arial",30))\nforward(50)\nwrite("N",font=("arial",30))\nforward(50)\nwrite("G",font=("arial",30))\nsetposition(-190,0)\nspeed(1)\n';
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
  
      const validCodes = ["left(45)", "right(315)"];
      if (validCodes.includes(pythonCodeChallanges.trim())) {
          swal("Jawaban Benar!", "Kamu berhasil!", "success");
      } else {
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
        <h2 style={{textAlign:'center'}}>Write</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>memahami fungsi write() untuk menampilkan teks pad canvas.</li>
        </ol>

        <hr/>

        <p>
        Perintah <code>write()</code> digunakan untuk menulis teks pada canvas di lokasi bidawang berada. write(teks, move=False, align="left", font=("Arial", 8, "normal")):</p>

        <ul>
            <li>Parameter teks: Teks yang akan ditulis.</li>
            <li>Parameter move: Jika True, posisi turtle akan berpindah setelah menulis teks.</li>
            <li>Parameter align: Penyesuaian teks ("left", "center", atau "right"). </li>
            <li>Parameter font: Menentukan jenis, ukuran, dan gaya font.</li>
        </ul>

        <br></br>

        <h5>Contoh:</h5>
        <p>Menulis "Hello, World!" di canvas.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`write("Hello, World!", align="center", font=("Arial", 16, "bold")) 

# Bidawang tetap dapat menggambar setelah menulis 
forward(100)  `}
              height="340px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
            <pre id='output1' className="output mt-2" style={{height:60}}>{output1}</pre>
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
              <div style={{textAlign:'center'}} id="mycanvas-contoh1"></div>
            </div>
          </Col>
        </Row>
        <br></br>
        <p><b>Hasil:</b> Bidawang akan menulis "Hello, World!" pada canvas diposisi bidawang berada, kemudian setelah menulis, bidawang masih tetap bisa bergerak.</p>
        
        <br></br>
        <hr />

        <h4>Latihan Menggunakan write()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>write()</code>, ikuti instruksi dibawah ini:
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Menulis Teks</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Tulis teks "Hallo" dengan font arial dan ukuran 20 dengan perintah dibawah ini:</p>
                  <pre><code>write("Hallo", font=("Arial",20))</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Angkat Pena</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk mengangkat atau menonaktifkan pena:</p>
                  <pre><code>right(90)</code></pre>
                  <pre><code>forward(50)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Pindah Posisi</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                <p>Lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk memindahkan posisi bidawang kebawah sejauh 50 langkah:</p>
                  <pre><code>right(90)</code></pre>
                  <pre><code>forward(50)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Menulis Teks</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                <p>Tulis teks "Apa Kabar?" dengan font arial dan ukuran 15:</p>
                  <pre><code>write("Apa Kabar?", font=("Arial",15))</code></pre>
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
            Perintah <code>write()</code> memungkinkan turtle untuk menampilkan teks di layar, sehingga dapat digunakan untuk memberikan informasi tambahan pada gambar.
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Apa fungsi dari parameter align dalam metode write()?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Mengatur posisi turtle setelah menulis teks." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengatur posisi turtle setelah menulis teks.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menentukan jenis font yang digunakan." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menentukan jenis font yang digunakan.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengatur perataan teks (kiri, tengah, atau kanan)." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengatur perataan teks (kiri, tengah, atau kanan).')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengatur warna teks." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengatur warna teks.')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Perhatikan kode berikut:
                    <pre>write("Belajar Python!", align="center", font=("Arial", 12, "italic"))</pre>
                    <p>Apa yang akan terjadi? </p>
                </Form.Label>
                <Form.Check 
                  type="radio" 
                  label='Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi kiri bidawang.' 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi kiri bidawang.')} 
                />
                <Form.Check 
                  type="radio" 
                  label='Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi tengah bidawang.'
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Teks ditulis di layar dengan font Arial, ukuran 12, dan bergaya italic di posisi tengah bidawang.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Teks ditulis di layar dengan font Arial, ukuran 12, tetapi tidak bergaya italic." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Teks ditulis di layar dengan font Arial, ukuran 12, tetapi tidak bergaya italic.')} 
                />
                <Form.Check 
                  type="radio" 
                  label='Tidak ada teks yang ditulis karena font tidak valid.'
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Tidak ada teks yang ditulis karena font tidak valid.')} 
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
                {/* <img
                      src={broccoli}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "275px",
                        top: "75px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  /> */}
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

export default Write
