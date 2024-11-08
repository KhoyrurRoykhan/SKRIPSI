import React, { useState } from 'react';
import './assets/tutor.css';

const SidebarTutor = () => {
  // State untuk melacak dropdown mana yang sedang aktif
  const [activeItem, setActiveItem] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null); // Untuk melacak dropdown aktif

  const handleSelect = (eventKey) => {
    setActiveItem(eventKey);
  };

  const toggleDropdown = (dropdownIndex) => {
    // Jika dropdown yang diklik sudah aktif, tutup, jika tidak, buka dropdown tersebut
    if (activeDropdown === dropdownIndex) {
      setActiveDropdown(null); // Tutup jika sudah terbuka
    } else {
      setActiveDropdown(dropdownIndex); // Buka dropdown baru
    }
  };

  return (
    <div className="sidenav mt-5">
      <a
        href="/tutorial"
        onClick={() => handleSelect('Pendahuluan')}
        className={activeItem === 'Pendahuluan' ? 'active' : ''}
      >
        Pendahuluan
      </a>

      {/* First Dropdown */}
      <button
        className={`dropdown-btn ${activeDropdown === 1 ? 'active' : ''}`}
        onClick={() => toggleDropdown(1)}
      >
        Turtle Motion <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-container" style={{ display: activeDropdown === 1 ? 'block' : 'none' }}>
        <a
          href="/tutorial/leftright"
          onClick={() => handleSelect('Link1')}
          className={activeItem === 'Link1' ? 'active' : ''}
        >
          Left & Right
        </a>
        <a
          href="/tutorial/forwardbackward"
          onClick={() => handleSelect('Link2')}
          className={activeItem === 'Link2' ? 'active' : ''}
        >
          Forward & Backward
        </a>
        <a
          href="/tutorial/setposition"
          onClick={() => handleSelect('Link3')}
          className={activeItem === 'Link3' ? 'active' : ''}
        >
          Setposition
        </a>
        <a
          href="/tutorial/setxy"
          onClick={() => handleSelect('Link4')}
          className={activeItem === 'Link4' ? 'active' : ''}
        >
          Setx & Sety
        </a>
        <a
          href="/tutorial/setheading"
          onClick={() => handleSelect('Link5')}
          className={activeItem === 'Link5' ? 'active' : ''}
        >
          Setheading
        </a>
        <a
          href="/tutorial/home"
          onClick={() => handleSelect('Link6')}
          className={activeItem === 'Link6' ? 'active' : ''}
        >
          Home
        </a>
        <a
          href="/tutorial/circle"
          onClick={() => handleSelect('Link7')}
          className={activeItem === 'Link7' ? 'active' : ''}
        >
          Circle
        </a>
        <a
          href="/tutorial/dot"
          onClick={() => handleSelect('Link8')}
          className={activeItem === 'Link8' ? 'active' : ''}
        >
          dot
        </a>
        <a
          href="/tutorial/stamp"
          onClick={() => handleSelect('Link9')}
          className={activeItem === 'Link9' ? 'active' : ''}
        >
          stamp & clearstamp
        </a>
        <a
          href="/tutorial/undospeed"
          onClick={() => handleSelect('Link10')}
          className={activeItem === 'Link10' ? 'active' : ''}
        >
          undo & speed
        </a>
      </div>

      {/* Second Dropdown */}
      <button
        className={`dropdown-btn ${activeDropdown === 2 ? 'active' : ''}`}
        onClick={() => toggleDropdown(2)}
      >
        Turtle Tell State <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-container" style={{ display: activeDropdown === 2 ? 'block' : 'none' }}>
        <a
          href="#link11"
          onClick={() => handleSelect('Link11')}
          className={activeItem === 'Link11' ? 'active' : ''}
        >
          Position
        </a>
        <a
          href="#link12"
          onClick={() => handleSelect('Link12')}
          className={activeItem === 'Link12' ? 'active' : ''}
        >
          xcor & ycor
        </a>
        <a
          href="#link13"
          onClick={() => handleSelect('Link13')}
          className={activeItem === 'Link13' ? 'active' : ''}
        >
          heading
        </a>
        <a
          href="#link14"
          onClick={() => handleSelect('Link14')}
          className={activeItem === 'Link14' ? 'active' : ''}
        >
          distance
        </a>
      </div>

      {/* Third Dropdown */}
      <button
        className={`dropdown-btn ${activeDropdown === 3 ? 'active' : ''}`}
        onClick={() => toggleDropdown(3)}
      >
        Pen control <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-container" style={{ display: activeDropdown === 3 ? 'block' : 'none' }}>
        <a
          href="#link15"
          onClick={() => handleSelect('Link15')}
          className={activeItem === 'Link15' ? 'active' : ''}
        >
          pendown & penup
        </a>
        <a
          href="#link16"
          onClick={() => handleSelect('Link16')}
          className={activeItem === 'Link16' ? 'active' : ''}
        >
          pensize
        </a>
        <a
          href="#link17"
          onClick={() => handleSelect('Link17')}
          className={activeItem === 'Link17' ? 'active' : ''}
        >
          pen
        </a>
        <a
          href="#link18"
          onClick={() => handleSelect('Link18')}
          className={activeItem === 'Link18' ? 'active' : ''}
        >
          isdown
        </a>
      </div>

      {/* Fourth Dropdown */}
      <button
        className={`dropdown-btn ${activeDropdown === 4 ? 'active' : ''}`}
        onClick={() => toggleDropdown(4)}
      >
        Color Control <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-container" style={{ display: activeDropdown === 4 ? 'block' : 'none' }}>
        <a
          href="#link19"
          onClick={() => handleSelect('Link19')}
          className={activeItem === 'Link19' ? 'active' : ''}
        >
          color
        </a>
        <a
          href="#link20"
          onClick={() => handleSelect('Link20')}
          className={activeItem === 'Link20' ? 'active' : ''}
        >
          pencolor
        </a>
        <a
          href="#link21"
          onClick={() => handleSelect('Link21')}
          className={activeItem === 'Link21' ? 'active' : ''}
        >
          fillcolor
        </a>
        <a
          href="#link22"
          onClick={() => handleSelect('Link22')}
          className={activeItem === 'Link22' ? 'active' : ''}
        >
          filling
        </a>
        <a
          href="#link23"
          onClick={() => handleSelect('Link23')}
          className={activeItem === 'Link23' ? 'active' : ''}
        >
          begin_fill & end_fill
        </a>
      </div>

      {/* Fifth Dropdown */}
      <button
        className={`dropdown-btn ${activeDropdown === 5 ? 'active' : ''}`}
        onClick={() => toggleDropdown(5)}
      >
        More drawing control <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-container" style={{ display: activeDropdown === 5 ? 'block' : 'none' }}>
        <a
          href="#link24"
          onClick={() => handleSelect('Link24')}
          className={activeItem === 'Link24' ? 'active' : ''}
        >
          reset
        </a>
        <a
          href="#link25"
          onClick={() => handleSelect('Link25')}
          className={activeItem === 'Link25' ? 'active' : ''}
        >
          clear
        </a>
        <a
          href="#link26"
          onClick={() => handleSelect('Link26')}
          className={activeItem === 'Link26' ? 'active' : ''}
        >
          write
        </a>
      </div>

      <a
        href="#search"
        onClick={() => handleSelect('Search')}
        className={activeItem === 'Search' ? 'active' : ''}
      >
        Search
      </a>
    </div>
  );
};

export default SidebarTutor;
