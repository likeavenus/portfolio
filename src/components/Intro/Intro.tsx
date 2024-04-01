import React from "react";
import { FormattedMessage } from "react-intl";

const messages = {
  start: "Старт",
};

import "./styles.css";

export const Intro: React.FC<{ setStart(): void; isStarted: boolean }> = ({ setStart, isStarted }) => {
  return (
    <div className={`container ${isStarted ? "container-closed" : ""}`}>
      <button className="start-btn" onClick={setStart}>
        {messages.start}
      </button>
    </div>
  );
};
