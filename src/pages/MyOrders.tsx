import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase'
import classes from './MyOrders.module.css'
import Order from './Order';


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

type OrderType = {
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

const MyOrders = () => {

  const [myOrders, setMyOrders] = useState<any>([])
  const uid = useSelector((state: State) => state.auth.uid);



  useEffect(() => {


  const fetchOrders = async () => {
    await db.collection("orders")
    .orderBy("deliveryDate", "asc")
    .onSnapshot((snapshot) =>
      setMyOrders(
        snapshot.docs.map((doc) => {
          // console.log(doc.data());
          if (doc.data().uid === uid) {
            return {
              ...doc.data(),
            };
          }
        }),
      ),
    );
  }
  fetchOrders()

  }, [])

  useEffect(() => {
    console.log(myOrders);

  }, [myOrders])

  return (
    <div className={classes.container}>
      <h1>Your Orders</h1>
      <div className={classes.ordersContainer}>
        {myOrders.length > 0 && myOrders.map((order: OrderType )=> {
          return <Order key={order?.orderId} order={order} />
        })}
        {/* {} */}
      </div>
    </div>
  )
}

export default MyOrders