import 'react-checkbox-tree/lib/react-checkbox-tree.css'

import React, { useEffect, useState } from 'react'
import CheckboxTree, { Node } from 'react-checkbox-tree'
import { H5 } from '@blueprintjs/core';


type Props = {
    paths: { [key: string]: string[] }
}

// const root: Node = {
//     id: 0,

//     childNodes: [],
//     isExpanded: true
// };

// function insert(node: ITreeNode, path: string) {
//     const pathParts = path.split(".");
//     let current = node;
//     let lastElementIdx = pathParts.length - 1;
//     pathParts.forEach((part, i) => {
//         let children = current.childNodes || [];
//         let alreadyExists = false;
//         let idx = children.findIndex(ch => ch.label === part);
//         alreadyExists = idx >= 0;

//         if (!alreadyExists) {
//             let node: ITreeNode = {  
//                 label: part,
//                 id: current.label + part,
//                 isExpanded: true,
//                 secondaryLabel: i == lastElementIdx && (
//                     <StrNumInput cb={val => values.set(path, val)} />
//                 ),
//                 childNodes: i == lastElementIdx ? undefined : []
//             };
//             children.push(node);
//             current = node;
//         } else {
//             current = children[idx];
//         }
//     });
// }
// fields.forEach(f => insert(root, f));
// setNodes(root.childNodes!);
const nodes: Node[] = [{
    value: 'mars',
    label: <pre>'Mars'</pre>,
    title: "ASD",
    children: [
        { value: 'phobos', label: <pre>'Phobos'</pre> },
        { value: 'deimos', label: <pre>'Deimos'</pre> },
    ],
}];
const SelectionTree: React.FC<Props> = ({ paths }) => {
    // const [nodes, setNodes] = useState([] as Node[])
    const [expanded, setExpanded] = useState()
    const [checked, setChecked] = useState()
    // useEffect(() => {
    //     Object
    //         .keys(paths)
    //         .map(mod => ({ label: <H5>{mod}</H5>, value: mod, children: [] } as Node))
    //         .map(root => paths[root.value].reduce((node, path) => {
    //             const pathParts = path.split(".")
    //             let curr = node
    //             let lastElementIdx = pathParts.length - 1
    //             pathParts.forEach((part, i) => {
    //                 let alreadyExists = false
    //                 let idx = curr.children.findIndex(ch => ch.value === part)
    //                 alreadyExists = idx >= 0

    //                 if (alreadyExists) curr = curr.children[idx]
    //                 else {
    //                     let node: Node = {
    //                         label: <H5>part</H5>,
    //                         value: part,
    //                         children: []
    //                     }
    //                     curr.children.push(node)
    //                     curr = node
    //                 }
    //             })
    //             return root
    //         }, root))
    // }, [])

    return <CheckboxTree nodes={nodes} checked={checked} onCheck={c => setChecked(c)} expanded={expanded} onExpand={e => setExpanded(e)} />
}

export default SelectionTree