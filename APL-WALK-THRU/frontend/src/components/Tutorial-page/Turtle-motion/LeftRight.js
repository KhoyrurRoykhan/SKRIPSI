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
import map from './assets/1-left-right.png';

const correctCommands = {
  '1a': 'left(90)',
  '1b': 'right(180)'
};

const LeftRight = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "Tugas kalian adalah membuat Bidawang menghadap ke arah cacing dengan 1x perintah, gunakan perintah left() atau right(): \n\n",
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
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: answer
    }));
  };

  const handleSubmit = () => {
    const feedbackMessages = {
      question1: answers.question1 === 'left() memutar bidawang ke arah kiri, sementara right() memutar bidawang ke arah kanan.' 
        ? 'Benar!' 
        : 'Salah!',
      question2: answers.question2 === 'Selatan (bawah layar)' 
        ? 'Benar!' 
        : 'Salah!'
    };

    setFeedback(feedbackMessages);
  };

  //contoh
  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  left(120)
  speed(0)
  home()

`);

  const [pythonCode3, setPythonCode3] = useState(`

for i in range(100):
  speed(1)
  right(90)
  speed(0)
  home()

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

  const runit2 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode2;
  
    window.Sk.pre = "output2";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh1';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const runit3 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode3;
  
    window.Sk.pre = "output3";
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
    const trimmedCode = pythonCodeChallanges.trim();

    // Cek apakah kode yang sedang dijalankan merupakan bagian dari jawaban yang valid
    const isPartialMatch = validCodes.some(validCode => validCode.startsWith(trimmedCode) || validCode.includes(trimmedCode));

    if (validCodes.includes(trimmedCode)) {
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
    runit(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runit3(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <div>
      {/* <SidebarTutor /> */}
      <div className='content' style={{paddingLeft:50, paddingRight:50}}>
        <h2 style={{textAlign:'center'}}><b>Left & Right</b></h2>
        <hr></hr>
        <br></br>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengendalikan arah rotasi Bidawang menggunakan left() dan right().</li>
        </ol>

        <hr />

        <p>
           Perintah left() dan right() digunakan untuk memutar arah gerakan Bidawang berdasarkan sudut derajat yang diberikan, tanpa harus memindahkan posisinya. Ini berguna untuk mengatur arah Bidawang sebelum melanjutkan dengan perintah lainnya seperti bergerak.
        </p><br />

        <h5>1. left(<i>derajat</i>)</h5>
        <p>Memutar arah Bidawang berlawanan arah jarum jam (kiri) sebesar derajat yang ditentukan.</p>
        <p>Contoh:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Putar Bidawang ke kiri sejauh 120 derajat 
left(120)`}
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
        <p><b>Hasil:</b> Bidawang yang awalnya menghadap ke kanan layar, akan berputar 120 derajat ke kiri.</p>

        <br/>

        <h5>2. right(<i>derajat</i>)</h5>
        <p>Memutar arah Bidawang searah jarum jam (kanan) sebesar derajat yang ditentukan.</p>
        <p>Contoh:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Putar Bidawang ke kanan sejauh 90 derajat 
right(90)`}
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
        
        <p><b>Hasil:</b> Bidawang yang awalnya menghadap ke kanan layar, akan berputar 90 derajat ke kanan.</p>
        
        <br />
        <hr />

        <h4>Latihan menggunakan left() dan right()</h4>
        <p>
          Untuk lebih mudah memahami cara kerja perintah <code>left()</code> dan <code>right()</code>, ikuti instruksi di bawah ini.
        </p>

        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Berputar ke kiri</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Buat bidawang berputar 90 derajat ke kiri dengan perintah di bawah ini:</p>
                  <pre><code>left(90)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Berputar ke kanan</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan pada baris baru dengan perintah dibawah ini untuk memutar Bidawang ke kanan sebesar 180 derajat:</p>
                  <pre><code>right(180)</code></pre>
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
        
        <br />

        <hr />

        <h4>Kesimpulan</h4>
        <p>
          Perintah `left()` dan `right()` memungkinkan pengaturan arah gerakan bidawang dengan rotasi ke kiri atau ke kanan berdasarkan derajat yang ditentukan. Perintah ini sangat berguna untuk kontrol arah sebelum melakukan perintah lain dalam pembuatan gambar atau pola.
        </p>
        <br />

        <hr />

        
        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Apa perbedaan utama antara perintah left() dan right() ?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="left() memutar bidawang ke arah kanan, sementara right() memutar bidawang ke arah kiri." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left() memutar bidawang ke arah kanan, sementara right() memutar bidawang ke arah kiri.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="left() memutar bidawang ke arah kiri, sementara right() memutar bidawang ke arah kanan." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left() memutar bidawang ke arah kiri, sementara right() memutar bidawang ke arah kanan.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="left() dan right() hanya digunakan untuk mengubah warna bidawang." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left() dan right() hanya digunakan untuk mengubah warna bidawang.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Keduanya memindahkan bidawang ke posisi (0, 0)." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Keduanya memindahkan bidawang ke posisi (0, 0).')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Jika turtle menghadap ke timur (kanan layar), dan Anda menggunakan perintah right(90), ke arah mana turtle akan menghadap?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Utara (atas layar)" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Utara (atas layar)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Barat (kiri layar)" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Barat (kiri layar)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Selatan (bawah layar)" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Selatan (bawah layar)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Timur (kanan layar)" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Timur (kanan layar)')} 
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
              Selesaikan tantangan dibawah ini menggunakan perintah <code>left()</code> dan <code>right()</code> untuk mengubah arah objek. 
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
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      </div>
    </div>
  );
}

export default LeftRight;
