// src/App.jsx
import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const BlogList = lazy(() => import("./pages/Bloglist"));
const BlogDetail = lazy(() => import("./pages/Blogdetail"));
const Privacy = lazy(() => import("./pages/privacy"));
const Terms = lazy(() => import("./pages/terms"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <NavBar />

        {/* --- START OF CHANGES --- */}
        {/* This div will create the necessary space below the fixed navbar */}
        <div className="main-content-offset">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />

            {/* Blog list and detail */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blogdetail/:id" element={<BlogDetail />} />
            <Route path="/bloglist" element={<BlogList />} />
            <Route path="/terms" element={<Terms />} />
            {/* (Optional) add a 404 page by uncommenting & creating NotFound */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
        {/* --- END OF CHANGES --- */}

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
