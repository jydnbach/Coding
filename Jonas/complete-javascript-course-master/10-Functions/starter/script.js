'use strict';
//reference point the same
//

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upper = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`original: ${str} / transformed: ${fn(str)}`);
};

transformer('javascript is the best', oneWord);
transformer('javascript is the best', upper);
