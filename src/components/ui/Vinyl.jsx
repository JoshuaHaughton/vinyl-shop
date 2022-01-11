import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Vinyl = ({ vinylInfo }) => {
  return (
    <div className="vinyl">
      <a href="">
        <figure className="vinyl__img--wrapper">
          <img src={vinylInfo.url} alt="" className="vinyl__image" />
        </figure>
      </a>
      <div className="vinyl__title">
        <a href="/" className="vinyl__title--link">
          {vinylInfo.title}
        </a>
      </div>
      <div className="vinyl__ratings">
        {
          new Array(Math.floor(vinylInfo.rating)).fill(0).map((_, index) => <FontAwesomeIcon icon="star" key={index}/>)

        }
        {
          Number.isInteger(vinylInfo.rating) ? '' : <FontAwesomeIcon icon="star-half-alt"/>
        }

        {/* {
          vinylInfo.rating <= 4 ? 
          new Array (5 - Math.ceil(vinylInfo.rating)).fill(0).map((_, index) => <FontAwesomeIcon icon="star" key={index}/>)
          : ''
        } */}
      </div>
      <div className="vinyl__price">
        {vinylInfo.salePrice ? (
          <>
            <span className="vinyl__price--normal">${vinylInfo.originalPrice.toFixed(2)}</span>
            ${vinylInfo.salePrice.toFixed(2)}
          </>
        ) : (
          <>
          ${vinylInfo.originalPrice.toFixed(2)}
          </>
        )}
      </div>
    </div>
  );
};

export default Vinyl;
