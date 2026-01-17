import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const Contact = () => {
  useWindowScrollToTop();
  
  // Quick Medics Theme Colors
  const theme = {
    primary: '#5bb318',      // Lime Green
    bgLight: '#f0fff4',      // Mint Cream
    textDark: '#2d3436',     // Soft Black
    textGray: '#636e72',     // Soft Gray
    shadow: '0 10px 30px rgba(0,0,0,0.05)'
  };

  return (
    <>
      <Banner title="Contact Us" />
      <Container className="py-5">
        <Row className="g-5"> {/* g-5 adds spacing between columns */}
          
          {/* Left Side: Contact Info & Map */}
          <Col md={6}>
            <div className="mb-5">
              <h2 style={{color: theme.primary, fontWeight: '700'}}>Get in Touch</h2>
              <p style={{color: theme.textGray, fontSize: '18px'}}>
                Have questions about a prescription or an order? We are here to help 24/7.
              </p>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div style={{fontSize: '25px', marginRight: '15px'}}>📍</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark}}>Visit Us</h5>
                 <p style={{color: theme.textGray}}>2,3,4,5 Guide Plaza, Alaja Road, Megida-Ipaja Lagos NG</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div style={{fontSize: '25px', marginRight: '15px'}}>📞</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark}}>Call Us</h5>
                 <p style={{color: theme.textGray}}>0816 394 3804</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-5">
              <div style={{fontSize: '25px', marginRight: '15px'}}>💬</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark}}>WhatsApp</h5>
                 <p style={{color: theme.textGray}}>+234 816 394 3804</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: theme.shadow }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15853.859412681883!2d3.2215725!3d6.5889967!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9b9de8987645%3A0x12833af2c178119f!2sQuickMedics%20Pharmacy%20Limited!5e0!3m2!1sen!2sng!4v1768666065353!5m2!1sen!2sng" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Quick Medics Location"
              ></iframe>
            </div>
          </Col>
          
          {/* Right Side: Message Form */}
          <Col md={6}>
            <div 
              className="p-5" 
              style={{
                background: '#fff', 
                boxShadow: theme.shadow, 
                borderRadius: '20px',
                border: `1px solid ${theme.bgLight}`
              }}
            >
                <h4 className="mb-4" style={{fontWeight: '700', color: theme.textDark}}>Send a Message</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '500'}}>Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Your name" 
                          style={{borderRadius: '10px', padding: '12px'}} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '500'}}>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="name@example.com" 
                          style={{borderRadius: '10px', padding: '12px'}} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '500'}}>Message</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={4} 
                          placeholder="How can we help?" 
                          style={{borderRadius: '10px', padding: '12px'}} 
                        />
                    </Form.Group>
                    <Button 
                      variant="primary" 
                      type="submit"
                      style={{
                        background: theme.primary, 
                        border: 'none', 
                        padding: '12px 30px', 
                        borderRadius: '50px',
                        fontSize: '18px',
                        fontWeight: '600',
                        width: '100%',
                        marginTop: '10px'
                      }}
                    >
                        Send Message
                    </Button>
                </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contact;
