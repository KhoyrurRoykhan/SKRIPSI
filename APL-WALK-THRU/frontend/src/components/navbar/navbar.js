import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBook, FaTrophy, FaWater } from 'react-icons/fa'; // Import icons
import './assets/navbar.css';

const Navigasibar = () => {

  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
    } catch (error) {
      if (error.response) {
        navigate('/login');
      }
    }
  };

  return (
    <Navbar className="bg-success fixed-top">
      <Container>
        <Navbar.Brand style={{color: 'white'}} href="/">WALK THROUGH</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link style={{color: 'white'}} className='ml-5' href="/belajarturtle"><FaBook /> Belajar Turtle</Nav.Link>
            <Nav.Link style={{color: 'white'}} className='ml-5' href="/challanges"><FaTrophy /> Tantangan</Nav.Link>
            <Nav.Link style={{color: 'white'}} className='ml-5' href="/susursungai"><FaWater /> Susur Sungai</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" style={{color: 'white'}}>
          <Navbar.Text style={{color: 'white'}}>
            Signed in as: <a href="#login">{name}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigasibar;