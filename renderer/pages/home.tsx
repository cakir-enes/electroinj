import React, { useState, useEffect, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Link from 'next/link';
import { UL, H3, Overlay, Classes, H1, H5 } from '@blueprintjs/core';
import { useHover, useParameters } from '../hooks/useHover';
import { ipcRenderer } from 'electron';
import { Sidebar } from '../components/sidebar';
import Page from '../layouts/';

export type Param = { name: string; val: string };

const Home = () => {
	const p = useParameters();
	const [ activeIdx, setActive ] = useState(2);

	return (
		<Page>
			{/* <Virtuoso
				style={{ width: '100vh', height: '600px' }}
				totalCount={p.length}
				item={(index) => <Item name={p[index].name} val={p[index].val} isSelected={index === activeIdx} />}
			/> */}
			<UL style={{ flexGrow: 1 }}>
				{p.map((i, idx) => <Item name={i.name} val={i.val} isSelected={idx === activeIdx} />)}
			</UL>
		</Page>
	);
};

type Props = Param & { isSelected: boolean };
const Item: React.FC<Props> = ({ name, val, isSelected }) => {
	const [ ref, isHovered ]: any = useHover();

	return (
		<li
			key={name}
			ref={ref}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: `${isSelected ? '#00e3e3' : 'gray'}`
			}}
		>
			<H5 style={{ marginLeft: '15px' }}>{name}</H5>
			<H5 style={{ marginRight: '15px' }}>{val}</H5>
		</li>
	);
};
export default Home;
