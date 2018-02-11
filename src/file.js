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
const {remote} = require('electron')
const { app, getCurrentWindow,
     webContents:{ getFocusedWebContents }, 
     dialog:{ showOpenDialog, showSaveDialog },
} = remote

const { fromDelta } = remote.require('@slite/quill-delta-markdown')
const { toDelta } = remote.require('@slite/quill-delta-markdown')

module.exports.fileMenu = {
    label: 'File',
    submenu: [
        {label: 'New',     accelerator: 'CmdOrCtrl+N', click: newFile},
        {label: 'Open...', accelerator: 'CmdOrCtrl+O', click: openFile},
        // {role: 'recentDocuments'},
        // {role: 'clearRecentDocuments'},
        {type: 'separator'},
        {label: 'Save',       accelerator: 'CmdOrCtrl+S',       click: saveFile},
        {label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S', click: saveFileAs},
        {type: 'separator'},
        {label: 'Revert', click: revertFile},
    ]
}

let loadedFile

const options = {
    // filters: [
    //     { name: 'txt',  extensions: ['txt'] },
    //     { name: 'html', extensions: ['html'] },
    // ]
}
const markdown = /(\/readme|\.(md|markdown))$/i
const html = /\.html?$/i

function newFile(){
    //if( isSaved() ){
        loadedFile = null
        getFocusedWebContents().reload()
    //}
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
    //if( isSaved() ) 
    showOpenDialog(options, ([filename] = []) => {
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
    let raw
    if( filename.match(markdown) ){
        raw = fromDelta( window.quill.getContents() )
    } else if( filename.match(html) ) {
        raw = window.quill.container.firstChild.innerHTML
    } else {
        raw = window.quill.getText()
    }
    fs.writeFile(filename, raw, () =>
        window.documentNotSaved = false)
}

function readFromFS( filename ) {
    fs.readFile(filename, "utf-8", (err, data) => {
        if( err ){
            console.log(err)
        } else {
            if( filename.match(markdown) ){
                window.quill.setContents( toDelta(data) )
            } else if( filename.match(html) ) {
                //window.quill.setText(data)
                window.quill.container.firstChild.innerHTML = data
            } else {
                window.quill.setText( data )
            }

            if( loadedFile != filename ){
                loadedFile = filename
                window.documentNotSaved = false
                app.addRecentDocument( loadedFile )
                getCurrentWindow().setRepresentedFilename( loadedFile )
            }
        }
    })
}

function isSaved(){
    return documentNotSaved && confirm("Document isn't saved. Do you want discard changes?")
}