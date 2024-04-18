import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import PopupButton from "./PopupButton";

const ExitPopup = () => {
  const {
    hidePopup,
    popupText,
    setHidePopup,
    setGameStart,
    setGameEnd,
    setCountries,
    fixedCountries,
    setCountryAnswered,
    setCountry,
    randomCountry,
    countries,
    setTimer,
    gameLength,
  } = useGlobalContext();
  return (
    <Wrapper className={`${hidePopup ? "hidden" : ""}`}>
      <div className="popup-content">
        <p>{`${popupText === "Pause" ? "Resume?" : `${popupText} Run?`}`}</p>
        <div className="btn-container">
          <PopupButton
            handleClick={() => {
              if (popupText === "Pause") {
                setHidePopup(true);
                return;
              }

              if (popupText === "End") {
                setGameEnd(true);
                setGameStart(false);
                setHidePopup(true);
                return;
              }
              setGameStart(false);
              setCountries(fixedCountries);
              setTimer(`${gameLength}00`);

              setCountry(randomCountry(countries));
              setCountryAnswered([]);
              setHidePopup(true);
            }}
          >
            Yes
          </PopupButton>
          <PopupButton
            className={popupText === "Pause" ? "hidden" : ""}
            handleClick={() => {
              setHidePopup(true);
            }}
          >
            No
          </PopupButton>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transform: translate(-50%, -50%);

  z-index: 1000;

  background-color: rgba(32, 32, 32, 0.8);

  .popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--grey-100);

    border: var(--black) 1px solid;
    border-radius: var(--borderRadius);

    padding: 4rem 8rem;

    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}
  }
  .btn-container {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;

    :first-child {
      margin-right: 5px;
    }
    :last-child {
      margin-left: 5px;
    }
    /* displa-cy: flex;
    justify-content: space-between;
    width: 100%; */
  }
  /* .btn-popup {
    font-family: inherit;
    background-color: transparent;
    color: var(--primary-600);
    border: 1px solid var(--primary-600);
    border-radius: var(--borderRadius);
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 14px;
    }
    &:hover {
      background-color: var(--grey-300);
    }
  } */
  .hidden {
    visibility: hidden;
    opacity: 0;
  }
`;
export default ExitPopup;
