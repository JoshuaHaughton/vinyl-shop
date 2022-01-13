import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Vinyls from "./pages/Vinyls";
import { vinyls } from "./data";
import VinylInfo from "./pages/VinylInfo";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ui/ScrollToTop";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(vinyl) {
    setCart([...cart, { ...vinyl, quantity: 1 }]);
  }

  const changeQuantity = (vinyl, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === vinyl.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item,
      ),
    );
  };

  const removeVinyl = (vinyl) => {
    setCart(cart.filter((item) => item.id !== vinyl.id));
  };

  const numberOfItems = () => {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <Nav numberOfItems={numberOfItems()} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vinyls" element={<Vinyls vinyls={vinyls} />} />
            <Route
              path="/vinyls/:id"
              element={
                <VinylInfo vinyls={vinyls} addToCart={addToCart} cart={cart} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  vinyls={vinyls}
                  cart={cart}
                  changeQuantity={changeQuantity}
                  removeVinyl={removeVinyl}
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
