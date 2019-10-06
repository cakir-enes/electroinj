import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState, useMemo } from "react";
import NavBar from "../components/navbar";
import { SelectedPathsProvider } from "../hooks/useParameters";

const Page = ({ children }) => {
  return (
    // <React.Fragment>{children}</React.Fragment>
    <div
      style={{
        height: "98vh",
        display: "grid",
        overflow: "hidden",

        justifyContent: "center",

        gridTemplateColumns: "55px 1fr"
      }}
    >
      <NavBar />
      <SelectedPathsProvider>{children}</SelectedPathsProvider>
    </div>
  );
};

export default Page;
