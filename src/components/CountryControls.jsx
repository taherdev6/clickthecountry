import React from "react";
import styled from "styled-components";
import FaBackwardStep from "../icons/FaBackwardStep";
import FaForwardStep from "../icons/FaForwardStep";
import FaCheck from "../icons/FaCheck";
import FaXmark from "../icons/FaXmark";
import FaQuestion from "../icons/FaQuestion";
import CheckBox from "./CheckBox";
import { useGlobalContext } from "../context/context";
import sizes from "../util/screens";
const CountryControls = () => {
  const { answer, setAnswer, countries, country, setCountry, mode } =
    useGlobalContext();
  if (answer === "correct" || answer === "wrong") {
    setTimeout(() => {
      setAnswer("");
    }, 1000);
  }
  return (
    <Wrapper className="country-controls">
      <span className={`find-country ${answer === "" ? "" : "hidden"}`}>
        Find:{" "}
        <span className="country-name">
          {mode === "capitals" ? country?.capital : country?.name}
        </span>
      </span>

      <CheckBox isQuestion={mode === "capitals" ? "question" : false} />

      {mode !== "capitals" && (
        <img
          src={country?.flag}
          className={`my-flag ${answer === "" ? "" : "hidden"}`}
        />
      )}
      <div className={`country-btn-container ${answer === "" ? "" : "hidden"}`}>
        <button
          className="country-btn country-btn-back btn"
          onClick={() => {
            if (countries.indexOf(country) === 0) {
              setCountry(countries[countries.length - 1]);
              return;
            }
            setCountry(countries[countries.indexOf(country) - 1]);
          }}
        >
          <FaBackwardStep />
          <span>Back</span>
        </button>
        <button
          className="country-btn country-btn-skip btn"
          onClick={() => {
            if (countries.indexOf(country) === countries.length - 1) {
              setCountry(countries[0]);
              return;
            }
            setCountry(countries[countries.indexOf(country) + 1]);
          }}
        >
          <span>Skip</span>

          <FaForwardStep />
        </button>
      </div>
    </Wrapper>
  );
};

export default CountryControls;

const Wrapper = styled.div`
  grid-column: country-flag-start / country-flag-end;
  display: grid;
  grid-template-columns: 5rem 5rem 5rem;
  grid-template-rows: 2rem 5rem 2rem;
  justify-items: center;
  font-size: 0.9rem;
  align-self: center;
  @media only screen and (max-width: ${sizes.small}) {
    justify-self: start;
  }

  .margin {
    margin-top: 5rem;
  }

  .find-country {
    grid-column: 1/4;
    line-height: 1.2rem;
  }
  .country-name {
    color: var(--gold);
  }
  .my-flag {
    justify-self: center;
    align-self: center;
    max-width: 9rem;
    min-width: 5.5rem;
    width: 70%;
    height: 4.7rem;
    grid-column: 1/4;
    grid-row: 2/3;
    padding: 0;
  }
  .country-btn-container {
    grid-column: 1/4;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .country-btn {
    box-shadow: none;
    cursor: pointer;
    padding: 2px 4px;
    margin: 4px 0;

    font-size: 0.7rem;
    min-width: 50px;

    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}
    &:hover {
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.hover,
        };
      }}
    }
  }

  .country-btn-back {
    grid-column: 1/2;
    span {
      margin-left: 3px;
    }
  }
  .country-btn-skip {
    grid-column: 3/4;
    span {
      margin-right: 3px;
    }
  }

  .find-country {
    align-self: center;
  }
  .hidden {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
`;
