import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../app/features/auth/authSlice";
import { toast } from "react-toastify";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { EXTERNAL_API_URL } from "../api";
const API_URL = `${EXTERNAL_API_URL}/auth`;

const Register = () => {
  useWindowScrollToTop();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        dispatch(loginSuccess(data)); // Auto login
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: "100%", maxWidth: "450px", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#0f3460" }}>Create Account</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="08012345678"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" disabled={loading} style={{ background: "#0f3460", border: "none", padding: "10px" }}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <small className="text-muted">Already have an account? <Link to="/login" style={{color: '#0f3460', fontWeight:'bold'}}>Login</Link></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
