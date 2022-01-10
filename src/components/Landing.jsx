import React from 'react';
import HeroImage from '../assets/Hero-3.png';


const Landing = () => {
  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>Ottawa's most awarded online vinyl exchange!</h1>
            <h2>Find you dream Vinyl with <span className="purple">Vinyl Shop</span></h2>
            <a href="features">
              <button className="btn">Broswe Vinyls</button>
            </a>
          </div>
          <figure className="header__img--wrapper">
            <img src={HeroImage} alt="" />
          </figure>
        </div>
      </header>
    </section>
  )
}

export default Landing