// module aliases
const { Engine, Render, Runner, Bodies, Composite, World, Body, Events } =
  Matter;

// Config
const width = window.innerWidth; // Adjusts to screen size
const height = window.innerHeight;
const cellsHorizontal = 4;
const cellsVertical = 4;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

let engine, world, render, runner;
let ball; // Define ball globally to avoid multiple event listeners

const init = () => {
  // Create engine
  engine = Engine.create();
  ({ world } = engine);
  engine.world.gravity.y = 0; // Disable gravity

  // Create renderer
  render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width,
      height,
    },
  });

  // Create runner
  runner = Runner.create();
  Runner.run(runner, engine); // Run engine
  Render.run(render); // Run renderer

  createWalls();
  createMaze();
  createGoal();
  createBall();

  // Attach the event listener for the play again button only once
  // document.getElementById("play-again").addEventListener("click", resetGame);
};

// Walls
const createWalls = () => {
  const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
  ];
  Composite.add(world, walls);
};

// Maze generation
const createMaze = () => {
  // Generating grid trick
  const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false));

  const horizontals = Array(cellsVertical - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  // Randomize neighbor order
  const shuffle = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
    return arr;
  };

  const removeWalls = (row, column) => {
    if (grid[row][column]) return; // If we visited cell at [row, column], then return
    grid[row][column] = true; // Mark this cell as visited

    // Aseemble rancomly ordered list of neighbors
    const neighbors = shuffle([
      [row - 1, column, "up"],
      [row, column + 1, "right"],
      [row + 1, column, "down"],
      [row, column - 1, "left"],
    ]);

    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;
      if (
        // Check if that neighbor is out of bounds
        nextRow < 0 ||
        nextRow >= cellsVertical ||
        nextColumn < 0 ||
        nextColumn >= cellsHorizontal
      ) {
        continue;
      }

      // If visited that neighbor, continue to next neighbor
      if (grid[nextRow][nextColumn]) {
        continue;
      }

      // Remove a wall from either horizontals or verticals
      if (direction === "left") {
        verticals[row][column - 1] = true;
      } else if (direction === "right") {
        verticals[row][column] = true;
      } else if (direction === "up") {
        horizontals[row - 1][column] = true;
      } else if (direction === "down") {
        horizontals[row][column] = true;
      }
      removeWalls(nextRow, nextColumn);
    }
  };

  const startRow = Math.floor(Math.random() * cellsVertical);
  const startColumn = Math.floor(Math.random() * cellsHorizontal);
  removeWalls(startRow, startColumn);

  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) return;
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        5,
        {
          isStatic: true,
          label: "wall",
          render: { fillStyle: "red" },
        }
      );
      World.add(world, wall);
    });
  });

  verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) return;
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        5,
        unitLengthY,
        {
          isStatic: true,
          label: "wall",
          render: { fillStyle: "red" },
        }
      );
      World.add(world, wall);
    });
  });
};

// Goal box
const createGoal = () => {
  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
      isStatic: true,
      label: "goal",
      render: { fillStyle: "green" },
    }
  );
  World.add(world, goal);
};

// Ball
const createBall = () => {
  const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
  ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: "ball",
    render: { fillStyle: "blue" },
  });
  World.add(world, ball);

  // Ball keystrokes
  document.addEventListener("keydown", handleKeyPress);
};

const handleKeyPress = (e) => {
  const { x, y } = ball.velocity; // Changes velocity
  if (e.keyCode === 87) {
    Body.setVelocity(ball, { x, y: y - 5 }); // W key (up)
  }
  if (e.keyCode === 83) {
    Body.setVelocity(ball, { x, y: y + 5 }); // S key (down)
  }
  if (e.keyCode === 65) {
    Body.setVelocity(ball, { x: x - 5, y }); // A key (left)
  }
  if (e.keyCode === 68) {
    Body.setVelocity(ball, { x: x + 5, y }); // D key (right)
  }
};

// Win condition
const setupCollisionEvent = () => {
  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      const labels = ["ball", "goal"];
      if (
        labels.includes(collision.bodyA.label) &&
        labels.includes(collision.bodyB.label)
      ) {
        document.querySelector(".winner").classList.remove("hidden");
        world.gravity.y = 1; // Turn on gravity
        world.bodies.forEach((body) => {
          if (body.label === "wall") {
            Body.setStatic(body, false); // Break walls
          }
        });
      }
    });
  });
};

// Reset game state
const resetGame = () => {
  World.clear(world);
  Engine.clear(engine);
  Render.stop(render);
  Runner.stop(runner);

  document.querySelector(".winner").classList.add("hidden");
  document.removeEventListener("keydown", handleKeyPress);

  init();
  setupCollisionEvent();
};

// Initialize game
init();
setupCollisionEvent();
