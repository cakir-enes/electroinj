import React, { useState, useEffect, useContext } from "react";
import MonitorList from "../components/MonitorList";
import { useParameters, SelectedPathsContext } from "../hooks/useParameters";
import { ipcRenderer } from "electron";
import { REQ } from "../../shared/rpc";

const Monitor = () => {
  let { selections } = useContext(SelectedPathsContext);
  const params = useParameters(selections);
  // useEffect(() => console.log(`New params: ${params}`), [params])
  return <MonitorList params={params} />;
};

export default Monitor;
