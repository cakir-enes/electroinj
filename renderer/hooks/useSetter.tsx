import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

export const useSetter = () => {
	const [status, setStatus] = useState();
	useEffect(() => {
		const handler = (e, arg) => setStatus(arg);
		ipcRenderer.on('MULTI_SET', handler);
		return () => ipcRenderer.removeListener('MULTI_SET', handler);
	});

	return;
};
