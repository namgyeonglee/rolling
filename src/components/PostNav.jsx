import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { API_INFO, putParams } from "../api/api";
import addIcon from "../assets/images/addIcon.svg";
import downArrow from "../assets/images/downArrow.svg";
import emogiIcon from "../assets/images/emogiIcon.svg";
import shareIcon from "../assets/images/shareIcon.svg";
import { useApi, useFetch } from "../hooks/useFetch";
import { EmojiModal } from "./EmojiModal";
import { ShareModal } from "./ShareModal";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #EDEDED;
  }
`;

const StyledGnb = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: 1207px;
  height: 62px;
  @media screen and (max-width: 1248px) {
    padding: 0 24px;
  }
  @media screen and (max-width: 767px) {
    padding: 12px 20px;
    flex-direction: column;
    align-items: stretch;
    height: auto;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 767px) {
    padding: 8px 0;
    justify-content: flex-start;
  }
`;

const StyledName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #2b2b2b;
`;

const StyledNumber = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  font-size: 18px;
  padding: 0 28px;
  color: #181818;

  @media screen and (max-width: 1248px) {
    display: none;
  }
`;

const StyledBold = styled.span`
  font-weight: 700;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #cccccc;
  color: #181818;
  padding: 8px 16px;
  background: none;
  position: relative;

  &:last-child {
    margin-left: 26px;
  }
`;

const AbsoluteRightDiv = styled.div`
  position: absolute;
  top: 50px;
  right: 0;

  @media screen and (max-width: 767px) {
    top: 60px;
    right: -70px;
  }
`;

const AbsoluteLeftDiv = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: auto;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    bottom: 57px;
    right: 15px;
    width: 1px;
    height: 28px;
    background-color: #eeeeee;
  }

  @media screen and (max-width: 767px) {
    left: -100px;
  }
`;

const RelativeDiv = styled.div`
  position: relative;
`;

const EmojiGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -15px;
    width: 1px;
    height: 28px;
    background-color: #eeeeee;
  }
  @media screen and (max-width: 1248px) {
    &::before {
      display: none;
    }
  }
`;

const EmojiEach = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  width: 63px;
  height: 36px;
  background-color: rgb(0, 0, 0, 0.54);
  color: #fff;
  margin-right: 8px;
`;

const AddIconImg = styled.img`
  display: block;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const EmogiIconImg = styled.img`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ShareIconImg = styled.img`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const { baseUrl, endPoints } = API_INFO;

export function PostNav({ name, postId }) {
  const [openSelector, setOpenSelector] = useState(false);
  const [openEmogiModal, setOpenEmogiModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const EmojiRef = useRef();
  const EmogimodalRef = useRef();
  const ShareRef = useRef();

  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useFetch({
    url:
      baseUrl +
      putParams(endPoints.getRecipientsReactions.url, postId) +
      "?limit=8",
  });
  const [sendRequest, data, loading, error] = useApi();

  const handleClick = () => {
    setOpenSelector(true);
  };

  const handleEmojiClick = (e) => {
    sendRequest({
      url: baseUrl + putParams(endPoints.postRecipientsReactions.url, postId),
      method: endPoints.postRecipientsReactions.method,
      body: {
        emoji: e.emoji,
        type: "increase",
      },
    });
  };
  const handleDownArrowClcik = () => {
    setOpenEmogiModal(true);
  };

  const handleShareClcik = () => {
    setOpenShareModal(true);
  };

  useEffect(() => {
    const handler = (e) => {
      if (EmojiRef.current && !EmojiRef.current.contains(e.target)) {
        setOpenSelector(false);
      }
      if (EmogimodalRef.current && !EmogimodalRef.current.contains(e.target)) {
        setOpenEmogiModal(false);
      }
      if (ShareRef.current && !ShareRef.current.contains(e.target)) {
        setOpenShareModal(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <StyledNav>
      <StyledGnb>
        <StyledName>To. {name} </StyledName>
        <StyledDiv>
          <StyledNumber>
            <StyledBold>23</StyledBold>명이 작성했어요!
          </StyledNumber>
          <EmojiGroup>
            {!getLoading &&
              getError === null &&
              getData.results.map((item, idx) => {
                if (idx < 3)
                  return (
                    <EmojiEach key={item.id}>
                      {item.emoji}
                      {item.count}
                    </EmojiEach>
                  );
                else return;
              })}
            <RelativeDiv>
              <img src={downArrow} onClick={handleDownArrowClcik}></img>
              <AbsoluteRightDiv ref={EmogimodalRef}>
                {openEmogiModal && (
                  <EmojiModal
                    setOpenList={setOpenEmogiModal}
                    getData={getData}
                    getLoading={getLoading}
                    getError={getError}
                  ></EmojiModal>
                )}
              </AbsoluteRightDiv>
            </RelativeDiv>
          </EmojiGroup>
          <StyledButton onClick={handleClick}>
            <EmogiIconImg src={emogiIcon} />
            <AddIconImg src={addIcon} />
            <AbsoluteRightDiv ref={EmojiRef}>
              {openSelector && <EmojiPicker onEmojiClick={handleEmojiClick} />}
            </AbsoluteRightDiv>
          </StyledButton>
          <StyledButton>
            <ShareIconImg src={shareIcon} onClick={handleShareClcik} />
            <AbsoluteLeftDiv ref={ShareRef}>
              {openShareModal && <ShareModal></ShareModal>}
            </AbsoluteLeftDiv>
          </StyledButton>
        </StyledDiv>
      </StyledGnb>
    </StyledNav>
  );
}
