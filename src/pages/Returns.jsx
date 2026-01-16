import React from 'react';
import { Container } from "react-bootstrap";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner";

const Returns = () => {
  useWindowScrollToTop();
  return (
    <>
      <Banner title="Shipping & Returns" />
      <Container className="py-5">
        <h3>Delivery Policy</h3>
        <p>We aim to process all orders within 24 hours. Delivery fees are calculated based on your location in Lagos.</p>
        
        <hr className="my-4"/>

        <h3>Return Policy</h3>
        <p><strong>Perishables & Medications:</strong> For safety reasons, we do not accept returns on prescription drugs or perishable goods unless the item received was incorrect or damaged upon arrival.</p>
        <p><strong>Damaged Items:</strong> If you receive a damaged product, please contact us within 24 hours with a photo of the item.</p>
      </Container>
    </>
  );
}

export default Returns;
