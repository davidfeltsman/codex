import reducer from "../reducer";

function createCanvas(w, h) {
  const state = reducer(undefined, {
    type: "C",
    x1: w,
    y1: h
  });
  return state;
}

describe("creating canvas", () => {
  it("should return initial state as empty array", () => {
    expect(reducer(undefined, {})).toEqual({
      canvas: []
    });
  });

  it("should return canvas-array with expected values", () => {
    expect(
      reducer(undefined, {
        type: "C",
        x1: 5,
        y1: 5
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });

  it("should exclude NaN params", () => {
    expect(
      reducer(undefined, {
        type: "C",
        x1: "d",
        y1: ""
      })
    ).toEqual({
      canvas: []
    });
  });
});

describe("excluding drawing without canvas-create", () => {
  it("a line", () => {
    expect(
      reducer(undefined, {
        type: "L",
        x1: 1,
        y1: 2,
        x2: 10,
        y2: 2
      })
    ).toEqual({
      canvas: []
    });
  });

  it("a rectangle", () => {
    expect(
      reducer(undefined, {
        type: "R",
        x1: 2,
        y1: 2,
        x2: 10,
        y2: 10
      })
    ).toEqual({
      canvas: []
    });
  });
});

describe("line drawing test", () => {
  const state = createCanvas(5, 5);

  it("should draw a line, which init params X more than field size", () => {
    expect(
      reducer(state, {
        type: "L",
        x1: -10,
        y1: 2,
        x2: 10,
        y2: 2
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", " ", " ", "|"],
        ["-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });

  it("should draw a line, which init params Y more than field size", () => {
    expect(
      reducer(state, {
        type: "L",
        x1: 3,
        y1: -10,
        x2: 3,
        y2: 10
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["|", " ", " ", "x", " ", " ", "|"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["|", " ", " ", "x", " ", " ", "|"],
        ["|", " ", " ", "x", " ", " ", "|"],
        ["|", " ", " ", "x", " ", " ", "|"],
        ["-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });
});

describe("rectangle drawing", () => {
  const state = createCanvas(5, 5);

  it("shold draw a rectangle even it size more than canvas field", () => {
    expect(
      reducer(state, {
        type: "R",
        x1: 0,
        y1: 0,
        x2: 15,
        y2: 15
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["|", "x", " ", " ", " ", "x", "|"],
        ["|", "x", " ", " ", " ", "x", "|"],
        ["|", "x", " ", " ", " ", "x", "|"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });
  it("should draw a rectangle from y to x", () => {
    expect(
      reducer(state, {
        type: "R",
        x1: 4,
        y1: 4,
        x2: 2,
        y2: 2
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["|", "x", "x", " ", "x", "x", "|"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["|", "x", "x", "x", "x", "x", "|"],
        ["-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });
});

describe("bucket fill", () => {
  const state = createCanvas(10, 10);

  it("should correctly fill element", () => {
    reducer(state, {
      type: "L",
      x1: 5,
      y1: 1,
      x2: 5,
      y2: 10
    });
    reducer(state, {
      type: "B",
      x1: 1,
      y1: 1,
      x2: "f"
    });
    expect(
      reducer(state, {
        type: "B",
        x1: 9,
        y1: 1,
        x2: "c"
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "f", "f", "f", "f", "x", "c", "c", "c", "c", "c", "|"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });

  it("should not fill borders", () => {
    expect(
      reducer(state, {
        type: "B",
        x1: 0,
        y1: 0,
        x2: "c"
      })
    ).toEqual({
      canvas: [
        ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["|", "c", "c", "c", "c", "x", "c", "c", "c", "c", "c", "|"],
        ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]
      ]
    });
  });
});
