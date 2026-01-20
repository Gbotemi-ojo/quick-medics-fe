import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./home.css";

const CategorySection = ({ categories }) => {
    const navigate = useNavigate();

    const styles = [
        { bg: "#fff0f3", img: "https://cdn-icons-png.flaticon.com/512/3022/3022668.png" }, // Pink
        { bg: "#e7f5ff", img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png" }, // Blue
        { bg: "#fff4e6", img: "https://cdn-icons-png.flaticon.com/512/822/822092.png" },  // Orange
        { bg: "#f3f0ff", img: "https://cdn-icons-png.flaticon.com/512/2983/2983636.png" }, // Purple
        { bg: "#f0fff4", img: "https://cdn-icons-png.flaticon.com/512/3022/3022832.png" }  // Green
    ];

    if(!categories || categories.length === 0) return null;

    return (
        <section className="category-section">
            <Container>
                <div className="category-header">
                    <h2>Shop by Category</h2>
                </div>
                <div className="category-grid">
                    {categories.map((cat, index) => {
                        const style = styles[index % styles.length];
                        return (
                            <div 
                                key={cat.id} 
                                className="cat-card" 
                                style={{ backgroundColor: style.bg }}
                                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                            >
                                <div className="cat-img-wrapper">
                                    <img src={cat.imageUrl || style.img} alt={cat.name} />
                                </div>
                                <div className="cat-info">
                                    <h3>{cat.name}</h3>
                                    <div className="cat-link">
                                        Explore <i className="fa fa-arrow-right"></i>
                                    </div>
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
