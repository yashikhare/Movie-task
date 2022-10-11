import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="appName">React Movie App</div>
        </div>
      </div>
    </div>
  );
}
export default Header;
