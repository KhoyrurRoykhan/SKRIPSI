import React, { useEffect, useState } from 'react'; 
import '../assets/tutor.css'; 
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import contohhasil from './assets/contoh-hasil.png';
import { Accordion, Container, Row, Col, Button, Form, Alert, Card, Image, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import canvas from './assets/koordinat-kartesius.jpg';
import lingkungankerja from './assets/kode-editor.png'
import { BsArrowClockwise, BsCheckCircle } from 'react-icons/bs'; // Import ikon Bootstrap

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'right(90)',
  '1c': 'forward(100)',
  '1d': 'left(45)',
  '1e': 'forward(50)'
};

const Pendahuluan = () => {
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



  //Kuis

  const [answers, setAnswers] = useState({
    question1: ''
  });

  const [feedback, setFeedback] = useState({
    question1: ''
  });

  const handleAnswerChange = (question, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: answer
    }));
  };

  const handleSubmit = () => {
    const feedbackMessages = {
      question1: answers.question1 === '(200, -150)' 
        ? 'Benar!' 
        : 'Salah!',
    };

    setFeedback(feedbackMessages);
  };


  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  forward(150)
  left(90)    
  forward(150)
  left(90)
  forward(150)
  left(90)    
  forward(150)
  left(90)
  
  clear()

  forward(150)
  left(120)
  forward(150)
  left(120)
  forward(150)
  left(120)
  
  clear()
  
  circle(100)
  
  clear()
  
  speed(2)
  for i in range(9):
    for _ in range(4):  
        forward(100)  
        right(90)  
    right(40)
  
  clear()

  speed(2)
  for i in range(9):
    for _ in range(3):  
        forward(100)  
        right(120)  
    right(40)
  
  clear()

  speed(2)
  for i in range(9):
    circle(50)  
    right(40)
  
  clear()
