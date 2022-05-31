import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VerifiedUser } from "@material-ui/icons";
import { forwardRef } from "react";

const DropdownWrapper = styled.div`
  position: absolute;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 0.8em;
  min-width: 180px;
  max-width: 300px;
  margin-top: 20px;
  right: 0;
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 10px;
  background: white;
`;
const DropdownItem = styled(Link)`
  display: flex;
  font-size: 1.35rem;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8em;
  flex: 1;
  padding: 0.6em;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.color || "inherit"};
  border-radius: 10px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Divider = styled.hr`
  border: 0.3px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const DropdownProfile = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  useEffect(() => {
    setIsOpen(props.isOpen || false);
  }, [props.isOpen]);

  return (
    <DropdownWrapper isOpen={isOpen} ref={ref}>
      <DropdownItem to="/profile">
        <VerifiedUser fontSize="medium" />
        My Profile
      </DropdownItem>
      <DropdownItem to="#">
        <VerifiedUser fontSize="medium" />
        Group Chat
      </DropdownItem>
      <Divider />
      <DropdownItem to="/logout" color="#e00000">
        <VerifiedUser fontSize="medium" />
        Logout
      </DropdownItem>
    </DropdownWrapper>
  );
});

export default DropdownProfile;
