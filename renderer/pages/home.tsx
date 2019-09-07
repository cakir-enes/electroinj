import '@blueprintjs/core/lib/css/blueprint.css';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { UL, H3, Overlay, Classes } from '@blueprintjs/core';
import { useHover } from '../hooks/useHover';
import { ipcRenderer } from 'electron';

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
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '80px', backgroundColor: '#00e1e1' }} />

			<UL style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
				{p.map((i) => <Item name={i.name} val={i.val} />)}
			</UL>
			{/* <p>
						⚡ Electron + Next.js ⚡ -
						<Link href="/next">
							<a>Go to next page</a>
						</Link>
					</p>
					<img src="/static/logo.png" /> */}
		</div>
	);
};

const Item: React.FC<Param> = ({ name, val }) => {
	const [ ref, isHovered ]: any = useHover();

	return (
		<li
			key={name}
			ref={ref}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: `${isHovered ? '#00e3e3' : 'gray'}`
			}}
		>
			<H3>{name}</H3>
			<span>{val}</span>
		</li>
	);
};
export default Home;
