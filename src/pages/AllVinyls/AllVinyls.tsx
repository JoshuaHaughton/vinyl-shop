import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Vinyl from "../../components/ui/Vinyl/Vinyl";
import { skeletonVinyls } from "../../skeletonData";
import classes from './AllVinyls.module.css'
import { filterVinylGenres, filterVinyls } from "./AllVinylsHelpers";
import { VinylType, ReduxState } from '../../types'

const Vinyls = (): JSX.Element => {
  const initialVinyls: VinylType[] = useSelector((state: ReduxState) => state.vinyls.vinyls);
  //vinyls state will always contain all vinyls
  const [vinyls, setVinyls] = useState<VinylType[]>(initialVinyls || []);
  //displayedVinyls state renders vinyls to users after filtering
  const [displayedVinyls, setDisplayedVinyls] = useState<VinylType[]>(initialVinyls || []);
  const [filterState, setFilterState] = useState<string>("DEFAULT");


  //Whenever new vinyls are etched by Redux, set Vinyls to all retrieved Vinyls
  useEffect(() => {
    setVinyls(initialVinyls);
    setDisplayedVinyls(initialVinyls);
    
  }, [initialVinyls])



  return (
    <div id="vinyls__body">
      <main id="vinyls__main">
        <section>
          <div className={classes.container}>
            <div className={classes.row}>
              <div className={classes.header}>
                <h2 className={classes.headerTitle}>All Vinyls</h2>
                <div className={classes.selectWrapper}>
                  <select
                    id="genre-filter"
                    defaultValue="DEFAULT"
                    onChange={(e) => filterVinylGenres(e.target.value, setFilterState, setDisplayedVinyls, vinyls)}
                  >
                    <option value="DEFAULT" disabled>
                      Genre
                    </option>
                    <option value="ALL">All Genres</option>
                    <option value="POP">Pop</option>
                    <option value="R&B">R&B/Soul</option>
                    <option value="AFROBEATS">Afrobeats</option>
                    <option value="RAP">HipHop/Rap</option>
                    <option value="INDIE">Alternative/Indie</option>
                  </select>

                  <select
                    id="filter"
                    value={filterState}
                    onChange={(e) => filterVinyls(e.target.value, setFilterState, setDisplayedVinyls, displayedVinyls)}
                  >
                    <option value="DEFAULT" disabled>
                      Sort
                    </option>
                    <option value="LOW_TO_HIGH">Price, Low to High</option>
                    <option value="HIGH_TO_LOW">Price, High to Low</option>
                    <option value="RATING">Rating</option>
                  </select>
                </div>
              </div>
              <div className={classes.vinyls}>
                {displayedVinyls.length >= 1 
                ? 
                displayedVinyls.map((vinyl) => (
                  <Vinyl vinylInfo={vinyl} key={vinyl.id} />
                )):
                skeletonVinyls.map((vinyl) => (
                  <Vinyl vinylInfo={vinyl} key={vinyl.id} />
                ))
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Vinyls;
