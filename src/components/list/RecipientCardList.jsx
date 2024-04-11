import { useRef } from "react";
import RecipientCard from "./RecipientCard";

function RecipientList({ recipients }) {
  const containerRef = useRef(null);

  const handleLeftButton = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.clinetWidth + 20;
    }
  };

  const handleRightButton = () => {
    if (containerRef.current) {
      containerRef.current.scrollRight += containerRef.current.clinetWidth + 20;
    }
  };

  return (
    <CarouselContainer>
      {recipients && recipients.length > 4 && (
        <>
          <LeftButton onClick={handleLeftButton}>
            <img src="/img/allow_left.svg" alt="arrow_left" />
          </LeftButton>
          <RightButton onClick={handleRightButton}>
            <img src="/img/allow_right.svg" alt="arrow_right" />
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

export default RecipientList;
