import styled from "styled-components";
import { Link } from "react-router-dom";

export const TextArea = styled.textarea`
  border-radius: 12px;
  border: 1px solid #828282;
  font-weight: 500;
  height: 7em;
  padding: 1.25em;
  resize: none;
`;
export const FormWrapper = styled.div`
  max-width: 460px;
`;
export const FormContainer = styled.div`
  border-radius: 12px;
  padding: 0;

  @media (min-width: 768px) {
    border: 1px solid #e0e0e0;
    padding: 4.6rem;
  }
`;
export const BackButton = styled(Link)`
  align-items: center;
  color: #2d9cdb;
  display: inline-flex;
  font-size: 1.8rem;
  margin-bottom: 1.75em;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
export const FormLegend = styled.h1`
  font-size: 2.4rem;
  font-weight: 400;
  letter-spacing: -0.03em;
  margin-bottom: 0.15em;
  margin-top: 0;
`;
export const FormDescription = styled.p`
  color: #828282;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 2em;
  margin-top: 0;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 2em;
  margin-top: 0;
`;
