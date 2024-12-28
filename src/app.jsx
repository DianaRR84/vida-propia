
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TipsPage from "./pages/TipsPage";
import TutorialsPage from "./pages/TutorialsPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ClubPage from "./pages/ClubPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/club" element={<ClubPage />} />
      </Routes>
    </div>
  );
}

export default App;
