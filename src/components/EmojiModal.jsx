import styled from "styled-components";

const StyledModal = styled.div`
  width: 312px;
  height: 134px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  width: calc(25% - 14px);
  box-sizing: border-box;
  background-color: rgb(0, 0, 0, 0.54);
  color: #fff;
  padding: 6px 15px;
  margin-bottom: 10px;
  margin-right: 8px;
  height: 36px;
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
