import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./home.css";

const CategorySection = ({ categories }) => {
    const navigate = useNavigate();

    // Replaced the "mid" pastel colors with a unified, professional placeholder logic
    // If no image is provided, we use a clean pharmaceutical icon
    const defaultIcon = "https://cdn-icons-png.flaticon.com/512/883/883407.png"; 

    if(!categories || categories.length === 0) return null;

    return (
        <section className="category-section" style={{ padding: '60px 0', backgroundColor: '#fdfdfd' }}>
            <Container>
                {/* Updated Header Styling */}
                <div className="category-header text-center" style={{ marginBottom: '50px' }}>
                    <h2 style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: '800', 
                        color: '#1a1a1a', 
                        textTransform: 'capitalize',
                        letterSpacing: '-1px',
                        marginBottom: '15px'
                    }}>
                        Explore Categories
                    </h2>
                    <p style={{ color: '#777', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Find exactly what you need for your health and wellness.
                    </p>
                    <div style={{ 
                        width: '80px', 
                        height: '4px', 
                        background: '#5bb318', 
                        borderRadius: '2px', 
                        margin: '20px auto 0 auto' 
                    }}></div>
                </div>

                {/* Grid Layout */}
                <div className="category-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                    gap: '30px' 
                }}>
                    {categories.map((cat) => {
                        return (
                            <div 
                                key={cat.id} 
                                className="cat-card-premium" // Using a new class logic below via inline styles for reliability
                                style={{ 
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    padding: '30px 20px',
                                    textAlign: 'center',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                                    border: '1px solid #f0f0f0',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(91, 179, 24, 0.15)'; // Green glow
                                    e.currentTarget.style.borderColor = '#5bb318';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                                    e.currentTarget.style.borderColor = '#f0f0f0';
                                }}
                            >
                                {/* Icon Circle Background */}
                                <div style={{ 
                                    width: '80px', 
                                    height: '80px', 
                                    background: '#f4fbf0', // Very light green bg
                                    borderRadius: '50%', 
                                    margin: '0 auto 20px auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img 
                                        src={cat.imageUrl || defaultIcon} 
                                        alt={cat.name} 
                                        style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
                                    />
                                </div>

                                <div className="cat-info">
                                    <h3 style={{ 
                                        fontSize: '1.25rem', 
                                        fontWeight: '700', 
                                        color: '#333',
                                        marginBottom: '10px',
                                        textTransform: 'capitalize'
                                    }}>
                                        {cat.name}
                                    </h3>
                                    
                                    <span style={{ 
                                        color: '#5bb318', 
                                        fontSize: '0.9rem', 
                                        fontWeight: '600',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}>
                                        Shop Now <i className="fa fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default CategorySection;
