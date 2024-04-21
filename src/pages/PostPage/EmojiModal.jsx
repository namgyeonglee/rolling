import styled from "styled-components";
import { Regular16 } from "../../styles/FontStyle";

const StyledModal = styled.div`
  width: 31.2rem;
  height: 13.4rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EmojiGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const EmojiEach = styled.div`
  ${Regular16}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  width: 6.3rem;
  box-sizing: border-box;
  background-color: rgb(0, 0, 0, 0.54);
  color: #fff;
  padding: 0.6rem 1.5rem;
  margin-bottom: 1rem;
  margin-right: 0.8rem;
  height: 3.8rem;
`;

export function EmojiModal({ getData, getLoading, getError }) {
  return (
    <StyledModal>
      <EmojiGroup>
        {!getLoading &&
          getError === null &&
          getData.results.map((item) => {
            return (
              <EmojiEach key={item.id}>
                {item.emoji}
                {item.count}
              </EmojiEach>
            );
          })}
      </EmojiGroup>
    </StyledModal>
  );
}
