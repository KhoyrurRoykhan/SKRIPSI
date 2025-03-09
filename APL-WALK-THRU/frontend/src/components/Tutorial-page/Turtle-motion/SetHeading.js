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
import map from './assets/5-setheading.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'setheading(90)',
  '1b': 'forward(100)',
  '1c': 'setheading(0)',
  '1d': 'forward(50)'
};

const SetHeading = () => {
  //hh
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "Tugas kalian adalah buat bidawang bergerak mencapai ujung canvas arah selatan. Gunakan perintah setheading untuk mengubah arahnya dan forward untuk bergerak. \n\n",
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
      question1: answers.question1 === 'Utara' 
        ? 'Benar!' 
        : 'Salah!',
      question2: answers.question2 === 'Mengatur arah turtle ke sudut tertentu berdasarkan derajat.' 
        ? 'Benar!' 
        : 'Salah!'
    };
    setFeedback(feedbackMessages);
  };

  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode1, setPythonCode1] = useState(`

for i in range(100):
  speed(1)
  # Atur arah turtle menghadap utara (90 derajat)
  setheading(90)
  forward(100)  # Bergerak maju ke atas
              
  # Atur arah turtle menghadap barat (180 derajat)
  setheading(180)
  forward(100)  # Bergerak maju ke kiri
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

    const validCode = ["setheading(270)", "forward(200)"]; // Urutan yang benar
    const userCodeLines = pythonCodeChallanges.trim().split("\n");

    // Cek apakah kode pengguna merupakan bagian dari jawaban yang valid
    const isPartialMatch = validCode.slice(0, userCodeLines.length).every((code, index) => code === userCodeLines[index]);

    // Cek apakah kode pengguna sudah lengkap dan benar
    const isExactMatch = userCodeLines.length === validCode.length && isPartialMatch;

    if (isExactMatch) {
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
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 style={{textAlign:'center'}}>Setheading</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengatur arah Bidawang menggunakan setheading().</li>
        </ol>

        <hr/>

        <p>
        Perintah <b>setheading()</b> digunakan untuk mengatur arah Bidawang ke sudut tertentu, diukur dalam derajat. Sudut dihitung berlawanan arah jarum jam, dimulai dari arah timur (0 derajat). Dengan menggunakan setheading() dapat mengontrol ke mana bidawang akan menghadap sebelum bergerak.
        </p>

        <ul>
          <li><strong>0°</strong>: Timur (Kanan Layar)</li>
          <li><strong>90°</strong>: Utara (Atas Layar)</li>
          <li><strong>180°</strong>: Barat (Kiri Layar)</li>
          <li><strong>270°</strong>: Selatan (Bawah Layar)</li>
        </ul>

        <h5>Contoh:</h5>
        <p>Mengatur arah pergerakan bidawang dengan <code>setheading()</code>.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Atur arah turtle menghadap utara (90 derajat)
setheading(90)
forward(100)  # Bergerak maju ke atas
              
# Atur arah turtle menghadap barat (180 derajat)
setheading(180)
forward(100)  # Bergerak maju ke kiri`}
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
        <p><b>Hasil:</b> <code>setheading(90)</code> akan membuat Bidawang menghadap ke utara (atas layar) dan <code>setheading(180)</code> akan membuat bidawang menghadap ke barat (kiri layar).</p>
        
        <br></br>

        <hr />

        <h4>Latihan Menggunakan setheading()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>setheading()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Hadap Utara</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Ubah arah bidawang menjadi menghadap ke arah utara dengan menggunakan perintah dibawah ini: </p>
                  <pre><code>setheading(90)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Maju</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lalu lanjutkan pada baris baru untuk membuat bidawang maju sejauh 100 langkah dengan perintah dibawah ini: </p>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Hadap Timur </b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lanjutkan lagi dengan mengubah arah bidawang menjadi menghadap ke timur dengan perintah dibawah ini: </p>
                  <pre><code>setheading(0)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Maju</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Buat bidawang maju sejauh 50 langkah lagi. </p>
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
        Perintah <b>setheading()</b> sangat berguna untuk mengontrol arah objek dengan presisi. Dengan mengatur sudut arah secara langsung, Anda dapat membuat pola yang kompleks dan menggambar dengan lebih terstruktur.
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Jika Anda menggunakan perintah <code>setheading(90)</code>, ke arah mana Bidawang akan menghadap?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Timur" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Timur')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Barat" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Barat')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Utara" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Utara')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Selatan" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Selatan')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Apa fungsi utama dari perintah setheading(<i>derajat</i>)?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Mengatur posisi turtle ke koordinat (0, 0)." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Mengatur posisi turtle ke koordinat (0, 0).')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengatur arah turtle ke sudut tertentu berdasarkan derajat." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Mengatur arah turtle ke sudut tertentu berdasarkan derajat.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menggerakkan turtle ke arah utara." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Menggerakkan turtle ke arah utara.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengubah warna turtle."
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Mengubah warna turtle.')} 
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
                <pre className="output4" style={{height:60}}>{output}</pre>
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
                        left: "2px",
                        top: "0px",
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

export default SetHeading
