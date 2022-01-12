import React from "react";
import { Link } from "react-router-dom";
import EmptyCart from '../assets/EmptyCart.png'

const Cart = ({ cart, changeQuantity, removeVinyl }) => {

  const subtotal = () => {
    let price = 0;
    cart.forEach(item => {
      price += +((item.salePrice || item.originalPrice) * +item.quantity);
    })
    return price.toFixed(2);
  }

  const tax = () => {
    const total = subtotal() * 1.13;
    const tax = total - (subtotal());
    return tax.toFixed(2);

  }



  return (
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
                  return <div className="cart__item">
                    <div className="cart__vinyl">
                      <img
                        src={vinyl.url}
                        alt=""
                        className="cart__vinyl--img"
                      />
                      <div className="cart__vinyl--info">
                        <span className="cart__vinyl--title">{vinyl.title}</span>
                        <span className="cart__vinyl--price">${(vinyl.salePrice || vinyl.originalPrice).toFixed(2)}</span>
                        <button 
                        className="cart__vinyl--remove"
                        onClick={() => removeVinyl(vinyl)}
                        >Remove</button>
                      </div>
                    </div>
                    <div className="cart__quantity">
                      <input
                        type="number"
                        min={0}
                        max={99}
                        class="cart__input"
                        value={vinyl.quantity}
                        onChange={(e) => changeQuantity(vinyl, e.target.value)}
                      />
                    </div>
                    <div className="cart__total">${((vinyl.salePrice || vinyl.originalPrice) * vinyl.quantity).toFixed(2)}</div>
                  </div>;
                })}
              </div>
              {
              cart.length === 0 && 
              <div className="cart__empty">
                <img src={EmptyCart} alt="" className="cart__empty--img" />
                <h2>You don't have any items in your cart!</h2>
                <Link to="/vinyls">
                  <button className="btn">Browse Vinyls</button>
                </Link>
              </div>
              }
            </div>
            {cart.length > 0 && <div className="total">
              <div className="total__item total__sub-total">
                <span>Subtotal</span>
                <span>${subtotal()}</span>
              </div>
              <div className="total__item total__tax">
                <span>Tax</span>
                <span>${tax()}</span>
              </div>
              <div className="total__item total__price">
                <span>Total</span>
                <span>${(+subtotal() + +tax()).toFixed(2)}</span>
              </div>
              <button
                className="btn btn__checkout no-cursor"
                onClick={() =>
                  alert(
                    "Haven't gotten around to completing this feature yet :(",
                  )
                }
              >
                Proceed to checkout
              </button>
            </div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;