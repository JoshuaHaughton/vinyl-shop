import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Rating.module.css";

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props): JSX.Element => {
  const fullStars = new Array(Math.floor(rating / 2))
    .fill(0)
    .map((_, index) => <FontAwesomeIcon icon="star" key={index} />);

  let emptyStarsLength = 0;

  if (Number.isInteger(rating / 2)) {
    emptyStarsLength = 5 - fullStars.length;
  } else {
    emptyStarsLength = 5 - (fullStars.length + 1);
  }

  const emptyStars = new Array(emptyStarsLength)
    .fill(0)
    .map((_, index) => (
      <FontAwesomeIcon icon={faStar} key={index} className={classes.noClick} />
    ));

  return (
    <div className={classes.ratings}>
      {new Array(Math.floor(rating / 2)).fill(0).map((_, index) => (
        <FontAwesomeIcon icon="star" key={index} />
      ))}
      {Number.isInteger(rating / 2) ? (
        ""
      ) : (
        <FontAwesomeIcon icon="star-half-alt" />
      )}
      {emptyStarsLength > 0 && emptyStars}
    </div>
  );
};

export default Rating;
