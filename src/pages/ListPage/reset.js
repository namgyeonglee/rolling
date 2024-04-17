import { css } from "styled-components";

export const reset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
    word-break: keep-all;
  }

  :root {
    --z-index-nav: 100;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: none;
    padding: unset;
    background-color: unset;
    cursor: pointer;
  }

  input {
    border: none;
    padding: none;
  }

  input:focus {
    outline: none;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  .align-right {
    text-align: right;
  }

  .align-center {
    text-align: center;
  }

  .align-justify {
    text-align: justify;
  }

  .size-large {
    font-size: 1.5em;
  }

  .size-small {
    font-size: 0.75em;
  }

  .noto-sans {
    font-family: "Noto Sans", sans-serif !important;
  }

  .pretendard {
    font-family: "Pretendard", sans-serif !important;
  }

  .nanum-gothic {
    font-family: "Nanum Gothic", sans-serif !important;
  }

  .nanum-myeongjo {
    font-family: "Nanum Myeongjo", serif !important;
  }
`;
