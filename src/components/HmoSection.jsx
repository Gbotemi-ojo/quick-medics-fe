import React from "react";
import { Container } from "react-bootstrap";
import Ileraeko from "../Images/ileraeko.png";
import Pharmarun from "../Images/PHARMARUN.svg";
const HmoSection = () => {
  // Replace these paths with your actual HMO logos
  const hmos = [
    { id: 1, name: "Ileraeko", logo: Ileraeko }, // Put images in public/Images
    { id: 2, name: "PHARMARUN", logo: Pharmarun },
  ];

  return (
    <section style={{ padding: "60px 0", backgroundColor: "#f9fcf9" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 style={{ fontWeight: "800", color: "#1a1a1a", marginBottom: "10px" }}>
            We Accept HMOs
          </h2>
          <p style={{ color: "#666" }}>Your health insurance is welcome here.</p>
          <div style={{ width: "50px", height: "3px", background: "#5bb318", margin: "0 auto" }}></div>
        </div>

        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "50px", 
            flexWrap: "wrap",
            alignItems: "center" 
        }}>
          {hmos.map((hmo) => (
            <div 
                key={hmo.id} 
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    width: "250px",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #eee"
                }}
            >
              <img 
                src={hmo.logo} 
                alt={hmo.name} 
                style={{ 
                    maxWidth: "100%", 
                    maxHeight: "80px", 
                    objectFit: "contain" 
                }} 
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HmoSection;
