import styled from "styled-components";
import closeButton from "../../assets/closeButton.png";

const ToastDiv = styled.div`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  background-color: var(${(props) => props.$backgroundColor});
  color: ${(props) => props.$color};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0px 35px;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  gap: 10px;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-10%);
`;

const StyledImg = styled.img`
  width: 24px;
  height: 24px;
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
      <div>{msg}</div>
      <img src={closeButton} alt={"Close toast button"} onClick={close} />
    </ToastDiv>
  );
}
