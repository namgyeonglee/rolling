import styled from "styled-components";
import closeButton from "../../assets/closeButton.png";
import { Regular16 } from "../../styles/FontStyle";

const ToastDiv = styled.div`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: var(${(props) => props.$backgroundColor});
  color: ${(props) => props.$color};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0px 3.5rem;
  display: grid;
  grid-template-columns: 2.4rem 1fr 2.4rem;
  gap: 1rem;
  align-items: center;
  transform: translateX(-19%);
  @media screen and (max-width: 767px) {
    width: 35rem;
    transform: translateX(-2.8%);
  }
`;

const MsgDiv = styled.div`
  ${Regular16}
`;

const StyledImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

export function CopyToast({
  width,
  height,
  backgroundColor,
  color,
  imgSrc,
  msg,
  close,
}) {
  return (
    <ToastDiv
      $width={width}
      $height={height}
      $backgroundColor={backgroundColor}
      $color={color}
    >
      <StyledImg src={imgSrc} alt={"Toast status icon"} />
      <MsgDiv>{msg}</MsgDiv>
      <img src={closeButton} alt={"Close toast button"} onClick={close} />
    </ToastDiv>
  );
}
