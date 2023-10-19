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

async function getResults(person) {
  let result;
  try {
    result = await luckyDraw(person);
  } catch (error) {
    result = error;
  }
  console.log("=".repeat(50));
  console.log(result);
  console.log("=".repeat(50));
}

let players = ["Tina", "Jorge", "Julien"];

players.forEach((el) => {
  getResults(el);
});
