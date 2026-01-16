import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const newArrivalData = products.filter(
    (item) => item.category === "ulcer"
  );
  const bestSales = products.filter((item) => item.category === "wines");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="MULTI VITAMINS"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section
        title="ULCER"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="WINES" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
