import React from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const Contact = () => {
  useWindowScrollToTop();
  return (
    <>
      <Banner title="Contact Us" />
      <Container className="py-5">
        <Row>
          <Col md={6} className="mb-5">
            <h2 style={{color: '#0f3460'}}>Get in Touch</h2>
            <p>Have questions about a prescription or an order? We are here to help.</p>
            
            <div className="mt-4">
                <h5>📍 Visit Us</h5>
                <p>2,3,4,5 Guide Plaza, Alaja Road, Megida-Ipaja Lagos NG</p>
            </div>
            
            <div className="mt-4">
                <h5>📞 Call Us</h5>
                <p>0816 394 3804</p>
            </div>

            <div className="mt-4">
                <h5>💬 WhatsApp</h5>
                <p>+234 816 394 3804</p>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="p-4" style={{background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', borderRadius: '10px'}}>
                <h4 className="mb-3">Send a Message</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="How can we help?" />
                    </Form.Group>
                    <Button variant="primary" style={{background:'#0f3460', border:'none'}} type="submit">
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
