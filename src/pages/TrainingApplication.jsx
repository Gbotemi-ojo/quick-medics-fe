import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { submitTrainingApplication } from "../api";
import "./Training.css"; // We will create this small CSS file below

const TrainingApplication = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    educationLevel: "High School",
    motivation: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await submitTrainingApplication(formData);
      if (response.success) {
        toast.success("Application submitted! We will contact you soon.");
        setFormData({
          fullName: "", email: "", phone: "", address: "", educationLevel: "High School", motivation: ""
        });
      } else {
        toast.error(response.message || "Failed to submit.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="training-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="training-card">
              <div className="text-center mb-4">
                <h2 className="section-title">Join Our Team</h2>
                <p className="text-muted">Apply for the Pharmacy Assistant Training Program</p>
                <div className="green-line"></div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="fullName" 
                    required 
                    value={formData.fullName} 
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                  />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange}
                            placeholder="name@example.com"
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name="phone" 
                            required 
                            value={formData.phone} 
                            onChange={handleChange}
                            placeholder="080..."
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Residential Address</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={2} 
                    name="address" 
                    required 
                    value={formData.address} 
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Highest Education Level</Form.Label>
                  <Form.Select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
                    <option value="High School">SSCE / High School</option>
                    <option value="OND">OND</option>
                    <option value="HND">HND</option>
                    <option value="BSc">B.Sc</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Why do you want to join us? (Motivation)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="motivation" 
                    required 
                    value={formData.motivation} 
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                  />
                </Form.Group>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TrainingApplication;
