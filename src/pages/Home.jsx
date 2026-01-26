import { Fragment, useEffect, useState } from "react";
import SliderHome from "../components/Slider";
import CategorySection from "../components/CategorySection";
import Section from "../components/Section";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { fetchHomeConfig } from "../api"; 
import Wrapper from "../components/wrapper/Wrapper";
import PartnerSlider from "../components/PartnerSlider"; 
import HmoSection from "../components/HmoSection"; 

const Home = () => {
  useWindowScrollToTop();
  
  const [featuredCats, setFeaturedCats] = useState([]);
  const [sections, setSections] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchHomeConfig();
      
      if (data) {
          setFeaturedCats(data.categories || []);

          const formatItems = (items) => items.map(item => ({
             id: item.id.toString(),
             productName: item.name,
             imgUrl: item.imageUrl || "https://via.placeholder.com/200",
             category: "Health",
             price: Number(item.retailPrice),
             discount: item.discountPercent || 0,
             description: item.name,
          }));

          const formattedSections = (data.sections || []).map(sec => ({
              id: sec.id,
              title: sec.title,
              items: formatItems(sec.items)
          }));
          
          setSections(formattedSections);
          setDiscounts(formatItems(data.discounts || []));
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <Fragment>
      <SliderHome />
      
      {/* 1. Partner Slider Moved Here (Directly under Hero) */}
      
      {/* 2. Categories Follow */}
      <CategorySection categories={featuredCats} />
      
      {/* Dynamic Sections */}
      {sections.map(section => (
          <Section 
            key={section.id} 
            title={section.title} 
            bgColor={section.id % 2 === 0 ? "#f0fff4" : "#ffffff"} 
            productItems={section.items} 
          />
      ))}

      {/* Discount Row */}
      {discounts.length > 0 && (
        <Section title="Big Discounts" bgColor="#fff0f3" productItems={discounts} />
      )}
       <PartnerSlider />
      <HmoSection /> 

      <Wrapper />
    </Fragment>
  );
};

export default Home;
