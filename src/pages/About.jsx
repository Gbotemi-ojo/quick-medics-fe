import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const About = () => {
  useWindowScrollToTop();
  return (
    <>
      <Banner title="About Us" />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <h2 className="mb-4" style={{color: '#0f3460'}}>Dedicated to Your Wellness</h2>
            <p className="lead">
              Quick Medics is more than just a pharmacy; we are your partners in health. 
              Founded with the mission to bridge the gap between quality healthcare and accessibility, 
              we ensure that genuine medications and expert advice are always within your reach.
            </p>
            <p>
              Located in the heart of Lagos, we combine the convenience of modern e-commerce 
              with the trust of a neighborhood pharmacy. Whether you need prescription fulfillment, 
              over-the-counter essentials, or wellness supplements, we guarantee authenticity 
              and rapid delivery.
            </p>
            
            <div className="my-5 p-4" style={{background: '#f6f9fc', borderRadius: '10px'}}>
                <h4 style={{color: '#0f3460'}}>Our Promise</h4>
                <ul style={{listStyle: 'none', paddingLeft: 0, marginTop: '20px'}}>
                    <li className="mb-2">✅ <strong>100% Genuine Products:</strong> Sourced directly from manufacturers.</li>
                    <li className="mb-2">✅ <strong>Expert Guidance:</strong> Licensed pharmacists available for consultation.</li>
                    <li className="mb-2">✅ <strong>Fast Delivery:</strong> Getting your meds to you when you need them.</li>
                </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
