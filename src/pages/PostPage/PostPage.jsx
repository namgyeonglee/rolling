import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { API_INFO, putParams } from "../../api/api";
import { useApi, useFetch } from "./../../hooks/useFetch";
import { Cards } from "./Cards";
import { PostNav } from "./PostNav";

const Content = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.$backgroundColor};
  background-image: url(${(props) => props.$backgroundImageURL});
  height: calc(100vh - 142px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DeleteButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  height: 56px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: var(--purple600);
  border-radius: 12px;
  border: none;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    width: 720px;
  }

  @media screen and (max-width: 767px) {
    width: 320px;
  }
`;

const { baseUrl, endPoints } = API_INFO;

export function PostPage({ editable }) {
  const { postId } = useParams();
  const navigator = useNavigate();

  const { data, loading, error } = useFetch({
    url: baseUrl + putParams(endPoints.getRecipientsById.url, postId),
    method: endPoints.getRecipientsById.method,
  });
  const [sendRequest] = useApi();

  const handleDelete = () => {
    sendRequest({
      url: baseUrl + putParams(endPoints.deleteRecipients.url, postId),
      method: endPoints.deleteRecipients.method,
      callback: () => {
        navigator("/list");
      },
    });
  };

  return (
    <>
      <PostNav postData={data} postId={postId} />
      {!loading && error === null && (
        <Content
          $backgroundImageURL={data.backgroundImageURL}
          $backgroundColor={data.backgroundColor}
        >
          <Cards postId={postId} editable={editable} />
          {editable && (
            <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
          )}
        </Content>
      )}
    </>
  );
}
