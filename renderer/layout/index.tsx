import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState, useMemo } from "react";
import { SelectedPathsProvider } from "../hooks/useParameters";
import { Sidebar } from "../components/Sidebar";

const Page = ({ children }) => {
  return (
    // <React.Fragment>{children}</React.Fragment>
    <div
      style={{
        height: "100%",
        display: "grid",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,

        justifyContent: "center",

        gridTemplateColumns: "55px 1fr"
      }}
    >
      <Sidebar />
      <SelectedPathsProvider>{children}</SelectedPathsProvider>
    </div>
  );
};

export default Page;
