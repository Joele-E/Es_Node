function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

let players = ["Joe", "Caroline", "Sabrina"];

players.forEach((el) => {
  luckyDraw(el)
    .then((r) => console.log(r))
    .catch((err) => console.error(err));
});
