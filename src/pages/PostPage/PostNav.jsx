import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { API_INFO, KakaoShare, putParams } from "../../api/api";
import addIcon from "../../assets/images/addIcon.svg";
import downArrow from "../../assets/images/downArrow.svg";
import emogiIcon from "../../assets/images/emogiIcon.svg";
import shareIcon from "../../assets/images/shareIcon.svg";
import { useApi, useFetch } from "../../hooks/useFetch";
import { useScript } from "../../hooks/useScript";
import { EmojiModal } from "./EmojiModal";
import { Profiles } from "./Profiles";
import { ShareModal } from "./ShareModal";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #ededed;
`;

const StyledGnb = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
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
  align-items: center;

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
    &::before {
      display: none;
    }
  }
`;

const RelativeDiv = styled.div`
  position: relative;
  @media screen and (max-width: 767px) {
    display: none;
  }
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

const ProfileContainer = styled.div`
  width: 80px;
`;

const { baseUrl, endPoints } = API_INFO;

function shareMessage() {
  // 피드 공유
  /*
  Kakao?.Share?.sendDefault({
    objectType: "feed",
    content: {
      title: "딸기 치즈 케익",
      description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
      imageUrl:
        "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
      link: {
        mobileWebUrl: "https://developers.kakao.com",
        webUrl: "https://developers.kakao.com",
      },
    },
    social: {
      likeCount: 286,
      commentCount: 45,
      sharedCount: 845,
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      {
        title: "앱으로 보기",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
    ],
  });
  */

  // 텍스트만 공유
  Kakao.Share.sendDefault({
    objectType: "text",
    text: "기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
    link: {
      mobileWebUrl: "https://developers.kakao.com",
      webUrl: "https://developers.kakao.com",
    },
  });
}

export function PostNav({ postData, postId }) {
  const [openSelector, setOpenSelector] = useState(false);
  const [openEmogiModal, setOpenEmogiModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const EmojiRef = useRef();
  const EmogimodalRef = useRef();
  const ShareRef = useRef();
  const [scriptLoading, scriptError] = useScript(KakaoShare.src);

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
      callback: () => {},
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

  useEffect(() => {
    if (!scriptLoading && scriptError === null) {
      if (Kakao?.isInitialized()) return;
      Kakao?.init(KakaoShare.javaScriptKey);
    }
  }, [scriptLoading]);

  return (
    <StyledNav>
      <StyledGnb>
        <StyledName>To. {postData?.name} </StyledName>
        <StyledDiv>
          <StyledNumber>
            <ProfileContainer>
              {postData?.messageCount > 0 && (
                <Profiles
                  items={postData?.recentMessages}
                  length={postData?.messageCount}
                />
              )}
            </ProfileContainer>
            <StyledBold>{postData?.messageCount}</StyledBold>명이 작성했어요!
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
          <StyledButton onClick={handleShareClcik}>
            <ShareIconImg src={shareIcon} />
            <AbsoluteLeftDiv ref={ShareRef}>
              {openShareModal && (
                <ShareModal
                  shareKakao={shareMessage}
                  toast={toast}
                ></ShareModal>
              )}
            </AbsoluteLeftDiv>
          </StyledButton>
        </StyledDiv>
      </StyledGnb>
      <Toaster position="bottom-center" reverseOrder={false} />
    </StyledNav>
  );
}
