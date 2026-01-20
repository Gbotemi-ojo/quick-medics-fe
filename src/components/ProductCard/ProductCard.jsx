import { Col } from "react-bootstrap";
import "./product-card.css"; // Ensure you use the CSS update below
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handelAdd = (e, productItem) => {
    e.stopPropagation();
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Added to cart!");
  };

  return (
    // changed cols to make grid tighter: md={3} is 4 per row
    <Col lg={3} md={4} sm={6} xs={6} className="mb-4">
      <div className="product-card-modern" onClick={handelClick}>
        {productItem.discount > 0 && (
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
            <h3 className="title" title={productItem.productName}>{productItem.productName}</h3>
            
            <div className="price-row">
                <span className="price">₦{Number(productItem.price).toLocaleString()}</span>
            </div>

            <button
                className="add-to-cart-btn"
                onClick={(e) => handelAdd(e, productItem)}
            >
                <ion-icon name="cart-outline" style={{marginRight:'5px'}}></ion-icon> Add to cart
            </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
