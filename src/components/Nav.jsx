import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/Logo.svg";
import { Link, Navigate } from "react-router-dom";

const Nav = ({ numberOfItems }) => {
  const openMenu = () => {
    document.body.classList += " menu--open";
  };

  const closeMenu = () => {
    document.body.classList.remove("menu--open");
  };

  const turnOff = (place) => {
    <Navigate to={place} />;
    closeMenu();
  };

  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
        <ul className="nav__links">
          <li className="nav__list">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/vinyls" className="nav__link">
              Vinyls
            </Link>
          </li>
          <button className="btn__menu" onClick={openMenu}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <li className="nav__icon">
            <Link to="/cart" className="nav__link">
              <FontAwesomeIcon icon="shopping-cart" />
            </Link>
            {numberOfItems > 0 && (
              <span className="cart__length">{numberOfItems}</span>
            )}
          </li>
        </ul>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          <ul className="menu__links">
            <li className="menu__list" onClick={closeMenu}>
              <Link to="/" className="menu__link">
                Home
              </Link>
            </li>
            <li className="menu__list" onClick={closeMenu}>
              <Link to="/vinyls" className="menu__link">
                Vinyls
              </Link>
            </li>
            <li className="menu__list" onClick={closeMenu}>
              <Link to="/cart" className="menu__link">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
