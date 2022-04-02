import { useNavigate } from "react-router-dom";
import classes from "./OrderItem.module.css";
import { OrderItemType } from "../../../types";

const OrderItem = ({ item }: OrderItemType) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/vinyls/${item.id}`);
  };

  return (
    <div className={classes.orderItem}>
      <figure className={classes.imgWrapper}>
        <img src={item.url} />
      </figure>
      <div className={classes.itemDescription}>
        <h5>{item.title}</h5>
        <h4>{item.artist}</h4>
        <p>${item.salePrice ? item.salePrice : item.originalPrice}</p>
        <p className={classes.quantity}>x{item.quantity}</p>
        <button onClick={clickHandler}>View Item Details</button>
      </div>
    </div>
  );
};

export default OrderItem;
