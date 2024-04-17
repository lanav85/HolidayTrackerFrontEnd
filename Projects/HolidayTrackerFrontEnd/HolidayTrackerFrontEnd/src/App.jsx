import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <Router>
      <Login />
      <Footer />
    </Router>
  );
}

export default App;
