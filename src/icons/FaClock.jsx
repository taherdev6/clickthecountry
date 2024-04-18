import React from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FaClock = (props) => {
  return <FontAwesomeIcon {...props} icon={faClock} />;
};

export default FaClock;
