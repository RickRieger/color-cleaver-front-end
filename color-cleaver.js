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

// my code based on flowchart-2

if(isValidPrimary(color1) === true && isValidPrimary(color2) === true && color1 !== color2){
    console.log(colorCombinator(color1,color2));
}
else if(isValidSecondary(color1) === true && color2 === undefined){
    console.log (colorDeconstructor(color1));
}

else {
    console.log ('Please pass a single secondary color or two different primary colors!');
}
