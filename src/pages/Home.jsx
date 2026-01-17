import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { EXTERNAL_API_URL } from "../api";

// API URL
const API_URL = `${EXTERNAL_API_URL}/drugs`;

const Home = () => {
  useWindowScrollToTop();
  
  // State for each section
  const [supplements, setSupplements] = useState([]);
  const [painKillers, setPainKillers] = useState([]);
  const [antibiotics, setAntibiotics] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Fetch data for all sections in parallel
        // We request 8 items for each specific category
        const [supplementsRes, painRes, antibioticRes, latestRes] = await Promise.all([
           fetch(`${API_URL}?category=supplements&limit=8`),
           fetch(`${API_URL}?category=painkillers&limit=8`),
           fetch(`${API_URL}?category=antibiotics&limit=8`),
           fetch(`${API_URL}?limit=8`) // For "New Arrivals" fallback
        ]);

        const [supplementsData, painData, antibioticData, latestData] = await Promise.all([
            supplementsRes.json(),
            painRes.json(),
            antibioticRes.json(),
            latestRes.json()
        ]);

        // Helper function to map backend data to frontend structure
        const mapData = (data) => {
            if(!data.success || !data.data.items) return [];
            return data.data.items.map(item => ({
                id: item.id.toString(),
                productName: item.name,
                imgUrl: item.image || "https://via.placeholder.com/200",
                category: item.category ? item.category.toLowerCase() : "general",
                price: Number(item.price),
                discount: 0,
                shortDesc: item.category,
                description: item.name,
            }));
        };

        setSupplements(mapData(supplementsData));
        setPainKillers(mapData(painData));
        setAntibiotics(mapData(antibioticData));
        setNewArrivals(mapData(latestData));

      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh', 
        color: '#5bb318', 
        fontSize: '20px', 
        fontWeight: 'bold' 
      }}>
        Loading Quick Medics...
      </div>
    );
  }

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      
      {/* Section 1: Multivitamins / Supplements 
          Changed bgColor to #f0fff4 (Light Mint) to match the Lime theme 
      */}
      <Section
        title="Multivitamins & Supplements"
        bgColor="#f0fff4"
        productItems={supplements.length > 0 ? supplements : newArrivals}
      />
      
      {/* Section 2: Pain Relief 
          Kept White to create contrast with the sections above and below
      */}
      <Section
        title="Pain Relief"
        bgColor="#ffffff"
        productItems={painKillers.length > 0 ? painKillers : newArrivals}
      />
      
      {/* Section 3: Antibiotics 
          Changed bgColor to #f0fff4 (Light Mint) to match the Lime theme
      */}
      <Section 
        title="Antibiotics" 
        bgColor="#f0fff4" 
        productItems={antibiotics.length > 0 ? antibiotics : newArrivals} 
      />
    </Fragment>
  );
};

export default Home;