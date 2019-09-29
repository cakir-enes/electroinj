import "@blueprintjs/core/lib/css/blueprint.css";
import React, { useState, useMemo } from "react";
import NavBar from "../components/navbar";

const Page = ({ children }) => {
  return (
    <div style={{ height: "92vh" }}>
      <NavBar />
      {children}
    </div>
  );
};

export default Page;
