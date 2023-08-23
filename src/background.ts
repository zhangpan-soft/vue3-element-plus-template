'use strict'

import { app, protocol, BrowserWindow, ipcMain, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import * as path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  let win: any = new BrowserWindow({
    width: screen.getPrimaryDisplay().workAreaSize.width, // 默认宽度为屏幕宽度
    height: screen.getPrimaryDisplay().workAreaSize.height, // 默认高度为屏幕高度
    minimizable: true, // 是否可以最小化
    maximizable: true, // 是否可以最大化
    minWidth: process.env.ELECTRON_MIN_WIDTH ? parseInt(process.env.ELECTRON_MIN_WIDTH) : 800, // 最小宽度
    minHeight: process.env.ELECTRON_MIN_HEIGHT ? parseInt(process.env.ELECTRON_MIN_HEIGHT) : 600, // 最小高度
    backgroundColor: '#ffffff', // 窗口背景色
    resizable: true, // 是否可以调整窗口大小
    title: process.env.ELECTRON_TITLE, // 窗口标题
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env
        .ELECTRON_NODE_INTEGRATION_IN_WORKER as unknown as boolean,
      webSecurity: process.env.ELECTRON_WEB_SECURITY as unknown as boolean,
      preload: path.join(__dirname, 'preload.js') // Please refer to the comments on src/preload.ts for specific information
    }
  })

  win.on('closed', () => {
    win = null
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e: any) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
ipcMain.handle('getAppPath', () => {
  return app.getAppPath()
})
