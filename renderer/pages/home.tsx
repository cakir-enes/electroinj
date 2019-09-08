import '@blueprintjs/core/lib/css/blueprint.css';
import React, { useState, useEffect, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Link from 'next/link';
import { UL, H3, Overlay, Classes } from '@blueprintjs/core';
import { useHover } from '../hooks/useHover';
import { ipcRenderer } from 'electron';
import { Sidebar } from '../components/sidebar';
import Page from '../layouts/';

type Param = { name: string; val: string };

const useParameters = () => {
	const [ params, setParams ] = useState(
		Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' } as Param))
	);
	useEffect(() => {
		ipcRenderer.on('update', (event, arg) => {
			setParams(arg);
		});

		const tok = setInterval(() => {
			// setParams(params.map((i) => ({ ...i, val: Math.random().toFixed(0) })));
			ipcRenderer.send('update');
		}, 100 / 10);
		return () => {
			console.log('CLEARING SHIT');
			clearInterval(tok);
		};
	}, []);
	return params;
};
const Home = () => {
	const p = useParameters();
	const [ activeIdx, setActive ] = useState(2);

	return (
		<Page>
			<Virtuoso
				// style={{ width: '100vh', height: '600px' }}
				totalCount={p.length}
				item={(index) => <Item name={p[index].name} val={p[index].val} isSelected={index === activeIdx} />}
			/>
			{/* <UL style={{ flexGrow: 1 }}>
				{p.map((i, idx) => <Item name={i.name} val={i.val} isSelected={idx === activeIdx} />)}
			</UL> */}
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
			<H3>{name}</H3>
			<span>{val}</span>
		</li>
	);
};
export default Home;
