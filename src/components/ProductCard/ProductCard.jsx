import { Col } from "react-bootstrap";
import "./product-card.css"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice"; 

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Added to cart!");
  };

  const hasDiscount = productItem.discount > 0;
  const originalPrice = hasDiscount 
    ? productItem.price / (1 - productItem.discount / 100)
    : 0;

  return (
    <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
      <div className="product-card-modern" onClick={handleClick}>
        
        {hasDiscount && (
          <span className="badge-discount">-{productItem.discount}%</span>
        )}
        
        <div className="img-container">
            <img
            loading="lazy"
            src={productItem.imgUrl}
            alt={productItem.productName}
            />
        </div>
        
        <div className="product-info">
            <h3 className="title" title={productItem.productName}>
                {productItem.productName}
            </h3>
            {productItem.activeIngredient && (
                <div style={{fontSize: "0.85rem", color: "#888", marginBottom: "8px", fontWeight: "300"}}>
                    API: {productItem.activeIngredient}
                </div>
            )}
            
            <div className="price-row">
                <span className="price">
                    ₦{Number(productItem.price).toLocaleString()}
                </span>
                {hasDiscount && (
                    <span className="original-price">
                        ₦{Number(originalPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                )}
            </div>

            <button
                className="add-to-cart-btn"
                onClick={handleAdd}
            >
                <i className="fa fa-shopping-cart"></i> Add to cart
            </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;