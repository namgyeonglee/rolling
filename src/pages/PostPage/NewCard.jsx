import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import addButton from '../../assets/addButton.png';
import { CardDiv } from './Card';

const CenterFlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.img`
  width: 56px;
  height: 56px;
  cursor: pointer;
`;

const NewCardDiv = styled(CardDiv)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function NewCard() {
  return (
    <NewCardDiv>
      <CenterFlexDiv>
        <Link to="message">
          <AddButton src={addButton} alt="롤링페이퍼 추가 버튼" />
        </Link>
      </CenterFlexDiv>
    </NewCardDiv>
  );
}
