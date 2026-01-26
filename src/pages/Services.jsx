import React, { Fragment } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Banner from "../components/Banner/Banner"; // Importing as Default, same as Shop.jsx

const Services = () => {
  useWindowScrollToTop();

  // Services extracted from your QuickMedics Flyer
  const services = [
    { 
      title: "Consultation", 
      desc: "Speak directly with our licensed pharmacists for expert advice on your health, medication queries, and treatment options.",
      img: "https://images.unsplash.com/photo-1739285388427-d6f85d12a8fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMGNvbnN1bHRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    { 
      title: "Pharmaceutical Care", 
      desc: "We provide comprehensive medication therapy management to ensure your drug usage is safe, effective, and perfectly suited to your needs.",
      img: "https://images.unsplash.com/photo-1659019479789-4dd5dbdc2cb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGhhcm1hY2V1dGljYWwlMjBDYXJlfGVufDB8fDB8fHww"
    },
    { 
      title: "Prescription & Medical Review", 
      desc: "Our team reviews your prescriptions to prevent drug interactions, ensure correct dosage, and guarantee your safety.",
      img: "https://plus.unsplash.com/premium_photo-1723489337127-10940e9dc593?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UHJlc2NyaXB0aW9ufGVufDB8fDB8fHww"
    },
    { 
      title: "Sales of Drugs & Medical Equipment", 
      desc: "We stock authentic, NAFDAC-approved medications and hospital-grade medical equipment for both personal and clinical use.",
      img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=500&q=60"
    },
    { 
      title: "Supply of Machines & Rapid Test Kits", 
      desc: "We source and supply reliable medical machinery and rapid diagnostic test kits for clinics, hospitals, and individuals.",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=500&q=60"
    },
    { 
      title: "BP & Blood Sugar Control", 
      desc: "Walk in for instant checks. We help you monitor, record, and manage your Blood Pressure and Blood Sugar levels effectively.",
      img: "https://images.unsplash.com/photo-1714642596931-2293df25c4a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qmxvb2QlMjBTdWdhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    { 
      title: "Home Call & Patient Monitoring", 
      desc: "Cannot make it to the pharmacy? We offer home visits and personalized monitoring for patients with chronic conditions.",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=60"
    },
    { 
      title: "General Wellness & Natural Supplements", 
      desc: "Boost your immunity and vitality with our wide range of organic vitamins, herbal remedies, and natural health supplements.",
      img: "https://plus.unsplash.com/premium_photo-1730980474802-28f5fb1e10f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJhbCUyMGRydWd8ZW58MHx8MHx8fDA%3D"
    },
    { 
      title: "Online & Physical Medical Store", 
      desc: "Shop conveniently via our website or visit our physical store at Guide Plaza, Lagos for in-person service.",
      img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=500&q=60"
    },
    { 
      title: "Delivery Anywhere in Nigeria", 
      desc: "We offer fast, reliable, and secure delivery of medications to any location across Nigeria.",
      img: "https://plus.unsplash.com/premium_photo-1661907153090-93759d68acb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGVsaXZlcnklMjB0cnVja3xlbnwwfHwwfHx8MA%3D%3D"
    },
  ];

  return (
    <Fragment>
      <Banner title="Our Services" />
      
      <Container className="py-5">
        <div className="text-center mb-5">
            <h2 style={{fontWeight: '800', color: '#1a1a1a'}}>What We Offer</h2>
            <p className="text-muted">Professional healthcare services tailored to your needs</p>
            <div style={{width: '60px', height: '4px', background: '#5bb318', margin: '0 auto'}}></div>
        </div>

        <Row>
          {services.map((s, idx) => (
            <Col lg={4} md={6} className="mb-4" key={idx}>
               <Card className="h-100 service-card">
                 <div style={{overflow: 'hidden', height: '200px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}}>
                    <Card.Img 
                        variant="top" 
                        src={s.img} 
                        style={{
                            height: '100%', 
                            objectFit: 'cover', 
                            transition: 'transform 0.3s ease'
                        }} 
                        className="service-img"
                    />
                 </div>
                 
                 <Card.Body className="p-4 d-flex flex-column">
                    <h5 style={{color: '#0f3460', fontWeight: '700', marginBottom: '15px'}}>{s.title}</h5>
                    <Card.Text style={{color: '#666', fontSize: '0.95rem', flexGrow: 1}}>
                        {s.desc}
                    </Card.Text>
                    <Link to="/contact">
                        <Button 
                            variant="outline-success" 
                            size="sm" 
                            style={{borderRadius: '20px', fontWeight: '600', marginTop: '10px'}}
                        >
                            Learn More
                        </Button>
                    </Link>
                 </Card.Body>
               </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
      {/* Inline CSS for Hover Effects */}
      <style>{`
        .service-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        .service-card:hover .service-img {
            transform: scale(1.1);
        }
      `}</style>
    </Fragment>
  );
}

export default Services;
