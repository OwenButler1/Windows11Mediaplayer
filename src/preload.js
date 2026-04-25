const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mediaAPI', {
  openFile: () => ipcRenderer.invoke('media:openFile')
});
