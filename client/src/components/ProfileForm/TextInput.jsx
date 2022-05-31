import { forwardRef } from "react";
import styled from "styled-components";

const InputGroup = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  font-size: 1.3rem;
  letter-spacing: -0.03em;

  span.label {
    font-weight: 500;
    color: #4f4f4f;
    margin-bottom: 0.25em;
  }

  span.error {
    color: #e90000;
    margin-top: 0.25em;
  }

  input {
    padding: 1.25em;
    font-weight: 500;
    border: 1px solid ${(props) => (props.error ? "#e90000" : "#828282")};
    border-radius: 12px;
    transition: outline 0.3s ease-in-out;
  }
  input:focus {
    outline: 1px solid ${(props) => (props.error ? "#e90000" : "#828282")};
  }
`;

export const TextInput = forwardRef((props, ref) => {
  return (
    <InputGroup error={props.error}>
      <span className="label">{props.label}</span>
      {props.renderInput ? (
        props.renderInput(props, ref)
      ) : (
        <input ref={ref} {...props} />
      )}
      <span className="error">{props.error}</span>
    </InputGroup>
  );
});
