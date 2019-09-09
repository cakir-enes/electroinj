import '@blueprintjs/core/lib/css/blueprint.css';
import React, { useState, useMemo } from 'react';
import NavBar from '../components/navbar';
import { H1 } from '@blueprintjs/core';

const Page = ({ children }) => {
	return (
		<div>
			<NavBar />
			{children}
		</div>
	);
};

export default Page;
