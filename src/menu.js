const {shell:{ openExternal }} = require('electron')

const {fileMenu} = require('./file-menu')
const {spellcheckMenu} = require('./spellcheck-menu')

module.exports.menu = [

    {label: 'WriteBar',//app.getName(),
      submenu: [
        {role: 'about'},
        {role: 'quit'},
      ]
    },

    fileMenu,

    {role: 'editMenu'},

    //spellcheckMenu,

    {label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },

    {role: 'help',
      submenu: [
        {label: 'Website',
         click: () => openExternal('https://writebar.js.org')},
        {label: 'GitHub Repo',
         click: () => openExternal('https://github.com/alexander-shvets/writebar/')},
        {label: 'Feature Request (or Issue Report)',
         click: () => openExternal('https://github.com/alexander-shvets/writebar/issues/new')}
      ]
    }
  ]