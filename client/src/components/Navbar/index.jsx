import styled from "styled-components";
import Logo from "../common/Logo";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ArrowDropDown } from "@material-ui/icons";
import userPNG from "../../images/user.png";
import DropdownProfile from "../common/DropdownProfile";
import { useState, useRef, useEffect } from "react";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0;
  }
`;
const NavBarWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 1.4em 0;

  @media (min-width: 768px) {
    padding: 3em 0;
  }
`;
const NavBarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
  cursor: pointer;
  padding: 0.6em;
  border-radius: 15%;
  transition: background 0.1s ease-in-out;

  :hover {
    background-color: #f5f5f5;
  }
`;

const ProfileImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 15%;

  @media (min-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

const ProfileName = styled.span`
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const ArrowDropDownStyled = styled.span`
  font-size: 2.5rem !important;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;
const ColumnProfile = styled.div`
  display: block;
  position: relative;
`;
function NavBar() {
  const { auth } = useContext(AuthContext);
  const dropdown = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen) {
        if (dropdown.current && !dropdown.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <NavBarContainer>
      <NavBarWrapper>
        <NavBarRow>
          <div>
            <Logo isLink marginBottom="0" height="23px" />
          </div>
          <ColumnProfile>
            <ProfileImageWrapper
              tabIndex="0"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ProfileImage
                referrerPolicy="no-referrer"
                src={auth.user.photo ?? userPNG}
              />
              <ProfileName>{auth.user.name}</ProfileName>
              <ArrowDropDownStyled>
                <ArrowDropDown />
              </ArrowDropDownStyled>
            </ProfileImageWrapper>
            <DropdownProfile ref={dropdown} isOpen={isOpen} />
          </ColumnProfile>
        </NavBarRow>
      </NavBarWrapper>
    </NavBarContainer>
  );
}

export default NavBar;
