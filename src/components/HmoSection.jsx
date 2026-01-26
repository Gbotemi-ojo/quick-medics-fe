import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Ileraeko from "../Images/ileraeko.png";
import Pharmarun from "../Images/PHARMARUN.svg";
// import MaishamedsLogo from "../Images/maishameds.png"; 

// Shared Card Style for Consistency
const cardStyle = {
    background: "white",
    width: "180px", // Compact width
    height: "100px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #eee",
    padding: "15px"
};

const imgStyle = {
    maxWidth: "100%",
    maxHeight: "60px",
    objectFit: "contain"
};

const HmoSection = () => {
  const hmos = [
    { id: 1, name: "Ileraeko", logo: Ileraeko },
    { id: 2, name: "PHARMARUN", logo: Pharmarun },
  ];

  const techPartners = [
    { id: 1, name: "Paystack", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Paystack.png" },
    { id: 2, name: "Maishameds", logo: "https://maishameds.org/wp-content/uploads/2023/07/urn_aaid_sc_US_f28be5bd-95de-4ecd-94ee-aa19ac696bae-27.png", invert: true },
  ];

  return (
    <section style={{ padding: "40px 0", backgroundColor: "#f9fcf9", borderTop: "1px solid #eee" }}>
      <Container>
        <Row className="gy-5"> {/* gy-5 adds vertical gap on mobile if they stack */}
            
            {/* LEFT COLUMN: Technical Partners */}
            <Col md={6} className="text-center" style={{ borderRight: "1px solid #eee" }}> {/* Optional border separator */}
                <h3 style={{ fontWeight: "700", color: "#1a1a1a", fontSize: "1.5rem", marginBottom: "5px" }}>
                    Technical Partners
                </h3>
                <div style={{ width: "40px", height: "3px", background: "#5bb318", margin: "0 auto 25px auto" }}></div>

                <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                    {techPartners.map((val) => (
                        <div key={val.id} style={cardStyle}>
                            <img 
                                src={val.logo} 
                                alt={val.name} 
                                style={{
                                    ...imgStyle,
                                    filter: val.invert ? "invert(1) brightness(0)" : "none"
                                }} 
                            />
                        </div>
                    ))}
                </div>
            </Col>

            {/* RIGHT COLUMN: HMOs */}
            <Col md={6} className="text-center">
                <h3 style={{ fontWeight: "700", color: "#1a1a1a", fontSize: "1.5rem", marginBottom: "5px" }}>
                    We Accept HMOs
                </h3>
                <div style={{ width: "40px", height: "3px", background: "#5bb318", margin: "0 auto 25px auto" }}></div>

                <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                    {hmos.map((hmo) => (
                        <div key={hmo.id} style={cardStyle}>
                            <img src={hmo.logo} alt={hmo.name} style={imgStyle} />
                        </div>
                    ))}
                </div>
            </Col>

        </Row>
      </Container>
    </section>
  );
};

export default HmoSection;
