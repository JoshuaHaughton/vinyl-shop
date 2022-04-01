import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AuthModal from "../ui/Modals/AuthModal/AuthModal";
import SuccessModal from "../ui/Modals/SuccessModal/SuccessModal";
import { reduxLogout } from "../../store/auth";
import { auth, db } from "../../firebase"
import { cartActions } from "../../store/cart";
import classes from './Nav.module.css'

type CartState = {
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

type AuthState = {
    auth: {
      isLogged: boolean
      full_name: string | null
      uid: string | null
    }
}



const Nav = () => {

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [navLoggedIn, setNavLoggedIn] = useState(false)
  const [authDataFetched, setAuthDataFetched] = useState(false);
  const dispatch = useDispatch();
  // const { isLoggedIn, setIsLoggedIn, logout, checkServerIfLogged } = useAuth();

  // const location = useLocation();


  const numberOfItems = useSelector((state: CartState) => state.cart.quantity);
  const cart = useSelector((state: CartState) => state.cart.cart);
  const isLogged = useSelector((state: AuthState) => state.auth.isLogged)
  const uid = useSelector((state: AuthState) => state.auth.uid)
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

  const logoutHandler = () => {
    dispatch(reduxLogout())
    auth.signOut()
    .then(() => {
      console.log('signed out');
      dispatch(cartActions.setCart({cart: [], quantity: 0}))
    })
    .catch(error => {
      console.log(error);
    });
  }

  const firstRender = useRef(true)

  useEffect(() => {

    
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

  if (uid) {
    const userCart = db.collection('cart').doc(uid!);
    const changeBackendCart = async () => {
      //check if cart with their id already exists before this vvvv
      
      
    
    
      // const userCart = db.collection('cart').doc(uid!);
    
      userCart.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            db.collection("cart").doc(uid!).set({
              cart: cart,
              quantity: numberOfItems,
              uid,
            },
            {merge: true});
            console.log('merged');
            
            // userCart.onSnapshot((doc) => {
            //   // do stuff with the data
            // });
          } else {
            userCart.set({cart: cart,
              quantity: numberOfItems,
              uid,}) // create the document
              console.log('created');
          }
      });
  
 
  }
  changeBackendCart()

}
  }, [cart])


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
      <div className={classes.container}>
        <Link to="/">
          <img src={logo} alt="Vinyl Fresh Logo" className={classes.logo} />
        </Link>
        <ul >
          <li className={classes.navList}>
            <Link
              to="/"
              className={classes.navLink}
            >
              Home
            </Link>
          </li>
          <li className={classes.navList}>
            <Link
              to="/vinyls"
              className={classes.navLink}
            >
              Vinyls
            </Link>
          </li>


          {isLogged && <li className={classes.navList}>
            <Link
              to="/orders"
              className={classes.navLink}
            >
              My Orders
            </Link>
          </li>}


         {!isLogged &&  <li className={classes.navList}>
            <button
              className={`${classes.navLink} ${classes.navButton}`}
              onClick={openAuthModalHandler}
            >
              Log in/Sign up
            </button>
          </li>}

          {isLogged &&  <li className={classes.navList}>
            <button
              className={`${classes.navLink} ${classes.navButton}`}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>}
          <button className={classes.menuButton} onClick={openMenu}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <li className={classes.navIcon}>
            <Link to="/cart" className={` ${classes.navIconLink}`}>
              <FontAwesomeIcon icon="shopping-cart" className={classes.shoppingCart} />
            </Link>
            {numberOfItems > 0 && (
              <span className={classes.cartQuantity}>{numberOfItems}</span>
            )}
          </li>
        </ul>
        <div className="menu__backdrop">
          <button className={`${classes.menuButton} ${classes.menuButtonClose}`} onClick={closeMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          <ul className={classes.menuLinks}>
            <li className={classes.menuList} onClick={closeMenu}>
              <Link to="/" className={classes.menuLink}>
                Home
              </Link>
            </li>
            <li className={classes.menuList} onClick={closeMenu}>
              <Link to="/vinyls" className={classes.menuLink}>
                Vinyls
              </Link>
            </li>
            {!isLogged && <li className={classes.menuList} onClick={closeMenu}>
              <button className={`${classes.menuLink} ${classes.menuLinkButton}`} onClick={openAuthModalHandler}>
                Login/Signup
              </button>
            </li>}
            {isLogged && <li className={classes.menuList} onClick={closeMenu}>
              <button className={`${classes.menuLink} ${classes.menuLinkButton}`} onClick={logoutHandler}>
                Logout
              </button>
            </li>}
            {isLogged && <li className={classes.menuList} onClick={closeMenu}>
              <Link to="/orders" className={classes.menuLink}>
                My Orders
              </Link>
            </li>}
            <li className={classes.menuList} onClick={closeMenu}>
              <Link to="/cart" className={classes.menuLink}>
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
