const colorCombinator = require("./color-combinator.js");
const colorDeconstructor = require("./color-deconstructor.js");
const isValidPrimary = require("./is-valid-primary.js");
const isValidSecondary = require("./is-valid-secondary.js");
const getInput = require("./get-input.js");

// Your code here!

// Read up to two colors and lowercase them, so "Red" and "RED" work too.
// A color that wasn't typed stays undefined.
const lowercase = (text) => (text === undefined ? undefined : text.toLowerCase());
const color1 = lowercase(getInput(1));
const color2 = lowercase(getInput(2));

const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

// Based on flowchart 2: no colors / one color / two colors
if (color1 === undefined) {
  console.log("Please type a color after the file name: one secondary color to split it (node color-cleaver.js orange), or two primary colors to mix them (node color-cleaver.js red yellow).");
} else if (color2 === undefined) {
  // One color: split a secondary color into its two primaries
  if (isValidSecondary(color1)) {
    console.log(`${capitalize(color1)} is made by mixing ${colorDeconstructor(color1)}.`);
  } else if (isValidPrimary(color1)) {
    console.log(`${capitalize(color1)} is a primary color, so it can't be split. Try orange, purple or green, or add a second primary color to mix.`);
  } else {
    console.log(`"${color1}" isn't a secondary color. Try orange, purple or green.`);
  }
} else {
  // Two colors: mix two different primary colors
  if (!isValidPrimary(color1) || !isValidPrimary(color2)) {
    console.log("To mix colors, type two primary colors: red, yellow or blue.");
  } else if (color1 === color2) {
    console.log(`Mixing ${color1} with ${color1} just makes ${color1}. Try two different primary colors.`);
  } else {
    console.log(`${capitalize(color1)} and ${color2} make ${colorCombinator(color1, color2)}.`);
  }
}
