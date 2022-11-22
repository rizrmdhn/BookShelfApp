import React, { useState } from "react";
import {
  Button,
  Nav,
  NavItem,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { Link } from "react-router-dom";

function ResponsiveMenu() {
  return (
    <div className="responsive-menu">
      <button
        className="btn d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasResponsive"
        aria-controls="offcanvasResponsive"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      <div
        className="offcanvas-lg offcanvas-start w-50"
        tabIndex="-1"
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Nav vertical>
            <NavItem className="mt-2">
              <Link to="/">Bookshelf</Link>
            </NavItem>
            <NavItem className="mt-2">
              <Link to="/Reading">Reading</Link>
            </NavItem>
            <NavItem className="mt-2">
              <Link to="/Finished">Finished</Link>
            </NavItem>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveMenu;
