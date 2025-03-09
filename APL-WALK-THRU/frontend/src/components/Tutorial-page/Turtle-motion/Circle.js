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
import map from './assets/7-circle.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'right(90)',
  '1c': 'forward(100)',
  '1d': 'left(45)',
  '1e': 'forward(50)'
};

const Circle = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      " Tugas kalian adalah:. \n1. Buat lingkaran dengan jari jari 180\n 2. Pindahkan posisi bidawang naik ke atas sejauh 50 langkah kemudian gambar lingkaran lagi dengan jari jari 130\n 3. Pindahkan lagi posisi bidawang naik ke atas sejauh 50 langkah kemudian gambar busur dengan jari jari 80 dan sudut 180 derajat",
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
      question1: answers.question1 === 'Menentukan besaran sudut busur yang ingin Digambar.' 
        ? 'Benar!' 
        : 'Salah!',
      question2: answers.question2 === 'Lingkaran dengan jari-jari 50 akan digambar dengan arah berlawanan.' 
        ? 'Benar!' 
        : 'Salah!'
    };
    setFeedback(feedbackMessages);
  };

  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode1, setPythonCode1] = useState(`

for i in range(100):
  speed(1)
  # Menggambar lingkaran dengan jari-jari 50
  circle(50)
  speed(0)
  home()
  reset()
`);

const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  # Menggambar busur dengan jari 50 dan 180 derajat
  circle(50, 180)
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
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(0,-180)\npendown()\nspeed(1)\n";
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
        ["circle(180)", "setposition(0,-130)", "circle(130)", "setposition(0,-80)", "circle(80,180)"],
        ["circle(180)", "left(90)", "forward(50)", "right(90)", "circle(130)", "left(90)", "forward(50)", "right(90)", "circle(80,180)"]
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
    runit2(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);
  
  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>
      <div>
        <h2 style={{textAlign:'center'}}>Circle</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara menggambar lingkaran menggunakan <code>circle()</code>.</li>
        </ol>

        <hr/>

        <p>
        Fungsi <b>circle()</b> digunakan untuk menggambar lingkaran atau bagian dari lingkaran (busur) dengan jari-jari tertentu. Fungsi ini sangat berguna untuk menggambar bentuk bulat dan pola yang melibatkan lingkaran.
        </p>
        <p><code>circle(jari_jari, extent=None)</code>: Menggambar lingkaran dengan jari-jari yang ditentukan. Parameter <code>extent</code> opsional dan digunakan untuk menggambar busur lingkaran. Jika <code>extent</code> tidak diberikan, maka lingkaran penuh akan digambar.</p>
        <ul>
          <li><strong>jari_jari</strong>: Jari-jari lingkaran yang ingin digambar.</li>
          <li><strong>extent</strong>: Sudut (dalam derajat) dari lingkaran yang ingin digambar. Jika tidak ada, menggambar lingkaran penuh (360 derajat).</li>
        </ul>

        <br></br>

        <h5>Contoh 1:</h5>
        <p>Menggambar lingkaran penuh dengan menentukan jari-jari:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Menggambar lingkaran dengan jari-jari 50
circle(50)`}
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
        <p><b>Hasil:</b> Fungsi <code>circle(50)</code> akan membuat Bidawang menggambar lingkaran dengan jari jari 50.</p>
        
        <br></br>

        <h5>Contoh 2:</h5>
        <p>Menggambar busur dengan menentukan besaran derajatnya <i>'extent'</i>:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Menggambar busur dengan jari 50 dan 180 derajat
circle(50, 180)`}
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
        <p><b>Hasil:</b> Fungsi <code>circle(50,180)</code> akan membuat Bidawang menggambar lingkaran dengan jari jari 50, dengan besar busur 180 derajat.</p>
        
        <br></br>

        <hr />

        <h4>Latihan Menggunakan circle()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>circle()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Membuat Lingkaran</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar lingkaran dengan panjang jari-jari 50 dengan perintah di bawah ini:</p>
                  <pre><code>circle(50)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Berpindah Posisi</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini memindahkan posisi bidawang ke bawah sejauh 50 langkah:</p>
                  <pre><code>right(90)</code></pre>
                  <pre><code>forward(50)</code></pre>
                  <pre><code>left(90)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Membuat Lingkaran</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar lingkaran lagi dengan panjang jari-jari 100:</p>
                  <pre><code>circle(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Ubah Arah</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Putar Bidawang agar menghadap ke arah yang berlawanan dari posisi awal:</p>
                  <pre><code>right(180)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1e">
                <AccordionHeader>
                  <b>5. Membuat Busur</b>
                  {completedSteps.includes('1e') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar Busur dengan jari-jari 50 dan putaran 180 derajat:</p>
                  <pre><code>cirle(50,180)</code></pre>
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
        Perintah <b>circle()</b> digunakan untuk menggambar lingkaran atau busur dengan mudah. Dengan mengatur jari-jari dan opsi `extent`, kita dapat menggambar berbagai bentuk bulat yang berbeda untuk memperkaya gambar atau pola yang dibuat.
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Apa fungsi dari parameter extent dalam metode circle()? </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Mengatur arah lingkaran." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengatur arah lingkaran.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menentukan ukuran jari-jari lingkaran." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menentukan ukuran jari-jari lingkaran.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menentukan besaran sudut busur yang ingin Digambar." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Menentukan besaran sudut busur yang ingin Digambar.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Mengubah warna lingkaran." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Mengubah warna lingkaran.')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Apa yang terjadi jika Anda menjalankan perintah circle(-50)? </Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Tidak ada lingkaran yang Digambar." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Tidak ada lingkaran yang Digambar.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Lingkaran dengan jari-jari 50 akan digambar berlawanan dengan arah." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Lingkaran dengan jari-jari 50 akan digambar dengan arah berlawanan.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Lingkaran dengan jari-jari 50 akan digambar dengan arah normal (berlawanan arah jarum jam)" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Lingkaran dengan jari-jari 50 akan digambar dengan arah normal (berlawanan arah jarum jam)')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Lingkaran kecil akan digambar di posisi saat ini."
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Lingkaran kecil akan digambar di posisi saat ini.')} 
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

export default Circle
