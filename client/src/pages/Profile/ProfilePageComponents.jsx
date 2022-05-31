import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.25em;

  @media (min-width: 768px) {
    font-size: 3.6rem;
  }
`;
export const SubTitle = styled.h2`
  font-size: 1.4rem;
  text-align: center;
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const ProfileCardWrapper = styled.div`
  display: block;
  margin: 4.2em auto;
  //media query
`;

export const ProfileCard = styled.div`
  display: block;
  border-radius: 10px;

  @media (min-width: 768px) {
    border: 1px solid #e6e6e6;
  }
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justify || "flex-start"};
  padding: 2.5em 0;
  border-bottom: 1px solid #e6e6e6;

  @media (min-width: 768px) {
    padding: 2.5em 5em;
  }
`;
export const ColumnOne = styled.div`
  max-width: 50%;
`;

export const ColumnTwo = styled.div``;
export const ProfileItemTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 400;
  margin-bottom: 0.15em;
  margin-top: 0;
`;

export const ProfileItemDesc = styled.p`
  margin: 0;
  font-weight: 500;
  color: #828282;
  font-size: 1.3rem;
  letter-spacing: 0.025em; ;
`;

export const EditButton = styled(Link)`
  padding: 0.5em 2em;
  display: block;
  border: 1px solid #828282;
  border-radius: 12px;
  font-size: 1.6rem;
  text-decoration: none;
  color: #828282;
  font-weight: 500;
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: rgba(130, 130, 130, 0.1);
  }
`;
export const ProfileItemLabel = styled.div`
  font-size: 1.3rem;
  color: #bdbdbd;
  min-width: 30%;
`;

export const ProfileItemValue = styled.div`
  display: block;
  font-size: 1.6rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;

  img {
    max-width: 7.2rem;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
  }
  @media (min-width: 768px) {
    text-align: left;
    font-size: 1.8rem;
  }
`;

export const EmptyValue = styled.small`
  color: #bdbdbd;
  font-size: 1.3rem;
  font-style: italic;
`;
