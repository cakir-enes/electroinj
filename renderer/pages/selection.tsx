import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import Node, { CheckStatus } from "../components/Node";
import { ipcRenderer } from "electron";
import { REQ } from "../../shared/rpc";
import { useModuleInfo, useModInfoTree } from "../hooks/useModuleInfo";
import { TreeExample } from "../components/blueTree";
import {
  UL,
  H4,
  Checkbox,
  H1,
  Button,
  Classes,
  Icon,
  H6,
  H5
} from "@blueprintjs/core";
import { ModInfo, ModInfoMap } from "../../shared/types";

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

const NodeRenderer: React.FC<{
  node: Node<string>;
  onChange: (path: string, check: boolean) => void;
}> = React.memo(({ node, onChange: onChange }) => {
  let [checked, setChecked] = useState(false);
  let [indeterminate, setIndeterminate] = useState(false);
  let [isExpanded, setIsExpanded] = useState(false);
  let isLeaf = useMemo(() => node.children.length === 0, [
    node.children.length
  ]);
  // useEffect(() => {
  //   console.log(`CALLED ${node.data} <- ${checked}`);
  //   onChange(node.data, checked);
  // }, [checked]);
  useEffect(() => {
    console.log(`CHANGED ${node.data} <- ${checked}`);
    isLeaf && onChange(node.data, checked);
  }, [checked]);
  useEffect(() => {
    console.log("asdas");
    let a = node.bindOnChange(cs => {
      console.log(`CHECKED: ${node.data} -> ${cs}`);
      switch (cs) {
        case CheckStatus.ALL:
          setChecked(true);
          setIndeterminate(false);
          // onChange(node.data, true);
          break;
        case CheckStatus.NONE:
          setChecked(false);
          setIndeterminate(false);
          // onChange(node.data, false);
          break;
        case CheckStatus.PARTIAL:
          setChecked(false);
          setIndeterminate(true);
        // onChange(node.data, false);
      }
    });
    return a;
  }, [node]);

  return (
    <UL className={Classes.TREE}>
      <div className={Classes.TREE_NODE} style={{ display: "flex" }}>
        {node.children.length != 0 ? (
          <Icon
            onClick={() => setIsExpanded(!isExpanded)}
            icon={isExpanded ? "caret-down" : "caret-right"}
            className={Classes.TREE_NODE_CARET_CLOSED}
          />
        ) : null}
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={() => {
            node.toggle();
          }}
        />
        <H5 onClick={() => node.addChild(new Node<string>("abc", "new"))}>
          {node.label}
        </H5>
      </div>
      {node.children.map((i, c) => (
        <span hidden={!isExpanded}>
          <NodeRenderer node={i} onChange={onChange} />
        </span>
      ))}
    </UL>
  );
});

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
