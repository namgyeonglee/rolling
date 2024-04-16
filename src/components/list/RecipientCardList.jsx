import { useRef } from "react";
import styled from "styled-components";
import arrowleft from "../../assets/arrow_left.png";
import arrowright from "../../assets/arrow_right.svg";
import { DISPLAY_SIZE } from "../../styles/SizeSet";
import { RecipientCard } from "./RecipientCard";

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  scroll-behavior: smooth;
  & > * {
    flex-shrink: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 116rem;
`;

const Button = styled.button`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  width: 4rem;
  height: 4rem;
  background: #ffffffe5;
  border-radius: 5rem;
  border: 0.1rem solid #dadcdf;
  box-shadow: 0rem 0.4rem 0.8rem 0rem #00000014;
  cursor: pointer;

  @media (max-width: ${DISPLAY_SIZE.MAX_TABLET}px) {
    display: none;
  }
`;

const LeftButton = styled(Button)`
  left: -2rem;
  z-index: 1;
`;

const RightButton = styled(Button)`
  right: -2rem;
  z-index: 1;
`;

export function RecipientCardList({ recipients }) {
  const containerRef = useRef(null);

  const handleLeftButton = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.clientWidth + 20;
    }
  };

  const handleRightButton = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.clientWidth + 20;
    }
  };

  return (
    <CarouselContainer>
      {recipients && recipients.length > 4 && (
        <>
          <LeftButton onClick={handleLeftButton}>
            <img src={arrowleft} alt="arrow_left" />
          </LeftButton>
          <RightButton onClick={handleRightButton}>
            <img src={arrowright} alt="arrow_right" />
          </RightButton>
        </>
      )}
      <CardsContainer ref={containerRef}>
        {recipients.map((recipient) => (
          <RecipientCard key={recipient.id} recipient={recipient} />
        ))}
      </CardsContainer>
    </CarouselContainer>
  );
}
