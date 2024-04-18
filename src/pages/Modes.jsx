import React, { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import styled from "styled-components";
import Mode from "../components/Mode";
import { modes } from "../util/Constants.jsx";
const Modes = () => {
  const { page, setPage, theme } = useGlobalContext();
  useEffect(() => {
    setPage("modes");
  }, []);
  return (
    <WrapperMode>
      <h2>select a game mode</h2>
      {modes.map((mode, i) => {
        return (
          <Mode
            modeName={mode.name}
            modeIcon={mode.icon}
            modeDescription={mode.description}
            key={i}
          />
        );
      })}
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
`;

export default Modes;
