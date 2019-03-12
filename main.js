const electron = require('electron')
const { app, BrowserWindow } = electron
let mainWindow
require('update-electron-app')()
function createWindow () {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: false
    }
  })
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://www.kye-erp.com')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
