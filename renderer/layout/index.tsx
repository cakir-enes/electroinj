import '@blueprintjs/core/lib/css/blueprint.css';
import React from 'react';
import NavBar from '../components/navbar';

const Page = ({ children }) => (
	<div>
		<NavBar />
		{children}
	</div>
);

export default Page;
