import { Link } from "react-router-dom";
import classes from './Explore.module.css'

const Explore = () => {
  return (
    <section id="explore">
      <div className={classes.container}>
        <div className={classes.row}>
          <h2>
            Explore more <span className={classes.blue}>Vinyls</span>
          </h2>
          <Link to="/vinyls">
            <button className={classes.button}>Explore vinyls</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Explore;
