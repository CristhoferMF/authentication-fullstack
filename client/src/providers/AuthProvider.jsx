import { createContext, useEffect, useState } from "react";
import config from "../config";
import { generateTokens } from "../services/api";
const AuthContext = createContext();

const AuthProvider = function ({ children }) {
  const [auth, setAuth] = useState(() => {
    const auth = localStorage.getItem(config.userKeyItem);
    return auth ? JSON.parse(auth) : null;
  });

  function login(auth) {
    setAuth(auth);
    localStorage.setItem(config.userKeyItem, JSON.stringify(auth));
  }

  function resetAuth() {
    setAuth(null);
    localStorage.removeItem(config.userKeyItem);
  }

  useEffect(() => {
    /*acces token expires */
    (async function () {
      try {
        if (!auth) return;
        const {
          tokens: { access },
          user,
        } = auth;
        const { now, expires } = {
          now: new Date(),
          expires: new Date(access.expires),
        };
        if (now.getTime() >= expires.getTime()) {
          resetAuth();
        }
      } catch (error) {
        console.error("Error effect AuthProvider", error);
        resetAuth();
      }
    })();
  }, [auth]);

  const value = {
    auth,
    login,
    logout: resetAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
