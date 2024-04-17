import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { API_INFO, putParams } from "../api/api"; // API_INFO 및 putParams 가져오기
import { MovePageButton } from "../components/button/MovePageButton";
import { ListContent } from "../components/list/ListContent";
import { useFetch } from "../hooks/useFetch"; // useFetch 훅 가져오기
import { ListGlobalStyles } from "../styles/ListGlobalStyle";

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 4rem;
  align-items: center;
  justify-content: center;
`;

export function ListPage() {
  const [popularRecipients, setPopularRecipients] = useState([]);
  const [recentRecipients, setRecentRecipients] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 오류 처리 함수
  const handleError = (error) => {
    console.error("Error fetching data:", error);
  };

  const { data, loading, error } = useFetch({
    // useFetch 훅 적용
    url: putParams(
      API_INFO.baseUrl + API_INFO.endPoints.getRecipients.url,
      offset,
    ),
    errorCallback: handleError,
  });
  const observer = useRef();

  useEffect(() => {
    if (data) {
      // 받아온 데이터를 처리하여 상태 업데이트
      const newData = data.results;
      const sortedByPopularity = [...newData].sort((a, b) => {
        const sumA = a.topReactions.reduce((acc, curr) => acc + curr.count, 0);
        const sumB = b.topReactions.reduce((acc, curr) => acc + curr.count, 0);
        return sumB - sumA;
      });
      const sortedByRecent = [...newData].sort((a, b) => b.id - a.id);

      setPopularRecipients((prevRecipients) => [
        ...prevRecipients,
        ...sortedByPopularity,
      ]);
      setRecentRecipients((prevRecipients) => [
        ...prevRecipients,
        ...sortedByRecent,
      ]);

      // 더 이상 가져올 데이터가 없으면 hasMore를 false로 설정
      if (!data.next) {
        setHasMore(false);
      } else {
        setOffset((prevOffset) => prevOffset + 8);
      }
    }
  }, [data]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setOffset((prevOffset) => prevOffset + 8);
      }
    });

    if (lastRecipientRef.current) {
      observer.current.observe(lastRecipientRef.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [hasMore, loading]);

  const lastRecipientRef = useRef();

  return (
    <>
      <ListGlobalStyles />
      {error && <p>Error: {error.message}</p>}{" "}
      {/* 에러가 있을 때 에러 메시지 표시 */}
      <ListContent title="인기 롤링 페이퍼 🔥" recipients={popularRecipients} />
      <ListContent
        title="최근에 만든 롤링 페이퍼️️ ⭐"
        recipients={recentRecipients}
        lastRecipientRef={lastRecipientRef}
      />
      <ButtonContainer>
        <MovePageButton moveLink="/post" btnName="나도 만들어보기" />
      </ButtonContainer>
    </>
  );
}
