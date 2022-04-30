import { useNavigate } from "react-router-dom";
import classes from "./OrderItem.module.css";
import { OrderItemType } from "../../../types";
import { useEffect, useState } from "react";
import skeleton from "../../../assets/skeleton.png";

const OrderItem = ({ item }: OrderItemType) => {
  const [img, setImg] = useState<HTMLImageElement>();

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/vinyls/${item.id}`);
  };

  useEffect(() => {
    let image = new Image()!;
    if (item.url) {
      image.src = item.url || "null";

      image.onload = () => {
        if (item.url) {
          setImg(image);
        }
      };
    }
  }, []);

  return (
    <div className={classes.orderItem}>
      <figure className={classes.imgWrapper}>
        <img src={img ? img.src : skeleton} alt={`${item.title} Vinyl Cover`} />
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
