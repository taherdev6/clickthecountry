import { faClock, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const modes = [
  {
    name: "Click The Country",
    icon: <FontAwesomeIcon fontSize="30px" icon={faGlobeAsia} />,
    description:
      "the classic game mode! find all countries using information displayed.",
  },
  // {
  //   name: "time rush",
  //   icon: <FontAwesomeIcon fontSize="30px" icon={faClock} />,
  //   description: "race against time and aim for a personal record.",
  // },
];

const constants = () => {
  return <div>constants</div>;
};

export default constants;
