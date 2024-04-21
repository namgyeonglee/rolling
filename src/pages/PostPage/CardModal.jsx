import { useEffect, useRef } from "react";
import JsxParser from "react-jsx-parser";
import { styled } from "styled-components";
import {
  Bold15,
  Bold18,
  Regular14,
  Regular15,
  Regular16,
  Regular18,
} from "../../styles/FontStyle";
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
    width: 60rem;
    height: 47.6rem;
  }

  @media screen and (max-width: 767px) {
    width: 40rem;
    height: 40rem;
  }
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 4rem;
`;

const HeadGridDiv = styled.div`
  display: grid;
  grid-template-columns: 5.6rem 1fr 7rem;
  gap: 1.6rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray200);
  box-sizing: border-box;
`;

const DateDiv = styled.div`
  ${Regular14}
  display: flex;
  align-items: center;
  color: var(--gray400);
`;

const ContentDiv = styled.div`
  margin-top: 2rem;
  height: 48% !important;
  color: var(--gray600);
  overflow-y: scroll;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray300);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }

  & p,
  u,
  h1,
  h2,
  strong {
    font-family: ${(props) => props.$font} !important;
  }

  @media screen and (min-width: 768px) {
    & p,
    u,
    h1,
    h2 {
      ${Regular18}
    }
    & strong {
      ${Bold18}
    }
    height: 12rem;
  }

  @media screen and (max-width: 767px) {
    & p,
    u,
    h1,
    h2 {
      ${Regular15}
    }
    & strong {
      ${Bold15}
    }
    height: 7.5rem;
  }
`;

const ModalBottom = styled.div`
  width: 100%;
  height: 34% !important;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;

const CloseButton = styled.button`
  ${Regular16}
  width: 12rem;
  height: 4rem;
  border-radius: 6px;
  border: none;
  background-color: var(--purple600);
  color: white;
  cursor: pointer;
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
