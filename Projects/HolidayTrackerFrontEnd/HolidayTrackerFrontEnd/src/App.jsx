import Sidebar from "./components/Sidebar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Sidebar />
  </Router>
  )
}

export default App;
