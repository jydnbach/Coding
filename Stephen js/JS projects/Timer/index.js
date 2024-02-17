const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");
const completedMessage = document.querySelector(".completed-message");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("timer is completed");
    completedMessage.style.display = "block";
  },
});

// console.log(this);

// 1. arrow
// const printThis = () => {
//   console.log(this);
// };

// printThis();
// const colors = {
//     printColor() {
//       console.log(this);
//       const printThis = () => {
//         console.log(this);
//       };
//       printThis();
//     },
//   };

//   colors.printColor();

// 2. bind, call, apply
// this is equal to the first argument of bind call or apply

// const printThis = function () {
//   console.log(this);
// };

// printThis.apply({ color: "red" });

// printThis();

// 3. all other cases
//.this is whatever is left to the dot

// const colors = {
//   printColor() {
//     console.log(this);
//   },
// };

// colors.printColor();

// const randomObject = {
//   a: 1,
// };

// randomObject.printColor = colors.printColor;

// randomObject.printColor();
