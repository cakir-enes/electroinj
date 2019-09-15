import React from 'react';
import { Drawer, H1 } from '@blueprintjs/core';

type Props = { param: { name: string; val: string }; isOpen: boolean };

export const InjDrawer: React.FC<Props> = ({ param, isOpen }) => {
	return (
		<Drawer isOpen={isOpen} position="bottom" size={Drawer.SIZE_SMALL} hasBackdrop={false}>
			<H1>{param.name}</H1>
		</Drawer>
	);
};
