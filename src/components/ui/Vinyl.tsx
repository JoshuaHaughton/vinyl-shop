import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Price";

interface Props {
  vinylInfo: {
    id: number;
    title: string;
    artist: string;
    url: string;
    originalPrice: number;
    salePrice: number | null;
    rating: number;
  };
}

const Vinyl = ({ vinylInfo }: Props): JSX.Element => {
  const [img, setImg] = useState<HTMLImageElement>();

  //whole component doesn't re-render with useRef unlike useState
  const mountedRef = useRef(true);

  //loads skeleton image in place of vinyls until they load
  useEffect(() => {
    let image = new Image()!;
    image.src = vinylInfo.url;
    image.onload = () => {
      if (mountedRef.current) {
        setImg(image);
      }
    };
    return () => {
      //when the component unmounts
      mountedRef.current = false;
    };
  });

  return (
    <div className="vinyl">
      {img ? (
        <>
          <Link to={`/vinyls/${vinylInfo.id}`}>
            <figure className="vinyl__img--wrapper">
              <img src={img.src} alt="" className="vinyl__image" />
            </figure>
          </Link>
          <div className="vinyl__title">
            <Link to={`/vinyls/${vinylInfo.id}`} className="vinyl__title--link">
              {vinylInfo.title}
            </Link>
          </div>
          <Rating rating={vinylInfo.rating} />
          <Price
            salePrice={vinylInfo.salePrice && vinylInfo.salePrice}
            originalPrice={vinylInfo.originalPrice}
          />
        </>
      ) : (
        <>
          <div className="vinyl__img--skeleton"></div>
          <div className="skeleton vinyl__title--skeleton"></div>
          <div className="skeleton vinyl__rating--skeleton"></div>
          <div className="skeleton vinyl__price--skeleton"></div>
        </>
      )}
    </div>
  );
};

export default Vinyl;