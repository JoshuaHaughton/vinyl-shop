import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";

function App() {
  return (
    <Router >
    <div className="App">
      <Nav />
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
