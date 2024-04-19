import { Link } from "react-router-dom";
import styled from "styled-components";
import mainImg1 from "../assets/images/mainImg1.png";
import mainImg2 from "../assets/images/mainImg2.png";

const StyledArticle = styled.article`
  display: grid;
  justify-content: center;
  row-gap: 30px;
  width: 100%;
  padding: 60px 0;
`;

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 324px;
  background-color: #f6f8ff;
  border-radius: 16px;
  &:nth-child(2) {
    flex-direction: row-reverse;
  }
  @media screen and (max-width: 1248px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: normal;
    padding: 46px 0;
    height: auto;
    &:nth-child(2) {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 767px) {
    width: auto;
    margin: 0 24px;
    height: auto;
    padding: 20px;
  }
`;

const StyledText = styled.div`
  flex: 1;
  margin: 0px 60px;
  @media screen and (max-width: 1248px) {
    flex: none;
    padding-bottom: 36px;
  }
`;

const StyledImage = styled.img`
  flex-shrink: 0;

  @media screen and (max-width: 1248px) {
    text-align: center;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const StyledPoint = styled.p`
  border-radius: 50px;
  background-color: #9935ff;
  padding: 12px 0px;
  color: #fff;
  max-width: 82px;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
`;

const StyledTitle = styled.h2`
  max-width: 268px;
  font-size: 24px;
  font-weight: 700;
  color: #181818;
  line-height: 36px;
  margin-bottom: 8px;
  @media screen and (max-width: 1248px) {
    max-width: 100%;
  }
`;

const StyledDesc = styled.p`
  color: #555555;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 28px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  padding-bottom: 150px;
  text-decoration: none;
  @media screen and (max-width: 1248px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  background-color: #9935ff;
  width: 280px;
  height: 56px;
  border-radius: 12px;
  padding: 14px 24px;
  border: none;
  color: #fff;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 1248px) {
    width: 90%;
  }
`;

export function HomePage() {
  return (
    <>
      <StyledArticle>
        <StyledSection>
          <StyledText>
            <StyledPoint>Point. 01</StyledPoint>
            <StyledTitle>
              누구나 손쉽게,온라인 롤링 페이퍼를 만들 수 있어요
            </StyledTitle>
            <StyledDesc>로그인 없이 자유롭게 만들어요</StyledDesc>
          </StyledText>
          <StyledImage src={mainImg1} />
        </StyledSection>
        <StyledSection>
          <StyledText>
            <StyledPoint>Point. 02</StyledPoint>
            <StyledTitle>서로에게 이모지로 감정을 표현해보세요</StyledTitle>
            <StyledDesc>롤링 페이퍼에 이모지를 추가할 수 있어요.</StyledDesc>
          </StyledText>
          <StyledImage src={mainImg2} />
        </StyledSection>
      </StyledArticle>
      <StyledLink to="/list">
        <StyledButton>구경해보기</StyledButton>
      </StyledLink>
    </>
  );
}
