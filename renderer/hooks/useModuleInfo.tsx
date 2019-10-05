import { useState, useEffect, useCallback } from "react";
import { ModInfoMap } from "../../shared/types";
import { ipcRenderer, IpcRenderer } from "electron";
import { REQ } from "../../shared/rpc";
import Node from "../components/Node";

export const useModuleInfo: () => ModInfoMap = () => {
  const [modInfo, setModInfo] = useState<ModInfoMap>({
    FTE: { params: [], enums: [] }
  });

  useEffect(() => {
    const handler = (e, arg) => {
      setModInfo(arg);
      console.log(`ARG: ${JSON.stringify(arg)}`);
    };
    ipcRenderer.on(REQ.AllParamInfo, handler);
    console.log("Sending rmi");
    ipcRenderer.send(REQ.AllParamInfo, "");
    // setTimeout(
    // 	() =>
    // 		setModInfo({
    // 			enums: [ { name: 'a', vals: [ 'a' ] } ],
    // 			params: [ { name: 'a', val: 'a', type: 'str' } ]
    // 		}),
    // 	1000
    // );
    return () => ipcRenderer.removeListener(REQ.AllParamInfo, handler);
  }, []);
  return modInfo;
};

export const useModInfoTree: () => Node<string>[] = () => {
  let modInfo = useModuleInfo();
  let [tree, setTree] = useState([]);
  useEffect(() => {
    setTree(formatParams(modInfo));
  }, [modInfo]);
  return tree;
};

let formatParams = (data: ModInfoMap) => {
  let insert = (node: Node<string>, path: string) => {
    const pathParts = path.split(".");
    let current = node;

    pathParts.reduce((pre, curr) => {
      let children = current.children || [];
      let alreadyExists = false;
      let idx = children.findIndex(ch => ch.label === curr);
      alreadyExists = idx >= 0;

      if (!alreadyExists) {
        let child = new Node<string>(pre + "." + curr, curr);
        current.addChild(child);
        current = child;
      } else {
        current = children[idx];
      }
      return pre + "." + curr;
    }, node.label);
  };

  let mods = Object.keys(data);
  return mods.map(k => {
    let m = data[k];
    let root = new Node<string>(k, k);
    m["params"].forEach(n => insert(root, n.name));
    return root;
  });
};
