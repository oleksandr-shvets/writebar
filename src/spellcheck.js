const checked = true

module.exports.spellcheckMenu = {

    label: 'Spellcheck',
    submenu: [

      {label: 'Spelling Errors:', type: 'checkbox', checked},
      {type: 'separator'},

      {label: 'Spelling checker', id:'retext-spell', type:'checkbox', checked},
      {label: 'Check for passive voice', id:'', type:'checkbox', checked},
      {label: 'Check indefinite articles (a, an)', id:'', type:'checkbox', checked},
      {label: 'Check for for repeated words', id:'', type:'checkbox', checked},

      {type: 'separator'},
      {label: 'Typographical Corrections:', type:'checkbox', checked},
      {type: 'separator'},

      {label: 'Check quote and apostrophe usage', id:'', type:'checkbox', checked},
      {label: 'Check apostrophe use in contractions', id:'', type:'checkbox', checked},
      {label: 'Check for proper use of diacritics', id:'', type:'checkbox', checked},
      {label: 'Check spacing between sentences', id:'', type:'checkbox', checked},

      {type: 'separator'},
      {label: 'Smart Suggestions:', type:'checkbox', checked},
      {type: 'separator'},

      {label: 'Check Readability', id:'', type:'checkbox', checked},
      {label: 'Check phrases for simpler alternatives', id:'', type:'checkbox', checked},
      {label: 'Check phrases for cliches', id:'', type:'checkbox', checked},
    //   {label: 'Detect sentiment in text', id:'retext-sentiment', type:'checkbox', checked},
      {label: 'Check for insensitive, inconsiderate language', id:'', type:'checkbox', checked},
      {label: 'Check profane and vulgar wording', id:'', type:'checkbox', checked},
      {label: 'Check incorrect English usage', id:'', type:'checkbox', checked},
      {label: 'Check redundant acronyms', id:'', type:'checkbox', checked},  

      {type: 'separator'},
      {label: 'Turn Off All'},
    ]
  }