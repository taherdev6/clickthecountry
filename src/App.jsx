import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Modes, QuizFreePlay, Time } from "./pages";
import { Navbar } from "./components";
import { ThemeProvider } from "styled-components";
import { useGlobalContext } from "./context/context";

const router = createBrowserRouter([
  {
    element: <Navbar />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/modes",
        element: <Modes />,
      },
      {
        path: "/modes/time",
        element: <Time />,
      },
      {
        path: "/modes/time/:id",

        element: <QuizFreePlay />,
      },
    ],
  },
]);
function App() {
  const { theme, setThemeColors } = useGlobalContext();
  const bpSmall = 550;
  const options = {
    main: {
      background: "#007fff",
      font: "#ffffff",
      hover: "#2e3b48",
      popupBackground: "#cce5ff",
      popupFont: "#0066cc",
      popupHover: "#abbed1",
      mapPrimary: "#ffffff",
      mapCorrect: "#45586b",
      mapHover: "#5c768f",
    },
    light: {
      background: "#e3e9f0",
      font: "#45586b",
      hover: "#2e3b48",
      popupBackground: "#cce5ff",
      popupFont: "#0066cc",
      popupHover: "#abbed1",
      mapPrimary: "#ffffff",
      mapCorrect: "#45586b",
      mapHover: "#5c768f",
    },
    dark: {
      background: "#2e3b48",
      font: "#cce5ff",
      hover: "#5c768f",
      popupBackground: "#cce5ff",
      popupFont: "#0066cc",
      popupHover: "#5c768f",
      mapPrimary: "#abbed1",
      mapCorrect: "#e3e9f0",
      mapHover: "#5c768f",
    },
  };

  useEffect(() => {
    if (navigator.userAgent.match(/samsung/i)) {
      alert(
        "Samsung Internet's dark mode may cause issues displaying colors correctly. We recommend using other browsers or switching to light mode."
      );
    }
    const colors =
      theme === "default"
        ? options.main
        : theme === "light"
        ? options.light
        : theme === "dark"
        ? options.dark
        : "";

    setThemeColors(colors);

    document.body.style.backgroundColor = `${colors.background}`;

    document.body.style.color = `${colors.font}`;
  }, [theme]);
  return (
    <ThemeProvider
      theme={
        theme === "default"
          ? options.main
          : theme === "light"
          ? options.light
          : theme === "dark"
          ? options.dark
          : ""
      }
      bpSmall={bpSmall}
    >
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
