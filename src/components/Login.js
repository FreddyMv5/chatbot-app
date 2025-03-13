import React from 'react';
import "../styles/Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from 'mdb-react-ui-kit';
import { auth, provider, signInWithPopup } from '../firebaseConfig';

const Login = ({ setUser }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con Google:", error);
      });
  };

  return (
    <MDBContainer fluid className="login-bg">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12" md="8" lg="6" xl="5">
          <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem' }}>
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              
              {/* Título principal */}
              <h2 className="fw-bold mb-2 text-uppercase">BillarBot</h2>
              {/* Subtítulo */}
              <p className="text-white-50 mb-5">Inicia sesión con Google</p>
              
              {/* Botón para iniciar sesión con Google */}
              <MDBBtn onClick={signInWithGoogle} outline className="mx-2 px-5" color="white" size="lg">
                <MDBIcon fab icon="google" size="lg" className="me-2" />
                Iniciar con Google
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
