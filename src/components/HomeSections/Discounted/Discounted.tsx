import Vinyl from "../../ui/Vinyl/Vinyl";
import { useSelector } from "react-redux";
import classes from "./Discounted.module.css";
import { VinylType, ReduxState } from '../../../types'

const Discounted = () => {
  const vinyls: VinylType[] = useSelector(
    (state: ReduxState) => state.vinyls.vinyls,
  );

  return (
    <section id="recent">
      <div className={classes.row}>
        <h2 className={classes.title}>
          Discounted <span className={classes.blue}>Vinyls</span>
        </h2>
        <div className={classes.vinyls}>
          {vinyls
            .filter((vinyl) => vinyl.salePrice && vinyl.salePrice > 0)
            .slice(0, 8)
            .map((vinyl) => {
              return <Vinyl vinylInfo={vinyl} key={vinyl.id} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Discounted;
