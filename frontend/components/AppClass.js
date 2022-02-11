import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    matrix: [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
    steps: 0,
    x: 2,
    y: 2,
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

  // handleLeftClick = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     ...this.state,
  //   });
  // };
  // }

  onChange = (event) => {
    const { value, id } = event.target;
    this.setState({ ...this.state, [id]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:9000/api/result`, this.state)
      .then((res) => {
        console.log("here: ", res);
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
          <h3 id="coordinates">Coordinates ({this.state.coordinates})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {this.state.matrix.map((row) => {
            return (
              <>
                {row.map((item) => {
                  return (
                    <>
                      {item ? (
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
          <button onClick={this.handleLeftClick} id="left">
            LEFT
          </button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
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
