import minecraft from "../minecraft";

describe("minecraft.js", () => {
  it("returns false on initialize", () => {
    expect(minecraft.status()).toBe(false);
  });
});
