import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getAllRecipients } from "../api/GetApi";
import MovePageButton from "../components/button/MovePageButton";
import ListContent from "../components/list/ListContent";

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
  const observer = useRef();

  useEffect(() => {
    const fetchData = async () => {
      //수신자 데이터를 가져올 비동기 함수 fetchData를 정의
      if (!hasMore) return;

      try {
        //Fetch recipients data using getAllRecipients function with the current offset
        //현재 오프셋이 있는 getAllRecipients 함수를 사용하여 수신자 데이터 가져오기
        const response = await getAllRecipients(offset);
        const data = response.results;

        //Sort the fetched data by popularity
        //가져온 데이터를 인기도별로 정렬
        const sortedByPopularity = [...data].sort((a, b) => {
          const sumA = a.topReactions.reduce(
            (acc, curr) => acc + curr.count,
            0,
          );
          const sumB = b.topReactions.reduce(
            (acc, curr) => acc + curr.count,
            0,
          );
          return sumB - sumA;
        });

        //Sort the fetched data by recentness
        //가져온 데이터를 최근으로 정렬
        const sortedByRecent = [...data].sort((a, b) => b.id - a.id);

        //Update the state variable popularRecipients with the sorted data
        //정렬된 데이터로 인기 있는 수신자 상태 변수 업데이트
        setPopularRecipients((prevRecipients) => {
          const updatedRecipients = [...prevRecipients, ...sortedByPopularity];
          return updatedRecipients.sort((a, b) => {
            const sumA = a.topReactions.reduce(
              (acc, curr) => acc + curr.count,
              0,
            );
            const sumB = b.topReactions.reduce(
              (acc, curr) => acc + curr.count,
              0,
            );
            return sumB - sumA;
          });
        });
        setRecentRecipients((prevRecipients) => [
          ...prevRecipients,
          ...sortedByRecent,
        ]);

        //Update the hasMore state based on whether there are more pages to fetch
        //가져올 페이지가 더 있는지 여부를 기준으로 has More 상태 업데이트
        if (!response.next) {
          setHasMore(false);
        } else {
          setOffset((prevOffset) => prevOffset + 8); //페이지가 더 많은 경우 오프셋을 증가시켜 수신인 데이터의 다음 페이지를 가져옵니다.
        }
        ////fetch 과정에서 오류가 발생하면 오류 출력
      } catch (error) {
        throw new Error("롤링페이퍼를 불러오지 못했습니다.", error);
      }
    };

    fetchData();
  }, [offset, hasMore]);

  const lastRecipientRef = useRef();
  useEffect(() => {
    if (observer.current) {
      //기존 observer가 있는지 확인하고 있다면 연결을 끊음
      observer.current.disconnect();
    }

    // 새 IntersectionObserver 인스턴스 생성
    observer.current = new IntersectionObserver((entries) => {
      // 교차점이 변할 때 호출되는 콜백 함수
      if (entries[0].isIntersecting) {
        // 대상 요소가 뷰포트와 교차하는지 확인
        setOffset((prevOffset) => prevOffset + 8); //오프셋을 8만큼 증가시킴
      }
    });

    if (lastRecipientRef.current) {
      // lastRecipientRef가 설정되어 있는지 확인
      observer.current.observe(lastRecipientRef.current); //// 마지막 수신자 요소를 관찰하기 시작
    }

    // 컴포넌트가 언마운트될 때 관찰자를 해제하는 정리 함수
    // eslint-disable-next-line
    return () => {
      observer.current.disconnect();
    };
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
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
