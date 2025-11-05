import app from "../app.js";
import supertest from "supertest";
import fetch from "node-fetch";

jest.mock("node-fetch");
const request = supertest(app);

describe("POST /", () => {
  it("Quick test", () => {
    expect(1).toBe(1);
  });
});

describe("Test GET /", () => {
  test("Send hello to backend", async () => {
    const res = await request.get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("hello from backend to frontend!");
  });
});

describe("Test POST /weather", () => {
  test("Return city name is required.", async () => {
    const city = " ";

    const res = await request.post("/weather").send({ cityName: city });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ msg: "City name is required." });
  });
});

//test the happy path: when the user sends a valid city name, the API returns weather data.
describe("Test POST /weather", () => {
  test("Return temperature data", async () => {
    const city = "amsterdam";
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "Amsterdam",
        main: { temp: 286.78 },
      }),
    });
    const res = await request.post("/weather").send({ cityName: city });

    expect(res.statusCode).toBe(200);
    expect(res.body.main.temp).toBe(286.78);
  });
});

describe("Test POST /weather", () => {
  test("Return city not found", async () => {
    const city = "amsterddam";

    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });
    const res = await request.post("/weather").send({ cityName: city });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ weatherText: "City is not found!" });
  });
});
