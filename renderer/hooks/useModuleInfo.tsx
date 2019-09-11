import { useState, useEffect } from 'react';
import { ModInfo } from '../../shared/types';
import { ipcRenderer, IpcRenderer } from 'electron';
import { RMI } from '../../shared/rpc';

export const useModuleInfo: () => ModInfo = () => {
	const [ modInfo, setModInfo ] = useState<ModInfo>();

	useEffect(() => {
		const handler = (e, arg) => {
			setModInfo(arg);
			console.log(`ARG: ${arg}`);
		};
		ipcRenderer.on(RMI.AllParamInfo, handler);
		console.log('Sending rmi');
		ipcRenderer.send(RMI.AllParamInfo, '');
		// setTimeout(
		// 	() =>
		// 		setModInfo({
		// 			enums: [ { name: 'a', vals: [ 'a' ] } ],
		// 			params: [ { name: 'a', val: 'a', type: 'str' } ]
		// 		}),
		// 	1000
		// );
		return () => ipcRenderer.removeListener(RMI.AllParamInfo, handler);
	}, []);
	return modInfo;
};
