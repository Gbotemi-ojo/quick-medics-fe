import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSearchParams } from "react-router-dom"; 
import { EXTERNAL_API_URL } from "../api";
// API URL
const API_URL = `${EXTERNAL_API_URL}/drugs`;

const Shop = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [bannerTitle, setBannerTitle] = useState("Shop");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const PAGE_LIMIT = 12; 

  // FIX: Removed 'setSearchParams' since we aren't using it
  const [searchParams] = useSearchParams();

  useWindowScrollToTop();

  // Reset to Page 1 when Search or Category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const searchTerm = searchParams.get('search') || '';
      const categoryParam = searchParams.get('category') || '';
      
      if(searchTerm) setBannerTitle(`Search: "${searchTerm}"`);
      else if(categoryParam) setBannerTitle(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
      else setBannerTitle("Shop");

      try {
        let url = `${API_URL}?limit=${PAGE_LIMIT}&page=${currentPage}`;
        
        if(searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
        if(categoryParam) url += `&category=${encodeURIComponent(categoryParam)}`;

        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success && result.data.items) {
          const mappedProducts = result.data.items.map(item => ({
            id: item.id.toString(),
            productName: item.name,
            imgUrl: item.image || "https://via.placeholder.com/200",
            category: item.category ? item.category.toLowerCase() : "general",
            price: Number(item.price),
            shortDesc: item.category,
            description: item.name,
            discount: 0, 
            avgRating: 4.5,
          }));

          setProducts(mappedProducts);
          setTotalPages(result.data.totalPages || 1);
        } else {
            setProducts([]);
            setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, currentPage]); 

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0); 
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Fragment>
      <Banner title={bannerTitle} />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect />
            </Col>
            <Col md={8}>
              <SearchBar />
            </Col>
          </Row>
        </Container>
        <Container>
          {loading ? (
             <div style={{textAlign: 'center', padding: '50px'}}>Loading products...</div>
          ) : products.length === 0 ? (
             <div style={{textAlign:'center', marginTop:'50px'}}>
                 <h3>No products found</h3>
                 <p>Try checking your spelling or using general terms like "Malaria"</p>
             </div>
          ) : (
             <>
               <ShopList productItems={products} />
               
               {totalPages > 1 && (
                 <div style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '20px', 
                    marginTop: '40px',
                    paddingBottom: '40px'
                 }}>
                    <button 
                      onClick={handlePrev} 
                      disabled={currentPage === 1}
                      style={{
                        padding: '10px 20px', 
                        background: currentPage === 1 ? '#ddd' : '#0f3460', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Previous
                    </button>
                    
                    <span style={{fontWeight: 'bold', color: '#555'}}>
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button 
                      onClick={handleNext} 
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '10px 20px', 
                        background: currentPage === totalPages ? '#ddd' : '#0f3460', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Next
                    </button>
                 </div>
               )}
             </>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
