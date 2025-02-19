import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Footer from "./Footer";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      const jwt = Cookies.get("jwt");
      if (!jwt) {
        navigate("/login");
      }
    };

    checkAuth();

    const intervalId = setInterval(checkAuth, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);
  return (
    <header className="h-screen">
      <Navbar />
      <section>
        <img src="banner.jpg" alt="" className="h-[90%] w-full" />
      </section>
      <Footer />
    </header>
  );
};

export default Home;
