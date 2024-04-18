import React from "react";
import logoDefault from "../assets/logo1.svg";
import logoLight from "../assets/logo2.svg";
import logoDark from "../assets/logo3.svg";

import { useGlobalContext } from "../context/context";
const Logo = ({ className }) => {
  const { theme } = useGlobalContext();
  console;
  return (
    <img
      src={
        theme === "default"
          ? logoDefault
          : theme === "light"
          ? logoLight
          : theme === "dark"
          ? logoDark
          : ""
      }
      alt=""
      className={className}
    />
  );
};

export default Logo;
