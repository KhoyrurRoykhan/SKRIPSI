import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import papuyu from './assets/papuyu-1.png';

const TantanganSatu = () => {
    const [turtleCommands, setTurtleCommands] = useState('');
    const canvasRef = useRef(null);
    const papuyuImageRef = useRef(null);
  
    const handleCommandChange = (event) => {
      setTurtleCommands(event.target.value);
    };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const papuyuImage = papuyuImageRef.current;
      
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

      // Tampilkan papuyu di tengah canvas saat pertama kali dimuat
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Gunakan metode scaling yang lebih baik
      const imageWidth = 500; // Ukuran gambar diperkecil
      const aspectRatio = papuyuImage.width / papuyuImage.height;
      const imageHeight = imageWidth / aspectRatio;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(
        papuyuImage, 
        centerX - imageWidth / 2, 
        centerY - imageHeight / 2, 
        imageWidth, 
        imageHeight
      );
    }, [papuyuImageRef]);
  
    const executeCommands = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const papuyuImage = papuyuImageRef.current;
  
      // Bersihkan canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Inisialisasi ulang background dan garis tengah
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'lightgray';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Mulai dari tengah canvas
      let turtleX = canvas.width / 2;
      let turtleY = canvas.height / 2;
      let currentAngle = 90; // Sudut awal diubah menjadi 90 derajat agar papuyu menghadap ke atas
      let currentX = turtleX;
      let currentY = turtleY;
  
      // Siapkan untuk menggambar garis
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);

      // Simpan jalur gerakan
      const path = [{ x: currentX, y: currentY }];
  
      // Parse and execute commands
      const commands = turtleCommands.split('\n');
      commands.forEach((command) => {
        const parts = command.trim().split(' ');
        const instruction = parts[0].toLowerCase();
        const value = parseFloat(parts[1]); // Ubah menjadi parseFloat
  
        switch (instruction) {
            case 'forward':
            case 'fd':
                // Bergerak maju sesuai sudut
                currentX += value * Math.cos((currentAngle - 90) * Math.PI / 180);
                currentY += value * Math.sin((currentAngle - 90) * Math.PI / 180);
                path.push({ x: currentX, y: currentY });
                break;
            
            case 'backward':
            case 'bk':
                // Bergerak mundur sesuai sudut
                currentX -= value * Math.cos((currentAngle - 90) * Math.PI / 180);
                currentY -= value * Math.sin((currentAngle - 90) * Math.PI / 180);
                path.push({ x: currentX, y: currentY });
                break;
            
            case 'right':
            case 'rt':
                // Putar ke kanan (searah jarum jam)
                currentAngle += value;
                break;
            
            case 'left':
            case 'lt':
                // Putar ke kiri (berlawanan arah jarum jam)
                currentAngle -= value;
                break;
            
            case 'goto':
                // Pindah ke koordinat absolut
                if (parts.length === 3) {
                    currentX = canvas.width / 2 + parseFloat(parts[1]);
                    currentY = canvas.height / 2 - parseFloat(parts[2]);
                    path.push({ x: currentX, y: currentY });
                }
                break;
            
            case 'setheading':
            case 'seth':
                // Atur sudut absolut
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
      path.slice(1).forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
  
      // Gambar papuyu di posisi akhir dengan rotasi
      const imageWidth = 500; // Ukuran gambar diperkecil
      const aspectRatio = papuyuImage.width / papuyuImage.height;
      const imageHeight = imageWidth / aspectRatio;
      
      ctx.save(); // Simpan state canvas
      
      // Pindahkan titik pusat ke posisi gambar
      ctx.translate(currentX, currentY);
      
      // Rotasi canvas - Kurangi 90 derajat untuk menyesuaikan orientasi awal
      ctx.rotate((currentAngle - 90) * Math.PI / 180);
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Gambar gambar dengan posisi yang dikoreksi
      ctx.drawImage(
        papuyuImage, 
        -imageWidth / 2, 
        -imageHeight / 2, 
        imageWidth, 
        imageHeight
      );
      
      ctx.restore(); // Kembalikan state canvas
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
bk 50
lt 45
goto 100 200
setheading 90`}
                />
              </Form.Group>
              <Button variant="primary " onClick={executeCommands}>
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
          </Col>
        </Row>
      </Container>
    );
};

export default TantanganSatu;