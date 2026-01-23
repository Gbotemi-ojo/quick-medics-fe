import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import "./PartnerSlider.css";
import elbeLogo from "../Images/elbe-logo.png";
import Geneith_pharmaceuticals from "../Images/Geneith_Pharmaceuticals_Logo.png";
import Greenlife_pharma from "../Images/Greenlife Pharmaceutical logo.png";
import HealthpathNatural from "../Images/Healthpath Natural logo.svg";
import SeaGreen from "../Images/Seagreen Pharmaceuticals Ltd.jpg";
import Yornna from "../Images/YORNNA logo.jpg";
const PartnerSlider = () => {
  // Placeholder logos - Replace these URLs with your actual partner logo images later
  const partners = [
    { id: 1, name: "Elbe", logo: elbeLogo },
    { id: 2, name: "Geneith Pharmaceuticals", logo: Geneith_pharmaceuticals },
    { id: 3, name: "Greenlife Pharmaceutical", logo: Greenlife_pharma },
    { id: 4, name: "Healthpath Natural", logo: HealthpathNatural },
    { id: 5, name: "SeaGreen", logo: SeaGreen },
    { id: 6, name: "Yornna", logo: Yornna },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5, // Show 5 logos at a time on desktop
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <section className="partner-section">
      <Container>
        <div className="heading text-center mb-4">
          <h2>Our Trusted Partners</h2>
          <div className="heading-line"></div>
        </div>
        <Slider {...settings}>
          {partners.map((val) => (
            <div key={val.id} className="partner-logo-box">
              <img src={val.logo} alt={val.name} className="partner-img" />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default PartnerSlider;
