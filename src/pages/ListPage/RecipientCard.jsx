import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Bold24, Regular16 } from "../../styles/FontStyle";
import { DISPLAY_SIZE } from "../../styles/SizeSet";
import { WrittenByIcons } from "./WrittenByIcons";

const getColor = (backgroundColor) => {
  switch (backgroundColor) {
    case "purple":
      return "var(--purple200)";
    case "beige":
      return "var(--orange200)";
    case "blue":
      return "var(--blue200)";
    case "green":
      return "var(--green200)";
    default:
      return "var(--orange200)";
  }
};

const getPatternImage = (backgroundColor) => {
  switch (backgroundColor) {
    case "purple":
      return "/src/assets/pattern_purple.svg";
    case "beige":
      return "/src/assets/pattern_orange.svg";
    case "blue":
      return "/src/assets/pattern_blue.svg";
    case "green":
      return "/src/assets/pattern_green.svg";
    default:
      return "";
  }
};

const RecipientTextColor = ({ backgroundImage }) =>
  backgroundImage ? "var(--white)" : "var(--gray900)";

const WriterTextColor = ({ backgroundImage }) =>
  backgroundImage ? "var(--gray200)" : "var(--gray700)";

const CardWrapper = styled.a`
  position: relative;
  width: 27.5rem;
  height: 26rem;
  padding: 3rem 2.4rem 2rem 2.4rem;
  border-radius: 1.6rem;
  border: 0.1rem solid #0000001a;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0rem 0.2rem 1.2rem 0rem #00000014;
  background-color: ${({ $backgroundColor }) => getColor($backgroundColor)};
  ${({ $backgroundImage, $backgroundColor }) =>
    $backgroundImage
      ? css`
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.3)
            ),
            url(${$backgroundImage});
          background-size: cover;
          background-repeat: no-repeat;
        `
      : css`
          &::before {
            content: "";
            position: absolute;
            width: 14.2rem;
            height: 14.2rem;
            top: 11.8rem;
            left: 13.3rem;
            background-image: url(${getPatternImage($backgroundColor)});
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}

  @media (min-width: ${DISPLAY_SIZE.MIN_MOBILE}px) and (max-width: ${DISPLAY_SIZE.MAX_MOBILE}px) {
    width: 20.8rem;
    height: 23.2rem;
    padding: 3rem 2.2rem 2rem 2.4rem;
    background-color: ${({ $backgroundColor }) => getColor($backgroundColor)};
    ${({ $backgroundImage, $backgroundColor }) =>
      $backgroundImage
        ? css`
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
              ),
              url(${$backgroundImage});
            background-size: cover;
            background-repeat: no-repeat;
          `
        : css`
            &::before {
              content: "";
              position: absolute;
              width: 10.74rem;
              height: 14.2rem;
              top: 11.8rem;
              left: 10.06rem;
              background-image: url(${getPatternImage($backgroundColor)});
              background-size: cover;
              background-repeat: no-repeat;
            }
          `}
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 4.3rem;
`;

const RecipientText = styled.span`
  color: ${({ $backgroundImage }) =>
    RecipientTextColor({ backgroundImage: $backgroundImage })};
  ${Bold24}
`;

const FlexCenter = css`
  display: flex;
  align-items: center;
`;

const WrittenBy = styled.div`
  ${FlexCenter}
  height: 2.8rem;
  gap: 11px;
  color: var(--gray900);
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
`;

const WriterText = styled.span`
  color: ${({ $backgroundImage }) =>
    WriterTextColor({ backgroundImage: $backgroundImage })};
  ${Regular16}
`;

const WriterNumText = styled.span`
  font-weight: 700;
`;

const Division = styled.hr`
  position: relative;
  width: 22.7rem;
  z-index: 1;
  border: 0.1rem solid #0000001f;
`;

const EmojiGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.6rem;
  z-index: 1;
`;

const EmojiCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: auto;
  height: 3.6rem;
  padding: 0.8rem 1.2rem;
  border-radius: 3.2rem;
  background: rgba(0, 0, 0, 0.54);
  color: var(--white);
  ${Regular16}
`;

const Emoji = styled.span`
  padding: 0 0.2rem;
  margin-right: 0.2rem;
  font-size: 1.6rem;
`;

export function RecipientCard({ recipient }) {
  const backgroundColor = recipient.backgroundColor || "beige";
  const backgroundImage = recipient.backgroundImageURL;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${recipient.id}`);
  };

  return (
    <CardWrapper
      onClick={handleCardClick}
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
    >
      <CardContent>
        <RecipientInfo>
          <RecipientText $backgroundImage={backgroundImage}>
            To. {recipient.name}
          </RecipientText>
          <WrittenBy>
            <WrittenByIcons
              profileUrl={recipient.recentMessages.map(
                (message) => message.profileImageURL,
              )}
              peopleNum={recipient.messageCount}
            />
          </WrittenBy>
          <WriterText $backgroundImage={backgroundImage}>
            <WriterNumText>{recipient.messageCount}</WriterNumText>명이
            작성했어요!
          </WriterText>
        </RecipientInfo>
        <Division />
        <EmojiGroup>
          {recipient.topReactions.map((reaction) => (
            <EmojiCount key={reaction.id}>
              <Emoji>{reaction.emoji}</Emoji>
              <span>{reaction.count}</span>
            </EmojiCount>
          ))}
        </EmojiGroup>
      </CardContent>
    </CardWrapper>
  );
}
