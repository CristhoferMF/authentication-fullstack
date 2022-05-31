import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/common";
import {
  AuthFormContainer,
  AuthFormWrapper,
  AuthForm,
  LogoWrap,
  Logo,
  Title,
  AuthFormInput,
  AuthFormInputsWrapper,
  Small,
  SocialButtons,
} from "../../components/AuthForm";
import { Email as EmailIcon, Lock as LockIcon } from "@material-ui/icons";
import { useSearchParams } from "react-router-dom";
import imageLogo from "../../images/logo.svg";
import { AuthContext } from "../../providers/AuthProvider";
import { login as loginApiService } from "../../services/api";

function Login() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const credentials = {
      email: email.value,
      password: password.value,
    };
    const loginRequest = async () => {
      console.log("request");
      try {
        const {
          data: { data },
        } = await loginApiService(credentials);
        login(data);
      } catch (error) {
        setError(error.response.data.message ?? "Something went wrong");
      }
    };
    loginRequest();
  }

  return (
    <AuthFormContainer>
      <AuthFormWrapper>
        <AuthForm onSubmit={handleSubmit}>
          <LogoWrap>
            <Logo src={imageLogo} />
          </LogoWrap>
          <Title>Login</Title>
          <AuthFormInputsWrapper>
            <AuthFormInput
              icon={<EmailIcon />}
              type="email"
              id="email"
              placeholder="Email"
              required
              onChange={() => setError("")}
            />
            <AuthFormInput
              icon={<LockIcon />}
              id="password"
              placeholder="Password"
              type="password"
              onChange={() => setError("")}
              required
            />
          </AuthFormInputsWrapper>
          {error && <Small danger>{error}</Small>}
          <Button primary title="Login" width="100%" />
          <Small>or continue with these social profile</Small>
          <SocialButtons />
          <Small>
            Don't have an account yet? <Link to="/register">Register</Link>
          </Small>
        </AuthForm>
      </AuthFormWrapper>
    </AuthFormContainer>
  );
}

export default Login;
