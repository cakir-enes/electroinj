import React from "react";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { REQ } from "../../shared/rpc";
import { useModuleInfo } from "./useModuleInfo";

type ModParams = { [key: string]: string[] };

export const useParameters = (reqParams: ModParams) => {
  const [params, setParams] = useState<{ name: string; val: string }[]>([]);
  useEffect(() => {
    const handler = (_, arg) => {
      setParams(arg);
    };
    ipcRenderer.on(REQ.SUBSCRIBE_PARAMS, handler);
    // console.log(`Requested: ${JSON.stringify(reqParams)}`);
    ipcRenderer.send(REQ.SUBSCRIBE_PARAMS, reqParams, 1000 / 15);
    return () => {
      // console.log("useParameter: Clean up");
      ipcRenderer.removeListener(REQ.SUBSCRIBE_PARAMS, handler);
      ipcRenderer.send(REQ.UNSUB_PARAMS, "");
    };
  }, []);
  return params;
};

export const SelectedPathsContext = React.createContext({
  selections: {},
  setSelections: (a: {}) => {},
  modInfo: {}
});

export const SelectedPathsProvider = ({ children }) => {
  let modInfo = useModuleInfo();
  let [selections, setSelections] = useState(
    Object.keys(modInfo).reduce((map, mod) => ({ ...map, [mod]: [] }), {})
  );

  useEffect(() => {
    console.log("hooppa");
    setSelections(
      Object.keys(modInfo).reduce((map, mod) => ({ ...map, [mod]: [] }), {})
    );
  }, [modInfo]);

  return (
    <SelectedPathsContext.Provider
      value={{ selections, setSelections, modInfo }}
    >
      {children}
    </SelectedPathsContext.Provider>
  );
};
