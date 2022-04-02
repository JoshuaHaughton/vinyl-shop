import logo from "../../assets/Logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./OrderConfirmation.module.css";
import { OrderType } from "../../types";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //State passed from cart after order submission
  const state = location.state as OrderType;
  const cart = state.order.items;

  const clickHandler = () => {
    navigate("/orders");
  };

  return (
    <>
      <div>
        <main>
          <div className={classes.container}>
            <div className={classes.row}>
              <div className={classes.selectedTop}>
                <img src={logo} alt="VinylFresh Logo" />
                <h2 className={classes.title}>
                  Hey {state.order.firstName}, your order has been confirmed!
                </h2>
                <h3 className={classes.subTitle}>
                  Order ID: {state.order.orderId}
                </h3>
              </div>
              <div className={classes.detailsHeader}>
                <div className={classes.headerDetails}>Order Details</div>
              </div>

              <div className={classes.receiptCard}>
                <div className={classes.receiptLeft}>
                  <p>
                    {state.order.firstName} {state.order.lastName}
                  </p>
                  <p>{state.order.email}</p>
                  <br />
                  <p className={classes.shippngTitle}>Order date:</p>
                  <p>{state.order.orderDate}</p>
                </div>
                <div className={classes.receiptRight}>
                  <p>
                    {state.order.address}{" "}
                    {state.order.unit && `#${state.order.unit}`},{" "}
                    {state.order.postalOrZip}
                  </p>
                  <p>
                    {state.order.city}, {state.order.provinceOrState},{" "}
                    {state.order.country}
                  </p>
                  <br />
                  <p className={classes.shippngTitle}>Delivery Date:</p>
                  <p>{state.order.deliveryDate}</p>
                </div>
              </div>

              <div className={classes.orderItems}>
                <div className={classes.itemsHeader}>
                  <div className={classes.headerVinyl}>Vinyl</div>
                  <div className={classes.headerQuantity}>Quantity</div>
                  <div className={classes.headerTotal}>Total</div>
                </div>
                <div>
                  {cart.map((vinyl) => {
                    return (
                      <div className={classes.orderItem} key={vinyl.id}>
                        <div className={classes.itemImageWrapper}>
                          <img
                            src={vinyl.url}
                            alt={`Vinyl Cover for ${vinyl.title}`}
                            className={classes.itemImage}
                          />
                          <div className={classes.itemInfo}>
                            <span className={classes.itemTitle}>
                              {vinyl.title}
                            </span>
                            <span className={classes.itemPrice}>
                              $
                              {(vinyl.salePrice || vinyl.originalPrice).toFixed(
                                2,
                              )}
                            </span>
                          </div>
                        </div>
                        <div className={classes.itemQuantity}>
                          <span>x{vinyl.quantity}</span>
                        </div>
                        <div className={classes.itemTotal}>
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
              </div>
              {cart.length > 0 && (
                <div className={classes.total}>
                  <div className={`${classes.totalItem} ${classes.subTotal}`}>
                    <span>Subtotal:</span>
                    <span>${state.order.subtotal}</span>
                  </div>

                  <div className={`${classes.totalItem} ${classes.totalPrice}`}>
                    <span>Total:</span>
                    <span>${state.order.total}</span>
                  </div>
                  <button className={classes.button} onClick={clickHandler}>
                    My Orders
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

export default OrderConfirmation;
