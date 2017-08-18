import electron from 'electron';
import path from 'path';
import url from 'url';
import Index from './index.html';

export default function openChartWindow(market) {
  const { remote } = electron;
  const { BrowserWindow, app } = remote;
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false
    }
  });

  const indexPath = `${app.getAppPath()}/dist/${Index}`;
  console.log(indexPath);

  win.loadURL(url.format({
    pathname: indexPath,
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('onMarket', { market });
  })
}
