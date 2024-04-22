import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { API_INFO, putParams } from "../../api/api"; // API_INFO 및 putParams 가져오기
import { useApi } from "../../hooks/useApi";
import { ListContent } from "./ListContent";
import { ListGlobalStyles } from "./ListGlobalStyle";
import { MovePageButton } from "./MovePageButton";

const PinkBackground = styled.div`
  background-color: #ffe6f1; /* 연한 핑크색 */
  min-height: 100vh; /* 화면 전체 높이 */
`;

const WaterDropAnimation = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  animation: rise 4s linear infinite;
  transform: translate(-50%, -50%); /* 요소의 중심을 기준으로 이동 */
  z-index: 1; /* 뒤쪽에 배치 */

  @keyframes rise {
    0% {
      bottom: -20px;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      bottom: 100%;
      opacity: 0;
    }
  }
`;

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
  //물방울 랜덤 생성
  const [randomPositions, setRandomPositions] = useState([]);
  const [dataUrl, setDataUrl] = useState(
    putParams(API_INFO.baseUrl + API_INFO.endPoints.getRecipients.url, offset),
  );

  //물방울 훅
  useEffect(() => {
    const positions = [...Array(15)].map(() => ({
      left: Math.random() * window.innerWidth,
      top: Math.random() * window.innerHeight,
    }));
    setRandomPositions(positions);

    const interval = setInterval(() => {
      const newPositions = positions.map(() => ({
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
      }));
      setRandomPositions(newPositions);
    }, 3000); // 3초마다 위치 변경

    return () => clearInterval(interval);
  }, []);

  // 오류 처리 함수
  const handleError = (error) => {
    console.error("Error fetching data: ", error);
  };

  const { data, loading, error } = useApi({
    // useFetch 훅 적용
    url: dataUrl,
    immediate: true,
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
    <PinkBackground>
      <ListGlobalStyles />
      {error && <p>Error: {error.message}</p>}{" "}
      {/* 에러가 있을 때 에러 메시지 표시 */}
      <ListContent
        title="인기 롤링 페이퍼 🔥"
        recipients={popularRecipients}
        setDataUrl={setDataUrl}
        next={data?.next}
      />
      <ListContent
        title="최근에 만든 롤링 페이퍼️️ ⭐"
        recipients={recentRecipients}
        setDataUrl={setDataUrl}
        next={data?.next}
      />
      <ButtonContainer>
        <MovePageButton moveLink="/post" btnName="나도 만들어보기" />
      </ButtonContainer>
      {/* 물방울 애니메이션 */}
      {randomPositions.map((position, index) => (
        <WaterDropAnimation
          key={index}
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        />
      ))}
    </PinkBackground>
  );
}
