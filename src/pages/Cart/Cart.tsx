import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxState } from "../../types";
import EmptyCart from "../../assets/EmptyCart.png";
import classes from "./Cart.module.css";
import CheckoutForm from "../../components/ui/CheckoutForm/CheckoutForm";
import CartItem from "../../components/ui/CartItem/CartItem";

const Cart = () => {
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [cartTax, setCartTax] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);
  const cart = useSelector((state: ReduxState) => state.cart.cart);
  const isLogged = useSelector((state: ReduxState) => state.auth.isLogged);

  const clickHandler = () => {
    setCheckoutInitiated((prev) => !prev);
  };
  
  const tax = () => {
    const total = subtotal() * 1.13;
    const tax = total - subtotal();
    return tax.toFixed(2);
  };

  const subtotal = () => {
    let price = 0;
    cart.forEach((item) => {
      price += +((item.salePrice || item.originalPrice) * +item.quantity);
    });
    return Number(price.toFixed(2));
  };

  //Adjust price totals whenever cart changes
  useEffect(() => {

    setCartSubtotal(subtotal());
    setCartTax(Number(tax()));
    setCartTotal(Number((+subtotal() + +tax()).toFixed(2)));

  }, [cart]);


  return (
    <>
      <div id="vinyls_body">
        <main id="vinyls__main">
          <div className={classes.container}>
            <div className={classes.row}>
              <div className={classes.cartTitle}>
                <h2 className={classes.title}>Cart</h2>
              </div>
              <div>
                <div className={classes.cartHeader}>
                  <div className={classes.cartVinyl}>Vinyl</div>
                  <div className={classes.cartQuantity}>Quantity</div>
                  <div className={classes.cartTotal}>Total</div>
                </div>
                <div>
                  {cart.map((vinyl) => {
                    return (
                      <CartItem vinyl={vinyl}/>
                    );
                  })}
                </div>
                {cart.length === 0 && (
                  <div className={classes.cartEmpty}>
                    <img
                      src={EmptyCart}
                      alt=""
                      className={classes.cartEmptyImg}
                    />
                    <h2>You don't have any items in your cart!</h2>
                    <Link to="/vinyls">
                      <button className={classes.button}>Browse Vinyls</button>
                    </Link>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className={classes.checkout}>
                  {isLogged && checkoutInitiated && (
                    <CheckoutForm
                      cartSubtotal={cartSubtotal}
                      cartTotal={cartTotal}
                    />
                  )}

                  <div className={classes.checkoutTotal}>
                    <div className={classes.subTotal}>
                      <span>Subtotal:</span>
                      <span>${cartSubtotal}</span>
                    </div>
                    <div className={classes.totalTax}>
                      <span>Tax: (13%)</span>
                      <span>${cartTax}</span>
                    </div>
                    <div className={classes.totalPrice}>
                      <span>Total:</span>
                      <span>${cartTotal}</span>
                    </div>
                    <button
                      className={
                        isLogged
                          ? classes.checkoutButton
                          : classes.checkoutButtonBlocked
                      }
                      onClick={clickHandler}
                    >
                      {isLogged
                        ? `Proceed to checkout`
                        : `Plese Login to checkout`}
                    </button>
                  </div>
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
