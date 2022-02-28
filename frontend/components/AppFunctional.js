import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [matrix, setMatrix] = useState([
    [false, false, false],
    [false, true, false],
    [false, false, false],
  ]);
  const [steps, setSteps] = useState(0);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [input, setInput] = useState("");

  const handleReset = () => {
    setMatrix([
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ]);
    setX(2);
    setY(2);
    setSteps(0);
    setWarning("");
    setInput("");
  };

  const handleKeypad = (e) => {
    const direction = e.target.id;

    let oldX = x;
    let oldY = y;
    let warningMessage = "";
    let currentSteps = steps;

    switch (direction) {
      case "left":
        if (oldX <= 1) {
          warningMessage = `You can't go left`;
        } else {
          oldX = oldX - 1;
          currentSteps = steps + 1;
        }
        break;

      case "right":
        if (oldX >= 3) {
          warningMessage = `You can't go right`;
        } else {
          oldX = oldX + 1;
          currentSteps = steps + 1;
        }
        break;

      case "up":
        if (oldY <= 1) {
          warningMessage = `You can't go up`;
        } else {
          oldY = oldY - 1;
          currentSteps = steps + 1;
        }
        break;

      case "down":
        if (oldY >= 3) {
          warningMessage = `You can't go down`;
        } else {
          oldY = oldY + 1;
          currentSteps = steps + 1;
        }
        break;

      default:
        break;
    }

    let newMatrix = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    newMatrix[oldY - 1][oldX - 1] = true;

    setMatrix(newMatrix);
    setX(oldX);
    setY(oldY);
    setSteps(currentSteps);
    setWarning(warningMessage);
  };

  const onChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:9000/api/result`, {
        x,
        y,
        steps,
        email: input,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    setInput("");
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">You moved {`${steps} time${steps === 1 ? "" : "s"}`}</h3>
      </div>
      <div id="grid">
        {matrix.map((row, idx) => {
          return (
            <React.Fragment key={idx}>
              {row.map((block, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {block ? (
                      <div className="square active">B</div>
                    ) : (
                      <div className="square"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className="info">
        <h3 id="message">
          {message}
          {warning}
        </h3>
      </div>
      <div id="keypad">
        <button onClick={handleKeypad} id="left">
          LEFT
        </button>
        <button onClick={handleKeypad} id="up">
          UP
        </button>
        <button onClick={handleKeypad} id="right">
          RIGHT
        </button>
        <button onClick={handleKeypad} id="down">
          DOWN
        </button>
        <button onClick={handleReset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          id="email"
          type="email"
          value={input}
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
