import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow, exitOnChange } from './helpers';

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

	if (!isProd) {
		mainWindow.webContents.openDevTools();
	}

	let arr = Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' }));
	ipcMain.on('update', (event, arg) => {
		event.reply('update', arr.map((i) => ({ ...i, val: Math.random().toFixed(0) })));
	});
})();

app.on('window-all-closed', () => {
	app.quit();
});
