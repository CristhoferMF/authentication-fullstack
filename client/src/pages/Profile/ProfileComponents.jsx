import styled from "styled-components";

export const Title = styled.h1`
  font-size: 3.6rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0.25em;
`;
export const SubTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  font-weight: 300;
`;

export const ProfileCardWrapper = styled.div`
  display: block;
  margin: 4.2em auto;
  //media query
`;

export const ProfileCard = styled.div`
  display: block;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2.5em 5em;
  border-bottom: 1px solid #e6e6e6;
`;
export const ProfileItemLabel = styled.div`
  font-size: 1.3rem;
  color: #bdbdbd;
  min-width: 30%;
`;

export const ProfileItemValue = styled.div`
  display: block;
  font-size: 1.8rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EmptyValue = styled.small`
  color: #bdbdbd;
  font-size: 1.3rem;
  font-style: italic;
`;
