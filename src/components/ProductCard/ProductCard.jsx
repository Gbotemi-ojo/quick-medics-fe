import { Col } from "react-bootstrap";
import "./product-card.css";
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
    e.stopPropagation(); // Prevents navigating to product page when clicking "Add"
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {productItem.discount ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imgUrl}
        alt=""
        style={{ cursor: "pointer" }}
      />
      
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        
        <div className="price">
          <h4>₦{Number(productItem.price).toLocaleString()}</h4>
          <button
            aria-label="Add"
            type="button" 
            className="add"
            onClick={(e) => handelAdd(e, productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
