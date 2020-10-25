import React, { useReducer } from "react";
import "./styles.css";
import reducer from "./reducer";

const initialState = { canvas: [] };

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { canvas } = state;
  function inputKeyPressHandler(e) {
    if (e.code === "Enter") {
      let [command, x0, y0, x1, y1] = e.target.value.split(" ");
      e.target.value = "";
      dispatch({
        type: command.toUpperCase(),
        x1: +x0,
        y1: +y0,
        x2: isNaN(+x1) ? x1 : +x1,
        y2: +y1
      });
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="enter command"
        onKeyDown={inputKeyPressHandler}
      />
      <button onClick={() => dispatch({ type: "reset" })}>Clear</button>
      <table>
        <tbody>
          {canvas.length > 0 &&
            canvas.map((item, index) => (
              <tr key={"tr" + index}>
                {item.map((value, i) => (
                  <td width="15" key={"td" + i}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
