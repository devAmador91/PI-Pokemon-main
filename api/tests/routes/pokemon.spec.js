/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });

  describe("GET /pokemons/id", () => {
    it("should get 200", () => agent.get("/pokemons/5").expect(200));
  });

  describe("GET /pokemons/", () => {
    it("should get 200", () => agent.get("/pokemons?name=pikachu").expect(200));
  });

  describe("POST /pokemons/", () => {
    it("should get 200", () =>
      agent
        .post({
          name: "Chari",
          type: ["poison"],
          height: 10,
          weight: 20,
          hp: 55,
          attack: 100,
          defense: 30,
          speed: 45,
          img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/803.png",
        })
        .expect(200));
  });
});
