import React from "react"
import { Container } from "react-bootstrap"
import "./slidercard.css"

const SlideCard = ({ title, desc, cover }) => {
  return (
    <div className='box' style={{ backgroundImage: `url(${cover})` }}>
      <div className="gradient-overlay"></div>
      
      {/* Container keeps the text aligned with your Logo/Header */}
      <Container>
        <div className="slide-content">
            <h1 className="slide-title">{title}</h1>
            <p className="slide-desc">{desc}</p>
            <button className='btn-primary'>SHOP NOW</button>
        </div>
      </Container>
    </div>
  )
}

export default SlideCard
