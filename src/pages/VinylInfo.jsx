import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Price from "../components/ui/Price";
import Rating from "../components/ui/Rating";
import Vinyl from "../components/ui/Vinyl";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";

const VinylInfo = ({ vinyls }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart)
  console.log(cart);


  const thisVinyl = vinyls.find((vinyl) => +vinyl.id === +id);


  const addVinylToCart = (vinyl) => {
    dispatch(cartActions.addToCart(vinyl))
  };

  const vinylExistsInCart = () => {
    return cart.find(vinyl => +vinyl.id === +id)
  }

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
                <img
                  src={thisVinyl.url}
                  alt=""
                  className="vinyl__selected--img"
                />
              </figure>
              <div className="vinyl__selected--description">
                <h2 id="vinyl__selected--title">{thisVinyl.title}</h2>
                <Rating rating={thisVinyl.rating} />
                <div className="vinyl__selected--price">
                  <Price
                    originalPrice={thisVinyl.originalPrice}
                    salePrice={thisVinyl.salePrice}
                  />
                </div>
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
                {vinylExistsInCart() ? (
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
              {vinyls
                .filter(
                  (vinyl) => vinyl.rating > 8 && +vinyl.id !== +thisVinyl.id,
                )
                .slice(0, 4)
                .map((vinyl) => (
                  <Vinyl vinylInfo={vinyl} key={vinyl.id} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VinylInfo;
