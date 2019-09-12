import React, { useState, useEffect, useCallback } from 'react';
import { Tree } from 'antd';
import 'antd/dist/antd.css';

const { TreeNode } = Tree;

function insert(node, path) {
	const pathParts = path.split('.');
	let current = node;

	pathParts.reduce((pre, curr) => {
		let children = current.children || [];
		let alreadyExists = false;
		let idx = children.findIndex((ch) => ch.title === curr);
		alreadyExists = idx >= 0;

		if (!alreadyExists) {
			let node = {
				title: curr,
				key: JSON.stringify({ path: pre + '.' + curr, isLeaf: curr === pathParts[pathParts.length - 1] }),
				children: []
			};
			children.push(node);
			current = node;
		} else {
			current = children[idx];
		}
		return pre + '.' + curr;
	}, node.title);
}
type Props = { params: { [key: string]: string[] }; checked: string[]; setChecked: (c: string[]) => void };
const ParamTree: React.FC<Props> = ({ params, checked, setChecked }) => {
	let [selectedKeys, setSelectedkeys] = useState([]);
	let [selectedPaths, setSelectedPaths] = useState([]);
	useEffect(
		() => {
			setSelectedPaths(checked.map((v) => JSON.parse(v)).filter((v) => v.isLeaf == true).map((v) => v.path));

			console.log(selectedPaths);
		},
		[checked]
	);

	let renderTreeNodes = useCallback(
		(data) =>
			data.map((item) => {
				if (item.children) {
					return (
						<TreeNode title={item.title} key={item.key} dataRef={item}>
							{renderTreeNodes(item.children)}
						</TreeNode>
					);
				}
				return <TreeNode key={item.key} {...item} />;
			}),
		[]
	);

	let formatParams = useCallback((data) => {
		let entries = Object.entries<string[]>(data || {});
		console.log(entries);
		return entries.map(([m, v]) => {
			let root = { title: m, key: JSON.stringify({ path: m, isLeaf: false }), children: [] };
			v.forEach((n) => insert(root, n));
			return root;
		});
	}, []);

	return (
		<Tree
			checkable
			showLine
			onSelect={(s) => setSelectedkeys(s)}
			selectedKeys={selectedKeys}
			onCheck={(c, e) => {
				Array.isArray(c) ? setChecked(c) : setChecked(c.checked);
			}}
			checkedKeys={checked}
		>
			{renderTreeNodes(formatParams(params))}
		</Tree>
	);
};

export default ParamTree;
