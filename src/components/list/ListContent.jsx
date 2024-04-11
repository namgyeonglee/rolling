import styled from "styled-components";
import { bold24 } from "../../styles/FontStyle";
import RecipientCardList from "./RecipientCardList";

const Section = styled.section`
  display: column;
  width: 100%;
  max-width: 118rem;
  margin: 0 auto;
  margin-top: 5rem;
`;

const TitleContainer = styled.div``;
const RecipientCardListContainer = styled.div``;

const Title = styled.h2`
  display: flex;
  margin-bottom: 1.6rem;
  ${bold24}
`;

function ListContent({ title, recipients }) {
  return (
    <Section>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <RecipientCardListContainer>
        <RecipientCardList recipients={recipients} />
      </RecipientCardListContainer>
    </Section>
  );
}

export default ListContent;
