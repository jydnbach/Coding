#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
// import chalk from "chalk";
const chalk = require("chalk");
const path = require("path");

//method #2
// const lstat = util.promisify(fs.lstat);

//method 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

console.log(process.argv);

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(paht.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
    // console.log(filenames[index], stats.isFile());
  }
});

// for (let filename of filenames) {
//   try {
//     const stats = await lstat(filename);

//     console.log(filename, stats.isFile());
//   } catch (err) {
//     console.log(err);
//   }
// }
// });

//method #1

// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
