import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import rolling from "../assets/images/rolling.svg";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #cccccc;
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
`;

export function Nav() {
  return (
    <StyledNav>
      <StyledGnb>
        <a>
          <img src={logo} alt="rolling logo" />
          <StyledLogo src={rolling} alt="rolling logo" />
        </a>
        <a>
          <StyledButton>롤링 페이퍼 만들기</StyledButton>
        </a>
      </StyledGnb>
    </StyledNav>
  );
}
