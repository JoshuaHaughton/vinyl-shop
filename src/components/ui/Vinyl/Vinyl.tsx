import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import Price from "../Price/Price";
import skeleton from "../../../assets/skeleton.png";
import classes from "./Vinyl.module.css";

interface Props {
  vinylInfo: {
    id: number;
    title: string;
    artist: string;
    url?: string;
    originalPrice: number;
    salePrice: number | null;
    rating: number;
    genres: string[];
  };
}

const Vinyl = ({ vinylInfo }: Props): JSX.Element => {
  const [img, setImg] = useState<HTMLImageElement>();


  //Loads skeleton image in place of vinyls until they load
  useEffect(() => {
    let image = new Image()!;
    if (vinylInfo.url) {
      image.src = vinylInfo.url || "null";

      image.onload = () => {
        if (vinylInfo.url) {
          setImg(image);
        }
      };
    }
  }, [vinylInfo]);

  return (
    <div className={classes.vinyl}>
      {img ? (
        <>
          <Link to={`/vinyls/${vinylInfo.id}`}>
            <figure className={classes.vinylImageWrapper}>
              <img src={img.src} alt={`${vinylInfo.title} Album Cover`} />
            </figure>
          </Link>
          <div className={classes.vinylTitle}>
            <Link to={`/vinyls/${vinylInfo.id}`} className={classes.titleLink}>
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
          <div>
            <Link to={`#`}>
              <figure className={classes.skeletonImgWrapper}>
                <img
                  src={skeleton}
                  alt="Loading Skeleton"
                  className={classes.skeletonImg}
                />
              </figure>
            </Link>
          </div>
          <div className={classes.skeletonTitle}></div>
          <div className={classes.skeletonRating}></div>
          <div className={classes.skeletonPrice}></div>
        </>
      )}
    </div>
  );
};

export default Vinyl;
