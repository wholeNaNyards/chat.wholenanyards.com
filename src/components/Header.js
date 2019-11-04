import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitch,
  faTwitter,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

import "./Header.css";

const Header = () => (
  <nav className="navBar">
    <a
      href="https://wholenanyards.com"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="logo">WNY</div>
    </a>
    <ul className="iconContainer">
      <li className="icon">
        <a href="https://www.twitch.tv/NobuffTV">
          <FontAwesomeIcon icon={faTwitch} />
        </a>
      </li>
      <li className="icon">
        <a href="https://twitter.com/wholeNaNyards">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>
      <li className="icon">
        <a href="https://github.com/wholeNaNyards">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </li>
    </ul>
  </nav>
);

export default Header;
