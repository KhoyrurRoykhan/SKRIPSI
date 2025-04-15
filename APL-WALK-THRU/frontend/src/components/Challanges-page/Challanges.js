import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import map1 from './assets/thumbnail-1.png';
import map2 from './assets/thumbnail-2.png';
import map3 from './assets/thumbnail-3.png';
import map4 from './assets/thumbnail-4.png';
import map5 from './assets/thumbnail-5.png';
import map6 from './assets/thumbnail-6.png';
import map7 from './assets/thumbnail-7.png';
import map8 from './assets/thumbnail-8.png';
import map9 from './assets/thumbnail-9.png';
import map10 from './assets/thumbnail-10.png';
import map11 from './assets/thumbnail-11.png';
import map12 from './assets/thumbnail-12.png';

const challenges = [
  { id: 1, name: 'Mengubah Arah ke Kiri dan ke Kanan', link: '/challanges/1', image: map1 },
  { id: 2, name: 'Bergerak dan Berbelok', link: '/challanges/2', image: map2 },
  { id: 3, name: 'Berpindah Posisi Sesuai Koordinat', link: '/challanges/3', image: map3 },
  { id: 4, name: 'Berpindah Posisi Sesuai Koordinat X dan Y', link: '/challanges/4', image: map4 },
  { id: 5, name: 'Menebak Arah Kepiting Dengan Spesifik', link: '/challanges/5', image: map5 },
  { id: 6, name: 'Bergerak Melingkar', link: '/challanges/6', image: map6 },
  { id: 7, name: 'Mencari Tahu Koordinat Sayur dan Ikan', link: '/challanges/7', image: map7 },
  { id: 8, name: 'Mencari Tahu Koordinat X dan Y Udang', link: '/challanges/8', image: map8 },
  { id: 9, name: 'Mencari Tahu Jarak Harta Karun', link: '/challanges/9', image: map9 },
  { id: 10, name: 'Menggambar Bentuk Geometri', link: '/challanges/10', image: map10 },
  { id: 11, name: 'Mewarnai Bentuk Geometri', link: '/challanges/11', image: map11 },
  { id: 12, name: 'Bergerak Secara Berulang', link: '/challanges/12', image: map12 },
];

const Challenges = () => {
  return (
    <Container style={{ marginTop: 100 }}>
      <h2 className='mb-3'>Challanges</h2>
      <Row>
        {challenges.map((challenge) => (
          <Col key={challenge.id} md={6} lg={4} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <img
                  src={challenge.image}
                  alt={challenge.name}
                  className="me-3"
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                />
                <div>
                  <Card.Title className="mb-1" style={{ fontSize: '1.1rem' }}>
                    <a href={challenge.link} className="text-primary text-decoration-none" style={{color:'#2DAA9E'}}>
                      {challenge.id}. {challenge.name}
                    </a>
                  </Card.Title>
                  {challenge.id === 1 ? (
                    <Badge bg="success" className="mt-1">Selesai</Badge>
                  ) : (
                    <Card.Text className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                      Kamu belum menyelesaikan tantangan ini
                    </Card.Text>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Challenges;
