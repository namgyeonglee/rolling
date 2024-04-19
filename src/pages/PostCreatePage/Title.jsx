import styled from "styled-components";

const Text = styled.label`
  font-family: Pretendard;
  letter-spacing: -0.24px;
`;

const Title = styled(Text)`
  color: var(--gray-900, #181818);
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

const Subtitle = styled(Text)`
  color: var(--gray-500, #555);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.6rem;
`;

export { Subtitle, Title };
