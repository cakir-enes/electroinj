import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Sidebar } from '../components/sidebar';
import { Overlay } from '@blueprintjs/core';

const Page = ({ children }) => {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '50px 1fr' }}>
			<div style={{ backgroundColor: '#00e1e1' }}>
				<Sidebar />
			</div>
			{children}
		</div>
	);
};

export default Page;
