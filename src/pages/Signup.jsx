// Signup.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Importar Firestore para guardar los datos
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la redirección
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importar íconos de ojo de react-icons

function Signup() {
    const [name, setName] = useState(""); // Estado para el nombre
    const [lastName, setLastName] = useState(""); // Estado para el apellido
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para alternar visibilidad de la contraseña
    const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier error previo

    try {
      // Intentar crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        lastName,
        email,
        createdAt: new Date(),
      });

      alert(`¡${name} ${lastName}! , Ya erea parte de Vida Propia. Ahora puedes iniciar sesión `);

      // Limpiar los campos del formulario después de un registro exitoso
      setName(""); 
      setLastName("");
      setEmail(""); 
      setPassword(""); 

      // Redirigir a la página de Club Vida Propia
      navigate("/login"); 

    } catch (error) {
        console.error("Error al registrar el usuario:", error.message); // Imprimir el error en consola para más detalles

        // Manejo de errores
        if (error.code === "auth/email-already-in-use") {
            setError("El correo ya está registrado.");
        } else if (error.code === "auth/invalid-email") {
            setError("El formato del correo electrónico no es válido.");
        } else if (error.code === "auth/weak-password") {
            setError("La contraseña debe tener al menos 6 caracteres.");
        } else {
            setError("Error al registrar. Inténtalo de nuevo.");
        }

        // Limpiar los campos si el registro falla
        setName(""); 
        setLastName("");
        setEmail(""); 
        setPassword("");
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Regístrate</h2>
      <form onSubmit={handleSignup} className="w-50 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Campo para el Nombre */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Campo para el Apellido */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

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
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Signup;
