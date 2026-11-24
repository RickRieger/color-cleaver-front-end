# Color Cleaver — Front End: A Command-Line Color Mixer

[![Tests](https://github.com/RickRieger/color-cleaver-front-end/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/color-cleaver-front-end/actions/workflows/tests.yml)

A Node.js exercise from the **Code Immersives** web development bootcamp in New York City (February 2021). It's the "front end" of the Color Cleaver project: a command-line app that **splits a secondary color** into the two primaries that make it, or **mixes two primary colors** into a secondary. It uses the back-end functions from [color-cleaver-backend](https://github.com/RickRieger/color-cleaver-backend). This repo is my fork of the assignment. My code is in [`color-cleaver.js`](color-cleaver.js).

**Skills practiced:** reading optional command-line input, handling missing (`undefined`) values, branching on "no input / one input / two inputs", template literals for friendly messages, and following a flowchart.

**Built with:** JavaScript (Node.js). Tests use Jest 24; the badge above shows whether they pass on GitHub.

---

## Contents

- [Try it](#try-it)
- [My solution](#my-solution)
- [A mix-up in the instructions](#a-mix-up-in-the-instructions)
- [Run the tests](#run-the-tests)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)
- [Original assignment (from the instructor)](#original-assignment-from-the-instructor)

---

## Try it

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/color-cleaver-front-end.git
cd color-cleaver-front-end
node color-cleaver.js orange
node color-cleaver.js red yellow
```

| You type | App says |
|---|---|
| `node color-cleaver.js orange` | `Orange is made by mixing red and yellow.` |
| `node color-cleaver.js red yellow` | `Red and yellow make orange.` |
| `node color-cleaver.js BLUE red` | `Blue and red make purple.` (capitals are fine) |
| `node color-cleaver.js red` | `Red is a primary color, so it can't be split. Try orange, purple or green, or add a second primary color to mix.` |
| `node color-cleaver.js red red` | `Mixing red with red just makes red. Try two different primary colors.` |
| `node color-cleaver.js red orange` | `To mix colors, type two primary colors: red, yellow or blue.` |
| `node color-cleaver.js blorgon` | `"blorgon" isn't a secondary color. Try orange, purple or green.` |
| `node color-cleaver.js` | `Please type a color after the file name: …` (with both examples) |

## My solution

Written on **2021-02-26 and 2021-02-27** (commits *"The files are complete"* and *"Finished with different solutions"*). *(Shown as it is after the 2026 cleanup; see the log below for what changed.)*

```js
// Read up to two colors and lowercase them, so "Red" and "RED" work too.
// A color that wasn't typed stays undefined.
const lowercase = (text) => (text === undefined ? undefined : text.toLowerCase());
const color1 = lowercase(getInput(1));
const color2 = lowercase(getInput(2));

const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

// Based on flowchart 2: no colors / one color / two colors
if (color1 === undefined) {
  console.log("Please type a color after the file name: ...");
} else if (color2 === undefined) {
  // One color: split a secondary color into its two primaries
  if (isValidSecondary(color1)) {
    console.log(`${capitalize(color1)} is made by mixing ${colorDeconstructor(color1)}.`);
  } else if (isValidPrimary(color1)) {
    console.log(`${capitalize(color1)} is a primary color, so it can't be split. ...`);
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
```

**Two things my 2021 version added beyond the instructions,** both kept:
- **Capital letters work**, because the input is lowercased first. My original comment said *"below code was changed in order to anticipate capital letters"*.
- **The same color twice is rejected.** Red + red isn't a mix, and the back end would have returned `undefined`.

**How it decides:** the first question is *how many colors were typed*. With **one**, it must be a secondary color to split. With **two**, both must be different primary colors to mix. This follows the instructor's second flowchart (nested `if`s, shown below).

## A mix-up in the instructions

Step 5 of the instructor's README says to check that, *"if you're dealing with one color, … it's not a primary color, and if you're dealing with two colors, … if EITHER isn't a secondary color."* That's backwards:
- `colorDeconstructor` only works on **secondary** colors (orange → red and yellow), so a single color must be **secondary**.
- `colorCombinator` only works on **primary** colors (red + yellow → orange), so two colors must both be **primary**.

My 2021 solution used the correct checks, not the ones in step 5.

## Run the tests

```bash
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode: re-runs on every save
```

Expected result: `Tests: 13 passed, 13 total`. That's the 4 original back-end test groups plus 9 front-end tests that run `node color-cleaver.js` with every kind of input. [`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs them on GitHub after every push, and the badge at the top shows the result.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-24** on the branch `cleanup-and-tests`, checked by running the app with 10 different inputs and the tests, and merged into `master`. Each is its own commit. The instructor's back-end files, `get-input.js` and `main.test.js` are unchanged.

### 1. Removed commented-out alternative versions

**Why:** about 50 lines of commented-out code surrounded the working solution: an early version of the input lines, my alternative built from the first flowchart, and a classmate's version I'd pasted in to compare. Only the flowchart-2 code actually ran, so the rest made it hard to see what the app does. They're preserved in git history (commit `86e7d3b`). The output was identical for every input I tried.

### 2. Read the input with `const` instead of `var` inside `if` blocks

**Why:** the colors were created *inside* `if` blocks and used *outside* them. That only works because `var` ignores block boundaries: it's "hoisted" to the top of the file. With modern `let` or `const`, the code after the `if` couldn't see `color1` at all, which makes this pattern a trap. The new version does the same lowercasing in two clear lines, and the output was identical.

```js
// Before
var str = getInput(1);
var str2 = getInput(2);

if (str !== undefined){
    var color1 = str.toLowerCase();
}
if (str2 !== undefined){
    var color2 = str2.toLowerCase();
}

// After
const lowercase = (text) => (text === undefined ? undefined : text.toLowerCase());
const color1 = lowercase(getInput(1));
const color2 = lowercase(getInput(2));
```

### 3. Answers in sentences, and messages that say exactly what's wrong

**Why:** the app printed the back end's raw result, just `orange` or `red and yellow`, while the instructions ask to *"put it into a sentence that tells them the result in a user-friendly way."* Every problem also got the same generic message, including typing no color at all, which the instructions ask to handle with its own message.

| Input | Before | After |
|---|---|---|
| `orange` | `red and yellow` | `Orange is made by mixing red and yellow.` |
| `red yellow` | `orange` | `Red and yellow make orange.` |
| *(nothing)* | `Please pass a single secondary color or two different primary colors!` | `Please type a color after the file name: one secondary color to split it (…), or two primary colors to mix them (…).` |
| `red` | *(same generic message)* | `Red is a primary color, so it can't be split. …` |
| `blorgon` | *(same generic message)* | `"blorgon" isn't a secondary color. Try orange, purple or green.` |
| `red red` | *(same generic message)* | `Mixing red with red just makes red. …` |
| `red orange` | *(same generic message)* | `To mix colors, type two primary colors: red, yellow or blue.` |

Which colors mix or split into what is unchanged, and capitals still work.

### 4. Added front-end tests and automatic test runs on GitHub

**Why:** the assignment's tests only checked the back-end functions, and the front end itself, the actual assignment, was tested by hand. [`color-cleaver.test.js`](color-cleaver.test.js) runs `node color-cleaver.js` with no colors, each secondary, a primary, an unknown color, every primary pair in both orders, the same color twice, mixed valid/invalid pairs and capital letters. I also added a run-once `npm run test:ci` command (`npm test` is watch mode and never exits) and a GitHub Actions workflow.

### 5. Rewrote this README section

Added everything above. The instructor's original instructions and flowcharts are below, unchanged. Note the primary/secondary mix-up in their step 5, described [above](#a-mix-up-in-the-instructions).

---

## Original assignment (from the instructor)

*The text below is the assignment README as written by the Code Immersives instructor, unchanged.*

### Color Cleaver

### Introduction

This is our chance to make the full app version of [color-cleaver-backend](https://github.com/ci-wdi-900/color-cleaver-backend), with front end and everything. The logic's there, we just need an interface!

### Workflow

The entire back end has been completed for you. (Thanks, back end engineer!)

You'll be working entirely in `color-cleaver.js`. Your only concern is taking input from the user's terminal (via `node color-cleaver.js [color 1] [optional color 2]`) and outputting some correct (and kind) messages.

No need to run tests, though you can just to check. Our backend elves have a functioning prototype, they just need an interface to it!

### Steps

1.  The first thing we need to do is grab our users' input. There might be as many as two, so grab two `getInput` return values and put them in variables.
2.  Now we'll need to take into account that some of those values might be `undefined`. Note that that's not the literal letters "undefined", it's a value--no quotes! We'll want to send them a message if BOTH are `undefined`; that means they didn't put even a single color in.
3.  If there is ONE color, we want to pass it to `colorDeconstructor`, take the return value (e.g., 'red and yellow'), and put it into a sentence that tells them the result in a user-friendly way.
4.  If there were TWO colors, then we want to get the return value from `colorCombinator` (passing in both of the users' colors) and put THAT in a sentence.
5.  Oh, but _of course_ there's one more thing: the user's input might not be `undefined`, but that doesn't mean they're _colors_. Use your `isValid` functions from the backend so that, if you're dealing with one color, you send them a message if it's not a primary color, and if you're dealing with two colors, you send them a message if EITHER isn't a secondary color.

And that's it! That's our whole front end! Although...

### Flowcharts

The steps above are in the order a person would tackle the problems. But JavaScript is not a person (sounds like a very nerdy Dark Mirror episode though), and we'll need to handle the logic in a more computer-y way.

So here are two different flowcharts; the first one is a little strange logically, but is designed to produce less nested code. The second is easier to understand, but if you follow it exactly, you'll most likely end up with nested `if` statements. It's up to you! Or make your own!

![A flowchart for the app, with a flat if structure result.](./assets/flowchart-1.png)

![A flowchart for the app, with a nested if structure result.](./assets/flowchart-2.png)
