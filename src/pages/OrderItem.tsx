import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./OrderItem.module.css";
type ItemType = {
  item: {
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
};

const OrderItem = ({ item }: ItemType) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/vinyls/${item.id}`)
  }

  return (
    <div className={classes.orderItem}>
      <figure className={classes.imgWrapper}>
        <img src={item.url} />
      </figure>
      <div className={classes.itemDescription}>
        <h5>{item.title}</h5>
        <p>${item.salePrice ? item.salePrice : item.originalPrice}</p>
        <p>x{item.quantity}</p>
        <button onClick={clickHandler}>View Item Details</button>
      </div>
    </div>
  );
};

export default OrderItem;
