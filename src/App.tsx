import './App.css';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './configurations/keycloak';
import PrivateRoute from './utils/PrivateRoute';
import theme from './configurations/theme';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Copyright } from './components/copyright/Copyright';
import Lesson from './pages/lessons/Lesson';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import ButtonAppBar from './components/app-bar/AppBar';
import Assessment from './pages/assessments/Assessment';
import Scoreboard from './pages/scoreboard/Scoreboard';
import Profile from './pages/profile/Profile';

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
              <Route
                path="/lessons/:category/:lessonId"
                element={
                  <PrivateRoute>
                    <Assessment />
                  </PrivateRoute>
                }
              />
              <Route
                path="/scoreboard"
                element={
                  <PrivateRoute>
                    <Scoreboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
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
