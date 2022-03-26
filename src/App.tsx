import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Vinyls from "./pages/Vinyls";
// import { vinyls as vinylss } from "./data";
import VinylInfo from "./pages/VinylInfo";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ui/ScrollToTop";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { vinylActions } from "./store/vinyls";
import { login } from "./components/ui/Modals/AuthModal/authHelpers";
import { reduxLogin, reduxLogout } from "./store/auth";
import { cartActions } from "./store/cart";

interface Vinyls {
  id: number;
  title: string;
  artist: string;
  url: string;
  originalPrice: number;
  salePrice: number | null;
  rating: number;
  genres: string[];
}

interface State {
  vinyls: {
    vinyls: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number | null;
      rating: number;
      genres: string[];
    }[];
  };
}

type AuthState = {
  auth: {
    isLogged: boolean;
    full_name: string | null;
    uid: string | null;
  };
};

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

function App() {
  // const [vinyls, setVinyls] = useState<Vinyls[] | []>([]);
  // const vinyls = useSelector((state: State) => state.vinyls.vinyls);

  const dispatch = useDispatch();
  const uid = useSelector((state: AuthState) => state.auth.uid);
  const cart = useSelector((state: CartState) => state.cart.cart);
  const isLogged = useSelector((state: AuthState) => state.auth.isLogged);

  useEffect(() => {
    //On first render, check if Auth
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //User is logged in
        console.log("user auth", userAuth);
        if(!isLogged) {
          dispatch(
            reduxLogin({
              uid: userAuth.uid,
              full_name: userAuth.displayName,
            }),
            );
        }
      } else {
        //User isn't logged in
        dispatch(reduxLogout());
      }
    });

  
  }, [auth, cart]);

  useEffect(() => {
    db.collection("vinyls")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          vinylActions.setVinyls(
            snapshot.docs.map((doc) => {
              console.log(doc.data(), "data");
              return doc.data() as Vinyls;
            }),
          ),
        );
      });
  }, [])

  useEffect(() => {
    //Whenever UserId changes (Log ins or log outs) if it exists, then retrieve cart data if it exists under that UID
    if (uid) {
      const userCart = db.collection("cart").doc(uid!);

      const fetchCartData = async () => {
        userCart.get().then((docSnapshot) => {
          console.log("test", docSnapshot);
          if (docSnapshot.exists) {
            userCart.onSnapshot(async (doc) => {
              console.log("Firestore Cart via Login", doc.data());
              dispatch(cartActions.setCart(doc.data()));
            });
          } else {
            console.log("no stored cart");
            return;
          }
        });
      };
      fetchCartData();
    }
  }, [uid]);
  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vinyls" element={<Vinyls />} />
            <Route path="/vinyls/:id" element={<VinylInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
