import styled from "styled-components";
import { Bold18, Regular16 } from "./FontStyle";

export const ButtonCommon = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 1rem;

  cursor: ${({ disabled }) => disabled && "not-allowed"};
`;

const PrimaryBtn = styled(ButtonCommon)`
  background: var(--${({ disabled }) => (disabled ? "gray300" : "purple600")});
  color: var(--white);

  &:hover:enabled {
    background: var(--purple700);
  }

  &:active:enabled {
    background: var(--purple800);
  }

  &:focus:enabled {
    background: var(--purple800);
  }
`;

export const Primary56 = styled(PrimaryBtn)`
  padding: 1.4rem 2.4rem;
  border-radius: 1.2rem;

  ${Bold18}
`;

export const Primary40 = styled(PrimaryBtn)`
  padding: 0.7rem 1.6rem;
  border-radius: 0.6rem;
  ${Regular16}
`;

export const Secondary = styled(ButtonCommon)`
  padding: 0.7rem 1.6rem;
  border-radius: 0.6rem;
  color: var(--${({ disabled }) => (disabled ? "white" : "purple700")});

  &:hover:enabled {
    background: var(--purple100);
    color: var(--purple700);
  }

  &:active:enabled {
    background: var(--purple100);
  }
`;

export const Outlined36 = styled(ButtonCommon)`
  border-radius: 0.6rem;
  background: var(--${({ disabled }) => (disabled ? "gray300" : "white")});
  color: var(--${({ disabled }) => (disabled ? "white" : "gray900")});
  border: 1px solid var(--gray300);
  ${Regular16}

  &:hover:enabled {
    background: var(--gray100);
  }

  &:active:enabled {
    background: var(--gray100);
  }

  &:focus:enabled {
    border: 1px solid var(--gray500);
  }
`;

export const Outlined40 = styled(ButtonCommon)`
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  background: var(--${({ disabled }) => (disabled ? "gray300" : "white")});
  color: var(--${({ disabled }) => (disabled ? "white" : "gray900")});
  border: 1px solid var(--gray300);
  ${Regular16}

  &:hover:enabled {
    background: var(--gray100);
  }

  &:active:enabled {
    background: var(--gray100);
  }

  &:focus:enabled {
    border: 1px solid var(--gray500);
  }
`;
