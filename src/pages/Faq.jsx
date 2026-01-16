import React from 'react';
import { Container, Accordion } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const Faq = () => {
  useWindowScrollToTop();
  return (
    <>
      <Banner title="Frequently Asked Questions" />
      <Container className="py-5" style={{maxWidth: '800px'}}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do I place an order?</Accordion.Header>
            <Accordion.Body>
              Simply browse our shop, add items to your cart, and click checkout. You will be redirected to WhatsApp to complete your payment and confirm delivery details with our agent.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Are your drugs authentic?</Accordion.Header>
            <Accordion.Body>
              Yes, 100%. We source all our medications directly from manufacturers and authorized distributors in Nigeria.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Do you deliver outside Lagos?</Accordion.Header>
            <Accordion.Body>
              Currently, we focus on Lagos for rapid delivery, but we can arrange interstate logistics for bulk orders. Please contact us for details.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Can I return a product?</Accordion.Header>
            <Accordion.Body>
              Due to health and safety regulations, we cannot accept returns on opened medications. Please see our Returns Policy page for more details.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}

export default Faq;
