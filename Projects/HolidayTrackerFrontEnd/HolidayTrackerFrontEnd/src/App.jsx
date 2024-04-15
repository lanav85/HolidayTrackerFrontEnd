import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./components/Profile.jsx"; // Import the Profile component

function App() {
  return (
    <Router>
      <Header />
      <Profile /> {/* Add the Profile component here */}
      <Sidebar />
      <Footer />
    </Router>
  );
}

export default App;
