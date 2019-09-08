import React from 'react';
import { Sidebar } from '../components/sidebar';
import { Overlay } from '@blueprintjs/core';

const Page = ({ children }) => {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '50px 1fr' }}>
			<div style={{ backgroundColor: '#00e1e1', overflow: 'hidden' }}>
				<Sidebar />
			</div>
			{children}
		</div>
	);
};

export default Page;
