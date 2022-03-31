import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
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
  };
}

type OrderArrayType = {
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
  const [loading, setLoading] = useState(false)
  const uid = useSelector((state: State) => state.auth.uid);
  const isLogged = useSelector((state: State) => state.auth.isLogged);
  // const cart = useSelector((state: State) => state.cart.cart);



  useEffect(() => {
    


  const fetchOrders = async () => {
    setLoading(true)
    let retrievedOrders: DocumentData[] = []

    let orders = collection(db, "orders");
    const orderQuery = query(orders, where("uid", "==", uid));
    const querySnapshot = await getDocs(orderQuery);

    querySnapshot.forEach(item => {
      retrievedOrders.push(item.data())
    })

    retrievedOrders = retrievedOrders.sort((a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)

    setMyOrders(retrievedOrders)



    // db.collection("orders")
    // .orderBy("deliveryDate", "asc")
    // .onSnapshot((snapshot) => {
      
    //     let retrievedOrders = snapshot.docs.map((doc) => {
    //       console.log(uid);
    //       console.log(doc.data().uid);
    //       console.log(doc.data().uid === uid);
    //       if (doc.data().uid === uid) {
    //         return {
    //           ...doc.data(),
    //         };
    //       } 
    //     })

    //     console.log(retrievedOrders);
    //     setMyOrders(retrievedOrders)
      
    //   setLoading(false)
    //   console.log('done');
    // }
    // );
    setLoading(false);
    console.log('done');
  }
    fetchOrders()


  }, [uid])

  // useEffect(() => {
  //   console.log(myOrders);

  // }, [myOrders])

  return (
    <div className={classes.container}>
     {(isLogged && myOrders[0]) && <>
     <h1>Your Orders</h1>
     <hr />
      <div className={classes.ordersContainer}>
        {myOrders[0] && myOrders.map((order: OrderArrayType ) => {
          console.log(order);
          if (!order?.orderId) {
            console.log(order);
            return
          }
          return <Order key={order.orderId} order={order} deleteOrder={setMyOrders} />
        })}
        {/* {} */}
      </div>
      </> 
      }
      {(isLogged && !myOrders[0] && !loading ) && <h1>You must make an order to see your past orders.</h1>}
      {!isLogged && <h1>Please login to see your past orders!</h1>}
      
    </div>
  )
}

export default MyOrders