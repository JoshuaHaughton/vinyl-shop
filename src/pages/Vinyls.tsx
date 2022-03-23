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
  console.log('init', initialVinyls);
  console.log(vinyls.length >= 1);
  console.log(vinyls);


  useEffect(() => {
    setVinyls(initialVinyls);
    
  }, [initialVinyls])

  
  
  const filterVinyls = (filter: string) => {
    console.log(filter);
    if (filter === "LOW_TO_HIGH") {
      setVinyls(
        vinyls
          .slice()
          .sort(
            (a: any, b: any) =>
              (a.salePrice || a.originalPrice) -
              (b.salePrice || b.originalPrice),
          ),
      );
    }

    if (filter === "HIGH_TO_LOW") {
      setVinyls(
        vinyls
          .slice()
          .sort(
            (a, b) =>
              (b.salePrice || b.originalPrice) -
              (a.salePrice || a.originalPrice),
          ),
      );
    }

    if (filter === "RATING") {
      setVinyls(vinyls.slice().sort((a, b) => b.rating - a.rating));
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
                <select
                  id="filter"
                  defaultValue="DEFAULT"
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
              <div className="vinyls">
                {vinyls.length >= 1 
                ? 
                vinyls.map((vinyl) => (
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
