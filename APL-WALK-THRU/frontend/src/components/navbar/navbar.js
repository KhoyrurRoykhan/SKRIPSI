import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaGamepad, FaCode, FaBookReader, FaUserCircle } from 'react-icons/fa';
import './assets/navbar.css';

const Navigasibar = () => {

  const [nama, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.nama);
    } catch (error) {
      if (error.response) {
        navigate('/login');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Navbar className="bg-success fixed-top" style={{fontFamily: 'Verdana, sans-serif' }}>
      <Container>
      <Nav.Link style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }} href="/">BidGeometry</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: '20px'}}>
          <Nav className="me-auto">
            <Nav.Link style={{color: 'white'}} className='ml-5' href="/belajar/pendahuluan"><FaBookReader /> Belajar Turtle</Nav.Link>
            <Nav.Link style={{color: 'white'}} className='ml-5' href="/challanges"><FaGamepad /> Tantangan</Nav.Link>
            <Nav.Link style={{color: 'white'}} className='ml-5' href="/texteditor"><FaCode /> Text Editor</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" style={{color: 'white'}}>
        <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
              <FaUserCircle size={28} color="white" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>{nama}</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigasibar;