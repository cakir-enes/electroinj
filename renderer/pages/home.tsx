import React, { useState, useEffect } from 'react';
import { UL, H3, Overlay, Classes, H5 } from '@blueprintjs/core';
import { useHover } from '../hooks/useHover';
import { ipcRenderer } from 'electron';
import Page from '../layout';
import { Virtuoso } from 'react-virtuoso';
import { Parameter } from '../../shared/types';

const useParameters = () => {
	const [ params, setParams ] = useState(
		Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' } as Parameter))
	);
	useEffect(() => {
		ipcRenderer.on('update', (event, arg) => {
			setParams(arg);
		});

		const tok = setInterval(() => {
			// setParams(params.map((i) => ({ ...i, val: Math.random().toFixed(0) })));
			ipcRenderer.send('update');
		}, 100);
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
			<Virtuoso style={{ flexGrow: 1 }} totalCount={200} item={(index) => <div>Item {index}</div>} />
			{/* <UL style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					{p.map((i) => <Item name={i.name} val={i.val} />)}
				</UL> */}
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

const Item: React.FC<Parameter> = ({ name, val }) => {
	const [ ref, isHovered ]: any = useHover();

	return (
		<li
			key={name}
			ref={ref}
			style={{
				display: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<H5 style={{ marginLeft: '15px' }}>{name}</H5>
			<H5 style={{ marginRight: '15px' }}>{val}</H5>
		</li>
	);
};
export default Home;
