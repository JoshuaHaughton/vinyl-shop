import { useSelector } from "react-redux";
import Vinyl from "../../ui/Vinyl/Vinyl";
import classes from "./Featured.module.css";
import { VinylType, ReduxState } from "../../../types";
const Featured = () => {
  
  const vinyls: VinylType[] = useSelector(
    (state: ReduxState) => state.vinyls.vinyls,
  );

  return (
    <section id="features">
      <div className={classes.container}>
        <div className={classes.row}>
          <h2>
            Featured <span className={classes.blue}>Vinyls</span>
          </h2>
          <div className={classes.vinyls}>
            {vinyls
              .filter((vinyl) => vinyl.rating >= 5)
              .slice(0, 4)
              .map((vinyl) => {
                return <Vinyl key={vinyl.id} vinylInfo={vinyl} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
