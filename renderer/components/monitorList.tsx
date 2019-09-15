import React, { useState, useEffect, useRef } from 'react';
import { useHover } from '../hooks/useHover';
import {
	H5,
	Colors,
	Callout,
	Drawer,
	H1,
	H3,
	H2,
	H4,
	Label,
	Button,
	Card,
	Classes,
	Blockquote,
	Divider,
	MenuDivider,
	ControlGroup
} from '@blueprintjs/core';
import { Virtuoso } from 'react-virtuoso';

type Props = { params: { name: string; val: string }[] };

const MonitorList: React.FC<Props> = ({ params }) => {
	const [ open, setOpen ] = useState(false);
	const paramRef = useRef(0);
	return (
		<React.Fragment>
			<Virtuoso
				style={{ flexGrow: 1, height: '100%' }}
				totalCount={params.length}
				item={(idx) => (
					<Item
						param={params[idx]}
						onClick={(param) => {
							paramRef.current = idx;
							setOpen(true);
						}}
					/>
				)}
			/>
			<Drawer isOpen={open} position="bottom" size="45px" hasBackdrop={false} onClose={() => setOpen(false)}>
				<Callout
					style={{
						display: 'flex',
						alignItems: 'baseline',
						alignContent: 'center',
						height: '100%',
						justifyContent: 'space-between'
					}}
				>
					<div style={{ display: 'flex', marginLeft: '10%' }}>
						<Info a="Path: " b={params[paramRef.current] && params[paramRef.current].name} />
						<Divider />
						<Info a="Type: " b="valval" />
						<Divider />
						<Info a="Status:" b="Normal" />
						<Divider />
						<Info a="Value: " b={params[paramRef.current] && params[paramRef.current].val} />
					</div>
					<div style={{ marginRight: '10%' }}>
						<input className={Classes.INPUT} type="text" placeholder="New Value" dir="auto" />
					</div>
				</Callout>
			</Drawer>
		</React.Fragment>
	);
};

const Info = ({ a, b }) => (
	<div style={{ display: 'flex' }}>
		<H5 style={{ color: Colors.GRAY2, paddingRight: '5px' }}>{a}</H5>
		<H5>{b}</H5>
	</div>
);

type ItemProps = { param: { name: string; val: string }; onClick: any };
const Item: React.FC<ItemProps> = ({ param, onClick }) => {
	const [ ref, isHovered ]: any = useHover();

	return (
		<div
			key={name}
			ref={ref}
			onClick={() => onClick(param)}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				verticalAlign: 'middle',
				alignItems: 'center',
				backgroundColor: `${isHovered ? '#00e3e3' : Colors.LIGHT_GRAY1}`,
				borderBottom: '1px'
			}}
		>
			<H5 style={{ marginLeft: '1rem', marginTop: '5px' }}>{param.name}</H5>
			<H5 style={{ marginRight: '1rem', marginTop: '5px' }}>{param.val}</H5>
		</div>
	);
};
// Hook
function usePrevious(value) {
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const ref = useRef();

	// Store current value in ref
	useEffect(
		() => {
			ref.current = value;
		},
		[ value ]
	); // Only re-run if value changes

	// Return previous value (happens before update in useEffect above)
	return ref.current;
}
export default MonitorList;
