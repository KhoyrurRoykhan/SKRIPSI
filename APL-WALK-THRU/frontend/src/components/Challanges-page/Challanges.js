import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const challenges = [
  { id: 1, name: 'Jelajahi Lahan Basah: Temui Monyet Proboscis', link: '#' },
  { id: 2, name: 'Temukan Keindahan Orangutan Borneo', link: '#' },
  { id: 3, name: 'Buat Rumah untuk Dolphin Sungai', link: '#' },
  { id: 4, name: 'Gambar Burung Raja Udang yang Berwarna-warni', link: '#' },
  { id: 5, name: 'Rancang Sarang untuk Burung Hornbill', link: '#' },
  { id: 6, name: 'Bantu Kura-kura Menemukan Jalannya Pulang', link: '#' },
  { id: 7, name: 'Misi Kupu-kupu di Lahan Basah yang Hebat', link: '#' },
  { id: 8, name: 'Perburuan Serangga Lahan Basah yang Menakjubkan', link: '#' },
  { id: 9, name: 'Kumpulkan Ikan dari Lahan Basah', link: '#' },
  { id: 10, name: 'Bentuk Habitat Lahan Basah', link: '#' },
  { id: 11, name: 'Malam Berbintang di Lahan Basah', link: '#' },
  { id: 12, name: 'Segitiga Lahan Basah: Petualangan Geometris', link: '#' }
];

const Challenges = () => {
  return (
    <Container style={{marginTop:100}}>
      <h2 className='mb-3'>Challenges</h2>
      <Row>
        {challenges.map((challenge, index) => (
          <Col key={challenge.id} md={6} lg={4} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <a href={challenge.link} className="text-primary text-decoration-none">
                    {challenge.id}. {challenge.name}
                  </a>
                </Card.Title>
                {challenge.id === 1 ? (
                  <div className="star-rating mb-2">
                    {Array(5).fill().map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  </div>
                ) : (
                  <Card.Text className="text-muted">
                    You don't have score for this challenge yet
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Challenges;
