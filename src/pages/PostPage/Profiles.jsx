import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const Item = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 100px;
  box-sizing: border-box;
  background-image: url(${(props) => props.$back});
  background-size: 28px 28px;

  ${({ $position }) => {
    switch ($position) {
      case 1:
        return `
          top: -14px;
          left: 0;
          z-index: 1;
          border: 2px solid white;
        `;
      case 2:
        return `
          top: -14px;
          left: 15px;
          z-index: 2;
          border: 2px solid white;
        `;
      case 3:
        return `
          top: -14px;
          left: 30px;
          z-index: 3;
          border: 2px solid white;
        `;
      case 4:
        return `
          top: -14px;
          left: 45px;
          z-index: 4;
          border: 2px solid #E3E3E3;
          background-color: white;
        `;
      default:
        return "";
    }
  }}
`;

const PlusText = styled.span`
  font-size: 12px;
  color: #484848;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function Profiles({ items, length }) {
  return (
    <Container>
      {items.slice(0, 4).map((item, index) => (
        <Item
          key={index}
          $position={index + 1}
          $back={item.profileImageURL}
        ></Item>
      ))}
      {length >= 4 && (
        <Item $position={4}>
          <PlusText>+{length - 3}</PlusText>
        </Item>
      )}
    </Container>
  );
}
