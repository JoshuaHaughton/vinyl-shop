import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Vinyls from "./pages/Vinyls";
import { vinyls } from "./data";
import VinylInfo from "./pages/VinylInfo";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {

  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vinyls" element={<Vinyls vinyls={vinyls} />} />
            <Route
              path="/vinyls/:id"
              element={
                <VinylInfo vinyls={vinyls} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  vinyls={vinyls}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
