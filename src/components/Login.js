import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.error("Error al iniciar sesión con Google:", error));
  };

  return (
    <div className="login-container">
      <h1>BillarBot</h1>
      <h3>Inicia sesión con Google</h3>
      <button className="google-button" onClick={signInWithGoogle}>
        <img
          src="/images/google-icon.png"
          alt="Google Icon"
          className="google-icon"
        />
        Iniciar con Google
      </button>
    </div>
  );
};

export default Login;
