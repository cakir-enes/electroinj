import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow, exitOnChange } from './helpers';
import { Accessor } from './accessor';
import NatsClient from './natsClient';
import { REQ } from '../shared/rpc';
import { setInterval, clearInterval } from 'timers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
	serve({ directory: 'app' });
} else {
	exitOnChange();
	app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
	// Can't use app.on('ready',...)
	// See https://github.com/sindresorhus/electron-serve/issues/15
	await app.whenReady();

	const mainWindow = createWindow('main', {
		width: 1000,
		height: 600
	});

	const homeUrl: string = isProd ? 'app://./home.html' : 'http://localhost:8888/home';
	mainWindow.loadURL(homeUrl);
	initHandlers()

	if (!isProd) {
		mainWindow.webContents.openDevTools();
	}

})();

const modParams = { FTE: { params: [{ name: "A.B.C", val: '34', type: 'str' }], enums: [{ name: 'abc', vals: ['a', 'v'] }] } }
let params = Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' }))
const initHandlers = () => {
	NatsClient.createNew()
		.then((nc) => {
			ipcMain.on(REQ.AllParamInfo, (event, arg) => {
				console.log('AllParamInfo received');
				event.reply(REQ.AllParamInfo, modParams);
				// nc.allParameterInfo().then((v) => event.reply(RMI.AllParamInfo, v));
			});
			let tok: NodeJS.Timeout | null = null
			ipcMain.on(REQ.SUBSCRIBE_PARAMS, (event, p, freq) => {
				console.log(`SUB PARAMS: ${p}`)
				tok = setInterval(() => {
					let a = params.map(v => ({ ...v, val: Math.random().toFixed(3).toString() }))
					event.reply(REQ.SUBSCRIBE_PARAMS, a)
				}, freq)
			})
			ipcMain.on(REQ.UNSUB_PARAMS, (e, a) => clearInterval(tok))
		})
		.catch((err) => console.error(err));
}

app.on('window-all-closed', () => {
	app.quit();
});
