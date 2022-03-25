import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "./ui/Modals/AuthModal/AuthModal";
import SuccessModal from "./ui/Modals/SuccessModal/SuccessModal";

type State = {
  cart: {
    cart: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
    quantity: number;
  };
};

const Nav = () => {

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [navLoggedIn, setNavLoggedIn] = useState(false)
  // const { isLoggedIn, setIsLoggedIn, logout, checkServerIfLogged } = useAuth();

  // const location = useLocation();


  let numberOfItems = useSelector((state: State) => state.cart.quantity);

  const openMenu = () => {
    document.body.classList.value += " menu--open";
  };

  const closeMenu = () => {
    document.body.classList.remove("menu--open");
  };

  const openSuccessModalHandler = () => {
    setOpenSuccessModal(true)
  }

  const closeSuccessModalHandler = () => {
    setOpenSuccessModal(false)
  }

  const closeAuthModalHandler = () => {
    setOpenAuthModal(false)
  }

  const openAuthModalHandler = () => {
    setOpenAuthModal(true)
  }

  const navLoginHandler = () => {
    setNavLoggedIn(true)
  }


  return (
    <>
    {openSuccessModal && (
      <SuccessModal
        title={isSignUp ? "Sign Up Successful!" : "Log In Successful!"}
        message={
          isSignUp
            ? "Thank you for signing up!"
            : "Welcome Back! Login Successful."
        }
        closeModal={closeSuccessModalHandler}
      />
    )}
    {openAuthModal && (
      <AuthModal
        title={"test title"}
        message={"test message"}
        closeModal={closeAuthModalHandler}
        openSuccessModal={openSuccessModalHandler}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        navLogin={navLoginHandler}
      />
    )}
    <nav>
      <div className="nav__container">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
        <ul className="nav__links">
          <li className="nav__list">
            <Link
              to="/"
              className="nav__link link__hover-effect
              link__hover-effect--black"
            >
              Home
            </Link>
          </li>
          <li className="nav__list">
            <Link
              to="/vinyls"
              className="nav__link link__hover-effect
              link__hover-effect--black"
            >
              Vinyls
            </Link>
          </li>
          <li className="nav__list">
            <button
              className="nav__link link__hover-effect
              link__hover-effect--black"
              onClick={openAuthModalHandler}
            >
              Log in/Sign up
            </button>
          </li>
          <button className="btn__menu" onClick={openMenu}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <li className="nav__icon">
            <Link to="/cart" className="nav__link nav__icon--link">
              <FontAwesomeIcon icon="shopping-cart" className="shopping-cart" />
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
              <button className="menu__link" onClick={openAuthModalHandler}>
                Login/Signup
              </button>
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
    </>
  );
};

export default Nav;
