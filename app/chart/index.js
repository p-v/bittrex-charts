import electron from 'electron';
import path from 'path';
import url from 'url';
import Index from './index.html';

export default function openChartWindow(market) {
  const { remote } = electron;
  const { BrowserWindow, app } = remote;
  let win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      webSecurity: false
    },
    title: market,
  });

  const indexPath = `${app.getAppPath()}/dist/${Index}`;

  win.loadURL(url.format({
    pathname: indexPath,
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('onMarket', { market });
  })
}
