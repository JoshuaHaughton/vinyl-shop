import { Link } from "react-router-dom";
import HeroImage from "../../../assets/Hero2.svg";
import classes from "./Landing.module.css";

const Landing = () => {
  return (
    <section id="landing">
      <header>
        <div className={classes.container}>
          <div className={classes.description}>
            <h1>Canada's top rated online vinyl exchange!</h1>
            <h2>
              Find your dream vinyl with{" "}
              <span className={classes.span}>Vinyl Fresh</span>
            </h2>
            <Link to="/vinyls">
              <button className={classes.button}>Browse Vinyls</button>
            </Link>
            <figure className={classes.imgWrapper}>
              <img src={HeroImage} alt="Landing" />
            </figure>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Landing;
