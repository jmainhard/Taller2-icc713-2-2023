const videoGames = require('./load-games.js');
const {
  getListOfUniqueRandomNumbers,
  getRandomNumber,
} = require('./utils/get-random.js');

const allGames = [...videoGames.GBA, ...videoGames.N64, ...videoGames.PS2];

// Get two games by console
function getTwoByConsole(videoGamesConsole) {
  const gamesByConsole = videoGames[videoGamesConsole];
  const randoms = getListOfUniqueRandomNumbers({
    min: 0,
    max: gamesByConsole.length,
    qty: 2,
  });
  const games = randoms.map((random) => {
    return gamesByConsole[random];
  });

  return games;
}

// Get three games by genre
function getThreeByGenre(genre) {
  const allGamesWithGenre = allGames.filter((game) =>
    game.genres.includes(genre)
  );

  if (allGamesWithGenre.length === 0) {
    throw new Error(`No games found for genre: ${genre}`);
  }

  const randoms = getListOfUniqueRandomNumbers({
    min: 0,
    max: allGamesWithGenre.length,
    qty: 3,
  });

  const games = randoms.map((random) => {
    return allGamesWithGenre[random];
  });

  return games;
}

// Get one game by console and genre
function getGameByConsoleAndGenre(console, genre) {
  const allGamesByConsoleAndGenre = allGames.filter(
    (game) => game.genres.includes(genre) && game.video_console === console
  );

  if (allGamesByConsoleAndGenre.length === 0) {
    throw new Error(`No games found for console: ${console} and genre: ${genre}`);
  }

  const random = getRandomNumber(0, allGamesByConsoleAndGenre.length);

  return allGamesByConsoleAndGenre[random];
}

// Get game by name
function getGameByName(name) {
  const gameByName = allGames.find(
    (game) => game.name.toLowerCase() === name.toLowerCase()
  );

  return gameByName;
}

// Get games by genre
function getGamesByGenre(genre) {
  const gamesByGenre = allGames.filter((game) => game.genres.includes(genre));

  return gamesByGenre;
}

module.exports = {
  getTwoByConsole,
  getThreeByGenre,
  getGameByConsoleAndGenre,
  getGameByName,
  getGamesByGenre,
};
