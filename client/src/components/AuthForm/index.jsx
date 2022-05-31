import styled from "styled-components";
import { cloneElement } from "react";
import GoogleIcon from "../../images/icons8-google.svg";
import {
  Facebook as FaceBookIcon,
  GitHub as GitHubIcon,
} from "@material-ui/icons";
import config from "../../config";
import GoogleLogin from "react-google-login";

export const AuthFormContainer = styled.div`
  min-height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AuthFormWrapper = styled.div`
  width: 470px;
  box-sizing: content-box;
`;
export const AuthForm = styled.form`
  border: 1px solid #bdbdbd;
  border-radius: 24px;
  padding: 50px 60px;
`;
export const LogoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const Logo = styled.img`
  height: 20px;
  margin-bottom: 2.5rem;
`;
export const Title = styled.h1`
  font-size: 1.8rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 1em;
`;
export const Description = styled.div`
  font-size: 1.6rem;
  margin-bottom: 2em;
  max-width: 95%;
`;

const AuthFormInputWrap = styled.div`
  position: relative;

  input {
    padding: 0.7em 0.8em 0.7em 2.7em;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    font-size: 1.6rem;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: 0.1s;
  }

  input:focus {
    box-shadow: 0 0 3pt 1pt cornflowerblue;
  }

  label {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    padding: 0 0.8em;
    color: #828282;
  }
`;
export const AuthFormInputsWrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-direction: column;
  font-size: 1.6rem;
  margin-bottom: 1.5em;
`;
export const AuthFormInput = function (props) {
  return (
    <AuthFormInputWrap>
      <label htmlFor={props.id}>
        {cloneElement(props.icon, { fontSize: "large" })}
      </label>
      <input {...props}></input>
    </AuthFormInputWrap>
  );
};
export const Small = styled.div`
  font-size: 1.4rem;
  color: ${({ danger }) => (danger ? "#ff0000" : "#828282")};
  margin: 2.2em 0;
  text-align: center;

  a {
    color: #2f80ed;
    text-decoration: none;
  }
`;
export const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid #828282;
  height: 50px;
  width: 50px;
  background: white;
  color: #828282;
  cursor: pointer;
  font-size: 2.8rem;
  padding: 0;

  :hover:enabled {
    background: rgba(130, 130, 130, 0.2);
    transition: background-color 100ms;
  }

  :disabled {
    opacity: 0.6;
  }

  img {
    filter: invert(56%) sepia(0%) saturate(114%) hue-rotate(268deg)
      brightness(92%) contrast(87%);
    height: 2.4rem;
  }
`;

export function SocialButtons() {
  const onSuccessGoogleLogin = (response) => {
    console.log(response);
  };
  return (
    <SocialWrapper>
      <div>
        <GoogleLogin
          clientId="1893625996-qivb1ku1k2mfoej2hmrp3vhlievk0kv9.apps.googleusercontent.com"
          onSuccess={onSuccessGoogleLogin}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <SocialButton
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img src={GoogleIcon} alt="google-icon" />
            </SocialButton>
          )}
        />
      </div>

      <SocialButton
        type="button"
        onClick={() => window.location.assign(config.oauthFacebookURL)}
      >
        <FaceBookIcon fontSize="inherit" />
      </SocialButton>
      <SocialButton
        type="button"
        onClick={() => window.location.assign(config.oauthGithubURL)}
      >
        <GitHubIcon fontSize="inherit" />
      </SocialButton>
    </SocialWrapper>
  );
}
