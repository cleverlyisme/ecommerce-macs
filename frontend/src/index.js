import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "react-notifications/lib/notifications.css";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NotificationContainer } from "react-notifications";

import { AppContextProvider } from "./contexts/app.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
        <NotificationContainer />
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);

reportWebVitals();
