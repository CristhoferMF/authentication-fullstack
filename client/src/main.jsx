import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./providers/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
