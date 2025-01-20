import React, { useState } from 'react';
import SidebarTutor from '../SidebarTutor';
import { Container, Row, Col, Button, Form, Alert, Card, Image } from 'react-bootstrap';
import '../assets/tutor.css';
import '../asset_skulpt/SkulptTurtleRunner.css';
import left120 from './assets/1left120.gif';
import right90 from './assets/1right90.gif';
import gabunganleftright from './assets/1gabunganleftright.gif';

const LeftRight = () => {
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
      question2: answers.question2 === 'Utara' 
        ? 'Benar!' 
        : 'Salah! Turtle akan menghadap Utara.'
    };

    setFeedback(feedbackMessages);
  };

  // Editor
  const [pythonCode, setPythonCode] = useState(``);
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

  const runit = () => {
    setOutput('');
    const imports = "from turtle import *\n";
    const prog = imports + pythonCode;
    
    window.Sk.pre = "output";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas';

    const myPromise = window.Sk.misceval.asyncToPromise(() => 
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    );

    myPromise.then(
      () => console.log('success'),
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Open Sans, sans-serif' }}>
        <h1 className='mt-3'><b>Turtle Left & Right</b></h1>
        <br />

        <h4>Tujuan Pembelajaran</h4>
        <ol>
          <li>Memahami cara mengendalikan arah gerakan turtle menggunakan left() dan right().</li>
          <li>Memahami rotasi kiri dan kanan pada turtle.</li>
        </ol>

        <hr />

        <h4>Definisi Turtle <code>left()</code> dan <code>right()</code></h4>
        <p>
          Dalam pustaka Turtle Graphics, metode left() dan right() digunakan untuk memutar arah gerakan turtle berdasarkan sudut derajat yang diberikan, tanpa harus memindahkan posisinya. Ini berguna untuk mengatur arah turtle sebelum melanjutkan dengan perintah lainnya, seperti menggambar atau bergerak.
        </p><br />

        <h4>Fungsi:</h4>
        <h5>1. <code>left(derajat)</code></h5>
        <p>Memutar arah turtle berlawanan arah jarum jam (kiri) sebesar derajat yang ditentukan.</p>
        <pre>
          <code>
            {`# Putar turtle ke kiri sejauh 120 derajat 
left(120)`}
          </code>
        </pre>

        <p>Hasil:</p>
        <p>Objek yang awalnya menghadap ke kanan layar, akan berputar 120 derajat ke kiri.</p>
        <Image src={left120} alt="Hasil left(120)" width="400px" height="400px" />

        <br/>
        <br/>

        <h5>2. <code>right(derajat)</code></h5>
        <p>Memutar arah turtle searah jarum jam (kanan) sebesar derajat yang ditentukan.</p>
        <pre>
          <code>
            {`# Putar turtle ke kanan sejauh 90 derajat 
right(90) `}
          </code>
        </pre>
        <p>Hasil:</p>
        <p>Objek yang awalnya menghadap ke kanan layar, akan berputar 90 derajat ke kanan.</p>
        <Image src={right90} alt="Hasil right(90)" width="400px" height="400px" />
        
        <br />

        <hr />

        <h4>Contoh Penggunaan Gabungan <code>left()</code> dan <code>right()</code></h4>
        <p>
          Kita bisa mengombinasikan kedua perintah ini untuk membuat pola rotasi tanpa menggerakkan turtle maju. Misalnya, jika ingin memutar turtle ke kiri 90 derajat lalu kembali ke posisi semula dengan memutar ke kanan:
        </p>
        <pre>
          <code>
            {`# Putar ke kiri sejauh 90 derajat 
left(90) 
# Putar ke kanan sejauh 90 derajat 
right(90) `}
          </code>
        </pre>
        <p>Hasil:</p>
        <p>Objek akan berputar 90 derajat ke kiri, kemudian berputar lagi 90 derajat ke kanan. Hasilnya akan kembali ke posisi awal.</p>
        <Image src={gabunganleftright} alt="Hasil gabungan" width="400px" height="400px" />
        <br/>
        <br/>

        <p>Meskipun `left()` dan `right()` biasanya dikombinasikan dengan perintah lain seperti `forward()` untuk menggambar , perintah ini juga bisa digunakan secara mandiri untuk mengatur sudut atau arah dari turtle sesuai dengan kebutuhan.</p>
        <br />

        <hr />

        <div className="skulpt-container">
      <div className="editor-section">
        <h3>Python Turtle Code Editor</h3>
        <textarea
          value={pythonCode}
          onChange={(e) => setPythonCode(e.target.value)}
          rows="20"
          placeholder="Tuliskan kode turtle kamu disini..."
        />
        <button onClick={runit}>Run Code</button>
        <pre className="output">{output}</pre>
      </div>
      <div className="canvas-section">
        <div id="mycanvas"></div>
      </div>
    </div>

    <hr></hr>

        <h4>Kesimpulan</h4>
        <p>
          Perintah `left()` dan `right()` dalam pustaka Turtle Graphics memungkinkan pengaturan arah gerakan turtle dengan rotasi ke kiri atau ke kanan berdasarkan derajat yang ditentukan. Perintah ini sangat berguna untuk kontrol arah sebelum melakukan perintah lain dalam pembuatan gambar atau pola.
        </p>
        <br />

        <hr />

        <h4>Kuis</h4>
        <Card className='mb-4'>
              <Card.Body>
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
              </Card.Body>
            </Card>

        <Card className='mb-4'>
          <Card.Body>
            <h4>Tantangan</h4>
            <p>
              Coba gunakan perintah <code>left()</code> dan <code>right()</code> untuk mengubah arah objek. Klik tombol di bawah ini untuk mengerjakan tantangan berikutnya.
            </p>
            <Button variant="success" href="/challanges/one">Mulai Tantangan</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default LeftRight;
