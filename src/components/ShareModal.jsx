import styled from "styled-components";

const StyledModal = styled.div`
  width: 140px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  padding: 10px 0;
`;
const ShareItem = styled.div`
  padding: 16px;
  text-align: left;
  font-size: 16px;

  &:nth-child(2) {
    background-color: #f6f6f6;
  }
`;

export function ShareModal({ setOpenList, getData, getLoading, getError }) {
  return (
    <StyledModal>
      <ShareItem>카카오톡 공유</ShareItem>
      <ShareItem>URL 공유</ShareItem>
    </StyledModal>
  );
}
