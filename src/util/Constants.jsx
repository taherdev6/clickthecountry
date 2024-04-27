import {
  faClock,
  faGlobeAsia,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const modes = [
  {
    name: "Click The Country",
    icon: <FontAwesomeIcon fontSize="30px" icon={faGlobeAsia} />,
    description:
      "the classic game mode! find all countries using information displayed.",
    mode: "countries",
  },

  {
    name: "Find The Capital",
    icon: <FontAwesomeIcon fontSize="30px" icon={faLocation} />,
    description: "an advanced mode, find the capital city on the map.",
    mode: "capitals",
  },
];

const constants = () => {
  return <div>constants</div>;
};

export default constants;
