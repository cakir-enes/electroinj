import React, { useState, useEffect } from 'react';
import ParamTree from '../components/antTree';
import { ipcRenderer } from 'electron';
import { REQ } from '../../shared/rpc';
import { useModuleInfo } from '../hooks/useModuleInfo';

const Selection = () => {
	const [checked, setChecked] = useState([]);
	const modInfo = { FTE: { params: [{ name: "A.B.C.D" }, { name: "A.B.E" }] } }
	return (
		<ParamTree
			params={Object.entries(modInfo).reduce((params, [name, info]) => {
				params[name] = info.params.map(v => v.name)
				return params
			}, {})}
			checked={checked}
			setChecked={(c) => setChecked(c)}
		/>
	);
};

export default Selection;
