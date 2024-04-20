import styled from "styled-components";
import successIcon from "../../assets/success.png";
import { CopyToast } from "./CopyToast";

const StyledModal = styled.div`
  width: 140px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  padding: 10px 0;
`;
const ShareItem = styled.div`
  padding: 16px;
  text-align: left;
  font-size: 16px;

  &:hover {
    background-color: #f6f6f6;
  }
`;

export function ShareModal({ shareKakao, toast }) {
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);

    toast(
      (t) => (
        <CopyToast
          width="524px"
          height="64px"
          backgroundColor="--black"
          color="white"
          imgSrc={successIcon}
          msg="URL이 복사 되었습니다."
          close={() => toast.dismiss(t.id)}
        />
      ),
      {
        duration: 5000,
        style: {
          boxSizing: "border-box",
          width: "524px",
          height: "64px",
          padding: "0px 0px",
          position: "relative",
        },
      },
    );
  };

  return (
    <StyledModal>
      <ShareItem onClick={shareKakao}>카카오톡 공유</ShareItem>
      <ShareItem onClick={copyUrl}>URL 공유</ShareItem>
    </StyledModal>
  );
}
