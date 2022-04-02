import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import classes from "./Footer.module.css";
import { ReduxState } from "../../types";

const Footer = () => {
  const isLogged = useSelector((state: ReduxState) => state.auth.isLogged);
  return (
    <footer>
      <div className={classes.container}>
        <div className={classes.row}>
          <Link to="/">
            <figure className={classes.logo}>
              <img
                src={logo}
                alt="Vinyl Fresh Footer Logo"
                className={classes.logoImg}
              />
            </figure>
          </Link>
          <div className={classes.footerList}>
            <Link to="/" className={classes.footerLink}>
              Home
            </Link>
            <span className={`${classes.footerLink} ${classes.noCursor}`}>
              About
            </span>
            <Link to="/vinyls" className={classes.footerLink}>
              Vinyls
            </Link>
            {isLogged && (
              <Link to="/orders" className={classes.footerLink}>
                My Orders
              </Link>
            )}
            <Link to="/cart" className={classes.footerLink}>
              Cart
            </Link>
          </div>
          <div className={classes.copyright}>
            Copyright &copy; 2022 Vinyl Fresh
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
