import minecraft from "../minecraft";
import { spawn } from "child_process";

jest.mock("child_process");
const ioMock = { emit: () => {} };

describe("minecraft.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    spawn.mockImplementation(() => ({
      stdout: { on: () => {} },
      stderr: { on: () => {} },
      stdin: { on: () => {} },
      on: () => {}
    }));
  });

  it("returns false on initialize", () => {
    expect(minecraft.status()).toBe(false);
  });

  it("returns true after starting a server", () => {
    minecraft.start(ioMock);
    expect(minecraft.status()).toBe(true);
  });
});
