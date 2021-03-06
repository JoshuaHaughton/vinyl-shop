import {
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import Modal from "../Modals/DeleteModal/DeleteModal";
import { db } from "../../../firebase";
import classes from "./Order.module.css";
import OrderItem from "../OrderItem/OrderItem";

type OrderType = {
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
    orderDate: string;
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
      genres: string[];
    }[];
  };
  deleteOrder: React.Dispatch<React.SetStateAction<any>>;
};

export type OrderItemType = {
  id: number;
  title: string;
  artist: string;
  url: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  quantity: number;
  genres: string[];
};

const Order = ({ order, deleteOrder }: OrderType) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const cancelOrder = async () => {
    const docRef = doc(db, "orders", order.orderId);
    (await getDoc(docRef)).data();

    try {
      await deleteDoc(doc(db, "orders", order.orderId));
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      {openDeleteModal && (
        <Modal
          title={"Cancel this order?"}
          message={
            "You will not be able to recover the deleted information from your order."
          }
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={cancelOrder}
          order={order}
          deleteLocalOrder={deleteOrder}
        />
      )}
      <div className={classes.orderCard}>
        <div className={classes.cardHead}>
          <div className={classes.headerInfo}>
            <div className={`${classes.headerSection} ${classes.orderPlaced}`}>
              <h6>ORDER PLACED</h6>
              <p>{order.orderDate}</p>
            </div>
          </div>

          <div className={classes.headerRight}>
            <div className={`${classes.headerSection} ${classes.cancelOrder}`}>
              <button onClick={openModal}>Cancel Order</button>
            </div>
            <div className={classes.headerSection}>
              <h6>ORDER ID:</h6>
              <p>{order.orderId}</p>
            </div>
          </div>
        </div>

        <div className={classes.order}>
          <div className={classes.orderBodyLeft}>
            <h3 className={classes.deliveryDate}>
              Delivery Date:{" "}
              {Number(new Date(order.deliveryDate).getTime()) <
              new Date().getTime()
                ? `Delivered!`
                : order.deliveryDate}
            </h3>
            <div className={classes.orderBody}>
              {order.items.map((item: OrderItemType) => {
                return <OrderItem key={item.id} item={item} />;
              })}
            </div>
          </div>

          <div className={classes.orderBodyRight}>
            <div className={classes.detailCard}>
              <h3>Order Details</h3>
              <div className={classes.detailCardRow}>
                <p>Order For:</p>
                <p>
                  {order.firstName} {order.lastName}
                </p>
              </div>

              {order.companyName && (
                <div className={classes.detailCardRow}>
                  <p>Company Name:</p>
                  <p>{order.companyName}</p>
                </div>
              )}

              <div className={classes.detailCardRow}>
                <p>Email:</p>
                <p>{order.email}</p>
              </div>

              <div className={classes.detailCardRow}>
                <p>Address:</p>
                <p>
                  {order.address} {order.unit && `- #${order.unit}`}
                </p>
              </div>

              <div className={classes.detailCardRow}>
                <p>Postal Code/ZIP:</p>
                <p>{order.postalOrZip}</p>
              </div>

              <div className={classes.detailCardRow}>
                <p>City:</p>
                <p>{order.city}</p>
              </div>

              <div className={classes.detailCardRow}>
                <p>Province:</p>
                <p>{order.provinceOrState}</p>
              </div>

              <div className={classes.detailCardRow}>
                <p>Country:</p>
                <p>{order.country}</p>
              </div>

              <hr />

              <div className={`${classes.detailCardRow} ${classes.orderPrice}`}>
                <p>Subtotal:</p>
                <p>${order.subtotal}</p>
              </div>

              <div className={`${classes.detailCardRow} ${classes.orderPrice}`}>
                <p>Tax (HST): </p>
                <p>${(order.total - order.subtotal).toFixed(2)}</p>
              </div>

              <div className={`${classes.detailCardRow} ${classes.orderPrice}`}>
                <p>Total:</p>
                <p>${order.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
