const colorCombinator = require("./color-combinator.js");
const colorDeconstructor = require("./color-deconstructor.js");
const isValidPrimary = require("./is-valid-primary.js");
const isValidSecondary = require("./is-valid-secondary.js");
const getInput = require("./get-input.js");

// Your code here!

// below code was changed in order to anticipate capital letters

var str = getInput(1);
var str2 = getInput(2);

if (str !== undefined){
    var color1 = str.toLowerCase();
}
if (str2 !== undefined){
    var color2 = str2.toLowerCase();
}

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
