'use strict';
//reference point the same
//

const high5 = function () {
  console.log(`five`);
};

document.body
  .addEventListener('click', high5)

  [('Jonas', 'Martha', 'Adam')].forEach(high5);

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

const lugthansa = {
  airline: 'Lufthansa',
  iatacode: 'LH',
  booking: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(eurowings, 234, 'john');
book.call(lufthansa, 432, 'smith');
book.call(swiss, 623, 'lucy');
