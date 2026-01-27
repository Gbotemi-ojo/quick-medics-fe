import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShopList from "./ShopList"; // We reuse the grid from your Shop page

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ backgroundColor: bgColor, padding: "60px 0" }}>
      <Container>
        
        {/* --- Header: Title Left, See All Right --- */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          
          {/* Title Section */}
          <div>
            <h2 style={{ 
                fontWeight: "800", 
                color: "#1a1a1a", 
                marginBottom: "8px", 
                textTransform: "capitalize" 
            }}>
              {title}
            </h2>
            {/* Green Underline */}
            <div style={{ width: "60px", height: "4px", background: "#5bb318", borderRadius: "2px" }}></div>
          </div>

          {/* See All Button */}
          <Link 
            to={`/shop?category=${encodeURIComponent(title.toLowerCase())}`} 
            className="see-all-btn"
            style={{
                textDecoration: "none",
                color: "#5bb318",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                paddingBottom: "5px" // Align visually with text
            }}
          >
            See All <i className="fa fa-arrow-right"></i>
          </Link>
        </div>

        {/* --- Product Grid --- */}
        {/* We use ShopList to ensure cards look identical to the Shop Page */}
        <ShopList productItems={productItems} />

      </Container>
      
      {/* CSS for Arrow Animation */}
      <style>{`
        .see-all-btn:hover {
            gap: 15px !important; /* Moves arrow to the right on hover */
            color: #448a12 !important;
        }
      `}</style>
    </section>
  );
};

export default Section;