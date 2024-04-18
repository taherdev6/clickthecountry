import React, { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import styled from "styled-components";
import FaCirclePlay from "../icons/FaCirclePlay";
import { MapChart, CountryInfo, ExitPopup, FinishPopup } from "../components";
import { useParams } from "react-router-dom";
const QuizFreePlay = () => {
  const {
    setPage,
    country,
    setCountry,
    setAnswer,
    countries,
    countryAnswered,
    setCountryAnswered,
    setCountries,
    gameStart,
    setGameStart,
    setGameLength,
    setGameEnd,
    gameEnd,
    fixedCountries,
  } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    setPage("quiz");
    setGameStart(false);
    setGameEnd(false);
    setCountries(fixedCountries);
    setCountryAnswered([]);
    setGameLength(id);
  }, []);

  return (
    <Wrapper>
      <ExitPopup />
      {gameEnd ? <FinishPopup duration={id} /> : ""}

      <CountryInfo duration={id} />
      <div
        className={`start ${gameStart ? "hidden" : ""}`}
        onClick={() => {
          setGameStart(true);
        }}
      >
        Start <FaCirclePlay />
        <div className="text">
          For the best experience set the page to fullscreen mode
        </div>
      </div>
      <MapChart
        country={country}
        setCountry={setCountry}
        setAnswer={setAnswer}
        countries={countries}
        countryAnswered={countryAnswered}
        setCountryAnswered={setCountryAnswered}
        setCountries={setCountries}
        gameStart={gameStart}
        className="map"
      ></MapChart>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  position: relative;

  /* grid-template-rows: 20% 1fr; */
  font-size: 1.2rem;

  .start {
    grid-row: 1/2;
    font-family: inherit;
    background: transparent;
    color: var(--white);
    align-self: center;
    justify-self: center;
    font-size: 2.1rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 1.1rem;
    border-radius: var(--borderRadius);
    transition: all 0.3s;
    margin: 2rem;
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
      };
    }}
    &:hover {
      background-color: var(--grey-700);
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.hover,
          color: theme.hoverFont,
        };
      }}
    }
  }
  .text {
    width: 100%;
    font-size: 0.7rem;
    display: flex;
    justify-content: center;
    letter-spacing: 1px;
  }
  .map {
    grid-row: 2/3;
  }
  .hidden {
    display: none;
  }
`;
export default QuizFreePlay;
