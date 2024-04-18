import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import styled from "styled-components";
import FaInfinity from "../icons/FaInfinity";
import FaClock from "../icons/FaClock";
import { Link } from "react-router-dom";
const Time = () => {
  const { setPage } = useGlobalContext();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setPage("modes");
  }, []);
  return (
    <WrapperMode>
      <h2>Select A Duration</h2>
      <button
        className={`btn-back ${hidden ? "" : "hidden"}`}
        onClick={() => setHidden(false)}
      >
        Back
      </button>

      <Link
        className={`time-option ${hidden ? "hidden" : ""}`}
        to="/modes/time/freeplay"
      >
        <div className="title">
          <h2 className="name">Free Play</h2>
          <FaInfinity />
        </div>
        <p className="description">
          get as much points in a run with no time limit.
        </p>
      </Link>
      <button
        className={`time-option ${hidden ? "hidden" : ""}`}
        onClick={() => setHidden(true)}
      >
        <div className="title">
          <h2 className="name">Time Rush</h2>
          <FaClock />
        </div>
        <p className="description">
          race against time and aim for a personal record.
        </p>
      </button>

      <div className={`time-duration ${hidden ? "" : "hidden"}`}>
        <Link to="/modes/time/5" className="option option-hard">
          Hard <br /> 5-min
        </Link>
        <Link to="/modes/time/10" className="option option-medium">
          Medium <br /> 10-min
        </Link>
        <Link to="/modes/time/15" className="option option-easy">
          Easy <br /> 15-min
        </Link>
      </div>
    </WrapperMode>
  );
};

const WrapperMode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  h2 {
    align-self: center;
  }

  .btn-back {
    background: transparent;
    border: solid var(--white) 1px;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-family: inherit;
    padding: 3px 12px;
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}
    cursor: pointer;
    &:hover {
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.hover,
        };
      }}
    }
  }

  .time-option {
    text-align: center;
    border: solid var(--white) 1px;
    border-radius: var(--borderRadius);
    padding: 14px 14px;
    padding-bottom: 3px;
    cursor: pointer;
    transition: all 0.3s;
    background: transparent;
    color: var(--white);
    font-family: inherit;
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}

    &:not(:last-child) {
      margin-bottom: 3rem;
    }

    &:hover {
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.hover,
        };
      }}
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      height: 14px;
    }
  }

  .description {
    width: 30rem;
    margin-top: 1.5rem;
  }

  .time-duration {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
  }
  .option {
    border: solid var(--white) 1px;
    border-radius: var(--borderRadius);
    padding: 7rem 3rem;
    text-align: center;
    transform: translateY(-22rem);
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
        borderColor: theme.font,
      };
    }}
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &-easy {
      &:hover {
        background-color: #e4d00a;
      }
    }

    &-medium {
      &:hover {
        background-color: green;
      }
    }

    &-hard {
      &:hover {
        background-color: red;
      }
    }
  }
  .hidden {
    visibility: hidden;
    opacity: 0;
  }
`;

export default Time;
