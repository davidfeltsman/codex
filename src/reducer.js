const initialState = { canvas: [] };

function findBorders(x1, y1, x2, y2, newCanvas) {
  if (x1 <= 0) x1 = 1;
  if (x1 >= newCanvas[0].length - 2) x1 = newCanvas[0].length - 2;
  if (x2 <= 0) x2 = 1;
  if (x2 >= newCanvas[0].length - 2) x2 = newCanvas[0].length - 2;

  if (y1 <= 0) y1 = 1;
  if (y1 >= newCanvas.length - 2) y1 = newCanvas.length - 2;
  if (y2 <= 0) y2 = 1;
  if (y2 >= newCanvas.length - 2) y2 = newCanvas.length - 2;
  return [x1, y1, x2, y2];
}

export default function reducer(
  state = initialState,
  { type, x1, y1, x2, y2 }
) {
  let newCanvas = [...state.canvas];

  function bucketFill(x, y, color, sourceColor, newCanvas = [...state.canvas]) {
    let currentColor = newCanvas[y][x];
    if (sourceColor && currentColor !== sourceColor) return;
    if (currentColor === color) return;
    newCanvas[y][x] = color;
    if (x + 1 < newCanvas[0].length - 1) {
      bucketFill(x + 1, y, color, currentColor);
    }
    if (x > 1) {
      bucketFill(x - 1, y, color, currentColor);
    }
    if (y + 1 < newCanvas.length - 1) {
      bucketFill(x, y + 1, color, currentColor);
    }
    if (y > 1) {
      bucketFill(x, y - 1, color, currentColor);
    }
  }

  switch (type) {
    case "C":
      if (
        newCanvas.length === 0 &&
        !isNaN(x1) &&
        !isNaN(y1) &&
        x1 !== 0 &&
        y1 !== 0
      ) {
        for (let i = 0; i < y1; i++) {
          newCanvas[i] = [];
          for (var j = 0; j < x1; j++) {
            newCanvas[i][j] = " ";
          }
        }
        newCanvas.forEach((item) => {
          item.unshift("|");
          item.push("|");
        });
        const border = new Array(newCanvas[0].length).fill("-");
        newCanvas.push(border);
        newCanvas.unshift(border);
      }
      break;
    case "L":
      if (
        newCanvas.length > 0 &&
        !isNaN(x1) &&
        !isNaN(y1) &&
        !isNaN(x2) &&
        !isNaN(y2)
      ) {
        [x1, y1, x2, y2] = findBorders(x1, y1, x2, y2, newCanvas);

        if (y1 === y2) {
          if (x1 < x2) {
            newCanvas[y1].fill("x", x1, x2 + 1);
          }
          if (x1 > x2) {
            newCanvas[y1].fill("x", x2, x1 + 1);
          }
        }
        if (x1 === x2) {
          if (y1 < y2) {
            for (let j = y1; j <= y2; j++) {
              newCanvas[j][x1] = "x";
            }
          }
          if (y1 > y2) {
            for (let j = y2; j <= y1; j++) {
              newCanvas[j][x1] = "x";
            }
          }
        }
      }
      break;
    case "R":
      if (
        newCanvas.length > 0 &&
        !isNaN(x1) &&
        !isNaN(y1) &&
        !isNaN(x2) &&
        !isNaN(y2)
      ) {
        [x1, y1, x2, y2] = findBorders(x1, y1, x2, y2, newCanvas);
        if (x1 < x2) {
          newCanvas[y1].fill("x", x1, x2 + 1);
          newCanvas[y2].fill("x", x1, x2 + 1);
        }
        if (y1 < y2) {
          for (let j = y1; j <= y2; j++) {
            newCanvas[j][x1] = "x";
            newCanvas[j][x2] = "x";
          }
        }
        if (x1 > x2) {
          newCanvas[y1].fill("x", x2, x1 + 1);
          newCanvas[y2].fill("x", x2, x1 + 1);
        }
        if (y1 > y2) {
          for (let j = y2; j <= y1; j++) {
            newCanvas[j][x1] = "x";
            newCanvas[j][x2] = "x";
          }
        }
      }
      break;
    case "B":
      if (newCanvas.length) {
        [x1, y1] = findBorders(x1, y1, x2, y2, newCanvas);
        bucketFill(x1, y1, x2);
      }
      break;
    case "reset":
      newCanvas = [];
      break;
    default:
      return { ...state };
  }
  return {
    ...state,
    canvas: newCanvas
  };
}
