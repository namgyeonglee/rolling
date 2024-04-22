import styled from "styled-components";
import { Regular14, Regular16 } from "../../styles/FontStyle";

const StyledModal = styled.div`
  width: 31.2rem;
  height: 13.4rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1247px) {
    width: 24.8rem;
    height: 13.4rem;
  }

  @media screen and (max-width: 767px) {
    width: 20.3rem;
    height: 9.8rem;
  }
`;
const EmojiGroup = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  gap: 1rem 0.8rem;

  @media screen and (max-width: 1247px) {
    grid-template: repeat(2, 1fr) / repeat(3, 1fr);
    & div:nth-child(n + 7) {
      display: none;
    }
  }
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
  height: 3.8rem;

  @media screen and (max-width: 767px) {
    ${Regular14}
    letter-spacing: 0.2rem;
    width: 5.3rem;
    height: 2.8rem;
  }
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
