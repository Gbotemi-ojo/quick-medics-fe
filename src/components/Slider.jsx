import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import SlideCard from "./SliderCard/SlideCard"
import { fetchBanners } from "../api" // Correct relative import to src/api.js
import "./home.css" // Ensure you have the button styles here

// --- Custom Navigation Arrows ---
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
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const loadSlides = async () => {
        const data = await fetchBanners();
        if (data.length > 0) {
            // Map DB format to Slider format
            const mapped = data.map(b => ({
                id: b.id,
                title: b.title,
                desc: b.description,
                cover: b.imageUrl // Uses Cloudinary URL
            }));
            setSlides(mapped);
        } else {
            // Fallback if no banners in DB
            setSlides([
                {
                    id: 1,
                    title: "Welcome to Quick Medics",
                    desc: "Your health, our priority.",
                    cover: "https://via.placeholder.com/1600x500?text=Welcome"
                }
            ]);
        }
    };
    loadSlides();
  }, []);

  const settings = {
    nav: true, // Enable navigation
    dots: true, // Enable dots at bottom
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true, // Enable arrows
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
  }

  // NOTE: No <Container> wrapper here, allowing the slider to go full width
  return (
      <section className='homeSlide'>
          <Slider {...settings}>
            {slides.map((value, index) => {
              return (
                <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
              )
            })}
          </Slider>
      </section>
  )
}

export default SliderHome
