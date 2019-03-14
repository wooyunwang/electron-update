const electron = require('electron')
const PDFWindow = require('electron-pdf-window')
const { app, BrowserWindow, webContents } = electron
let mainWindow
const fileExtend = ['.pdf', '.html', '.txt', '.md', '/#/']
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
  mainWindow.loadURL('http://10.31.20.57:8080')
  // 设置ua
  mainWindow.webContents.setUserAgent(mainWindow.webContents.getUserAgent() + ' kye-erp')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  // 打开新窗口
  mainWindow.webContents.on('new-window', (event, url) => {
    openNewWindow(event, url, mainWindow.webContents)
  })
}

function openNewWindow (event, url, parent) {
  // if (url.includes('/#/')) return
  event.preventDefault()
  const isOpen = fileExtend.some(v => url.includes(v))
  if (isOpen) {
    const nwin = new PDFWindow({ 
      odeIntegration: true, 
      nativeWindowOpen: true, 
      swebPreferences: { plugins: true }
    })
    nwin.webContents.setUserAgent(nwin.webContents.getUserAgent() + ' kye-erp')
    nwin.loadURL(url)
    event.newGuest = nwin
  } else {
    parent.webContents.downloadURL(url)
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  let allCons = webContents.getAllWebContents() || []
  allCons.forEach(c => {
    c.send('allclosed')
  })
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
