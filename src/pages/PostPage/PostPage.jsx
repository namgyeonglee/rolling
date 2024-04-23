import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { API_INFO, putParams } from "../../api/api";
import { useApi } from "../../hooks/useApi";
import { Bold18 } from "../../styles/FontStyle";
import { Cards } from "./Cards";
import { PostNav } from "./PostNav";

const back = {
  purple: "var(--purple200)",
  beige: "var(--orange200)",
  blue: "var(--blue200)",
  green: "var(--green200)",
};

export const fontFamily = {
  "Noto Sans": "NotoSans",
  Pretendard: "Pretendard",
  나눔명조: "NanumMyeongjo",
  "나눔손글씨 손편지체": "NanumSon",
};

const Content = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => back[props.$backgroundColor]};
  background-image: url(${(props) => props.$backgroundImageURL});
  background-size: cover;
  height: calc(100vh - 13.1rem);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 767px) {
    height: calc(100vh - 10.5rem);
  }

  @font-face {
    font-family: "NotoSans";
    src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2)
      format("woff2");
  }

  @font-face {
    font-family: "Pretendard";
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot");
  }

  @font-face {
    font-family: "NanumMyeongjo";
    src: url("https://cdn.jsdelivr.net/gh/wizfile/font/NanumMyeongjo.woff")
      format("woff");
  }

  @font-face {
    font-family: "NanumSon";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Handletter.woff")
      format("woff");
  }
`;

const DeleteButton = styled.button`
  ${Bold18}
  position: fixed;
  left: 50%;
  bottom: 2.4rem;
  transform: translateX(-50%);
  height: 56px;
  color: white;
  background-color: var(--purple600);
  border-radius: 12px;
  border: none;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    width: 72rem;
  }

  @media screen and (max-width: 767px) {
    width: 32rem;
  }
`;

const { baseUrl, endPoints } = API_INFO;

export function PostPage({ editable }) {
  const { postId } = useParams();
  const navigator = useNavigate();

  const {
    sendRequest: reFetch,
    data,
    loading,
    error,
  } = useApi({
    url: baseUrl + putParams(endPoints.getRecipientsById.url, postId),
    immediate: true,
  });
  const { sendRequest } = useApi({
    url: baseUrl + putParams(endPoints.deleteRecipients.url, postId),
    method: endPoints.deleteRecipients.method,
    callback: () => {
      navigator("/list");
    },
  });

  const handleDelete = () => {
    sendRequest();
  };

  return (
    <>
      <PostNav postData={data} postId={postId} />
      {!loading && error === null && (
        <Content
          $backgroundImageURL={data.backgroundImageURL}
          $backgroundColor={data.backgroundColor}
        >
          <Cards postId={postId} editable={editable} reFetch={reFetch} />
          {editable && (
            <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
          )}
        </Content>
      )}
    </>
  );
}
