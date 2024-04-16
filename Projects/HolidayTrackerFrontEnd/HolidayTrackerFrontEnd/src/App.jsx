import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SubmitRequest from "./components/SubmitRequest.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <SubmitRequest />
      <Footer />
    </Router>
  );
}

export default App;
