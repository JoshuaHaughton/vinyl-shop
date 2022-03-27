import React from 'react'

// const OrderConfirmation = () => {
//   return (
//     <div>OrderConfirmation</div>
//   )
// }

// export default OrderConfirmation

import logo from "../assets/Logo.svg";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmptyCart from "../assets/EmptyCart.png";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import { useEffect } from "react";
import ErrorModal from "../components/ui/Modals/ErrorModals/ErrorModal";
import firebase from "firebase/compat/app";
import useInputValidate from "../components/hooks/useInput";
import { db } from "../firebase";
import classes from './OrderConfirmation.module.css'

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
  auth: {
    isLogged: boolean;
    full_name: string | null;
    uid: string | null;
  }
};

interface LocationState {
    order: {
      firstName: string;
      lastName: string;
      companyName: string | null;
      address: string;
      unit: string | null;
      city: string;
      email: string;
      postalOrZip: string;
      provinceOrState: string;
      country: string;
      subtotal: number;
      total: number;
      orderDate: string
      deliveryDate: string;
      uid: string;
      orderId: string;
      items: {
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
    }
  
  
}

interface ErrorState {
  title: string;
  message: string;
}


const OrderConfirmation = () => {
  const [error, setError] = useState<ErrorState | null>();
  // const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  // const [cartTax, setCartTax] = useState<number>(0);
  // const [cartTotal, setCartTotal] = useState(0);
  // const [checkoutInitiated, setCheckoutInitiated] = useState(false)
  const dispatch = useDispatch();
  // const cart = useSelector((state: State) => state.cart.cart);
  // const isLogged = useSelector((state: State) => state.auth.isLogged);
  const  navigate = useNavigate();

  const location = useLocation();
  const state = location.state as LocationState;
  console.log(state);
  // const uid = useSelector((state: State) => state.auth.uid);


  const cart = state.order.items



  const clickHandler = () => {
    // setError({
    //   title: "Not implemented",
    //   message: `Sorry, this feature hasn't been implemented yet :(`,
    // });
    // setCheckoutInitiated(prev => !prev)
  };

  const errorHandler = (): void => {
    setError(null);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // console.log(cart, cartSubtotal, cartTotal);

    //Do validation using custom hook



    console.log('check');
    

    //If valid, continue

   


let timestamp = new Date().toString();
let deliveryDateSeconds = (new Date().getTime() + 1209600000);
let deliveryDate = new Date(deliveryDateSeconds).toString()
console.log(timestamp);
console.log(deliveryDate);
console.log(cart);


  }

  // useEffect(() => {
  //   const tax = () => {
  //     const total: number = subtotal() * 1.13;
  //     const tax = total - subtotal();
  //     return tax.toFixed(2);
  //   };

  //   const subtotal = (): number => {
  //     let price = 0;
  //     cart.forEach((item) => {
  //       price += +((item.salePrice || item.originalPrice) * +item.quantity);
  //     });
  //     return Number(price.toFixed(2));
  //   };

  //   setCartSubtotal(subtotal());
  //   setCartTax(Number(tax()));
  //   setCartTotal(Number((+subtotal() + +tax()).toFixed(2)));
  // }, []);



  return (
    <>
      {/* {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )} */}
      <div>
        <main >
          <div className={classes.container}>
            <div className={classes.row}>
              <div className={classes.selectedTop}>
                <img src={logo} alt="VinylFresh Logo" />
                <h2 className={classes.title}>Hey {state.order.firstName}, your order has been confirmed!</h2>
                <h3 className={classes.subTitle}>Order ID: {state.order.orderId}</h3>

              </div>
              <div className={classes.detailsHeader}>
                  <div className={classes.headerDetails}>Order Details</div>
                </div>

              <div className={classes.receiptCard}>
                <div className={classes.receiptLeft}>
                  <p>{state.order.firstName} {state.order.lastName}</p>
                  <p>{state.order.email}</p>
                  <br />
                  <p className={classes.shippngTitle}>Order date:</p>
                  <p>{state.order.orderDate}</p>
                </div>
                <div className={classes.receiptRight}>
                  <p>{state.order.address} {state.order.unit && `#${state.order.unit}`}, {state.order.postalOrZip}</p>
                  <p>{state.order.city}, {state.order.provinceOrState}, {state.order.country}</p>
                  <br />
                  <p className={classes.shippngTitle}>Standard Shipping</p>
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
                            {/* <button
                              className={classes.itemRemove}
                              onClick={() =>
                                dispatch(cartActions.removeVinyl(vinyl))
                              }
                            >
                              Remove
                            </button> */}
                          </div>
                        </div>
                        <div className={classes.itemQuantity}>
                          {/* <input
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
                          /> */}
                          <span >x{vinyl.quantity}</span>
                          {/* <span className={classes.itemQuantityNumber}>{vinyl.quantity}</span> */}
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
                {/* {cart.length === 0 && (
                  <div className="cart__empty">
                    <img src={EmptyCart} alt="" className="cart__empty--img" />
                    <h2>You don't have any items in your cart!</h2>
                    <Link to="/vinyls">
                      <button className="btn">Browse Vinyls</button>
                    </Link>
                  </div>
                )} */}
              </div>
              {cart.length > 0 && (
                  

                  <div className={classes.total}>
                    <div className={`${classes.totalItem} ${classes.subTotal}`}>
                      <span>Subtotal:</span>
                      <span>${state.order.subtotal}</span>
                    </div>
                    {/* <div className="total__item total__tax">
                      <span>Tax: (13%)</span>
                      <span>${state.order.tax}</span>
                    </div> */}
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
