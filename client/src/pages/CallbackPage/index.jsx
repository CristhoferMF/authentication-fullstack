import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { isJson } from "../../utils";

export default function CallbackPage() {
  const navigate = useNavigate();
  const { data } = useParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const authText = decodeURIComponent(data);
    const isInteger = /^\d+$/.test(authText);

    const auth = isJson(authText) && !isInteger ? JSON.parse(authText) : null;
    if (!auth) {
      navigate("/");
      return;
    }
    console.log("Autenticando...");
    login(auth);
  }, [data, login, navigate]);

  return <div>Espere mientras es redirigido</div>;
}
