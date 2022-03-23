import { useSelector } from 'react-redux';
import Vinyl from './ui/Vinyl'
// import { vinyls } from '../data'

const Featured = () => {

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

  const vinyls: VinylInterface[] = useSelector((state: State) => state.vinyls.vinyls);



  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Featured <span className="blue">Vinyls</span>
          </h2>
          <div className="vinyls">
            {vinyls
            .filter(vinyl => vinyl.rating >= 5)
            .slice(0, 4)
            .map((vinyl) => {
            return <Vinyl key={vinyl.id} vinylInfo={vinyl}/>
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Featured
