const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 900,
    minHeight: 600,
    title: 'Windows 11 Media Player (Beta)',
    backgroundColor: '#111111',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  window.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.handle('media:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Select media file',
    properties: ['openFile'],
    filters: [
      {
        name: 'Media',
        extensions: [
          'mp3',
          'wav',
          'aac',
          'm4a',
          'flac',
          'ogg',
          'mp4',
          'm4v',
          'mov',
          'avi',
          'mkv',
          'webm'
        ]
      },
      { name: 'All files', extensions: ['*'] }
    ]
  });

  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }

  return {
    canceled: false,
    path: filePaths[0]
  };
});

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
