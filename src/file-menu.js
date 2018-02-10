// const {
//     app, 
//     dialog: {showOpenDialog, showSaveDialog},
//     webContents: {getFocusedWebContents},
// } = require('electron')
// const {
//     app, 
//     dialog: {showOpenDialog, showSaveDialog},
//     webContents: {getFocusedWebContents},
// } = require('electron')
const fs = require('fs')
const { app, getCurrentWindow,
    webContents: {getFocusedWebContents}, 
    dialog: {showOpenDialog, showSaveDialog},
} = require('electron').remote

module.exports.fileMenu = {
    label: 'File',
    submenu: [
        {label: 'New',     accelerator: 'CmdOrCtrl+N', click: newFile},
        {label: 'Open...', accelerator: 'CmdOrCtrl+O', click: openFile},
        {role: 'recentDocuments'},
        {role: 'clearRecentDocuments'},
        {type: 'separator'},
        {label: 'Save',       accelerator: 'CmdOrCtrl+S',       click: saveFile},
        {label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S', click: saveFileAs},
        {type: 'separator'},
        {label: 'Revert', click: revertFile},
    ]
}

let loadedFile

const options = {
    filters: [
        { name: 'txt',  extensions: ['txt'] },
        { name: 'html', extensions: ['html'] },
    ]
}

function newFile(){
    if( isSaved() ){
        loadedFile = null
        getFocusedWebContents().reload()
    }
}

function saveFileAs() {
    showSaveDialog(options, filename => 
        filename && writeToFS( filename )
    )
}

function saveFile() {
    if( loadedFile ){
        writeToFS( loadedFile )
    } else {
        saveFileAs()
    }
}

function openFile(menu, focusedWindow) {
    if( isSaved() ) showOpenDialog(options, ([filename] = []) => {
        if( filename ){
            readFromFS( filename )
        }
    })
}

function revertFile(menu, focusedWindow){
    if( isSaved() ){
        if( loadedFile ){
            readFromFS( loadedFile )
        } else {
            newFile()
        }
    }
}

function writeToFS( filename ) {
    var html = window.quill.container.firstChild.innerHTML
    fs.writeFile(filename, html, console.log)
}

function readFromFS( filename ) {
    fs.readFile(filename, "utf-8", (err, data) => {
        if( err ){
            console.log(err)
        } else {
            //window.quill.setText(data)
            window.quill.container.firstChild.innerHTML = data
            if( loadedFile != filename ){
                loadedFile = filename
                app.addRecentDocument( loadedFile )
                getCurrentWindow().setRepresentedFilename( loadedFile )
            }
        }
    })
}

function isSaved(){
    //const win = getCurrentWindow()
    return !!//win && win.getDocumentEdited() &&
        confirm("Document isn't saved. Do you want discard changes?")
}