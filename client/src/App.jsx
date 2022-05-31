import { useContext, useEffect } from "react";
import { Routes, useLocation, Route, Navigate } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { RegisterPage, LoginPage, ProfilePage, CallbackPage } from "./pages";
import { AuthContext } from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import ProfileEditPage from "./pages/Profile/edit";

function RedirectToHomeNotAuth({ auth, children }) {
  const location = useLocation();
  if (!auth) {
    return <>{children}</>;
  }
  return <Navigate to={{ pathname: "/", state: { from: location } }} />;
}

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/logout") {
      logout();
    }
  }, [location, logout]);
  return (
    <>
      <AlertProvider template={AlertTemplate} {...options}>
        <Routes>
          <Route
            exac
            path="/"
            element={<Navigate to={{ pathname: "/profile" }} />}
          />
          <Route
            exac
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route
            exac
            path="/profile/edit"
            element={<PrivateRoute element={<ProfileEditPage />} />}
          />
          <Route
            exac
            path="/register"
            element={
              <RedirectToHomeNotAuth auth={auth}>
                <RegisterPage />
              </RedirectToHomeNotAuth>
            }
          />
          <Route
            exac
            path="/login"
            element={
              <RedirectToHomeNotAuth auth={auth}>
                <LoginPage />
              </RedirectToHomeNotAuth>
            }
          />
          <Route exac path="/callback/:data" element={<CallbackPage />} />
          <Route
            exac
            path="/logout"
            element={<Navigate to={{ pathname: "/" }} />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AlertProvider>
    </>
  );
}

export default App;
