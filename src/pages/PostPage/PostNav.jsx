import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { API_INFO, KakaoShare, putParams } from "../../api/api";
import addIcon from "../../assets/images/addIcon.svg";
import downArrow from "../../assets/images/downArrow.svg";
import emogiIcon from "../../assets/images/emogiIcon.svg";
import shareIcon from "../../assets/images/shareIcon.svg";
import { useApi } from "../../hooks/useApi";
import { useScript } from "../../hooks/useScript";
import { Bold18, Bold28, Regular16, Regular18 } from "../../styles/FontStyle";
import { EmojiModal } from "./EmojiModal";
import { Profiles } from "./Profiles";
import { ShareModal } from "./ShareModal";

const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  color: var(--gray900);

  @media screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$width};
  height: 3.6rem;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #cccccc;
  color: #181818;
  background: none;
  position: relative;

  @media screen and (max-width: 767px) {
    width: 3.6rem;
    height: 3.2rem;
  }
`;

const StyledDiv = styled.div`
  width: 0;
  height: 2.8rem;
  border-right: 0.1rem solid var(--gray200);
  margin: 0 1.6rem;

  @media screen and (max-width: 1247px) {
    ${(props) => {
      if (props.$onlyPc) {
        return "display: none;";
      }
    }}
  }
`;

const EmojiPickerDiv = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;

  @media screen and (max-width: 767px) {
    top: 4rem;
    right: -5rem;
  }
`;

const ShareDiv = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  width: auto;
  height: 100%;

  @media screen and (max-width: 767px) {
    left: -10rem;
    &::before {
      display: none;
    }
  }
`;

const RelativeDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 1.2rem;
`;

const EmojiContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1248px) {
    justify-content: flex-start;
  }
`;

const Emoji = styled.div`
  ${Regular16}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  width: 6.6rem;
  height: 3.6rem;
  background-color: rgb(0, 0, 0, 0.54);
  color: white;
  margin-right: 0.8rem;
`;

const AddIconImg = styled.img`
  margin-left: 0.4rem;
  width: 2.8rem;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const EmogiIconImg = styled.img`
  width: 2.4rem;
`;

const ShareIconImg = styled.img`
  width: 2.4rem;
`;

const ProfileContainer = styled.div`
  ${Regular18}
  display: flex;
  align-items: center;

  & strong {
    ${Bold18}
  }

  @media screen and (max-width: 1247px) {
    display: none;
  }
`;

const ProfileImgContainer = styled.div`
  width: 80px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 6.8rem;
  padding: 0 2.4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 1248px) {
    width: 1200px;
    padding: 0 0;
  }

  @media screen and (max-width: 1247px) {
  }

  @media screen and (max-width: 767px) {
    height: 10.4rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const NameDiv = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 768px) {
    ${Bold28}
  }

  @media screen and (max-width: 767px) {
    ${Bold18}
  }
`;

const FlexDIv = styled.div`
  display: flex;
  align-items: center;
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
    sendRequest: reFetch,
    data: emojiData,
    loading: emojiLoading,
    error: emojiError,
  } = useApi({
    url:
      baseUrl +
      putParams(endPoints.getRecipientsReactions.url, postId) +
      "?limit=8",
    immediate: true,
  });
  const { sendRequest } = useApi();

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
      callback: () => {
        reFetch();
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

  useEffect(() => {
    if (!scriptLoading && scriptError === null) {
      if (Kakao?.isInitialized()) return;
      Kakao?.init(KakaoShare.javaScriptKey);
    }
  }, [scriptLoading]);

  return (
    <HeaderContainer>
      <StyledHeader>
        <NameDiv>To.{postData?.name}</NameDiv>
        <HeaderRightDiv>
          <ProfileContainer>
            <ProfileImgContainer>
              {postData?.messageCount > 0 && (
                <Profiles
                  items={postData?.recentMessages}
                  length={postData?.messageCount}
                />
              )}
            </ProfileImgContainer>
            <strong>{postData?.messageCount}</strong>명이 작성했어요!
          </ProfileContainer>
          <StyledDiv $onlyPc={true} />
          <EmojiContainer>
            {!emojiLoading &&
              emojiError === null &&
              emojiData.results.map((item, idx) => {
                if (idx < 3)
                  return (
                    <Emoji key={item.id}>
                      {item.emoji} {item.count}
                    </Emoji>
                  );
                else return;
              })}
            <RelativeDiv>
              <img src={downArrow} onClick={handleDownArrowClcik}></img>
              <EmojiPickerDiv ref={EmogimodalRef}>
                {openEmogiModal && (
                  <EmojiModal
                    setOpenList={setOpenEmogiModal}
                    getData={emojiData}
                    getLoading={emojiLoading}
                    getError={emojiError}
                  ></EmojiModal>
                )}
              </EmojiPickerDiv>
            </RelativeDiv>
          </EmojiContainer>
          <FlexDIv>
            <StyledButton $width="8.8rem" onClick={handleClick}>
              <EmogiIconImg src={emogiIcon} />
              <AddIconImg src={addIcon} />
              <EmojiPickerDiv ref={EmojiRef}>
                {openSelector && (
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
              </EmojiPickerDiv>
            </StyledButton>
            <StyledDiv />
            <StyledButton $width="5.6rem" onClick={handleShareClcik}>
              <ShareIconImg src={shareIcon} />
              <ShareDiv ref={ShareRef}>
                {openShareModal && (
                  <ShareModal
                    shareKakao={shareMessage}
                    toast={toast}
                  ></ShareModal>
                )}
              </ShareDiv>
            </StyledButton>
          </FlexDIv>
        </HeaderRightDiv>
      </StyledHeader>
      <Toaster position="bottom-center" reverseOrder={false} />
    </HeaderContainer>
  );
}
