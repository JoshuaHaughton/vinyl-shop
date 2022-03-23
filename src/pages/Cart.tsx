import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/EmptyCart.png";
import ErrorModal from "../components/ui/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import { useEffect } from "react";

type State = {
  cart: {
    cart: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
    quantity: number;
  };
};

interface ErrorState {
  title: string;
  message: string;
}

const Cart = () => {
  const [error, setError] = useState<ErrorState | null>();
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [cartTax, setCartTax] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart.cart);

  const clickHandler = () => {
    setError({
      title: "Not implemented",
      message: `Sorry, this feature hasn't been implemented yet :(`,
    });
  };

  const errorHandler = (): void => {
    setError(null);
  };

  useEffect(() => {
    const tax = () => {
      const total: number = subtotal() * 1.13;
      const tax = total - subtotal();
      return tax.toFixed(2);
    };

    const subtotal = (): number => {
      let price = 0;
      cart.forEach((item) => {
        price += +((item.salePrice || item.originalPrice) * +item.quantity);
      });
      return Number(price.toFixed(2));
    };

    setCartSubtotal(subtotal());
    setCartTax(Number(tax()));
    setCartTotal(Number((+subtotal() + +tax()).toFixed(2)));
  }, [cart]);

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <div id="vinyls_body">
        <main id="vinyls__main">
          <div className="vinyls__container">
            <div className="row">
              <div className="vinyl__selected--top">
                <h2 className="cart__title">Cart</h2>
              </div>
              <div className="cart">
                <div className="cart__header">
                  <div className="cart__vinyl">Vinyl</div>
                  <div className="cart__quantity">Quantity</div>
                  <div className="cart__total">Total</div>
                </div>
                <div className="cart__body">
                  {cart.map((vinyl) => {
                    return (
                      <div className="cart__item" key={vinyl.id}>
                        <div className="cart__vinyl">
                          <img
                            src={vinyl.url}
                            alt=""
                            className="cart__vinyl--img"
                          />
                          <div className="cart__vinyl--info">
                            <span className="cart__vinyl--title">
                              {vinyl.title}
                            </span>
                            <span className="cart__vinyl--price">
                              $
                              {(vinyl.salePrice || vinyl.originalPrice).toFixed(
                                2,
                              )}
                            </span>
                            <button
                              className="cart__vinyl--remove"
                              onClick={() =>
                                dispatch(cartActions.removeVinyl(vinyl))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="cart__quantity">
                          <input
                            type="number"
                            min={0}
                            max={99}
                            className="cart__input"
                            value={vinyl.quantity}
                            onChange={(e) =>
                              dispatch(
                                cartActions.changeQuantity({
                                  id: vinyl.id,
                                  newQuantity: e.target.value,
                                }),
                              )
                            }
                          />
                        </div>
                        <div className="cart__total">
                          $
                          {(
                            (vinyl.salePrice || vinyl.originalPrice) *
                            vinyl.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {cart.length === 0 && (
                  <div className="cart__empty">
                    <img src={EmptyCart} alt="" className="cart__empty--img" />
                    <h2>You don't have any items in your cart!</h2>
                    <Link to="/vinyls">
                      <button className="btn">Browse Vinyls</button>
                    </Link>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="total">
                  <div className="total__item total__sub-total">
                    <span>Subtotal</span>
                    <span>${cartSubtotal}</span>
                  </div>
                  <div className="total__item total__tax">
                    <span>Tax - (1.13%)</span>
                    <span>${cartTax}</span>
                  </div>
                  <div className="total__item total__price">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                  <button className="btn btn__checkout" onClick={clickHandler}>
                    Proceed to checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
