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

const correctCommands = {
    '1a': 'forward(100)',
    '1b': 'right(90)',
    '1c': 'forward(100)'
  };
  
const Pensize = () => {
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
        question1: answers.question1 === 'Mengubah ketebalan garis menjadi 10 piksel.' 
          ? 'Benar!' 
          : 'Salah!',
        question2: answers.question2 === 'Lingkaran pertama memiliki garis lebih tebal daripada lingkaran kedua.' 
          ? 'Benar!' 
          : 'Salah!'
      };
      setFeedback(feedbackMessages);
    };
  
    const [pythonCode, setPythonCode] = useState(``);
    const [pythonCode1, setPythonCode1] = useState(`    
for i in range(100):
    speed(1)

    # Ubah ketebalan pena 
    pensize(5)  

    # Gambar lingkaran dengan garis tebal 
    circle(50)
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
      setOutput1('');
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
        <h2 style={{textAlign:'center'}}>Pensize</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengubah ketebalan garis menggunakan perintah pensize().</li>
        </ol>

        <hr/>

        <p>
        Fungsi <code>pensize(width)</code> digunakan untuk mengatur ketebalan pena saat menggambar garis. Parameter width menunjukkan ukuran ketebalan dalam piksel. Dengan memodifikasi ketebalan garis, pengguna dapat menciptakan variasi visual, seperti membuat garis tebal untuk bingkai atau garis tipis untuk detail halus.</p>
        <ul>
            <li>
            <b>pensize(width):</b> Mengatur ketebalan garis menjadi width (piksel).
            </li>
        </ul>

        <br></br>

        <h5>Contoh:</h5>
        <p>Menggambar lingkaran dengan garis tebal.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Ubah ketebalan pena 
pensize(5)  

# Gambar lingkaran dengan garis tebal 
circle(50)`}
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
        <p><b>Hasil:</b> Fungsi <code>pensize(5)</code> akan membuat ketebalan garis menjadi 5 pixel saat bidawang menggambar lingkaran dengan fungsi <code>circle()</code>.</p>
        
        <br></br>
        <hr />

        <h4>Latihan Menggunakan pensize()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>pensize()</code>, ikuti instruksi dibawah ini:
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Gambar segitiga</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar segitiga menggunakan menggunakan perintah dibawah ini:</p>
                  <pre><code>forward(100)</code></pre>
                  <pre><code>left(120)</code></pre>
                  <pre><code>forward(100)</code></pre>
                  <pre><code>left(120)</code></pre>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Ubah Ketebalan Pena</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk mengubah ketebalan pena menjadi 10:</p>
                  <pre><code>pensize(10)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Gambar Segitiga</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gerakkan lagi Bidawang untuk menggambar segitiga dengan perintah dibawah ini:</p>
                  <pre><code>right(60)</code></pre>
                  <pre><code>forward(100)</code></pre>
                  <pre><code>right(120)</code></pre>
                  <pre><code>forward(100)</code></pre>
                  <pre><code>right(120)</code></pre>
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
            Dengan perintah <code>pensize()</code>, ketebalan garis dapat disesuaikan untuk meningkatkan estetika atau menciptakan variasi visual dalam gambar. 
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Apa efek dari penggunaan metode pensize(10) sebelum menggambar? </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Mengganti warna garis menjadi hitam." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengganti warna garis menjadi hitam.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengubah ketebalan garis menjadi 10 piksel." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengubah ketebalan garis menjadi 10 piksel.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Membuat garis tidak terlihat." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Membuat garis tidak terlihat.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menghapus garis yang telah digambar." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menghapus garis yang telah digambar.')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Jika kode berikut dijalankan:  <pre>pensize(5)</pre>
<pre>circle(30) </pre>
<pre>pensize(2) </pre>
<pre>circle(50)</pre>
<p>Apa yang akan terlihat pada hasil akhir?</p></Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Dua lingkaran dengan ketebalan garis yang sama." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Dua lingkaran dengan ketebalan garis yang sama.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Lingkaran pertama memiliki garis lebih tebal daripada lingkaran kedua." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Lingkaran pertama memiliki garis lebih tebal daripada lingkaran kedua.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Lingkaran kedua memiliki garis lebih tebal daripada lingkaran pertama." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Lingkaran kedua memiliki garis lebih tebal daripada lingkaran pertama.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Tidak ada lingkaran yang digambar."
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Tidak ada lingkaran yang digambar.')} 
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
              Coba gunakan perintah <code>left()</code> dan <code>right()</code> untuk mengubah arah objek. Klik tombol di bawah ini untuk mengerjakan tantangan berikut.
            </p>

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
                        left: "275px",
                        top: "75px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
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

export default Pensize
