  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  import { useNavigate } from 'react-router-dom';
  import Carousel from 'react-bootstrap/Carousel';
  import Container from 'react-bootstrap/Container';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import MenaraPandang from '../Landing-page/assets/menara-pandang.jpeg';
  import JukungTeratai from '../Landing-page/assets/jukung-teratai.jpg';
  import StikesSungai from '../Landing-page/assets/stikes-sungai.jpg';
  import turtle from '../Landing-page/assets/sea-turtle.gif';
  import './assets/landing-page.css';

  const LandingPage = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      refreshToken();
      // getUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refreshToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      } catch (error) {
        if (error.response) {
          navigate('/login');
        }
      }
    };
    
    return (
      <Container>
        <Carousel>
          <Carousel.Item>
            <img className="carousel-img" src={MenaraPandang} alt="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-img" src={JukungTeratai} alt="Second slide" /> 
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-img" src={StikesSungai} alt="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Container className="mt-5 d-flex justify-content-center align-items-center">
        <Row className="align-items-center">
          <Col xs="auto" className="text-center">
            <h3>WALK THRU</h3>
          </Col>
          <Col xs="auto">
            <img src={turtle} alt="turtle" className="turtle-img" />
          </Col>
        </Row>
      </Container>
      <h4 className='mt-4 text-center'>Jelajahi:</h4>
      <Container className="mt-2 d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card className='custom-card' >
            <Card.Img variant="top" src={MenaraPandang} className="custom-card-img"/>
            <Card.Body>
              <Card.Title className='text-center'>Belajar Turtle</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='custom-card'>
            <Card.Img variant="top" src={JukungTeratai} className="custom-card-img"/>
            <Card.Body>
              <Card.Title className='text-center'>Tantangan</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='custom-card'>
            <Card.Img variant="top" src={StikesSungai} className="custom-card-img"/>
            <Card.Body>
              <Card.Title className='text-center'>Susur Sungai</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
      
      </Container>
      
      
    )
  }

  export default LandingPage
