import { useState, useEffect } from "react";
import styled from "styled-components";
import FaInfinity from "../icons/FaInfinity";
import CountryControls from "./CountryControls";
import { useGlobalContext } from "../context/context";
import sizes from "../util/screens";
const CountryInfo = ({ duration }) => {
  const {
    gameStart,
    mode,
    countryAnswered,
    country,
    answer,
    hidePopup,
    countriesLength,
    setFinishTime,
    gameEnd,
    setGameEnd,
    timer,
    setTimer,
  } = useGlobalContext();
  useEffect(() => {
    setTimer(duration === "freeplay" ? "false" : `${duration}00`);
  }, []);
  useEffect(() => {
    if (hidePopup === false) {
      return;
    }

    if (gameStart === false) {
      return;
    }

    if (duration === "freeplay") {
      return;
    }
    const runTimer = () => {
      setTimeout(() => {}, duration * 60 * 1000);
    };

    runTimer();
  }, [gameStart, hidePopup]);

  useEffect(() => {
    if (gameEnd === true) {
      const finalTime = `${timer
        .toString()
        .slice(0, timer.toString().length - 2)}:${timer
        .toString()
        .slice(timer.toString().length - 2)}`;
      setFinishTime(finalTime);
      return;
    }
    if (!gameStart) {
      return;
    }

    if (duration === "freeplay") {
      return;
    }

    const countdown = setInterval(() => {
      if (hidePopup === false) {
        return;
      }

      if (timer.toString() === "00" || timer.toString() === "0") {
        setGameEnd(true);
        setFinishTime(timer.toString());

        return;
      }
      if (
        timer
          .toString()
          .slice(timer.toString().length - 2, timer.toString().length) === "00"
      ) {
        setTimer(timer - 41);
        return;
      }
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameStart, timer, hidePopup, gameEnd]);

  Wrapper.defaultProps = {
    $answer: answer,
  };

  return (
    <Wrapper
      className={`${gameStart ? "" : "hidden"}
       `}
    >
      <CountryControls />
      <div className="quiz-info">
        <div className="quiz-time">
          Time:{" "}
          {duration !== "freeplay" ? (
            timer >= 1000 ? (
              timer.toString().slice(0, 2) + ":" + timer.toString().slice(2, 4)
            ) : (
              timer.toString().slice(0, 1) +
              ":" +
              timer
                .toString()
                .slice(timer.toString().length - 2, timer.toString().length)
            )
          ) : (
            <FaInfinity />
          )}
        </div>
        <div className="quiz-score">
          Score: {countryAnswered?.length}/{countriesLength}
        </div>
      </div>

      <div className={`country-properties ${mode === "capitals" && "hidden"}`}>
        <div className="country-capital country-prop">
          <span>Capital City:</span>{" "}
          <span className="country-val">{country?.capital}</span>
        </div>
        <div className="country-language country-prop">
          <span>Language:</span>{" "}
          <span className="country-val">{country?.language}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default CountryInfo;

const Wrapper = styled.div`
  grid-row: 1/2;
  display: grid;
  grid-template-columns:
    [full-start] 1fr [country-flag-start] 1fr 1fr [country-flag-end
    time-start] 1fr 1fr[time-end gap-start] 1fr [gap-end
    country-properties-start] 1fr 1fr 1fr [country-properties-end full-end];

  font-size: 1rem;

  min-width: 250px;

  @media only screen and (max-width: ${sizes.large}) {
    grid-template-rows: 1fr;
  }

  @media only screen and (max-width: ${sizes.small}) {
    grid-template-columns: [country-flag-start] 1fr [country-flag-end time-start] 1fr [time-end country-properties-start] 1fr[country-properties-end];
  }

  .margin {
    margin-top: 1rem;
  }

  .quiz-info {
    grid-column: time-start/time-end;
    align-self: center;
    justify-self: center;
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
      };
    }}
  }
  .country-properties {
    grid-column: country-properties-start/country-properties-end;
    align-self: center;
    justify-self: start;

    @media only screen and (max-width: ${sizes.small}) {
      justify-self: end;
    }

    .country-val {
      color: var(--gold);
    }
  }
  .hidden {
    display: none;
  }
`;
