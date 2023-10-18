const { expect } = require("@jest/globals");
const {
  getTwoByConsole,
  getThreeByGenre,
  getGameByConsoleAndGenre,
  getGameByName,
  getGamesByGenre,
} = require("../src/script");

describe("Script tests", () => {
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

    // FIXME: This test is hoarding CPU processsing and taking too long to finish
    it.skip("Should throw an error when the genre does not exist", () => {
      expect(() => getThreeByGenre("Non-Existent")).toThrow();
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
      expect(() =>
        getGameByConsoleAndGenre("Non-Existent", "Sports")
      ).toThrow();
    });

    it("Should throw and error when the genre doesnt exists", () => {
      expect(() => getGameByConsoleAndGenre("GBA", "Non-Existent")).toThrow();
    });
  });

  describe("getGameByName", () => {
    it("Should return the Resident evil 2 game", () => {
      expect(0).toBeTruthy();
      const game = getGameByName("Resident evil 2");
      expect(game).toBeDefined();
      expect(game.name).toEqual("Resident evil 2");
    });

    it("Should return undefined when not found", () => {
      expect(0).toBeTruthy();
      const game = getGameByName("Non-Existent");
      expect(game).toBeUndefined();
    });
  });

  describe("getGamesByGenre", () => {
    it("Should return a list of games by Action genre", () => {
      expect(0).toBeTruthy();
      const games = getGamesByGenre("Action");
      expect(games).toBeDefined();
      games.forEach((game) => expect(game.genre).toEqual("Action"));
    });

    it("Should return a empty list when the genre doesnt exists", () => {
      expect(0).toBeTruthy();
      const games = getGamesByGenre("Non-Existent");
      expect(games).toBeDefined();
      expect(games).toEqual([]);
    });
  });
});
