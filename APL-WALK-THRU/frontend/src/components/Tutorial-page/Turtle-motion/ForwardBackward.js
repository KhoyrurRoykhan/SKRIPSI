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
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'right(90)',
  '1c': 'forward(100)',
  '1d': 'left(45)',
  '1e': 'forward(50)'
};

const ForwardBackward = () => {
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
      question1: answers.question1 === 'forward(150)' 
        ? 'Benar!' 
        : 'Salah! Perintah yang benar adalah forward(150).',
      question2: answers.question2 === 'Ke timur' 
        ? 'Benar!' 
        : 'Salah! Turtle akan bergerak ke timur.'
    };
    setFeedback(feedbackMessages);
  };

  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode1, setPythonCode1] = useState(`

for i in range(100):
  speed(1)
  forward(100)
  speed(0)
  home()
  reset()

`);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  backward(150)
  speed(0)
  home()
  reset()

`);

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

  const runit1 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode1;
  
    window.Sk.pre = "output1";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh1';
  
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
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh2';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
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
    runit1(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 style={{textAlign:'center'}}>Forward & Backward</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara menggerakkan Bidawang ke depan dan ke belakang menggunakan forward() dan backward().</li>
        </ol>

        <hr/>

        <p>
        Perintah `forward()` dan `backward()` digunakan untuk menggerakkan Bidawang ke arah depan (forward) searah arah yang sedang dihadapi Bidawang dan belakang (backward) berlawanan arah dengan yang sedang dihadapi Bidawang, berdasarkan jarak yang ditentukan dalam satuan piksel (pixel).
        </p>

        <h5>1. forward(<i>jarak</i>)</h5>
        <p>Menggerakkan Bidawang ke depan sejauh jarak yang ditentukan (dalam piksel), dalam arah yang sedang dihadapi oleh Bidawang.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Gerakkan turtle ke depan sejauh 100 piksel
forward(100)`}
              height="400px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
              <div style={{textAlign:'center'}} id="mycanvas-contoh1"></div>
            </div>
          </Col>
        </Row>
        <br></br>
        <p><b>Hasil:</b> Bidawang akan bergerak sejauh 100 ke arah yang dihadapnya.</p>
        
        <br></br>

        <h5>2. backward(<i>jarak</i>)</h5>
        <p>Menggerakkan Bidawang ke belakang sejauh jarak yang ditentukan (dalam piksel), dalam arah berlawanan dengan arah yang sedang dihadapi oleh turtle.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Gerakkan turtle ke belakang sejauh 150 piksel
backward(150)`}
              height="400px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
              <div style={{textAlign:'center'}} id="mycanvas-contoh2"></div>
            </div>
          </Col>
        </Row>
        <br></br>
        <p><b>Hasil:</b> Bidawang akan mundur sejauh 100 dari arah yang dihadapnya.</p>

        <br />
        <hr />

        <h4>Latihan Menggunakan forward() dan backward()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>forward()</code> dan <code>backward()</code>, ikuti instruksi dibawah ini
        </p>
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
            <pre className="output" style={{height:60}}>{output}</pre>
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
          Perintah <code>forward()</code> dan <code>backward()</code> digunakan untuk menggerakkan Bidawang ke depan atau ke belakang sejauh jarak yang ditentukan dalam piksel. Perintah <code>forward()</code> dan <code>backward()</code> sering dikombinasikan dengan perintah rotasi seperti `left()` dan `right()` untuk membuat pola atau gambar yang lebih kompleks.
        </p>

        <br/>

        <h4>Kuis</h4>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Perintah apa yang digunakan untuk menggerakkan turtle ke depan sejauh 150 piksel?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="backward(150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'backward(150)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="forward(150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'forward(150)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="left(150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left(150)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="right(150)" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'right(150)')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Jika turtle menghadap ke barat dan Anda menggunakan perintah backward(100), ke arah mana turtle akan bergerak?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Ke barat" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Ke barat')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Ke timur" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Ke timur')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Ke utara" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Ke utara')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Ke Selatan" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Ke Selatan')} 
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
                <pre className="output4" style={{height:60}}>{output}</pre>
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

export default ForwardBackward
