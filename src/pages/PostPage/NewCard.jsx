import { Link } from "react-router-dom";
import { styled } from "styled-components";
import addButton from "../../assets/addButton.png";
import { CardDiv } from "./Card";

const CenterFlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1248px) {
    width: 384px;
    height: 280px;
  }

  @media screen and (max-width: 1247px) {
    width: 352px;
    height: 284px;
  }

  @media screen and (max-width: 767px) {
    width: 320px;
    height: 230px;
  }
`;

const AddButton = styled.img`
  width: 56px;
  height: 56px;
  cursor: pointer;
`;

const NewCardDiv = styled(CardDiv)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function NewCard({ linkUrl }) {
  return (
    <NewCardDiv>
      <CenterFlexDiv>
        <Link to={linkUrl}>
          <AddButton src={addButton} alt="롤링페이퍼 추가 버튼" />
        </Link>
      </CenterFlexDiv>
    </NewCardDiv>
  );
}
