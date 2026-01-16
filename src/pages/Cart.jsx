import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PaystackButton } from "react-paystack"; 
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToCart, decreaseQty, deleteProduct, clearCart } from "../app/features/cart/cartSlice";
import { verifyPayment, getPaystackKey } from "../api"; 
import "./cart.css"; 

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(""); 
  const [paystackKey, setPaystackKey] = useState(""); 

  useEffect(() => {
    if (user) {
        setEmail(user.email);
        setName(user.name);
        setPhone(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchKey = async () => {
        try {
            const key = await getPaystackKey();
            setPaystackKey(key);
        } catch (error) {
            console.error("Key Error:", error);
        }
    };
    fetchKey();
  }, []);

  const totalPrice = cartList.reduce((price, item) => price + item.qty * item.price, 0);

  const handleSuccess = async (referenceObj) => {
    // Robustly extract reference string
    const refString = referenceObj.reference || referenceObj.trxref || referenceObj;
    console.log(">>> Paystack Success! Ref:", refString);
    
    toast.info("Processing order...");

    const payload = {
        reference: refString,
        cartItems: cartList,
        address: address,
        user: user || null,
        guestDetails: user ? null : { name, email, phone }
    };

    try {
        const result = await verifyPayment(payload);
        console.log(">>> Backend Result:", result);
        
        if (result.success) {
            dispatch(clearCart());
            toast.success("Order Placed Successfully!");
        } else {
            toast.error("Order creation failed.");
        }
    } catch (error) {
        console.error(">>> Order Error:", error);
        toast.error("Network error while creating order.");
    }
  };

  const handleClose = () => toast.info("Payment cancelled.");

  const componentProps = {
    email,
    amount: totalPrice * 100,
    metadata: { name, phone, address },
    publicKey: paystackKey,
    text: `Pay ₦${totalPrice.toLocaleString()}`,
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  const isValid = email && name && phone && address && paystackKey;

  return (
    <section className="cart-page-wrapper py-5">
      <Container>
        {cartList.length === 0 ? (
          <div className="empty-cart-container">
             <div style={{ color: '#0f3460', marginBottom: '20px' }}>
                <i className="fa-solid fa-basket-shopping fa-4x"></i>
             </div>
             <h2 className="mb-3 fw-bold">Your Cart is Empty</h2>
             <p className="text-muted mb-4">Looks like you haven't made your choice yet.</p>
             <Link to="/shop">
                <Button variant="primary" size="lg" style={{background: '#0f3460', border: 'none', padding: '12px 35px', borderRadius: '30px'}}>
                    Start Shopping
                </Button>
             </Link>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8} md={7}>
               <h4 className="mb-4 fw-bold text-dark">Shopping Cart ({cartList.length})</h4>
               {cartList.map((item) => (
                  <div className="cart-item-card p-3" key={item.id}>
                    <Row className="align-items-center">
                      <Col xs={3} sm={2}>
                        <div className="cart-img-wrapper">
                            <img src={item.imgUrl} alt={item.productName} />
                        </div>
                      </Col>
                      <Col xs={9} sm={10}>
                         <Row className="align-items-center h-100">
                             <Col md={5} className="mb-2 mb-md-0">
                                 <div className="product-title">{item.productName}</div>
                                 <div className="unit-price">₦{item.price.toLocaleString()} / unit</div>
                             </Col>
                             <Col md={3} className="mb-2 mb-md-0 d-flex justify-content-start justify-content-md-center">
                                 <div className="qty-control-group">
                                     <button className="qty-btn" onClick={() => dispatch(decreaseQty(item))}>
                                        <i className="fa-solid fa-minus"></i>
                                     </button>
                                     <span className="qty-display">{item.qty}</span>
                                     <button className="qty-btn" onClick={() => dispatch(addToCart({product:item, num:1}))}>
                                        <i className="fa-solid fa-plus"></i>
                                     </button>
                                 </div>
                             </Col>
                             <Col md={4} className="d-flex justify-content-between align-items-center justify-content-md-end">
                                 <div className="total-price me-3">₦{(item.price * item.qty).toLocaleString()}</div>
                                 <Button variant="link" className="remove-btn p-0" onClick={() => dispatch(deleteProduct(item))}>
                                     <i className="fa-regular fa-trash-can"></i>
                                 </Button>
                             </Col>
                         </Row>
                      </Col>
                    </Row>
                  </div>
               ))}
            </Col>
            <Col lg={4} md={5}>
              <div className="checkout-card">
                <div className="checkout-header">
                    <h5 className="mb-0 fw-bold"><i className="fa-solid fa-lock me-2"></i> Secure Checkout</h5>
                </div>
                <div className="checkout-body">
                    <div className="summary-row"><span>Subtotal</span><span className="fw-bold text-dark">₦{totalPrice.toLocaleString()}.00</span></div>
                    <div className="summary-row"><span>Delivery Fee</span><span className="text-success" style={{fontSize: '0.9em'}}>Calculated at next step</span></div>
                    <div className="total-row"><span>Total</span><span style={{color: '#0f3460'}}>₦{totalPrice.toLocaleString()}</span></div>

                    <div className="checkout-form">
                        <h6 className="mb-3 text-uppercase small fw-bold text-muted" style={{letterSpacing:'1px'}}>Shipping Details</h6>
                        <FloatingLabel controlId="floatingName" label="Full Name" className="form-label-group"><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} /></FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email Address" className="form-label-group"><Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></FloatingLabel>
                        <FloatingLabel controlId="floatingPhone" label="Phone Number" className="form-label-group"><Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></FloatingLabel>
                        <FloatingLabel controlId="floatingAddress" label="Delivery Address" className="form-label-group"><Form.Control as="textarea" style={{ height: '80px' }} value={address} onChange={(e) => setAddress(e.target.value)} /></FloatingLabel>

                        <div className="mt-4">
                            {isValid ? <PaystackButton className="pay-btn" {...componentProps} /> : <button className="pay-btn" disabled>{!paystackKey ? "Connecting..." : "Fill Details to Pay"}</button>}
                        </div>
                        <div className="secure-badge"><i className="fa-solid fa-shield-halved"></i><span>Secured by <strong>Paystack</strong></span></div>
                    </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Cart;
