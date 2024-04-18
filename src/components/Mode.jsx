import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
const Mode = ({ modeName, modeIcon, modeDescription, modeLink }) => {
  return (
    <Wrapper>
      <Link to="/modes/time" className="modeLink">
        <div className="modeTitle">
          <h2 className="modeName">{modeName}</h2>
          {modeIcon}
        </div>
        <p className="modeDescription">{modeDescription}</p>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: flex;
  align-items: center; */
  /* justify-content: center; */
  text-align: center;
  border: solid var(--white) 1px;
  border-radius: var(--borderRadius);
  padding: 14px 14px;
  padding-bottom: 3px;
  cursor: pointer;
  transition: all 0.3s;
  ${({ themeOption, theme }) => {
    return {
      borderColor: theme.font,
    };
  }}

  .modeLink {
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:hover {
    background-color: var(--grey-800);
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.hover,
      };
    }}
  }

  .modeTitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    .modeName {
      height: 14px;
    }
  }

  .modeDescription {
    /* margin-left: 5rem; */
    width: 30rem;
    margin-top: 1.5rem;
  }
`;
export default Mode;
