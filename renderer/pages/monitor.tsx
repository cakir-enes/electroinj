import React, { useState, useEffect } from 'react';
import MonitorList from '../components/monitorList';
import { useParameters } from '../hooks/useParameters';
import { ipcRenderer } from 'electron';
import { REQ } from '../../shared/rpc';

const Monitor = () => {
	const params = useParameters({ FTE: ['A.B.C.D'] })
	return <MonitorList params={params} />;
};

export default Monitor;
