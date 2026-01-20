import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./home.css"
import { SliderData } from "../utils/products"

// --- Custom Arrow Components ---
const NextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn next' onClick={onClick}>
      <button>
        <i className='fa fa-chevron-right'></i>
      </button>
    </div>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn prev' onClick={onClick}>
      <button>
        <i className='fa fa-chevron-left'></i>
      </button>
    </div>
  )
}

const SliderHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true, // Enabled arrows
    nextArrow: <NextArrow />, // Use custom Next button
    prevArrow: <PrevArrow />, // Use custom Prev button
  }

  return (
    <section className='hero-slider'>
        <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <div className="hero-slide-item" key={index}>
                  <img src={value.cover} alt={value.title} className="hero-img" />
                  
                  <div className="hero-overlay"></div>
                  
                  <div className="hero-content">
                      <h1>{value.title}</h1>
                      <p>{value.desc}</p>
                      <button className="hero-btn">Shop Now</button>
                  </div>
              </div>
            )
          })}
        </Slider>
    </section>
  )
}

export default SliderHome
