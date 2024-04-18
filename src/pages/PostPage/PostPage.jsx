import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { API_INFO, putParams } from '../../api/api';
import { useFetch } from './../../hooks/useFetch';
import { Cards } from './Cards';

const Content = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.$backgroundColor};
  background-image: url(${(props) => props.$backgroundImageURL});
  height: calc(100vh - 133px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export function PostPage({ editable }) {
  const { postId } = useParams();
  const { baseUrl, endPoints } = API_INFO;

  const { data, loading, error } = useFetch({
    url: baseUrl + putParams(endPoints.getRecipientsById.url, postId),
    method: endPoints.getRecipientsById.method,
  });

  return (
    <>
      <div style={{ height: '117px' }}></div>
      {!loading && error === null && (
        <Content
          $backgroundImageURL={data.backgroundImageURL}
          $backgroundColor={data.backgroundColor}
        >
          <Cards postId={postId} editable={editable} />
        </Content>
      )}
    </>
  );
}
