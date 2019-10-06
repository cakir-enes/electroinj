import React, { useState, useEffect, useContext } from "react";
import MonitorList from "../components/monitorList";
import { useParameters, SelectedPathsContext } from "../hooks/useParameters";
import { ipcRenderer } from "electron";
import { REQ } from "../../shared/rpc";

const Monitor = () => {
  let { selections } = useContext(SelectedPathsContext);
  const params = useParameters(selections);
  return <MonitorList params={params} />;
};

export default Monitor;
