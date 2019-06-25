'use strict';

var userMaleNames = ['Артём', 'Август', 'Августин', 'Аврор', 'Агап', 'Адам', 'Гений',
  'Геннадий', 'Георгий', 'Герман', 'Владлен', 'Влас', 'Власий', 'Володар', 'Осип', 'Оскар', 'Остап', 'Остромир'];
var userFemaleNames = ['Ангелина', 'Андриана', 'Анжела', 'Анисья', 'Анита', 'Анжиолетта',
  'Антонина', 'Анфиса', 'Анэля', 'Алёна', 'Алира', 'Арьяна', 'Ариадна', 'Ариель', 'Арина',
  'Артемида', 'Архелия', 'Астра', 'Ася', 'Асида', 'Аурелия', 'Аэлита', 'Аюна', 'Валентина',
  'Валерия', 'Ванда', 'Ванесса', 'Варвара', 'Василиса', 'Венера', 'Вера', 'Верона',
  'Сима', 'Симона', 'Снежана', 'София', 'Софья', 'Станислава', 'Стелла', 'Стефания', 'Сусанна'];
var commentsSource = ['Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoTemplate = document.querySelector('#picture').content.querySelector('a');

var generateUserName = function () {
  if (Math.random() >= 0.5) {
    return userMaleNames[Math.round(Math.random() * (userMaleNames.length - 1))];
  } else {
    return userFemaleNames[Math.round(Math.random() * (userFemaleNames.length - 1))];
  }
};

var generateCommentText = function () {
  if (Math.random() >= 0.5) {
    return commentsSource[Math.round(Math.random() * (commentsSource.length - 1))];
  } else {
    return commentsSource[Math.round(Math.random() * (commentsSource.length - 1))] + ' ' + commentsSource[Math.round(Math.random() * (commentsSource.length - 1))];
  }
};

var generateComment = function () {
  var comment = {
    name: generateUserName(),
    text: generateCommentText(),
    avatar: 'img/avatar-' + (1 + Math.round(Math.random() * 5)) + '.jpg'
  };
  return comment;
};

var generatePhotoUrl = function () {
  return 'photos/' + (1 + Math.round(Math.random() * 24)) + '.jpg';
};

var generateElements = function () {
  var arrayOfElements = [];
  for (var i = 0; i < 25; i++) {
    arrayOfElements[i] = {
      url: generatePhotoUrl(),
      likes: 15 + Math.round(Math.random() * 185),
      comments: [generateComment(), generateComment()]
    };
  }
  return arrayOfElements;
};

var photosArray = generateElements();
var sectionPictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < 25; j++) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photosArray[j].url;
  photoElement.querySelector('.picture__comments').textContent = photosArray[j].comments.length;
  photoElement.querySelector('.picture__likes').textContent = photosArray[j].likes;
  fragment.appendChild(photoElement);
}
sectionPictures.appendChild(fragment);
