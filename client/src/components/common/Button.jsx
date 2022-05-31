import React from "react";
import styled, { css } from "styled-components";

const MyButton = styled.button`
  color: #828282;
  border: 1px solid #828282;
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: -0.03em;
  padding: 0.8em 1em;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  width: ${(props) => props.width};
  transition: 0.1s;

  :focus {
    box-shadow: 0 0 3pt 1pt #828282;
  }

  ${(props) =>
    props.primary &&
    css`
      background-color: #2f80ed;
      color: #fff;
      font-weight: 600;
      border: none;

      :focus {
        box-shadow: 0 0 3pt 1pt #2f80ed;
      }
    `}
`;

function Button(props) {
  const { primary, title, width } = props;

  return (
    <MyButton {...props} primary={primary} width={width}>
      {title}
    </MyButton>
  );
}

Button.defaultProps = {
  primary: null,
  title: "My button",
  wiidth: "auto",
};
export default Button;
