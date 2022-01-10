import React from 'react'
import Vinyl from './ui/Vinyl'
import { vinyls } from '../data'

const Discounted = () => {
  return (
    <section id="recent">
      <div className="row">
        <h2 className="section__title">
          Discount <span className="blue">Vinyls</span>
        </h2>
        <div className="vinyls">
          {vinyls.filter(vinyl => vinyl.salePrice > 0)
          .slice(0, 8)
          .map(vinyl => {
            return <Vinyl 
            vinylInfo={vinyl} 
            key={vinyl.id} 
            />
        })}
        </div>
      </div>
    </section>
  )
}

export default Discounted
