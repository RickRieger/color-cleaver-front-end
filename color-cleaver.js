const colorCombinator = require("./color-combinator.js");
const colorDeconstructor = require("./color-deconstructor.js");
const isValidPrimary = require("./is-valid-primary.js");
const isValidSecondary = require("./is-valid-secondary.js");
const getInput = require("./get-input.js");

// Your code here!


// let color1 = getInput(1);
// let color2 = getInput(2);


// below code was changed in order to anticipate capital letters

var str = getInput(1);
var str2 = getInput(2);

if (str !== undefined){
    var color1 = str.toLowerCase();
}
if (str2 !== undefined){
    var color2 = str2.toLowerCase();
}





// My code based on flowchart-1

// if (color1 === undefined && color2 === undefined){
//     console.log ('Please provide at least one color to be evaluated!');
// }

// else if(isValidSecondary(color1)=== true && color2 === undefined ){

//     console.log (colorDeconstructor(color1));
// }

// else if(color1 === color2 && isValidPrimary(color1) && isValidPrimary(color2)){
//     console.log("Can not use the same color twice!")
// }


// else if(isValidPrimary(color1) === true && isValidPrimary(color2) === true){
//     console.log(colorCombinator(color1,color2));
// }

// else { console.log('Please provide 2 primary colors to be evaluated!');

// }
// else if(isValidSecondary(color1) === false && isValidPrimary(color1) === false){

//     console.log ("Please provide valid colors to be evaluated.");
// }





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





// // (Andy's code)


// if (color1 === undefined && color2 === undefined) {
//     console.log('Please enter at least one color');

// } else if (color2 === undefined) {

//     let oneColor = colorDeconstructor(color1)
//     if (isValidSecondary(color1)) {
//         console.log(`Your color is a combo of ${oneColor}`)
//     } else {
//         console.log('please choose orange, purple or green')
//     }

// } else { 

//     if (!isValidPrimary(color1) || !isValidPrimary(color2)) {   
//         console.log('Please enter two primary colors.  Primary colors consist of; red, blue or yellow')
//     } else {
//         const twoColors = colorCombinator(color1, color2)
//         console.log(`your colors combined will give you ${twoColors}`)
//     }

// }



