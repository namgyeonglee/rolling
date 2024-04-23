import styled from "styled-components";
import successIcon from "../../assets/success.png";
import { Regular16 } from "../../styles/FontStyle";
import { CopyToast } from "./CopyToast";

const StyledModal = styled.div`
  width: 14rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  padding: 1rem 0;
`;
const ShareItem = styled.div`
  ${Regular16}
  padding: 1.6rem;
  text-align: left;

  &:hover {
    background-color: #f6f6f6;
  }
`;

export function ShareModal({ name, shareKakao, toast }) {
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);

    toast(
      (t) => (
        <CopyToast
          width="52.4rem"
          height="6.4rem"
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
          height: "6.4rem",
          padding: "0 0",
          margin: "0 0",
          position: "relative",
        },
      },
    );
  };

  const handleKakao = () => {
    shareKakao(name);
  };

  return (
    <StyledModal>
      <ShareItem onClick={handleKakao}>카카오톡 공유</ShareItem>
      <ShareItem onClick={copyUrl}>URL 공유</ShareItem>
    </StyledModal>
  );
}
