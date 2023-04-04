import './App.css';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './configurations/Keycloak';
import PrivateRoute from './helpers/PrivateRoute';
import theme from './configurations/Theme';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Copyright } from './components/Copyright';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{
            onLoad: 'login-required',
            checkLoginIframe: false,
          }}
        >
          <React.StrictMode>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Routes>
          </React.StrictMode>
        </ReactKeycloakProvider>
        <Copyright />
      </ThemeProvider>
    </div>
  );
}

export default App;
