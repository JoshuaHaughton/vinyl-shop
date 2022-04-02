import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState, OrderArrayType } from "../../types";
import { fetchOrders } from "./MyOrderHelpers";
import Order from "../../components/ui/Order/Order";
import classes from "./MyOrders.module.css";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const uid = useSelector((state: ReduxState) => state.auth.uid);
  const isLogged = useSelector((state: ReduxState) => state.auth.isLogged);

  useEffect(() => {
    if (uid) {
      fetchOrders(uid, setLoading, setMyOrders);
    }
  }, [uid]);

  return (
    <div className={classes.container}>
      {isLogged && myOrders[0] && (
        <>
          <h1>Your Orders</h1>
          <hr />
          <div className={classes.ordersContainer}>
            {myOrders[0] &&
              myOrders.map((order: OrderArrayType) => {
                if (!order?.orderId) {
                  console.log(order);
                  return;
                }
                return (
                  <Order
                    key={order.orderId}
                    order={order}
                    deleteOrder={setMyOrders}
                  />
                );
              })}
          </div>
        </>
      )}
      {isLogged && !myOrders[0] && !loading && (
        <h1>You must make an order to see your past orders.</h1>
      )}
      {!isLogged && <h1>Please login to see your past orders!</h1>}
    </div>
  );
};

export default MyOrders;
