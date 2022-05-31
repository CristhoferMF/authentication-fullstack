import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoSvg from "../../images/logo.svg";

const LogoImg = styled.img`
  height: ${(props) => props.height};
  margin-bottom: ${(props) => props.marginBottom};
`;

function Logo(props) {
  if (props.isLink) {
    return (
      <Link to={props.to}>
        <LogoImg src={LogoSvg} {...props} />
      </Link>
    );
  }

  return <LogoImg src={LogoSvg} {...props} />;
}

Logo.defaultProps = {
  height: "20px",
  marginBottom: "2.5rem",
  isLink: false,
  to: "/",
};

export default Logo;
