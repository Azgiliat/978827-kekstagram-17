'use strict';

window.initFormValidity = (function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var imgForm = document.querySelector('.img-upload__form');
  var comment = document.querySelector('.text__description');
  var submitButton = document.querySelector('.img-upload__submit');
  var hashtagsProps = {
    text: hashtagInput.value,
    errorsText: [],
    valid: true,
    hashtagsValidity: function () {
      var hashtags = this.text.split(' ');
      if (this.text === '') {
        return;
      }
      if (hashtags.length > 5) {
        this.valid = false;
        this.errorsText.push('Вы ввели ' + hashtags.length + ' хэштегов. Их должно быть не больше 5.\n');
      }
      hashtags.forEach(function (item) {
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

  submitButton.addEventListener('click', function () {
    var customSubmitConfig = {
      bubbles: true,
      cancelable: true
    };
    var cSubmit = new Event('customSubmit', customSubmitConfig);
    imgForm.dispatchEvent(cSubmit);
  });

  imgForm.addEventListener('customSubmit', function () {
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
});
