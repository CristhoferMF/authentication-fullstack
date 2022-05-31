import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth ? (
    props.element
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
}
