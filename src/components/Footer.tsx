import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from "../assets/Logo.svg"

type AuthState = {
  auth: {
    isLogged: boolean
    full_name: string | null
    uid: string | null
  }
}

const Footer = () => {
  const isLogged = useSelector((state: AuthState) => state.auth.isLogged)
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <Link to="/">
            <figure className="footer__logo">
              <img src={logo} alt="" className="footer__logo--img" />
            </figure>
          </Link>
          <div className="footer__list">
            <Link to="/" className="footer__link">Home</Link>
            <span className="footer__link no-cursor">About</span>
            <Link to="/vinyls" className="footer__link">Vinyls</Link>
           {isLogged && <Link to="/orders" className="footer__link">My Orders</Link>}
            <Link to="/cart" className="footer__link">Cart</Link>
          </div>
          <div className="footer__copyright">
            Copyright &copy; 2022 Vinyl Fresh
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
