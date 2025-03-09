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
import map from './assets/1-fillcolor.png';

const correctCommands = {
    '1a': 'forward(100)',
    '1b': 'right(90)',
    '1c': 'forward(100)',
    '1d': 'left(45)',
    '1e': 'forward(50)'
  };

const FillColor = () => {
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
        question1: answers.question1 === 'Sebuah lingkaran dengan warna isian kuning.' 
          ? 'Benar!' 
          : 'Salah!',
        question2: answers.question2 === 'Menandai akhir area yang akan diisi warna.' 
          ? 'Benar!' 
          : 'Salah!'
      };
      setFeedback(feedbackMessages);
    };
  
    const [pythonCode, setPythonCode] = useState(``);
    const [pythonCode1, setPythonCode1] = useState(` 
for i in range(100):
  speed(1)
  fillcolor("green")  # Warna isian hijau 
  begin_fill() 
  circle(50)  # Membuat lingkaran 
  end_fill() 
  speed(1)
  home()

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
        <h2 style={{textAlign:'center'}}>Fillcolor, Begin_fill, dan End_fill</h2>
        <hr></hr>
        <br/>

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara kerja fungsi fillcolor, begin_fill, dan end_fill dalam mengatur warna isian pada bentuk geometris.</li>
        </ol>

        <hr/>

        <p>
        Perintah <code>fillcolor("<i>warna</i>")</code> Digunakan untuk menentukan warna isian yang akan diterapkan pada bentuk. Parameter warna dapat berupa nama warna atau kode RGB. Untuk mewarnai bentuk, perintah <code>fillcolor("<i>warna</i>")</code> harus di sertai dengan <code>begin_fill()</code> dan end_fill()</p>
        <ul>
          <li>begin_fill(): Menandai awal area yang akan diisi warna.</li>
          <li>end_fill(): Menandai akhir area yang akan diisi warna. Warna isian diterapkan sesuai pengaturan fillcolor.</li>
        </ul>


        <br></br>

        <h5>Contoh:</h5>
        <p>Membuat lingkaran berwarna hijau.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`fillcolor("green")  # Warna isian hijau 

begin_fill() 
circle(50)  # Membuat lingkaran 
end_fill() `}
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
        <p><b>Hasil:</b> Bidawang akan menggambar lingkaran, kemudian fungsi <code>fillcolor("green")</code> akan membuat warna lingkaran tersebut menjadi hijau.</p>
        
        <br></br>
        <hr />

        <h4>Latihan Menggunakan fillcolor()</h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>fillcolor()</code>, ikuti instruksi dibawah ini:
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Atur Warna Isian</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Atur warna isian terlebih dahulu dengan perintah dibawah ini:</p>
                  <pre><code>fillcolor("green")</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Menandai Awal</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk menandai awal area yang akan diisi warna:</p>
                  <pre><code>begin_fill()</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Membuat Segitiga</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gerakkan lagi Bidawang untuk membentuk segitiga dengan perintah dibawah ini:</p>
                  <pre><code>forward(150)</code></pre>
                  <pre><code>right(90)</code></pre>
                  <pre><code>forward(150)</code></pre>
                  <pre><code>home()</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Mendndai Akhir</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Tandai akhir area yang akan diisi warna dengan perintah dibawah ini:</p>
                  <pre><code>end_fill()</code></pre>
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
            Perintah <code>fillcolor()</code> digunakan untuk mengatur warna isian, sedangkan proses pengisian warna dilakukan dengan bantuan <code>begin_fill()</code> dan <code>end_fill()</code>. Untuk hasil optimal, pastikan area yang digambar adalah bentuk tertutup.
        </p>

        <br/>

        <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
        {/* Kuis Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h4>Kuis</h4></Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>1. Perhatikan kode berikut:
                <pre>forward(100)</pre>
                <pre>begin_fill()</pre>
                <pre>circle(50)</pre>
                <pre>end_fill()</pre> 
                <p>Apa hasil dari kode tersebut? </p></Form.Label>
                <Form.Check 
                  type="radio" 
                  label="Sebuah lingkaran dengan warna garis kuning tanpa isian." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Sebuah lingkaran dengan warna garis kuning tanpa isian.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Sebuah lingkaran dengan warna isian kuning." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Sebuah lingkaran dengan warna isian kuning.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Sebuah lingkaran dengan warna garis hitam dan isian kuning." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Sebuah lingkaran dengan warna garis hitam dan isian kuning.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Tidak ada lingkaran yang digambar." 
                  name="question1" 
                  onChange={() => handleAnswerChange('question1', 'Tidak ada lingkaran yang digambar.')} 
                />
              </Form.Group>
              {feedback.question1 && <Alert variant={feedback.question1 === 'Benar!' ? 'success' : 'danger'}>{feedback.question1}</Alert>}

              <Form.Group controlId="question2">
                <Form.Label>2. Apa fungsi dari end_fill() dalam proses pengisian warna?</Form.Label>
                <Form.Check 
                  type="radio" 
                  label='Mengatur warna isian menjadi transparan.' 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Mengatur warna isian menjadi transparan.')} 
                />
                <Form.Check 
                  type="radio" 
                  label='Menandai akhir area yang akan diisi warna.'
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Menandai akhir area yang akan diisi warna.')} 
                />
                <Form.Check 
                  type="radio" 
                  label="Menonaktifkan pengaturan warna pada turtle." 
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Menonaktifkan pengaturan warna pada turtle.')} 
                />
                <Form.Check 
                  type="radio" 
                  label='Menghapus warna isian dari bentuk yang digambar.'
                  name="question2" 
                  onChange={() => handleAnswerChange('question2', 'Menghapus warna isian dari bentuk yang digambar.')} 
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

export default FillColor
