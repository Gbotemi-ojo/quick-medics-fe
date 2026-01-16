import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Tab } from "react-bootstrap";
import { fetchProfile, updateProfile, changePassword } from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Profile = () => {
  useWindowScrollToTop();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  // Profile State
  const [profile, setProfile] = useState({ fullName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Password State
  const [passData, setPassData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadProfile();
  }, [isAuthenticated, navigate]);

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      await updateProfile({ fullName: profile.fullName, phone: profile.phone });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "danger", text: "Failed to update profile." });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passData.newPassword !== passData.confirmPassword) {
      setMessage({ type: "danger", text: "New passwords do not match." });
      return;
    }

    try {
      await changePassword({ 
          currentPassword: passData.currentPassword, 
          newPassword: passData.newPassword 
      });
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
  };

  if (loading) return <div className="text-center py-5">Loading profile...</div>;

  return (
    <Container className="py-5" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4 text-primary" style={{color: '#0f3460'}}>My Account</h2>
      
      {message.text && <Alert variant={message.type} dismissible onClose={() => setMessage({type:"", text:""})}>{message.text}</Alert>}

      <Tab.Container defaultActiveKey="details">
        <Row>
          <Col md={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="details" className="profile-nav-link" style={{padding:'15px', color:'#333', cursor:'pointer'}}>
                      <i className="fa-regular fa-user me-2"></i> Personal Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="security" className="profile-nav-link" style={{padding:'15px', color:'#333', cursor:'pointer'}}>
                      <i className="fa-solid fa-lock me-2"></i> Security
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* --- PERSONAL DETAILS TAB --- */}
              <Tab.Pane eventKey="details">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white fw-bold py-3">Update Profile</Card.Header>
                  <Card.Body className="p-4">
                    <Form onSubmit={handleProfileUpdate}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={profile.fullName} 
                            onChange={(e) => setProfile({...profile, fullName: e.target.value})} 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={profile.phone || ''} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email (Cannot be changed)</Form.Label>
                        <Form.Control type="email" value={profile.email} disabled className="bg-light" />
                      </Form.Group>
                      <Button type="submit" style={{background: '#0f3460', border:'none'}}>Save Changes</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* --- SECURITY TAB --- */}
              <Tab.Pane eventKey="security">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white fw-bold py-3">Change Password</Card.Header>
                  <Card.Body className="p-4">
                    <Form onSubmit={handlePasswordChange}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={passData.currentPassword}
                            onChange={(e) => setPassData({...passData, currentPassword: e.target.value})}
                            required 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={passData.newPassword}
                            onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
                            required 
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={passData.confirmPassword}
                            onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
                            required 
                        />
                      </Form.Group>
                      <Button type="submit" variant="danger">Update Password</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
