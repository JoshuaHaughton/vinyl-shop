import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Price";

const Vinyl = ({ vinylInfo }) => {
  return (
    <div className="vinyl">
      <Link to={`/vinyls/${vinylInfo.id}` }>
        <figure className="vinyl__img--wrapper">
          <img src={vinylInfo.url} alt="" className="vinyl__image" />
        </figure>
      </Link>
      <div className="vinyl__title">
        <Link to={`/vinyls/${vinylInfo.id}` }className="vinyl__title--link">
          {vinylInfo.title}
        </Link>
      </div>
      <Rating rating={vinylInfo.rating}/>
      <Price salePrice={vinylInfo.salePrice} originalPrice={vinylInfo.originalPrice}/>
    </div>
  );
};

export default Vinyl;
