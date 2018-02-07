const {ipcRenderer: backend} = require('electron')

const touchbarSizeInChars = 104
const caretSymbol = "⎸"

const {log} = console

Quill.register('modules/focus', Focus)

const quill = new Quill('#editor', {
    modules: {
        // toolbar: '#toolbar',
        //markdownShortcuts: {},
        keyboard: {},
        history: {},
        clipboard: {},
        focus: {focusClass: 'focused-blot'},
    },
    theme: 'bubble',
    placeholder: 'Write some text and look at the TouchBar...',
    'image-tooltip': true,
	'link-tooltip': true,
})
quill.focus()
window.onfocus =()=> quill.focus()

quill.on('editor-change', (eventName, ...args) => {

    let range = {length: 1, index:0},
        insert = '',
        old, source

    if (eventName === 'text-change') {
        // args[0] will be delta
        return
        // log(args)
        // // [
        // //     {ops: [{retain: range.index}, {insert}]}, 
        // //     old, source
        // // ] = args
        // range.index = args[0].ops[0].retain
        // insert = args[0].ops[1].insert


    } else if (eventName === 'selection-change') {
        // args[0] will be old range
        [range, old, source] = args
    }

    if( range && 'index' in range ){
        const {index, length} = range
        let start = index, size = length
        if( size === 0 ){
            while( 
                start && quill.getText(--start, 1) !== "\n"
            );;
            if( start > 0 ) start ++
            size = touchbarSizeInChars
        }
        let text = quill.getText(start, size)
        if( length === 0 ){
            const caret = index - start
            text = text.substr(0, caret) + insert + caretSymbol + text.substr(caret)
        }
        backend.send('update-touchbar', {text})
    } else {
        log('Cursor not in the editor')
    }
})