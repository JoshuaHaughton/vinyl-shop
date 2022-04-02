import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { skeletonVinyls } from "../../skeletonData";
import { VinylType, ReduxState } from "../../types";
import Price from "../../components/ui/Price/Price";
import Rating from "../../components/ui/Rating/Rating";
import Vinyl from "../../components/ui/Vinyl/Vinyl";
import classes from "./VinylInfo.module.css";

const VinylInfo = (): JSX.Element => {
  const { id } = useParams<string>();
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement>();
  const vinyls: VinylType[] = useSelector(
    (state: ReduxState) => state.vinyls.vinyls,
  );
  const cart = useSelector((state: ReduxState) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const thisVinyl = vinyls.find((vinyl: VinylType) => {
    return +vinyl.id === +id!;
  }) as VinylType;

  const addVinylToCart = async (vinyl: VinylType) => {
    dispatch(cartActions.addToCart(vinyl));
  };

  const vinylExistsInCart = (id: number | string | undefined) => {
    if (id) {
      return cart.find((vinyl) => +vinyl.id === +id);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  //loads skeleton image in place of vinyls until they load
  useEffect(() => {
    let image = new Image()!;
    if (thisVinyl?.url) {
      image.src = thisVinyl.url || "null";

      image.onload = () => {
        if (thisVinyl.url) {
          setSelectedImg(image);
        }
      };
    }
  }, [thisVinyl]);

  return (
    <div id="vinyls__body">
      <main id="vinyls__main">
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes.pageHeader}>
              <div onClick={goBack} className={classes.backLink}>
                <FontAwesomeIcon icon="arrow-left" />
              </div>
              <div onClick={goBack} className={classes.backLink}>
                <h2 className={classes.headerTitle}>Vinyls</h2>
              </div>
            </div>
            <div className={classes.selectedVinyl}>
              <figure className={classes.selectedVinylFigure}>
                {selectedImg ? (
                  <img
                    src={selectedImg?.src}
                    alt={thisVinyl?.title}
                    className={classes.selectedVinylImg}
                  />
                ) : (
                  <div className={classes.selectedVinylImgSkeleton}></div>
                )}
              </figure>
              <div className={classes.selectedVinylDescription}>
                {thisVinyl ? (
                  <>
                    {" "}
                    <h2 className={classes.selectedVinylTitle}>
                      {thisVinyl?.title}
                    </h2>
                    <h3 className={classes.selectedVinylArtist}>
                      Artist: {thisVinyl.artist}
                    </h3>
                    <Rating rating={thisVinyl?.rating} />
                    <div>
                      <Price
                        originalPrice={thisVinyl?.originalPrice}
                        salePrice={thisVinyl?.salePrice}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={classes.skeletonTitle}></div>
                    <div className={classes.skeletonRating}></div>
                    <div className={classes.skeletonPrice}></div>
                  </>
                )}
                <div className={classes.vinylSummary}>
                  <h3 className={classes.summaryTitle}>Summary</h3>
                  <p className={classes.summaryPara}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure quia ad, impedit soluta aut molestias voluptates
                    voluptas ab facere aliquam suscipit nesciunt quod possimus.
                    Magni quisquam atque commodi magnam dolor?
                  </p>
                  <p className={classes.summaryPara}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure quia ad, impedit soluta aut molestias voluptates
                    voluptas ab facere aliquam suscipit nesciunt quod possimus.
                    Magni quisquam atque commodi magnam dolor?
                  </p>
                </div>
                {vinylExistsInCart(id) ? (
                  <Link to="/cart">
                    {" "}
                    <button className={classes.button}>Checkout</button>
                  </Link>
                ) : (
                  <button
                    className={classes.button}
                    onClick={() => addVinylToCart(thisVinyl)}
                  >
                    Add To Cart!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.vinylsContainer}>
          <div className={classes.row}>
            <div className={classes.recommendedHeader}>
              <h2 className={classes.recommendedTitle}>Recommended Vinyls</h2>
            </div>
            <div className={classes.vinyls}>
              {vinyls.length >= 1
                ? vinyls
                    .filter(
                      (vinyl: VinylType) =>
                        vinyl.rating > 8 && +vinyl.id !== +thisVinyl.id,
                    )
                    .slice(0, 4)
                    .map((vinyl) => <Vinyl vinylInfo={vinyl} key={vinyl.id} />)
                : skeletonVinyls
                    .slice(0, 4)
                    .map((vinyl) => <Vinyl vinylInfo={vinyl} key={vinyl.id} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VinylInfo;
