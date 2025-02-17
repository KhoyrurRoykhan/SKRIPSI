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
  '1c': 'forward(100)',
  '1d': 'left(45)',
  '1e': 'forward(50)'
};

const LeftRight = () => {
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
      question1: answers.question1 === 'left() memutar turtle ke arah kiri, sementara right() memutar turtle ke arah kanan.' 
        ? 'Benar!' 
        : 'Salah! left() memutar turtle ke arah kiri, sementara right() memutar turtle ke arah kanan.',
      question2: answers.question2 === 'Selatan' 
        ? 'Benar!' 
        : 'Salah! Turtle akan menghadap Selatan.'
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
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCodeChallanges;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
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

  //Chalange
  const [turtleCommands, setTurtleCommands] = useState('');
  const canvasRef = useRef(null);
  const papuyuImageRef = useRef(null);
  const broccoliImageRef = useRef(null);

  const handleCommandChange = (event) => {
    setTurtleCommands(event.target.value);
  };

  const showHint = () => {
    swal(
      "Deskripsi Misi",
      "Bantu Papuyu menghadap ke cacing lezat di posisi 100,100!\n\n" +
        "Tujuan: Papuyu memulai dari posisi 0,0 dan harus diarahkan untuk menghadap langsung ke cacing di posisi 100,100.\n\n" +
        "Instruksi:\n" +
        "1) Gunakan perintah 'left(x)' untuk berbelok ke kiri sebesar x derajat.\n" +
        "2) Gunakan perintah 'right(x)' untuk berbelok ke kanan sebesar x derajat.\n" +
        "3) Setelah sudut Papuyu menghadap ke cacing, misi selesai!\n\n" +
        "Selamat mencoba!",
      "info"
    );
  };

  const drawGrid = (ctx) => {
    ctx.strokeStyle = 'lightgray'; // Color of the grid lines
    ctx.lineWidth = 0.5; // Thickness of the grid lines
    ctx.fillStyle = 'black'; // Color for the grid numbers
    ctx.font = '10px Arial'; // Font for the grid numbers

    // Draw vertical lines and labels
    for (let x = 0; x <= ctx.canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
      ctx.fillText(x - ctx.canvas.width / 2, x, ctx.canvas.height / 2 + 10);
    }

    // Draw horizontal lines and labels
    for (let y = 0; y <= ctx.canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
      ctx.fillText((ctx.canvas.height / 2 - y).toString(), ctx.canvas.width / 2 + 5, y + 3);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const papuyuImage = papuyuImageRef.current;
    const broccoliImage = broccoliImageRef.current;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx);

    ctx.strokeStyle = 'lightgray';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const broccoliTarget = { x: 100, y: 100 };

    const broccoliImageWidth = 100;
    const broccoliAspectRatio = broccoliImage.width / broccoliImage.height;
    const broccoliImageHeight = broccoliImageWidth / broccoliAspectRatio;

    ctx.drawImage(
      broccoliImage,
      centerX + broccoliTarget.x - broccoliImageWidth / 2,
      centerY - broccoliTarget.y - broccoliImageHeight / 2,
      broccoliImageWidth,
      broccoliImageHeight
    );

    const imageWidth = 500;
    const aspectRatio = papuyuImage.width / papuyuImage.height;
    const imageHeight = imageWidth / aspectRatio;

    ctx.drawImage(
      papuyuImage,
      centerX - imageWidth / 2,
      centerY - imageHeight / 2,
      imageWidth,
      imageHeight
    );

    // showHint();
  }, []);

  const executeCommands = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const papuyuImage = papuyuImageRef.current;
    const broccoliImage = broccoliImageRef.current;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx);

    ctx.strokeStyle = 'lightgray';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    const broccoliTarget = { x: 100, y: 100 };

    const broccoliImageWidth = 100;
    const broccoliAspectRatio = broccoliImage.width / broccoliImage.height;
    const broccoliImageHeight = broccoliImageWidth / broccoliAspectRatio;

    ctx.drawImage(
      broccoliImage,
      canvas.width / 2 + broccoliTarget.x - broccoliImageWidth / 2,
      canvas.height / 2 - broccoliTarget.y - broccoliImageHeight / 2,
      broccoliImageWidth,
      broccoliImageHeight
    );

    let currentAngle = 90;

    const commands = turtleCommands.split('\n');
    commands.forEach((command) => {
      const parts = command.trim().split('(');
      const instruction = parts[0].toLowerCase();
      const value = parseFloat(parts[1]?.replace(')', ''));

      if (instruction === 'right') {
        currentAngle += value;
      } else if (instruction === 'left') {
        currentAngle -= value;
      } else {
        console.warn('Invalid command:', command);
      }
    });

    const dx = broccoliTarget.x;
    const dy = broccoliTarget.y;
    const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

    const normalizedCurrentAngle = ((currentAngle % 360) + 360) % 360;
    const normalizedTargetAngle = ((targetAngle % 360) + 360) % 360;

    const initialX = canvas.width / 2;
    const initialY = canvas.height / 2;
    const imageWidth = 500;
    const aspectRatio = papuyuImage.width / papuyuImage.height;
    const imageHeight = imageWidth / aspectRatio;

    ctx.save();
    ctx.translate(initialX, initialY);
    ctx.rotate((normalizedCurrentAngle - 90) * Math.PI / 180);
    ctx.drawImage(
      papuyuImage,
      -imageWidth / 2,
      -imageHeight / 2,
      imageWidth,
      imageHeight
    );
    ctx.restore();

    const angleTolerance = 2;
    if (Math.abs(normalizedCurrentAngle - normalizedTargetAngle) <= angleTolerance) {
      swal("Horee!", "Papuyu berhasil menghadap ke cacing!", "success");
    } else {
      swal(
        "Coba Lagi!",
        "Papuyu belum menghadap ke cacing dengan benar. Periksa perintah Anda.",
        "error"
      );
    }
  };

  useEffect(() => {
    // runit(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runit3(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <div>
      {/* <SidebarTutor /> */}
      <div className='content' style={{paddingLeft:50, paddingRight:50}}>
        <h2 className='mt-3' style={{textAlign:'center'}}><b>Left & Right</b></h2>
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
              height="300px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:300,height:300,  textAlign:'center'}}>
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
              height="300px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:300,height:300,  textAlign:'center'}}>
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
        
        <br />

        <hr />

        <h4>Kesimpulan</h4>
        <p>
          Perintah `left()` dan `right()` dalam pustaka Turtle Graphics memungkinkan pengaturan arah gerakan turtle dengan rotasi ke kiri atau ke kanan berdasarkan derajat yang ditentukan. Perintah ini sangat berguna untuk kontrol arah sebelum melakukan perintah lain dalam pembuatan gambar atau pola.
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
                <Form.Label>1. Apa perbedaan utama antara perintah left() dan right() dalam pustaka Turtle Graphics?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="left() memutar turtle ke arah kanan, sementara right() memutar turtle ke arah kiri." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left() memutar turtle ke arah kanan, sementara right() memutar turtle ke arah kiri.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="left() memutar turtle ke arah kiri, sementara right() memutar turtle ke arah kanan." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left() memutar turtle ke arah kiri, sementara right() memutar turtle ke arah kanan.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="left() dan right() hanya digunakan untuk mengubah warna turtle." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'left() dan right() hanya digunakan untuk mengubah warna turtle.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Keduanya memindahkan turtle ke posisi (0, 0)." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Keduanya memindahkan turtle ke posisi (0, 0).')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Jika turtle menghadap ke timur, dan Anda menggunakan perintah right(90), ke arah mana turtle akan menghadap?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Utara" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Utara')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Barat" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Barat')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Selatan" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Selatan')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Timur" 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Timur')} 
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
                  height="300px"
                  theme="light"
                  extensions={[python()]}
                  onChange={(value) => setPythonCodeChallanges(value)}
                />
                <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                  <Button variant="success" onClick={() => { runitchallanges(); checkCode(); }}>Run Code</Button>
                  <Button variant="secondary" onClick={resetCode}>
                    <BsArrowClockwise /> Reset
                  </Button>
                  </div>
                <pre className="output4" style={{height:60, width:330}}>{output}</pre>
              </div>
              <div className="canvas-section">
                <div id="mycanvas-challanges"></div>
              </div>
            </div>

            <Container style={{ marginTop: 50 }}>
              <Row>
                <Col md={6} className="d-flex justify-content-end">
                  <Form style={{ width: '100%' }}>
                    <Form.Group controlId="turtleCommands">
                      <Form.Label>Masukan Kode Perintah:</Form.Label>
                      <CodeMirror
                        value={turtleCommands}
                        height="300px"
                        theme="light"
                        extensions={[python()]}
                        onChange={(value) => handleCommandChange(value)}
                        placeholder={`Masukan perintah seperti:
right(45)
left(90)
`}
                      />
                    </Form.Group>
                    <Button className="mt-2" variant="success" onClick={executeCommands}>
                      Jalankan
                    </Button>
                    <Button className="mt-2 ms-2" variant="info" onClick={showHint}>
                      Tampilkan Petunjuk
                    </Button>
                  </Form>
                </Col>
                <Col md={6} className="d-flex justify-content-start">
                  <div style={{ position: 'relative' }}>
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={400}
                      style={{ border: '1px solid black', display: 'block' }}
                    />
                    <img
                      ref={papuyuImageRef}
                      src={papuyu}
                      alt="Papuyu"
                      style={{ display: 'none' }}
                    />
                    <img
                      ref={broccoliImageRef}
                      src={broccoli}
                      alt="Broccoli"
                      style={{ display: 'none' }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      </div>
    </div>
  );
}

export default LeftRight;
