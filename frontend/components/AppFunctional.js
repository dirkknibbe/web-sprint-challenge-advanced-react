import React, { useState } from "react";

export default function AppFunctional(props) {
  // state = {
  //     matrix: [
  //       [false, false, false],
  //       [false, true, false],
  //       [false, false, false],
  //     ],

  //     steps: 0,
  //     x: 2,
  //     y: 2,
  //     email: "",
  //     message: "",
  //     warning: "",
  //   };

  const [matrix, setMatrix] = useState([
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
  ]);
  const [steps, setSteps] = useState(0);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");

  const handleClick = () => {
    matrix.map((box) => {
      if (box.value === true) {
        return !box.value;
      } else {
        setMatrix([...matrix]);
      }
    });
  };
  console.log(matrix);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={handleClick} id="left">
          LEFT
        </button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
