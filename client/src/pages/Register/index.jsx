import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/common";
import {
  AuthFormContainer,
  AuthFormWrapper,
  AuthForm,
  LogoWrap,
  Logo,
  Title,
  Description,
  AuthFormInput,
  AuthFormInputsWrapper,
  Small,
  SocialButtons,
} from "../../components/AuthForm";
import { Email as EmailIcon, Lock as LockIcon } from "@material-ui/icons";
import imageLogo from "../../images/logo.svg";
import { register as registerApiService } from "../../services/api";
import { AuthContext } from "../../providers/AuthProvider";

function Register() {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const credentials = {
      email: email.value,
      password: password.value,
    };
    const registerRequest = async () => {
      try {
        const {
          data: { data },
        } = await registerApiService(credentials);
        login(data);
      } catch (e) {
        setError(e.response.data.message ?? "Something went wrong");
      }
    };
    registerRequest();
  }
  return (
    <AuthFormContainer>
      <AuthFormWrapper>
        <AuthForm onSubmit={handleSubmit}>
          <LogoWrap>
            <Logo src={imageLogo} />
          </LogoWrap>
          <Title>
            Join thousands of learners from
            <br />
            around the world
          </Title>
          <Description>{`Master web development by making real-life projects. 
                            There are multiple paths for you to choose`}</Description>

          <AuthFormInputsWrapper>
            <AuthFormInput
              icon={<EmailIcon />}
              id="email"
              placeholder="Email"
              required
            />
            <AuthFormInput
              icon={<LockIcon />}
              id="password"
              placeholder="Password"
              type="password"
              required
            />
          </AuthFormInputsWrapper>
          {error && <Small danger>{error}</Small>}

          <Button primary title="Start coding now" width="100%" />
          <Small>or continue with these social profile</Small>
          <SocialButtons />
          <Small>
            Alredy member? <Link to="/login">Login</Link>
          </Small>
        </AuthForm>
      </AuthFormWrapper>
    </AuthFormContainer>
  );
}

export default Register;
