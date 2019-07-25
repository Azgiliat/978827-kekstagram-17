'use strict';

(function () {
  window.initFormValidity = function () {
    var hashtagInput = document.querySelector('.text__hashtags');
    var imgForm = document.querySelector('.img-upload__form');
    var comment = document.querySelector('.text__description');
    //  var submitButton = document.querySelector('.img-upload__submit');
    var hashtagsProps = {
      text: hashtagInput.value,
      lowCaseText: [],
      errorsText: [],
      valid: true,
      toLowCase: function () {
        var hashtags = this.text.split(' ');
        hashtags.forEach(function (item) {
          this.lowCaseText.push(item.toLowerCase());
        }, this);
      },
      hashtagsValidity: function () {
        var doubleTags = false;
        this.toLowCase();
        if (this.text === '') {
          return;
        }
        if (this.lowCaseText.length > 5) {
          this.valid = false;
          this.errorsText.push('Вы ввели ' + this.lowCaseText.length + ' хэштегов. Их должно быть не больше 5.\n');
        }
        this.lowCaseText.forEach(function (item, i, array) {
          if (item === '#') {
            this.valid = false;
            this.errorsText.push('Хэштег не может состоять из одной #.\n');
          }
          if (item.charAt(0) !== '#') {
            this.valid = false;
            this.errorsText.push('Хэштеги должны начинаться с #.\n');
          }
          if (item.length > 20) {
            this.valid = false;
            this.errorsText.push('Максимальная длина одного хэштега 20 символов.\n');
          }
          var nextItem = i + 1;
          for (nextItem; nextItem < array.length; nextItem++) {
            if ((item === array[i + 1]) && !doubleTags) {
              doubleTags = true;
              this.valid = false;
              this.errorsText.push('Не должно быть одинаковых хэштегов\n');
            }
          }
        }, this);
      }
    };
    var commentProps = {
      text: comment.value,
      errorsText: [],
      valid: true,
      commentValidity: function () {
        if (this.text === '') {
          return;
        }
        if (this.text.length > 140) {
          this.errorsText.push('Комментарий слишком длинынй, должно быть не более 140 символов.');
          this.valid = false;
        }
      }
    };
    var validityToDefault = function (item) {
      item.valid = true;
      item.errorsText = [];
      hashtagsProps.lowCaseText = [];
      hashtagInput.setCustomValidity('');
      comment.setCustomValidity('');
    };

    hashtagInput.addEventListener('input', function () {
      hashtagsProps.text = hashtagInput.value;
      validityToDefault(hashtagsProps);
    });

    comment.addEventListener('input', function () {
      commentProps.text = comment.value;
      validityToDefault(commentProps);
    });
    /*  на домашнем ПК почему-то событие submit не отлавливается при повторной попытке
    отправки формы. Поэтому был придуман такой вот костыль. На рабочем ПК всё отлавилвается.
    Буду разбираться.
        submitButton.addEventListener('click', function () {
          var customSubmitConfig = {
            bubbles: true,
            cancelable: true
          };
          var cSubmit = new Event('customSubmit', customSubmitConfig);
          imgForm.dispatchEvent(cSubmit);
        });
    */
    imgForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      hashtagsProps.hashtagsValidity();
      commentProps.commentValidity();
      if (commentProps.valid && hashtagsProps.valid) {
        hashtagInput.setCustomValidity('');
        comment.setCustomValidity('');
        imgForm.submit();
      } else {
        hashtagInput.setCustomValidity(hashtagsProps.errorsText);
        comment.setCustomValidity(commentProps.errorsText);
      }
    });
  };
})();
