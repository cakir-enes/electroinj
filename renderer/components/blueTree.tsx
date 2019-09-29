import * as React from "react";

import {
  Classes,
  Icon,
  Intent,
  ITreeNode,
  Position,
  Tooltip,
  Tree,
  Checkbox
} from "@blueprintjs/core";

export interface ITreeExampleState {
  nodes: ITreeNode[];
}
interface CheckableTreeNode<T = {}> extends ITreeNode<T> {
  parent: CheckableTreeNode<T> | null;
  checkedChildren: number;
  childNodes: CheckableTreeNode<T>[];
}

const CB = () => {
  let [s, setS] = React.useState(false);
  return <Checkbox checked={s} onChange={() => setS(x => !x)} />;
};

export const TreeExample: React.FC<{
  params: { [key: string]: string[] };
}> = props => {
  let [s, setS] = React.useState(false);

  let [i, setI] = React.useState(0);

  React.useEffect(() => console.log(`S: ${s}`), [s]);

  let insert = (node: CheckableTreeNode, path: string) => {
    const pathParts = path.split(".");
    let current = node;

    pathParts.reduce((pre, curr) => {
      let children = current.childNodes || [];
      let alreadyExists = false;
      let idx = children.findIndex(ch => ch.label === curr);
      alreadyExists = idx >= 0;

      if (!alreadyExists) {
        let node: CheckableTreeNode = {
          label: curr,
          parent: current,
          checkedChildren: 0,
          childNodes: [],

          secondaryLabel: <Checkbox />,
          id: JSON.stringify({
            path: pre + "." + curr,
            isLeaf: curr === pathParts[pathParts.length - 1]
          })
        };
        let child = node;
        current.childNodes.push(child);
        current = child;
      } else {
        current = children[idx];
      }
      return pre + "." + curr;
    }, node.label);
  };

  let formatParams = data => {
    let entries = Object.entries<string[]>(data || {});
    console.log(entries);
    return entries.map(([m, v]) => {
      let root: CheckableTreeNode = {
        label: m,
        id: JSON.stringify({ path: m, isLeaf: false }),
        checkedChildren: 0,
        icon: CB(),
        childNodes: [],
        parent: null
      };
      v.forEach(n => insert(root, n));
      return root;
    });
  };

  let [nodes, setNodes] = React.useState(formatParams(props.params));
  React.useEffect(() => setNodes(formatParams(props.params)), [props.params]);

  let handleNodeClick = () => (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(nodes, n => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    setI(i => i + 1);
  };

  let handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    setI(i => i + 1);
  };

  let handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    setI(i => i + 1);
  };

  return (
    <Tree
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />
  );
};

interface ICheckableTreeNode<T = {}> extends ITreeNode<T> {}

const INITIAL_STATE: ICheckableTreeNode[] = [
  {
    id: 0,
    hasCaret: true,
    icon: "folder-close",
    label: "Folder 0"
  },
  {
    id: 1,
    icon: <Checkbox label="ASD" style={{ marginTop: "10px" }} />,
    isExpanded: true,
    label: (
      <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
        Folder 1
      </Tooltip>
    ),
    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item 0",
        secondaryLabel: (
          <Tooltip content="An eye!">
            <Icon icon="eye-open" />
          </Tooltip>
        )
      },
      {
        id: 3,
        icon: (
          <Icon
            icon="tag"
            intent={Intent.PRIMARY}
            className={Classes.TREE_NODE_ICON}
          />
        ),
        label:
          "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man."
      },
      {
        id: 4,
        hasCaret: true,
        icon: "folder-close",
        label: (
          <Tooltip content="foo" position={Position.RIGHT}>
            Folder 2
          </Tooltip>
        ),
        childNodes: [
          { id: 5, label: "No-Icon Item" },
          { id: 6, icon: "tag", label: "Item 1" },
          {
            id: 7,
            hasCaret: true,
            icon: "folder-close",
            label: "Folder 3",
            childNodes: [
              { id: 8, icon: "document", label: "Item 0" },
              { id: 9, icon: "tag", label: "Item 1" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    hasCaret: true,
    icon: "folder-close",
    label: "Super secret files",
    disabled: true
  }
];
/* tslint:enable:object-literal-sort-keys */
