import React from 'react'
import { Link } from 'react-router-dom'

const Explore = () => {
  return (
    <section id="explore">
      <div className="container">
        <div className="row row__clumn">
          <h2>
            Explore more <span className="ble">Vinyls</span>
          </h2>
          <Link to="/vinyls">
            <button className="btn"></button>Explore vinyls
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Explore
