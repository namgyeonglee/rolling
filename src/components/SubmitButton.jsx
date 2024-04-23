import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  regular: css`
    border-radius: 12px;
    padding: 1.4rem 2.4rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.18px;
  `,
  small: css`
    border-radius: 6px;
    padding: 0.7rem 1.6rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.6rem;
    letter-spacing: -0.16px;
  `,
};

const Button = styled.button`
  ${({ size }) => (size === "small" ? sizes.small : sizes.regular)};
  font-style: normal;
  text-align: center;
  color: var(--white, #fff);
  border: none;
  background: var(--purple-600, #9935ff);
  cursor: pointer;
  width: 100%;

  &:disabled {
    background: var(--gray-300, #ccc);
  }

  &:hover {
    background: var(--purple-700, #861dee);
    outline: none;
  }

  &:active {
    background: var(--purple-800, #6e0ad1);
    outline: none;
  }

  &:focus {
    outline: 2px solid var(--purple-900, #5603a7);
    background: var(--purple-800, #6e0ad1);
  }
`;

export default function SubmitButton({
  className,
  children,
  size,
  disabled,
  width,
  onClick,
}) {
  return (
    <Button
      className={className}
      size={size}
      disabled={disabled}
      width={width}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
