import { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./firebase";
import { vinylActions } from "./store/vinyls";
import { reduxLogin, reduxLogout } from "./store/auth";
import { cartActions } from "./store/cart";
import { ReduxState, VinylType } from "./types";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Vinyls from "./pages/AllVinyls/AllVinyls";
import VinylInfo from "./pages/VinylInfo/VinylInfo";
import Cart from "./pages/Cart/Cart";
import ScrollToTop from "./components/ui/ScrollToTop/ScrollToTop";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
  const dispatch = useDispatch();
  const uid = useSelector((state: ReduxState) => state.auth.uid);
  const cart = useSelector((state: ReduxState) => state.cart.cart);
  const isLogged = useSelector((state: ReduxState) => state.auth.isLogged);
  const numberOfItems = useSelector((state: ReduxState) => state.cart.quantity);

  useEffect(() => {
    //Check if user is logged via firebase, if so, login locally using redux. Logout locally otherwise.
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //User is logged in
        if (!isLogged) {
          dispatch(
            reduxLogin({
              uid: userAuth.uid,
              full_name: userAuth.displayName,
            }),
          );
        }
      } else {
        //User isn't logged in through firebase anymore, logout
        dispatch(reduxLogout());
      }
    });
  }, [auth, cart, dispatch, isLogged]);

  useEffect(() => {
    //Grab vinyls from firebase on first load and set to state using redux
    db.collection("vinyls")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          vinylActions.setVinyls(
            snapshot.docs.map((doc) => {
              console.log(doc.data(), "data");
              return doc.data() as VinylType;
            }),
          ),
        );
      });
  }, [dispatch]);

  useEffect(() => {
    //Whenever UserId changes (Log ins or log outs) if it is truthy, then retrieve the cart data under that UID (If there is one)
    if (uid) {
      const userCart = db.collection("cart").doc(uid!);

      const fetchCartData = async () => {
        userCart.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            userCart.onSnapshot(async (doc) => {
              dispatch(cartActions.setCart(doc.data()));
            });
          } else {
            userCart.set({ cart: cart, quantity: numberOfItems, uid }); // create the document
            return;
          }
        });
      };
      fetchCartData();
    }

    //Auto Logout after 60 minutes
    auth.onAuthStateChanged((user) => {
      let userSessionTimeout = null;

      if (user === null && userSessionTimeout) {
        clearTimeout(userSessionTimeout);
        userSessionTimeout = null;
        reduxLogout();
      } else {
        user!.getIdTokenResult().then((idTokenResult) => {
          const authTime = idTokenResult.claims.auth_time * 1000;
          const sessionDurationInMilliseconds = 60 * 60 * 1000; // 60 min
          const expirationInMilliseconds =
            sessionDurationInMilliseconds - (Date.now() - authTime);
          userSessionTimeout = setTimeout(() => {
            auth.signOut();
            reduxLogout();
          }, expirationInMilliseconds);
        });
      }
    });
  }, [uid, dispatch]);

  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <nav>
            <Nav />
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vinyls" element={<Vinyls />} />
            <Route path="/vinyls/:id" element={<VinylInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<MyOrders />} />
          </Routes>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
