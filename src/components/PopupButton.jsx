import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PopupButton = ({ children, handleClick, type, link, className }) => {
  return (
    <Wrapper>
      {type === "link" ? (
        <Link
          className={`btn ${className}`}
          to={link}
          onClick={handleClick ? () => handleClick() : ""}
        >
          {children}
        </Link>
      ) : (
        <button className={`btn ${className}`} onClick={() => handleClick()}>
          {children}
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .btn {
    font-family: inherit;
    background-color: transparent;
    color: var(--primary-600);
    border: 1px solid var(--primary-600);
    border-radius: var(--borderRadius);
    cursor: pointer;
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}
    &:not(:last-child) {
      margin-right: 14px;
    }
    &:hover {
      background-color: var(--grey-300);
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.popupHover,
        };
      }}
    }
  }
`;
export default PopupButton;
