import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import Price from "../../components/ui/Price/Price";
import Rating from "../../components/ui/Rating/Rating";
import Vinyl from "../../components/ui/Vinyl/Vinyl";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { skeletonVinyls } from "../../skeletonData";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import classes from './VinylInfo.module.css'

interface Props {
  vinyls: {
    id: number;
    title: string;
    artist: string;
    url: string;
    originalPrice: number;
    salePrice: number | null;
    rating: number;
    genres: string[]
  }[]
}

type VinylType = {
  id: number;
  title: string;
  artist: string;
  url?: string;
  originalPrice: number;
  salePrice: number | null;
  rating: number;
  genres: string[]
}

type State = {
  cart: {
    cart: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number | null;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
  quantity: number;
  }
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
  auth: {
    isLogged: boolean
    full_name: string | null
    uid: string | null
  }
}

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


const VinylInfo = (): JSX.Element => {
  const { id } = useParams<any>();
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement>();

  const vinyls: VinylInterface[] = useSelector((state: State) => state.vinyls.vinyls);
  const uid = useSelector((state: State) => state.auth.uid);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart.cart)
  console.log(cart);


  const thisVinyl = vinyls.find((vinyl: VinylType) => {
    return +vinyl.id === +id!;
  }) as VinylType


  const addVinylToCart = async (vinyl: VinylType) => {

    dispatch(cartActions.addToCart(vinyl))




// const docRef = doc(db, "cart", "LyVeJAxVQVVNbZ6UyIo3");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

  };

  // useEffect(() => {
  //   const changeBackendCart = async () => {
  //     //check if cart with their id already exists before this vvvv
  //     await db.collection("cart").doc(uid!).set({
  //       cart: cart,
  //       quantity: user.email,
  //       uid,
  //     });
  //   }
  //   changeBackendCart()
  // }, [cart])

  const vinylExistsInCart = (id: number | string | undefined) => {
    if (id) {
      return cart.find(vinyl => +vinyl.id === +id)
    }
  }

  const goBack = () => {
    navigate(-1)
  }


  const mountedRef = useRef(true);

  //loads skeleton image in place of vinyls until they load
  useEffect(() => {
    let image = new Image()!;
    if (thisVinyl?.url) {

      image.src = thisVinyl.url || 'null';
      console.log(thisVinyl, 'select load');

      image.onload = () => {
        console.log('selected img load');
        if (thisVinyl.url) {
          setSelectedImg(image);
        }
      };

    }
    // return () => {
    //   //when the component unmounts
    //   mountedRef.current = false;
    // };
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
               {selectedImg ? <img
                  src={selectedImg?.src}
                  alt={thisVinyl?.title}
                  className={classes.selectedVinylImg}
                />:
                <div className={classes.selectedVinylImgSkeleton}></div>
                }
              </figure>
              <div className={classes.selectedVinylDescription}>
                {thisVinyl ? <> <h2 className={classes.selectedVinylTitle}>{thisVinyl?.title}</h2>
                <h3 className={classes.selectedVinylArtist}>Artist: {thisVinyl.artist}</h3>
                <Rating rating={thisVinyl?.rating} />
                <div >
                  <Price
                    originalPrice={thisVinyl?.originalPrice}
                    salePrice={thisVinyl?.salePrice}
                  />
                </div>
                </> :
                <>
                 <div className={classes.skeletonTitle}></div>
                 <div className={classes.skeletonRating}></div>
                 <div className={classes.skeletonPrice}></div>
                 </>
                }
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
                  <Link to="/cart"> <button className={classes.button}>Checkout</button></Link>
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
              <h2 className={classes.recommendedTitle}>
                Recommended Vinyls
              </h2>
            </div>
            <div className={classes.vinyls}>
              {vinyls.length >= 1 ? vinyls
                .filter(
                  (vinyl: VinylType) => vinyl.rating > 8 && +vinyl.id !== +thisVinyl.id,
                )
                .slice(0, 4)
                .map((vinyl) => (
                  <Vinyl vinylInfo={vinyl} key={vinyl.id} />
                ))
              :
              skeletonVinyls
              .slice(0, 4)
              .map((vinyl) => (
                <Vinyl vinylInfo={vinyl} key={vinyl.id} />
              ))
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VinylInfo;
