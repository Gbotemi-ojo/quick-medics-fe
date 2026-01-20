import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../app/features/auth/authSlice";
import { toast } from "react-toastify";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { loginUser, requestPasswordReset, confirmPasswordReset, googleLogin } from "../api";
import { GoogleLogin } from '@react-oauth/google'; // <--- Import

const Login = () => {
  useWindowScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [view, setView] = useState("LOGIN");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");
  const [resetData, setResetData] = useState({ otp: "", newPassword: "", confirmPassword: "" });

  // 1. HANDLE LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(loginData.email, loginData.password);
      if (data.success || data.token) {
        dispatch(loginSuccess(data));
        toast.success("Welcome back!");
        navigate(-1); 
      }
    } catch (error) {
      toast.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // NEW: HANDLE GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
        const data = await googleLogin(credentialResponse.credential);
        
        if (data.success) {
            dispatch(loginSuccess(data));
            toast.success("Logged in with Google!");
            navigate(-1);
        } else {
            toast.error("Google Login failed");
        }
    } catch (error) {
        toast.error("Google Login Error");
    } finally {
        setLoading(false);
    }
  };

  // 2. HANDLE FORGOT PASSWORD
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await requestPasswordReset(resetEmail);
      setMessage({ type: "success", text: `OTP code sent to ${resetEmail}` });
      setResetData({ otp: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => { setMessage(null); setView("RESET"); }, 1500);
    } catch (error) {
      setMessage({ type: "danger", text: error.message || "Failed to send OTP" });
    } finally {
      setLoading(false);
    }
  };

  // 3. HANDLE RESET PASSWORD
  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (resetData.newPassword !== resetData.confirmPassword) {
        setMessage({ type: "danger", text: "Passwords do not match" });
        return;
    }
    setLoading(true);
    try {
      await confirmPasswordReset(resetEmail, resetData.otp, resetData.newPassword);
      toast.success("Password reset successful! Please login.");
      setView("LOGIN");
      setResetData({ otp: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setMessage({ type: "danger", text: error.message || "Invalid OTP" });
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => {
      if (view === "LOGIN") return "Login";
      if (view === "FORGOT") return "Reset Password";
      if (view === "RESET") return "Set New Password";
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Card style={{ width: "100%", maxWidth: "400px", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#0f3460" }}>{renderHeader()}</h3>

          {message && <Alert variant={message.type}>{message.text}</Alert>}

          {view === "LOGIN" && (
            <>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="email" autoComplete="email" placeholder="Enter email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} required />
                    </Form.Group>
                    <div className="text-end mb-4">
                        <Button variant="link" className="p-0 text-decoration-none" style={{fontSize:'0.9rem', color:'#666'}} onClick={() => setView("FORGOT")}>Forgot Password?</Button>
                    </div>
                    <div className="d-grid">
                        <Button type="submit" disabled={loading} style={{ background: "#0f3460", border: "none", padding: "10px" }}>{loading ? "Logging in..." : "Login"}</Button>
                    </div>
                </Form>

                <div className="text-center my-3 text-muted">OR</div>

                {/* --- GOOGLE BUTTON --- */}
                <div className="d-flex justify-content-center mb-3">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => toast.error("Google Login Failed")}
                        theme="filled_blue"
                        shape="pill"
                        text="signin_with"
                        width="300"
                    />
                </div>

                <div className="text-center mt-3">
                    <small className="text-muted">Don't have an account? <Link to="/register" style={{color: '#0f3460', fontWeight:'bold'}}>Sign Up</Link></small>
                </div>
            </>
          )}

          {view === "FORGOT" && (
            <Form onSubmit={handleRequestOtp}>
              <p className="text-muted small text-center mb-4">Enter your email to receive a code.</p>
              <Form.Group className="mb-4">
                <Form.Control type="email" name="reset_email" autoComplete="email" placeholder="name@example.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
              </Form.Group>
              <div className="d-grid mb-3"><Button type="submit" disabled={loading} style={{ background: "#0f3460", border: "none" }}>{loading ? "Sending..." : "Send OTP"}</Button></div>
              <div className="text-center"><Button variant="link" onClick={() => setView("LOGIN")}>&larr; Back</Button></div>
            </Form>
          )}

          {view === "RESET" && (
            <Form onSubmit={handleConfirmReset} autoComplete="off">
              <input type="text" style={{display:'none'}} /><input type="password" style={{display:'none'}} />
              <Form.Group className="mb-3">
                <Form.Label>OTP Code</Form.Label>
                <Form.Control type="text" autoComplete="one-time-code" value={resetData.otp} onChange={(e) => setResetData({...resetData, otp: e.target.value})} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" autoComplete="new-password" value={resetData.newPassword} onChange={(e) => setResetData({...resetData, newPassword: e.target.value})} required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Confirm</Form.Label>
                <Form.Control type="password" autoComplete="new-password" value={resetData.confirmPassword} onChange={(e) => setResetData({...resetData, confirmPassword: e.target.value})} required />
              </Form.Group>
              <div className="d-grid mb-3"><Button type="submit" disabled={loading} style={{ background: "#0f3460", border: "none" }}>{loading ? "Processing..." : "Reset Password"}</Button></div>
              <div className="text-center"><Button variant="link" onClick={() => setView("FORGOT")}>Resend Code</Button></div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
