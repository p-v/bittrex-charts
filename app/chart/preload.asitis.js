const { ipcRenderer } = require('electron');

window.addEventListener('click', () => {
  ipcRenderer.sendToHost(JSON.stringify({ clicked: true }));
});

ipcRenderer.on('toggle_navigation', () => {
  const navigationBar = document.querySelector('.stx-nav');
  if (!navigationBar.style.display) {
    navigationBar.style.display = 'none';
  } else {
    navigationBar.style.display = '';
  }
});

ipcRenderer.on('toggle_toolbar', () => {
  const toolbar = document.querySelector('#stx-toolbar');
  if (!toolbar.style.display) {
    toolbar.style.display = 'none';
  } else {
    toolbar.style.display = '';
  }
});
