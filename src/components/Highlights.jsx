import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Highlight from './ui/Highlight'

const Highlights = () => {
  return (
    <section id="highlights">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Why choose <span className="blue">Vinyl Fresh?</span>
          </h2>
          <div className="highlight__wrapper">
            <Highlight 
            icon={<FontAwesomeIcon icon="bolt"/>} 
            title="Easy and quick"
            para="Get your vinyl shipped to you in 2 weeks!"
            />
            <Highlight 
            icon={<FontAwesomeIcon icon="record-vinyl"/>} 
            title="10,000+ vinyls"
            para="Vinyl Fresh has vinyls in all your favourite categories"
            />
            <Highlight 
            icon={<FontAwesomeIcon icon="tags"/>} 
            title="Affordable"
            para="Get your hand on popular vinyls for as little as $20!"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights
