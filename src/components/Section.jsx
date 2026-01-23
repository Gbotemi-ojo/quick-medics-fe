import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor, padding: "60px 0" }}>
      <Container>
        {/* Premium Header Styling */}
        <div className="text-center" style={{ marginBottom: "50px" }}>
          <h2 style={{ 
              fontSize: "2.5rem", 
              fontWeight: "800", 
              color: "#1a1a1a", 
              textTransform: "capitalize",
              marginBottom: "15px",
              letterSpacing: "-0.5px"
          }}>
            {title}
          </h2>
          {/* Signature Green Line */}
          <div style={{ 
              width: "70px", 
              height: "4px", 
              background: "#5bb318", 
              borderRadius: "2px", 
              margin: "0 auto" 
          }}></div>
        </div>

        {/* Product Grid */}
        <Row className="justify-content-center">
          {productItems.map((productItem) => {
            return (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
