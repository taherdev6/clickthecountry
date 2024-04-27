import { useGlobalContext } from "../context/context";

import FaCheck from "../icons/FaCheck";
import FaXmark from "../icons/FaXmark";
import FaQuestion from "../icons/FaQuestion";
import styled from "styled-components";
const CheckBox = ({ isQuestion }) => {
  const { answer } = useGlobalContext();
  // const answer = "wrong";
  return (
    <Wrapper>
      <div
        className={`answer-${answer ? answer : isQuestion} answer-box ${
          isQuestion
            ? ""
            : answer === "correct" || answer === "wrong"
            ? ""
            : "hidden"
        }`}
      >
        <div className={`check-box check-box-${answer}`}>
          {answer === "correct" || answer === "wrong" ? (
            ""
          ) : (
            <FaQuestion color="#2e3b48" />
          )}
          {answer === "correct" && <FaCheck color="#0f5132" />}
          {answer === "wrong" && <FaXmark color="#842029" />}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  grid-column: 1/4;
  grid-row: 2/3;
  height: 2.5rem;
  max-width: 9rem;
  min-width: 5.5rem;
  /* width: 70%; */
  height: 4.7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .answer-box {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .answer-correct {
    background-color: var(--green-light);
  }
  .answer-wrong {
    background-color: var(--red-light);
  }
  .answer-question {
    background-color: var(--grey-300);
  }

  .hidden {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
`;
export default CheckBox;
