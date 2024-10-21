import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CoinContextProvider from "./context/CoinContext.jsx";
import App from "./App.jsx";
import "./index.css";

// Create a root element for rendering React components
const root = createRoot(document.getElementById("root"));

// Render the application within a StrictMode for additional checks and warnings
root.render(
  <StrictMode>
    {/* Provide routing capabilities using BrowserRouter */}
    <BrowserRouter>
      {/* Wrap the application with the CoinContextProvider to provide context */}
      <CoinContextProvider>
        {/* Render the main App component */}
        <App />
      </CoinContextProvider>
    </BrowserRouter>
  </StrictMode>
);
