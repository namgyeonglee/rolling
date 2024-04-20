import { useEffect, useRef } from "react";
import JsxParser from "react-jsx-parser";
import { styled } from "styled-components";
import { getFormatDate } from "./../../utils/date";
import { HeaderDiv, ProfileImg, RelationDiv, StyledSpan } from "./Card";

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 998;
`;

const ModalDiv = styled.div`
  @media screen and (min-width: 768px) {
    width: 600px;
    height: 476px;
  }

  @media screen and (max-width: 767px) {
    width: 400px;
    height: 400px;
  }
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 40px;
`;

const HeadGridDiv = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr 70px;
  gap: 16px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray200);
  box-sizing: border-box;
`;

const DateDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--gray400);
`;

const ContentDiv = styled.div`
  margin-top: 20px;
  height: 48%;
  color: var(--gray600);
  font-family: ${(props) => props.$font};
  font-size: 18px;
  line-height: 30px;
  overflow-y: scroll;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray300);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const ModalBottom = styled.div`
  width: 100%;
  height: 34%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 20px;
`;

const CloseButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 6px;
  border: none;
  background-color: var(--purple600);
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

export function CardModal({
  setModalOpen,
  sender,
  profileImageURL,
  relationship,
  font,
  createdAt,
  content,
}) {
  const modalRef = useRef();

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <ModalBack>
      <ModalDiv ref={modalRef}>
        <HeadGridDiv>
          <ProfileImg src={profileImageURL} />
          <HeaderDiv>
            <div>
              <StyledSpan $size={"20px"}>From. </StyledSpan>
              <StyledSpan $weigth={"bold"} $size={"20px"}>
                {sender}
              </StyledSpan>
            </div>
            <RelationDiv $relation={relationship}>{relationship}</RelationDiv>
          </HeaderDiv>
          <DateDiv>{getFormatDate(new Date(createdAt), ".")}</DateDiv>
        </HeadGridDiv>
        <ContentDiv $font={font}>
          <JsxParser jsx={content} />
        </ContentDiv>
        <ModalBottom>
          <CloseButton onClick={closeModal}>확인</CloseButton>
        </ModalBottom>
      </ModalDiv>
    </ModalBack>
  );
}
