import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { REQ } from "../../shared/rpc";

type ModParams = { [key: string]: string[] };

export const useParameters = (reqParams: ModParams) => {
  const [params, setParams] = useState<{ name: string; val: string }[]>([]);
  useEffect(() => {
    const handler = (_, arg) => {
      setParams(arg);
    };
    ipcRenderer.on(REQ.SUBSCRIBE_PARAMS, handler);
    console.log(`Requested: ${JSON.stringify(reqParams)}`);
    ipcRenderer.send(REQ.SUBSCRIBE_PARAMS, params, 1000 / 15);
    return () => {
      console.log("useParameter: Clean up");
      ipcRenderer.removeListener(REQ.SUBSCRIBE_PARAMS, handler);
      ipcRenderer.send(REQ.UNSUB_PARAMS, "");
    };
  }, []);
  return params;
};
