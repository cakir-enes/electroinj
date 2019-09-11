import React, { useState, useEffect } from 'react';
import ParamTree from '../components/antTree';
import { ipcRenderer } from 'electron';
import { RMI } from '../../shared/rpc';
import { useModuleInfo } from '../hooks/useModuleInfo';

const Selection = () => {
	const [ checked, setChecked ] = useState([]);
	const modInfo = useModuleInfo();
	return (
		<ParamTree
			params={{ FTE: modInfo.params.map((v) => v.name) }}
			checked={checked}
			setChecked={(c) => setChecked(c)}
		/>
	);
};

export default Selection;
