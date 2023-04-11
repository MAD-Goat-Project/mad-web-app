import './App.css';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './configurations/Keycloak';
import PrivateRoute from './helpers/PrivateRoute';
import theme from './configurations/theme';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Copyright } from './components/Copyright';
import Lesson from './pages/Lessons/Lesson';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import ButtonAppBar from './components/AppBar';

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
            <GlobalStyles
              styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
            />
            <CssBaseline />
            <ButtonAppBar />
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lessons/:category"
                element={
                  <PrivateRoute>
                    <Lesson />
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
