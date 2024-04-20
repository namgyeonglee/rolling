import { useState } from "react";
import JsxParser from "react-jsx-parser";
import styled from "styled-components";
import { API_INFO, putParams } from "../../api/api";
import deleteButton from "../../assets/deleteButton.png";
import { getFormatDate } from "../../utils/date";
import { CardModal } from "./CardModal";

const { baseUrl, endPoints } = API_INFO;

const RELATIONSHIP = {
  가족: {
    back: "--green100",
    color: "--green500",
  },
  동료: {
    back: "--purple100",
    color: "--purple600",
  },
  친구: {
    back: "--blue100",
    color: "--blue500",
  },
  지인: {
    back: "--orange100",
    color: "--orange500",
  },
};

export const CardDiv = styled.div`
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
  border-radius: 16px;
  padding: 28px 24px;
  box-sizing: border-box;
  background-color: white;
`;

const HeadGridDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr 2fr;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray200);
`;

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProfileImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: white;
  border: 1px solid var(--gray300);
  border-radius: 6px;
  width: 40px;
  height: 40px;
`;

const ContentDiv = styled.div`
  margin-top: 20px;
  color: var(--gray600);
  font-family: ${(props) => props.$font};
  word-break: break-all;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
    height: 120px;
  }

  @media screen and (max-width: 767px) {
    font-size: 15px;
    line-height: 22px;
    height: 75px;
  }
`;

const LineLimitDiv = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    -webkit-line-clamp: 3;
  }

  @media screen and (max-width: 767px) {
    -webkit-line-clamp: 2;
  }
`;

export const StyledSpan = styled.span`
  font-weight: ${(props) => props.$weigth};
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
`;

export const RelationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  font-size: 14px;
  border-radius: 4px;
  background-color: var(${(props) => RELATIONSHIP[props.$relation].back});
  color: var(${(props) => RELATIONSHIP[props.$relation].color});
`;

export function Card({
  id,
  sender,
  profileImageURL,
  relationship,
  content,
  font,
  createdAt,
  sendRequest,
  setCardData,
  editable,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const deleteCard = (e) => {
    e.stopPropagation();

    sendRequest({
      url: baseUrl + putParams(endPoints.deleteMessages.url, id),
      method: endPoints.deleteMessages.method,
      callback: () => {
        setCardData((prev) => prev.filter((item) => item.id !== id));
      },
    });
  };

  return (
    <>
      <CardDiv onClick={showModal}>
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
          <div>
            {editable ? (
              <DeleteButton onClick={deleteCard}>
                <img src={deleteButton} />
              </DeleteButton>
            ) : (
              false
            )}
          </div>
        </HeadGridDiv>
        <ContentDiv $font={font}>
          <LineLimitDiv>
            <JsxParser jsx={content} />
          </LineLimitDiv>
        </ContentDiv>
        <StyledSpan $size={"12px"} $color={"var(--gray400)"}>
          {getFormatDate(new Date(createdAt), ".")}
        </StyledSpan>
      </CardDiv>
      {modalOpen && (
        <CardModal
          setModalOpen={setModalOpen}
          sender={sender}
          profileImageURL={profileImageURL}
          relationship={relationship}
          content={content}
          font={font}
          createdAt={createdAt}
        />
      )}
    </>
  );
}
