new validateForm({
     'target': document.querySelector('#firstname'),
     'min': 2,
     'max': 10,
     'alphaNumeric': true,
     'alphaNumericWithSpace': true,
      'alphaNumericWithoutSpace': true,
      'alphaNumericDash': true,
      'lowerCase': true,
     'upperCase': true,
     'startsWithUpperCase': true,
     'startsWithLowerCase': true,
     'notStartWithDigit': true,
     'notEndWithSpecialandNum': true,
     'NocontWhiteSpace': true
})

new validateForm({
     'target': document.querySelector('#password1'),
     'min': 5,
     'max': 10,
     'onlyDigits': true,
     'onlyCharL': true,
     'onlyCharU': true,
      'onlyChDtUn': true,
     'onlyDtUcLc': true,
     'onlyDtSp': true,
     'Digitrange': '5-9',
     'charRange': 'a-c',
     'strongPass': true
})

new validateForm({
      'target': document.querySelector('#email1')
})

new validateForm({
     'target': document.querySelector('#checkPh')
})
new validateForm({
     'target': document.querySelector('#checkZip')
})
new validateForm({
     'target': document.querySelector('#date'),
     'format':'dd/mm/yyyy',
     'dateBetween':'1/12/1997-10/12/1997',
      'dateAfter': '12/12/1997',
     'dateBefore': '12/12/1997'
})
new validateForm({
     'target': document.querySelector('#file'),
     'ext': 'txt'
})
new validateForm({
     target: document.querySelector('#card')
})
new validateForm({
     'target': document.querySelector('#time'),
     '24hours': true
 
})
