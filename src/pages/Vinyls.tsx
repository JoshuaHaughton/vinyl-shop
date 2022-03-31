import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Vinyl from "../components/ui/Vinyl";
import { skeletonVinyls } from "../skeletonData";

interface VinylInterface {
    id: number;
    title: string;
    artist: string;
    url: string;
    originalPrice: number;
    salePrice: number | null;
    rating: number;
    genres: string[]
  }

interface State {
  vinyls: {
    vinyls: {
        id: number;
        title: string;
        artist: string;
        url: string;
        originalPrice: number;
        salePrice: number | null;
        rating: number;
        genres: string[]
      }[];
  }
}



const Vinyls = (): JSX.Element => {
  const initialVinyls: VinylInterface[] = useSelector((state: State) => state.vinyls.vinyls);
  const [vinyls, setVinyls] = useState<VinylInterface[]>(initialVinyls || []);
  const [displayedVinyls, setDisplayedVinyls] = useState<VinylInterface[]>(initialVinyls || []);
  const [filterState, setFilterState] = useState<string>("DEFAULT");
  console.log('init', initialVinyls);
  console.log(vinyls.length >= 1);
  console.log(vinyls);


  useEffect(() => {
    setVinyls(initialVinyls);
    setDisplayedVinyls(initialVinyls);
    
  }, [initialVinyls])

  
  
  const filterVinyls = (filter: string) => {
    console.log(filter);
    setFilterState(filter)
    if (filter === "LOW_TO_HIGH") {
      setDisplayedVinyls(
        displayedVinyls
          .slice()
          .sort(
            (a: any, b: any) =>
              (a.salePrice || a.originalPrice) -
              (b.salePrice || b.originalPrice),
          ),
      );
    }

    if (filter === "HIGH_TO_LOW") {
      setFilterState(filter)
      setDisplayedVinyls(
        displayedVinyls
          .slice()
          .sort(
            (a, b) =>
              (b.salePrice || b.originalPrice) -
              (a.salePrice || a.originalPrice),
          ),
      );
    }

    if (filter === "RATING") {
      setFilterState(filter)
      setDisplayedVinyls(displayedVinyls.slice().sort((a, b) => b.rating - a.rating));
    }
  };


  const filterVinylGenres = (filter: string) => {
    setFilterState("DEFAULT")
    if (filter === "POP") {
      setDisplayedVinyls(
        vinyls
          .slice()
          .filter(
            (a) =>
              (a.genres.includes('Pop')),
          ),
      );
      
    }

    if (filter === "INDIE") {

      setDisplayedVinyls(
        vinyls
          .slice()
          .filter(
            (a) =>
              (a.genres.includes('Alternative/Indie')),
          ),
      );
    }

    if (filter === "RAP") {

      setDisplayedVinyls(
        vinyls
          .slice()
          .filter(
            (a) =>
              (a.genres.includes('Hiphop/Rap')),
          ),
      );
    }

    if (filter === "R&B") {

      setDisplayedVinyls(
        vinyls
          .slice()
          .filter(
            (a) =>
              (a.genres.includes('R&B/Soul')),
          ),
      );
    }

    if (filter === "AFROBEATS") {

      setDisplayedVinyls(
        vinyls
          .slice()
          .filter(
            (a) =>
              (a.genres.includes('Afrobeats')),
          ),
      );
    }

    if (filter === "ALL") {

      setDisplayedVinyls(
        vinyls
          .slice()
      );
    }

  };


  return (
    <div id="vinyls__body">
      <main id="vinyls__main">
        <section>
          <div className="vinyls__container">
            <div className="row">
              <div className="vinyls__header">
                <h2 className="section__title vinyls__header--title">All Vinyls</h2>
                <div className="select__wrapper">
                  <select
                    id="genre-filter"
                    defaultValue="DEFAULT"
                    // value={filterState}
                    onChange={(e) => filterVinylGenres(e.target.value)}
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
                    // defaultValue="DEFAULT"
                    value={filterState}
                    onChange={(e) => filterVinyls(e.target.value)}
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
              <div className="vinyls">
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
