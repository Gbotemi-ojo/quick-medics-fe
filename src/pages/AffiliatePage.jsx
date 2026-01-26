import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Affiliate.css"; 

// Use your actual WhatsApp number here
const WHATSAPP_NUMBER = "2348163943804"; 
const PREFILLED_MSG = encodeURIComponent("Hello QuickMedics, I am interested in becoming an Affiliate Partner. Please tell me more!");

const AffiliatePage = () => {
  return (
    <section className="affiliate-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            
            {/* --- Header --- */}
            <div className="text-center mb-5">
              <span className="badge-pill">Partner Program</span>
              <h1 className="section-title mt-3">Become a QuickMedics Affiliate</h1>
              <p className="text-muted subtitle-text">
                Join our network of health advocates. Promote authentic healthcare services and earn attractive commissions for every successful referral.
              </p>
              <div className="green-line"></div>
            </div>

            {/* --- Benefits Grid --- */}
            <Row className="mb-5 gx-4 gy-4">
                <Col sm={6}>
                    <div className="benefit-card">
                        <div className="icon-box">💰</div>
                        <h4>Earn Commissions</h4>
                        <p>Get paid for every customer who purchases through your referral.</p>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className="benefit-card">
                        <div className="icon-box">🏥</div>
                        <h4>Authentic Drugs</h4>
                        <p>Partner with a trusted pharmacy. We only sell genuine medications.</p>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className="benefit-card">
                        <div className="icon-box">🚀</div>
                        <h4>Marketing Support</h4>
                        <p>We provide banners and texts to help you promote effectively.</p>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className="benefit-card">
                        <div className="icon-box">🤝</div>
                        <h4>Easy Onboarding</h4>
                        <p>No complicated forms. Just chat with us to get started immediately.</p>
                    </div>
                </Col>
            </Row>

            {/* --- Call to Action --- */}
            <div className="cta-card text-center">
                <h3>Ready to start earning?</h3>
                <p>Click the button below to chat with our Affiliate Manager on WhatsApp.</p>
                
                <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILLED_MSG}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="whatsapp-btn"
                >
                    <i className="fa fa-whatsapp" style={{fontSize: '1.2rem'}}></i>
                    Chat with us to Join
                </a>
            </div>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AffiliatePage;
