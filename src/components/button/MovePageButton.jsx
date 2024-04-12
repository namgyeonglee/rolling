import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Primary56 } from "../../styles/ButtonStyle";

const Button = styled(Primary56)`
  width: 28rem;
  margin: 2.4rem 2.4rem;
  cursor: pointer;
`;

function MovePageButton({ moveLink, btnName }) {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate(moveLink);
  };

  return <Button onClick={handleClickButton}>{btnName}</Button>;
}

export default MovePageButton;
