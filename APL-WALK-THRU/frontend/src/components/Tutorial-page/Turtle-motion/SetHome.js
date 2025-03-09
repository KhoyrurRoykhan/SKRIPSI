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
import cacingA from './assets/cacing-target-A-home.png';
import cacingB from './assets/cacing-target-B-home.png';
import map from './assets/6-home.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'forward(100)\nright(45)\nforward(200)',
  '1b': 'home',
};

const SetHome = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      " Tugas kalian adalah Gerakan bidawang untuk mencapai 2 titik yang ditandai pada canvas kemudian buat bidawang kembali ke posisi awal. \n\n",
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
      question1: answers.question1 === 'Mengembalikan Bidawang ke posisi awal (0, 0) dan mengatur arahnya ke timur.' 
        ? 'Benar!' 
        : 'Salah!',
      question2: answers.question2 === 'Bidawang kembali ke posisi (0, 0) dan menghadap ke timur.' 
        ? 'Benar!' 
        : 'Salah!'
    };
    setFeedback(feedbackMessages);
  };

  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode1, setPythonCode1] = useState(`

for i in range(100):
  speed(1)
  # Pindahkan turtle ke beberapa posisi
  forward(100)
  left(90)
  forward(150)
            
  # Kembali ke posisi awal
  home()
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
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nforward(100)\npendown()\nspeed(1)\n";
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

    const validCodes = [
        ["right(90)", "forward(100)", "left(90)", "forward(80)", "right(90)", "forward(80)", "home()"]
    ];

    const userCodeLines = pythonCodeChallanges.trim().split("\n");

    // Cek apakah kode pengguna merupakan bagian awal dari salah satu jawaban yang valid
    const isPartialMatch = validCodes.some(validCode =>
        validCode.slice(0, userCodeLines.length).every((code, index) => code === userCodeLines[index])
    );

    // Cek apakah kode pengguna sudah lengkap dan benar
    const isExactMatch = validCodes.some(validCode =>
        validCode.length === userCodeLines.length && validCode.every((code, index) => code === userCodeLines[index])
    );

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
        <h2 style={{textAlign:'center'}}>Home</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengembalikan posisi Bidawang ke titik awal menggunakan <code>home()</code>.</li>
        </ol>

        <hr/>

        <p>
        Perintah `home()` digunakan untuk memindahkan Bidawang kembali ke posisi awalnya, yaitu titik (0, 0). Selain memindahkan Bidawang ke posisi awal, perintah ini juga mengatur arah Bidawang menghadap ke timur (0 derajat). Ini berguna ketika Anda ingin memulai kembali menggambar dari posisi awal. 
        </p>

        <h5>Contoh:</h5>
        <p>Memindahkan bidawang ke posisi awal setelah menjalankan berbagai perintah.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Pindahkan turtle ke beberapa posisi
forward(100)
left(90)
forward(150)
            
# Kembali ke posisi awal
home()`}
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
        <p><b>Hasil:</b> Fungsi <code>home()</code> akan membuat Bidawang kembali ke posisi awal setelah menjalankan perintah lainnya.</p>
        
        <br></br>

        <hr />

        <h4>Latihan Menggunakan home()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>home()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Gerakkan Bidawang</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Buat bidawang menjadi bergerak ke arah mana saja, sebagai contoh gunakan perintah di bawah ini untuk menggerakan bidawang: </p>
                  <pre><code>forward(100)</code></pre>
                  <pre><code>right(45)</code></pre>
                  <pre><code>forward(200)</code></pre>
                  
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Kembali ke posisi awal</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Selanjutnya ketikan perintah di bawah ini pada baris baru untuk mengembalikan bidawang ke posisi awal.</p>
                  <pre><code>home()</code></pre>
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
        Perintah <b>home()</b> memudahkan untuk kembali ke posisi awal (0, 0) dan mengatur arah Bidawang ke posisi semula. Ini berguna untuk memulai kembali proses menggambar dari titik awal. 
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Apa fungsi dari perintah home()? </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Menghapus seluruh gambar yang telah dibuat." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menghapus seluruh gambar yang telah dibuat.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengembalikan Bidawang ke posisi awal (0, 0) dan mengatur arahnya ke timur." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengembalikan Bidawang ke posisi awal (0, 0) dan mengatur arahnya ke timur.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Utara" 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Utara')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Memindahkan Bidawang ke posisi y = 0." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Memindahkan Bidawang ke posisi y = 0.')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Jika posisi awal Bidawang adalah (100, 100) dan arahnya ke barat, apa yang terjadi setelah menggunakan home()? </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Bidawang tetap di posisi (100, 100)." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Bidawang tetap di posisi (100, 100).')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Bidawang kembali ke posisi (0, 0) dengan arah tetap ke barat." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Bidawang kembali ke posisi (0, 0) dengan arah tetap ke barat.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Bidawang kembali ke posisi (0, 0) dan menghadap ke timur." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Bidawang kembali ke posisi (0, 0) dan menghadap ke timur.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Bidawang tetap di posisi (100, 100) tetapi menghadap ke timur."
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Bidawang tetap di posisi (100, 100) tetapi menghadap ke timur.')} 
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
                <img
                      src={cacingA}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "275px",
                        top: "275px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  />
                  <img
                      src={cacingB}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "355px",
                        top: "355px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  />
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

export default SetHome
