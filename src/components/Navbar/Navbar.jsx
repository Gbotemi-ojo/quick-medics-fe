import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/auth/authSlice";
import './navbar.css';

// --- SVG Icons ---
const PhoneIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const WhatsAppIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16.75 13.96c.25.13.41.2.52.34.11.14.15.33.1.5-.05.17-.17.31-.38.45-.21.14-.5.28-.88.2-1.13-.25-2.06-.69-2.85-1.25-.79-.56-1.42-1.29-1.89-2.11-.47-.82-.7-1.72-.7-2.68 0-.5.06-.93.18-1.28.12-.35.32-.62.59-.81.27-.19.59-.29.93-.29.25 0 .48.06.68.18.2.12.33.28.4.48.07.2.07.39.04.58-.03.19-.1.38-.19.56-.09.18-.2.35-.33.51s-.28.31-.45.45c-.17.14-.3.26-.39.38s-.15.24-.15.34c0 .11.03.21.08.31s.15.18.27.26c.33.2.68.43 1.05.68.37.25.68.43.92.56.24.13.41.2.52.22.11.02.21,0,.29-.02.08-.02.16-.06.22-.11.06-.05.12-.11.17-.18.05-.07.1-.14.15-.22.11-.17.25-.3.41-.39.16-.09.32-.13.49-.13.17 0 .33.04.46.11.13.07.24.18.32.31.08.13.12.28.12.44 0 .16-.04.31-.12.45zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>);
const SearchIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const UserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const ShoppingCartIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>);
const ChevronDownIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>);
const MenuIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const XIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { cartList } = useSelector((state) => state.cart); 
  const { isAuthenticated, user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  
  const categories = [
    { name: "Painkillers", link: "/shop?category=painkillers" },
    { name: "Antibiotics", link: "/shop?category=antibiotics" },
    { name: "Supplements", link: "/shop?category=supplements" },
    { name: "Cold & Flu", link: "/shop?category=cold" },
    { name: "Antimalarial", link: "/shop?category=antimalarial" },
  ];

  const navLinks = [
    { name: 'Shop By Category', dropdown: true, link: "/shop", items: categories },
    { name: 'Services', dropdown: false, link: "/services" },
    { name: 'About Us', dropdown: false, link: "/about" },
    { name: 'Contact Us', dropdown: false, link: "/contact" },
  ];

  return (
    <>
      <header className="navbar-header">
        <div className="top-bar">
          <div className="container top-bar-content">
            <span>2,3,4,5 Guide Plaza, Alaja Road, Megida-Ipaja Lagos NG</span>
            <div className="top-bar-actions">
              <a href="tel:+2348163943804" className="top-bar-link">
                <PhoneIcon className="icon-small" /><span>0816 394 3804</span>
              </a>
              <a href="#" className="top-bar-link">
                <span>Chat</span><WhatsAppIcon className="icon-whatsapp" />
              </a>
            </div>
          </div>
        </div>

        <div className="promo-bar"><p>Healthcare made simple, reliable, and closer to you</p></div>

        <div className={`main-nav-wrapper ${isFixed ? 'fixed-nav' : ''}`}>
          <div className="container">
            <div className="main-nav">
              <Link to="/" className="logo">Quick Medics</Link>
              
              <div className="desktop-search-container">
                <form onSubmit={handleSearch} className="search-wrapper">
                  <input type="search" placeholder="Search medicines..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <button type="submit" className="search-button"><SearchIcon className="icon-medium" /></button>
                </form>
              </div>
              
              <div className="nav-actions">
                {isAuthenticated ? (
                    // --- USER LOGGED IN DROPDOWN ---
                    <div className="nav-link-item account-link" style={{cursor:'pointer', position: 'relative'}}>
                        <UserIcon className="icon-large" />
                        <div>
                            <p>Hi, {user?.name?.split(' ')[0]}</p>
                            <p className="account-subtitle">Account <ChevronDownIcon className="icon-small" /></p>
                        </div>
                        {/* Dropdown Menu for User */}
                        <div className="dropdown-menu" style={{right: '0', left: 'auto', minWidth: '160px'}}>
                            {/* NEW: Link to Profile */}
                            <Link to="/profile" className="nav-link" style={{padding: '0.8rem 1rem', display: 'block', width: '100%', color: 'var(--gray-800)'}}>
                                My Account
                            </Link>
                            <Link to="/orders" className="nav-link" style={{padding: '0.8rem 1rem', display: 'block', width: '100%', color: 'var(--gray-800)'}}>
                                My Orders
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="nav-link" 
                                style={{padding: '0.8rem 1rem', display: 'block', width: '100%', textAlign: 'left', color: '#dc3545'}}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- GUEST LOGIN LINK ---
                    <Link to="/login" className="account-link">
                        <UserIcon className="icon-large" />
                        <div>
                            <p>Login</p>
                            <p className="account-subtitle">Account</p>
                        </div>
                    </Link>
                )}
                
                 <button onClick={() => setMobileSearchOpen(!isMobileSearchOpen)} className="mobile-icon-btn">
                  <SearchIcon className="icon-medium" />
                </button>

                <Link to="/cart" className="cart-link">
                  <ShoppingCartIcon className="icon-large" />
                  {cartList.length > 0 && <span className="cart-badge">{cartList.length}</span>}
                  <span className="cart-text">Cart</span>
                </Link>
                
                <button onClick={() => setMobileMenuOpen(true)} className="mobile-icon-btn">
                  <MenuIcon className="icon-medium" />
                </button>
              </div>
            </div>

            {isMobileSearchOpen && (
                 <div className="mobile-search-bar">
                    <form onSubmit={handleSearch} className="search-wrapper">
                        <input type="search" placeholder="Search..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button type="submit" className="search-button"><SearchIcon className="icon-medium" /></button>
                    </form>
                </div>
            )}
          </div>

          <nav className="bottom-links-bar">
            <div className="container">
              <ul className="nav-links-list">
                {navLinks.map(link => (
                  <li key={link.name} className="nav-link-item">
                    <Link to={link.link} className="nav-link">
                      {link.name}
                      {link.dropdown && <ChevronDownIcon className="icon-chevron" />}
                    </Link>
                    {link.dropdown && link.items && (
                      <div className="dropdown-menu">
                          {link.items.map((cat, idx) => (
                             <Link key={idx} to={cat.link} className="dropdown-item">
                                {cat.name}
                             </Link>
                          ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        
        {/* --- MOBILE MENU --- */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h2>Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <XIcon className="icon-medium" />
              </button>
            </div>
            <nav className="mobile-menu-nav">
              <ul>
                {isAuthenticated && (
                    <>
                        <li style={{borderBottom: '1px solid #f0f0f0'}}>
                            <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)} style={{color: '#0f3460', fontWeight: 'bold'}}>
                                My Account
                            </Link>
                        </li>
                        <li style={{borderBottom: '1px solid #f0f0f0'}}>
                            <Link to="/orders" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)} style={{color: '#0f3460', fontWeight: 'bold'}}>
                                My Orders
                            </Link>
                        </li>
                    </>
                )}

                {navLinks.map(link => (
                  <li key={link.name}>
                    <div className="mobile-nav-group">
                        <Link to={link.link} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                        {link.name}
                        </Link>
                        {link.dropdown && link.items && (
                            <div className="mobile-sub-menu">
                                {link.items.map((cat, idx) => (
                                    <Link key={idx} to={cat.link} className="mobile-sub-link" onClick={() => setMobileMenuOpen(false)}>
                                        - {cat.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                  </li>
                ))}

                {isAuthenticated ? (
                    <li style={{marginTop: '20px'}}>
                        <button 
                            onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                            className="mobile-nav-link" 
                            style={{color: 'red', width: '100%', textAlign: 'left'}}
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <li style={{marginTop: '20px'}}>
                        <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)} style={{color: '#0f3460'}}>
                            Login / Register
                        </Link>
                    </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
