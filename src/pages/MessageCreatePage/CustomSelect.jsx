import { useState } from "react";
import styled from "styled-components";
import arrowBottom from "../../assets/arrow_bottom.svg";
import arrowTop from "../../assets/arrow_top.svg";
import { Regular16 } from "../../styles/FontStyle";

const SelectBox = styled.button`
  width: 50%;
  border: 1px solid var(--gray300);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Regular16};
  color: var(--gray500);
  background-color: var(--white);

  &:hover,
  &:focus {
    border: 2px solid var(--gray500);
  }

  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;

const Listbox = styled.ul`
  background: var(--white);
  position: absolute;
  top: 60px;
  left: 0;
  width: 50%;
  padding: 10px 0;
  list-style: none;
  border: 1px solid var(--gray300);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;

  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;

const List = styled.li`
  background: var(--white);
  border: none;
  ${Regular16};
  color: var(--gray900);
  text-align: left;
  padding: 12px 16px;

  &:hover,
  &:focus {
    background: var(--gray100);
    width: 100%;
  }

  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;

export function CustomSelect({ value, onChange, options }) {
  const [arrow, setArrow] = useState(arrowBottom);

  function handleSelectBoxClick(e) {
    e.preventDefault();
    if (arrow === arrowBottom) {
      setArrow(arrowTop);
    } else {
      setArrow(arrowBottom);
    }
  }

  function handleSelectValue(selectedValue, e) {
    e.preventDefault();
    onChange(selectedValue);
    handleSelectBoxClick(e);
  }

  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <SelectBox onClick={handleSelectBoxClick}>
        {value}
        <img src={arrow} alt="arrow" />
      </SelectBox>
      {arrow === arrowTop && (
        <Listbox id="listbox">
          {options.map((option, index) => (
            <List
              key={index}
              value={option}
              onClick={(e) => handleSelectValue(option, e)}
            >
              {option}
            </List>
          ))}
        </Listbox>
      )}
    </div>
  );
}
