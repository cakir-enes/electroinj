import React, { useState, useEffect, useRef, useCallback } from "react";
import Node, { CheckStatus } from "../components/Node";
import { ipcRenderer } from "electron";
import { REQ } from "../../shared/rpc";
import { useModuleInfo } from "../hooks/useModuleInfo";
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
import { ModInfo, ModsInfo } from "../../shared/types";

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

let insert = (node: Node<string>, path: string) => {
  const pathParts = path.split(".");
  let current = node;

  pathParts.reduce((pre, curr) => {
    let children = current.children || [];
    let alreadyExists = false;
    let idx = children.findIndex(ch => ch.label === curr);
    alreadyExists = idx >= 0;

    if (!alreadyExists) {
      let child = new Node<string>(curr, curr);
      current.addChild(child);
      current = child;
    } else {
      current = children[idx];
    }
    return pre + "." + curr;
  }, node.label);
};

let formatParams = (data: ModsInfo) => {
  let mods = Object.keys(data);
  console.log(mods);
  return mods.map(k => {
    let m = data[k];
    let root = new Node<string>(k, k);
    m["params"].forEach(n => insert(root, n.name));
    return root;
  });
};

const NodeRenderer: React.FC<{ node: Node<string> }> = ({ node }) => {
  let [checked, setChecked] = useState(false);
  let [indeterminate, setIndeterminate] = useState(false);
  let [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    node.bindOnChange(cs => {
      switch (cs) {
        case CheckStatus.ALL:
          setChecked(true);
          setIndeterminate(false);
          break;
        case CheckStatus.NONE:
          setChecked(false);
          setIndeterminate(false);
          break;
        case CheckStatus.PARTIAL:
          setChecked(false);
          setIndeterminate(true);
      }
    });
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
        <H5 className={Classes.TREE_NODE_LABEL}>{node.label}</H5>
      </div>
      {isExpanded
        ? node.children.map((i, c) => <NodeRenderer node={i} />)
        : null}
    </UL>
  );
};

const Selection = () => {
  let modInfo = useModuleInfo();

  return (
    <React.Fragment>
      <H4>{JSON.stringify(modInfo)}</H4>
      {formatParams(modInfo).map(v => (
        <NodeRenderer node={v} />
      ))}
    </React.Fragment>
  );
};

export default Selection;
