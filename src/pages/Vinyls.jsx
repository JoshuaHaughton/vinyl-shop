import React, { useState } from "react";
import Vinyl from "../components/ui/Vinyl";

const Vinyls = ({ vinyls: initialVinyls }) => {
  const [vinyls, setVinyls] = useState(initialVinyls);

  const filterVinyls = (filter) => {
    console.log(filter);
    if (filter === "LOW_TO_HIGH") {
      setVinyls(
        vinyls
          .slice()
          .sort(
            (a, b) =>
              (a.salePrice || a.originalPrice) -
              (b.salePrice || b.originalPrice),
          ),
      );
    }

    if (filter === "HIGH_TO_LOW") {
      setVinyls(
        vinyls
          .slice()
          .sort(
            (a, b) =>
              (b.salePrice || b.originalPrice) -
              (a.salePrice || a.originalPrice),
          ),
      );
    }

    if (filter === "RATING") {
      setVinyls(vinyls.slice().sort((a, b) => b.rating - a.rating));
    }
  };
  return (
    <div id="vinyls__body">
      <main id="vinyls__main">
        <section>
          <div className="vinyls__container">
            <div className="row">
              <div className="vinyls__header">
                <h2 className="section__title vinyls__header--title">All Vinyls</h2>
                <select
                  id="filter"
                  defaultValue="DEFAULT"
                  onChange={(e) => filterVinyls(e.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="LOW_TO_HIGH">Price, Low to High</option>
                  <option value="HIGH_TO_LOW">Price, High to Low</option>
                  <option value="RATING">Rating</option>
                </select>
              </div>
              <div className="vinyls">
                {vinyls.map((vinyl) => (
                  <Vinyl vinylInfo={vinyl} key={vinyl.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Vinyls;
