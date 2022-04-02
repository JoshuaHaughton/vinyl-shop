import classes from "./Price.module.css";
interface Props {
  salePrice: number | null;
  originalPrice: number;
}

export default function Price({
  salePrice,
  originalPrice,
}: Props): JSX.Element {
  return (
    <div className={classes.salePrice}>
      {salePrice ? (
        <>
          <span className={classes.normalPrice}>
            ${originalPrice.toFixed(2)}
          </span>
          ${salePrice.toFixed(2)}
        </>
      ) : (
        <>${originalPrice.toFixed(2)}</>
      )}
    </div>
  );
}
