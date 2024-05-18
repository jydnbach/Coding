'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
                  <article class="country ${className}">
                  <img class="country__img" src="${data.flag}" />
                  <div class="country__data">
                  <h3 class="country__name">${data.name}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                  ).toFixed(1)}</p>
                  <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                  }</p>
                  </div>
                  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = `something wnet wrong`) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
    return res.json();
  });
};

// // ///////////////////////////////////////

// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error(`No neighbor found`);

//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(`something went wrong ${err.message}. try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData();
// });

// // const whereAmI = function (lat, lng) {
// //   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
// // .then(res => {
// //   return res.json().then(data => {
// //     if (
// //       Object.values(data).some(
// //         value => value === 'Throttled! See geocode.xyz/pricing'
// //       )
// //     ) {
// //       throw new Error(`Problem with geocoding.`);
// //     }
// //     return data;
// //   });
// // })
// // .then(data => {
// //   console.log(`You are in ${data.city}, ${data.country}`);

// //   return fetch(`https://restcountries.com/v2/name/${data.country}`);
// // })
// // .then(res => res.json())
// // .then(data => renderCountry(data[0]))
// // .catch(err => console.error(err.message));
// // };

// // whereAmI(52.508, 13.381);
// // whereAmI(19.037, 72.873);
// // whereAmI(-33.933, 18.474);

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       return res.json().then(data => {
//         if (
//           Object.values(data).some(
//             value => value === 'Throttled! See geocode.xyz/pricing'
//           )
//         ) {
//           throw new Error(`Problem with geocoding.`);
//         }
//         return data;
//       });
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(err.message));
// };

// btn.addEventListener('click', whereAmI);

// ///////////////////////////////////////
// // Coding Challenge #2

// /*
// Build the image loading functionality that I just showed you on the screen.

// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// GOOD LUCK 😀
// */

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`image 2 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.log(err));

////
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async () => {
//   try {
//     //geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('problem getting location data');

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     //country data
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );

//     if (!res.ok) throw new Error('problem getting country');

//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err}`);
//     renderError(`${err.message}`);
//   }
// };

// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.log(`w: ${err.message}`));

// (async () => {
//   try {
// const city = await whereAmI()
// console.log(city);
//   } catch(err) {
// console.log(`error`);
//   }
//   console.log(`finished getting location`);
// }())

// const get3Countries = async function(c1,c2,c3) {
//   try {

// const [data1] = await getJSON(``)
// const [data2] = await getJSON(``)
// const [data3] = await getJSON(``)

// const data = await Promise.all([
//   getJSON(`https:`),
//   getJSON(`https:`),
//   getJSON(`https:`),
// ])
// console.log([data1.capital, data2.capital, data3.capital]);
//   } catch(err) {
// console.log(err);
//   }
// }

// get3Countries('portugal', 'canada', 'tanzania')

// Promise.race
// (async function() {
//   const res = await Promise.race([getJSON(`https`,), getJSON(`https`,), getJSON(`https`,)])
// })();

// const timeout = function(sec) {
//   return new Promise(function(_, reject){
//     setTimeout(() => {
//       reject(new Error('Request took too long'))
//     }, sec * 1000);
//   })
// }

// Promise.race([
//   getJSON(`https`),
//   timeout(1)
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

//   //never short-circuits

//   Promise.allSettled([
//     Promise.resolve('success'),
//     Promise.reject('success'),
//     Promise.resolve('another success'),
//   ]).then(res => console.log(res))

//   Promise.any([
//     Promise.resolve('success'),
//     Promise.resolve('success'),
//     Promise.resolve('success'),
//   ])

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const loadNPause = async () => {
  try {
    let img = await createImage(`img/img-1.jpg`);
    // currentImg = img;
    console.log(`image 1 loaded`);
    await wait(2);
    img.style.display = 'none';
    await createImage(`img/img-2.jpg`);
    console.log(`img 2 loaded`);
    await wait(2);
    img.style.display = 'none';
  } catch {
    console.log(err);
  }
};

loadNPause();

const loadAll = async imgArr => {
  try {
    const imgs = imgArr.map(async (img, i) => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch {
    console.log(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
