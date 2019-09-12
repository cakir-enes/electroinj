import { useState, useEffect } from 'react';
import { ModsInfo } from '../../shared/types';
import { ipcRenderer, IpcRenderer } from 'electron';
import { REQ } from '../../shared/rpc';

export const useModuleInfo: () => ModsInfo = () => {
	const [modInfo, setModInfo] = useState<ModsInfo>({ FTE: { params: [], enums: [] } });

	useEffect(() => {
		const handler = (e, arg) => {
			setModInfo(arg);
			console.log(`ARG: ${JSON.stringify(arg)}`);
		};
		ipcRenderer.on(REQ.AllParamInfo, handler);
		console.log('Sending rmi');
		ipcRenderer.send(REQ.AllParamInfo, '');
		// setTimeout(
		// 	() =>
		// 		setModInfo({
		// 			enums: [ { name: 'a', vals: [ 'a' ] } ],
		// 			params: [ { name: 'a', val: 'a', type: 'str' } ]
		// 		}),
		// 	1000
		// );
		return () => ipcRenderer.removeListener(REQ.AllParamInfo, handler);
	}, []);
	return modInfo
};
