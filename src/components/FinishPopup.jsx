import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopupButton from "./PopupButton";
import { useGlobalContext } from "../context/context";
const FinishPopup = ({ duration }) => {
  const {
    countryAnswered,
    gameLength,
    countriesLength,
    setGameEnd,
    setGameStart,
    finishTime,
    setCountryAnswered,
    countries,
    setCountry,
    randomCountry,
    timer,
    setTimer,
    setCountries,
    fixedCountries,
  } = useGlobalContext();
  const [paragraph, setParagraph] = useState("");
  const score = countryAnswered.length;
  const total = fixedCountries.length;
  useEffect(() => {
    if (duration === "freeplay") {
      if (score === total) {
        setParagraph(
          "Perfect Score! Your geography skill are on point! try a timed mode for an even greater challenge"
        );
        return;
      }
      if (score >= total / 1.5) {
        setParagraph("Nice Score! You were off the perfect score by a little");
        return;
      }
      if (score >= total / 2) {
        setParagraph(
          "Good Job! Your Geography skill are better than the average person."
        );
        return;
      }
      if (score < total / 2) {
        setParagraph("Nice Try! Practice Your Skills and try Again.");
        return;
      }

      return;
    } else {
      if (score === "total") {
        if (duration === "5") {
          setParagraph("GG! you have beat the game");
          return;
        }
        if (duration === "10") {
          setParagraph(
            "Fantastic! You are almost a master at playing this game!"
          );
          return;
        }
        if (duration === "15") {
          setParagraph(
            "Good Job! Keep practicing and you'll master the game in no time"
          );
          return;

          return;
        }
      }
    }
  }, []);

  return (
    <Wrapper>
      <div className="result">
        <h1>Quiz Completed! &#x1F389;</h1>
        <p>
          Score: {score}/{total}
        </p>
        <p>Time: {duration === "freeplay" ? "No time limit" : finishTime}</p>
        <p>{paragraph}</p>
        <div className="btn-container">
          <PopupButton
            link="/modes"
            type="link"
            // className='btn-popup'
            handleClick={() => {
              setGameEnd(false);
              setGameStart(false);
            }}
          >
            Return To Mode Menu
          </PopupButton>
          <PopupButton
            type="link"
            handleClick={() => {
              setGameEnd(false);
              setGameStart(false);
              setTimer(`${gameLength}00`);
              setCountries(fixedCountries);
              setCountryAnswered([]);
              setCountry(randomCountry(countries));
            }}
          >
            Restart Run
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

  .result {
    background-color: var(--white);
    padding: 11rem;
    border-radius: var(--borderRadius);
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
      };
    }}
  }
  .btn-container {
    display: flex;
    flex-direction: row;
    div {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    /* justify-content: space-between; */
  }
`;

export default FinishPopup;
