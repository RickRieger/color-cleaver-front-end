const colorCombinator = require("./color-combinator.js");
const colorDeconstructor = require("./color-deconstructor.js");
const isValidPrimary = require("./is-valid-primary.js");
const isValidSecondary = require("./is-valid-secondary.js");
const getInput = require("./get-input.js");

// Your code here!
const color1 = getInput(1);
const color2 = getInput(2);

if (color1 === undefined && color2 === undefined){
    console.log ('Please provide at least one color to be evaluated!');
}

else if(isValidSecondary(color1) === false && isValidPrimary(color1) === false){

    console.log ("Please provide valid colors to be evaluated.");
}


else if(isValidSecondary(color1)=== true && color2 === undefined ){

    console.log (colorDeconstructor(color1));
}



else if(isValidPrimary(color1) === true && isValidPrimary(color2) === true){
    console.log(colorCombinator(color1,color2));
}

else { console.log('Please provide 2 true primary colors to be evaluated!');

}






