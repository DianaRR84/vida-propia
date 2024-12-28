// Para redirigir usuarios no autenticados

import { useState } from "react";
import { Navigate } from "react-router-dom";

function HomePageWithNavigate() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/error" />;
  }

  return <h1>Welcome to the Home Page!</h1>;
}

export default HomePageWithNavigate;
