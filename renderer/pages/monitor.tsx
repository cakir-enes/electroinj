import React, { useState, useEffect } from 'react';
import Page from '../layout';
import MonitorList from '../components/monitorList';
import { Parameter } from '../../shared/types';
import { useModuleInfo } from '../hooks/useModuleInfo';
import { ipcRenderer, ipcMain } from 'electron';
import { RMI } from '../../shared/rpc';

const Monitor = () => {
	const [ params, setParams ] = useState(
		Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' } as Parameter))
	);
	const modInfo = useModuleInfo();
	useEffect(
		() => {
			// ipcRenderer.send(RMI.AllParamInfo, '');
			// ipcRenderer.on('dene', (e, a) => console.log(a));
			// ipcRenderer.send('dene');
			console.log(`MODINFO: ${JSON.stringify(Object.keys(modInfo || {}))}`);
		},
		[ modInfo ]
	);
	return <MonitorList params={params} />;
};

export default Monitor;
