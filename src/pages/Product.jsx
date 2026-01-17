import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { EXTERNAL_API_URL } from "../api";
const API_URL = `${EXTERNAL_API_URL}/drugs`;

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useWindowScrollToTop();

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Single Product
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          const item = result.data;
          
          // --- FIX IS HERE ---
          // We manually add 'reviews' and 'avgRating' because the backend doesn't send them yet.
          const mappedProduct = {
            id: item.id.toString(),
            productName: item.name,
            imgUrl: item.image || "https://via.placeholder.com/200",
            category: item.category ? item.category.toLowerCase() : "general",
            price: Number(item.price),
            shortDesc: item.activeIngredient || item.category, 
            description: item.name, 
            avgRating: 4.5,
            discount: 0,
            reviews: [ // <--- Added Dummy Reviews to prevent crash
                { rating: 5, text: "Excellent service and genuine product." },
                { rating: 4, text: "Good quality." }
            ],
          };
          
          setSelectedProduct(mappedProduct);

          // 2. Fetch "Related" Products
          const relatedResponse = await fetch(`${API_URL}?limit=4`);
          const relatedResult = await relatedResponse.json();
          
          if (relatedResult.success && relatedResult.data.items) {
             const mappedRelated = relatedResult.data.items
                .filter(p => p.id !== item.id)
                .map(p => ({
                  id: p.id.toString(),
                  productName: p.name,
                  imgUrl: p.image || "https://via.placeholder.com/200",
                  category: p.category ? p.category.toLowerCase() : "general",
                  price: Number(p.price),
                  discount: 0,
                  avgRating: 4.5,
                  reviews: [], // Ensure related products also have this if needed
                }));
             setRelatedProducts(mappedRelated);
          }
        }
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <div style={{padding:'100px', textAlign:'center'}}>Loading...</div>;
  if (!selectedProduct) return <div style={{padding:'100px', textAlign:'center'}}>Product not found</div>;

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
