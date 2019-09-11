import React, { useState, useEffect } from 'react';
import Page from '../layout';
import ParamTree from '../components/antTree';
import { ipcRenderer } from 'electron';
import { RMI } from '../../shared/rpc';

const pp = { FTE: ['A.B.C.D', 'A.B.C', 'A.B.C.E', 'E.F.C', 'E.F.C.D.E'] };
const Selection = () => {
	const [checked, setChecked] = useState([]);
	useEffect(() => {
		ipcRenderer.on(RMI.AllParamInfo, (event, arg) => {
			console.log(arg)
		});
		ipcRenderer.send(RMI.AllParamInfo, '')
	}, []);
	return (
		<Page>
			<ParamTree params={pp} checked={checked} setChecked={(c) => setChecked(c)} />
		</Page>
	);
};

export default Selection;
