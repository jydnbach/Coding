const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const workButton = document.querySelector("#work");
const breakButton = document.querySelector("#break");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

let workTime = 25;
let breakTime = 5;
let duration;

class Timer {
  constructor(startButton, resetButton, workButton, breakButton, callbacks) {
    this.startButton = startButton;
    this.resetButton = resetButton;
    this.workButton = workButton;
    this.breakButton = breakButton;

    this.isWorkMode = true;
    this.workMinutes = workTime;
    this.breakMinutes = breakTime;
    this.seconds = 0;

    this.originalOffset = perimeter;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.workButton.addEventListener("click", this.switchToWorkMode);
    this.breakButton.addEventListener("click", this.switchToBreakMode);
    this.startButton.addEventListener("click", this.start);
    this.resetButton.addEventListener("click", this.reset);
  }

  updateDisplay() {
    const minutes = this.isWorkMode ? this.workMinutes : this.breakMinutes;
    minutesDisplay.innerHTML = String(minutes).padStart(2, "0");
    secondsDisplay.innerHTML = String(this.seconds).padStart(2, "0");
  }

  switchToWorkMode = () => {
    this.isWorkMode = true;
    this.reset();
    this.workButton.classList.add("active");
    this.breakButton.classList.remove("active");
  };

  switchToBreakMode = () => {
    this.isWorkMode = false;
    this.reset();
    this.workButton.classList.remove("active");
    this.breakButton.classList.add("active");
  };

  start = () => {
    startButton.style.display = "none";
    resetButton.style.display = "block";

    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  reset = (e) => {
    if (e) {
      e.preventDefault();
    }

    startButton.style.display = "block";
    resetButton.style.display = "none";

    clearInterval(this.interval);

    this.isWorkMode
      ? (this.workMinutes = workTime)
      : (this.breakMinutes = breakTime);
    this.seconds = 0;

    this.updateDisplay();
  };

  tick = (timeRemaining) => {
    if (this.timeRemaining <= 0) {
      clearInterval(this.interval);
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.seconds--;
      if (this.seconds < 0) {
        this.seconds = 59;
        if (this.isWorkMode) {
          this.workMinutes--;
        } else {
          this.breakMinutes--;
        }
      }
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
      this.updateDisplay();
    }
  };

  get timeRemaining() {
    return this.isWorkMode
      ? this.workMinutes * 60 + this.seconds
      : this.breakMinutes * 60 + this.seconds;
  }

  set timeRemaining(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.isWorkMode
      ? (this.workMinutes = minutes)
      : (this.breakMinutes = minutes);
    this.seconds = seconds;
    this.updateDisplay();
  }
}

const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

const timer = new Timer(startButton, resetButton, workButton, breakButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    const offset = (perimeter * timeRemaining) / duration - perimeter;
    circle.setAttribute("stroke-dashoffset", offset);
  },
  onComplete() {
    console.log(`timer completed`);
  },
});

window.onload = () => {
  timer.switchToWorkMode();
};
