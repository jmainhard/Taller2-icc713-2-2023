const { expect } = require("@jest/globals");
const {
  getTwoByConsole,
  getThreeByGenre,
  getGameByConsoleAndGenre,
  getGameByName,
  getGamesByGenre,
} = require("../src/script");

describe("Script tests", () => {
  // beforeAll not used since it is (a) synchronous setup
  const dummyString = "Non-Existent";

  describe("getTwoByConsole", () => {
    it("Should return two games by PS2 console", () => {
      const games = getTwoByConsole("PS2");
      expect(games).toHaveLength(2);
      expect(games[0].video_console).toEqual("PS2");
      expect(games[1].video_console).toEqual("PS2");
    });

    it("Should throw and error when the console doesnt exists", () => {
      try {
        getTwoByConsole("CONSOLE");
        throw new Error("other-error");
      } catch (error) {
        expect(error.message).not.toEqual("other-error");
      }
    });
  });

  describe("getThreeByGenre", () => {
    it("Should return three games by Survival Horror genre", () => {
      const games = getThreeByGenre("Survival Horror");
      expect(games).toHaveLength(3);
      games.forEach((game) => expect(game.genres).toContain("Survival Horror"));
    });

    it("Should throw an error when the genre does not exist", () => {
      expect(() => getThreeByGenre(dummyString)).toThrow(
        `No games found for genre: ${dummyString}`
      );
    });
  });

  describe("getGameByConsoleAndGenre", () => {
    it("Should return a game for GBA and Sports genre", () => {
      const game = getGameByConsoleAndGenre("GBA", "Sports");
      expect(game).toBeDefined();
      expect(game.video_console).toEqual("GBA");
      expect(game.genres).toContain("Sports");
    });

    it("Should throw and error when the console doesnt exists", () => {
      const genre = "Sports";
      expect(() => getGameByConsoleAndGenre(dummyString, genre)).toThrow(
        `No games found for console: ${dummyString} and genre: ${genre}`
      );
    });

    it("Should throw and error when the genre doesnt exists", () => {
      const console = "GBA";
      expect(() => getGameByConsoleAndGenre(console, dummyString)).toThrow(
        `No games found for console: ${console} and genre: ${dummyString}`
      );
    });
  });

  describe("getGameByName", () => {
    // note case insensitive
    it("Should return the Resident evil 2 game", () => {
      const game = getGameByName("Resident evil 2");
      expect(game).toBeDefined();
      expect(game.name).toEqual("Resident Evil 2");
    });

    it("Should return undefined when not found", () => {
      expect(getGameByName(dummyString)).toBeUndefined();
    });
  });

  describe("getGamesByGenre", () => {
    it("Should return a list of games by Action genre", () => {
      const games = getGamesByGenre("Action");
      expect(games).toBeDefined();
      games.forEach((game) => expect(game.genres).toContain("Action"));
    });

    it("Should return a empty list when the genre doesnt exists", () => {
      const games = getGamesByGenre(dummyString);
      expect(games).toBeDefined();
      expect(games).toEqual([]);
    });
  });
});
