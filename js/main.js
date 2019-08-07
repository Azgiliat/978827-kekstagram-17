'use strict';
(function () {
  window.KeyCodes = {
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    isEnter: function (evt) {
      return (evt.which === window.KeyCodes.ENTER) ? true : false;
    }
  };
  var userMaleNames = ['Артём', 'Август', 'Августин', 'Аврор', 'Агап', 'Адам', 'Гений',
    'Геннадий', 'Георгий', 'Герман', 'Владлен', 'Влас', 'Власий', 'Володар', 'Осип', 'Оскар', 'Остап', 'Остромир'
  ];
  var userFemaleNames = ['Ангелина', 'Андриана', 'Анжела', 'Анисья', 'Анита', 'Анжиолетта',
    'Антонина', 'Анфиса', 'Анэля', 'Алёна', 'Алира', 'Арьяна', 'Ариадна', 'Ариель', 'Арина',
    'Артемида', 'Архелия', 'Астра', 'Ася', 'Асида', 'Аурелия', 'Аэлита', 'Аюна', 'Валентина',
    'Валерия', 'Ванда', 'Ванесса', 'Варвара', 'Василиса', 'Венера', 'Вера', 'Верона',
    'Сима', 'Симона', 'Снежана', 'София', 'Софья', 'Станислава', 'Стелла', 'Стефания', 'Сусанна'
  ];
  var commentsSource = ['Всё отлично!',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var photoTemplate = document.querySelector('#picture').content.querySelector('a');

  var randMinMax = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  var generateUserName = function () {
    return (Math.random() >= 0.5) ? userMaleNames[randMinMax(0, userMaleNames.length - 1)] : userFemaleNames[randMinMax(0, userFemaleNames.length - 1)];
  };

  var generateCommentText = function () {
    return (Math.random() >= 0.5) ? commentsSource[randMinMax(0, commentsSource.length - 1)] : commentsSource[randMinMax(0, commentsSource.length - 1)] + ' ' + commentsSource[randMinMax(0, commentsSource.length - 1)];
  };

  var generateComment = function () {
    var comment = {
      name: generateUserName(),
      text: generateCommentText(),
      avatar: 'img/avatar-' + (randMinMax(1, 6)) + '.jpg'
    };
    return comment;
  };

  var generatePhotoUrl = function () {
    return 'photos/' + (randMinMax(1, 25)) + '.jpg';
  };

  var generateElements = function () {
    var arrayOfElements = [];
    for (var i = 0; i < 25; i++) {
      arrayOfElements[i] = {
        url: generatePhotoUrl(),
        likes: randMinMax(15, 200),
        comments: [generateComment(), generateComment()]
      };
    }
    return arrayOfElements;
  };

  var photosArray = generateElements();
  var sectionPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  document.querySelector('body').addEventListener('okDonwloadPhotos', function () {
    var downloadedPhotos = window.downloadedPictures;
    downloadedPhotos.forEach(function (item, i) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = item.url;
      photoElement.querySelector('.picture__comments').textContent = item.comments.length;
      photoElement.querySelector('.picture__likes').textContent = item.likes;
      photoElement.classList.add(i + '');
      fragment.appendChild(photoElement);
    });
    sectionPictures.appendChild(fragment);
    window.initBigPictures();
    window.initSorting();
  });
  document.querySelector('body').addEventListener('errorDonwloadPhotos', function () {
    for (var j = 0; j < 25; j++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photosArray[j].url;
      photoElement.querySelector('.picture__comments').textContent = photosArray[j].comments.length;
      photoElement.querySelector('.picture__likes').textContent = photosArray[j].likes;
      photoElement.classList.add(j + '');
      fragment.appendChild(photoElement);
    }
    sectionPictures.appendChild(fragment);
    window.initBigPictures();
    window.initSorting();
  });
})();
