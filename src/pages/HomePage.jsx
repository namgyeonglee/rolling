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
  width: 1200px;
  height: 324px;
  background-color: #f6f8ff;
  border-radius: 16px;
  &:nth-child(2) {
    flex-direction: row-reverse;
  }
`;

const StyledText = styled.div`
  flex: 1;
  margin: 0px 60px;
`;

const StyleImage = styled.div`
  flex-shrink: 0;
`;

const StylePoint = styled.p`
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

const StyleTitle = styled.h2`
  max-width: 268px;
  font-size: 24px;
  font-weight: 700;
  color: #181818;
  line-height: 36px;
  margin-bottom: 8px;
`;

const StyleDesc = styled.p`
  color: #555555;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 28px;
`;

const StylepButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 150px;
`;

const StyleButton = styled.button`
  background-color: #9935ff;
  width: 280px;
  height: 56px;
  border-radius: 12px;
  padding: 14px 24px;
  border: none;
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export function HomePage() {
  return (
    <>
      <StyledArticle>
        <StyledSection>
          <StyledText>
            <StylePoint>Point. 01</StylePoint>
            <StyleTitle>
              누구나 손쉽게,온라인 롤링 페이퍼를 만들 수 있어요
            </StyleTitle>
            <StyleDesc>로그인 없이 자유롭게 만들어요</StyleDesc>
          </StyledText>
          <StyleImage>
            <img src={mainImg1} />
          </StyleImage>
        </StyledSection>
        <StyledSection>
          <StyledText>
            <StylePoint>Point. 02</StylePoint>
            <StyleTitle>서로에게 이모지로 감정을 표현해보세요</StyleTitle>
            <StyleDesc>롤링 페이퍼에 이모지를 추가할 수 있어요.</StyleDesc>
          </StyledText>
          <StyleImage>
            <img src={mainImg2} />
          </StyleImage>
        </StyledSection>
      </StyledArticle>
      <StylepButtonDiv>
        <StyleButton>구경해보기</StyleButton>
      </StylepButtonDiv>
    </>
  );
}
