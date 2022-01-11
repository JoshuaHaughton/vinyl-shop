import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Vinyls from "./pages/Vinyls";
import { vinyls } from "./data"
import VinylInfo from "./pages/VinylInfo";

function App() {
  return (
    <Router >
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vinyls" element={<Vinyls vinyls={vinyls}/>} />
        <Route path="/vinyls/:id" element={<VinylInfo vinyls={vinyls}/>} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
