import React, { useState } from 'react';
import { Menu, Classes, MenuItem, Icon, Card, Button, Colors, ButtonGroup } from '@blueprintjs/core';
import { IconNames, IconName } from '@blueprintjs/icons';
import Link from 'next/link';

export const Sidebar = () => {
	return (
		<div
			style={{
				height: '100%',
				justifyContent: 'center',
				backgroundColor: `${Colors.LIGHT_GRAY1}`
			}}
		>
			<Item page="/home" icon={IconNames.ADD} />
			<Item page="/select" icon={IconNames.TREE} />
			<Item page="/monitor" icon={IconNames.DELTA} />
		</div>
	);
};

const Item = ({ page, icon }) => (
	<Link href={page}>
		<Button large fill>
			<Icon icon={icon} iconSize={28} />
		</Button>
	</Link>
);
