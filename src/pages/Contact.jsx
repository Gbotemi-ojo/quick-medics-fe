import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const Contact = () => {
  useWindowScrollToTop();
  
  // QuickMedics Theme Colors
  const theme = {
    primary: '#5bb318',      // Lime Green
    bgLight: '#f0fff4',      // Mint Cream
    textDark: '#2d3436',     // Soft Black
    textGray: '#636e72',     // Soft Gray
    shadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '#e2e8f0'
  };

  return (
    <>
      <Banner title="Contact Us" />
      <Container className="py-5">
        
        {/* TOP SECTION: Contact Info & Form */}
        <Row className="g-5 align-items-center mb-5">
          
          {/* Left Side: Contact Info */}
          <Col lg={5} md={6}>
            <div className="mb-4">
              <h2 style={{color: theme.primary, fontWeight: '700'}}>Get in Touch</h2>
              <p style={{color: theme.textGray, fontSize: '18px'}}>
                Have questions about a prescription or an order? We are here to help 24/7.
              </p>
            </div>

            {/* Info Cards */}
            <div className="d-flex align-items-start mb-4 p-3" style={{ background: theme.bgLight, borderRadius: '15px' }}>
              <div style={{fontSize: '25px', marginRight: '15px'}}>📍</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark, marginBottom: '5px'}}>Our Addresses</h5>
                 <p style={{color: theme.textGray, marginBottom: "8px", fontSize: "15px"}}><strong>Branch 1:</strong> 2,3,4,5 Guide Plaza, Alaja Road, Megida-Ipaja Lagos NG</p>
                 <p style={{color: theme.textGray, marginBottom: 0, fontSize: "15px"}}><strong>Branch 2:</strong> After King Emmanuel college, Igeshu road, Bada, Ayobo, Lagos 100278, Lagos</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4 p-3" style={{ background: theme.bgLight, borderRadius: '15px' }}>
              <div style={{fontSize: '25px', marginRight: '15px'}}>📞</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark, marginBottom: '5px'}}>Call Us</h5>
                 <p style={{color: theme.textGray, marginBottom: 0, fontSize: "15px"}}>0816 394 3804, 0811 353 9265</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4 p-3" style={{ background: theme.bgLight, borderRadius: '15px' }}>
              <div style={{fontSize: '25px', marginRight: '15px'}}>✉️</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark, marginBottom: '5px'}}>Email Us</h5>
                 <p style={{color: theme.textGray, marginBottom: 0, fontSize: "15px"}}>
                   <a href="mailto:admin@quickmedics.ng" style={{textDecoration: 'none', color: theme.textGray}}>admin@quickmedics.ng</a>
                 </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4 p-3" style={{ background: theme.bgLight, borderRadius: '15px' }}>
              <div style={{fontSize: '25px', marginRight: '15px'}}>💬</div>
              <div>
                 <h5 style={{fontWeight: '600', color: theme.textDark, marginBottom: '5px'}}>WhatsApp</h5>
                 <p style={{color: theme.textGray, marginBottom: 0, fontSize: "15px"}}>+234 816 394 3804</p>
              </div>
            </div>
          </Col>
          
          {/* Right Side: Message Form */}
          <Col lg={7} md={6}>
            <div 
              className="p-4 p-md-5" 
              style={{
                background: '#fff', 
                boxShadow: theme.shadow, 
                borderRadius: '20px',
                border: `1px solid ${theme.border}`
              }}
            >
                <h4 className="mb-4" style={{fontWeight: '700', color: theme.textDark}}>Send a Message</h4>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-4">
                                <Form.Label style={{fontWeight: '500', color: theme.textGray}}>Full Name</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  placeholder="Your name" 
                                  style={{borderRadius: '10px', padding: '12px', border: `1px solid ${theme.border}`}} 
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-4">
                                <Form.Label style={{fontWeight: '500', color: theme.textGray}}>Email Address</Form.Label>
                                <Form.Control 
                                  type="email" 
                                  placeholder="name@example.com" 
                                  style={{borderRadius: '10px', padding: '12px', border: `1px solid ${theme.border}`}} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-4">
                        <Form.Label style={{fontWeight: '500', color: theme.textGray}}>Message</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={5} 
                          placeholder="How can we help?" 
                          style={{borderRadius: '10px', padding: '12px', border: `1px solid ${theme.border}`}} 
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
                        fontSize: '16px',
                        fontWeight: '600',
                        width: '100%'
                      }}
                    >
                        Send Message
                    </Button>
                </Form>
            </div>
          </Col>
        </Row>

        {/* BOTTOM SECTION: Maps */}
        <div className="mt-5 pt-5 border-top">
          <div className="text-center mb-5">
            <h3 style={{fontWeight: '700', color: theme.textDark}}>Visit Our Branches</h3>
            <p style={{color: theme.textGray}}>Find the QuickMedics location nearest to you.</p>
          </div>

          <Row className="g-4">
            {/* Map 1 */}
            <Col md={6}>
              <div style={{ background: '#fff', borderRadius: '15px', padding: '15px', boxShadow: theme.shadow }}>
                <h5 style={{fontWeight: '600', color: theme.textDark, marginBottom: '15px'}}>📍 Megida-Ipaja Branch</h5>
                <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15853.859412681883!2d3.2215725!3d6.5889967!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9b9de8987645%3A0x12833af2c178119f!2sQuickMedics%20Pharmacy%20Limited!5e0!3m2!1sen!2sng!4v1768666065353!5m2!1sen!2sng" 
                    width="100%" 
                    height="350" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="QuickMedics Location 1"
                  ></iframe>
                </div>
              </div>
            </Col>

            {/* Map 2 */}
            <Col md={6}>
              <div style={{ background: '#fff', borderRadius: '15px', padding: '15px', boxShadow: theme.shadow }}>
                <h5 style={{fontWeight: '600', color: theme.textDark, marginBottom: '15px'}}>📍 Ayobo Branch</h5>
                <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d18974.53250482795!2d3.224866421516606!3d6.598970452916427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x103b910118203c7b%3A0x8c0d2e1f15066ac2!2sQUICKMEDICS%20PHARMACY%20LIMITED%2C%20After%20King%20Emmanuel%20college%2C%20Igeshu%20road%2C%20Bada%2C%20Ayobo%2C%20Lagos%20100278%2C%20Lagos!3m2!1d6.579625999999999!2d3.2310958!5e0!3m2!1sen!2sng!4v1773922475837!5m2!1sen!2sng" 
                    width="100%" 
                    height="350" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="QuickMedics Location 2"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </>
  );
}

export default Contact;
