'use strict';

(function () {
  window.initFormValidity = {
    formValidtity: true,
    startFormValidity: function () {
      var hashtagInput = document.querySelector('.text__hashtags');
      var comment = document.querySelector('.text__description');
      var hashtagsProps = {
        text: hashtagInput.value,
        lowCaseText: [],
        errorsText: [],
        valid: true,
        toLowCase: function () {
          var hashtags = this.text.split(' ');
          hashtags.forEach(function (item) {
            if (item === '') {
              return;
            }
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
            if (item !== '') {
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
                if ((item === array[nextItem]) && !doubleTags) {
                  doubleTags = true;
                  this.valid = false;
                  this.errorsText.push('Не должно быть одинаковых хэштегов\n');
                }
              }
            }
          }, this);
        }
      };
      var commentProps = {
        text: comment.value,
        errorsText: [],
        valid: true,
        validity: comment.validity,
        commentValidity: function () {
          if (this.validity.tooLong) {
            this.errorsText.push('Комментарий слишком длинынй, должно быть не более 140 символов.');
            this.valid = false;
          }
        }
      };
      var onHashtagInput = function () {
        hashtagsProps.text = hashtagInput.value;
        validityToDefault(hashtagsProps);
        checkValidity();
      };
      var onCommentInput = function () {
        commentProps.text = comment.value;
        validityToDefault(commentProps);
        checkValidity();
      };
      var validityToDefault = function (item) {
        item.valid = true;
        item.errorsText = [];
        hashtagsProps.lowCaseText = [];
        hashtagInput.setCustomValidity('');
        comment.setCustomValidity('');
      };
      var checkValidity = function () {
        hashtagsProps.hashtagsValidity();
        commentProps.commentValidity();
        if (!hashtagsProps.valid) {
          hashtagInput.classList.add('input-error');
        } else {
          hashtagInput.classList.remove('input-error');
        }
        if (commentProps.valid && hashtagsProps.valid) {
          hashtagInput.setCustomValidity('');
          comment.setCustomValidity('');
          validityToDefault(hashtagsProps);
          validityToDefault(commentProps);
          window.initFormValidity.formValidtity = true;
        } else {
          hashtagInput.setCustomValidity(hashtagsProps.errorsText);
          comment.setCustomValidity(commentProps.errorsText);
          window.initFormValidity.formValidtity = false;
        }
      };
      hashtagInput.addEventListener('input', onHashtagInput);
      comment.addEventListener('input', onCommentInput);
      hashtagInput.addEventListener('focus', function () {
        window.canClose = false;
      });
      comment.addEventListener('focus', function () {
        window.canClose = false;
      });
      hashtagInput.addEventListener('blur', function () {
        window.canClose = true;
      });
      comment.addEventListener('blur', function () {
        window.canClose = true;
      });
    }
  };
})();