`);

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

const runit2 = (code, forceReset = false) => {
  setOutput('');
  const imports = "from turtle import *\nreset()\nshape('turtle')\n";
  const prog = forceReset ? imports : imports + pythonCode2;

  window.Sk.pre = "output2";
  window.Sk.configure({ output: outf, read: builtinRead });
  (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh';

  window.Sk.misceval.asyncToPromise(() => 
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
  ).then(
      () => console.log('success'),
      (err) => setOutput((prev) => prev + err.toString())
  );
};


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};


  useEffect(() => {
    runit(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
  }, []);


  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      {/* <SidebarTutor /> */}
      <div>
        {/* Main Content Area */}
        <h2 style={{textAlign:'center'}}>
          <b>Pengenalan</b>
        </h2>

        <hr></hr>
        <br></br>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami konsep canvas sebagai ruang pergerakan Bidawang.</li>
          <li>Mengenali tampilan lingkungan kerja dan perintah dasar untuk menggerakan Bidawang pada canvas.</li>
        </ol>

        <hr></hr>

        {/* Video Section */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h5>Perhatikan Video Ilustrasi dibawah ini:</h5>
          <iframe 
            width="1024"
            height="576"
            src="https://www.youtube.com/embed/iefPvNd_diM?si=_Ou4N5Xe9TA-cezk" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>
        </div>

        <hr></hr>

        <p>Canvas adalah area tempat Bidawang bergerak menggambar pola geometri secara interaktif. Bidawang tersebut dapat dikontrol untuk bergerak maju (forward), mundur (backward), berbelok ke kiri (left), berbelok ke kanan (right), dan melakukan berbagai aksi lainnya menggunakan perintah-perintah tertentu. Ukuran default canvas adalah 400x400 piksel. Berikut adalah contoh gambaran canvas dan contoh Bidwang bergerak dalam canvas:</p>
        
        <Row>
          <Col xs={6} style={{textAlign:'center'}}>
          <Image
            src={canvas}
            alt="Hasil left(120)"
            width="470px"
            height="470px"
          />
          <p>(Gambaran koordinat canvas)</p>
          </Col>

          <Col xs={6}>
          <div className="canvas-section" style={{width:400,height:400, marginTop:40, textAlign:'center'}}>
            <div style={{textAlign:'center'}} id="mycanvas-contoh"></div>
            
          </div>
          <br></br>
          <p style={{paddingLeft:20}}>(Contoh pergerakan bidawang dalam canvas)</p>
          </Col>
        </Row>
        
          <br></br>
        
        <p>Penjelasan:</p>
        <ul>
          <li>Titik awal posisi Bidawang adalah (0, 0), yang berada di tengah canvas.</li>
          <li>Batas pergerakan ke atas (sumbu Y positif) adalah 200, yang merupakan batas atas canvas.</li>
          <li>Batas pergerakan ke bawah (sumbu Y negatif) adalah -200, yang merupakan batas bawah canvas.</li>
          <li>Batas pergerakan ke kanan (sumbu X positif) adalah 200.</li>
          <li>Batas pergerakan ke kiri (sumbu X negatif) adalah -200.</li>
        </ul>

        <br></br>

        <h4>Tampilan Lingkungan Kerja</h4>
        <p>Untuk mempermudah mengontrol Bidawang, tersedia lingkungan kerja yang terdiri dari beberapa komponen seperti gambar dibawah ini:</p>

        <div style={{textAlign:'center'}}>
        <Image
            src={lingkungankerja}
            alt="Hasil left(120)"
            width="80%"
            // height="400px"
          />
          </div>

        <br></br>
        <p>Penjelasan:</p>
        <ul>
          <li><b>(A) Text Editor</b>: Area tempat pengguna mengetik perintah kode untuk menggerakkan Bidawang.</li>
          <li><b>(B) Canvas</b>: Area tampilan di mana pergerakan Bidawang divisualisasikan. Semua perintah yang dijalankan akan langsung terlihat pada canvas.</li>
          <li><b>(C) Bidawang</b>: Objek yang digerakkan menggunakan perintah kode.</li>
          <li><b>(D) Tombol "Run Code"</b>: Digunakan untuk menjalankan kode yang telah ditulis di text editor. Setelah ditekan, Bidawang akan menjalankan perintah dan menggambar sesuai instruksi.</li>
          <li><b>(E) Tombol "Reset"</b>: Menghapus kode serta hasil gambar di canvas dan mengembalikan Bidawang ke posisi awal.</li>
        </ul>


        <br></br>
        <h4>Contoh menggerakan Bidawang dalam canvas</h4>
        
        <p>Kita bisa menggerakkan Bidawang dengan berbagai perintah. Berikut adalah contoh perintah dasar untuk membuat Bidawang dapat bergerak dan berputar, Agar lebih mudah untuk memahaminya coba ikuti instruksi dibawah ini dengan mengetikkan perintah tersebut, lalu tekan tombol <b>"Run Code"</b> untuk melihat pergerakan Bidawang, lakukan secara bertahap:</p>
        

        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Maju</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gerakkan Bidawang maju sejauh 100 langkah dengan perintah dibawah ini:</p>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Berbelok ke kanan</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk memutar Bidawang ke kanan sebesar 90 derajat:</p>
                  <pre><code>right(90)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Maju</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gerakkan lagi Bidawang maju sejauh 100 langkah</p>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Berbelok ke kiri</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Putar Bidawang ke kiri sebesar 45 derajat:</p>
                  <pre><code>left(45)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1e">
                <AccordionHeader>
                  <b>5. Maju</b>
                  {completedSteps.includes('1e') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gerakkan Bidawang maju sejauh 50 langkah:</p>
                  <pre><code>forward(50)</code></pre>
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
              height="300px"
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
            <pre className="output" style={{height:60, width:330}}>{output}</pre>
          </div>
          <div className="canvas-section">
            <div id="mycanvas"></div>
          </div>
        </div>
          </Col>
        </Row>

        
        <br/>
          <hr/> 

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>Jika pergerakan Bidawang ke kanan adalah 200 dan ke bawah adalah -150, bagaimana koordinat tersebut dijelaskan?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="(200, 150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', '(200, 150)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="(-200, 150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', '(-200, 150)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="(200, -150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', '(200, -150)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="(-200, -150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', '(-200, -150)')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}
              <Button variant="primary" onClick={handleSubmit} className="mt-3">Periksa Jawaban</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>     
      </div>
    </div>
  );
};

export default Pendahuluan;
