import './App.css';
import Login from './pages/LogIn/LogIn';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Welcome from './pages/Home/Welcome';
import { Route, Routes } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './configurations/Keycloak';
import PrivateRoute from './helpers/PrivateRoute';
import React from 'react';

function App() {
  return (
    <div className="App">
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
          onLoad: 'login-required',
          checkLoginIframe: false,
        }}
      >
        <React.StrictMode>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={'/'} element={<Welcome />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </React.StrictMode>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
