import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Price from "../components/ui/Price";
import Rating from "../components/ui/Rating";
import Vinyl from "../components/ui/Vinyl";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import { skeletonVinyls } from "../skeletonData";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { db } from "../firebase";

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
        <div className="vinyls__container">
          <div className="row">
            <div className="vinyl__selected--top">
              <Link to="/vinyls" className="vinyl__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/vinyls" className="vinyl__link">
                <h2 className="vinyl__selected--title--top">Vinyls</h2>
              </Link>
            </div>
            <div className="vinyl__selected">
              <figure className="vinyl__selected--figure">
               {selectedImg ? <img
                  src={selectedImg?.src}
                  alt={thisVinyl?.title}
                  className="vinyl__selected--img"
                />:
                <div className="selected-vinyl__img--skeleton"></div>
                }
              </figure>
              <div className="vinyl__selected--description">
                {thisVinyl ? <> <h2 id="vinyl__selected--title">{thisVinyl?.title}</h2>
                <Rating rating={thisVinyl?.rating} />
                <div className="vinyl__selected--price">
                  <Price
                    originalPrice={thisVinyl?.originalPrice}
                    salePrice={thisVinyl?.salePrice}
                  />
                </div>
                </> :
                <>
                 <div className="skeleton vinyl__title--skeleton"></div>
                 <div className="skeleton vinyl__rating--skeleton"></div>
                 <div className="skeleton vinyl__price--skeleton"></div>
                 </>
                }
                <div className="vinyl__summary">
                  <h3 className="vinyl__summary--title">Summary</h3>
                  <p className="vinyl__summary--para">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure quia ad, impedit soluta aut molestias voluptates
                    voluptas ab facere aliquam suscipit nesciunt quod possimus.
                    Magni quisquam atque commodi magnam dolor?
                  </p>
                  <p className="vinyl__summary--para">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure quia ad, impedit soluta aut molestias voluptates
                    voluptas ab facere aliquam suscipit nesciunt quod possimus.
                    Magni quisquam atque commodi magnam dolor?
                  </p>
                </div>
                {vinylExistsInCart(id) ? (
                  <Link to="/cart"> <button className="btn">Checkout</button></Link>
                ) : (
                  <button
                    className="btn"
                    onClick={() => addVinylToCart(thisVinyl)}
                  >
                    Add To Cart!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="vinyls__container">
          <div className="row">
            <div className="vinyl__selected--top">
              <h2 className="vinyl__selected--title--top">
                Recommended Vinyls
              </h2>
            </div>
            <div className="vinyls">
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
