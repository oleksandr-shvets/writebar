const {app, BrowserWindow, TouchBar, ipcMain: frontend} = require('electron')

const path = require('path')
const url = require('url')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  } else {
    mainWindow.webContents.focus()
  }
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 685,
    height: 600,
    title: 'WriteBar',
    icon: path.join(__dirname, 'assets/logo.ico'),
    //vibrancy: 'appearance-based',
    webPreferences: {
      // devTools: false,
      // nodeIntegrationInWorker: true,
      scrollBounce: true,
      defaultFontFamily: 'sansSerif',
    },
  })
  //let worker = new Worker('script.js')

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'editor.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.setTouchBar( createTouchBar() )

  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createTouchBar(){
  const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

  const label = new TouchBarLabel()

  frontend.on('update-touchbar', (event, {text}) => {
    label.label = text
    //console.log(text)
  })

  return new TouchBar([ label ])
}