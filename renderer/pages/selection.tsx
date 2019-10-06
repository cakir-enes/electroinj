import { TextArea } from "@blueprintjs/core";
import React, { useCallback, useContext } from "react";
import { NodeRenderer } from "../components/NodeRenderer";
import { useModInfoTree } from "../hooks/useModuleInfo";
import { SelectedPathsContext } from "../hooks/useParameters";

const Selection = () => {
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
    <div style={{ overflow: "auto" }}>
      {modInfoTree.map(v => (
        <NodeRenderer key={v.label} node={v} onChange={onChange} />
      ))}
    </div>
  );
};

export default Selection;
