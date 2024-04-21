import styled from "styled-components";
import { Bold24 } from "../../styles/FontStyle";
import { DISPLAY_SIZE } from "../../styles/SizeSet";
import { RecipientCardList } from "./RecipientCardList";

const Section = styled.section`
  display: column;
  width: 100%;
  max-width: 118rem;
  margin: 0 auto;
  padding-top: 5rem;

  @media (min-width: ${DISPLAY_SIZE.MIN_TABLET}px) and (max-width: ${DISPLAY_SIZE.MAX_TABLET}px) {
    max-width: calc(100% - 48px);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media (min-width: ${DISPLAY_SIZE.MIN_MOBILE}px) and (max-width: ${DISPLAY_SIZE.MAX_MOBILE}px) {
    max-width: calc(100% - 20px);
    margin-left: 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 359px) {
    max-width: calc(100% - 10px);
    margin-left: 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TitleContainer = styled.div``;
const RecipientCardListContainer = styled.div``;

const Title = styled.h2`
  display: flex;
  margin-bottom: 1.6rem;
  ${Bold24}

  @media (min-width: ${DISPLAY_SIZE.MIN_MOBILE}px) and (max-width: ${DISPLAY_SIZE.MIN_MOBILE}px) {
    font-size: 2rem;
    font-weight: 600;
    line-height: 3rem;
  }
`;

export function ListContent({ title, recipients, setDataUrl, next }) {
  return (
    <Section>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <RecipientCardListContainer>
        <RecipientCardList
          recipients={recipients}
          setDataUrl={setDataUrl}
          next={next}
        />
      </RecipientCardListContainer>
    </Section>
  );
}
