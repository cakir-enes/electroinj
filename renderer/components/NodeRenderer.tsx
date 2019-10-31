import React, { useState, useEffect, useMemo } from "react";
import Node, { CheckStatus } from "./Node";
import { UL, Checkbox, Classes, Icon, H5, Button, ButtonGroup } from "@blueprintjs/core";

export const NodeRenderer: React.FC<{
  node: Node<string>;
  onChange: (path: string, check: boolean) => void;
}> = React.memo(({ node, onChange: onChange }) => {
  let [checked, setChecked] = useState(false);
  let [indeterminate, setIndeterminate] = useState(false);
  let [isExpanded, setIsExpanded] = useState(false);
  let isLeaf = useMemo(() => node.children.length === 0, [
    node.children.length
  ]);

  useEffect(() => {
    // console.log(`CHANGED ${node.data} <- isLeaf: ${isLeaf} ${checked}`);
    onChange(node.data, isLeaf ? checked : undefined);
  }, [checked]);
  useEffect(() => {
    let a = node.bindOnChange(cs => {
      //   console.log(`CHECKED: ${node.data} -> ${cs}`);
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
          style={{ float: "left" }}
        />
        <H5 style={{}}>{node.label}</H5>
      </div>

      {node.children.map((i, c) => (
        <span key={node.label + c} hidden={!isExpanded}>
          <NodeRenderer node={i} onChange={onChange} />
        </span>
      ))}
    </UL>
  );
});
