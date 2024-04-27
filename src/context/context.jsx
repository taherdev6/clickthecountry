import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );
  const [themeColors, setThemeColors] = useState("");

  const storedMode = localStorage.getItem("mode");

  const [mode, setMode] = useState(storedMode ? storedMode : "");

  const [page, setPage] = useState("home");
  const [country, setCountry] = useState("");
  const [countryAnswered, setCountryAnswered] = useState([]);

  const [countries, setCountries] = useState([]);
  const [fixedCountries, setFixedCountries] = useState([]);

  const [countriesLength, setCountriesLength] = useState("");

  const [answer, setAnswer] = useState("");

  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const [gameLength, setGameLength] = useState(false);

  const [hidePopup, setHidePopup] = useState(true);
  const [popupText, setPopupText] = useState("");

  const [finishTime, setFinishTime] = useState("");
  const [timer, setTimer] = useState("");

  const randomCountry = (countryArr) => {
    const country = countryArr[Math.floor(Math.random() * countryArr.length)];
    return country;
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (page !== "quiz") {
      setGameStart(false);
    }
    if (page === "quiz") {
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      setCountry(randomCountry);
    }
  }, [page]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetch(
          `https://restcountries.com/v3.1/all?fields=cca3,name,unMember,languages,capital,flags`
        );
        const res = await data.json();
        const filteredRes = res
          .filter((country) => {
            if (country.cca3 === "PSE") {
              return true;
            }
            return (
              country.unMember === true &&
              country.cca3 !== "ISR" &&
              country.cca3 !== "VAT"
            );
          })
          .map((country) => {
            let flag = country.flags.svg;
            const languages = Object.values(country.languages);

            return {
              cca3: country.cca3,
              name: country.name.common,
              capital:
                country.cca3 === "PSE" ? "jerusalem" : country.capital[0],
              language: languages[0],
              flag,
            };
          });
        const randomCountry =
          filteredRes[Math.floor(Math.random() * filteredRes.length)];

        setCountry(randomCountry);
        setFixedCountries(filteredRes);
        setCountries(filteredRes);
        setCountriesLength(filteredRes.length);
      } catch (error) {}
    };

    getCountries();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        page,
        setTheme,
        setPage,
        setAnswer,
        setCountry,
        country,
        countries,
        countryAnswered,
        setCountryAnswered,
        setCountries,
        gameStart,
        setGameStart,
        gameLength,
        setGameLength,
        answer,
        hidePopup,
        setHidePopup,
        popupText,
        setPopupText,
        countriesLength,
        gameEnd,
        setGameEnd,
        finishTime,
        setFinishTime,
        fixedCountries,
        setFixedCountries,
        randomCountry,
        timer,
        setTimer,
        themeColors,
        setThemeColors,
        mode,
        setMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
