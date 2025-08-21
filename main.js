const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const express = require('express');

let win = null;
let server = null;
let lastPayload = null;

const HTTP_PORT = process.env.SECOND_SCREEN_PORT || 37251; // sabit, local

function createWindow() {
  const displays = screen.getAllDisplays();
  const primary = screen.getPrimaryDisplay();
  const secondary = displays.find(d => d.id !== primary.id) || primary; // yedek: primary

  win = new BrowserWindow({
    x: secondary.bounds.x,
    y: secondary.bounds.y,
    width: secondary.size.width,
    height: secondary.size.height,
    frame: false,
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: 'screen-saver',
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  win.on('closed', () => {
    win = null;
  });
}

function createHttpServer() {
  const api = express();
  api.use(express.json({ limit: '1mb' }));
  // CORS: Buluttaki web app'ten 127.0.0.1'e erişim için gerekli
  api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  // Sağlık
  api.get('/health', (_req, res) => {
    res.json({ ok: true, hasWindow: !!win });
  });

  // Güncelleme
  api.post('/update', (req, res) => {
    lastPayload = req.body || {};
    if (win && win.webContents) {
      win.webContents.send('data:update', lastPayload);
    }
    res.json({ ok: true });
  });

  // Temizle
  api.post('/clear', (_req, res) => {
    lastPayload = { isCompleted: true };
    if (win && win.webContents) {
      win.webContents.send('data:clear', lastPayload);
    }
    res.json({ ok: true });
  });

  server = api.listen(HTTP_PORT, '127.0.0.1', () => {
    // eslint-disable-next-line no-console
    console.log(`[SecondScreen] HTTP listening on 127.0.0.1:${HTTP_PORT}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  createHttpServer();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (server) {
    try { server.close(); } catch (_) {}
    server = null;
  }
});


