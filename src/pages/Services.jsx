import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const Services = () => {
  useWindowScrollToTop();
  const services = [
    { title: "Prescription Assistance", desc: "Upload your prescription or consult with us to get your exact medication dispensed accurately." },
    { title: "Wellness Consultations", desc: "Speak with our licensed pharmacists about vitamins, supplements, and general health advice." },
    { title: "Rapid Delivery", desc: "We offer same-day delivery within Lagos for urgent medical needs." },
    { title: "Bulk Supply", desc: "We supply clinics and hospitals with authentic pharmaceuticals at competitive rates." },
  ];

  return (
    <>
      <Banner title="Our Services" />
      <Container className="py-5">
        <Row>
          {services.map((s, idx) => (
            <Col md={6} className="mb-4" key={idx}>
               <Card className="h-100 shadow-sm" style={{border: 'none'}}>
                 <Card.Body className="p-4">
                    <h4 style={{color: '#0f3460'}}>{s.title}</h4>
                    <Card.Text>{s.desc}</Card.Text>
                 </Card.Body>
               </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Services;
