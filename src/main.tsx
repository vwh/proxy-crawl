import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import ThemeProvider from "@/components/theme/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <main className="container mx-auto h-screen p-6">
        <App />
      </main>
    </ThemeProvider>
  </React.StrictMode>
);
