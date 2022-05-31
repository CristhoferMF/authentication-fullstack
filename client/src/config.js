const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? "",
  userKeyItem: "dev_auth_user",
  cookieAuth: "auth_response",
  oauthGithubURL: "/api/v1/auth/github",
  //oauthGithubURL: process.env.REACT_APP_OAUTH_GITHUB ?? "/api/v1/auth/github",
  //   oauthFacebookURL:
  //     process.env.REACT_APP_OAUTH_FACEBOOK ?? "/api/v1/auth/facebook",
  oauthFacebookURL: "/api/v1/auth/facebook",
  oauthGoogleURL: "/api/v1/auth/google",
  //oauthGoogleURL: process.env.REACT_APP_OAUTH_GOOGLE ?? "/api/v1/auth/google",
};

export default config;
