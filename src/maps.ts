const WIDTH = 40;
const HEIGHT = 20;

export const background = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => 0));

// randomly add some grass
for (let i = 0; i < 10; i++) {
  const x = Math.floor(Math.random() * background[0].length);
  const y = Math.floor(Math.random() * background.length);
  background[y][x] = 1;
}

// randomly add some flowers
for (let i = 0; i < 10; i++) {
  const x = Math.floor(Math.random() * background[0].length);
  const y = Math.floor(Math.random() * background.length);
  background[y][x] = 2;
}
