
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
{/*import TipsPage from "./pages/TipsPage";*/}
import TutorialsPage from "./pages/TutorialsPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ClubPage from "./pages/ClubPage";
import ContactPage from "./pages/ContactPage";
import VidaEcoPage from "./pages/VidaEcoPage";
import TalleresPage from "./pages/TalleresPage";
import StorePage from "./pages/StorePage";
import ProductDetails from "./pages/ProductDetails";
import RevolucionPage from "./pages/RevolucionPage";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; 


function App() {
  return (
    <div className="App">
      <CartProvider> {/* Envuelve la aplicación con el CartProvider */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*<Route path="/tips" element={<TipsPage />} />*/}
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/revolucion" element={<RevolucionPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/vidaeco" element={<VidaEcoPage />} />
          <Route path="/talleres" element={<TalleresPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/category/:category" element={<StorePage />} />
          {/* Ruta dinámica para los detalles de un producto */}
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
