// module aliases
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  // Mouse,
  // MouseConstraint,
  World,
  Body, // Allows updating shape properties
  Events, // Listens world objects
} = Matter;

// Config
const width = window.innerWidth; // Adjusts to screen size
const height = window.innerHeight;
const cellsHorizontal = 14;
const cellsVertical = 10;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

let engine, world, render, runner;
const init = () => {
  // Create engine
  engine = Engine.create();
  ({ world } = engine);
  engine.world.gravity.y = 0; // Diable gravity

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

  createMaze();
  createGoal();
  createBall();
};

///////////////////////////////// mouse constraint + random shapes
// activate these to enable it:
// {Mouse, MouseConstraint} = Matter;
// Composite.add(engine.world, [...shapes]);

// //mouse constraint
// const mouse = Mouse.create(render.canvas);
// const mouseConstraint = MouseConstraint.create(engine, {
//   mouse: mouse,
//   constraint: {
//     stiffness: 0.1,
//     render: {
//       visible: true,
//     },
//   },
// });

// // add mouse contraint to world
// World.add(world, mouseConstraint);

// // shape calculation helper function
// const calcRandomXY = function (width, height) {
//   return [Math.random() * width, Math.random() * height];
// };

// // random shapes
// const shapes = [];

// // adjust second param for amount of shapes
// for (let i = 0; i < 50; i++) {
//   const [x, y] = calcRandomXY(width, height);

//   if (Math.random() > 0.5) {
//     const rectangle = Bodies.rectangle(x, y, 50, 50, {
//       isStatic: false,
//     });

//     shapes.push(rectangle);
//   } else {
//     const circle = Bodies.circle(x, y, 35, {
//       render: {
//         fillStyle: "green",
//       },
//     });
//     shapes.push(circle);
//   }
// }

///////////////////////////////////////////////// ----

// walls

const createWalls = () => {
  const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, height, width, 2, {
      isStatic: true,
    }),
    Bodies.rectangle(0, height / 2, 2, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width, height / 2, 2, height, {
      isStatic: true,
    }),
  ];
  Composite.add(engine.world, walls);
};

/////////////////maze generation
const createMaze = () => {
  // generate grid trick
  const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  //generate vertical walls
  const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false));

  //generate horizontal walls
  const horizontals = Array(cellsVertical - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));
  // randomize neighbor order
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

  //////////////////// removing walls algorithm
  const removeWalls = (row, column) => {
    // if we visited cell at [row, column], then return
    if (grid[row][column]) {
      return;
    }
    // mark this cell as visited
    grid[row][column] = true;

    // assemble randomly ordered list of neighbors
    const neighbors = shuffle([
      [row - 1, column, "up"],
      [row, column + 1, "right"],
      [row + 1, column, "down"],
      [row, column - 1, "left"],
    ]);
    // for each neighbor
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;

      // check if that neighbor is out of bounds
      if (
        nextRow < 0 || //block north bound
        nextRow >= cellsVertical || //block south bound
        nextColumn < 0 || //block west bound
        nextColumn >= cellsHorizontal //block east bound
      ) {
        continue;
      }

      // if visited that neighbor, continue to next neighbor
      if (grid[nextRow][nextColumn]) {
        continue;
      }

      // remove a wall from either horizontals or verticals
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
    // visit next cell
  };
};

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);
removeWalls(startRow, startColumn);

// Horizontal walls
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) return;
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2, // Center point of row
      rowIndex * unitLengthY + unitLengthY, // row selection
      unitLengthX, // Length
      5, // Thickness
      {
        isStatic: true,
        label: "wall",
        render: {
          fillStyle: "red",
        },
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
        render: {
          fillStyle: "red",
        },
      }
    );
    World.add(world, wall);
  });
});

// Goal box
const createGoal = () => {
  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7, // Goal box size
    unitLengthY * 0.7,
    {
      isStatic: true,
      label: "goal",
      render: {
        fillStyle: "green",
      },
    }
  );
  World.add(world, goal);
};

// Ball
const createBall = () => {
  const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
  const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: "ball",
    render: {
      fillStyle: "blue",
    },
  });
  World.add(world, ball);

  // Ball keystrokes
  document.addEventListener("keydown", (e) => {
    const { x, y } = ball.velocity; //changes velocity

    if (e.keyCode === 87) {
      Body.setVelocity(ball, { x, y: y - 5 }); // - means move up
    }
    if (e.keyCode === 83) {
      Body.setVelocity(ball, { x, y: y + 5 });
    }
    if (e.keyCode === 65) {
      Body.setVelocity(ball, { x: x - 5, y });
      w;
    }
    if (e.keyCode === 68) {
      Body.setVelocity(ball, { x: x + 5, y });
    }
  });

  // Win condition
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
            Body.setStatic(body, false); // updates static flag (breaks walls)
          }
        });
      }
    });
  });
};

document.querySelector(".play-again").addEventListener("click", () => {
  // Reset game state
  World.clear(world);
  Engine.clear(engine);
  Render.stop(render);
  Runner.stop(runner);
  document.querySelector(".winner").style.display = "none";
  init();
});

init();
