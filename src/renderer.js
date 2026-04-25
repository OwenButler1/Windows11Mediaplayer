const openMediaBtn = document.getElementById('openMediaBtn');
const loadStatus = document.getElementById('loadStatus');
const playerContainer = document.getElementById('playerContainer');
const player = document.getElementById('player');

function toFileURL(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return encodeURI(`file:///${normalized}`);
}

openMediaBtn.addEventListener('click', async () => {
  loadStatus.textContent = 'Opening file picker...';

  const result = await window.mediaAPI.openFile();
  if (!result || result.canceled) {
    loadStatus.textContent = 'No file selected.';
    return;
  }

  player.src = toFileURL(result.path);
  playerContainer.hidden = false;
  loadStatus.textContent = `Loaded: ${result.path}`;
});
