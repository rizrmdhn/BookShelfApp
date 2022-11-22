import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderMenu(props) {
  return (
    <div className="top-menu">
      <Nav>
        <Nav.Item>
          <Link to="/Reading">Reading</Link>
        </Nav.Item>
        <Nav.Item>
         <Link to="/Finished">Finished</Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default HeaderMenu;
