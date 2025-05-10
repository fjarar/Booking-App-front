import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import Footer from "./components/Footer";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app-container">
      <Navbar />
      <main className="content-wrap">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
}

export default App;
