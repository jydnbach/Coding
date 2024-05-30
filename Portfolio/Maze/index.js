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
} = Matter;

// create angine
const engine = Engine.create();
const { world } = engine;

// config
const width = 600;
const height = 600;
const cells = 3;

// create renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width,
    height,
  },
});

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
/////////////////////////////////////

// walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(width / 2, height, width, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true,
  }),
];

// add bodies to world
Composite.add(engine.world, walls);

/////////////////maze generation

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

// generate grid trick
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

//generate vertical walls
const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

//generate horizontal walls
const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

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
      nextRow >= cells || //block south bound
      nextColumn < 0 || //block west bound
      nextColumn >= cells //block east bound
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
removeWalls(startRow, startColumn);

horizontals.forEach((row) => {
  row.forEach((open) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle();
  });
});

//////////////////////////

// run renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run engine
Runner.run(runner, engine);
