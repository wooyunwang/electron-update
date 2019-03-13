const electron = require('electron')
const PDFWindow = require('electron-pdf-window')
const { app, BrowserWindow } = electron
let mainWindow
function createWindow () {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    }
  })
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:8080')
  // 设置ua
  mainWindow.webContents.setUserAgent(mainWindow.webContents.getUserAgent() + ' kye-erp')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  const fileExtend = ['.pdf', '.html', '.txt', '.md']
  // 打开新窗口
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    const isOpen = fileExtend.some(v => url.includes(v))
    if (isOpen) {
      const nwin = new PDFWindow({ nativeWindowOpen: true, swebPreferences: { plugins: true }})
      // win.once('ready-to-show', () => win.show())
      nwin.loadURL(url)
      event.newGuest = nwin
    } else {
      mainWindow.webContents.downloadURL(url)
    }
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
