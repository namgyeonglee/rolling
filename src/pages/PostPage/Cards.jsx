import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import { API_INFO, putParams } from "../../api/api";
import { useApi } from "../../hooks/useApi";
import { Card } from "./Card";
import { NewCard } from "./NewCard";

const GridDiv = styled.div`
  display: grid;
  justify-items: center;
  box-sizing: border-box;
  margin: auto auto;
  max-width: 1200px;
  padding: 110px 0 0;

  @media screen and (min-width: 1248px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 28px 24px;
  }

  @media screen and (max-width: 1247px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const EmptyDiv = styled.div`
  width: 100%;
  padding-top: 245px;
`;

const { baseUrl, endPoints } = API_INFO;

export function Cards({ postId, editable, reFetch }) {
  const [cardData, setCardData] = useState([]);
  const [getUrl, setGetUrl] = useState(
    baseUrl +
      putParams(endPoints.getRecipientsMessages.url, postId) +
      "?limit=" +
      (window.innerWidth > 1247
        ? editable
          ? 9
          : 8
        : editable
          ? 8
          : 7
      ).toString(),
  );

  const { sendRequest } = useApi();

  const { ref, inView } = useInView({ threshold: 0.9 });

  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useApi({
    url: getUrl,
    immediate: true,
  });

  useEffect(() => {
    if (!getLoading && getError === null) {
      setCardData((prev) => [...prev, ...getData.results]);
    }
  }, [getLoading]);

  useEffect(() => {
    if (inView && !getLoading && getError === null && getData.next) {
      setGetUrl(
        getData.next.replace(
          getData.next.substring(
            getData.next.indexOf("?limit"),
            getData.next.indexOf("&offset"),
          ),
          "?limit=6",
        ),
      );
    }
  }, [inView]);

  return (
    <div>
      <GridDiv>
        {!editable && <NewCard linkUrl={`/post/${postId}/message`} />}
        {cardData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            sender={item.sender}
            profileImageURL={item.profileImageURL}
            relationship={item.relationship}
            content={item.content}
            font={item.font}
            createdAt={item.createdAt}
            sendRequest={sendRequest}
            setCardData={setCardData}
            editable={editable}
            reFetch={reFetch}
          />
        ))}
      </GridDiv>
      <EmptyDiv ref={ref} />
    </div>
  );
}
