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
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { vinylActions } from "./store/vinyls";

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

function App() {
  // const [vinyls, setVinyls] = useState<Vinyls[] | []>([]);
  // const vinyls = useSelector((state: State) => state.vinyls.vinyls);

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("vinyls")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) =>
        {
          dispatch(vinylActions.setVinyls(
          snapshot.docs.map((doc) => {
            console.log(doc.data(), "data");
            return doc.data() as Vinyls;
          }),
        ))
      }
      );
  }, []);
  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/vinyls"
              element={<Vinyls />}
            />
            <Route
              path="/vinyls/:id"
              element={<VinylInfo />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
