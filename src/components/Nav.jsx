import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import rolling from "../assets/images/rolling.svg";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #cccccc;

  @media screen and (max-width: 767px) {
    ${() => {
      if (
        window.location.pathname.includes("/post/") &&
        window.location.pathname.length > "/post/".length
      ) {
        return `
          display: none;
        `;
      }
    }}
  }
`;

const StyledGnb = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: 1207px;
  height: 62px;
  @media screen and (max-width: 1248px) {
    padding: 0 24px;
  }
`;

const StyledLogo = styled.img`
  margin-left: 8px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #cccccc;
  color: #181818;
  padding: 8px 16px;
  font-size: 16px;
  background: none;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
export function Nav() {
  return (
    <StyledNav>
      <StyledGnb>
        <StyledLink to="/">
          <img src={logo} alt="rolling logo" />
          <StyledLogo src={rolling} alt="rolling logo" />
        </StyledLink>
        <StyledLink to="/post">
          <StyledButton>롤링 페이퍼 만들기</StyledButton>
        </StyledLink>
      </StyledGnb>
    </StyledNav>
  );
}
