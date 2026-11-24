// Tests added during the 2026 cleanup. The assignment's main.test.js only tests
// the back-end functions; these run the front end (color-cleaver.js) the way a
// user would, e.g. `node color-cleaver.js red yellow`, and check the message.
const { execFileSync } = require('child_process');
const path = require('path');

const run = (...args) =>
  execFileSync(process.execPath, [path.join(__dirname, 'color-cleaver.js'), ...args], { encoding: 'utf8' }).trim();

describe('color-cleaver.js with no colors', () => {
  it('explains how to use it', () => {
    expect(run()).toMatch(/^Please type a color/);
  });
});

describe('color-cleaver.js with one color', () => {
  it('splits each secondary color into its two primaries', () => {
    expect(run('orange')).toBe('Orange is made by mixing red and yellow.');
    expect(run('purple')).toBe('Purple is made by mixing red and blue.');
    expect(run('green')).toBe('Green is made by mixing blue and yellow.');
  });

  it('ignores capital letters', () => {
    expect(run('PURPLE')).toBe('Purple is made by mixing red and blue.');
  });

  it('explains that a primary color cannot be split', () => {
    expect(run('red')).toMatch(/^Red is a primary color/);
  });

  it('explains an unknown color', () => {
    expect(run('blorgon')).toBe('"blorgon" isn\'t a secondary color. Try orange, purple or green.');
  });
});

describe('color-cleaver.js with two colors', () => {
  it('mixes two primaries in either order', () => {
    expect(run('red', 'yellow')).toBe('Red and yellow make orange.');
    expect(run('yellow', 'red')).toBe('Yellow and red make orange.');
    expect(run('red', 'blue')).toBe('Red and blue make purple.');
    expect(run('blue', 'yellow')).toBe('Blue and yellow make green.');
  });

  it('ignores capital letters', () => {
    expect(run('BLUE', 'Red')).toBe('Blue and red make purple.');
  });

  it('explains that the same color twice does not mix', () => {
    expect(run('red', 'red')).toMatch(/^Mixing red with red just makes red/);
  });

  it('asks for two primary colors when either one is not primary', () => {
    expect(run('red', 'orange')).toMatch(/^To mix colors, type two primary colors/);
    expect(run('blorgon', 'red')).toMatch(/^To mix colors, type two primary colors/);
  });
});
