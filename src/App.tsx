import React from "react";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";

import "./App.css";

import { Container } from "./components/Container/Container";

function App() {
  return (
    <IntlProvider locale="ru">
      <Container />
    </IntlProvider>
  );
}

export default App;
