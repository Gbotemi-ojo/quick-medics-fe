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

// --- Auth Pages ---
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const OrderHistory = lazy(() => import("./pages/OrderHistory")); 
const Profile = lazy(() => import("./pages/Profile")); // <--- NEW

// --- Info Pages ---
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Faq = lazy(() => import("./pages/Faq"));
const Returns = lazy(() => import("./pages/Returns"));

// training
const TrainingApplication = lazy(() => import("./pages/TrainingApplication"));
const AffiliatePage = lazy(() => import("./pages/AffiliatePage"));

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

        <div className="main-content-offset">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrderHistory />} /> 
            <Route path="/profile" element={<Profile />} /> {/* <--- NEW ROUTE */}

            {/* Info Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/returns" element={<Returns />} />
            
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blogdetail/:id" element={<BlogDetail />} />
            <Route path="/bloglist" element={<BlogList />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/training" element={<TrainingApplication />}/>
            <Route path="/affiliate" element={<AffiliatePage />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
