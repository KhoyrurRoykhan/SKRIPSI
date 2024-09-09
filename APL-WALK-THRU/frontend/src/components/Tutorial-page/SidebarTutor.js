import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import './assets/tutor.css';

const SidebarTutor = () => {

  const [activeItem, setActiveItem] = useState('Python Intro');

  const handleSelect = (eventKey) => {
    setActiveItem(eventKey);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light p-3" style={{ width: '250px' }}>
      <h4 className="mb-4">Turtle Tutorial</h4>
      <Nav
        defaultActiveKey="Turtle Intro"
        className="flex-column"
        onSelect={handleSelect}
      >
        <Nav.Link
          eventKey="Turtle Intro"
          href="#turtle-intro"
          className={activeItem === 'Turtle Intro' ? 'active' : ''}
        >
          Turtle Intro
        </Nav.Link>

        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="Turtle motion"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Turtle motion') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="Forward()"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            Forward( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Backward()"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            Backward( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Right()"
            href="#output-variables"
            className={activeItem === 'Output Variables' ? 'active' : ''}
          >
            Right( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Left()"
            href="#global-variables"
            className={activeItem === 'Global Variables' ? 'active' : ''}
          >
            Left( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Set Position"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            Setposition( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Teleport"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            Teleport( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Set x"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            setx( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Set y"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            sety( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Set Heading"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            setheading( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Home"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            Home( )
          </NavDropdown.Item>

          <NavDropdown.Item
            eventKey="circle"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            circle( )
          </NavDropdown.Item>

          <NavDropdown.Item
            eventKey="dot"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            dot( )
          </NavDropdown.Item>

          <NavDropdown.Item
            eventKey="stamp"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            stamp( )
          </NavDropdown.Item>

          <NavDropdown.Item
            eventKey="Clearstamp"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            clearstamp( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Undo"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            undo( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Speed"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            Speed( )
          </NavDropdown.Item>
        </NavDropdown>
        
        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="Tell Turtle’s state"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Tell Turtle’s state') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="Position"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            Position( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Backward()"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            towards( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Right()"
            href="#output-variables"
            className={activeItem === 'Output Variables' ? 'active' : ''}
          >
            xcor( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Left()"
            href="#global-variables"
            className={activeItem === 'Global Variables' ? 'active' : ''}
          >
            ycor( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Set Position"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            heading( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Teleport"
            href="#variable-exercises"
            className={activeItem === 'Variable Exercises' ? 'active' : ''}
          >
            distance( )
          </NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="Settings for measurement"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Tell Turtle’s state') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="degrees"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            degrees( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="Backward()"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            radians( )
          </NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="Drawing state"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Tell Turtle’s state') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="pendown"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            pendown( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="penup"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            penup( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="pensize"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            pensize( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="width"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            width( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="pen"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            pen( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="isdown"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            isdown( )
          </NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="Color control"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Tell Turtle’s state') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="pencolor"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            pencolor( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="fillcolor"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            fillcolor( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="color"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            color( )
          </NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="Filling"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Tell Turtle’s state') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="filling"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            filling( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="begin_fill"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            begin_fill( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="end_fill"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            end_fill( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="end_fill"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            end_fill( )
          </NavDropdown.Item>
        </NavDropdown>

        {/* Dropdown for Python Variables */}
        <NavDropdown
          title="More drawing control"
          id="nav-dropdown-turtle-motion"
          className={activeItem.startsWith('Tell Turtle’s state') ? 'active' : ''}
          onSelect={handleSelect}
        >
          <NavDropdown.Item
            eventKey="reset"
            href="#variable-names"
            className={activeItem === 'Variable Names' ? 'active' : ''}
          >
            reset( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="begin_fill"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            clear( )
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="end_fill"
            href="#assign-multiple-values"
            className={activeItem === 'Assign Multiple Values' ? 'active' : ''}
          >
            write( )
          </NavDropdown.Item>
        </NavDropdown>

        {/* Other non-dropdown items */}
        <Nav.Link
          eventKey="Python Data Types"
          href="#python-data-types"
          className={activeItem === 'Python Data Types' ? 'active' : ''}
        >
          Python Data Types
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarTutor;
