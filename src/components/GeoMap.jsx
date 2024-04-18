import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import myMap from "../map/worldedited.topo.json";
import FaPlusCircle from "../icons/FaPlusCircle";
import FaMinusCircle from "../icons/FaMinusCircle";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import sizes from "../util/screens";
const MapChart = ({
  setAnswer,
  setCountry,
  country,
  countries,
  countryAnswered,
  setCountryAnswered,
  setCountries,
  gameStart,
}) => {
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const [position, setPosition] = useState({
    coordinates: [0, size.y / 80],
    zoom: 0.3,
  });

  const { theme, themeColors } = useGlobalContext();

  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };
  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    <Wrapper $countryAnswered={countryAnswered}>
      <div className="btn-container">
        <button onClick={handleZoomIn} className="btn-zoom btn-zoom-plus">
          <FaPlusCircle />
        </button>
        <button onClick={handleZoomOut} className="btn-zoom btn-zoom-minus">
          <FaMinusCircle />
        </button>
      </div>
      <ComposableMap className="map" height={size.y / 2.5} width={size.x / 2}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          maxZoom={100}
          minZoom={0.2}
        >
          <Geographies geography={myMap}>
            {({ geographies }) => {
              return geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    cursor="pointer"
                    strokeWidth=".1"
                    className="geography"
                    onClick={() => {
                      if (!gameStart) {
                        return;
                      }
                      if (geo.id === country.cca3) {
                        setAnswer("correct");

                        setCountryAnswered([...countryAnswered, geo.id]);

                        if (
                          countries.indexOf(country) ===
                          countries.length - 1
                        ) {
                          setCountry(countries[0]);
                        } else {
                          setCountry(countries[countries.indexOf(country) + 1]);
                        }

                        const filteredCountries = countries.filter((c) => {
                          return c !== country;
                        });
                        setCountries(filteredCountries);

                        if (countryAnswered.length === 193) {
                          setGameEnd(true);
                        }
                        return;
                      }

                      setAnswer("wrong");
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = "none";
                    }}
                    style={{
                      default: {
                        fill: `${
                          countryAnswered.includes(geo.id)
                            ? themeColors.mapCorrect
                            : themeColors.mapPrimary
                        }`,
                        stroke: "black",
                        strokeWidth: `${
                          geo.id !== "KIR" &&
                          geo.id !== "PLW" &&
                          geo.id !== "FSM" &&
                          geo.id !== "WSM" &&
                          geo.id !== "TUV" &&
                          geo.id !== "NRU" &&
                          geo.id !== "MHL" &&
                          geo.id !== "TON" &&
                          geo.id !== "SYC" &&
                          geo.id !== "COM" &&
                          geo.id !== "DMA" &&
                          geo.id !== "KNA" &&
                          geo.id !== "ATG" &&
                          geo.id !== "LCA" &&
                          geo.id !== "VCT" &&
                          geo.id !== "BRB" &&
                          geo.id !== "GRD" &&
                          geo.id !== "MUS" &&
                          geo.id !== "STP" &&
                          geo.id !== "MCO" &&
                          geo.id !== "MLT" &&
                          geo.id !== "AND" &&
                          geo.id !== "LIE" &&
                          geo.id !== "SMR" &&
                          geo.id !== "CPV"
                            ? 0.3
                            : geo.id === "MCO" ||
                              geo.id === "AND" ||
                              geo.id === "SMR"
                            ? 0.2
                            : 0
                        }`,
                      },

                      hover: {
                        fill: `${
                          countryAnswered.includes(geo.id)
                            ? themeColors.mapCorrect
                            : themeColors.mapHover
                        }`,
                      },
                    }}
                  ></Geography>
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  /* height: 100vw;
  width: 90vw; */
  /* min-height: 350px; */
  max-height: 75vh;
  /* max-width: 70vw; */
  /* @media only screen and (max-width: ${sizes.small}) {
    justify-content: center;
    max-width: 80vw;
  } */

  /* @media only screen and (max-width: ${sizes.small}) {
    justify-content: center;
    max-width: 80vw;
  }
  .map {
    @media only screen and (max-width: ${sizes.small}) {
    }
  } */

  .btn-zoom {
    background: transparent;
    padding: 0;
    border: none;
    color: var(--white);
    cursor: pointer;
    font-size: 20px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export default MapChart;
