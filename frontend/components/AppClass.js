import React from "react";
import axios from "axios";

// (1, 1) (2, 1) (3, 1)
// (1, 2) (2, 2) (3, 2)
// (1, 3) (2, 3) (3, 3)

export default class AppClass extends React.Component {
  state = {
    matrix: [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],

    steps: 0,
    x: 3,
    y: 1,
    email: "",
    message: "",
  };

  // componentDidMount() {
  //   axios
  //     .post(`http://localhost:9000/api/result`, this.state)
  //     .then((resp) => {
  //       console.log(resp);
  //       this.setState({ ...this.state, message: resp.data.message });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  handleClick = (e) => {
    const direction = e.target.id;
    // let x = this.state.x;
    let oldX = this.state.x;
    let oldY = this.state.y;
    switch (direction) {
      case "left":
        oldX = oldX - 1;

        break;

      case "right":
        oldX = oldX + 1;

        break;

      case "up":
        oldY = oldY - 1;

        break;

      case "down":
        oldY = oldY + 1;

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
    console.log("newMatrix: ", newMatrix);
    console.log("oldX: ", oldX);
    console.log("oldY: ", oldY);

    this.setState({
      ...this.state,
      matrix: newMatrix,
      x: oldX,
      y: oldY,
    });
  };

  onChange = (event) => {
    const { value, id } = event.target;
    this.setState({ ...this.state, [id]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:9000/api/result`, this.state)
      .then((res) => {
        console.log("axios post: ", res);
        this.setState({ ...this.state, message: res.data.message });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, message: err.message });
      });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.x}, {this.state.y})
          </h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {this.state.matrix.map((row) => {
            return (
              <>
                {row.map((block) => {
                  return (
                    <>
                      {block ? (
                        <div className="square active">B</div>
                      ) : (
                        <div className="square"></div>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>

        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleClick} id="left">
            LEFT
          </button>
          <button onClick={this.handleClick} id="up">
            UP
          </button>
          <button onClick={this.handleClick} id="right">
            RIGHT
          </button>
          <button onClick={this.handleClick} id="down">
            DOWN
          </button>
          <button onClick={this.handleClick} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            id="email"
            type="email"
            value={this.state.value}
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
