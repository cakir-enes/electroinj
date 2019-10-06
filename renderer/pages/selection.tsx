import { H4 } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";
import Node from "../components/Node";
import { NodeRenderer } from "../components/NodeRenderer";
import { useModInfoTree } from "../hooks/useModuleInfo";

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
  let modInfo = useModInfoTree();
  // let [selections, setSelections] = useState([]);
  let [selections, setSelections] = useState({});

  let onChange = useCallback((path: string, check: boolean) => {
    // setSelections(s => (check ? [...s, path] : s.filter(x => x != path)));
    setSelections(x => ({ ...x, [path]: check }));
  }, []);

  return (
    <div>
      <H4 onClick={() => console.log(JSON.stringify(checkedMap))}>
        {JSON.stringify(selections)}
      </H4>
      {modInfo.map(v => (
        <NodeRenderer node={v} onChange={onChange} />
      ))}
    </div>
  );
};

export default Selection;
