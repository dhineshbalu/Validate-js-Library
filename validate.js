  (function () {
    // heart of the application it is started from here
    this.validateForm = function () {
      validateButton()
      if (arguments[0] && typeof arguments[0] === 'object') {
        var processName = arguments[0]
        var stages = $(processName.target).attr('class')
        switch (stages) {
          case 'validate validateFormName':
            validateFormName(processName)
            break;
          case 'validate validateFormPassword':
            validateFormPassword(processName)
            break;
          case 'validate validateFormEmail':
            validateFormEmail(processName)
            break
          case 'validate validateFormDate':
            validateFormDate(processName)
            break
          case 'validate validateFormFile':
            validateFormFile(processName)
            break
          case 'validate validateFormCreditCard':
            validateFormCreditCard(processName)
            break
          case 'validate validateFormTime':
            validateFormTime(processName)
            break
          case 'validateInput':
            var id = $(processName.target).attr('id')
            if (id.toLowerCase().includes('zip')) {
              validateFormZipCode(processName)
            } else if (id.toLowerCase().includes('ph')) {
              validateFormNumber(processName)
            }
            break
        }
      }
    }

    function CheckDateAfter(given, entered) {
      for (var i = 0; i <= 2; i++) {
        given[i] = parseInt(given[i])
        entered[i] = parseInt(entered[i])
      }
      // same year
      if (given[2] == entered[2]) {
        //same month
        if (given[1] == entered[1]) {
          //check day > 
          if (entered[0] > given[0]) {
            return true
          } else {
            return false
          }
        } //month >
        else if (entered[1] > given[1]) {
          return true
        } //month <
        else {
          return false
        }
      } //year >
      else if (entered[2] > given[2]) {
        return true
      } //year <
      else {
        return false
      }
    }

    function checkDateBefore(given, entered) {
      for (var i = 0; i <= 2; i++) {
        given[i] = parseInt(given[i])
        entered[i] = parseInt(entered[i])
      }
      // same year
      if (given[2] == entered[2]) {
        //same month
        if (given[1] == entered[1]) {
          //check day < 
          if (entered[0] < given[0]) {
            return true
          } else {
            return false
          }
        } //month <
        else if (entered[1] < given[1]) {
          return true
        } //month >
        else {
          return false
        }
      } //year <
      else if (entered[2] < given[2]) {
        return true
      } //year >
      else {
        return false
      }
    }

    function checkValidDate(val) {
      var check = true
      for (var i = 0; i < val.length; i++) {
        if ((val[i] >= '0' && val[i] <= '9') || (val[i] == '_' || val[i] == '/'))
          continue
        else {
          check = false
          break
        }
      }
      return check
    }

    function checkDate(min, max, given) {
      for (var i = 0; i <= 2; i++) {
        min[i] = parseInt(min[i])
        max[i] = parseInt(max[i])
        given[i] = parseInt(given[i])
      }
      // same year
      if ((given[2] == min[2]) || (given[2] == max[2])) {
        // same month
        if (given[1] == min[1] && given[1] == max[1]) {
          //day with in range
          if (given[0] >= min[0] && given[0] <= max[0]) {
            return true
          } //day out of range
          else {
            // not correct
            return false
          }
        } // month > and < than
        else if ((given[1] > min[1] && given[1] < max[1]) || (min[1] == given[1] && given[1] <= max[1] && given[0] > min[0]) || (max[1] == given[1] && given[1] >= min[1] && given[0] <= max[0])) {
          //with in range
          return true
        } // month out of range
        else {
          // not correct
          return false
        }
      } // year > than and < than
      else if (given[2] > min[2] && given[2] < max[2]) {
        //with in range
        return true
      } // year out of range
      else {
        // not correct
        return false
      }
    }

    function countName() {
      if (typeof countName.counter == 'undefined') {
        countName.counter = 0;
      }
      countName.counter++;
      return countName.counter
    }

    function countPassword() {
      if (typeof countPassword.counter == 'undefined') {
        countPassword.counter = 0;
      }
      countPassword.counter++;
      return countPassword.counter
    }

    function countEmail() {
      if (typeof countEmail.counter == 'undefined') {
        countEmail.counter = 0;
      }
      countEmail.counter++;
      return countEmail.counter
    }

    function countDate() {
      if (typeof countDate.counter == 'undefined') {
        countDate.counter = 0;
      }
      countDate.counter++;
      return countDate.counter
    }

    function creditCardAlg(card) {
      var count = 0,
        sum1 = 0,
        sum2 = 0
      for (var i = 0; i < card.length; i++) {
        if (i % 2 == 0) {
          sum1 += parseInt(card[i])
          if (parseInt(card[i]) > 4)
            count++
        } else {
          sum2 += parseInt(card[i])
        }
      }
      if ((count + (sum1 * 2) + sum2) % 10 == 0)
        return true
      else
        return false
    }

    function validateButton() {
      var count = 0
      $('.validateInput').find('.validate').each(function () {
        if ($(this).attr('class') == 'validate validateFormName invalid' || $(this).attr('class') == 'validate validateFormPassword invalid' || $(this).attr('class') == 'validate validateFormEmail invalid' || $(this).attr('class') == 'validate validateFormNumber invalid' || $(this).attr('class') == 'validate validateFormZipCode invalid' || $(this).attr('class') == 'validate validateFormDate invalid' || $(this).attr('class') == 'validate validateFormFile invalid' || $(this).attr('class') == 'validate validateFormCreditCard invalid' || $(this).attr('class') == 'validate validateFormTime invalid') {
          count++
          $('.validateSubmit').prop('disabled', true);
        } else if (count == 0 && ($(this).attr('class') == 'validate validateFormName valid' || $(this).attr('class') == 'validate validateFormPassword valid' || $(this).attr('class') == 'validate validateFormEmail valid' || $(this).attr('class') == 'validate validateFormNumber valid' || $(this).attr('class') == 'validate validateFormZipCode valid' || $(this).attr('class') == 'validate validateFormDate valid' || $(this).attr('class') == 'validate validateFormFile valid' || $(this).attr('class') == 'validate validateFormCreditCard valid' || $(this).attr('class') == 'validate validateFormTime valid')) {
          $('.validateSubmit').prop('disabled', false);
        } else {
          count++
          $('.validateSubmit').prop('disabled', true);
        }
      })
    }
    //go to the name , append new dom and whenever touch it shows the text , and validation is also done according to the input
    function validateFormName(options) {
      var value = $(options.target).val()
      var idName = $(options.target).attr('id')
      this.newElement = document.createElement("div")
      this.newElement.id = idName + countName()
      $('#' + idName).after(this.newElement)
      idName = this.newElement.id
      var numberOfStars = Object.keys(options)
      for (var i = 1; i < numberOfStars.length; i++) {
        this.dot = document.createElement('div')
        this.dot.className = "rating-star empty-star"
        this.dot.id = idName + "_" + numberOfStars[i]
        $('#' + idName).append(this.dot)
      }
      var selectedClass;
      $('#' + idName).children().each(function () {
        $(this).hover(function () {
          selectedClass = $(this).attr('class')
          $(this).removeClass(selectedClass)
          $(this).addClass('rating-star select-star')
          var idNames = $(this).attr('id')
          var idName = idNames.split('_')[1]
          if (selectedClass == 'rating-star empty-star')
            $(this).html("<br><div class='displayBox'>" + displayErrorForName(idName, options) + "</div>")
          else
            $(this).html("<br><div class='displayBox'>" + displayNoErrorForName(idName, options) + "</div>")
          $(this).css('cursor', 'pointer')
        }, function () {
          $(this).attr('class', selectedClass)
          $(this).html("")
        });
      });

      $('#' + $(options.target).attr('id')).on('input', function () {
        var valid = true
        var value = $(this).val()
        $('#' + idName).children().each(function () {
          var childIds = $(this).attr("id")
          checkWithConditionForName(childIds, options, value)
        })
        var wrongCount = 0
        $('#' + idName).children().each(function () {
          if ($(this).attr('class') != 'rating-star full-star') {
            wrongCount++
          }
        })
        if (wrongCount == 0) {
          $(this).removeClass('invalid')
          $(this).addClass('valid')
        } else {
          $(this).removeClass('valid')
          $(this).addClass('invalid')
        }
        validateButton()
      })
      //$('.validateSubmit').prop('disabled', true);
    }
    // logic for the input validation for the name
    function checkWithConditionForName(id, options, val) {
      var key = id.split('_')[1]
      switch (key) {
        case 'max':
          if (val.length != 0 && val.length <= options['max']) {

            $('#' + id).attr('class', 'rating-star full-star')
          } else if (val.length != 0 && val.length > options['max'])
            $('#' + id).attr('class', 'rating-star empty-star')
          else if (val.length == 0)
            $('#' + id).attr('class', 'rating-star empty-star')
          break;
        case 'min':
          if (val.length != 0 && val.length < options['min'])
            $('#' + id).attr('class', 'rating-star empty-star')
          else if (val.length != 0 && val.length >= options['min'])
            $('#' + id).attr('class', 'rating-star full-star')
          else if (val.length == 0)
            $('#' + id).attr('class', 'rating-star empty-star')
          break;
        case 'alphaNumeric':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['alphaNumeric']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= '0' && val[i] <= '9') || ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A') && val[i] <= 'Z')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break;
        case 'alphaNumericWithSpace':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['alphaNumericWithSpace']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= '0' && val[i] <= '9') || (val[i] == ' ') || ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A') && val[i] <= 'Z')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check && val.split(' ').length > 1)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'alphaNumericWithoutSpace':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['alphaNumericWithoutSpace']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= '0' && val[i] <= '9') || ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A') && val[i] <= 'Z')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'alphaNumericDash':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['alphaNumericDash']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= '0' && val[i] <= '9') | (val[i] == '_') || ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A') && val[i] <= 'Z')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check && val.split('_').length > 1)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'upperCase':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['upperCase']) {
            var i;
            for (i = 0; i < val.length; i++) {
              if (val[i] >= '0' && val[i] <= '9')
                break;
            }
            if (val.toUpperCase() == val && (i == val.length && val.length != 1)) {
              $('#' + id).attr('class', 'rating-star full-star')
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'lowerCase':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['lowerCase']) {
            var i;
            for (i = 0; i < val.length; i++) {
              if (val[i] >= '0' && val[i] <= '9')
                break;
            }

            if (val.toLowerCase() == val && (i == val.length && val.length != 1)) {
              $('#' + id).attr('class', 'rating-star full-star')
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'startsWithUpperCase':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['startsWithUpperCase']) {
            var check = true
            var upperCaseStrings = val.split(' ')
            for (var i = 0; i < upperCaseStrings.length; i++) {
              if (upperCaseStrings[i] != "") {
                if (upperCaseStrings[i].charAt(0) >= 'A' && upperCaseStrings[i].charAt(0) <= 'Z')
                  continue
                else {
                  check = false
                  break
                }
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'startsWithLowerCase':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['startsWithLowerCase']) {
            var check = true
            var lowerCaseStrings = val.split(' ')
            for (var i = 0; i < lowerCaseStrings.length; i++) {
              if (lowerCaseStrings[i] != "") {
                if (lowerCaseStrings[i].charAt(0) >= 'a' && lowerCaseStrings[i].charAt(0) <= 'z')
                  continue
                else {
                  check = false
                  break
                }
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'notStartWithDigit':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['startsWithLowerCase']) {
            var check = true
            var startWithDigitStrings = val.split(' ')
            for (var i = 0; i < startWithDigitStrings.length; i++) {
              if (startWithDigitStrings[i] != "") {
                if (startWithDigitStrings[i].charAt(0) >= '0' && startWithDigitStrings[i].charAt(0) <= '9') {
                  check = false
                  break
                } else {
                  continue
                }
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'notEndWithSpecialandNum':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['notEndWithSpecialandNum']) {
            var check = true
            var endWithCharacter = val.split(' ')
            for (var i = 0; i < endWithCharacter.length; i++) {
              if (endWithCharacter[i] != "") {
                if ((endWithCharacter[i].charAt(endWithCharacter[i].length - 1) >= 'a' && endWithCharacter[i].charAt(endWithCharacter[i].length - 1) <= 'z') || (endWithCharacter[i].charAt(endWithCharacter[i].length - 1) >= 'A' && endWithCharacter[i].charAt(endWithCharacter[i].length - 1) <= 'Z')) {
                  continue
                } else {
                  check = false
                  break
                }
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'NocontWhiteSpace':
          if (val.length == 0)
            $('#' + id).attr('class', 'rating-star empty-star')
          else if (options['NocontWhiteSpace']) {
            var check = true
            var NocontWhiteSpaceStrings = val.split('  ')
            if (NocontWhiteSpaceStrings.length > 1)
              check = true
            else
              check = false
            if (!check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
      }
    }
    // display when red color dot for name
    function displayErrorForName(val, options) {
      var name
      switch (val) {
        case 'min':
          name = "please enter the required minlength"
          break;
        case 'max':
          name = "please enter the required maxlength"
          break;
        case 'alphaNumeric':
          if (options['alphaNumeric'])
            name = "please Enter alphanumeric characters only"
          break
        case 'alphaNumericWithSpace':
          if (options['alphaNumericWithSpace'])
            name = "Please Enter alphanumeric with space"
          break
        case 'alphaNumericWithoutSpace':
          if (options['alphaNumericWithoutSpace'])
            name = "Please Enter alphanumeric without space"
          break
        case 'alphaNumericDash':
          if (options['alphaNumericDash'])
            name = "Please Enter alphanumeric with underscore"
          break
        case 'upperCase':
          if (options['upperCase'])
            name = "Please Enter in uppercase"
          break
        case 'lowerCase':
          if (options['lowerCase'])
            name = "Please Enter in lowercase"
          break
        case 'startsWithUpperCase':
          if (options['startsWithUpperCase'])
            name = "Please Enter first char in UpperCase"
          break
        case 'startsWithLowerCase':
          if (options['startsWithLowerCase'])
            name = "Please Enter first char in lowerCase"
          break
        case 'notStartWithDigit':
          if (options['notStartWithDigit'])
            name = "Please not Enter digits as first"
          break
        case 'notEndWithSpecialandNum':
          if (options['notEndWithSpecialandNum'])
            name = "Please not Enter last digit with special Characters"
          break
        case 'NocontWhiteSpace':
          if (options['NocontWhiteSpace'])
            name = "Please Not Enter conti.. whiteSpace"
          break
      }
      return name
    }
    // display when green color dot for name
    function displayNoErrorForName(val, options) {
      var name
      switch (val) {
        case 'min':
          name = "MinLength is entered correctly"
          break;
        case 'max':
          name = "MaxLength is entered correctly"
          break;
        case 'alphaNumeric':
          if (options['alphaNumeric'])
            name = "Entered alphanumeric characters only"
          break
        case 'alphaNumericWithSpace':
          if (options['alphaNumericWithSpace'])
            name = "Entered alphanumeric with space"
          break
        case 'alphaNumericWithoutSpace':
          if (options['alphaNumericWithoutSpace'])
            name = "Entered alphanumeric without space"
          break
        case 'alphaNumericDash':
          if (options['alphaNumericDash'])
            name = "Entered alphanumeric with underscore"
          break
        case 'upperCase':
          if (options['upperCase'])
            name = "Entered in uppercase only"
          break
        case 'lowerCase':
          if (options['lowerCase'])
            name = "Entered in lowercase only"
          break
        case 'startsWithUpperCase':
          if (options['startsWithUpperCase'])
            name = "Entered first char in UpperCase"
          break
        case 'startsWithLowerCase':
          if (options['startsWithLowerCase'])
            name = "Entered first char in lowerCase"
          break
        case 'notStartWithDigit':
          if (options['notStartWithDigit'])
            name = "Not Entered digits as first"
          break
        case 'notEndWithSpecialandNum':
          if (options['notEndWithSpecialandNum'])
            name = "Entered last digit with special Characters"
          break
        case 'NocontWhiteSpace':
          if (options['NocontWhiteSpace'])
            name = "Not Entered with  conti.. whiteSpace"
          break
      }
      return name
    }

    //creating new DOM element for password and implementing the hover part
    function validateFormPassword(options) {
      var value = $(options.target).val()
      var idName = $(options.target).attr('id')
      this.newElement = document.createElement("div")
      this.newElement.id = idName + countPassword()
      $('#' + idName).after(this.newElement)
      idName = this.newElement.id
      var numberOfStars = Object.keys(options)
      for (var i = 1; i < numberOfStars.length; i++) {
        this.dot = document.createElement('div')
        this.dot.className = "rating-star empty-star"
        this.dot.id = idName + "_" + numberOfStars[i]
        $('#' + idName).append(this.dot)
      }
      var selectedClass;
      $('#' + idName).children().each(function () {
        $(this).hover(function () {
          selectedClass = $(this).attr('class')
          $(this).removeClass(selectedClass)
          $(this).addClass('rating-star select-star')
          var idNames = $(this).attr('id')
          var idName = idNames.split('_')[1]
          if (selectedClass == 'rating-star empty-star')
            $(this).html("<br><div class='displayBox'>" + displayErrorForPass(idName, options) + "</div>")
          else
            $(this).html("<br><div class='displayBox'>" + displayNoErrorForPass(idName, options) + "</div>")
          $(this).css('cursor', 'pointer')
        }, function () {
          $(this).attr('class', selectedClass)
          $(this).html("")
        });
      });

      $('#' + $(options.target).attr('id')).on('input', function () {
        var value = $(this).val()
        $('#' + idName).children().each(function () {
          var childIds = $(this).attr("id")
          checkWithConditionForPass(childIds, options, value)
        })
        var wrongCount = 0
        $('#' + idName).children().each(function () {
          if ($(this).attr('class') != 'rating-star full-star') {
            wrongCount++
          }
        })
        if (wrongCount == 0) {
          $(this).removeClass('invalid')
          $(this).addClass('valid')
        } else {
          $(this).removeClass('valid')
          $(this).addClass('invalid')
        }
        validateButton()
      })
    }
    // function for handling logic part for password
    function checkWithConditionForPass(id, options, val) {
      var key = id.split('_')[1]
      switch (key) {
        case 'max':
          if (val.length != 0 && val.length <= options['max']) {

            $('#' + id).attr('class', 'rating-star full-star')
          } else if (val.length != 0 && val.length > options['max'])
            $('#' + id).attr('class', 'rating-star empty-star')
          else if (val.length == 0)
            $('#' + id).attr('class', 'rating-star empty-star')
          break;
        case 'min':
          if (val.length != 0 && val.length < options['min'])
            $('#' + id).attr('class', 'rating-star empty-star')
          else if (val.length != 0 && val.length >= options['min'])
            $('#' + id).attr('class', 'rating-star full-star')
          else if (val.length == 0)
            $('#' + id).attr('class', 'rating-star empty-star')
          break;
        case 'onlyDigits':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['onlyDigits']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if (val[i] >= '0' && val[i] <= '9') {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'onlyCharL':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['onlyCharL']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if (val[i] >= 'a' && val[i] <= 'z') {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'onlyCharU':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['onlyCharU']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if (val[i] >= 'A' && val[i] <= 'Z') {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'onlyChDtUn':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['onlyChDtUn']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A' && val[i] <= 'Z') || (val[i] >= '0' && val[i] <= '9') || (val[i] == '_')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'onlyDtUcLc':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['onlyDtUcLc']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A' && val[i] <= 'Z') || (val[i] >= '0' && val[i] <= '9')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'onlyDtSp':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['onlyDtSp']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A' && val[i] <= 'Z')) {
                check = false
                break
              } else {
                continue
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'Digitrange':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['Digitrange']) {
            var ranges = options['Digitrange'].split('-')
            var check = true
            for (var i = 0; i < val.length; i++) {
              if (val[i] >= ranges[0].charAt(0) && val[i] <= ranges[1].charAt(0)) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'charRange':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['charRange']) {
            var ranges = options['charRange'].split('-')
            var check = true
            for (var i = 0; i < val.length; i++) {
              if (val[i] >= ranges[0].charAt(0) && val[i] <= ranges[1].charAt(0)) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'strongPass':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['strongPass']) {
            var checkU = 0,
              checkL = 0,
              checkD = 0,
              checkS = 0,
              check = true
            for (var i = 0; i < val.length; i++) {
              if (val[i] >= 'a' && val[i] <= 'z')
                checkL++
              else if (val[i] >= 'A' && val[i] <= 'Z')
                checkU++
              else if (val[i] >= '0' && val[i] <= '9')
                checkD++
              else
                checkS++
            }
            if (val.length >= 8 && checkS >= 1 && checkU >= 1 && checkD >= 1 && checkL >= 1) {
              check = true
            } else {
              check = false
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
      }
    }

    //function for diplaying error when hover
    function displayErrorForPass(val, options) {
      var name
      switch (val) {
        case 'min':
          name = "MinLength is entered correctly"
          break
        case 'max':
          name = "please enter the required maxlength"
          break
        case 'onlyDigits':
          name = "Please Enter only Digits"
          break
        case 'onlyCharL':
          if (options['onlyCharL'])
            name = "Please Enter only lowercase character"
          break
        case 'onlyCharU':
          if (options['onlyCharU'])
            name = "Please Enter only uppercase character"
          break
        case 'onlyChDtUn':
          if (options['onlyChDtUn'])
            name = "Please Enter only with char,Digits,Dash"
          break
        case 'onlyDtUcLc':
          if (options['onlyDtUcLc'])
            name = "Please Enter only with Digits,Chars Upper and Lowercase"
          break
        case 'onlyDtSp':
          if (options['onlyDtSp'])
            name = "Please Enter only with Digits,Specai Character"
          break
        case 'Digitrange':
          var ranges = options['Digitrange'].split('-')
          name = "Please Enter digit should be in range " + ranges[0] + " between and " + ranges[1]
          break
        case 'charRange':
          if (options['charRange']) {
            var ranges = options['charRange'].split('-')
            name = "Please Enter characters should be in range between " + ranges[0] + " and " + ranges[1]
          }
          break
        case 'strongPass':
          if (options['strongPass'])
            name = "Please Enter strong password"
          break

      }
      return name
    }

    //function for display when no error when hover
    function displayNoErrorForPass(val, options) {
      var name
      switch (val) {
        case 'min':
          name = "MinLength is entered correctly"
          break;
        case 'max':
          name = "MaxLength is entered correctly"
          break;
        case 'onlyDigits':
          if (options['onlyDigits'])
            name = "Entered only Digits"
          break
        case 'onlyCharL':
          if (options['onlyCharL'])
            name = "Entered only lowercase character"
          break
        case 'onlyCharU':
          if (options['onlyCharU'])
            name = "Entered only uppercase character"
          break
        case 'onlyChDtUn':
          if (options['onlyChDtUn'])
            name = "Entered only with char,Digits,Dash"
          break
        case 'onlyDtUcLc':
          if (options['onlyDtUcLc'])
            name = "Entered only with Digits,Chars Upper and Lowercase"
          break
        case 'onlyDtSp':
          if (options['onlyDtSp'])
            name = "Entered only with Digits,Special characters"
          break
        case 'Digitrange':
          if (options['Digitrange']) {
            var ranges = options['Digitrange'].split('-')
            name = "Entered digit should be in range between " + ranges[0] + " and " + ranges[1]
          }
          break
        case 'charRange':
          if (options['charRange']) {
            var ranges = options['charRange'].split('-')
            name = "Entered charaters should be in range between " + ranges[0] + " and " + ranges[1]
          }
          break
        case 'strongPass':
          if (options['strongPass'])
            name = "Entered strong password"
          break

      }
      return name
    }

    // creating new DOM element for email and implementing the hover part
    function validateFormEmail(options) {
      options['checkat'] = true
      options['charBeforeat'] = true
      options['checkOrg'] = true
      options['checkAddress'] = true
      options['restrictSpecial'] = true
      options['noDoubleDot'] = true
      options['notStart'] = true
      var idName = $(options.target).attr('id')
      this.newElement = document.createElement("div")
      this.newElement.id = idName + countEmail()
      $('#' + idName).after(this.newElement)
      idName = this.newElement.id
      var numberOfStars = Object.keys(options)
      for (var i = 1; i < numberOfStars.length; i++) {
        this.dot = document.createElement('div')
        this.dot.className = "rating-star empty-star"
        this.dot.id = idName + "_" + numberOfStars[i]
        $('#' + idName).append(this.dot)
      }
      var selectedClass;
      $('#' + idName).children().each(function () {
        $(this).hover(function () {
          selectedClass = $(this).attr('class')
          $(this).removeClass(selectedClass)
          $(this).addClass('rating-star select-star')
          var idNames = $(this).attr('id')
          var idName = idNames.split('_')[1]
          if (selectedClass == 'rating-star empty-star')
            $(this).html("<br><div class='displayBox'>" + displayErrorForEmail(idName, options) + "</div>")
          else
            $(this).html("<br><div class='displayBox'>" + displayNoErrorForEmail(idName, options) + "</div>")
          $(this).css('cursor', 'pointer')
        }, function () {
          $(this).attr('class', selectedClass)
          $(this).html("")
        });
      });

      $('#' + $(options.target).attr('id')).on('input', function () {
        var value = $(this).val()
        $('#' + idName).children().each(function () {
          var childIds = $(this).attr("id")
          checkWithConditionForEmail(childIds, options, value)
        })
        var wrongCount = 0
        $('#' + idName).children().each(function () {
          if ($(this).attr('class') != 'rating-star full-star') {
            wrongCount++
          }
        })
        if (wrongCount == 0) {
          $(this).removeClass('invalid')
          $(this).addClass('valid')
        } else {
          $(this).removeClass('valid')
          $(this).addClass('invalid')
        }
        validateButton()
      })
    }
    // function for handling logic part for password
    function checkWithConditionForEmail(id, options, val) {
      var key = id.split('_')[1]
      switch (key) {
        case 'checkat':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['checkat']) {
            var index = val.indexOf('@')
            if (index == -1)
              $('#' + id).attr('class', 'rating-star empty-star')
            else
              $('#' + id).attr('class', 'rating-star full-star')
          }
          break
        case 'charBeforeat':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['charBeforeat']) {
            var index = val.indexOf('@')
            if (index == 0 || index == -1)
              $('#' + id).attr('class', 'rating-star empty-star')
            else
              $('#' + id).attr('class', 'rating-star full-star')
          }
          break
        case 'checkOrg':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['checkOrg']) {
            var domain = val.split('.')[1]
            if (domain == "com" || domain == "in" || domain == "org")
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'checkAddress':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['checkAddress']) {
            if (val.indexOf('@') != -1 && val.indexOf('.') != -1) {
              var address = val.split('@')[1].split('.')[0]
              if (address == "gmail" || address == "yahoo" || address == "outlook" || address == "zoho" || address == "hotmail") {
                $('#' + id).attr('class', 'rating-star full-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'restrictSpecial':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['restrictSpecial']) {
            var check = true
            for (var i = 0; i < val.length; i++) {
              if ((val[i] >= 'a' && val[i] <= 'z') || (val[i] >= 'A' && val[i] <= 'Z') || (val[i] >= '0' && val[i] <= '9') || (val[i] == '@' || val[i] == '_' || val[i] == '.')) {
                continue
              } else {
                check = false
                break
              }
            }
            if (check)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'noDoubleDot':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['noDoubleDot']) {
            var count = 0
            for (var i = 0; i < val.length; i++) {
              if (val[i] == '.')
                count++
            }
            if (count == 1)
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'notStart':
          if (val.length == 0) {
            $('#' + id).attr('class', 'rating-star empty-star')
          } else if (options['notStart']) {
            var startChar = val.charAt(0)
            if ((startChar >= 'a' && startChar <= 'z') || (startChar >= 'A' && startChar <= 'Z'))
              $('#' + id).attr('class', 'rating-star full-star')
            else
              $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
      }
    }
    // display error when hover for email
    function displayErrorForEmail(val, options) {
      var name
      switch (val) {
        case 'checkat':
          if (options['checkat'])
            name = "please Enter @ correctly for email"
          break
        case 'charBeforeat':
          if (options['charBeforeat'])
            name = "Please Enter character before @ correctly"
          break
        case 'checkOrg':
          if (options['checkOrg'])
            name = "Please Enter domain name correctly"
          break
        case 'checkAddress':
          if (options['checkAddress'])
            name = "Please Enter Address correctly"
          break
        case 'restrictSpecial':
          if (options['restrictSpecial'])
            name = "Please Enter with allowed special chars correctly"
          break
        case 'noDoubleDot':
          if (options['noDoubleDot'])
            name = "Please Enter with only one dot"
          break
        case 'notStart':
          if (options['notStart'])
            name = "Please don't start with @,.,_,.."
          break
      }
      return name
    }
    // display no error when hover for email
    function displayNoErrorForEmail(val, options) {
      var name
      switch (val) {
        case 'checkat':
          if (options['checkat'])
            name = "Entered @ correctly"
          break
        case 'charBeforeat':
          if (options['charBeforeat'])
            name = "Entered character before @ correctly"
          break
        case 'checkOrg':
          if (options['checkOrg'])
            name = "Entered domain name correctly"
          break
        case 'checkAddress':
          if (options['checkAddress'])
            name = "Entered Address correctly"
          break
        case 'restrictSpecial':
          if (options['restrictSpecial'])
            name = "Entered with allowed special chars correctly"
          break
        case 'noDoubleDot':
          if (options['noDoubleDot'])
            name = "Entered with only one dot"
          break
        case 'notStart':
          if (options['notStart'])
            name = "Starting not entered with @,.,_,.."
          break
      }
      return name
    }
    // to validate phone number   
    function validateFormNumber(options) {
      var countryCodeArray = ["CS", "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "CD", "DK", "DJ", "DM", "DO", "TL", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "CI", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "CG", "RO", "RU", "RW", "RE", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "ST", "TW", "TJ", "TZ", "TH", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UM", "VI", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "WF", "EH", "YE", "ZM", "ZW"]
      var childrens = $(options.target).children();
      var firstChild = childrens[0]
      var secondChild = childrens[1]
      const access_key = 'aa31834e73717c8a6fcb0e6adcfb2d77';
      $(firstChild).blur(function () {
        var cc = $(firstChild).val()
        if (countryCodeArray.includes(cc.toUpperCase()) && cc.length == 2) {
          $('#' + $(firstChild).attr('id')).removeClass('invalid')
          $('#' + $(firstChild).attr('id')).addClass('valid')
        } else {
          $('#' + $(firstChild).attr('id')).removeClass('valid')
          $('#' + $(firstChild).attr('id')).addClass('invalid')
        }
      })
      $(secondChild).blur(function () {
        var country_code = $(firstChild).val()
        var phone_number = $(secondChild).val()
        if ($(firstChild).val() && $(secondChild).val() && $(firstChild).attr('class') == "country_code valid") {
          $.ajax({
            url: 'http://apilayer.net/api/validate?access_key=' + access_key + '&number=' + phone_number + '&country_code=' + country_code,
            dataType: 'jsonp',
            success: function (json) {
              console.log("ff")
              if (json.valid) {
                $('#' + $(secondChild).attr('id')).removeClass('invalid')
                $('#' + $(secondChild).attr('id')).addClass('valid')
              } else {
                $('#' + $(secondChild).attr('id')).removeClass('valid')
                $('#' + $(secondChild).attr('id')).addClass('invalid')
              }
              validateButton()
            }
          });
        }
      });
      validateButton()
    }
    // to validate zipcode
    function validateFormZipCode(options) {
      var countryCodeArray = ["CS", "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "CD", "DK", "DJ", "DM", "DO", "TL", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "CI", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "CG", "RO", "RU", "RW", "RE", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "ST", "TW", "TJ", "TZ", "TH", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UM", "VI", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "WF", "EH", "YE", "ZM", "ZW"]
      var childrens = $(options.target).children();
      var firstChild = childrens[0]
      var secondChild = childrens[1]
      $(firstChild).blur(function () {
        var cc = $(firstChild).val()
        if (countryCodeArray.includes(cc.toUpperCase()) && cc.length == 2) {
          $('#' + $(firstChild).attr('id')).removeClass('invalid')
          $('#' + $(firstChild).attr('id')).addClass('valid')
        } else {
          $('#' + $(firstChild).attr('id')).removeClass('valid')
          $('#' + $(firstChild).attr('id')).addClass('invalid')
        }
      })
      $(secondChild).blur(function () {
        var country_code = $(firstChild).val()
        var zipCode = $(secondChild).val()
        if ($(firstChild).val() && $(secondChild).val() && $(firstChild).attr('class') == "zip_code valid") {
          $.ajax({
            url: 'http://api.geonames.org/postalCodeSearch?postalcode=' + zipCode + '&country=' + country_code + '&username=dhinesh97_',
            success: function (json) {
              var postCodeCount = parseInt($(json).find('totalResultsCount').text())
              if (postCodeCount > 0) {
                $('#' + $(secondChild).attr('id')).removeClass('invalid')
                $('#' + $(secondChild).attr('id')).addClass('valid')
              } else {
                $('#' + $(secondChild).attr('id')).removeClass('valid')
                $('#' + $(secondChild).attr('id')).addClass('invalid')
              }
              validateButton()
            }
          });
        }
      });
      validateButton()
    }
    //  creating new DOM element for date and implementing the hover part
    function validateFormDate(options) {
      var value = $(options.target).val()
      var idName = $(options.target).attr('id')
      this.newElement = document.createElement("div")
      this.newElement.id = idName + countDate()
      $('#' + idName).after(this.newElement)
      idName = this.newElement.id
      var numberOfStars = Object.keys(options)
      for (var i = 1; i < numberOfStars.length; i++) {
        this.dot = document.createElement('div')
        this.dot.className = "rating-star empty-star"
        this.dot.id = idName + "_" + numberOfStars[i]
        $('#' + idName).append(this.dot)
      }
      var selectedClass;
      $('#' + idName).children().each(function () {
        $(this).hover(function () {
          selectedClass = $(this).attr('class')
          $(this).removeClass(selectedClass)
          $(this).addClass('rating-star select-star')
          var idNames = $(this).attr('id')
          var idName = idNames.split('_')[1]
          if (selectedClass == 'rating-star empty-star')
            $(this).html("<br><div class='displayBox'>" + displayErrorForDate(idName, options) + "</div>")
          else
            $(this).html("<br><div class='displayBox'>" + displayNoErrorForDate(idName, options) + "</div>")
          $(this).css('cursor', 'pointer')
        }, function () {
          $(this).attr('class', selectedClass)
          $(this).html("")
        });
      });

      $('#' + $(options.target).attr('id')).on('input', function () {
        var value = $(this).val()
        $('#' + idName).children().each(function () {
          var childIds = $(this).attr("id")
          checkWithConditionForDate(childIds, options, value)
        })
        var wrongCount = 0
        $('#' + idName).children().each(function () {
          if ($(this).attr('class') != 'rating-star full-star') {
            wrongCount++
          }
        })
        if (wrongCount == 0) {
          $(this).removeClass('invalid')
          $(this).addClass('valid')
        } else {
          $(this).removeClass('valid')
          $(this).addClass('invalid')
        }
        validateButton()
      })
    }

    function checkWithConditionForDate(id, options, val) {
      var key = id.split('_')[1]
      switch (key) {
        case 'format':
          var format = options['format']
          var splitedDate = val.split('/')
          var syntax = format.split('/')
          if (splitedDate[0] != undefined && splitedDate[1] != undefined && splitedDate[2] != undefined && (splitedDate[2] != undefined && syntax[2] == "yyyy") ? splitedDate[2] != undefined && splitedDate[2].length == 4 : splitedDate[2] != undefined && splitedDate[2].length >= 1 && splitedDate[2].length <= 2) {
            if (checkValidDate(val)) {
              if (syntax[0] == 'dd' && syntax[1] == 'mm' && syntax[2] == 'yyyy') {
                if ((parseInt(splitedDate[0]) >= 1 && parseInt(splitedDate[0]) <= 31) && (parseInt(splitedDate[1]) >= 1 && parseInt(splitedDate[1]) <= 12) && (parseInt(splitedDate[2]) >= 1600 && parseInt(splitedDate[2]) <= 2500)) {
                  $('#' + id).attr('class', 'rating-star full-star')
                }
              } else if (syntax[0] == 'dd' && syntax[1] == 'yyyy' && syntax[2] == 'mm') {
                if ((parseInt(splitedDate[0]) >= 1 && parseInt(splitedDate[0]) <= 31) && (parseInt(splitedDate[1]) >= 1600 && parseInt(splitedDate[1]) <= 2500) && (parseInt(splitedDate[2]) >= 1 && parseInt(splitedDate[2]) <= 12)) {
                  $('#' + id).attr('class', 'rating-star full-star')
                }
              } else if (syntax[0] == 'mm' && syntax[1] == 'dd' && syntax[2] == 'yyyy') {
                if ((parseInt(splitedDate[0]) >= 1 && parseInt(splitedDate[0]) <= 12) && (parseInt(splitedDate[1]) >= 1 && parseInt(splitedDate[1]) <= 31) && (parseInt(splitedDate[2]) >= 1600 && parseInt(splitedDate[2]) <= 2500)) {
                  $('#' + id).attr('class', 'rating-star full-star')
                }
              } else if (syntax[0] == 'mm' && syntax[1] == 'yyyy' && syntax[2] == 'dd') {
                if ((parseInt(splitedDate[0]) >= 1 && parseInt(splitedDate[0]) <= 12) && (parseInt(splitedDate[1]) >= 1600 && parseInt(splitedDate[1]) <= 2500) && (parseInt(splitedDate[2]) >= 1 && parseInt(splitedDate[2]) <= 12)) {
                  $('#' + id).attr('class', 'rating-star full-star')
                }
              } else if (syntax[0] == 'yyyy' && syntax[1] == 'mm' && syntax[2] == 'dd') {
                if ((parseInt(splitedDate[0]) >= 1600 && parseInt(splitedDate[0]) <= 2500) && (parseInt(splitedDate[1]) >= 1 && parseInt(splitedDate[1]) <= 12) && (parseInt(splitedDate[2]) >= 1 && parseInt(splitedDate[2]) <= 31)) {
                  $('#' + id).attr('class', 'rating-star full-star')
                }
              } else if (syntax[0] == 'yyyy' && syntax[1] == 'dd' && syntax[2] == 'mm') {
                if ((parseInt(splitedDate[0]) >= 1600 && parseInt(splitedDate[0]) <= 2500) && (parseInt(splitedDate[1]) >= 1 && parseInt(splitedDate[1]) <= 31) && (parseInt(splitedDate[2]) >= 1 && parseInt(splitedDate[2]) <= 12)) {
                  $('#' + id).attr('class', 'rating-star full-star')
                }
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          } else {
            $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'dateBetween':
          var format = options['format']
          var splitedDate = val.split('/')
          var syntax = format.split('/')
          var min = options['dateBetween'].split('-')[0].split('/')
          var max = options['dateBetween'].split('-')[1].split('/')
          if (splitedDate[0] != undefined && splitedDate[1] != undefined && splitedDate[2] != undefined && (splitedDate[2] != undefined && syntax[2] == "yyyy") ? splitedDate[2] != undefined && splitedDate[2].length == 4 : splitedDate[2] != undefined && splitedDate[2].length >= 1 && splitedDate[2].length <= 2) {
            if (checkValidDate(val)) {
              if (syntax[0] == 'dd' && syntax[1] == 'mm' && syntax[2] == 'yyyy') {
                if (checkDate(min, max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'dd' && syntax[1] == 'yyyy' && syntax[2] == 'mm') {
                var temp = min[2]
                min[2] = min[1]
                min[1] = temp

                temp = max[2]
                max[2] = max[1]
                max[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (checkDate(min, max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'mm' && syntax[1] == 'dd' && syntax[2] == 'yyyy') {
                var temp = min[1]
                min[1] = min[0]
                min[0] = temp

                temp = max[1]
                max[1] = max[0]
                max[0] = temp

                temp = splitedDate[1]
                splitedDate[1] = splitedDate[0]
                splitedDate[0] = temp

                if (checkDate(min, max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'mm' && syntax[1] == 'yyyy' && syntax[2] == 'dd') {
                var temp = min[2]
                min[2] = min[0]
                min[0] = temp

                temp = max[2]
                max[2] = max[0]
                max[0] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[0]
                splitedDate[0] = temp

                temp = min[2]
                min[2] = min[1]
                min[1] = temp

                temp = max[2]
                max[2] = max[1]
                max[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (checkDate(min, max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')

              } else if (syntax[0] == 'yyyy' && syntax[1] == 'mm' && syntax[2] == 'dd') {
                var temp = min[2]
                min[2] = min[0]
                min[0] = temp

                temp = max[2]
                max[2] = max[0]
                max[0] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[0]
                splitedDate[0] = temp

                if (checkDate(min, max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')

              } else if (syntax[0] == 'yyyy' && syntax[1] == 'dd' && syntax[2] == 'mm') {
                var temp = min[1]
                min[1] = min[0]
                min[0] = temp

                temp = max[1]
                max[1] = max[0]
                max[0] = temp

                temp = splitedDate[1]
                splitedDate[1] = splitedDate[0]
                splitedDate[0] = temp

                temp = min[2]
                min[2] = min[1]
                min[1] = temp

                temp = max[2]
                max[2] = max[1]
                max[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (checkDate(min, max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          } else {
            $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'dateAfter':
          var format = options['format']
          var splitedDate = val.split('/')
          var syntax = format.split('/')
          var min = options['dateAfter'].split('/')
          if (splitedDate[0] != undefined && splitedDate[1] != undefined && splitedDate[2] != undefined && (splitedDate[2] != undefined && syntax[2] == "yyyy") ? splitedDate[2] != undefined && splitedDate[2].length == 4 : splitedDate[2] != undefined && splitedDate[2].length >= 1 && splitedDate[2].length <= 2) {
            if (checkValidDate(val)) {
              if (syntax[0] == 'dd' && syntax[1] == 'mm' && syntax[2] == 'yyyy') {
                if (CheckDateAfter(min, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'dd' && syntax[1] == 'yyyy' && syntax[2] == 'mm') {
                var temp = min[2]
                min[2] = min[1]
                min[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (CheckDateAfter(min, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'mm' && syntax[1] == 'dd' && syntax[2] == 'yyyy') {
                var temp = min[1]
                min[1] = min[0]
                min[0] = temp

                temp = splitedDate[1]
                splitedDate[1] = splitedDate[0]
                splitedDate[0] = temp

                if (CheckDateAfter(min, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'mm' && syntax[1] == 'yyyy' && syntax[2] == 'dd') {
                var temp = min[2]
                min[2] = min[0]
                min[0] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[0]
                splitedDate[0] = temp

                temp = min[2]
                min[2] = min[1]
                min[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (CheckDateAfter(min, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')

              } else if (syntax[0] == 'yyyy' && syntax[1] == 'mm' && syntax[2] == 'dd') {
                var temp = min[2]
                min[2] = min[0]
                min[0] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[0]
                splitedDate[0] = temp

                if (CheckDateAfter(min, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')

              } else if (syntax[0] == 'yyyy' && syntax[1] == 'dd' && syntax[2] == 'mm') {
                var temp = min[1]
                min[1] = min[0]
                min[0] = temp

                temp = splitedDate[1]
                splitedDate[1] = splitedDate[0]
                splitedDate[0] = temp

                temp = min[2]
                min[2] = min[1]
                min[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (CheckDateAfter(min, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          } else {
            $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
        case 'dateBefore':
          var format = options['format']
          var splitedDate = val.split('/')
          var syntax = format.split('/')
          var max = options['dateBefore'].split('/')
          if (splitedDate[0] != undefined && splitedDate[1] != undefined && splitedDate[2] != undefined && (splitedDate[2] != undefined && syntax[2] == "yyyy") ? splitedDate[2] != undefined && splitedDate[2].length == 4 : splitedDate[2] != undefined && splitedDate[2].length >= 1 && splitedDate[2].length <= 2) {
            if (checkValidDate(val)) {
              if (syntax[0] == 'dd' && syntax[1] == 'mm' && syntax[2] == 'yyyy') {
                if (checkDateBefore(max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'dd' && syntax[1] == 'yyyy' && syntax[2] == 'mm') {
                var temp = max[2]
                max[2] = max[1]
                max[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (checkDateBefore(max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'mm' && syntax[1] == 'dd' && syntax[2] == 'yyyy') {
                var temp = max[1]
                max[1] = max[0]
                max[0] = temp

                temp = splitedDate[1]
                splitedDate[1] = splitedDate[0]
                splitedDate[0] = temp

                if (checkDateBefore(max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else if (syntax[0] == 'mm' && syntax[1] == 'yyyy' && syntax[2] == 'dd') {
                var temp = max[2]
                max[2] = max[0]
                max[0] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[0]
                splitedDate[0] = temp

                temp = max[2]
                max[2] = max[1]
                max[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (checkDateBefore(max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')

              } else if (syntax[0] == 'yyyy' && syntax[1] == 'mm' && syntax[2] == 'dd') {
                var temp = max[2]
                max[2] = max[0]
                max[0] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[0]
                splitedDate[0] = temp

                if (checkDateBefore(max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')

              } else if (syntax[0] == 'yyyy' && syntax[1] == 'dd' && syntax[2] == 'mm') {
                var temp = max[1]
                max[1] = max[0]
                max[0] = temp

                temp = splitedDate[1]
                splitedDate[1] = splitedDate[0]
                splitedDate[0] = temp

                temp = max[2]
                max[2] = max[1]
                max[1] = temp

                temp = splitedDate[2]
                splitedDate[2] = splitedDate[1]
                splitedDate[1] = temp

                if (checkDateBefore(max, splitedDate))
                  $('#' + id).attr('class', 'rating-star full-star')
                else
                  $('#' + id).attr('class', 'rating-star empty-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          } else {
            $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
      }
    }

    function displayErrorForDate(val, options) {
      var name
      switch (val) {
        case 'format':
          name = "Please Enter the correct date  format"
          break
        case 'dateBetween':
          name = "Please Enter the date between the range " + options['dateBetween'].split('-')[0] + " and " + options['dateBetween'].split('-')[1]
          break
        case 'dateAfter':
          name = "Please Enter the date After " + options['dateAfter']
          break
        case 'dateBefore':
          name = "Please Enter the date Before " + options['dateBefore']
          break
      }
      return name
    }

    function displayNoErrorForDate(val, options) {
      var name
      switch (val) {
        case 'format':
          name = "Entered  the correct date format"
          break
        case 'dateBetween':
          name = "Entered date between the range " + options['dateBetween'].split('-')[0] + " and " + options['dateBetween'].split('-')[1]
          break
        case 'dateAfter':
          name = "Entered date after the " + options['dateAfter']
          break
        case 'dateBefore':
          name = "Entered date Before the " + options['dateBefore']
          break
      }
      return name
    }

    function validateFormFile(options) {
      var value = $(options.target).val()
      var idName = $(options.target).attr('id')
      this.newElement = document.createElement("div")
      this.newElement.id = idName + countDate()
      $('#' + idName).after(this.newElement)
      idName = this.newElement.id
      var numberOfStars = Object.keys(options)
      for (var i = 1; i < numberOfStars.length; i++) {
        this.dot = document.createElement('div')
        this.dot.className = "rating-star empty-star"
        this.dot.id = idName + "_" + numberOfStars[i]
        $('#' + idName).append(this.dot)
      }
      var selectedClass;
      $('#' + idName).children().each(function () {
        $(this).hover(function () {
          selectedClass = $(this).attr('class')
          $(this).removeClass(selectedClass)
          $(this).addClass('rating-star select-star')
          var idNames = $(this).attr('id')
          var idName = idNames.split('_')[1]
          if (selectedClass == 'rating-star empty-star')
            $(this).html("<br><div class='displayBox'>" + displayErrorForFile(idName, options) + "</div>")
          else
            $(this).html("<br><div class='displayBox'>" + displayNoErrorForFile(idName, options) + "</div>")
          $(this).css('cursor', 'pointer')
        }, function () {
          $(this).attr('class', selectedClass)
          $(this).html("")
        });
      });

      $('#' + $(options.target).attr('id')).change(function (e) {
        var value = e.target.files[0].name;
        $('#' + idName).children().each(function () {
          var childIds = $(this).attr("id")
          checkWithConditionForFile(childIds, options, value)
        })
        var wrongCount = 0
        $('#' + idName).children().each(function () {
          if ($(this).attr('class') != 'rating-star full-star') {
            wrongCount++
          }
        })
        if (wrongCount == 0) {
          $(this).removeClass('invalid')
          $(this).addClass('valid')
        } else {
          $(this).removeClass('valid')
          $(this).addClass('invalid')
        }
        validateButton()
      });
    }

    function checkWithConditionForFile(id, options, val) {
      var key = id.split('_')[1]
      switch (key) {
        case 'ext':
          var ext = val.split('.')[val.split('.').length - 1]
          if (ext.toLowerCase() == options['ext'].toLowerCase()) {

            $('#' + id).attr('class', 'rating-star full-star')
          } else {
            $('#' + id).attr('class', 'rating-star empty-star')
          }
          break
      }
    }

    function displayErrorForFile(val, options) {
      var name
      switch (val) {
        case 'ext':
          name = "Please Entered the correct given extension ( " + options['ext'] + " )"
          break
      }
      return name
    }

    function displayNoErrorForFile(val, options) {
      var name
      switch (val) {
        case 'ext':
          name = "Entered the correct given extension( " + options['ext'] + " )"
          break
      }
      return name
    }

    function validateFormCreditCard(options) {
      $(options.target).on('input', function () {
        var val = $(this).val()
        if (creditCardAlg(val) && val.length == 16) {
          $(this).removeClass("invalid")
          $(this).addClass("valid")
        } else {
          $(this).removeClass("valid")
          $(this).addClass("invalid")
        }
        validateButton()
      })
      validateButton()
    }
    // condition to check time validation 
    function validateFormTime(options) {
      if (options['24hours']) {
        options['checkMin'] = true
        options['colonMissing'] = true
        options['lengthLess3'] = true
        options['lengthGreater5'] = true
      } else {
        options['lengthLess6'] = true
        options['lengthGreater8'] = true
        options['checkAMPM'] = true
        options['OneSpace'] = true

      }

      var idName = $(options.target).attr('id')
      this.newElement = document.createElement("div")
      this.newElement.id = idName + countDate()
      $('#' + idName).after(this.newElement)
      idName = this.newElement.id
      var numberOfStars = Object.keys(options)
      for (var i = 1; i < numberOfStars.length; i++) {
        this.dot = document.createElement('div')
        this.dot.className = "rating-star empty-star"
        this.dot.id = idName + "_" + numberOfStars[i]
        $('#' + idName).append(this.dot)
      }
      var selectedClass;
      $('#' + idName).children().each(function () {
        $(this).hover(function () {
          selectedClass = $(this).attr('class')
          $(this).removeClass(selectedClass)
          $(this).addClass('rating-star select-star')
          var idNames = $(this).attr('id')
          var idName = idNames.split('_')[1]
          if (selectedClass == 'rating-star empty-star')
            $(this).html("<br><div class='displayBox'>" + displayErrorForTime(idName, options) + "</div>")
          else
            $(this).html("<br><div class='displayBox'>" + displayNoErrorForTime(idName, options) + "</div>")
          $(this).css('cursor', 'pointer')
        }, function () {
          $(this).attr('class', selectedClass)
          $(this).html("")
        });
      });

      $('#' + $(options.target).attr('id')).on('input', function () {
        var value = $(this).val()
        $('#' + idName).children().each(function () {
          var childIds = $(this).attr("id")
          checkWithConditionForTime(childIds, options, value)
        })
        var wrongCount = 0
        $('#' + idName).children().each(function () {
          if ($(this).attr('class') != 'rating-star full-star') {
            wrongCount++
          }
        })
        if (wrongCount == 0) {
          $(this).removeClass('invalid')
          $(this).addClass('valid')
        } else {
          $(this).removeClass('valid')
          $(this).addClass('invalid')
        }
        validateButton()
      })
    }

    function checkWithConditionForTime(id, options, val) {
      var key = id.split('_')[1]
      switch (key) {
        case 'lengthLess6':
          if (options['lengthLess6']) {
            if (val.length < 6) {
              $('#' + id).attr('class', 'rating-star empty-star')
            } else {
              $('#' + id).attr('class', 'rating-star full-star')
            }
          }
          break
        case 'lengthLess3':
          if (options['lengthLess3']) {
            if (val.length < 3) {
              $('#' + id).attr('class', 'rating-star empty-star')
            } else {
              $('#' + id).attr('class', 'rating-star full-star')
            }
          }
          break
        case 'lengthGreater8':
          if (options['lengthGreater8']) {
            if (val.length > 8 || val.length == 0) {
              $('#' + id).attr('class', 'rating-star empty-star')
            } else {
              $('#' + id).attr('class', 'rating-star full-star')
            }
          }
          break
        case 'lengthGreater5':
          if (options['lengthGreater5']) {
            if (val.length > 5 || val.length == 0) {
              $('#' + id).attr('class', 'rating-star empty-star')
            } else {
              $('#' + id).attr('class', 'rating-star full-star')
            }
          }
          break
        case 'checkAMPM':
          if (options['checkAMPM']) {
            if (val.split(' ').length == 2) {
              var timeZone = val.split(' ')[1]
              if (timeZone.toUpperCase() == "AM" || timeZone.toUpperCase() == "PM") {
                $('#' + id).attr('class', 'rating-star full-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'checkHours':
          if (options['checkHours']) {
            if (val.split(':').length == 2) {
              var hours = val.split(' ')[0]
              if (parseInt(hours) >= 1 && parseInt(hours) <= 12) {
                $('#' + id).attr('class', 'rating-star full-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case '24hours':
          if (options['24hours']) {
            if (val.split(':').length == 2) {
              var hours = val.split(' ')[0]
              if (parseInt(hours) >= 1 && parseInt(hours) <= 24) {
                $('#' + id).attr('class', 'rating-star full-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'checkMin':
          if (options['checkMin']) {
            if (val.split(':').length == 2) {
              var hours = val.split(':')[1]
              hours = hours.substring(0, hours.length)
              if (parseInt(hours) >= 0 && parseInt(hours) <= 60) {
                $('#' + id).attr('class', 'rating-star full-star')
              } else {
                $('#' + id).attr('class', 'rating-star empty-star')
              }
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'OneSpace':
          if (options['OneSpace']) {
            if (val.split(' ').length == 2) {
              $('#' + id).attr('class', 'rating-star full-star')
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break
        case 'colonMissing':
          if (options['colonMissing']) {
            if (val.split(':').length == 2) {
              $('#' + id).attr('class', 'rating-star full-star')
            } else {
              $('#' + id).attr('class', 'rating-star empty-star')
            }
          }
          break

      }
    }

    function displayErrorForTime(val, options) {
      var name
      switch (val) {
        case 'lengthLess6':
          name = "The time length should be less than 6 (hh:mm AM/PM)"
          break
        case 'lengthGreater8':
          name = "The time length should not be greater than 8(hh:mm AM/PM)"
          break
        case 'lengthLess3':
          name = "The time length should be less than 3 (hh:mm )"
          break
        case 'lengthGreater5':
          name = "The time length should not be greater than 5(hh:mm )"
          break
        case 'checkAMPM':
          name = "Please Enter only AM/PM"
          break
        case 'OneSpace':
          name = "Please Leave space between AM/PM"
          break
        case 'colonMissing':
          name = "Colon is missing"
          break
        case 'checkHours':
          name = "Hours is in invalid format"
          break
        case '24hours':
          name = "Hours is in invalid format"
          break
        case 'checkMin':
          name = "Minute is in invalid format"
          break
      }
      return name
    }

    function displayNoErrorForTime(val, options) {
      var name
      switch (val) {
        case 'lengthLess6':
          name = "The time Entered is valid (hh:mm AM/PM)"
          break
        case 'lengthGreater8':
          name = "The time entered is valid (hh:mm AM/PM)"
          break
        case 'lengthLess3':
          name = "The time Entered is valid (hh:mm )"
          break
        case 'lengthGreater5':
          name = "The time entered is valid (hh:mm )"
          break
        case 'checkAMPM':
          name = "Entered only AM/PM"
          break
        case 'alldigits':
          name = "Entered only the digits"
          break
        case 'OneSpace':
          name = "No space between AM/PM"
          break
        case 'colonMissing':
          name = "Colon is there between hrs and mins"
          break
        case 'checkHours':
          name = "Hours is in valid format"
          break
        case '24hours':
          name = "Hours is in valid format"
          break
        case 'checkMin':
          name = "Minute is in valid format"
          break
      }
      return name
    }
  }())