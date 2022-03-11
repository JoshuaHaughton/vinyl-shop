import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/Hero2.svg';


const Landing = () => {
  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>Canada's top rated online vinyl exchange!</h1>
            <h2>Find your dream vinyl with <span className="blue">Vinyl Fresh</span></h2>
            <Link to="/vinyls">
              <button className="btn landing__btn">Browse Vinyls</button>
            </Link>
            <figure className="header__img--wrapper">
            <img src={HeroImage} alt="" />
          </figure>
          </div>
        </div>
      </header>
    </section>
  )
}

export default Landing
