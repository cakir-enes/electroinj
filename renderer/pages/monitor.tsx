import React, { useState } from 'react';
import Page from '../layouts';
import { H1, UL, H5, H4 } from '@blueprintjs/core';
import { useHover, useParameters } from '../hooks/useHover';
import { Virtuoso } from 'react-virtuoso';

const Monitor = () => {
	const p = useParameters();
	const [ activeIdx, setActive ] = useState(2);
	return (
		<Page>
			<Virtuoso
				// style={{ width: '100vh', height: '600px' }}
				totalCount={p.length}
				item={(index) => <Item name={p[index].name} val={p[index].val} isSelected={index === activeIdx} />}
			/>
		</Page>
	);
};
type Param = { name: string; val: string };
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
			<H4 style={{ marginLeft: '15px' }}>{name}</H4>
			<H5 style={{ marginRight: '15px' }}>{val}</H5>
		</li>
	);
};
export default Monitor;
