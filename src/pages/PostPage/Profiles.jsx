import React from "react";
import styled from "styled-components";
import { Regular12 } from "../../styles/FontStyle";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const Item = styled.div`
  position: absolute;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 100px;
  box-sizing: border-box;
  background-image: url(${(props) => props.$back});
  background-size: 2.8rem 2.8rem;

  ${({ $position }) => {
    switch ($position) {
      case 1:
        return `
          top: -1.4rem;
          left: 0;
          z-index: 1;
          border: 2px solid white;
        `;
      case 2:
        return `
          top: -1.4rem;
          left: 1.5rem;
          z-index: 2;
          border: 2px solid white;
        `;
      case 3:
        return `
          top: -1.4rem;
          left: 3rem;
          z-index: 3;
          border: 2px solid white;
        `;
      case 4:
        return `
          top: -1.4rem;
          left: 4.5rem;
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
  ${Regular12}
  color: #484848;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function Profiles({ items, length }) {
  return (
    <Container>
      {items?.map((item, idx) => {
        return (
          <Item
            $position={4 - (length - 1) + idx}
            $back={item.profileImageURL}
          ></Item>
        );
      })}
      {length >= 4 && (
        <>
          <Item $position={4}>
            <PlusText>+{length - 3}</PlusText>
          </Item>
        </>
      )}
    </Container>
  );
}
