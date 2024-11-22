import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert'; // Impor SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/cacingtarget.png';

const TantanganSatu = () => {
  const [turtleCommands, setTurtleCommands] = useState('');
  const canvasRef = useRef(null);
  const papuyuImageRef = useRef(null);
  const broccoliImageRef = useRef(null);

  const handleCommandChange = (event) => {
    setTurtleCommands(event.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const papuyuImage = papuyuImageRef.current;
    const broccoliImage = broccoliImageRef.current;

    // Inisialisasi canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar garis tengah
    ctx.strokeStyle = 'lightgray';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Tampilkan papuyu dan broccoli di posisi awal
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Target (Broccoli)
    const broccoliTarget = { x: 100, y: 100 };

    // Papuyu
    const imageWidth = 500; 
    const aspectRatio = papuyuImage.width / papuyuImage.height;
    const imageHeight = imageWidth / aspectRatio;

    // Broccoli
    const broccoliImageWidth = 100;
    const broccoliAspectRatio = broccoliImage.width / broccoliImage.height;
    const broccoliImageHeight = broccoliImageWidth / broccoliAspectRatio;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Gambar Broccoli di posisi target
    ctx.drawImage(
      broccoliImage,
      centerX + broccoliTarget.x - broccoliImageWidth / 2,
      centerY - broccoliTarget.y - broccoliImageHeight / 2,
      broccoliImageWidth,
      broccoliImageHeight
    );

    // Gambar Papuyu di tengah
    ctx.drawImage(
      papuyuImage,
      centerX - imageWidth / 2,
      centerY - imageHeight / 2,
      imageWidth,
      imageHeight
    );
  }, [papuyuImageRef, broccoliImageRef]);

  const executeCommands = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const papuyuImage = papuyuImageRef.current;
    const broccoliImage = broccoliImageRef.current;
  
    // Inisialisasi ulang canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = 'lightgray';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  
    // Posisi target (Broccoli)
    const broccoliTarget = { x: 100, y: 100 };
  
    // Gambar Broccoli
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
  
    // Posisi awal Papuyu
    let currentX = canvas.width / 2;
    let currentY = canvas.height / 2;
    let currentAngle = 90;
  
    // Jalur pergerakan
    const path = [{ x: currentX, y: currentY }];
  
    // Eksekusi perintah
    const commands = turtleCommands.split('\n');
    commands.forEach((command) => {
      const parts = command.trim().split(' ');
      const instruction = parts[0].toLowerCase();
      const value = parseFloat(parts[1]);
  
      switch (instruction) {
        case 'forward':
        case 'fd':
          currentX += value * Math.cos((currentAngle - 90) * Math.PI / 180);
          currentY += value * Math.sin((currentAngle - 90) * Math.PI / 180);
          path.push({ x: currentX, y: currentY });
          break;
  
        case 'backward':
        case 'bk':
          currentX -= value * Math.cos((currentAngle - 90) * Math.PI / 180);
          currentY -= value * Math.sin((currentAngle - 90) * Math.PI / 180);
          path.push({ x: currentX, y: currentY });
          break;
  
        case 'right':
        case 'rt':
          currentAngle += value;
          break;
  
        case 'left':
        case 'lt':
          currentAngle -= value;
          break;
  
        case 'goto':
          if (parts.length === 3) {
            currentX = canvas.width / 2 + parseFloat(parts[1]);
            currentY = canvas.height / 2 - parseFloat(parts[2]);
            path.push({ x: currentX, y: currentY });
          }
          break;
  
        case 'setheading':
        case 'seth':
          currentAngle = value;
          break;
  
        default:
          console.warn('Invalid command:', command);
      }
    });
  
    // Gambar jalur pergerakan
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.moveTo(path[0].x, path[0].y);
    path.slice(1).forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  
    // Gambar ulang Papuyu di posisi akhir
    const imageWidth = 500;
    const aspectRatio = papuyuImage.width / papuyuImage.height;
    const imageHeight = imageWidth / aspectRatio;
  
    ctx.save();
    ctx.translate(currentX, currentY);
    ctx.rotate((currentAngle - 90) * Math.PI / 180);
  
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      papuyuImage,
      -imageWidth / 2,
      -imageHeight / 2,
      imageWidth,
      imageHeight
    );
    ctx.restore();
  
    // Debug posisi akhir Papuyu
    console.log(`Papuyu Final Position: (${currentX.toFixed(2)}, ${currentY.toFixed(2)})`);
    console.log(`Broccoli Position: (${canvas.width / 2 + broccoliTarget.x}, ${canvas.height / 2 - broccoliTarget.y})`);
  
    // Toleransi posisi
    const tolerance = 2;
  
    // **Pengecekan posisi di akhir eksekusi**
    setTimeout(() => {
      if (
        Math.abs(currentX - (canvas.width / 2 + broccoliTarget.x)) <= tolerance &&
        Math.abs(currentY - (canvas.height / 2 - broccoliTarget.y)) <= tolerance
      ) {
        swal("Horee!", "Ikan Papuyu telah memakan Cacing!", "success"); // Menggunakan SweetAlert
      }
    }, 0); // Delay sangat kecil untuk memastikan sinkronisasi
  };
  
  return (
    <Container style={{marginTop: 100}}>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="turtleCommands">
              <Form.Label>Input Turtle Commands</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={turtleCommands}
                onChange={handleCommandChange}
                placeholder={`Enter commands like:
fd 100
rt 90
`}
              />
            </Form.Group>
            <Button variant="primary" onClick={executeCommands }>
              Execute
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            style={{ border: '1px solid black' }} 
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
        </Col>
      </Row>
    </Container>
  );
};

export default TantanganSatu;