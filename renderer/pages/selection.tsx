import { H4 } from "@blueprintjs/core";
import React, { useCallback, useState, useContext } from "react";
import Node from "../components/Node";
import { NodeRenderer } from "../components/NodeRenderer";
import { useModInfoTree } from "../hooks/useModuleInfo";
import { SelectedPathsContext } from "../hooks/useParameters";

let root = new Node<string>("ROOT", "ROOT");
let ch1 = new Node<string>("CH1", "Ch1");
let ch2 = new Node<string>("CH2", "CH2");
let ch3 = new Node<string>("CH3", "Ch3");
let ch4 = new Node<string>("CH4", "Ch4");
let ch5 = new Node<string>("CH5", "Ch5");

root.addChild(ch1);
root.addChild(ch3);
ch1.addChild(ch2);
ch2.addChild(ch4);
ch2.addChild(ch5);
let checkedMap = new Map<string, boolean>();

const Selection = () => {
  // let [selections, setSelections] = useState([]);
  let { selections, setSelections, modInfo } = useContext(SelectedPathsContext);
  let modInfoTree = useModInfoTree(modInfo);

  let onChange = useCallback(
    (path: string, check: boolean) => {
      const mod = path.substring(0, path.indexOf("."));
      const rawPath = path.substring(path.indexOf(".") + 1);
      if (check != undefined) {
        setSelections(x => ({
          ...x,
          [mod]: check
            ? [...x[mod], rawPath]
            : x[mod].filter(a => a !== rawPath)
        }));
      }
    },
    [selections]
  );

  return (
    <div>
      <H4 onClick={() => console.log(JSON.stringify(selections))}>
        {JSON.stringify(selections)}
      </H4>
      {modInfoTree.map(v => (
        <NodeRenderer key={v.label} node={v} onChange={onChange} />
      ))}
    </div>
  );
};

export default Selection;
