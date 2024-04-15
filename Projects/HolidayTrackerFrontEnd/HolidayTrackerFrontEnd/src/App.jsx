import Sidebar from "./components/Sidebar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Footer />
  </Router>
  )
}

export default App;