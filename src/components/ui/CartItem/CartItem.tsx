import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart";
import classes from "./CartItem.module.css";
import { CartItemType } from "../../../types";

const CartItem = ({vinyl}: CartItemType) => {
  const dispatch = useDispatch()

  return (
    <div className={classes.cartItem} key={vinyl.id}>
      <div className={classes.cartVinyl}>
        <img
          src={vinyl.url}
          alt={`${vinyl.title} Vinyl Cover`}
          className={classes.cartVinylImg}
        />
        <div className={classes.cartVinylInfo}>
          <p className={classes.cartVinylTitle}>{vinyl.title}</p>
          <p className={classes.cartVinylArtist}>{vinyl.artist}</p>
          <p className={classes.cartVinylPrice}>
            ${(vinyl.salePrice || vinyl.originalPrice).toFixed(2)}
          </p>
          <button
            className={classes.cartVinylRemove}
            onClick={() => dispatch(cartActions.removeVinyl(vinyl))}
          >
            Remove
          </button>
        </div>
      </div>
      <div className={classes.cartQuantity}>
        <input
          type="number"
          min={1}
          max={99}
          className={classes.cartInput}
          value={vinyl.quantity}
          onChange={(e) =>
            dispatch(
              cartActions.changeQuantity({
                id: vinyl.id,
                newQuantity: e.target.value,
              }),
            )
          }
        />
      </div>
      <div className={classes.cartTotal}>
        $
        {((vinyl.salePrice || vinyl.originalPrice) * vinyl.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
