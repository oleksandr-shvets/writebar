const {shell:{ openExternal },remote:{ app }} = require('electron')

const {fileMenu} = require('./file')
const {spellcheckMenu} = require('./spellcheck')

module.exports.menu = [

    {label: app.getName(),
      submenu: [
        {role: 'about'},

        {type: 'separator'},
        {role: 'services'},
        {type: 'separator'},

        {role: 'hideothers'},
        {role: 'hide'},
        {role: 'unhide'},

        {type: 'separator'},

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