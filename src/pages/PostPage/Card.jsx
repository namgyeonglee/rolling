import { useState } from "react";
import JsxParser from "react-jsx-parser";
import styled from "styled-components";
import { API_INFO, putParams } from "../../api/api";
import deleteButton from "../../assets/deleteButton.png";
import {
  Bold15,
  Bold18,
  Bold24,
  Bold32,
  Regular14,
  Regular15,
  Regular18,
} from "../../styles/FontStyle";
import { getFormatDate } from "../../utils/date";
import { CardModal } from "./CardModal";
import { fontFamily } from "./PostPage";

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
    width: 38.4rem;
    height: 28rem;
  }

  @media screen and (max-width: 1247px) {
    width: 35.2rem;
    height: 28.4rem;
  }

  @media screen and (max-width: 767px) {
    width: 32rem;
    height: 23rem;
  }
  border-radius: 16px;
  padding: 2.8rem 2.4rem;
  box-sizing: border-box;
  background-color: white;
`;

const HeadGridDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr 2fr;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray200);
`;

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileImg = styled.img`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 100px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: white;
  border: 1px solid var(--gray300);
  border-radius: 6px;
  width: 4rem;
  height: 4rem;
`;

const ContentDiv = styled.div`
  margin-top: 2rem;
  color: var(--gray600);
  word-break: break-all;

  @media screen and (min-width: 768px) {
    & p,
    u {
      ${Regular18}
    }
    & h1,
    h1 u {
      ${Bold32}
    }
    & h2,
    h2 u {
      ${Bold24}
    }
    & strong,
    strong u {
      ${Bold18}
    }

    height: 12rem;
  }

  @media screen and (max-width: 767px) {
    & p,
    u {
      ${Regular15}
    }
    & h1,
    h1 u {
      ${Bold24}
    }
    & h2,
    h2 u {
      ${Bold18}
    }
    & strong,
    strong u {
      ${Bold15}
    }

    height: 7.5rem;
  }

  & p,
  u,
  h1,
  h1 u,
  h2,
  h2 u,
  strong,
  strong u {
    font-family: ${(props) => fontFamily[props.$font]};
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
  ${Regular14}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 2rem;
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
  reFetch,
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
        console.log("test");
        setCardData((prev) => prev.filter((item) => item.id !== id));
        console.log(reFetch);
        reFetch();
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
              <StyledSpan $size={"2rem"}>From. </StyledSpan>
              <StyledSpan $weigth={"bold"} $size={"2rem"}>
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
        <StyledSpan $size={"1.2rem"} $color={"var(--gray400)"}>
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
