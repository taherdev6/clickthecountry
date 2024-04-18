import React, { useEffect } from "react";
import FaCirclePlay from "../icons/FaCirclePlay";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
const Home = () => {
  const { setPage } = useGlobalContext();
  useEffect(() => {
    setPage("home");
  }, []);
  return (
    <Wrapper>
      <Logo className="home-logo" />
      <button className="btn-play">
        <Link to="/modes" className="link-play">
          Play <FaCirclePlay />
        </Link>
      </button>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .home-logo {
    margin-top: 3rem;
    width: 50%;
    max-width: 23rem;
    min-width: 15rem;

    /* transform: translateY(-10rem); */
    animation: logo-down 0.4s ease-in;
  }
  .btn-play {
    background: transparent;
    border: none;
    font-family: inherit;
    font-size: 3rem;
    color: black;
  }
  .link-play {
    ${({ themeOption, theme }) => {
      return {
        color: theme.font,
      };
    }}
  }
  @keyframes logo-down {
    from {
      transform: translateY(-13rem);
      width: 15rem;
    }
    to {
      transform: translateY(0rem);
      width: 50%;
      /* max-width: 50%;
      min-width: 15rem; */
    }
  }
`;
