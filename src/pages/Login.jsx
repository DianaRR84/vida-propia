
import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección
import { doc, getDoc } from "firebase/firestore"; // Para obtener datos de Firestore
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importar íconos de ojo de react-icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para visibilidad de la contraseña
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario
  const navigate = useNavigate(); // Hook para redirección

  const ADMIN_EMAIL = import.meta.env.REACT_APP_ADMIN_EMAIL; 
  const ADMIN_PASSWORD = import.meta.env.REACT_APP_ADMIN_PASSWORD;

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Verificar si las credenciales son las de administrador
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      navigate("/admin"); // Redirigir a la página de Administrador
      return; // Terminar la función si es el administrador
    }
    
    try {
        // Intentar iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener información del usuario desde Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserName(userDoc.data().name); // Guardar el nombre del usuario

        // Redirigir al Club Vida Propia
        navigate("/club");
      } else {
        setError("No se encontró información del usuario.");
      }
    } catch (error) {
      // Mostrar mensaje de error si las credenciales son incorrectas
      setError("Correo o contraseña incorrectos.");
    }
  };

  // Función para alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Formulario de inicio de sesión */}
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Campo para el Correo Electrónico */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Campo para la Contraseña */}
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <div className="position-relative">
            <input
              type={passwordVisible ? "text" : "password"} // Alternar entre 'text' y 'password'
              id="password"
              className="form-control pe-5" // Añadimos padding a la derecha para el ícono
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Icono de ojo dentro del campo de la contraseña */}
            <div
              onClick={togglePasswordVisibility}
              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
              style={{ zIndex: 1 }}
            >
              {passwordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
            </div>
          </div>
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
