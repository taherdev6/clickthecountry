import React, { useEffect, useState } from "react";
import FaLayerGroup from "../icons/FaLayerGroup";
import FaPalette from "../icons/FaPalette";
import FaRotateLeft from "../icons/FaRotateLeft";
import FaDoorOpen from "../icons/FaDoorOpen";
import FaHome from "../icons/FaHome";
import FaPause from "../icons/FaPause";
import FaExpand from "../icons/FaExpand";
import FaCompress from "../icons/FaCompress";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import { useGlobalContext } from "../context/context";
import sizes from "../util/screens";

const Navbar = () => {
  const {
    page,
    theme,
    setTheme,
    setHidePopup,
    gameStart,
    setPopupText,
    gameLength,
  } = useGlobalContext();
  const [themeHidden, setThemeHidden] = useState("hidden");
  const [navHidden, setNavHidden] = useState(page !== "quiz" ? true : false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  Wrapper.defaultProps = {
    $themeOption: theme,
  };

  return (
    <Wrapper>
      <div className="nav">
        <div className={` game-btn-container ${gameStart ? "" : "hidden"} `}>
          <div
            className="restart"
            onClick={() => {
              setHidePopup(false);
              setPopupText("Restart");
            }}
          >
            <span className="game-btn-text">Restart</span> <FaRotateLeft />
          </div>
          <div
            className="end"
            onClick={() => {
              setHidePopup(false);
              setPopupText("End");
            }}
          >
            <span className="game-btn-text">End Run</span> <FaDoorOpen />
          </div>

          <div
            className={`pause ${gameLength === "freeplay" ? "hidden" : ""}`}
            onClick={() => {
              setHidePopup(false);
              setPopupText("Pause");
            }}
          >
            <span className="game-btn-text">Pause</span> <FaPause />
          </div>
        </div>
        <Logo
          className={`${page !== "home" ? "nav-logo" : ""} ${
            page === "home" ? "hidden" : ""
          }`}
        />
        <div className="nav-options">
          <div className="home">
            {page === "home" ? (
              ""
            ) : (
              <div>
                <Link to="/" className="home-link">
                  <span className="nav-btn-text">Home</span> <FaHome />
                </Link>
              </div>
            )}
            {/* Modes <FaLayerGroup /> */}
          </div>
          <div className="themes">
            <button
              className="btn-theme"
              onClick={() => {
                setThemeHidden(themeHidden === "" ? "hidden" : "");
              }}
              onBlur={(e) => {
                setThemeHidden("hidden");
              }}
            >
              <span className="nav-btn-text">Themes</span> <FaPalette />
            </button>{" "}
            <div className={`theme-options ${themeHidden}`}>
              <div className="theme" onClick={() => setTheme("default")}>
                Default
              </div>
              <span className="circle circle-default"></span>
              <div onClick={() => setTheme("light")} className="theme">
                Light
              </div>
              <span className="circle circle-light"></span>
              <div onClick={() => setTheme("dark")} className="theme">
                Dark
              </div>
              <span className="circle circle-dark"></span>
            </div>
          </div>
          <div
            onClick={() => {
              if (document.fullscreenElement === null) {
                document.documentElement.requestFullscreen();
                setIsFullscreen(true);
              } else {
                document.exitFullscreen();
                setIsFullscreen(false);
              }
            }}
            className="fullscreen"
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </div>
        </div>
      </div>

      <div id="detail">
        <Outlet />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  #detail {
    ${({ themeOption, theme }) => {
      return {
        backgroundColor: theme.background,
        color: theme.font,
      };
    }}
  }
  .nav {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1rem 2fr 1rem 1fr 1fr 1fr 1fr;
    grid-template-rows: 3.5rem;
    justify-content: center;
    align-items: center;

    .fullscreen {
      justify-self: end;
      grid-column: 4/5;
      cursor: pointer;
      @media only screen and (max-width: ${sizes.small}) {
        grid-column: 4/5;
      }
    }

    .nav-options {
      grid-column: 7/12;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      align-items: center;
      @media only screen and (max-width: ${sizes.small}) {
        grid-column: 8/12;
        justify-items: start;
      }
    }

    .nav-logo {
      animation: logo-up 0.8s;
      height: 5vw;
      grid-column: 6/7;
      justify-self: center;
      min-height: 4.5rem;
      /* margin-left: 30px; */
    }

    .game-btn-container {
      grid-column: 1/5;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 2fr;
      justify-items: center;
      div {
        cursor: pointer;
      }
      .restart {
        grid-column: 1/2;
        @media only screen and (max-width: ${sizes.small}) {
          justify-self: start;
        }
      }
      .end {
        grid-column: 2/4;
        @media only screen and (max-width: ${sizes.small}) {
          justify-self: center;
        }
      }

      .pause {
        grid-column: 4/5;
        @media only screen and (max-width: ${sizes.small}) {
          justify-self: end;
        }
      }
    }

    .home {
      grid-column: 1/2;
    }
    .home-link {
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.background,
          color: theme.font,
        };
      }}
    }

    .game-btn-text {
      @media only screen and (max-width: ${sizes.small}) {
        display: none;
      }
    }

    .nav-btn-text {
      @media only screen and (max-width: ${sizes.small}) {
        display: none;
      }
    }

    .themes {
      position: relative;
      display: flex;
      flex-direction: column;
      grid-column: 2 / 4;

      @media only screen and (max-width: ${sizes.small}) {
        grid-column: 2/4;
        justify-self: center;
      }
    }
    .theme-options {
      z-index: 1000;
      position: absolute;
      top: 400%;

      left: 50%;
      transform: translate(-50%, -50%);
      /* top:60px; */
      /* right: 30px; */
      /* margin-top: 2rem; */
      /* margin-left: 1.2rem; */
      /* align-self: flex-start; */
      /* justify-self: center; */
      /* margin-top: 12rem; */
      display: grid;
      grid-template-columns: 1fr 1fr;
      transition: var(--transition);

      background: var(--white);
      color: var(--primary-500);
      border-radius: var(--borderRadius);
      font-size: 0.9rem;
      padding: 1.3rem 1rem;

      .theme {
        cursor: pointer;
        padding: 2px 5px;
        &:hover {
          background-color: var(--grey-800);
          border-radius: var(--borderRadius);
        }
      }

      .circle {
        border-radius: 50%;
        border: var(--black) solid 1px;
        padding-left: 10px;
        height: 1.2rem;
        width: 1.2rem;
        align-self: center;
        justify-self: center;
      }
      .circle-default {
        background-color: var(--primary-500);
      }
      .circle-light {
      }
      .circle-dark {
        background-color: var(--black);
      }
    }

    .btn-theme {
      font-family: inherit;
      background-color: transparent;
      border: none;
      color: var(--white);
      font-size: 1rem;
      padding: 0;
      cursor: pointer;
      ${({ themeOption, theme }) => {
        return {
          backgroundColor: theme.background,
          color: theme.font,
        };
      }}
    }
    .hidden {
      visibility: hidden;
      opacity: 0;
    }
  }

  @keyframes logo-up {
    from {
      transform: translateY(13rem);
    }
    to {
      transform: translateY(0rem);
    }
  }
`;

export default Navbar;
