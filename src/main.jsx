import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { LeaveProvider } from "../src/Pages/Leave/LeaveContext.jsx";
import { QueriesProvider } from "./Pages/Queries/queriesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <LeaveProvider>
        <QueriesProvider>
          <App />
        </QueriesProvider>
      </LeaveProvider>
    </React.StrictMode>
  </BrowserRouter>
);
