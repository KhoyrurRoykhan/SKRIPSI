import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const challenges = [
  { id: 1, name: 'Get the Broccoli', link: '#' },
  { id: 2, name: 'Get the shapes', link: '#' },
  { id: 3, name: 'Let\'s have Pizza', link: '#' },
  { id: 4, name: 'How about some cookies', link: '#' },
  { id: 5, name: 'Meet some Friends', link: '#' },
  { id: 6, name: 'The turtle is not in the middle', link: '#' },
  { id: 7, name: 'The Square Butterfly Hunt', link: '#' },
  { id: 8, name: 'The Square Butterfly Hunt part 2', link: '#' },
  { id: 9, name: 'Arc Gathering', link: '#' },
  { id: 10, name: 'Rectangle and Square', link: '#' },
  { id: 11, name: 'Animals Star', link: '#' },
  { id: 12, name: 'Triangle in a triangle', link: '#' }
];

const Challenges = () => {
  return (
    <Container className="mt-4">
      <h2>Challenges</h2>
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
